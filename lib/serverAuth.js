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

/* App Check : actif seulement si APPCHECK_ENFORCE=true (après avoir branché le client).
   En cas de refus, la cause est écrite dans les logs serveur (jamais le jeton lui-même). */
export async function checkAppCheck(request) {
  if (process.env.APPCHECK_ENFORCE !== "true") return true;
  const token = request.headers.get("x-firebase-appcheck");
  if (!token) {
    console.warn("[appcheck] refusé : en-tête X-Firebase-AppCheck absent");
    return false;
  }
  try {
    await adminAppCheck().verifyToken(token);
    return true;
  } catch (e) {
    console.warn("[appcheck] refusé : jeton invalide ou vérification impossible :", e?.code || e?.message);
    return false;
  }
}

/* ---------- Raccourcis pour les routes d'API ----------
   Utilisation dans une route :

     const auth = await requireUser(request);
     if (!auth.ok) return auth.response;
     const { uid } = auth.decoded;

   Pour une route réservée à l'admin : requireAdmin(request).
   Les messages restent volontairement vagues : on ne dit pas à un inconnu pourquoi il est refusé. */

const deny = (status, message) => ({
  ok: false,
  response: Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } }),
});

/* Utilisateur connecté (session non révoquée) */
export async function requireUser(request) {
  const decoded = await verifyBearer(request, { checkRevoked: true });
  if (!decoded) return deny(401, "Connexion requise.");
  return { ok: true, decoded };
}

/* Administrateur : jeton valide, non révoqué, claim "admin" à true */
export async function requireAdmin(request) {
  const decoded = await verifyBearer(request, { checkRevoked: true });
  if (!decoded) return deny(401, "Connexion requise.");
  if (!isAdminToken(decoded)) return deny(403, "Accès refusé.");
  return { ok: true, decoded };
}