"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onIdTokenChanged, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const AuthContext = createContext({ user: null, loading: true, isAdmin: false, logout: () => {} });

/* On note la dernière connexion une seule fois par session du navigateur,
   et non à chaque page vue : moins d'écritures Firestore, donc moins de coût et de quota. */
const PING_KEY = "mc-login-ping:";
const alreadyPinged = (uid) => {
  try {
    return sessionStorage.getItem(PING_KEY + uid) === "1";
  } catch {
    return false;
  }
};
const markPinged = (uid) => {
  try {
    sessionStorage.setItem(PING_KEY + uid, "1");
  } catch {
    /* ignoré */
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onIdTokenChanged : se déclenche aussi quand le jeton est renouvelé,
    // donc un rôle donné ou retiré est pris en compte sans attendre la prochaine connexion.
    return onIdTokenChanged(auth, async (u) => {
      let admin = false;
      if (u) {
        try {
          admin = (await u.getIdTokenResult()).claims.admin === true;
        } catch {
          admin = false;
        }
      }
      setUser(u);
      setIsAdmin(admin);
      setLoading(false);
      if (!u || alreadyPinged(u.uid)) return;

      try {
        await setDoc(
          doc(db, "users", u.uid),
          { uid: u.uid, lastLogin: serverTimestamp() },
          { merge: true }
        );
        markPinged(u.uid);
      } catch (e) {
        // Une erreur ici (règles Firestore, réseau) ne doit jamais bloquer le site
        console.error("Mise à jour du compte impossible :", e);
      }
    });
  }, []);

  const value = useMemo(
    () => ({ user, isAdmin, loading, logout: () => signOut(auth) }),
    [user, isAdmin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);