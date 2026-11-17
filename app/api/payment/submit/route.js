import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireUser } from "@/lib/serverAuth";
import { createLimiter, clientIp } from "@/lib/rateLimit";
import { audit } from "@/lib/entitlements";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEN_MIN = 10 * 60 * 1000;
const ipLimit = createLimiter({ windowMs: TEN_MIN, max: 120 });
const userLimit = createLimiter({ windowMs: TEN_MIN, max: 8 });

const json = (body, status = 200, headers = {}) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

/* POST { requestId, transactionId } : l'élève envoie l'ID de sa transaction Wave.
   Un même ID ne peut servir qu'une seule fois (collection usedTransactions).
   L'ID Wave peut contenir des lettres, des chiffres, le tiret bas et le tiret (ex. T_ABC123XYZ). */
export async function POST(request) {
  try {
    const w0 = ipLimit(clientIp(request));
    if (w0 > 0) return json({ error: "Trop de requêtes." }, 429, { "Retry-After": String(w0) });
    const auth = await requireUser(request);
    if (!auth.ok) return auth.response;
    const { uid } = auth.decoded;
    const w1 = userLimit(uid);
    if (w1 > 0) return json({ error: "Trop de requêtes." }, 429, { "Retry-After": String(w1) });

    const raw = await request.text();
    if (raw.length > 1000) return json({ error: "Requête invalide." }, 400);
    let body;
    try { body = JSON.parse(raw); } catch { return json({ error: "Requête invalide." }, 400); }

    const requestId = typeof body?.requestId === "string" ? body.requestId : "";
    const tx = String(body?.transactionId || "").trim().toUpperCase();
    if (!/^[A-Za-z0-9]{10,40}$/.test(requestId) || !/^[A-Z0-9_-]{8,40}$/.test(tx))
      return json({ error: "ID de transaction invalide (lettres, chiffres, _ ou -, 8 caractères minimum)." }, 400);

    const db = adminDb();
    try {
      await db.runTransaction(async (t) => {
        const reqRef = db.collection("paymentRequests").doc(requestId);
        const usedRef = db.collection("usedTransactions").doc(tx);
        const [r, u] = await Promise.all([t.get(reqRef), t.get(usedRef)]);
        if (!r.exists || r.data().uid !== uid) throw new Error("NOT_FOUND");
        if (r.data().status !== "pending") throw new Error("BAD_STATE");
        if (u.exists) throw new Error("USED");
        t.create(usedRef, { uid, requestId, at: FieldValue.serverTimestamp() });
        t.update(reqRef, { status: "submitted", transactionId: tx, submittedAt: FieldValue.serverTimestamp() });
      });
    } catch (e) {
      const map = {
        NOT_FOUND: [404, "Demande introuvable."],
        BAD_STATE: [409, "Cette demande a déjà été envoyée."],
        USED: [409, "Cet ID de transaction a déjà été utilisé."],
      };
      const [status, error] = map[e.message] || [500, "Erreur serveur."];
      if (!map[e.message]) console.error("POST /api/payment/submit :", e);
      return json({ error }, status);
    }
    await audit("payment_submitted", uid, { requestId, tx });
    return json({ ok: true, status: "submitted" });
  } catch (e) {
    console.error("POST /api/payment/submit :", e);
    return json({ error: "Erreur serveur." }, 500);
  }
}