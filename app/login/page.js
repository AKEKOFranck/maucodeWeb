"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FiUser } from "react-icons/fi";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import s from "./page.module.css";

const MESSAGES = {
  "auth/popup-closed-by-user": "Tu as fermé la fenêtre avant la fin. Réessaie.",
  "auth/cancelled-popup-request": "Une seule fenêtre de connexion à la fois. Réessaie.",
  "auth/popup-blocked": "Ton navigateur a bloqué la fenêtre. Autorise les pop-ups pour ce site.",
  "auth/unauthorized-domain": "Ce site n'est pas encore autorisé pour la connexion.",
  "auth/network-request-failed": "Pas de connexion internet. Vérifie ton réseau.",
  "auth/operation-not-supported-in-this-environment":
    "Cette application ne permet pas la connexion Google. Ouvre le site dans Chrome ou Safari.",
};

/*
  Sécurité : on n'accepte que les adresses internes au site pour la redirection après connexion.
  Cela évite qu'un lien piégé comme /login?next=//site-malveillant.com renvoie l'utilisateur ailleurs.
*/
function safeNext(value) {
  if (typeof value !== "string") return "/compte";
  if (!/^\/(?![/\\])/.test(value)) return "/compte"; // doit commencer par un seul "/"
  if (/[\u0000-\u001f\u007f]/.test(value)) return "/compte"; // pas de caractères de contrôle
  return value;
}

/* Sans paramètre ?next=, on va sur la page de compte */
function readTarget() {
  const raw = new URLSearchParams(window.location.search).get("next");
  return raw ? safeNext(raw) : "/compte";
}

function GoogleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const tileRefs = useRef([]);

  /* Déjà connecté (ou connexion réussie) : on part vers la destination */
  useEffect(() => {
    if (loading || !user) return;
    router.replace(readTarget());
  }, [loading, user, router]);

  async function loginGoogle() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      // La redirection est faite par l'effet ci-dessus dès que le compte est reconnu
    } catch (e) {
      console.error(e);
      setError(MESSAGES[e.code] || "Connexion impossible. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  /* Flèches ← → : on passe d'un profil à l'autre */
  const onKeyDown = (e) => {
    const list = tileRefs.current.filter(Boolean);
    const i = list.indexOf(document.activeElement);
    if (i === -1) return;

    let n = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = Math.min(i + 1, list.length - 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = Math.max(i - 1, 0);
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = list.length - 1;
    if (n === null) return;

    e.preventDefault();
    list[n].focus();
  };

  return (
    <main className={s.page}>
      <div className={`glass ${s.card}`}>
        <Image src="/LogoMC.png" alt="MauCode" width={64} height={64} className={s.logo} />

        {loading || user ? (
          <p className={s.lead} role="status">
            {user ? "Redirection…" : "Chargement…"}
          </p>
        ) : (
          <>
            <h1 className={s.title}>Crée ton compte ou connecte-toi</h1>
            <p className={s.lead}>
              Ton compte garde ta progression et tes scores : tu les retrouves sur ton téléphone
              comme sur ton ordinateur.
            </p>

            <div className={s.tiles} role="group" aria-label="Choisir un profil" onKeyDown={onKeyDown}>
              <button
                type="button"
                ref={(el) => {
                  tileRefs.current[0] = el;
                }}
                onClick={loginGoogle}
                disabled={busy}
                aria-busy={busy}
                className={`console-card ${s.tile} ${s.tilePrimary}`}
              >
                <span className={`${s.tileIcon} ${s.tileIconWhite}`} aria-hidden="true">
                  <GoogleIcon />
                </span>
                <span className={s.tileName}>{busy ? "Connexion…" : "Continuer avec Google"}</span>
                <span className={s.tileMeta}>Compte gratuit</span>
              </button>

              <Link
                ref={(el) => {
                  tileRefs.current[1] = el;
                }}
                href="/works"
                className={`console-card ${s.tile} ${s.tileAlt}`}
              >
                <span className={s.tileIcon} aria-hidden="true">
                  <FiUser />
                </span>
                <span className={s.tileName}>Invité</span>
                <span className={s.tileMeta}>1er module gratuit</span>
              </Link>
            </div>

            <p className={s.alt}>
              Nous gardons ton adresse e-mail Google pour gérer ton compte, et ta progression pour
              l&apos;afficher. Rien n&apos;est partagé avec d&apos;autres.
            </p>
            {error && (
              <p className={s.error} role="alert">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}