"use client";

import Link from "next/link";
import { Visual, Quiz, Exercise } from "@/components/Lesson/lesson";
import { useProgress, stateOf, isUnlocked, minToPass } from "@/lib/progress";
import pg from "../page.module.css";
import s from "./Moduleflow.module.css";

export default function ModuleFlow({ courseSlug, courseTitle, moduleSlugs, index, module: mod, prev, next }) {
  const { progress, ready, record } = useProgress();

  if (!ready) {
    return (
      <section className={pg.container}>
        <p className={s.loading}>Chargement…</p>
      </section>
    );
  }

  /* Module verrouillé : on bloque aussi l'accès par l'adresse directe */
  if (!isUnlocked(progress, courseSlug, moduleSlugs, index)) {
    return (
      <section className={pg.container}>
        <div className={s.lockedBox} role="status">
          <h2>🔒 Ce module est verrouillé</h2>
          <p>
            Pour accéder à ce module de la formation {courseTitle}, réussis d'abord le quiz du module
            précédent{prev ? <> : <strong>{prev.title}</strong></> : null}.
          </p>
          <div className={s.actions}>
            {prev && <Link href={`/works/${courseSlug}/${prev.slug}`} className={s.btn}>Aller au module précédent</Link>}
            <Link href={`/works/${courseSlug}`} className={s.btnGhost}>Voir la formation</Link>
          </div>
        </div>
      </section>
    );
  }

  const res = stateOf(progress, courseSlug, mod.slug);
  const total = mod.quiz.length;

  return (
    <div className={pg.container}>
      {/* 1. Le cours */}
      {mod.chapters.map((c, i) => (
        <section key={c.title} className={s.chapter}>
          <h2 className={s.chapterTitle}><span className={s.chapterNum}>{i + 1}</span> {c.title}</h2>
          {c.explain.map((p) => <p key={p} className={s.explain}>{p}</p>)}
          <Visual v={c.visual} />
          {c.tip && <p className={s.tip}><strong>Astuce :</strong> {c.tip}</p>}
        </section>
      ))}

      {/* 2. Le quiz : il valide le module */}
      <section className={s.block}>
        <h2 className={s.blockTitle}>Teste-toi</h2>
        <p className={s.hint}>
          Il faut au moins {minToPass(total)} bonnes réponses sur {total} pour valider ce module
          {next ? " et débloquer le suivant" : ""}.
        </p>
        <Quiz
          questions={mod.quiz}
          onFinish={(score, tot) => record(courseSlug, mod.slug, score, tot)}
        />
      </section>

      {/* 3. L'exercice */}
      {mod.exercise && (
        <section className={s.block}>
          <h2 className={s.blockTitle}>À toi de jouer</h2>
          <Exercise exercise={mod.exercise} />
        </section>
      )}

      {/* 4. La suite */}
      <section className={s.bottom}>
        {res.done ? (
          <>
            <p className={s.validated}>✓ Module validé ({res.score}/{res.total})</p>
            <div className={s.actions}>
              {next ? (
                <Link href={`/works/${courseSlug}/${next.slug}`} className={s.btn}>Module suivant : {next.title} →</Link>
              ) : (
                <Link href={`/works/${courseSlug}`} className={s.btn}>Terminer la formation →</Link>
              )}
              <Link href={`/works/${courseSlug}`} className={s.btnGhost}>Retour à la formation</Link>
            </div>
          </>
        ) : (
          <p className={s.hint}>Réussis le quiz pour valider ce module.</p>
        )}
      </section>
    </div>
  );
}