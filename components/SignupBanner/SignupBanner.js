"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import s from "./SignupBanner.module.css";

const KEY = "maucode:signup-banner:dismissed-at";
const SNOOZE_DAYS = 30; // durée pendant laquelle le message reste caché après fermeture
const HIDDEN_ON = ["/login", "/admin"];

function recentlyDismissed() {
  try {
    const t = Number(localStorage.getItem(KEY));
    return t > 0 && Date.now() - t < SNOOZE_DAYS * 86400000;
  } catch {
    return false;
  }
}

export default function SignupBanner() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hiddenHere = HIDDEN_ON.some((p) => pathname.startsWith(p));
    if (loading || user || dismissed || hiddenHere || recentlyDismissed()) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, [loading, user, dismissed, pathname]);

  function dismiss() {
    setDismissed(true);
    setVisible(false);
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {}
  }

  if (!visible) return null;

  return (
    <aside className={s.banner} aria-label="Invitation à créer un compte">
      <p className={s.text}>
        <strong>Crée ton compte gratuit</strong> pour suivre ta progression dans les cours.
        C'est rapide avec Google, et ça nous aide à savoir quels cours améliorer. De nouvelles
        formations arrivent bientôt !
      </p>
      <div className={s.actions}>
        <Link href="/login" className={s.cta}>Créer mon compte</Link>
        <button type="button" className={s.close} onClick={dismiss} aria-label="Fermer ce message">
          ✕
        </button>
      </div>
    </aside>
  );
}