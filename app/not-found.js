import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.ambient} aria-hidden="true" />

      <section className={`glass ${styles.panel}`} aria-labelledby="nf-title">
        <span className={styles.icon} aria-hidden="true">
          <FiAlertTriangle />
        </span>

        <h1 id="nf-title" className={styles.title}>
          Game over
        </h1>
        <p className={styles.text}>
          Cette page a quitté la partie. Retourne au Hub pour reprendre là où tu
          t&apos;es arrêté.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrimary}>
            Retour au Hub
          </Link>
          <Link href="/works" className={styles.btnGlass}>
            Voir les formations
          </Link>
        </div>

        <p className={styles.code}>Erreur 404 : page introuvable</p>
      </section>
    </main>
  );
}