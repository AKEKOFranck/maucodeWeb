"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiLock } from "react-icons/fi";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import PayBox from "@/components/PayBox/PayBox";
import ModuleFlow from "./Moduleflow";
import pg from "../page.module.css";
import s from "./Moduleflow.module.css";

/* Porte d'entrée d'un module. Module gratuit : on affiche directement ModuleFlow.
   Module payant : on charge le contenu via /api/module (jeton Firebase), ou on propose le paiement. */
export default function ModuleGate(props) {
  const { paid, moduleSlug, courseSlug, courseTitle } = props;
  const { user, loading } = useAuth();
  const [mod, setMod] = useState(props.module);
  const [state, setState] = useState(paid ? "loading" : "ready");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!paid || loading) return;
    if (!user) {
      setState("login");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const token = await user.getIdToken();
        const url = `/api/module?course=${encodeURIComponent(courseSlug)}&module=${encodeURIComponent(moduleSlug)}`;
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
        if (cancelled) return;
        if (res.status === 402) return setState("pay");
        if (!res.ok) return setState("error");
        const data = await res.json();
        if (cancelled) return;
        setMod(data.module);
        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [paid, loading, user, courseSlug, moduleSlug, tick]);

  if (state === "ready" && mod) return <ModuleFlow {...props} module={mod} />;

  const back = encodeURIComponent(`/works/${courseSlug}/${moduleSlug}`);

  return (
    <section className={pg.container}>
      {state === "loading" && <p className={s.loading}>Chargement…</p>}

      {state === "login" && (
        <div className={`glass ${s.lockedBox}`} role="status">
          <FiLock className={s.lockIcon} aria-hidden="true" />
          <h2>Connecte-toi pour continuer</h2>
          <p>
            Le premier module est gratuit. Pour la suite de la formation {courseTitle}, crée ton compte
            gratuit, puis débloque le cours complet.
          </p>
          <div className={s.actions}>
            <Link href={`/login?next=${back}`} className={s.btn}>
              Me connecter
            </Link>
            <Link href={`/works/${courseSlug}`} className={s.btnGhost}>
              Voir la formation
            </Link>
          </div>
        </div>
      )}

      {state === "pay" && (
        <PayBox courseSlug={courseSlug} courseTitle={courseTitle} onUnlocked={() => setTick((n) => n + 1)} />
      )}

      {state === "error" && (
        <div className={`glass ${s.lockedBox}`} role="alert">
          <h2>Chargement impossible</h2>
          <p>Vérifie ta connexion puis réessaie.</p>
          <div className={s.actions}>
            <button type="button" className={s.btn} onClick={() => setTick((n) => n + 1)}>
              Réessayer
            </button>
          </div>
        </div>
      )}
    </section>
  );
}