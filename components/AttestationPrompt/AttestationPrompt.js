"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiAward } from "react-icons/fi";
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
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!valid) return;
    const saved = getChoice(slug);
    setChoiceState(saved);
    setOpen(saved === null);
  }, [slug, valid]);

  /* Fenêtre ouverte : focus dedans, Tab reste dedans, Échap ferme, la page derrière ne défile pas */
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = dialogRef.current?.querySelectorAll(
        "button:not([disabled]), input:not([disabled]), a[href]"
      );
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && (current === first || current === dialogRef.current)) {
        e.preventDefault();
        lastNode.focus();
      } else if (!e.shiftKey && current === lastNode) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  if (!valid || choice === undefined) return null;

  const answer = (value) => {
    setChoice(slug, value);
    setChoiceState(value);
    setOpen(false);
  };

  const reopen = () => {
    setUnderstood(false);
    setOpen(true);
  };

  const href = `/attestation/${encodeURIComponent(slug)}`;

  return (
    <>
      {/* Rappel discret une fois la fenêtre fermée */}
      {!open && choice === null && (
        <div className={styles.inline}>
          <span>Tu peux demander ton attestation de réussite {tool}.</span>
          <button type="button" className={styles.linkBtn} onClick={reopen}>
            Choisir
          </button>
        </div>
      )}
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
          <button type="button" className={styles.textBtn} onClick={reopen}>
            J&apos;ai changé d&apos;avis
          </button>
        </div>
      )}

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div
            ref={dialogRef}
            tabIndex={-1}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="att-title"
            onClick={(e) => e.stopPropagation()}
          >
            <FiAward className={styles.icon} aria-hidden="true" />
            <h2 id="att-title" className={styles.title}>
              Félicitations, tu as terminé la formation {tool} !
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