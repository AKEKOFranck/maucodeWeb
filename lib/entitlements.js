import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebaseAdmin";
import { isPaidModule } from "@/lib/paymentConfig";

export const entitlementId = (uid, course) => `${uid}_${course}`;

export async function isEntitled(uid, course) {
  if (!uid) return false;
  const snap = await adminDb().collection("entitlements").doc(entitlementId(uid, course)).get();
  return snap.exists;
}

/* true si ce module est accessible : gratuit, ou cours payant débloqué */
export async function hasAccess(uid, course, moduleIndex) {
  if (!isPaidModule(course, moduleIndex)) return true;
  return isEntitled(uid, course);
}

export async function audit(action, uid, data = {}) {
  try {
    await adminDb().collection("auditLogs").add({ action, uid, ...data, at: FieldValue.serverTimestamp() });
  } catch (e) {
    console.error("audit :", e);
  }
}