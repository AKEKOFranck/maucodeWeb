"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiBookOpen,
  FiMonitor,
  FiGrid,
  FiAward,
  FiMessageCircle,
  FiLayers,
  FiTarget,
  FiCode,
} from "react-icons/fi";
import styles from "./page.module.css";

import ContactForm, {
  BESOIN_SITE,
  BESOIN_FORMATION,
} from "@/components/ContactForm/contactform";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { whatsappLink, WHATSAPP_SITE_MESSAGE } from "@/lib/config";

/* =====================================================
   L'IMAGE DU BAS DE LA PAGE
   Pour changer l'image : mets ton fichier dans /public
   puis change "src" (par exemple "/ma-photo.jpg").
   Pour ne rien afficher : mets src: null.
   title / text : texte par-dessus l'image (laisse "" pour aucun texte).
   Conseil : évite les espaces dans les noms de fichiers
   (ex. "fond-main-3.png" plutôt que "fondMain (3).png").
===================================================== */
const BOTTOM_IMAGE = {
  src: "/fondMain (3).png",
  alt: "Ambiance Maucode : formation et création de sites web",
  title: "",
  text: "",
};

/* =====================================================
   LES IMAGES DES TUILES DU HUB
   Mets tes fichiers directement dans /public, puis change
   les noms ci-dessous. Mets null pour garder le simple dégradé.
   Format conseillé : portrait 4:5 (environ 600 x 750 px).
===================================================== */
const TILE_IMAGES = {
  academie: "/tuile-academie.png",
  studio: "/tuile-studio.png",
  bibliotheque: "/tuile-bibliotheque.png",
  compte: "/tuile-compte.png",
  support: "/tuile-support.png",
};

/* =====================================================
   LES RÉALISATIONS
   Pour ajouter un site : copie un bloc dans la liste.
   kind  : "client" (projet client) ou "concept" (concept fictif)
   image : "/realisations/nom.png" (fichier dans /public/realisations)
           pour afficher une vraie capture d'écran, sinon null.
===================================================== */
const SITES = [
  {
    name: "Roba Shop",
    category: "E-commerce",
    kind: "client",
    text: "Boutique en ligne avec panier et commande simple.",
    url: "https://roba-shop.vercel.app/",
    emoji: "🛍️",
    from: "#1fa3ec",
    to: "#6d7dff",
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
    icon: FiLayers,
    title: "Des bases solides",
    text: "Word, Excel, PowerPoint : on apprend ce qui sert vraiment au bureau, pas à pas.",
  },
  {
    icon: FiTarget,
    title: "Du concret",
    text: "Chaque notion s'applique tout de suite à un cas réel de travail.",
  },
  {
    icon: FiCode,
    title: "Du digital sur mesure",
    text: "Nous concevons aussi des sites web propres, rapides et faits pour votre activité.",
  },
];

/* =====================================================
   LES TUILES DU HUB
   Chaque tuile = une grande section du site.
   Pour en ajouter une : copie un bloc dans la liste.
   - image    : image de la tuile (voir TILE_IMAGES plus haut)
   - href     : lien de la tuile (interne, ancre #... ou externe)
   - external : true pour ouvrir dans un nouvel onglet
   - from/to  : couleurs de la tuile ET de la lueur de fond
   - secondary: { type: "contact" | "link", ... } (bouton en plus, optionnel)
===================================================== */
function buildTiles(user) {
  return [
    {
      id: "academie",
      name: "Académie Office",
      meta: "Word, Excel, PowerPoint",
      icon: FiBookOpen,
      image: TILE_IMAGES.academie,
      from: "#1fa3ec",
      to: "#6d7dff",
      text: "Word, Excel et PowerPoint, pas à pas. Le premier module de chaque cours est gratuit, sans compte.",
      href: "/works",
      cta: "Commencer une formation",
    },
    {
      id: "studio",
      name: "Studio web",
      meta: "Création de site",
      icon: FiMonitor,
      image: TILE_IMAGES.studio,
      from: "#7c3aed",
      to: "#3b82f6",
      text: "Un site vitrine propre, rapide et pensé pour le mobile, mis en ligne avec accompagnement.",
      href: "/webPage",
      cta: "Découvrir le studio",
      secondary: {
        type: "contact",
        label: "Demander un site",
        besoin: BESOIN_SITE,
      },
    },
    {
      id: "bibliotheque",
      name: "Bibliothèque",
      meta: `${SITES.length} sites réalisés`,
      icon: FiGrid,
      image: TILE_IMAGES.bibliotheque,
      from: "#0f766e",
      to: "#2fb5a8",
      text: "Des projets livrés à de vrais clients et des concepts créés pour montrer ce dont nous sommes capables.",
      href: "#realisations",
      cta: "Voir les réalisations",
    },
    user
      ? {
          id: "compte",
          name: "Ma progression",
          meta: "Mes cours et attestations",
          icon: FiAward,
          image: TILE_IMAGES.compte,
          from: "#d9731e",
          to: "#f0a24b",
          text: "Retrouve tes cours là où tu les as laissés, et tes attestations une fois les cours terminés.",
          href: "/works",
          cta: "Reprendre ma formation",
        }
      : {
          id: "compte",
          name: "Mes trophées",
          meta: "Compte gratuit",
          icon: FiAward,
          image: TILE_IMAGES.compte,
          from: "#d9731e",
          to: "#f0a24b",
          text: "Crée ton compte gratuit avec Google pour sauvegarder ta progression et décrocher tes attestations.",
          href: "/login?next=%2Fworks",
          cta: "Créer mon compte",
        },
    {
      id: "support",
      name: "Support",
      meta: "Réponse sur WhatsApp",
      icon: FiMessageCircle,
      image: TILE_IMAGES.support,
      from: "#128c4a",
      to: "#25d366",
      text: "Dites-nous ce que vous voulez apprendre ou créer. Nous vous répondons sur WhatsApp.",
      href: whatsappLink(WHATSAPP_SITE_MESSAGE),
      external: true,
      cta: "Écrire sur WhatsApp",
      secondary: {
        type: "contact",
        label: "Ouvrir le formulaire",
        besoin: BESOIN_FORMATION,
      },
    },
  ];
}

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
   PAGE D'ACCUEIL : LE HUB
===================================================== */
export default function Home() {
  const { user } = useAuth();

  const [showSplash, setShowSplash] = useState(!splashPlayed);
  // Les textes du hero attendent la fin de l'écran d'ouverture
  const [base] = useState(showSplash ? "2s" : "0.1s");

  const [kind, setKind] = useState("all");
  const [category, setCategory] = useState("Toutes");

  // Tuile sélectionnée dans le Hub
  const [active, setActive] = useState(0);
  const tileRefs = useRef([]);
  const tapRef = useRef(null);

  const tiles = buildTiles(user);
  const tile = tiles[active] || tiles[0];

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

  /* Flèches ← → : on passe d'une tuile à l'autre (le focus sélectionne la tuile) */
  const onRailKeyDown = (e) => {
    const last = tiles.length - 1;
    const current = tileRefs.current.indexOf(document.activeElement);
    const from = current === -1 ? active : current;

    let next = null;
    if (e.key === "ArrowRight") next = Math.min(from + 1, last);
    else if (e.key === "ArrowLeft") next = Math.max(from - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;

    e.preventDefault();
    tileRefs.current[next]?.focus();
  };

  /* Sur écran tactile : 1er appui = sélectionner la tuile, 2e appui = l'ouvrir */
  const onTilePointerDown = (e, i) => {
    tapRef.current = { touch: e.pointerType === "touch", wasActive: i === active };
  };

  const onTileClick = (e, i) => {
    const tap = tapRef.current;
    tapRef.current = null;
    if (tap && tap.touch && !tap.wasActive) {
      e.preventDefault();
      setActive(i);
    }
  };

  const PrimaryTag = tile.external ? "a" : Link;
  const primaryExtra = tile.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

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

      {/* ---------- 1. Le Hub ---------- */}
      <section className={styles.hero}>
        <Image
          src="/main.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />

        {/* Lueur de fond : change de couleur selon la tuile sélectionnée */}
        <div className={styles.ambient} aria-hidden="true">
          {tiles.map((t, i) => (
            <span
              key={t.id}
              className={`${styles.glow} ${i === active ? styles.glowOn : ""}`}
              style={{ "--from": t.from, "--to": t.to }}
            />
          ))}
        </div>

        <div className={styles.heroContent} style={{ "--base": base }}>
          <div className={`${styles.heroHead} ${styles.rise}`} style={{ "--i": 0 }}>
            <h1 className={styles.heroTitle}>Maîtrisez Office. Lancez votre site.</h1>
            <p className={styles.heroText}>
              La plateforme qui forme aux bases d&apos;Office et crée les sites web des
              entrepreneurs.
            </p>
          </div>

          {/* Rangée de tuiles */}
          <div
            className={`${styles.rail} ${styles.rise}`}
            style={{ "--i": 1 }}
            role="group"
            aria-label="Choisir une section"
            onKeyDown={onRailKeyDown}
          >
            {tiles.map((t, i) => {
              const Tag = t.external ? "a" : Link;
              const extra = t.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};
              const Icon = t.icon;

              return (
                <Tag
                  key={t.id}
                  ref={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  href={t.href}
                  className={`${styles.tile} ${i === active ? styles.tileActive : ""}`}
                  style={{ "--from": t.from, "--to": t.to }}
                  aria-label={`${t.name} : ${t.meta}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onPointerDown={(e) => onTilePointerDown(e, i)}
                  onClick={(e) => onTileClick(e, i)}
                  {...extra}
                >
                  {t.image && (
                    <Image
                      src={t.image}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 860px) 58vw, 214px"
                      className={styles.tileImage}
                    />
                  )}
                  <span className={styles.tileIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <span className={styles.tileName}>{t.name}</span>
                  <span className={styles.tileMeta}>{t.meta}</span>
                </Tag>
              );
            })}
          </div>

          <p className={styles.hint} aria-hidden="true">
            Utilisez les flèches ← → du clavier pour naviguer
          </p>

          {/* Panneau de détail de la tuile sélectionnée */}
          <div
            className={`glass ${styles.panel} ${styles.rise}`}
            style={{ "--i": 2 }}
            role="region"
            aria-live="polite"
            aria-label="Détails de la sélection"
          >
            <div className={styles.panelBody} key={tile.id}>
              <h2>{tile.name}</h2>
              <p>{tile.text}</p>
              <div className={styles.panelActions}>
                <PrimaryTag href={tile.href} className={styles.btnPrimary} {...primaryExtra}>
                  {tile.cta}
                </PrimaryTag>

                {tile.secondary?.type === "contact" && (
                  <ContactForm
                    label={tile.secondary.label}
                    variant="dark"
                    defaultBesoin={tile.secondary.besoin}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. Chiffres ---------- */}
      <section className={styles.stats} aria-label="Maucode en chiffres">
        <div className={styles.container}>
          <ul className={`glass ${styles.statList}`}>
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
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 110} className={`glass ${styles.pillar}`}>
                  <span className={styles.pillarIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- 4. Nos réalisations ---------- */}
      <section id="realisations" className={styles.showcase}>
        <div className={styles.container}>
          <Reveal>
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
            <Reveal className={`glass ${styles.serviceCard}`}>
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

            <Reveal delay={120} className={`glass ${styles.serviceCard}`}>
              <h3>Création de site web</h3>
              <p>Un site qui présente votre activité et donne envie de vous contacter.</p>
              <ul>
                <li>Site vitrine et page de présentation</li>
                <li>Design adapté au mobile</li>
                <li>Chargement rapide</li>
                <li>Mise en ligne et accompagnement</li>
              </ul>
              <Link href="/webPage" className={styles.serviceLink}>
                Découvrir la création de site →
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
              Dites-nous ce que vous voulez créer. Nous vous répondons sur WhatsApp.
            </p>
            <div className={styles.ctaActions}>
              <ContactForm
                label="Demander un site"
                variant="primary"
                defaultBesoin={BESOIN_SITE}
              />
              <a
                href={whatsappLink(WHATSAPP_SITE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnGlass}
              >
                Écrire sur WhatsApp
              </a>
              <Link href="/works" className={styles.btnGlass}>
                Voir les formations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 7. Image du bas de page (voir BOTTOM_IMAGE en haut du fichier) ---------- */}
      {BOTTOM_IMAGE.src && (
        <section className={styles.bottomImage} aria-label="Illustration">
          <div className={styles.container}>
            <Reveal className={styles.bottomFrame}>
              <Image
                src={BOTTOM_IMAGE.src}
                alt={BOTTOM_IMAGE.alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className={styles.bottomPhoto}
              />
              {(BOTTOM_IMAGE.title || BOTTOM_IMAGE.text) && (
                <div className={styles.bottomCaption}>
                  {BOTTOM_IMAGE.title && <h2>{BOTTOM_IMAGE.title}</h2>}
                  {BOTTOM_IMAGE.text && <p>{BOTTOM_IMAGE.text}</p>}
                </div>
              )}
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}