import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const LIMITS = { title: 80, body: 500, href: 200 };
export const PUBLIC_MAX = 5;

const CACHE_KEY = "maucode:announcements:v1";
const SEEN_KEY = "maucode:announcements:seen";
const CACHE_TTL_MS = 10 * 60 * 1000;

/*
  Liens autorisés (les mêmes règles sont appliquées par Firestore à l'écriture) :
  - une page de ton site : /works, /works/word ...  (jamais "//..." ni "\")
  - une adresse WhatsApp officielle : whatsapp.com, chat.whatsapp.com, wa.me
*/
const INTERNAL = /^\/(?:[A-Za-z0-9_#?=&%.-][A-Za-z0-9_/#?=&%.-]*)?$/;
const WHATSAPP = /^https:\/\/(?:(?:www|chat)\.)?whatsapp\.com\/[A-Za-z0-9_/#?=&%.-]*$/;
const WAME = /^https:\/\/wa\.me\/[A-Za-z0-9_/#?=&%.-]*$/;

export function checkHref(value) {
  const none = { ok: true, href: "", external: false };
  const bad = { ok: false, href: "", external: false };
  if (value == null || value === "") return none;
  if (typeof value !== "string") return bad;
  const h = value.trim();
  if (!h) return none;
  if (h.length > LIMITS.href) return bad;
  if (INTERNAL.test(h)) return { ok: true, href: h, external: false };
  if (WHATSAPP.test(h) || WAME.test(h)) return { ok: true, href: h, external: true };
  return bad;
}

/* Tout ce qui vient de la base ou du cache est considéré comme non fiable */
export function sanitize(id, raw) {
  if (!raw || typeof raw !== "object") return null;
  const title = typeof raw.title === "string" ? raw.title.trim().slice(0, LIMITS.title) : "";
  const body = typeof raw.body === "string" ? raw.body.trim().slice(0, LIMITS.body) : "";
  if (!title || !body) return null;
  const link = checkHref(raw.href);
  const createdAt =
    typeof raw.createdAt === "number" ? raw.createdAt : raw.createdAt?.toMillis?.() ?? 0;
  return {
    id: String(id ?? ""),
    title,
    body,
    href: link.ok ? link.href : "",
    external: link.ok && link.external,
    createdAt: Number.isFinite(createdAt) ? createdAt : 0,
  };
}

function readCache() {
  try {
    const raw = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (!raw || typeof raw.t !== "number" || !Array.isArray(raw.items)) return null;
    if (Date.now() - raw.t > CACHE_TTL_MS) return null;
    return raw.items.map((a) => sanitize(a?.id, a)).filter(Boolean).slice(0, PUBLIC_MAX);
  } catch {
    return null;
  }
}

function writeCache(items) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), items }));
  } catch {}
}

export function invalidateCache() {
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {}
}

/*
  Lit les dernières annonces.
  - public : 5 annonces, avec cache de session
  - admin  : { cache: false, max: 50, strict: true }
*/
export async function fetchAnnouncements({ cache = true, max = PUBLIC_MAX, strict = false } = {}) {
  if (cache) {
    const cached = readCache();
    if (cached) return cached;
  }
  try {
    const snap = await getDocs(
      query(collection(db, "announcements"), orderBy("createdAt", "desc"), limit(max))
    );
    const items = [];
    snap.forEach((d) => {
      const a = sanitize(d.id, d.data());
      if (a) items.push(a);
    });
    if (cache) writeCache(items);
    return items;
  } catch (e) {
    console.error("Annonces illisibles :", e);
    if (strict) throw e;
    return [];
  }
}

/* Dernière annonce vue par ce visiteur (gardée seulement dans son navigateur) */
export function getSeen() {
  try {
    return Number(localStorage.getItem(SEEN_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function markSeen(ms) {
  try {
    if (ms > getSeen()) localStorage.setItem(SEEN_KEY, String(ms));
  } catch {}
}