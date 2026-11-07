/* Outils serveur de l'attestation (jetons, références). */
import { randomBytes, randomInt } from "node:crypto";

/* Jeton non devinable : 128 bits, 22 caractères (base64url) */
export const TOKEN_RE = /^[A-Za-z0-9_-]{22}$/;
export const newToken = () => randomBytes(16).toString("base64url");

/* Référence lisible, sans caractères ambigus (pas de O/0, I/1/L). Ce n'est PAS la clé de vérification. */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function newReference(slug, date) {
  const code = String(slug).replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase().padEnd(3, "X");
  const ym = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
  let tail = "";
  for (let i = 0; i < 6; i++) tail += ALPHABET[randomInt(ALPHABET.length)];
  return `MC-${code}-${ym}-${tail}`;
}