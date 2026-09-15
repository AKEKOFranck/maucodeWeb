import styles from "./not-found.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.overlay}>

        <h1 className={styles.code}>404</h1>

        <h2 className={styles.title}>
          Oups... cette page n'existe plus.
        </h2>

        <p className={styles.description}>
          Retournons-nous.
        </p>

        <Link href="/" className={styles.button}>
          Retour à l'accueil
        </Link>

      </div>
    </main>
  );
}