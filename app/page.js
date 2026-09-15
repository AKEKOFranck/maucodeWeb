import Link from "next/link";
import Image from "next/image";

import {
  FiArrowRight,
  FiMonitor,
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiGlobe,
  FiShoppingBag,
} from "react-icons/fi";

import styles from "./page.module.css";


/* =====================================================
   DONNÉES DE LA FIRST SECTION
===================================================== */

const firstSection = {
  badge: "Formation & création numérique",

  title: "Apprenez le numérique. Créez votre présence en ligne.",

  description:
    "MauCodeWeb vous accompagne dans l’apprentissage des outils numériques essentiels et dans la création de sites web modernes, simples et adaptés à vos projets.",

  buttons: [
    {
      id: 1,
      label: "Découvrir les formations",
      href: "/works",
      type: "primary",
    },

    {
      id: 2,
      label: "Créer mon site",
      href: "/webPage",
      type: "secondary",
    },
  ],
};


/* =====================================================
   SERVICES DE LA FIRST SECTION
===================================================== */

const services = [
  {
    id: 1,

    type: "formation",

    icon: FiBookOpen,

    title: "Apprendre Office",

    description:
      "Apprenez les bases de Word, Excel et PowerPoint pour vos études, votre travail ou vos projets professionnels.",

    link: {
      label: "Découvrir les formations",
      href: "/works",
    },

    image: "/FondMain (1).png",

    alt: "Formation Word Excel PowerPoint",
  },

  {
    id: 2,

    type: "website",

    icon: FiMonitor,

    title: "Création de sites web",

    description:
      "Nous créons des sites vitrines et des solutions e-commerce simplifiées, modernes et adaptées à votre activité.",

    link: {
      label: "Découvrir nos services",
      href: "/webPage",
    },

    image: "/FondMain (2).png",

    alt: "Création de site web MauCodeWeb",
  },
];


/* =====================================================
   DONNÉES DE LA SECTION FORMATIONS
===================================================== */

const formationsSection = {
  badge: "Nos formations",

  title: "Les outils du quotidien, appris pas à pas.",

  description:
    "MauCodeWeb démarre tout juste, avec une conviction simple : le digital doit être accessible à tous, quel que soit le point de départ. Chaque formation est pensée pour être suivie sans expérience préalable.",

  price: {
    amount: "5 000",
    currency: "FCFA",
    unit: "/ module",
    note: "Vous ne payez que les modules suivis, sans abonnement ni engagement.",
  },

  format: {
    title: "100% en ligne",
    note:
      "L'emploi du temps est fixé ensemble, selon vos disponibilités, et maintenu sur toute la durée du parcours.",
  },

  modules: [
    { name: "Word", note: "Documents propres et professionnels" },
    { name: "Excel", note: "Données organisées et calculs automatiques" },
    { name: "PowerPoint", note: "Présentations claires et percutantes" },
  ],

  cta: {
    label: "Voir le programme complet",
    href: "/works",
  },
};


/* =====================================================
   DONNÉES DE LA SECTION CRÉATION DE SITES WEB
===================================================== */

const websiteSection = {
  badge: "Création de sites web",

  title: "Un site pensé pour votre budget de départ.",

  description:
    "Que vous ayez besoin d'une vitrine pour présenter votre activité ou d'une boutique pour vendre en ligne, nous construisons avec vous un site simple, moderne, et à un tarif qui reste abordable.",

  offers: [
    {
      id: 1,
      icon: FiGlobe,
      title: "Site vitrine",
      description:
        "Présentez votre activité, vos services et vos coordonnées sur un site clair et professionnel.",
      points: [
        "Design adapté à votre image",
        "Optimisé mobile et rapide",
        "Livré avec un accompagnement",
      ],
    },
    {
      id: 2,
      icon: FiShoppingBag,
      title: "Boutique e-commerce",
      description:
        "Vendez vos produits en ligne avec une boutique simple à gérer, du catalogue jusqu'au paiement.",
      points: [
        "Catalogue produits facile à mettre à jour",
        "Paiement adapté au contexte local",
        "Pensée pour évoluer avec votre activité",
      ],
    },
  ],

  cta: {
    label: "Demander un devis",
    href: "mailto:contact@maucodeweb.com",
  },
};


/* =====================================================
   COMPOSANT SERVICE CARD
===================================================== */

function ServiceCard({ service }) {

  const Icon = service.icon;

  return (
    <article
      className={`${styles.serviceCard} ${
        service.type === "website"
          ? styles.websiteCard
          : ""
      }`}
    >

      {/* =================================================
          CONTENU DE LA CARTE
      ================================================= */}

      <div className={styles.serviceContent}>

        <div className={styles.serviceIcon}>
          <Icon />
        </div>

        <h2>
          {service.title}
        </h2>

        <p>
          {service.description}
        </p>

        <Link
          href={service.link.href}
          className={styles.serviceLink}
        >
          <span>
            {service.link.label}
          </span>

          <FiArrowRight />

        </Link>

      </div>


      {/* =================================================
          IMAGE DE LA CARTE
      ================================================= */}

      <div className={styles.serviceImage}>

        <Image
          src={service.image}
          alt={service.alt}
          width={500}
          height={500}
        />

      </div>

    </article>
  );
}


/* =====================================================
   FIRST SECTION
===================================================== */

function FirstSection() {

  return (

    <section className={styles.first_section}>

      {/* =================================================
          HERO
      ================================================= */}

      <div className={styles.hero}>

        {/* BADGE */}

        <div className={styles.heroBadge}>

          <span className={styles.badgeDot}></span>

          <span>
            {firstSection.badge}
          </span>

        </div>


        {/* CONTENU HERO */}

        <div className={styles.heroContent}>

          <h1>
            {firstSection.title}
          </h1>

          <p>
            {firstSection.description}
          </p>


          {/* =================================================
              BOUTONS
          ================================================= */}

          <div className={styles.heroButtons}>

            {firstSection.buttons.map((button) => (

              <Link
                key={button.id}
                href={button.href}
                className={
                  button.type === "primary"
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
              >

                <span>
                  {button.label}
                </span>

                <FiArrowRight />

              </Link>

            ))}

          </div>

        </div>

      </div>


      {/* =================================================
          SERVICES
      ================================================= */}

      <div className={styles.services}>

        {services.map((service) => (

          <ServiceCard
            key={service.id}
            service={service}
          />

        ))}

      </div>

    </section>
  );
}


/* =====================================================
   SECTION FORMATIONS
===================================================== */

function FormationsSection() {

  const data = formationsSection;

  return (

    <section id="formations" className={styles.sectionWrap}>

      <div className={styles.sectionCard}>

        {/* EN-TÊTE DE SECTION */}

        <div className={styles.sectionHead}>

          <div className={styles.sectionBadge}>
            <span className={styles.badgeDot}></span>
            <span>{data.badge}</span>
          </div>

          <h2 className={styles.sectionTitle}>{data.title}</h2>

          <p className={styles.sectionText}>{data.description}</p>

        </div>


        {/* GRILLE D'INFOS */}

        <div className={styles.infoGrid}>

          {/* CARTE PRIX */}

          <div className={`${styles.infoCard} ${styles.priceCard}`}>
            <div className={styles.priceRow}>
              <span className={styles.priceAmount}>{data.price.amount}</span>
              <span className={styles.priceCurrency}>{data.price.currency}</span>
              <span className={styles.priceUnit}>{data.price.unit}</span>
            </div>
            <p className={styles.infoNote}>{data.price.note}</p>
          </div>

          {/* CARTE FORMAT */}

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FiCalendar />
            </div>
            <h3 className={styles.infoCardTitle}>{data.format.title}</h3>
            <p className={styles.infoNote}>{data.format.note}</p>
          </div>

          {/* CARTE MODULES */}

          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>Modules disponibles</h3>

            <ul className={styles.moduleList}>
              {data.modules.map((module) => (
                <li key={module.name} className={styles.moduleItem}>
                  <span className={styles.moduleName}>{module.name}</span>
                  <span className={styles.moduleNote}>{module.note}</span>
                </li>
              ))}
            </ul>

            <Link href={data.cta.href} className={styles.cardLink}>
              <span>{data.cta.label}</span>
              <FiArrowRight />
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}


/* =====================================================
   SECTION CRÉATION DE SITES WEB
===================================================== */

function WebsiteSection() {

  const data = websiteSection;

  return (

    <section id="creation-sites" className={styles.sectionWrap}>

      <div className={`${styles.sectionCard} ${styles.sectionCardDark}`}>

        {/* EN-TÊTE DE SECTION */}

        <div className={styles.sectionHead}>

          <div className={`${styles.sectionBadge} ${styles.sectionBadgeOnDark}`}>
            <span className={styles.badgeDot}></span>
            <span>{data.badge}</span>
          </div>

          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleOnDark}`}>
            {data.title}
          </h2>

          <p className={`${styles.sectionText} ${styles.sectionTextOnDark}`}>
            {data.description}
          </p>

        </div>


        {/* OFFRES */}

        <div className={styles.offerGrid}>

          {data.offers.map((offer) => {
            const Icon = offer.icon;

            return (
              <div key={offer.id} className={styles.offerCard}>

                <div className={styles.infoIcon}>
                  <Icon />
                </div>

                <h3 className={styles.offerTitle}>{offer.title}</h3>

                <p className={styles.offerDescription}>{offer.description}</p>

                <ul className={styles.offerPoints}>
                  {offer.points.map((point) => (
                    <li key={point} className={styles.offerPoint}>
                      <FiCheck />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

              </div>
            );
          })}

        </div>

        {/* CTA */}

        <div className={styles.offerCtaRow}>
          <p className={styles.offerCtaNote}>
            Tarif établi selon votre projet, toujours pensé pour rester accessible.
          </p>

          <Link href={data.cta.href} className={styles.primaryButtonOnDark}>
            <span>{data.cta.label}</span>
            <FiArrowRight />
          </Link>
        </div>

      </div>

    </section>
  );
}


/* =====================================================
   HOME
===================================================== */

export default function Home() {

  return (

    <div className={styles.page}>

      <main>

        {/* =================================================
            FIRST SECTION
        ================================================= */}

        <FirstSection />


        {/* =================================================
            FORMATIONS
        ================================================= */}

        <FormationsSection />


        {/* =================================================
            CRÉATION DE SITES WEB
        ================================================= */}

        <WebsiteSection />

      </main>

    </div>

  );
}