import Image from "next/image";
import { FiMonitor, FiCalendar, FiCode } from "react-icons/fi";
import ContactForm from "@/components/ContactForm/contactform";
import { whatsappLink, WHATSAPP_GENERAL_MESSAGE } from "@/lib/config";
import styles from "./page.module.css";

export const metadata = {
  title: "À propos",
  description:
    "MauCodeWeb forme aux bases d'Office (Word, Excel, PowerPoint) et crée des sites web à Abidjan. Cours en ligne, horaires fixés avec vous.",
  alternates: { canonical: "/about" },
};

const infos = [
  {
    icon: FiMonitor,
    title: "Des cours 100 % en ligne",
    text: "Vous suivez les formations Office depuis chez vous, avec un formateur en direct. Il suffit d'une connexion internet et d'un ordinateur.",
  },
  {
    icon: FiCalendar,
    title: "Un emploi du temps créé avec vous",
    text: "Nous ne vous imposons pas de calendrier. Les jours et les horaires des séances sont fixés ensemble, selon votre disponibilité.",
  },
  {
    icon: FiCode,
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
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Apprendre à votre rythme.
            <br />
            Créer à votre image.
          </h1>
          <p className={styles.heroText}>
            MauCode forme aux bases d&apos;Office et réalise des sites web, avec
            une équipe qui reste à votre écoute.
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
              {infos.map((info) => {
                const Icon = info.icon;
                return (
                  <li key={info.title} className={`glass ${styles.infoCard}`}>
                    <span className={styles.infoIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3>{info.title}</h3>
                      <p>{info.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.invitation}>
        <div className={styles.container}>
          <div className={styles.inviteBox}>
            <h2>Parlez-nous de votre besoin</h2>
            <p>
              Une formation à organiser ou un site à créer ? Remplissez le petit
              formulaire : votre demande part sur WhatsApp vers l&apos;équipe
              Maucode.
            </p>
            <div className={styles.inviteActions}>
              <ContactForm label="Ouvrir le formulaire" variant="primary" />
              <a
                href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnGlass}
              >
                Écrire sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}