import Link from "next/link";

import {
  FiArrowRight,
  FiGlobe,
  FiShoppingBag,
  FiCheck,
  FiX,
  FiMessageCircle,
  FiMail,
  FiExternalLink,
} from "react-icons/fi";

import styles from "./page.module.css";


/* =====================================================
   CONTACT
===================================================== */

const contact = {
  phoneDisplay: "+225 05 07 18 90 82",
  whatsappNumber: "2250507189082",
  email: "fr0055970@gmail.com",
  defaultMessage: "Bonjour, je voudrais un site web",
};

const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.defaultMessage
)}`;

const mailHref = `mailto:${contact.email}?subject=${encodeURIComponent(
  contact.defaultMessage
)}`;


/* =====================================================
   HERO
===================================================== */

const hero = {
  badge: "Création de sites web",
  title: "Un site simple, sans complexité inutile.",
  description:
    "Nous concevons des sites vitrines et des boutiques en ligne clairs, rapides, et pensés pour rester faciles à gérer au quotidien. Pas de fonctionnalités superflues : uniquement ce dont votre activité a vraiment besoin.",
};


/* =====================================================
   FORMULES
===================================================== */

const offers = [
  {
    id: "vitrine",
    icon: FiGlobe,
    title: "Site vitrine",
    subtitle: "Pour présenter votre activité et être contacté facilement",
    description:
      "Idéal pour présenter votre activité, vos services et vos coordonnées. Vos visiteurs peuvent vous contacter directement pour réserver un rendez-vous ou une prestation.",
    reservation:
      "La réservation se fait via un bouton ou un formulaire qui envoie la demande directement sur WhatsApp ou par email — vous recevez toutes les informations sans rien à configurer.",
    included: [
      "Présentation claire de votre activité",
      "Bouton ou formulaire de réservation (WhatsApp / email)",
      "Design adapté à votre image, responsive mobile",
    ],
    notIncluded: [
      "Création de compte client",
      "Paiement en ligne intégré",
    ],
  },
  {
    id: "ecommerce",
    icon: FiShoppingBag,
    title: "Boutique e-commerce",
    subtitle: "Pour présenter vos produits et centraliser les commandes",
    description:
      "Vos produits sont présentés dans un catalogue clair. Le client parcourt, choisit, et envoie sa demande de réservation ou de commande.",
    reservation:
      "Toutes les informations de la commande (produits, quantités, coordonnées du client) sont transmises directement sur WhatsApp. Vous échangez ensuite avec le client pour confirmer et organiser le paiement.",
    included: [
      "Catalogue produits facile à mettre à jour",
      "Réservation et commande envoyées sur WhatsApp",
      "Toutes les infos client centralisées au même endroit",
    ],
    notIncluded: [
      "Création de compte / authentification client",
      "Suivi de commande en ligne (statut, historique)",
      "Paiement en ligne libre intégré au site",
    ],
  },
];


/* =====================================================
   PROCESSUS
===================================================== */

const steps = [
  {
    title: "Entretien",
    description:
      "On échange sur votre activité, vos besoins et ce que le site doit permettre à vos visiteurs de faire.",
  },
  {
    title: "Contrat",
    description:
      "Un contrat de création de site web (ou de prestation de service) est soumis, précisant le périmètre, les délais et le tarif.",
  },
  {
    title: "Acompte",
    description:
      "Une fois le contrat conclu des deux côtés, un acompte est versé pour lancer officiellement le projet.",
  },
  {
    title: "Conception",
    description:
      "Le travail démarre : design, contenu, puis mise en ligne, avec des points d'étape réguliers.",
  },
];


/* =====================================================
   RÉALISATIONS
===================================================== */

const realisations = [
  {
    id: 1,
    name: "FoodTruck",
    url: "https://foodtruck-lac.vercel.app/",
    category: "Vitrine + commande",
    description:
      "Un food truck à Abidjan qui présente son menu et reçoit ses commandes directement sur WhatsApp, sans complexité côté client.",
  },
  {
    id: 2,
    name: "ONG Ensemble",
    url: "https://ong-ensemble.vercel.app/",
    category: "Site vitrine",
    description:
      "Une association qui présente sa mission, ses actions et son impact, avec un contact direct par WhatsApp et téléphone.",
  },
  {
    id: 3,
    name: "Roba Shop",
    url: "https://roba-shop.vercel.app/",
    category: "Boutique en ligne",
    description:
      "Une parfumerie basée à Abidjan qui présente son catalogue de fragrances et centralise les demandes clients.",
  },
  {
    id: 4,
    name: "All For Beauty",
    url: "https://all-for-beauty.vercel.app/",
    category: "Boutique en ligne",
    description:
      "Une boutique de cosmétiques qui met en avant sa gamme de produits et ses points de contact.",
  },
];


/* =====================================================
   HERO SECTION
===================================================== */

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBadge}>
        <span className={styles.badgeDot}></span>
        <span>{hero.badge}</span>
      </div>

      <h1 className={styles.heroTitle}>{hero.title}</h1>

      <p className={styles.heroText}>{hero.description}</p>

      <div className={styles.heroButtons}>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryButton}
        >
          <FiMessageCircle />
          <span>Discuter sur WhatsApp</span>
        </a>

        <a href={mailHref} className={styles.secondaryButton}>
          <FiMail />
          <span>Écrire par email</span>
        </a>
      </div>
    </section>
  );
}


/* =====================================================
   FORMULES SECTION
===================================================== */

function OffersSection() {
  return (
    <section className={styles.sectionWrap}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Nos formules</h2>
        <p className={styles.sectionText}>
          Deux formats simples, adaptés à ce dont votre activité a vraiment
          besoin aujourd'hui.
        </p>
      </div>

      <div className={styles.offersGrid}>
        {offers.map((offer) => {
          const Icon = offer.icon;

          return (
            <div key={offer.id} className={styles.offerCard}>
              <div className={styles.offerIcon}>
                <Icon />
              </div>

              <h3 className={styles.offerTitle}>{offer.title}</h3>
              <p className={styles.offerSubtitle}>{offer.subtitle}</p>
              <p className={styles.offerDescription}>{offer.description}</p>

              <div className={styles.reservationBox}>
                <span className={styles.reservationLabel}>
                  Comment ça se passe
                </span>
                <p className={styles.reservationText}>{offer.reservation}</p>
              </div>

              <div className={styles.includedBlock}>
                <span className={styles.includedLabel}>Ce qui est inclus</span>
                <ul className={styles.includedList}>
                  {offer.included.map((item) => (
                    <li key={item} className={styles.includedItem}>
                      <FiCheck />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.notIncludedBlock}>
                <span className={styles.notIncludedLabel}>
                  Ce qui n'est pas inclus
                </span>
                <ul className={styles.notIncludedList}>
                  {offer.notIncluded.map((item) => (
                    <li key={item} className={styles.notIncludedItem}>
                      <FiX />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


/* =====================================================
   PROCESSUS SECTION
===================================================== */

function ProcessSection() {
  return (
    <section className={styles.sectionWrap}>
      <div className={`${styles.sectionCard} ${styles.sectionCardDark}`}>
        <div className={styles.sectionHead}>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleOnDark}`}>
            Comment se déroule un projet
          </h2>
          <p className={`${styles.sectionText} ${styles.sectionTextOnDark}`}>
            Un déroulé simple, avec un cadre clair dès le départ pour vous
            comme pour nous.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={step.title} className={styles.stepCard}>
              <span className={styles.stepIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* =====================================================
   RÉALISATIONS SECTION
===================================================== */

function RealisationsSection() {
  return (
    <section className={styles.sectionWrap}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Nos réalisations</h2>
        <p className={styles.sectionText}>
          Quelques sites livrés récemment, à visiter directement.
        </p>
      </div>

      <div className={styles.realisationsGrid}>
        {realisations.map((site) => (
          <a
            key={site.id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.realisationCard}
          >
            <span className={styles.realisationCategory}>
              {site.category}
            </span>

            <h3 className={styles.realisationTitle}>{site.name}</h3>

            <p className={styles.realisationDescription}>
              {site.description}
            </p>

            <span className={styles.realisationLink}>
              <span>Voir le site</span>
              <FiExternalLink />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}


/* =====================================================
   CTA FINALE
===================================================== */

function ContactCta() {
  return (
    <section className={styles.sectionWrap}>
      <div className={styles.ctaCard}>
        <div>
          <h2 className={styles.ctaTitle}>Discutons de votre projet</h2>
          <p className={styles.ctaText}>
            Un premier échange suffit pour cerner votre besoin. On vous
            répond rapidement sur WhatsApp ou par email.
          </p>
        </div>

        <div className={styles.ctaButtons}>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
          >
            <FiMessageCircle />
            <span>{contact.phoneDisplay}</span>
          </a>

          <a href={mailHref} className={styles.secondaryButtonOnLight}>
            <FiMail />
            <span>{contact.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}


/* =====================================================
   PAGE
===================================================== */

export default function webPage() {
  return (
    <div className={styles.page}>
      <main>
        <HeroSection />
        <OffersSection />
        <ProcessSection />
        <RealisationsSection />
        <ContactCta />
      </main>
    </div>
  );
}