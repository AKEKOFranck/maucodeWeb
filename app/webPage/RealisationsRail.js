"use client";

import { useRef, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

import ContactForm, { BESOIN_SITE } from "@/components/ContactForm/contactform";
import styles from "./RealisationsRail.module.css";

/*
  Rangée de réalisations façon console :
  - survol / focus clavier = sélectionne la tuile (le fond change de couleur)
  - clic = ouvre le site dans un nouvel onglet
  - flèches ← → = passer d'une tuile à l'autre
  - écran tactile : 1er appui = sélectionner, 2e appui = ouvrir
*/
export default function RealisationsRail({ items }) {
  const [active, setActive] = useState(0);
  const tileRefs = useRef([]);
  const tapRef = useRef(null);

  const site = items[active] || items[0];

  const onKeyDown = (e) => {
    const last = items.length - 1;
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

  const onPointerDown = (e, i) => {
    tapRef.current = { touch: e.pointerType === "touch", wasActive: i === active };
  };

  const onClick = (e, i) => {
    const tap = tapRef.current;
    tapRef.current = null;
    if (tap && tap.touch && !tap.wasActive) {
      e.preventDefault();
      setActive(i);
    }
  };

  return (
    <div className={styles.stage}>
      {/* Lueur de fond : une couche par réalisation, seule l'active est visible */}
      <div className={styles.ambient} aria-hidden="true">
        {items.map((it, i) => (
          <span
            key={it.id}
            className={`${styles.glow} ${i === active ? styles.glowOn : ""}`}
            style={{ "--from": it.from, "--to": it.to }}
          />
        ))}
      </div>

      <div
        className={styles.rail}
        role="group"
        aria-label="Choisir une réalisation"
        onKeyDown={onKeyDown}
      >
        {items.map((it, i) => (
          <a
            key={it.id}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            href={it.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.tile} ${i === active ? styles.tileActive : ""}`}
            style={{ "--from": it.from, "--to": it.to }}
            aria-label={`${it.name} : ${it.category}. Ouvre le site dans un nouvel onglet`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onPointerDown={(e) => onPointerDown(e, i)}
            onClick={(e) => onClick(e, i)}
          >
            <span className={styles.browserBar} aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{new URL(it.url).host}</span>
            </span>
            <span className={styles.tileEmoji} aria-hidden="true">
              {it.emoji}
            </span>
            <span className={styles.tileName}>{it.name}</span>
            <span className={styles.tileMeta}>{it.category}</span>
          </a>
        ))}
      </div>

      <p className={styles.hint} aria-hidden="true">
        Utilisez les flèches ← → du clavier pour naviguer
      </p>

      <div
        className={styles.panel}
        role="region"
        aria-live="polite"
        aria-label="Détails de la réalisation"
      >
        <div className={styles.panelBody} key={site.id}>
          <span className={styles.badge}>{site.category}</span>
          <h3>{site.name}</h3>
          <p>{site.description}</p>
          <div className={styles.panelActions}>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Visiter le site
              <FiExternalLink aria-hidden="true" />
            </a>
            <ContactForm
              label="Je veux un site comme celui-ci"
              variant="dark"
              defaultBesoin={BESOIN_SITE}
            />
          </div>
        </div>
      </div>
    </div>
  );
}