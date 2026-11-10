/* Vérifications d'identité côté serveur. */
import { adminAuth, adminAppCheck } from "@/lib/firebaseAdmin";

/* Jeton Firebase de l'utilisateur (en-tête Authorization: Bearer ...).
   Renvoie le jeton décodé (uid, claims...) ou null.
   checkRevoked : vérifie aussi que la session n'a pas été révoquée et que le compte n'est pas désactivé. */
export async function verifyBearer(request, { checkRevoked = false } = {}) {
  const m = (request.headers.get("authorization") || "").match(/^Bearer (\S{20,4096})$/);
  if (!m) return null;
  try {
    return await adminAuth().verifyIdToken(m[1], checkRevoked);
  } catch {
    return null;
  }
}

export const isAdminToken = (decoded) => decoded?.admin === true;

/* App Check : actif seulement si APPCHECK_ENFORCE=true (après avoir branché le client). */
export async function checkAppCheck(request) {
  if (process.env.APPCHECK_ENFORCE !== "true") return true;
  const token = request.headers.get("x-firebase-appcheck");
  if (!token) return false;
  try {
    await adminAppCheck().verifyToken(token);
    return true;
  } catch {
    return false;
  }
}