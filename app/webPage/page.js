import {
  FiGlobe,
  FiShoppingBag,
  FiCheck,
  FiX,
  FiMessageSquare,
  FiFileText,
  FiCreditCard,
  FiLayout,
} from "react-icons/fi";

import ContactForm, { BESOIN_SITE } from "@/components/ContactForm/contactform";
import RealisationsRail from "./RealisationsRail";
import styles from "./page.module.css";

/* Référencement : titre et description propres à cette page */
export const metadata = {
  title: "Création de site web à Abidjan",
  description:
    "Création de sites vitrines et de boutiques en ligne à Abidjan : clairs, rapides, faciles à gérer, avec mise en ligne et accompagnement.",
  alternates: { canonical: "/webPage" },
};

/* =====================================================
   DONNÉES
===================================================== */

const hero = {
  title: "Un site simple, sans complexité inutile.",
  description:
    "Nous concevons des sites vitrines et des boutiques en ligne clairs, rapides, et pensés pour rester faciles à gérer au quotidien. Uniquement ce dont votre activité a vraiment besoin.",
};

/* tint : couleur de la carte, en "R, G, B" */
const offers = [
  {
    id: "vitrine",
    tint: "0, 128, 255",
    icon: FiGlobe,
    title: "Site vitrine",
    subtitle: "Présenter votre activité et être contacté facilement",
    description:
      "Idéal pour présenter votre activité, vos services et vos coordonnées. Vos visiteurs peuvent vous contacter directement pour réserver un rendez-vous ou une prestation.",
    reservation:
      "La réservation se fait via un bouton ou un formulaire qui envoie la demande directement par email : vous recevez toutes les informations sans rien à configurer.",
    included: [
      "Présentation claire de votre activité",
      "Bouton ou formulaire de réservation par email",
      "Design adapté à votre image, responsive mobile",
    ],
    notIncluded: ["Création de compte client", "Paiement en ligne intégré"],
  },
  {
    id: "ecommerce",
    tint: "124, 58, 237",
    icon: FiShoppingBag,
    title: "Boutique e-commerce",
    subtitle: "Présenter vos produits et centraliser les commandes",
    description:
      "Vos produits sont présentés dans un catalogue clair. Le client parcourt, choisit, et envoie sa demande de réservation ou de commande.",
    reservation:
      "Toutes les informations de la commande (produits, quantités, coordonnées du client) vous parviennent par email. Vous échangez ensuite avec le client pour confirmer et organiser le paiement.",
    included: [
      "Catalogue produits facile à mettre à jour",
      "Réservation et commande envoyées par email",
      "Toutes les infos client centralisées au même endroit",
    ],
    notIncluded: [
      "Création de compte / authentification client",
      "Suivi de commande en ligne (statut, historique)",
      "Paiement en ligne libre intégré au site",
    ],
  },
];

const steps = [
  {
    icon: FiMessageSquare,
    title: "Entretien",
    description:
      "On échange sur votre activité, vos besoins et ce que le site doit permettre à vos visiteurs de faire.",
  },
  {
    icon: FiFileText,
    title: "Contrat",
    description:
      "Un contrat de création de site web (ou de prestation de service) est soumis, précisant le périmètre, les délais et le tarif.",
  },
  {
    icon: FiCreditCard,
    title: "Acompte",
    description:
      "Une fois le contrat conclu des deux côtés, un acompte est versé pour lancer officiellement le projet.",
  },
  {
    icon: FiLayout,
    title: "Conception",
    description:
      "Le travail démarre : design, contenu, puis mise en ligne, avec des points d'étape réguliers.",
  },
];

/* from/to : couleurs de la tuile et de la lueur de fond. emoji : visuel de la tuile. */
const realisations = [
  {
    id: 1,
    name: "FoodTruck",
    url: "https://foodtruck-lac.vercel.app/",
    category: "Vitrine + commande",
    description:
      "Un food truck à Abidjan qui présente son menu et reçoit ses commandes directement, sans complexité côté client.",
    emoji: "🚚",
    from: "#ca8a04",
    to: "#f2c94c",
  },
  {
    id: 2,
    name: "ONG Ensemble",
    url: "https://ong-ensemble.vercel.app/",
    category: "Site vitrine",
    description:
      "Une association qui présente sa mission, ses actions et son impact, avec un contact direct.",
    emoji: "🤝",
    from: "#d9731e",
    to: "#f0a24b",
  },
  {
    id: 3,
    name: "Roba Shop",
    url: "https://roba-shop.vercel.app/",
    category: "Boutique en ligne",
    description:
      "Une parfumerie basée à Abidjan qui présente son catalogue de fragrances et centralise les demandes clients.",
    emoji: "🛍️",
    from: "#1fa3ec",
    to: "#6d7dff",
  },
  {
    id: 4,
    name: "All For Beauty",
    url: "https://all-for-beauty.vercel.app/",
    category: "Boutique en ligne",
    description:
      "Une boutique de cosmétiques qui met en avant sa gamme de produits et ses points de contact.",
    emoji: "💄",
    from: "#e0559b",
    to: "#f08bb8",
  },
];

/* =====================================================
   SECTIONS
===================================================== */

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle} style={{ "--i": 0 }}>
          {hero.title}
        </h1>
        <p className={styles.heroText} style={{ "--i": 1 }}>
          {hero.description}
        </p>
        <div className={styles.heroActions} style={{ "--i": 2 }}>
          <ContactForm
            label="Demander mon site"
            variant="primary"
            defaultBesoin={BESOIN_SITE}
          />
          <a href="#realisations" className={styles.btnGlass}>
            Voir les réalisations
          </a>
        </div>
      </div>
    </section>
  );
}

function OffersSection() {
  return (
    <section className={styles.offers}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Nos formules</h2>
          <p className={styles.sectionText}>
            Deux formats simples, adaptés à ce dont votre activité a vraiment
            besoin aujourd&apos;hui.
          </p>
        </div>

        <div className={styles.offersGrid}>
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <article
                key={offer.id}
                className={styles.offerCard}
                style={{ "--tint": offer.tint }}
              >
                <div className={styles.offerIcon} aria-hidden="true">
                  <Icon />
                </div>

                <h3 className={styles.offerTitle}>{offer.title}</h3>
                <p className={styles.offerSubtitle}>{offer.subtitle}</p>
                <p className={styles.offerDescription}>{offer.description}</p>

                <div className={styles.reservationBox}>
                  <h4>Comment ça se passe</h4>
                  <p>{offer.reservation}</p>
                </div>

                <h4 className={styles.listLabel}>Ce qui est inclus</h4>
                <ul className={styles.list}>
                  {offer.included.map((item) => (
                    <li key={item}>
                      <FiCheck className={styles.iconYes} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h4 className={styles.listLabel}>Ce qui n&apos;est pas inclus</h4>
                <ul className={`${styles.list} ${styles.listMuted}`}>
                  {offer.notIncluded.map((item) => (
                    <li key={item}>
                      <FiX className={styles.iconNo} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className={styles.process}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Comment se déroule un projet</h2>
          <p className={styles.sectionText}>
            Un déroulé simple, avec un cadre clair dès le départ pour vous
            comme pour nous.
          </p>
        </div>

        {/* Liste numérotée : ici l'ordre compte vraiment (entretien, contrat, acompte, conception) */}
        <ol className={styles.stepsGrid}>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className={styles.stepCard}>
                <div className={styles.stepTop}>
                  <span className={styles.stepIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <span className={styles.stepNum}>
                    <span className="sr-only">Étape </span>
                    {i + 1}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function RealisationsSection() {
  return (
    <section id="realisations" className={styles.realisations}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Nos réalisations</h2>
          <p className={styles.sectionText}>
            Quelques sites livrés récemment, à visiter directement.
          </p>
        </div>

        <RealisationsRail items={realisations} />
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.ctaBox}>
          <h2>Discutons de votre projet</h2>
          <p>
            Un premier échange suffit pour cerner votre besoin. Remplissez le
            petit formulaire : votre demande part sur WhatsApp vers l&apos;équipe
            Maucode.
          </p>
          <div className={styles.ctaActions}>
            <ContactForm
              label="Écrire à Maucode"
              variant="primary"
              defaultBesoin={BESOIN_SITE}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   PAGE
===================================================== */

export default function WebPage() {
  return (
    <main className={styles.page}>
      <HeroSection />
      <OffersSection />
      <ProcessSection />
      <RealisationsSection />
      <ContactCta />
    </main>
  );
}