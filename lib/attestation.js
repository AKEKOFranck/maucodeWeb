/* Utilitaires partagés (navigateur + serveur) de l'attestation de réussite Maucode.
   Aucune fonction ici ne touche à window au chargement du module. */

const SLUG_RE = /^[a-z0-9-]{1,50}$/;

export function isValidSlug(slug) {
  return typeof slug === "string" && SLUG_RE.test(slug);
}

/* Nom lisible de l'outil, déduit du slug ou du titre du cours */
export function toolLabel(slug, title) {
  const t = `${slug || ""} ${title || ""}`.toLowerCase();
  if (t.includes("powerpoint") || t.includes("power point")) return "Microsoft PowerPoint";
  if (t.includes("excel")) return "Microsoft Excel";
  if (t.includes("word")) return "Microsoft Word";
  return String(title || slug || "").slice(0, 80);
}

/* Nom saisi par l'apprenant : lettres, espaces, apostrophe, point, tiret (2 à 60 caractères) */
export function cleanName(input) {
  const n = String(input || "").normalize("NFC").replace(/\s+/g, " ").trim();
  if (n.length < 2 || n.length > 60) return null;
  if (!/^[\p{L}][\p{L}\p{M}' .-]*$/u.test(n)) return null;
  return n;
}

/* Nom abrégé affiché publiquement : « Akeko Maurice » -> « Akeko M. » */
export function maskName(full) {
  const parts = String(full || "").trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  const last = parts[parts.length - 1];
  return `${parts[0]} ${Array.from(last)[0].toUpperCase()}.`;
}

/* ---------- Stockage navigateur (protégé : peut être indisponible) ---------- */
function get(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function set(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignoré */
  }
}

/* ---------- Infos du cours (écrites par Moduleflow, simple confort) ---------- */
export function saveCourseInfo(slug, title, moduleSlugs) {
  if (!isValidSlug(slug) || !Array.isArray(moduleSlugs)) return;
  const modules = moduleSlugs.filter((m) => typeof m === "string" && m.length <= 80).slice(0, 50);
  if (modules.length === 0) return;
  set(
    `mc-course-info:${slug}`,
    JSON.stringify({ title: String(title || "").slice(0, 80), modules })
  );
}

/* ---------- Choix de l'apprenant (fenêtre de fin de formation) ---------- */
export function getChoice(slug) {
  if (!isValidSlug(slug)) return null;
  const v = get(`mc-attestation-choice:${slug}`);
  return v === "yes" || v === "no" ? v : null;
}
export function setChoice(slug, value) {
  if (!isValidSlug(slug) || (value !== "yes" && value !== "no")) return;
  set(`mc-attestation-choice:${slug}`, value);
}

/* ---------- Adresse publique de vérification ---------- */
export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://maucode-web.vercel.app").replace(/\/+$/, "");
}
export function verifyUrlFor(token) {
  return `${siteUrl()}/verification/${token}`;
}