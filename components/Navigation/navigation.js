"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/webPage", label: "Création web" },
  { href: "/works", label: "Formations" },
  { href: "/about", label: "À propos" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Ferme le menu mobile quand on change de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.wrapper}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <Link href="/" className={styles.brand}>
          Mau<span>caude</span>
        </Link>

        <ul className={`${styles.list} ${open ? styles.listOpen : ""}`}>
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.pill} ${
                  isActive(href) ? styles.pillActive : ""
                }`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.burger}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}