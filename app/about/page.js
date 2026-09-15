import Link from "next/link";

import {
  FiBookOpen,
  FiMonitor,
  FiMapPin,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";



import styles from "./page.module.css";


const aboutItems = [
  {
    id: 1,

    icon: FiBookOpen,

    title: "Apprendre",

    description:
      "Des formations simples et accessibles pour apprendre les bases de Word, Excel et PowerPoint.",
  },

  {
    id: 2,

    icon: FiMonitor,

    title: "Créer",

    description:
      "Des sites web vitrines et des solutions e-commerce simplifiées pour présenter votre activité en ligne.",
  },

  {
    id: 3,

    icon: FiMapPin,

    title: "À Abidjan",

    description:
      "Des solutions pensées pour les particuliers, entrepreneurs et petites structures à Abidjan.",
  },

  {
    id: 4,

    icon: FiGlobe,

    title: "En ligne",

    description:
      "Les formations peuvent également être suivies à distance, selon vos disponibilités.",
  },
];


export default function AboutPage() {

  return (
    <div className={styles.page}>

      <main>

        <section className={styles.aboutSection}>

          


          <div className={styles.hero}>

            <span className={styles.badge}>
              À propos de MauCodeWeb
            </span>

            <h1>
              Le numérique devient
              <span> plus accessible.</span>
            </h1>

            <p>
              MauCodeWeb est une plateforme de l'univers MauCode,
              dédiée à la formation numérique et à la création de
              sites web accessibles.
            </p>

          </div>


          <div className={styles.aboutContent}>

            <div className={styles.textBlock}>

              <span className={styles.smallTitle}>
                NOTRE MISSION
              </span>

              <h2>
                Apprendre, comprendre et créer.
              </h2>

              <p>
                MauCodeWeb a été pensé pour permettre au plus grand
                nombre d'acquérir des bases pratiques dans le domaine
                du numérique.
              </p>

              <p>
                La plateforme propose notamment des formations
                accessibles sur les outils bureautiques essentiels
                comme Microsoft Word, Excel et PowerPoint.
              </p>

              <p>
                En parallèle, MauCodeWeb accompagne également les
                particuliers, entrepreneurs et petites structures
                dans la création de sites web vitrines et de
                solutions e-commerce simplifiées.
              </p>

            </div>


            <div className={styles.cards}>

              {aboutItems.map((item) => {

                const Icon = item.icon;

                return (
                  <article
                    key={item.id}
                    className={styles.card}
                  >

                    <div className={styles.icon}>
                      <Icon />
                    </div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                  </article>
                );

              })}

            </div>

          </div>


          <div className={styles.bottomCta}>

            <div>

              <span>
                Une question ou un projet ?
              </span>

              <h2>
                Parlons de votre projet.
              </h2>

            </div>

            <Link
              href="mailto:fr0055970@gmail.com"
              className={styles.ctaButton}
            >
              Nous contacter

              <FiArrowRight />
            </Link>

          </div>


          <div className={styles.maucodeLink}>

            <p>
              MauCodeWeb fait partie de l'univers MauCode.
            </p>

            <a
              href="https://maucode2.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Découvrir MauCode

              <FiArrowRight />
            </a>

          </div>

        </section>

      </main>


     
    </div>
  );
}