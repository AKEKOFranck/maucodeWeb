import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyBearer } from "@/lib/serverAuth";
import { createLimiter, clientIp } from "@/lib/rateLimit";
import { findModule, gradeQuiz } from "@/lib/quizServer";
import { FREE_MODULES_PER_COURSE } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEN_MIN = 10 * 60 * 1000;
const ipLimit = createLimiter({ windowMs: TEN_MIN, max: 60 }); // toutes requêtes, par visiteur
const guestLimit = createLimiter({ windowMs: TEN_MIN, max: 20 }); // corrections sans compte
const userLimit = createLimiter({ windowMs: TEN_MIN, max: 8 }); // corrections par compte et par module

const json = (body, status = 200, headers = {}) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

const tooMany = (wait) => json({ error: "too_many_requests" }, 429, { "Retry-After": String(wait) });

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

/* POST { course, module, answers: [0, 2, 1, ...] } */
export async function POST(request) {
  try {
    const ip = clientIp(request);
    const w0 = ipLimit(ip);
    if (w0 > 0) return tooMany(w0);

    if (!sameOrigin(request)) return json({ error: "forbidden" }, 403);

    const raw = await request.text();
    if (raw.length > 2000) return json({ error: "bad_request" }, 400);

    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ error: "bad_request" }, 400);
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "bad_request" }, 400);

    const found = findModule(body.course, body.module);
    if (!found) return json({ error: "unknown_module" }, 404);

    const grade = gradeQuiz(found.quiz, body.answers);
    if (!grade) return json({ error: "bad_request" }, 400);

    const { score, total, passed, results } = grade;

    /* Identité : jamais un uid envoyé par le client */
    const hasAuth = request.headers.has("authorization");
    const decoded = hasAuth ? await verifyBearer(request) : null;
    if (hasAuth && !decoded) return json({ error: "unauthorized" }, 401);

    /* Visiteur sans compte : seulement les modules gratuits, correction sans écriture */
    if (!decoded) {
      if (found.index >= FREE_MODULES_PER_COURSE) return json({ error: "unauthorized" }, 401);
      const w = guestLimit(ip);
      if (w > 0) return tooMany(w);
      return json({ score, total, passed, results, best: { score, total, done: passed } });
    }

    /* Apprenant connecté */
    const uid = decoded.uid;
    const { course, module: moduleSlug } = body;
    const w = userLimit(`${uid}:${course}:${moduleSlug}`);
    if (w > 0) return tooMany(w);

    const db = adminDb();
    const col = db.collection("progress");
    const ref = col.doc(`${uid}_${course}_${moduleSlug}`);
    const prevRef =
      found.index > 0 ? col.doc(`${uid}_${course}_${found.moduleSlugs[found.index - 1]}`) : null;

    const best = await db.runTransaction(async (tx) => {
      // Module verrouillé tant que le précédent n'est pas validé (même règle que isUnlocked côté navigateur)
      if (prevRef) {
        const p = await tx.get(prevRef);
        if (!p.exists || p.data().done !== true || p.data().uid !== uid) return null;
      }

      const snap = await tx.get(ref);
      const prev = snap.exists ? snap.data() : null;
      const prevOk = Boolean(prev && prev.done === true);

      // Garde le meilleur résultat ; un module validé le reste
      const useNew =
        !prev ||
        (passed && !prevOk) ||
        (passed === prevOk && score * (prev.total || 1) > (prev.score || 0) * total);

      const kept = useNew
        ? { score, total }
        : { score: Number.isInteger(prev.score) ? prev.score : 0, total: Number.isInteger(prev.total) ? prev.total : 0 };
      const done = prevOk || passed;

      const doc = {
        uid,
        courseSlug: course,
        moduleSlug,
        score: kept.score,
        total: kept.total,
        done,
        updatedAt: FieldValue.serverTimestamp(),
      };
      if (prev?.completedAt) doc.completedAt = prev.completedAt;
      else if (done) doc.completedAt = FieldValue.serverTimestamp();

      tx.set(ref, doc);
      return { score: kept.score, total: kept.total, done };
    });

    if (!best) return json({ error: "locked" }, 403);
    return json({ score, total, passed, results, best });
  } catch (e) {
    console.error("POST /api/quiz :", e);
    return json({ error: "server_error" }, 500);
  }
}