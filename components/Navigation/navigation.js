"use client";

import Link from "next/link";

import {
  FiHome,
  FiMonitor,
  FiBookOpen,
  FiInfo,
} from "react-icons/fi";

import styles from "./navigation.module.css";


/* =====================================================
   DONNÉES DE NAVIGATION
===================================================== */

const navigationItems = [
  {
    id: 1,
    label: "Accueil",
    href: "/",
    icon: FiHome,
  },

  {
    id: 2,
    label: "Création Web",
    href: "/webPage",
    icon: FiMonitor,
  },

  {
    id: 3,
    label: "Formations",
    href: "/works",
    icon: FiBookOpen,
  },

  {
    id: 4,
    label: "À propos",
    href: "/about",
    icon: FiInfo,
  },
];


/* =====================================================
   LOGO
===================================================== */

const logo = {
  name: "MauCode",
  suffix: "WEB",
};


/* =====================================================
   NAVIGATION
===================================================== */

export default function Navigation() {

  return (

    <header className={styles.header}>

      <div className={styles.headerInner}>


        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/"
          className={styles.logoLink}
          aria-label="MauCodeWeb - Accueil"
        >

          <div className={styles.logoMark}>

            <span></span>
            <span></span>
            <span></span>

          </div>


          <div className={styles.logoText}>

            <strong>
              {logo.name}
            </strong>

            <small>
              {logo.suffix}
            </small>

          </div>

        </Link>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className={styles.navigation}
          aria-label="Navigation principale"
        >

          {navigationItems.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.id}
                href={item.href}
                className={styles.navLink}
              >

                <Icon
                  className={styles.navIcon}
                  aria-hidden="true"
                />

                <span>
                  {item.label}
                </span>

              </Link>

            );

          })}

        </nav>

      </div>

    </header>

  );
}