/* Donne ou retire le rôle administrateur (custom claim "admin") à un compte Firebase.
   Usage (e-mail OU uid) :
     node --env-file=.env.local scripts/set-admin.mjs fa0055970@gmail.com
     node --env-file=.env.local scripts/set-admin.mjs <uid>
     node --env-file=.env.local scripts/set-admin.mjs fa0055970@gmail.com --remove
   Ensuite, la personne doit se déconnecter puis se reconnecter. */
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const [who, flag] = process.argv.slice(2);
if (!who) {
  console.error("Usage : node --env-file=.env.local scripts/set-admin.mjs <email ou uid> [--remove]");
  process.exit(1);
}

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
if (!projectId || !clientEmail || !privateKey) {
  console.error("Variables FIREBASE_ADMIN_* manquantes dans .env.local");
  process.exit(1);
}

initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const auth = getAuth();

let user;
try {
  user = who.includes("@") ? await auth.getUserByEmail(who) : await auth.getUser(who);
} catch (e) {
  console.error(`Compte introuvable (${who}) : ${e.code || e.message}`);
  console.error("Vérifie l'e-mail ou l'UID dans Firebase Console > Authentication > Utilisateurs,");
  console.error(`et que FIREBASE_ADMIN_PROJECT_ID (${projectId}) est bien le même projet que le site.`);
  process.exit(1);
}

const uid = user.uid;
const claims = { ...(user.customClaims || {}) };

if (flag === "--remove") {
  delete claims.admin;
  await auth.setCustomUserClaims(uid, claims);
  await auth.revokeRefreshTokens(uid); // invalide les sessions existantes
  console.log(`Rôle admin retiré à ${user.email || uid}.`);
} else {
  claims.admin = true;
  await auth.setCustomUserClaims(uid, claims);
  const check = await auth.getUser(uid);
  console.log(`Rôle admin donné à ${check.email || uid} (uid : ${uid}).`);
  console.log("Claims enregistrés :", JSON.stringify(check.customClaims));
  console.log("Déconnexion puis reconnexion nécessaires.");
}