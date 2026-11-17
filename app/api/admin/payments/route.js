import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/serverAuth";
import { audit, entitlementId } from "@/lib/entitlements";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/* GET : paiements envoyés, à vérifier dans Wave */
export async function GET(request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;
  const snap = await adminDb().collection("paymentRequests").where("status", "==", "submitted").limit(100).get();
  return json({
    items: snap.docs.map((d) => {
      const x = d.data();
      return { id: d.id, email: x.email, course: x.course, amount: x.amount, reference: x.reference, transactionId: x.transactionId };
    }),
  });
}

/* POST { requestId, action: "approve" | "reject" } */
export async function POST(request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const { requestId, action } = await request.json().catch(() => ({}));
  if (typeof requestId !== "string" || !/^[A-Za-z0-9]{10,40}$/.test(requestId) || !["approve", "reject"].includes(action))
    return json({ error: "Requête invalide." }, 400);

  const db = adminDb();
  const ref = db.collection("paymentRequests").doc(requestId);
  try {
    await db.runTransaction(async (t) => {
      const snap = await t.get(ref);
      if (!snap.exists || snap.data().status !== "submitted") throw new Error("GONE");
      const r = snap.data();
      if (action === "approve") {
        t.set(db.collection("entitlements").doc(entitlementId(r.uid, r.course)), {
          uid: r.uid, course: r.course, requestId, grantedAt: FieldValue.serverTimestamp(),
        });
        t.update(ref, { status: "approved", reviewedAt: FieldValue.serverTimestamp() });
      } else {
        t.update(ref, { status: "rejected", reviewedAt: FieldValue.serverTimestamp() });
        if (r.transactionId) t.delete(db.collection("usedTransactions").doc(r.transactionId));
      }
    });
  } catch (e) {
    if (e.message === "GONE") return json({ error: "Introuvable ou déjà traitée." }, 404);
    console.error("POST /api/admin/payments :", e);
    return json({ error: "Erreur serveur." }, 500);
  }
  await audit("payment_" + action, auth.decoded.uid, { requestId });
  return json({ ok: true });
}