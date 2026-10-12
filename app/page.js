import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const concept = [
  {
    title: "Des bases solides",
    text: "Word, Excel, PowerPoint : on apprend ce qui sert vraiment au bureau, pas à pas.",
  },
  {
    title: "Du concret",
    text: "Chaque notion s'applique tout de suite à un cas réel de travail.",
  },
  {
    title: "Du digital sur mesure",
    text: "Nous concevons aussi des sites web propres, rapides et faits pour votre activité.",
  },
];

const services = [
  {
    id: "formation",
    theme: "light",
    title: "Formation Office",
    text: "Une formation claire pour travailler plus vite et sans stress sur les outils du quotidien.",
    items: [
      "Word : documents, mise en page, courriers",
      "Excel : tableaux, formules, graphiques",
      "PowerPoint : présentations qui se lisent bien",
      "Exercices pratiques et suivi personnalisé",
    ],
    cta: { label: "Voir les formations", href: "/works" },
  },
  {
    id: "web",
    theme: "dark",
    title: "Création de site web",
    text: "Un site qui présente votre activité et donne envie de vous contacter.",
    items: [
      "Site vitrine et page de présentation",
      "Design adapté au mobile",
      "Chargement rapide",
      "Mise en ligne et accompagnement",
    ],
    cta: { label: "Demander un site", href: "/webPage" },
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.presentation}>
        <Image
          src="/main.jpg"
          alt="Illustration Maucode"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />

        <div className={styles.heroContent}>
          <p className={styles.heroBrand} style={{ "--i": 0 }}>
            Maucode
          </p>
          <h1 className={styles.heroTitle} style={{ "--i": 1 }}>
            Maîtrisez Office.
            <br />
            Lancez votre site.
          </h1>
          <p className={styles.heroText} style={{ "--i": 2 }}>
            La plateforme qui forme aux bases d&apos;Office et crée les sites
            web des entrepreneurs.
          </p>
          <div className={styles.heroActions} style={{ "--i": 3 }}>
            <Link href="/works" className={styles.btnPrimary}>
              Commencer une formation
            </Link>
            <Link href="/webPage" className={styles.btnGhost}>
              Créer un site
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.concept}>
        <div className={styles.container}>
          <div className={styles.conceptHead}>
            <h2 className={styles.conceptTitle}>
              Maucode, c&apos;est apprendre simplement et construire en ligne.
            </h2>
            <p className={styles.conceptLead}>
              Nous enseignons les bases d&apos;Office à ceux qui veulent gagner
              en autonomie, et nous réalisons des sites web pour ceux qui
              veulent exister sur internet.
            </p>
          </div>

          <ul className={styles.conceptList}>
            {concept.map((item) => (
              <li key={item.title} className={styles.conceptItem}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.services}>
        <div className={styles.container}>
          <h2 className={styles.servicesTitle}>Nos services</h2>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <article
                key={service.id}
                className={`${styles.serviceCard} ${
                  service.theme === "dark"
                    ? styles.serviceDark
                    : styles.serviceLight
                }`}
              >
                <h3>{service.title}</h3>
                <p className={styles.serviceText}>{service.text}</p>

                <ul className={styles.serviceItems}>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <Link href={service.cta.href} className={styles.serviceLink}>
                  {service.cta.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.invitations}>
        <div className={styles.container}>
          <div className={styles.inviteBox}>
            <h2>Prêt à commencer avec Maucode ?</h2>
            <p>
              Inscrivez-vous à une formation Office ou parlez-nous de votre
              projet de site web. Nous vous répondons rapidement.
            </p>
            <div className={styles.inviteActions}>
              <Link href="/works" className={styles.btnDark}>
                Je m&apos;inscris
              </Link>
              <Link href="/about" className={styles.btnOutline}>
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}