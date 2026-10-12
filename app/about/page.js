import Image from "next/image";
import styles from "./page.module.css";
import ContactForm from "@/components/ContactForm/contactform";

const infos = [
  {
    title: "Des cours 100 % en ligne",
    text: "Vous suivez les formations Office depuis chez vous, avec un formateur en direct. Il suffit d'une connexion internet et d'un ordinateur.",
  },
  {
    title: "Un emploi du temps créé avec vous",
    text: "Nous ne vous imposons pas de calendrier. Les jours et les horaires des séances sont fixés ensemble, selon votre disponibilité.",
  },
  {
    title: "Site web : parlons-en d'abord",
    text: "Chaque site est différent. Pour un projet de création de site web, contactez-nous : nous échangeons sur vos besoins avant de commencer.",
  },
];

export default function About() {
  return (
    <main className={styles.main}>
      <section className={styles.presentation}>
        <Image
          src="/fondAbout (2).png"
          alt="L'équipe Maucode"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle} style={{ "--i": 0 }}>
            Apprendre à votre rythme.
            <br />
            Créer à votre image.
          </h1>
          <p className={styles.heroText} style={{ "--i": 1 }}>
            Maucode forme aux bases d&apos;Office et réalise des sites web,
            avec une équipe qui reste à votre écoute.
          </p>
        </div>
      </section>

      <section className={styles.fonctionnement}>
        <div className={styles.container}>
          <div className={styles.fonctionnementGrid}>
            <h2 className={styles.fonctionnementTitle}>
              Comment ça se passe chez Maucode
            </h2>

            <ul className={styles.infoList}>
              {infos.map((info) => (
                <li key={info.title} className={styles.infoCard}>
                  <h3>{info.title}</h3>
                  <p>{info.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.invitation}>
        <div className={styles.container}>
          <div className={styles.inviteBox}>
            <h2>Parlez-nous de votre besoin</h2>
            <p>
              Une formation à organiser ou un site à créer ? Remplissez un
              petit formulaire : votre message part directement vers la boîte
              Gmail de Maucode.
            </p>
            <div className={styles.inviteActions}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}