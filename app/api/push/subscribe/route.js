import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebaseAdmin";
import { checkAppCheck, verifyBearer } from "@/lib/serverAuth";
import { createLimiter, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

/* 10 inscriptions ou désinscriptions par visiteur et par 10 minutes */
const limiter = createLimiter({ windowMs: 10 * 60 * 1000, max: 10 });

/* Seuls les vrais services de notification des navigateurs sont acceptés :
   sans cette liste, quelqu'un pourrait inscrire une adresse quelconque et le serveur
   enverrait ensuite des requêtes vers elle. À compléter si un navigateur est refusé. */
const ALLOWED_HOSTS = [
  /^fcm\.googleapis\.com$/, // Chrome, Edge, Android
  /(^|\.)push\.services\.mozilla\.com$/, // Firefox
  /(^|\.)push\.apple\.com$/, // Safari
  /(^|\.)notify\.windows\.com$/, // anciens Edge
];

const B64URL = /^[A-Za-z0-9_-]+={0,2}$/;

function cleanSubscription(body) {
  if (!body || typeof body !== "object") return null;
  const { endpoint, keys } = body;
  if (typeof endpoint !== "string" || endpoint.length > 600) return null;

  let u;
  try {
    u = new URL(endpoint);
  } catch {
    return null;
  }
  if (u.protocol !== "https:" || u.username || u.password) return null;
  if (!ALLOWED_HOSTS.some((re) => re.test(u.hostname))) return null;

  const p256dh = keys?.p256dh;
  const auth = keys?.auth;
  if (typeof p256dh !== "string" || typeof auth !== "string") return null;
  if (!B64URL.test(p256dh) || p256dh.length < 80 || p256dh.length > 100) return null;
  if (!B64URL.test(auth) || auth.length < 20 || auth.length > 30) return null;

  return { endpoint, keys: { p256dh, auth } };
}

const idOf = (endpoint) => createHash("sha256").update(endpoint).digest("hex");

const reply = (status, payload) =>
  Response.json(payload, { status, headers: { "Cache-Control": "no-store" } });

async function guard(request) {
  if (limiter(clientIp(request)) > 0) return reply(429, { error: "Trop de demandes. Réessaie plus tard." });
  if (!(await checkAppCheck(request))) return reply(403, { error: "Accès refusé." });
  if (Number(request.headers.get("content-length") || 0) > 4000) return reply(413, { error: "Requête trop grosse." });
  return null;
}

/* Inscription : visiteur connecté ou non */
export async function POST(request) {
  const blocked = await guard(request);
  if (blocked) return blocked;

  const sub = cleanSubscription(await request.json().catch(() => null));
  if (!sub) return reply(400, { error: "Inscription invalide." });

  // Si le visiteur est connecté, on garde son identifiant (utile pour nettoyer plus tard)
  const decoded = await verifyBearer(request);

  try {
    await adminDb()
      .collection("pushSubscriptions")
      .doc(idOf(sub.endpoint))
      .set({
        endpoint: sub.endpoint,
        keys: sub.keys,
        uid: decoded?.uid ?? null,
        createdAt: FieldValue.serverTimestamp(),
      });
    return reply(200, { ok: true });
  } catch (e) {
    console.error("push/subscribe :", e);
    return reply(500, { error: "Inscription impossible pour le moment." });
  }
}

/* Désinscription */
export async function DELETE(request) {
  const blocked = await guard(request);
  if (blocked) return blocked;

  const body = await request.json().catch(() => null);
  const endpoint = body?.endpoint;
  if (typeof endpoint !== "string" || endpoint.length > 600) return reply(400, { error: "Requête invalide." });

  try {
    await adminDb().collection("pushSubscriptions").doc(idOf(endpoint)).delete();
    return reply(200, { ok: true });
  } catch (e) {
    console.error("push/unsubscribe :", e);
    return reply(500, { error: "Désinscription impossible pour le moment." });
  }
}