"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AnnouncementsBell from "@/components/Announcements/AnnouncementsBell";
import useAnnouncements from "@/components/Announcements/useAnnouncements";
import AuthLink from "@/components/AuthLink/AuthLink";
import { NAV_LINKS } from "@/lib/config";
import styles from "./navigation.module.css";

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);
  const { items, seen, unread, markAllSeen } = useAnnouncements();

  // Ferme le menu mobile quand on change de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Échap ferme le menu mobile
  useEffect(() => {
    if (!open) return;
    const onEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);

  // Flèches gauche/droite : on passe d'un onglet à l'autre (comme sur une console)
  const onListKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

    const list = listRef.current;
    if (!list) return;

    const focusables = Array.from(
      list.querySelectorAll(":scope > li > a, :scope > li > button")
    );
    const index = focusables.indexOf(document.activeElement);
    if (index === -1) return; // le focus est ailleurs (ex. dans le menu des annonces)

    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = (index + step + focusables.length) % focusables.length;
    focusables[next].focus();
  };

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
        <Link href="/" className={styles.brand} aria-label="MauCode, accueil">
          <Image
            src="/icons/mark-128.png"
            alt=""
            width={34}
            height={34}
            className={styles.mark}
            priority
          />
          <span className={styles.brandText}>
            Mau<span>code</span>
          </span>
        </Link>

        <ul
          ref={listRef}
          onKeyDown={onListKeyDown}
          className={`${styles.list} ${open ? styles.listOpen : ""}`}
        >
          {NAV_LINKS.map(({ href, label }) => (
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