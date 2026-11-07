import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { getCourse } from "@/lib/courseCatalog";
import { isValidSlug, toolLabel, cleanName, maskName } from "@/lib/attestation";
import { newToken, newReference } from "@/lib/attestationServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/* Identité : on vérifie le jeton Firebase de l'utilisateur, jamais un uid envoyé par le client */
async function getUid(request) {
  const m = (request.headers.get("authorization") || "").match(/^Bearer (.+)$/);
  if (!m) return null;
  try {
    const decoded = await adminAuth().verifyIdToken(m[1]);
    return decoded.uid;
  } catch {
    return null;
  }
}

/* Réussite = TOUS les modules du cours validés dans la collection "progress" */
async function isEligible(db, uid, slug, course) {
  // Test local uniquement : ignoré en production (NODE_ENV = "production" sur Vercel)
  if (process.env.NODE_ENV !== "production" && process.env.ATTESTATION_DEV_BYPASS === "1") return true;

  const refs = course.modules.map((m) => db.collection("progress").doc(`${uid}_${slug}_${m}`));
  const snaps = await db.getAll(...refs);
  // Défense en profondeur : on revérifie le seuil de 60 % (même règle que lib/progress.js),
  // au cas où un ancien document aurait été écrit avant le durcissement des règles Firestore.
  return snaps.every((s) => {
    if (!s.exists) return false;
    const d = s.data();
    return (
      d.uid === uid &&
      d.done === true &&
      Number.isInteger(d.score) &&
      Number.isInteger(d.total) &&
      d.total >= 1 &&
      d.score * 10 >= d.total * 6
    );
  });
}

const view = (d) => ({
  token: d.token,
  reference: d.reference,
  fullName: d.fullName,
  courseTitle: d.courseTitle,
  issuedAt: d.issuedAt.toDate().toISOString(),
});

/* GET ?slug=excel : attestation déjà émise ? l'apprenant est-il éligible ? */
export async function GET(request) {
  try {
    const slug = new URL(request.url).searchParams.get("slug");
    if (!isValidSlug(slug)) return json({ error: "bad_request" }, 400);

    const uid = await getUid(request);
    if (!uid) return json({ error: "unauthorized" }, 401);

    const course = getCourse(slug);
    if (!course) return json({ error: "unknown_course" }, 404);

    const db = adminDb();
    const snap = await db.collection("attestationsPrivate").doc(`${uid}_${slug}`).get();
    if (snap.exists) {
      return json({ eligible: true, attestation: view(snap.data()) });
    }
    return json({
      eligible: await isEligible(db, uid, slug, course),
      attestation: null,
      courseTitle: toolLabel(slug, course.title),
    });
  } catch (e) {
    console.error("GET /api/attestation :", e);
    return json({ error: "server_error" }, 500);
  }
}

/* POST { slug, fullName } : émet l'attestation (une seule par compte et par cours) */
export async function POST(request) {
  try {
    const raw = await request.text();
    if (raw.length > 2000) return json({ error: "bad_request" }, 400);

    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ error: "bad_request" }, 400);
    }

    const slug = body?.slug;
    const fullName = cleanName(body?.fullName);
    if (!isValidSlug(slug) || !fullName) return json({ error: "bad_request" }, 400);

    const uid = await getUid(request);
    if (!uid) return json({ error: "unauthorized" }, 401);

    const course = getCourse(slug);
    if (!course) return json({ error: "unknown_course" }, 404);

    const db = adminDb();
    const privRef = db.collection("attestationsPrivate").doc(`${uid}_${slug}`);

    const existing = await privRef.get();
    if (existing.exists) return json({ attestation: view(existing.data()) });

    if (!(await isEligible(db, uid, slug, course))) return json({ error: "not_completed" }, 403);

    const courseTitle = toolLabel(slug, course.title);

    /* Transaction : un double clic ne crée jamais deux attestations */
    const created = await db.runTransaction(async (tx) => {
      const again = await tx.get(privRef);
      if (again.exists) return again.data();

      const now = new Date();
      const token = newToken();
      const reference = newReference(slug, now);
      const issuedAt = Timestamp.fromDate(now);

      // Document public (lu uniquement par le serveur) : données minimales
      tx.set(db.collection("attestations").doc(token), {
        displayName: maskName(fullName),
        courseTitle,
        reference,
        issuedAt,
        revoked: false,
      });
      // Document privé : lien avec le compte, jamais exposé
      const priv = { token, uid, slug, fullName, courseTitle, reference, issuedAt };
      tx.set(privRef, priv);
      return priv;
    });

    return json({ attestation: view(created) }, 201);
  } catch (e) {
    console.error("POST /api/attestation :", e);
    return json({ error: "server_error" }, 500);
  }
}