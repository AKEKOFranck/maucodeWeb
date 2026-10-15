"use client";

import Link from "next/link";
import { useProgress, stateOf, isUnlocked } from "@/lib/progress";
import s from "./ModuleCard.module.css";

export default function ModuleCard({ courseSlug, moduleSlugs, index, module: m }) {
  const { progress, ready } = useProgress();

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
        {ready && res.done && `✓ Terminé (${res.score}/${res.total})`}
        {ready && !res.done && unlocked && "Commencer"}
        {ready && !unlocked && "🔒 Verrouillé"}
      </span>
    </>
  );

  /* Avant la lecture de la sauvegarde : carte neutre, pour éviter un clignotement */
  if (!ready) return <div className={s.card}>{content}</div>;

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