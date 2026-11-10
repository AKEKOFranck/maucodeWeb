"use client";

/* Section « aller plus loin ». Elle est séparée de la page parce que ContactForm
   et sa constante BESOIN_SEANCE viennent d'un fichier "use client" :
   un composant serveur ne peut pas lire cette constante directement. */
import { SESSION_PRICE } from "@/lib/config";
import ContactForm, { BESOIN_SEANCE } from "@/components/ContactForm/contactform";
import styles from "./page.module.css";

export default function InviteBox() {
  return (
    <section className={styles.invite}>
      <div className={styles.container}>
        <div className={`glass ${styles.inviteBox}`}>
          <h2>Envie d&apos;aller plus loin ?</h2>
          <p>
            Les parcours en ligne te donnent les bases. Pour une formation plus poussée,
            réserve une séance avec un formateur : <strong>{SESSION_PRICE} la séance</strong>.
            Dis-nous quel logiciel tu veux approfondir et à quel moment tu es disponible,
            nous fixons la séance avec toi.
          </p>
          <div className={styles.inviteActions}>
            <ContactForm label="Réserver une séance" variant="primary" defaultBesoin={BESOIN_SEANCE} />
            <ContactForm label="Poser une question" variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}