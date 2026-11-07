/* SDK Firebase Admin : À UTILISER UNIQUEMENT CÔTÉ SERVEUR (routes API, pages serveur).
   Les 3 variables ne doivent JAMAIS commencer par NEXT_PUBLIC_. */
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function init() {
  if (getApps().length) return getApps()[0];

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Variables Firebase Admin manquantes");
  }
  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

/* Initialisation paresseuse : le build ne plante pas si les variables sont absentes */
export const adminAuth = () => getAuth(init());
export const adminDb = () => getFirestore(init());