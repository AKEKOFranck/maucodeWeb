"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { useProgress, stateOf, isUnlocked } from "@/lib/progress";
import { FREE_MODULES_PER_COURSE } from "@/lib/config";
import s from "./ModuleCard.module.css";

export default function ModuleCard({ courseSlug, moduleSlugs, index, module: m }) {
  const { user, loading: authLoading } = useAuth();
  const { progress, ready } = useProgress();

  const free = index < FREE_MODULES_PER_COURSE;
  const guest = ready && !authLoading && !user;
  const guestLocked = guest && !free;
  const unlocked = ready && isUnlocked(progress, courseSlug, moduleSlugs, index);
  const res = stateOf(progress, courseSlug, m.slug);

  const content = (
    <>
      <span className={s.num}>{index + 1}</span>
      <div className={s.body}>
        <h3 className={s.title}>{m.title}</h3>
        {m.intro && <p className={s.desc}>{m.intro}</p>}
      </div>
      <span className={s.status}>
        {guestLocked && "🔐 Compte requis"}
        {guest && free && (res.done ? `✓ Terminé (${res.score}/${res.total})` : "Gratuit · Commencer")}
        {!guest && ready && res.done && `✓ Terminé (${res.score}/${res.total})`}
        {!guest && ready && !res.done && unlocked && "Commencer"}
        {!guest && ready && !unlocked && "🔒 Verrouillé"}
      </span>
    </>
  );

  /* Avant la lecture de la sauvegarde : carte neutre, pour éviter un clignotement */
  if (!ready || authLoading) return <div className={s.card}>{content}</div>;

  if (guestLocked) {
    const back = encodeURIComponent(`/works/${courseSlug}`);
    return (
      <Link href={`/login?next=${back}`} className={s.card}>
        {content}
      </Link>
    );
  }

  if (!unlocked) {
    return (
      <div className={`${s.card} ${s.locked}`} aria-disabled="true" title="Réussis le quiz du module précédent pour débloquer celui-ci">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/works/${courseSlug}/${m.slug}`} className={`${s.card} ${res.done ? s.done : ""}`}>
      {content}
    </Link>
  );
}