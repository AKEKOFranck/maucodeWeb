"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnnouncementsBell from "@/components/Announcements/AnnouncementsBell";
import useAnnouncements from "@/components/Announcements/useAnnouncements";
import AuthLink from "@/components/AuthLink/AuthLink";
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
  const { items, seen, unread, markAllSeen } = useAnnouncements();

  // Ferme le menu mobile quand on change de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Badge sur le burger : seulement menu fermé et annonces non lues
  const showBurgerBadge = !open && unread > 0;

  const burgerLabel = open
    ? "Fermer le menu"
    : unread > 0
    ? `Ouvrir le menu, ${unread} annonce${unread > 1 ? "s" : ""} non lue${unread > 1 ? "s" : ""}`
    : "Ouvrir le menu";

  return (
    <header className={styles.wrapper}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <Link href="/" className={styles.brand}>
          Mau<span>code</span>
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

          {/* Annonces (cloche) : visible seulement s'il y en a */}
          <AnnouncementsBell
            items={items}
            seen={seen}
            unread={unread}
            onOpen={markAllSeen}
          />

          {/* Connexion / Mon compte (et Admin pour toi uniquement) */}
          <AuthLink
            className={styles.pill}
            activeClassName={styles.pillActive}
          />
        </ul>

        <button
          type="button"
          className={styles.burger}
          aria-label={burgerLabel}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          {showBurgerBadge && (
            <b className={styles.burgerBadge} aria-hidden="true">
              {unread > 9 ? "9+" : unread}
            </b>
          )}
        </button>
      </nav>
    </header>
  );
}