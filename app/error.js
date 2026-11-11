"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";
import styles from "./not-found.module.css";

/* Page affichée si une page plante pendant l'utilisation.
   Le message technique n'est JAMAIS montré au visiteur (il peut révéler des détails internes) :
   on affiche seulement un code de référence, que tu retrouves dans les journaux Vercel. */
export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.main}>
      <div className={styles.ambient} aria-hidden="true" />

      <section className={`glass ${styles.panel}`} aria-labelledby="err-title">
        <span className={styles.icon} aria-hidden="true">
          <FiAlertTriangle />
        </span>

        <h1 id="err-title" className={styles.title}>
          Pause technique
        </h1>
        <p className={styles.text}>
          Un problème est survenu de notre côté. Réessaie dans un instant, ou
          retourne au Hub.
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.btnPrimary} onClick={() => reset()}>
            Réessayer
          </button>
          <Link href="/" className={styles.btnGlass}>
            Retour au Hub
          </Link>
        </div>

        <p className={styles.code}>
          Erreur inattendue{error?.digest ? ` · référence ${error.digest}` : ""}
        </p>
      </section>
    </main>
  );
}