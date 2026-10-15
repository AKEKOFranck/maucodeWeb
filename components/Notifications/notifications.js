"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getNewModules } from "@/lib/data/modules";
import s from "./notifications.module.css";

/* ---------- Petit utilitaire : localStorage sans danger ---------- */
const read = (k) => {
  try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; }
};
const write = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
};
const keyOf = (m) => `${m.course}/${m.slug}`;

/* ---------- 1. Messages à l'écran (toasts) ---------- */
const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const nextId = useRef(0);

  const remove = useCallback((id) => setItems((l) => l.filter((t) => t.id !== id)), []);

  const toast = useCallback((message, opts = {}) => {
    const t = { id: ++nextId.current, message, type: opts.type || "info", href: opts.href, label: opts.label };
    setItems((l) => [...l.slice(-3), t]);
    setTimeout(() => remove(t.id), opts.duration ?? 5500);
  }, [remove]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={s.stack} role="region" aria-live="polite" aria-label="Notifications">
        {items.map((t) => (
          <div key={t.id} className={`${s.toast} ${s[t.type]}`}>
            <span>{t.message}</span>
            {t.href && (
              <Link href={t.href} className={s.action} onClick={() => remove(t.id)}>
                {t.label || "Voir"}
              </Link>
            )}
            <button type="button" className={s.close} aria-label="Fermer" onClick={() => remove(t.id)}>×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ---------- 2. Alerte « nouveaux modules » (une fois par visiteur) ---------- */
function NewModulesWatcher() {
  const toast = useToast();
  useEffect(() => {
    const seen = read("maucode:seenNew");
    const unseen = getNewModules().filter((m) => !seen.includes(keyOf(m)));
    if (!unseen.length) return;
    toast(
      unseen.length === 1
        ? `Nouveau module : ${unseen[0].title}`
        : `${unseen.length} nouveaux modules ajoutés`,
      { type: "info", href: "/works", label: "Voir", duration: 9000 }
    );
    write("maucode:seenNew", [...seen, ...unseen.map(keyOf)]);
  }, [toast]);
  return null;
}

export function NotificationsProvider({ children }) {
  return (
    <ToastProvider>
      {children}
      <NewModulesWatcher />
    </ToastProvider>
  );
}

/* ---------- 3. Bandeau « Nouveau ! » sur la page des formations ---------- */
export function NewModulesBanner() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const dismissed = read("maucode:bannerDismissed");
    setItems(getNewModules().filter((m) => !dismissed.includes(keyOf(m))));
  }, []);

  if (!items.length) return null;

  const dismiss = () => {
    write("maucode:bannerDismissed", [...read("maucode:bannerDismissed"), ...items.map(keyOf)]);
    setItems([]);
  };

  return (
    <aside className={s.banner} role="status">
      <div>
        <p><strong>Nouveau !</strong> {items.length > 1 ? `${items.length} modules ajoutés` : "1 module ajouté"} :</p>
        <ul className={s.bannerList}>
          {items.map((m) => (
            <li key={keyOf(m)}>
              <Link href={`/works/${m.course}/${m.slug}`}>{m.courseTitle} : {m.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className={s.bannerBtn} onClick={dismiss}>J'ai vu</button>
    </aside>
  );
}

export function NewBadge({ added, days = 14 }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(Date.now() - new Date(added).getTime() < days * 86400000);
  }, [added, days]);
  return show ? <span className={s.badge}>Nouveau</span> : null;
}

/* ---------- 4. Bouton « Activer les rappels » (notifications push) ---------- */
function urlBase64ToUint8Array(b64) {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

export function PushToggle() {
  const toast = useToast();
  const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const [state, setState] = useState("loading"); // loading | unsupported | off | on | denied

  useEffect(() => {
    if (!key || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      setState("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setState("denied");
      return;
    }
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setState(sub ? "on" : "off"))
      .catch(() => setState("unsupported"));
  }, [key]);

  async function enable() {
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setState(perm === "denied" ? "denied" : "off");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(key),
      });
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
      if (!res.ok) throw new Error("subscribe");
      setState("on");
      toast("Rappels activés. Tu seras prévenu des nouveaux modules.", { type: "success" });
    } catch {
      toast("Impossible d'activer les rappels pour le moment.", { type: "error" });
    }
  }

  async function disable() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setState("off");
      toast("Rappels désactivés.", { type: "info" });
    } catch {
      toast("Impossible de désactiver les rappels.", { type: "error" });
    }
  }

  if (state === "loading" || state === "unsupported") return null;
  if (state === "denied") {
    return <p className={s.pushNote}>Les notifications sont bloquées. Autorise-les dans les réglages du site.</p>;
  }
  return (
    <button type="button" className={s.push} onClick={state === "on" ? disable : enable}>
      {state === "on" ? "🔔 Rappels activés (désactiver)" : "🔔 Activer les rappels"}
    </button>
  );
}