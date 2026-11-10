"use client";

import Link from "next/link";
import { FiCheck, FiLock, FiPlay, FiUserPlus } from "react-icons/fi";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { useProgress, stateOf, isUnlocked } from "@/lib/progress";
import { FREE_MODULES_PER_COURSE } from "@/lib/config";
import s from "./ModuleCard.module.css";

export default function ModuleCard({ courseSlug, moduleSlugs, index, module: m }) {
  const { user, loading: authLoading } = useAuth();
  const { progress, ready } = useProgress();

  const settled = ready && !authLoading;
  const free = index < FREE_MODULES_PER_COURSE;
  const guest = settled && !user;
  const guestLocked = guest && !free;
  const unlocked = ready && isUnlocked(progress, courseSlug, moduleSlugs, index);
  const res = stateOf(progress, courseSlug, m.slug);

  /* Même logique qu'avant, avec une icône en plus du texte */
  let status = null;
  if (guestLocked) status = { Icon: FiUserPlus, label: "Compte requis" };
  else if (settled && res.done) status = { Icon: FiCheck, label: `Terminé (${res.score}/${res.total})` };
  else if (guest && free) status = { Icon: FiPlay, label: "Gratuit · Commencer" };
  else if (settled && !guest && unlocked) status = { Icon: FiPlay, label: "Commencer" };
  else if (settled && !guest && !unlocked) status = { Icon: FiLock, label: "Verrouillé" };

  const lockedByQuiz = settled && !guest && !unlocked;

  const content = (
    <>
      <span className={s.num}>{index + 1}</span>
      <div className={s.body}>
        <h3 className={s.title}>{m.title}</h3>
        {m.intro && <p className={s.desc}>{m.intro}</p>}
        {lockedByQuiz && <p className={s.lockHint}>Valide le quiz du module précédent pour l&apos;ouvrir.</p>}
      </div>
      {status && (
        <span className={s.status}>
          <status.Icon aria-hidden="true" /> {status.label}
        </span>
      )}
    </>
  );

  /* Avant la lecture de la sauvegarde : carte neutre, pour éviter un clignotement */
  if (!settled) return <div className={s.card}>{content}</div>;

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
      <div className={`${s.card} ${s.locked}`} aria-disabled="true">
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