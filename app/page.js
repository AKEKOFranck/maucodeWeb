"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

import ContactForm from "@/components/ContactForm/contactform";
import {
  whatsappLink,
  WHATSAPP_FORMATION_MESSAGE,
  WHATSAPP_SITE_MESSAGE,
} from "@/lib/config";

/* =====================================================
   LES RÉALISATIONS
   Pour ajouter un site : copie un bloc dans la liste.
   kind : "client" (projet client) ou "concept" (concept fictif)
   image : mets "/realisations/nom.png" (fichier dans /public/realisations)
           pour afficher une vraie capture d'écran, sinon laisse null.
===================================================== */
const SITES = [
  {
    name: "Roba Shop",
    category: "E-commerce",
    kind: "client",
    text: "Boutique en ligne avec panier et commande simple.",
    url: "https://roba-shop.vercel.app/",
    emoji: "🛍️",
    from: "#3b5bff",
    to: "#7a5cff",
    image: null,
  },
  {
    name: "All For Beauty",
    category: "Beauté",
    kind: "client",
    text: "Site d'un institut de beauté, élégant et rassurant.",
    url: "https://all-for-beauty.vercel.app/",
    emoji: "💄",
    from: "#e0559b",
    to: "#f08bb8",
    image: null,
  },
  {
    name: "Chemoa Hôtel",
    category: "Hôtel",
    kind: "client",
    text: "Présentation des chambres et prise de contact rapide.",
    url: "https://chemoa-hotel.vercel.app/",
    emoji: "🏨",
    from: "#0f766e",
    to: "#2fb5a8",
    image: null,
  },
  {
    name: "ONG Ensemble",
    category: "Association",
    kind: "client",
    text: "Site d'une ONG : missions, actions et appel au soutien.",
    url: "https://ong-ensemble.vercel.app/",
    emoji: "🤝",
    from: "#d9731e",
    to: "#f0a24b",
    image: null,
  },
  {
    name: "EM2 Rénov",
    category: "Bâtiment",
    kind: "client",
    text: "Vitrine d'une entreprise de rénovation et de ses chantiers.",
    url: "https://em-2-renov.vercel.app/",
    emoji: "🏗️",
    from: "#334155",
    to: "#64748b",
    image: null,
  },
  {
    name: "Coffee Shop",
    category: "Restaurant",
    kind: "concept",
    text: "Concept de café chaleureux avec carte et ambiance.",
    url: "https://coffee-shop-nine-ecru.vercel.app/",
    emoji: "☕",
    from: "#7c4a2d",
    to: "#b5784f",
    image: null,
  },
  {
    name: "Hair We",
    category: "Beauté",
    kind: "concept",
    text: "Concept de salon de coiffure moderne.",
    url: "https://hair-we.vercel.app/",
    emoji: "✂️",
    from: "#7c3aed",
    to: "#b18cf5",
    image: null,
  },
  {
    name: "Web Dress",
    category: "E-commerce",
    kind: "concept",
    text: "Concept de boutique de mode en ligne.",
    url: "https://web-dress.vercel.app/",
    emoji: "👗",
    from: "#be185d",
    to: "#f472b6",
    image: null,
  },
  {
    name: "Resto Web",
    category: "Restaurant",
    kind: "concept",
    text: "Concept de restaurant avec menu et réservation.",
    url: "https://resto-web-two.vercel.app/",
    emoji: "🍽️",
    from: "#b91c1c",
    to: "#ef6b5b",
    image: null,
  },
  {
    name: "FoodTruck",
    category: "Restaurant",
    kind: "concept",
    text: "Concept de food truck : menu, lieux et commande.",
    url: "https://foodtruck-lac.vercel.app/",
    emoji: "🚚",
    from: "#ca8a04",
    to: "#f2c94c",
    image: null,
  },
];

const CATEGORIES = ["Toutes", ...Array.from(new Set(SITES.map((s) => s.category)))];

const KINDS = [
  { id: "all", label: "Tous les sites" },
  { id: "client", label: "Projets clients" },
  { id: "concept", label: "Concepts fictifs" },
];

const COUNT_CLIENTS = SITES.filter((s) => s.kind === "client").length;
const COUNT_CONCEPTS = SITES.filter((s) => s.kind === "concept").length;

const PILLARS = [
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

/* =====================================================
   PETITS COMPOSANTS D'ANIMATION
===================================================== */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Apparition douce quand l'élément entre dans l'écran */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${on ? styles.revealIn : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* Chiffre qui monte jusqu'à sa valeur */
function CountUp({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      setN(to);
      return;
    }

    let frame;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1200;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(to * eased));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to]);

  return <span ref={ref}>{n}</span>;
}

/* Écran d'ouverture : ne se rejoue pas quand on revient sur l'accueil dans le site */
let splashPlayed = false;

/* =====================================================
   PAGE D'ACCUEIL
===================================================== */
export default function Home() {
  const [showSplash, setShowSplash] = useState(!splashPlayed);
  // Les textes du hero attendent la fin de l'écran d'ouverture
  const [base] = useState(showSplash ? "2s" : "0.1s");

  const [kind, setKind] = useState("all");
  const [category, setCategory] = useState("Toutes");

  useEffect(() => {
    if (!showSplash) return;
    splashPlayed = true;

    const duration = prefersReducedMotion() ? 450 : 2600;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShowSplash(false);
      document.body.style.overflow = "";
    }, duration);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  const visibleSites = SITES.filter(
    (s) =>
      (kind === "all" || s.kind === kind) &&
      (category === "Toutes" || s.category === category)
  );

  return (
    <main className={styles.main}>
      {/* ---------- Écran d'ouverture ---------- */}
      {showSplash && (
        <div className={styles.splash} aria-hidden="true">
          <div className={styles.splashInner}>
            <div className={styles.splashLogo}>
              <span className={styles.splashRing} />
              <Image src="/LogoMC.png" alt="" width={84} height={84} priority />
            </div>
            <p className={styles.splashName}>
              {"Maucode".split("").map((c, i) => (
                <span key={i} style={{ "--k": i }}>
                  {c}
                </span>
              ))}
            </p>
            <p className={styles.splashTag}>Formation &amp; sites web</p>
            <div className={styles.splashBar}>
              <span />
            </div>
          </div>
        </div>
      )}

      {/* ---------- 1. Hero ---------- */}
      <section className={styles.hero}>
        <Image
          src="/main.jpg"
          alt="Illustration Maucode"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <span className={styles.orb1} aria-hidden="true" />
        <span className={styles.orb2} aria-hidden="true" />

        <div className={styles.heroContent} style={{ "--base": base }}>
         
          <h1 className={`${styles.heroTitle} ${styles.rise}`} style={{ "--i": 1 }}>
            Maîtrisez Office. <span>Lancez votre site.</span>
          </h1>
          <p className={`${styles.heroText} ${styles.rise}`} style={{ "--i": 2 }}>
            La plateforme qui forme aux bases d&apos;Office et crée les sites web des
            entrepreneurs.
          </p>
          <div className={`${styles.heroActions} ${styles.rise}`} style={{ "--i": 3 }}>
            <Link href="/works" className={styles.btnPrimary}>
              Commencer une formation
            </Link>
            <Link href="/webPage" className={styles.btnGlass}>
              Créer un site
            </Link>
          </div>
          <a
            href="#realisations"
            className={`${styles.scrollHint} ${styles.rise}`}
            style={{ "--i": 5 }}
          >
            Voir nos réalisations ↓
          </a>
        </div>
      </section>

      {/* ---------- 2. Chiffres ---------- */}
      <section className={styles.stats} aria-label="Maucode en chiffres">
        <div className={styles.container}>
          <ul className={styles.statList}>
            <li>
              <strong>
                <CountUp to={SITES.length} />
              </strong>
              <span>sites en ligne</span>
            </li>
            <li>
              <strong>
                <CountUp to={COUNT_CLIENTS} />
              </strong>
              <span>projets clients</span>
            </li>
            <li>
              <strong>
                <CountUp to={COUNT_CONCEPTS} />
              </strong>
              <span>concepts créés</span>
            </li>
            <li>
              <strong>
                <CountUp to={3} />
              </strong>
              <span>formations Office</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- 3. Pourquoi Maucode ---------- */}
      <section className={styles.intro}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.sectionTitle}>
              Maucode, c&apos;est apprendre simplement et construire en ligne.
            </h2>
            <p className={styles.sectionLead}>
              Nous enseignons les bases d&apos;Office à ceux qui veulent gagner en
              autonomie, et nous réalisons des sites web pour ceux qui veulent exister
              sur internet.
            </p>
          </Reveal>

          <div className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 110} className={styles.pillar}>
                <span className={styles.pillarNum}>{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 4. Nos réalisations ---------- */}
      <section id="realisations" className={styles.showcase}>
        <div className={styles.container}>
          <Reveal>
            <p className={styles.kicker}>Vitrine</p>
            <h2 className={styles.sectionTitle}>Des sites web qui donnent envie de cliquer</h2>
            <p className={styles.sectionLead}>
              Voici nos réalisations : des projets livrés à de vrais clients et des
              concepts créés pour montrer ce dont nous sommes capables.
            </p>
          </Reveal>

          <div className={styles.filters}>
            <div className={styles.segment} role="tablist" aria-label="Type de site">
              {KINDS.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  role="tab"
                  aria-selected={kind === k.id}
                  className={`${styles.segBtn} ${kind === k.id ? styles.segActive : ""}`}
                  onClick={() => setKind(k.id)}
                >
                  {k.label}
                </button>
              ))}
            </div>

            <div className={styles.chips} aria-label="Catégorie">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  className={`${styles.chip} ${category === c ? styles.chipActive : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {visibleSites.length === 0 ? (
            <p className={styles.empty}>
              Aucun site dans cette sélection pour le moment.{" "}
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => {
                  setKind("all");
                  setCategory("Toutes");
                }}
              >
                Tout afficher
              </button>
            </p>
          ) : (
            <div className={styles.grid}>
              {visibleSites.map((site, i) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  style={{ "--i": i }}
                  aria-label={`${site.name} : voir le site`}
                >
                  <div
                    className={styles.thumb}
                    style={{ "--from": site.from, "--to": site.to }}
                  >
                    <div className={styles.browserBar}>
                      <i />
                      <i />
                      <i />
                      <span>{new URL(site.url).host}</span>
                    </div>
                    {site.image ? (
                      <Image
                        src={site.image}
                        alt={`Aperçu du site ${site.name}`}
                        fill
                        sizes="(max-width: 700px) 100vw, 380px"
                        className={styles.thumbImage}
                      />
                    ) : (
                      <span className={styles.thumbEmoji} aria-hidden="true">
                        {site.emoji}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.badges}>
                      <span
                        className={`${styles.badge} ${
                          site.kind === "client" ? styles.badgeClient : styles.badgeConcept
                        }`}
                      >
                        {site.kind === "client" ? "Projet client" : "Concept fictif"}
                      </span>
                      <span className={styles.badgeCat}>{site.category}</span>
                    </div>
                    <h3>{site.name}</h3>
                    <p>{site.text}</p>
                    <span className={styles.cardLink}>
                      Voir le site <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}

          <p className={styles.moreSites}>
            Toute la vitrine :{" "}
            <a href="https://maucode-vitrine.vercel.app/" target="_blank" rel="noopener noreferrer">
              maucode-vitrine.vercel.app
            </a>
          </p>
        </div>
      </section>

      {/* ---------- 5. Nos services ---------- */}
      <section className={styles.services}>
        <div className={styles.container}>
          <Reveal>
            <h2 className={styles.sectionTitle}>Nos services</h2>
          </Reveal>

          <div className={styles.serviceGrid}>
            <Reveal className={styles.serviceCard}>
              <h3>Formation Office</h3>
              <p>
                Une formation claire pour travailler plus vite et sans stress sur les
                outils du quotidien.
              </p>
              <ul>
                <li>Word : documents, mise en page, courriers</li>
                <li>Excel : tableaux, formules, graphiques</li>
                <li>PowerPoint : présentations qui se lisent bien</li>
                <li>Exercices pratiques et suivi personnalisé</li>
              </ul>
              <Link href="/works" className={styles.serviceLink}>
                Voir les formations →
              </Link>
            </Reveal>

            <Reveal delay={120} className={styles.serviceCard}>
              <h3>Création de site web</h3>
              <p>Un site qui présente votre activité et donne envie de vous contacter.</p>
              <ul>
                <li>Site vitrine et page de présentation</li>
                <li>Design adapté au mobile</li>
                <li>Chargement rapide</li>
                <li>Mise en ligne et accompagnement</li>
              </ul>
              <Link href="/webPage" className={styles.serviceLink}>
                Demander un site →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 6. Appel à l'action ---------- */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <Reveal className={styles.ctaBox}>
            <h2>Votre site peut être le prochain de cette liste.</h2>
            <p>
              Inscrivez-vous à une formation Office ou parlez-nous de votre projet de
              site web. Nous vous répondons rapidement.
            </p>
            <div className={styles.ctaActions}>
              <ContactForm label="Écrire à Maucode" variant="primary" />
              <a
                href={whatsappLink(WHATSAPP_SITE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnGlass}
              >
                Un site : WhatsApp
              </a>
              <a
                href={whatsappLink(WHATSAPP_FORMATION_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnGlass}
              >
                Une formation : WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}