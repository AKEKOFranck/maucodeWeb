"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import s from "./AnnouncementsBell.module.css";

const fmtDate = (ms) =>
  ms
    ? new Date(ms).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : "";

export default function AnnouncementsBell({ items, seen, unread, onOpen }) {
  const [baseline, setBaseline] = useState(0); // ce qui était lu avant l'ouverture du panneau
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const inside = boxRef.current?.contains(e.target) || panelRef.current?.contains(e.target);
      if (!inside) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Aucune annonce : pas de cloche
  if (!items || items.length === 0) return null;

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) {
      setBaseline(seen);
      onOpen(); // marque tout comme lu : les deux badges disparaissent
    }
  }

  const label = unread
    ? `Annonces, ${unread} non lue${unread > 1 ? "s" : ""}`
    : "Annonces";

  const panel = (
    <section ref={panelRef} id="annonces-panel" className={s.panel} aria-label="Annonces">
      <header className={s.head}>
        <h2>Annonces</h2>
        <button type="button" className={s.close} onClick={() => setOpen(false)} aria-label="Fermer les annonces">
          ✕
        </button>
      </header>

      <ul className={s.list}>
        {items.map((a) => (
          <li key={a.id} className={`${s.entry} ${a.createdAt > baseline ? s.fresh : ""}`}>
            <div className={s.meta}>
              <h3>{a.title}</h3>
              {fmtDate(a.createdAt) && <time>{fmtDate(a.createdAt)}</time>}
            </div>
            <p className={s.text}>{a.body}</p>
            {a.href &&
              (a.external ? (
                <a
                  href={a.href}
                  className={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                >
                  Ouvrir le lien
                </a>
              ) : (
                <Link href={a.href} className={s.link} onClick={() => setOpen(false)}>
                  En savoir plus
                </Link>
              ))}
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <li className={s.item} ref={boxRef}>
      <button
        ref={btnRef}
        type="button"
        className={s.bell}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="annonces-panel"
        aria-label={label}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M13.7 20a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {unread > 0 && (
          <span className={s.badge} aria-hidden="true">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Le panneau est placé dans <body> pour ne dépendre d'aucun style de la barre */}
      {open && createPortal(panel, document.body)}
    </li>
  );
}