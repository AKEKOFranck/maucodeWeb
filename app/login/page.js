"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import s from "./page.module.css";

const MESSAGES = {
  "auth/popup-closed-by-user": "Tu as fermé la fenêtre avant la fin. Réessaie.",
  "auth/cancelled-popup-request": "Une seule fenêtre de connexion à la fois. Réessaie.",
  "auth/popup-blocked": "Ton navigateur a bloqué la fenêtre. Autorise les pop-ups pour ce site.",
  "auth/unauthorized-domain": "Ce site n'est pas encore autorisé pour la connexion.",
  "auth/network-request-failed": "Pas de connexion internet. Vérifie ton réseau.",
};

/*
  Sécurité : on n'accepte que les adresses internes au site pour la redirection après connexion.
  Cela évite qu'un lien piégé comme /login?next=//site-malveillant.com renvoie l'utilisateur ailleurs.
*/
function safeNext(value) {
  if (typeof value !== "string") return "/works";
  if (!/^\/(?![/\\])/.test(value)) return "/works"; // doit commencer par un seul "/"
  if (/[\u0000-\u001f\u007f]/.test(value)) return "/works"; // pas de caractères de contrôle
  return value;
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function loginGoogle() {
    setBusy(true);
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(safeNext(next));
    } catch (e) {
      console.error(e);
      setError(MESSAGES[e.code] || "Connexion impossible. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  const firstName = user?.displayName?.split(" ")[0];

  return (
    <main className={s.page}>
      <div className={s.card}>
        <Image src="/LogoMC.png" alt="MauCode" width={64} height={64} className={s.logo} />

        {loading ? (
          <p className={s.lead}>Chargement…</p>
        ) : user ? (
          <>
            <h1 className={s.title}>Bonjour {firstName || ""} 👋</h1>
            <p className={s.lead}>Tu es connecté. Ta progression est enregistrée sur ton compte.</p>
            <Link href="/works" className={s.primary}>Continuer ma formation</Link>
            <button onClick={logout} className={s.link}>Se déconnecter</button>
          </>
        ) : (
          <>
            <h1 className={s.title}>Crée ton compte ou connecte-toi</h1>
            <p className={s.lead}>
              Ton compte garde ta progression et tes scores : tu les retrouves sur ton téléphone
              comme sur ton ordinateur.
            </p>
            <button onClick={loginGoogle} disabled={busy} className={s.google}>
              <GoogleIcon />
              {busy ? "Connexion…" : "Continuer avec Google"}
            </button>
            <p className={s.alt}>
              Nous gardons ton adresse e-mail Google pour gérer ton compte, et ta progression pour
              l'afficher. Rien n'est partagé avec d'autres.
            </p>
            {error && <p className={s.error} role="alert">{error}</p>}
            <p className={s.alt}>
              Pas envie de te connecter ? <Link href="/works">Voir les formations</Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}