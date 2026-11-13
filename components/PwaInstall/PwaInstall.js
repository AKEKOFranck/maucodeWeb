"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./PwaInstall.module.css";

/*
  Enregistre le service worker et propose d'installer l'application.
  - Android / Chrome / Edge : bouton « Installer » (événement beforeinstallprompt).
  - iPhone / iPad : petit guide « Sur l'écran d'accueil » (iOS n'a pas de bouton natif).
  - Rien n'est affiché si l'app est déjà installée ou si l'invite a été fermée récemment.
  SÉCURITÉ : aucune donnée envoyée ; seul l'horodatage du « Fermer » est gardé en local.
*/

const DISMISS_KEY = "maucode:pwa-dismissed-at";
const DISMISS_DAYS = 14;

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIos() {
  const ua = window.navigator.userAgent;
  return (
    /iphone|ipad|ipod/i.test(ua) ||
    (ua.includes("Macintosh") && window.navigator.maxTouchPoints > 1)
  );
}

function recentlyDismissed() {
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const at = Number(raw);
    if (!Number.isFinite(at)) return false;
    return Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function rememberDismiss() {
  try {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    /* stockage indisponible : on ignore */
  }
}

export default function PwaInstall() {
  const [deferred, setDeferred] = useState(null);
  const [mode, setMode] = useState(null); // "android" | "ios" | null
  const [iosOpen, setIosOpen] = useState(false);

  /* ---------- 1. Service worker (production + HTTPS uniquement) ---------- */
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator) || !window.isSecureContext) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => {
          /* échec silencieux : le site marche très bien sans service worker */
        });
    };

    const checkUpdate = () => {
      if (document.visibilityState !== "visible") return;
      navigator.serviceWorker
        .getRegistration()
        .then((reg) => reg?.update())
        .catch(() => {});
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
    document.addEventListener("visibilitychange", checkUpdate);

    return () => {
      window.removeEventListener("load", register);
      document.removeEventListener("visibilitychange", checkUpdate);
    };
  }, []);

  /* ---------- 2. Invite d'installation ---------- */
  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;

    const onBeforeInstall = (event) => {
      event.preventDefault();
      setDeferred(event);
      setMode("android");
    };
    const onInstalled = () => {
      setDeferred(null);
      setMode(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    // iOS : on attend quelques secondes pour ne pas gêner l'arrivée sur le site
    const timer = window.setTimeout(() => {
      if (isIos()) setMode("ios");
    }, 4000);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      window.clearTimeout(timer);
    };
  }, []);

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    try {
      const choice = await deferred.userChoice;
      if (choice?.outcome !== "accepted") rememberDismiss();
    } catch {
      /* ignoré */
    }
    setDeferred(null);
    setMode(null);
  };

  const dismiss = () => {
    rememberDismiss();
    setMode(null);
    setIosOpen(false);
  };

  if (!mode) return null;

  return (
    <section className={styles.card} aria-label="Installer l'application Maucode">
      <Image
        src="/icons/icon-192.png"
        alt=""
        width={44}
        height={44}
        className={styles.icon}
      />

      <div className={styles.text}>
        <strong>Installer Maucode</strong>
        <span>
          {mode === "ios"
            ? "Ajoutez l'app à votre écran d'accueil."
            : "Accès direct depuis votre écran d'accueil, en plein écran."}
        </span>
      </div>

      <div className={styles.actions}>
        {mode === "android" ? (
          <button type="button" className={styles.primary} onClick={install}>
            Installer
          </button>
        ) : (
          <button
            type="button"
            className={styles.primary}
            onClick={() => setIosOpen((v) => !v)}
            aria-expanded={iosOpen}
          >
            Comment faire
          </button>
        )}
        <button
          type="button"
          className={styles.close}
          onClick={dismiss}
          aria-label="Fermer"
        >
          ×
        </button>
      </div>

      {mode === "ios" && iosOpen && (
        <ol className={styles.steps}>
          <li>
            Dans Safari, appuyez sur <b>Partager</b> (le carré avec une flèche).
          </li>
          <li>
            Choisissez <b>Sur l'écran d'accueil</b>.
          </li>
          <li>
            Validez avec <b>Ajouter</b>, puis ouvrez Maucode depuis son icône.
          </li>
        </ol>
      )}
    </section>
  );
}