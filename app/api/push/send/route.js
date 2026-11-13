import * as webpush from "web-push";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireAdmin, checkAppCheck } from "@/lib/serverAuth";
import { createLimiter, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

/* Garde-fou contre un double clic ou une erreur : 5 envois par 10 minutes */
const limiter = createLimiter({ windowMs: 10 * 60 * 1000, max: 5 });

const PAGE = 100;

const reply = (status, payload) =>
  Response.json(payload, { status, headers: { "Cache-Control": "no-store" } });

/* Seulement une page du site : "/works", "/works/word"... (jamais un lien externe) */
const INTERNAL = /^\/(?![/\\])[A-Za-z0-9_\-/#?=&%.]{0,200}$/;

/* Envoi d'une notification à tous les inscrits. Réservé à l'administrateur.
   Corps : { title, body, url? } */
export async function POST(request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;
  if (!(await checkAppCheck(request))) return reply(403, { error: "Accès refusé." });
  if (limiter(clientIp(request)) > 0) return reply(429, { error: "Trop d'envois. Réessaie dans quelques minutes." });

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const text = typeof body?.body === "string" ? body.body.trim() : "";
  const url = typeof body?.url === "string" && body.url ? body.url.trim() : "/";

  if (title.length < 1 || title.length > 80) return reply(400, { error: "Titre : 1 à 80 caractères." });
  if (text.length < 1 || text.length > 300) return reply(400, { error: "Message : 1 à 300 caractères." });
  if (!INTERNAL.test(url)) return reply(400, { error: "Le lien doit être une page du site (ex. /works)." });

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) {
    console.error("push/send : variables VAPID manquantes");
    return reply(500, { error: "Notifications non configurées sur le serveur." });
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);

  const payload = JSON.stringify({ title, body: text, url });
  const col = adminDb().collection("pushSubscriptions");

  let sent = 0;
  let removed = 0;
  let failed = 0;
  let last = null;

  try {
    for (;;) {
      let q = col.orderBy("__name__").limit(PAGE);
      if (last) q = q.startAfter(last);
      const snap = await q.get();
      if (snap.empty) break;

      const results = await Promise.allSettled(
        snap.docs.map((d) => {
          const { endpoint, keys } = d.data();
          return webpush.sendNotification({ endpoint, keys }, payload, { TTL: 60 * 60 * 24, timeout: 8000 });
        })
      );

      const dead = [];
      results.forEach((r, i) => {
        if (r.status === "fulfilled") {
          sent += 1;
          return;
        }
        // 404 / 410 : l'appareil s'est désinscrit, on nettoie
        const code = r.reason?.statusCode;
        if (code === 404 || code === 410) dead.push(snap.docs[i].ref);
        else failed += 1;
      });

      if (dead.length) {
        const batch = adminDb().batch();
        dead.forEach((ref) => batch.delete(ref));
        await batch.commit();
        removed += dead.length;
      }

      last = snap.docs[snap.docs.length - 1];
      if (snap.size < PAGE) break;
    }
  } catch (e) {
    console.error("push/send :", e);
    return reply(500, { error: "Envoi interrompu.", sent, removed, failed });
  }

  return reply(200, { ok: true, sent, removed, failed });
}