"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getChoice, setChoice, isValidSlug, toolLabel } from "@/lib/attestation";
import styles from "./AttestationPrompt.module.css";

/**
 * À afficher quand TOUS les modules + quiz d'une formation sont validés.
 * Props : slug (slug du cours), courseTitle (titre du cours)
 */
export default function AttestationPrompt({ slug, courseTitle }) {
  const valid = isValidSlug(slug);
  const tool = toolLabel(slug, courseTitle);

  const [choice, setChoiceState] = useState(undefined); // undefined = pas encore lu
  const [open, setOpen] = useState(false);
  const [understood, setUnderstood] = useState(false);

  useEffect(() => {
    if (!valid) return;
    const saved = getChoice(slug);
    setChoiceState(saved);
    setOpen(saved === null);
  }, [slug, valid]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!valid || choice === undefined) return null;

  const answer = (value) => {
    setChoice(slug, value);
    setChoiceState(value);
    setOpen(false);
  };

  const href = `/attestation/${encodeURIComponent(slug)}`;

  return (
    <>
      {/* Rappel discret une fois la fenêtre fermée */}
      {!open && choice === "yes" && (
        <div className={styles.inline}>
          <span>Tu as demandé ton attestation de réussite {tool}.</span>
          <Link href={href} className={styles.linkBtn}>
            Obtenir mon attestation
          </Link>
        </div>
      )}
      {!open && choice === "no" && (
        <div className={styles.inline}>
          <span>Tu n&apos;as pas souhaité d&apos;attestation pour {tool}.</span>
          <button
            type="button"
            className={styles.textBtn}
            onClick={() => {
              setUnderstood(false);
              setOpen(true);
            }}
          >
            J&apos;ai changé d&apos;avis
          </button>
        </div>
      )}

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="att-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="att-title" className={styles.title}>
              Félicitations, tu as terminé la formation {tool} ! 🎉
            </h2>

            <p className={styles.text}>
              Souhaites-tu recevoir une <strong>attestation de réussite</strong> ? Elle indique que tu as
              suivi le parcours, validé les quiz et acquis les bases nécessaires à la maîtrise de {tool}.
            </p>

            <div className={styles.notice}>
              <strong>À savoir avant de répondre :</strong>
              <ul>
                <li>
                  Cette attestation est délivrée par <strong>Maucode</strong>, organisme de formation privé
                  en ligne.
                </li>
                <li>
                  Elle <strong>n&apos;est pas un diplôme</strong> et{" "}
                  <strong>n&apos;est pas validée ni reconnue par l&apos;État de Côte d&apos;Ivoire</strong>.
                </li>
                <li>Elle ne confère aucun grade ni équivalence académique ou professionnelle.</li>
                <li>
                  Ton nom y sera inscrit : il n&apos;est utilisé que pour générer ton document, à ta demande.
                </li>
              </ul>
            </div>

            <label className={styles.check}>
              <input
                type="checkbox"
                checked={understood}
                onChange={(e) => setUnderstood(e.target.checked)}
              />
              <span>J&apos;ai compris que cette attestation n&apos;est pas validée par l&apos;État.</span>
            </label>

            <div className={styles.actions}>
              <button type="button" className={styles.secondary} onClick={() => answer("no")}>
                Non, merci
              </button>
              <button
                type="button"
                className={styles.primary}
                disabled={!understood}
                onClick={() => answer("yes")}
              >
                Oui, je veux mon attestation
              </button>
            </div>

            <p className={styles.hint}>Tu pourras changer d&apos;avis plus tard.</p>
          </div>
        </div>
      )}
    </>
  );
}