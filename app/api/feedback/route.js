import nodemailer from "nodemailer";

export const runtime = "nodejs";

/* ---------- Réglages ---------- */
const MAX_BODY = 10_000; // taille maximale de la requête (caractères)
const WINDOW_MS = 10 * 60 * 1000; // fenêtre par visiteur : 10 minutes
const MAX_PER_IP = 3; // envois autorisés par visiteur et par fenêtre
const GLOBAL_WINDOW_MS = 60 * 60 * 1000; // fenêtre globale : 1 heure
const MAX_GLOBAL = 40; // envois maximum par heure, tous visiteurs confondus
const MAX_LINKS = 2; // nombre de liens autorisés dans un message

const EMAIL = /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]{2,}$/;
const PHONE = /^[0-9+().\s-]{6,40}$/;

/* ---------- Outils ---------- */
// Supprime les caractères de contrôle (sauf retour à la ligne et tabulation), coupe à la longueur max
const clean = (v, max) =>
  String(v ?? "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);

// Même chose, sur une seule ligne (noms, sujet de l'e-mail)
const oneLine = (v, max) => clean(v, max).replace(/\s+/g, " ");

const esc = (t) =>
  t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const json = (body, status = 200, headers = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

const countLinks = (t) => (t.match(/https?:\/\/|www\./gi) || []).length;

// Seules les requêtes venant de ton propre site sont acceptées
function sameOrigin(req) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function getIp(req) {
  const xff = req.headers.get("x-forwarded-for");
  return (xff ? xff.split(",")[0] : req.headers.get("x-real-ip") || "inconnu").trim();
}

/*
  Limitation d'envois (en mémoire de l'instance du serveur).
  Sur Vercel, plusieurs instances peuvent tourner : la limite est donc approximative.
  Pour une limite stricte, utiliser une base partagée (Upstash Redis, gratuit).
  Renvoie 0 si l'envoi est autorisé, sinon le nombre de secondes à attendre.
*/
const hits = new Map();
let globalHits = [];
const recent = (list, windowMs, now) => list.filter((t) => now - t < windowMs);

function rateLimit(ip) {
  const now = Date.now();

  globalHits = recent(globalHits, GLOBAL_WINDOW_MS, now);
  if (globalHits.length >= MAX_GLOBAL) {
    return Math.ceil((globalHits[0] + GLOBAL_WINDOW_MS - now) / 1000);
  }

  const mine = recent(hits.get(ip) || [], WINDOW_MS, now);
  if (mine.length >= MAX_PER_IP) {
    hits.set(ip, mine);
    return Math.ceil((mine[0] + WINDOW_MS - now) / 1000);
  }

  mine.push(now);
  hits.set(ip, mine);
  globalHits.push(now);

  // Nettoyage pour que la mémoire ne grossisse pas indéfiniment
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!recent(v, WINDOW_MS, now).length) hits.delete(k);
  }
  return 0;
}

let transporter;
function getTransporter(user, pass) {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }
  return transporter;
}

/* ---------- Route ---------- */
export async function POST(req) {
  try {
    const user = process.env.GMAIL_USER;
    // Les espaces du mot de passe d'application sont retirés automatiquement
    const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");
    const to = process.env.FEEDBACK_TO || user;

    if (!user || !pass) {
      console.error("[feedback] GMAIL_USER ou GMAIL_APP_PASSWORD manquant (redémarre le serveur après modification)");
      return json({ error: "Le serveur d'e-mail n'est pas configuré." }, 500);
    }

    if (!sameOrigin(req)) return json({ error: "Requête refusée." }, 403);

    if (!(req.headers.get("content-type") || "").includes("application/json")) {
      return json({ error: "Format de requête invalide." }, 415);
    }

    const raw = await req.text();
    if (raw.length > MAX_BODY) return json({ error: "Message trop long." }, 413);

    let b;
    try {
      b = JSON.parse(raw);
    } catch {
      return json({ error: "Requête invalide." }, 400);
    }
    if (!b || typeof b !== "object" || Array.isArray(b)) {
      return json({ error: "Requête invalide." }, 400);
    }

    // Piège anti-robot : ce champ est caché, seuls les robots le remplissent.
    // On répond "ok" pour ne rien leur apprendre, mais rien n'est envoyé.
    if (clean(b.website, 100)) {
      console.warn("[feedback] piège anti-robot déclenché");
      return json({ ok: true });
    }

    const name = oneLine(b.name, 80);
    const email = oneLine(b.email, 120);
    const phone = oneLine(b.phone, 40);
    const kind = oneLine(b.kind, 60);
    const course = oneLine(b.course, 60);
    const moduleName = oneLine(b.module, 120);
    const message = clean(b.message, 1500);

    if (!name || !message || !EMAIL.test(email)) {
      return json({ error: "Vérifie ton prénom, ton e-mail et ton message." }, 400);
    }
    if (phone && !PHONE.test(phone)) {
      return json({ error: "Vérifie ton numéro de téléphone." }, 400);
    }
    if (countLinks(message) > MAX_LINKS) {
      return json({ error: "Retire les liens de ton message, s'il te plaît." }, 400);
    }

    const wait = rateLimit(getIp(req));
    if (wait > 0) {
      return json(
        { error: "Trop d'envois pour le moment. Réessaie dans quelques minutes." },
        429,
        { "Retry-After": String(wait) }
      );
    }

    await getTransporter(user, pass).sendMail({
      from: `Maucode <${user}>`,
      to,
      replyTo: email,
      subject: `[Maucode] ${kind} : ${course} / ${moduleName}`,
      text:
        `${kind} (${course} : ${moduleName})\n${name} <${email}>\n` +
        (phone ? `Téléphone / WhatsApp : ${phone}\n` : "") +
        `\n${message}`,
      html: `<p><b>${esc(kind)}</b> (${esc(course)} : ${esc(moduleName)})</p>
             <p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p>
             ${phone ? `<p>Téléphone / WhatsApp : <b>${esc(phone)}</b></p>` : ""}
             <p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    });

    return json({ ok: true });
  } catch (err) {
    // L'erreur exacte s'affiche dans le terminal (ou dans les logs Vercel), jamais chez le visiteur
    console.error("[feedback] Échec de l'envoi :", err?.code, err?.responseCode, err?.message);
    return json({ error: "L'envoi a échoué. Réessaie dans un instant." }, 500);
  }
}