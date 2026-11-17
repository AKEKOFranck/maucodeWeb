import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireUser } from "@/lib/serverAuth";
import { createLimiter, clientIp } from "@/lib/rateLimit";
import { isEntitled, audit } from "@/lib/entitlements";
import { PAID_COURSES, isPaidCourse } from "@/lib/paymentConfig";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEN_MIN = 10 * 60 * 1000;
const ipLimit = createLimiter({ windowMs: TEN_MIN, max: 120 });
const userLimit = createLimiter({ windowMs: TEN_MIN, max: 15 });

const json = (body, status = 200, headers = {}) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
const tooMany = (w) => json({ error: "Trop de requêtes, réessaie dans un instant." }, 429, { "Retry-After": String(w) });

const slugOk = (s) => typeof s === "string" && /^[a-z0-9-]{1,60}$/.test(s) && isPaidCourse(s);
const pub = (id, d) => ({ id, reference: d.reference, amount: d.amount, status: d.status });

/* Référence imprévisible : 8 caractères tirés de 32 symboles sans ambiguïté (ni 0/O, ni 1/I).
   256 est divisible par 32 : aucun biais statistique. */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function newReference() {
  const bytes = randomBytes(8);
  let out = "";
  for (const b of bytes) out += ALPHABET[b & 31];
  return "MC-" + out;
}

async function findOpen(db, uid, course) {
  const snap = await db.collection("paymentRequests").where("uid", "==", uid).where("course", "==", course).limit(30).get();
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const open = all.find((r) => r.status === "pending" || r.status === "submitted");
  return { open, rejected: !open && all.some((r) => r.status === "rejected") };
}

/* GET ?course=slug : où en est mon paiement ? */
export async function GET(request) {
  try {
    const w0 = ipLimit(clientIp(request));
    if (w0 > 0) return tooMany(w0);
    const auth = await requireUser(request);
    if (!auth.ok) return auth.response;
    const { uid } = auth.decoded;

    const course = new URL(request.url).searchParams.get("course");
    if (!slugOk(course)) return json({ error: "Cours inconnu." }, 400);

    if (await isEntitled(uid, course)) return json({ entitled: true });
    const { open, rejected } = await findOpen(adminDb(), uid, course);
    return json({ entitled: false, request: open ? pub(open.id, open) : null, rejected });
  } catch (e) {
    console.error("GET /api/payment/request :", e);
    return json({ error: "Erreur serveur." }, 500);
  }
}

/* POST { courseSlug } : crée la demande et renvoie la référence à mettre dans Wave */
export async function POST(request) {
  try {
    const w0 = ipLimit(clientIp(request));
    if (w0 > 0) return tooMany(w0);
    const auth = await requireUser(request);
    if (!auth.ok) return auth.response;
    const { uid, email } = auth.decoded;
    const w1 = userLimit(uid);
    if (w1 > 0) return tooMany(w1);

    const raw = await request.text();
    if (raw.length > 500) return json({ error: "Requête invalide." }, 400);
    let body = {};
    try { body = JSON.parse(raw || "{}"); } catch { return json({ error: "Requête invalide." }, 400); }
    const course = body?.courseSlug;
    if (!slugOk(course)) return json({ error: "Cours inconnu." }, 400);

    const db = adminDb();
    if (await isEntitled(uid, course)) return json({ error: "Ce cours est déjà débloqué." }, 409);

    const { open } = await findOpen(db, uid, course);
    if (open) return json(pub(open.id, open));

    const reference = newReference();
    const amount = PAID_COURSES[course].price;
    const ref = await db.collection("paymentRequests").add({
      uid, email: email || "", course, amount, reference, status: "pending",
      createdAt: FieldValue.serverTimestamp(),
    });
    await audit("payment_requested", uid, { course, reference });
    return json({ id: ref.id, reference, amount, status: "pending" }, 201);
  } catch (e) {
    console.error("POST /api/payment/request :", e);
    return json({ error: "Erreur serveur." }, 500);
  }
}