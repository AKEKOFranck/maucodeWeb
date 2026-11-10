"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiAward, FiLock } from "react-icons/fi";
import { Visual, Quiz, Exercise } from "@/components/Lesson/lesson";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { useProgress, stateOf, isUnlocked, minToPass } from "@/lib/progress";
import { FREE_MODULES_PER_COURSE } from "@/lib/config";
import AttestationPrompt from "@/components/AttestationPrompt/AttestationPrompt";
import { saveCourseInfo } from "@/lib/attestation";
import pg from "../page.module.css";
import s from "./Moduleflow.module.css";

/* Le module est joué étape par étape : un chapitre par écran, puis le quiz,
   l'exercice et le bilan. Les accès (compte, gratuité, verrouillage) sont ceux d'avant.
   Le quiz est corrigé par le serveur (POST /api/quiz) : submitQuiz envoie les réponses. */
export default function ModuleFlow({ courseSlug, courseTitle, moduleSlugs, index, module: mod, prev, next }) {
  const { user, loading: authLoading } = useAuth();
  const { progress, ready, submitQuiz } = useProgress();
  const [step, setStep] = useState(0);
  const shownStep = useRef(0);

  /* Mémorise le titre et la liste des modules : la page d'attestation s'en sert */
  const modulesKey = moduleSlugs.join(",");
  useEffect(() => {
    saveCourseInfo(courseSlug, courseTitle, moduleSlugs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug, courseTitle, modulesKey]);

  /* Liste des étapes */
  const steps = [
    ...mod.chapters.map((c, i) => ({ id: `c${i}`, label: c.title, kind: "chapter", i })),
    { id: "quiz", label: "Teste-toi", kind: "quiz" },
    ...(mod.exercise ? [{ id: "exo", label: "À toi de jouer", kind: "exercise" }] : []),
    { id: "end", label: "Bilan", kind: "end" },
  ];
  const last = steps.length - 1;
  const quizIndex = steps.findIndex((x) => x.id === "quiz");

  const go = useCallback((n) => setStep(Math.min(Math.max(n, 0), last)), [last]);

  /* Quand l'étape change : on place le focus sur son titre et on remonte en haut de la leçon */
  useEffect(() => {
    if (shownStep.current === step) return;
    shownStep.current = step;
    const st = steps[step];
    if (!st) return;
    document.getElementById(`titre-${st.id}`)?.focus({ preventScroll: true });
    document.getElementById("lecon")?.scrollIntoView({ block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  /* Flèches ← → du clavier (sauf dans un champ de saisie ou la barre de navigation) */
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const t = e.target;
      if (t instanceof HTMLElement) {
        if (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
        if (t.closest("nav")) return;
      }
      if (e.key === "ArrowRight") go(step + 1);
      else if (e.key === "ArrowLeft") go(step - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, go]);

  if (!ready || authLoading) {
    return (
      <section className={pg.container}>
        <p className={s.loading}>Chargement…</p>
      </section>
    );
  }

  const isFree = index < FREE_MODULES_PER_COURSE;

  /* Compte obligatoire, sauf pour les modules gratuits */
  if (!user && !isFree) {
    const back = encodeURIComponent(`/works/${courseSlug}/${mod.slug}`);
    return (
      <section className={pg.container}>
        <div className={`glass ${s.lockedBox}`} role="status">
          <FiLock className={s.lockIcon} aria-hidden="true" />
          <h2>Crée ton compte pour suivre ce cours</h2>
          <p>
            C&apos;est gratuit et rapide avec Google. Ton compte garde ta progression et tes scores :
            tu les retrouves sur ton téléphone comme sur ton ordinateur.
          </p>
          <div className={s.actions}>
            <Link href={`/login?next=${back}`} className={s.btn}>
              Créer mon compte
            </Link>
            <Link href={`/works/${courseSlug}`} className={s.btnGhost}>
              Voir la formation
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* Module verrouillé : on bloque aussi l'accès par l'adresse directe */
  if (!isUnlocked(progress, courseSlug, moduleSlugs, index)) {
    return (
      <section className={pg.container}>
        <div className={`glass ${s.lockedBox}`} role="status">
          <FiLock className={s.lockIcon} aria-hidden="true" />
          <h2>Ce module est verrouillé</h2>
          <p>
            Pour accéder à ce module de la formation {courseTitle}, réussis d&apos;abord le quiz du module
            précédent
            {prev ? (
              <>
                {" "}
                : <strong>{prev.title}</strong>
              </>
            ) : null}
            .
          </p>
          <div className={s.actions}>
            {prev && (
              <Link href={`/works/${courseSlug}/${prev.slug}`} className={s.btn}>
                Aller au module précédent
              </Link>
            )}
            <Link href={`/works/${courseSlug}`} className={s.btnGhost}>
              Voir la formation
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const res = stateOf(progress, courseSlug, mod.slug);
  const total = mod.quiz.length;
  const guest = !user;
  const afterLogin = encodeURIComponent(next ? `/works/${courseSlug}/${next.slug}` : `/works/${courseSlug}`);

  /* Formation terminée = tous les modules du cours sont validés */
  const courseDone = moduleSlugs.every((m) => stateOf(progress, courseSlug, m).done);

  const renderStep = (st) => {
    const titleId = `titre-${st.id}`;

    if (st.kind === "chapter") {
      const c = mod.chapters[st.i];
      return (
        <>
          <h2 id={titleId} tabIndex={-1} className={s.stepTitle}>
            <span className={s.chapterNum}>{st.i + 1}</span> {c.title}
          </h2>
          {c.explain.map((p) => (
            <p key={p} className={s.explain}>
              {p}
            </p>
          ))}
          <Visual v={c.visual} />
          {c.tip && (
            <p className={s.tip}>
              <strong>Astuce :</strong> {c.tip}
            </p>
          )}
        </>
      );
    }

    if (st.kind === "quiz") {
      return (
        <>
          <h2 id={titleId} tabIndex={-1} className={s.stepTitle}>
            Teste-toi
          </h2>
          <p className={s.hint}>
            Il faut au moins {minToPass(total)} bonnes réponses sur {total} pour valider ce module
            {next ? " et débloquer le suivant" : ""}.
          </p>
          <Quiz questions={mod.quiz} onSubmit={(answers) => submitQuiz(courseSlug, mod.slug, answers)} />
        </>
      );
    }

    if (st.kind === "exercise") {
      return (
        <>
          <h2 id={titleId} tabIndex={-1} className={s.stepTitle}>
            À toi de jouer
          </h2>
          <Exercise exercise={mod.exercise} />
        </>
      );
    }

    /* Bilan */
    return res.done ? (
      <div className={s.trophy}>
        <FiAward className={s.trophyIcon} aria-hidden="true" />
        <h2 id={titleId} tabIndex={-1} className={s.stepTitle}>
          Module validé
        </h2>
        <p className={s.trophyScore}>
          Ton score : {res.score}/{res.total}
        </p>

        {guest ? (
          <>
            <p className={s.hint}>
              Bravo ! Crée ton compte gratuit pour sauvegarder ce résultat et débloquer la suite.
            </p>
            <div className={s.actions}>
              <Link href={`/login?next=${afterLogin}`} className={s.btn}>
                Créer mon compte et continuer
              </Link>
              <Link href={`/works/${courseSlug}`} className={s.btnGhost}>
                Retour à la formation
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={s.actions}>
              {next ? (
                <Link href={`/works/${courseSlug}/${next.slug}`} className={s.btn}>
                  Module suivant : {next.title} →
                </Link>
              ) : (
                <Link href={`/works/${courseSlug}`} className={s.btn}>
                  Terminer la formation →
                </Link>
              )}
              <Link href={`/works/${courseSlug}`} className={s.btnGhost}>
                Retour à la formation
              </Link>
            </div>

            {/* Fin de formation : proposition d'attestation de réussite */}
            {!next && courseDone && <AttestationPrompt slug={courseSlug} courseTitle={courseTitle} />}
          </>
        )}
      </div>
    ) : (
      <>
        <h2 id={titleId} tabIndex={-1} className={s.stepTitle}>
          Bilan
        </h2>
        <p className={s.hint}>Réussis le quiz pour valider ce module.</p>
        <div className={s.actions}>
          <button type="button" className={s.btn} onClick={() => go(quizIndex)}>
            Aller au quiz
          </button>
        </div>
      </>
    );
  };

  return (
    <div className={pg.container}>
      {/* Bandeau pour les visiteurs sans compte */}
      {guest && (
        <p className={s.tip}>
          <strong>Module gratuit, sans compte.</strong> Fais-le jusqu&apos;au bout. Pour garder ton résultat
          et débloquer la suite, tu pourras créer ton compte gratuitement à la fin.
        </p>
      )}

      <div className={s.player} id="lecon">
        <div className={s.topbar}>
          <p className={s.counter}>
            Étape {step + 1} sur {steps.length} : {steps[step].label}
          </p>
          <div
            className={s.bar}
            role="progressbar"
            aria-label="Progression dans le module"
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-valuenow={step + 1}
          >
            <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          <ol className={s.dots}>
            {steps.map((st, i) => (
              <li key={st.id}>
                <button
                  type="button"
                  className={`${s.dot} ${i < step ? s.dotPast : ""} ${i === step ? s.dotOn : ""}`}
                  aria-label={`Étape ${i + 1} : ${st.label}`}
                  aria-current={i === step ? "step" : undefined}
                  onClick={() => go(i)}
                />
              </li>
            ))}
          </ol>
        </div>

        {steps.map((st, i) => (
          <section key={st.id} className={s.step} hidden={i !== step} aria-labelledby={`titre-${st.id}`}>
            {renderStep(st)}
          </section>
        ))}

        <div className={s.stepNav}>
          <button type="button" className={s.btnGhost} onClick={() => go(step - 1)} disabled={step === 0}>
            <FiArrowLeft aria-hidden="true" /> Précédent
          </button>
          {step < last && (
            <button type="button" className={s.btn} onClick={() => go(step + 1)}>
              Continuer <FiArrowRight aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}