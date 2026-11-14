"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./PwaInstall.module.css";

/*
  Enregistre le service worker et aide à installer l'application.
  - Android / Chrome / Edge : bouton « Installer » (beforeinstallprompt).
  - Android sans bouton (Samsung Internet...) : guide pas à pas.
  - iPhone / iPad : guide « Sur l'écran d'accueil ».
  - Navigateur intégré (Facebook, Instagram...) : il faut ouvrir le site dans le vrai navigateur.
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

function isAndroid() {
  return /android/i.test(window.navigator.userAgent);
}

function isSamsungBrowser() {
  return /SamsungBrowser/i.test(window.navigator.userAgent);
}

/* Navigateurs intégrés aux applications : ils ne savent pas installer une PWA */
function isInAppBrowser() {
  return /FBAN|FBAV|FB_IAB|Instagram|TikTok|musical_ly|Snapchat|Line\/|MicroMessenger|; wv\)/i.test(
    window.navigator.userAgent
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
  const [mode, setMode] = useState(null); // "android" | "manual" | "ios" | "inapp" | null
  const [open, setOpen] = useState(false);
  const [samsung, setSamsung] = useState(false);

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

    setSamsung(isSamsungBrowser());

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

    // On attend quelques secondes pour ne pas gêner l'arrivée sur le site
    const timer = window.setTimeout(() => {
      if (isInAppBrowser()) {
        setMode("inapp");
        setOpen(true);
      } else if (isIos()) {
        setMode("ios");
      } else if (isAndroid()) {
        // Pas de bouton natif reçu : on propose le guide manuel
        setMode((prev) => prev || "manual");
      }
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
    setOpen(false);
  };

  if (!mode) return null;

  const title =
    mode === "inapp" ? "Ouvre dans ton navigateur" : "Installer Maucode";

  const subtitle =
    mode === "inapp"
      ? "L'installation ne marche pas depuis cette fenêtre."
      : mode === "ios"
        ? "Ajoutez l'app à votre écran d'accueil."
        : mode === "manual"
          ? "Ajoutez l'app à votre écran d'accueil, c'est gratuit et sans risque."
          : "Accès direct depuis votre écran d'accueil, en plein écran.";

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
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>

      <div className={styles.actions}>
        {mode === "android" && (
          <button type="button" className={styles.primary} onClick={install}>
            Installer
          </button>
        )}
        {(mode === "ios" || mode === "manual") && (
          <button
            type="button"
            className={styles.primary}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
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

      {mode === "ios" && open && (
        <ol className={styles.steps}>
          <li>
            Dans Safari, appuyez sur <b>Partager</b> (le carré avec une flèche).
          </li>
          <li>
            Choisissez <b>Sur l&apos;écran d&apos;accueil</b>.
          </li>
          <li>
            Validez avec <b>Ajouter</b>, puis ouvrez Maucode depuis son icône.
          </li>
        </ol>
      )}

      {mode === "manual" && open && (
        <ol className={styles.steps}>
          {samsung ? (
            <>
              <li>
                Dans Samsung Internet, appuyez sur le menu <b>☰</b>.
              </li>
              <li>
                Choisissez <b>Ajouter la page à</b>, puis <b>Écran d&apos;accueil</b>.
              </li>
              <li>Validez, puis ouvrez Maucode depuis son icône.</li>
            </>
          ) : (
            <>
              <li>
                Dans Chrome, appuyez sur le menu <b>⋮</b>.
              </li>
              <li>
                Choisissez <b>Installer l&apos;application</b> (ou{" "}
                <b>Ajouter à l&apos;écran d&apos;accueil</b>).
              </li>
              <li>Validez, puis ouvrez Maucode depuis son icône.</li>
            </>
          )}
        </ol>
      )}

      {mode === "inapp" && open && (
        <ol className={styles.steps}>
          <li>
            Appuyez sur le menu <b>⋮</b> ou <b>…</b> de cette fenêtre.
          </li>
          <li>
            Choisissez <b>Ouvrir dans le navigateur</b> (Chrome, Samsung Internet ou Safari).
          </li>
          <li>Installez ensuite l&apos;app depuis ce navigateur.</li>
        </ol>
      )}
    </section>
  );
}