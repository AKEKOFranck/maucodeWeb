import Link from "next/link";

import {
  FiInstagram,
  FiMail,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaHeadset } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";

import {
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  WHATSAPP_FORMATION_MESSAGE,
  WHATSAPP_SITE_MESSAGE,
  whatsappLink,
} from "@/lib/config";

import styles from "./footer.module.css";

/* =====================================================
   NAVIGATION DU FOOTER
===================================================== */

const footerNavigation = [
  { id: 1, label: "Accueil", href: "/" },
  { id: 2, label: "Création Web", href: "/webPage" },
  { id: 3, label: "Formations", href: "/works" },
  { id: 4, label: "À propos", href: "/about" },
];

/* =====================================================
   RÉSEAUX SOCIAUX
===================================================== */

const socialLinks = [
  {
    id: 1,
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: FiInstagram,
    external: true,
  },
  {
    id: 2,
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: FiMail,
    external: false,
  },
  {
    id: 3,
    label: "WhatsApp – Formation",
    href: whatsappLink(WHATSAPP_FORMATION_MESSAGE),
    icon: FaHeadset,
    external: true,
  },
  {
    id: 4,
    label: "WhatsApp – Site web",
    href: whatsappLink(WHATSAPP_SITE_MESSAGE),
    icon: RiCustomerService2Line,
    external: true,
  },
];

/* =====================================================
   IDENTITÉ MAUCODEWEB
===================================================== */

const brand = {
  name: "MauCode",
  suffix: "WEB",

  description:
    "Formation numérique et création de sites web accessibles à Abidjan et en ligne.",
};

/* =====================================================
   FOOTER
===================================================== */

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* FOOTER TOP */}
        <div className={styles.footerTop}>

          {/* BRAND */}
          <div className={styles.footerBrand}>
            <Link
              href="/"
              className={styles.footerLogoLink}
              aria-label="MauCodeWeb - Accueil"
            >
              <div className={styles.logoMark}>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className={styles.logoText}>
                <strong>{brand.name}</strong>
                <small>{brand.suffix}</small>
              </div>
            </Link>

            <p className={styles.brandDescription}>
              {brand.description}
            </p>
          </div>

          {/* RÉSEAUX */}
          <div className={styles.socialSection}>
            <h3>Restons connectés</h3>

            <p className={styles.columnDescription}>
              Retrouvez MauCodeWeb et échangez avec nous.
            </p>

            <div className={styles.socialLinks}>
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    title={social.label}
                    className={styles.socialLink}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* EXPLORER */}
          <div className={styles.footerColumn}>
            <h3>Explorer MauCodeWeb</h3>

            <span className={styles.blueLine}></span>

            <div className={styles.footerNavigation}>
              {footerNavigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={styles.footerNavLink}
                >
                  <span>{item.label}</span>
                  <FiArrowUpRight />
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* ANCIEN MAUCODE */}
        <div className={styles.originalMaucode}>
          <span>
            Vous souhaitez découvrir notre première plateforme ?
          </span>

          <a
            href="https://maucode2.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Découvrir MauCode</span>
            <FiArrowUpRight />
          </a>
        </div>

        {/* FOOTER BOTTOM */}
        <div className={styles.footerBottom}>
          <p>
            © {new Date().getFullYear()} MauCodeWeb.
            Tous droits réservés.
          </p>

          <span>Abidjan · Côte d’Ivoire</span>
        </div>

      </div>
    </footer>
  );
}