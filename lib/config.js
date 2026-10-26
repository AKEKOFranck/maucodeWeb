// Prix de la séance de formation poussée : à changer ici uniquement
export const SESSION_PRICE = "10\u00a0000\u00a0F";

// Infos du site : à changer ici uniquement
export const SITE_URL = "https://maucode-web.vercel.app";
export const SITE_NAME = "MauCode";

export const WHATSAPP_NUMBER = "2250507189082";
export const CONTACT_EMAIL = "fa0055970@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/maucode225?cplk=M2F0ZXphNGp6eXhz";
export const TIKTOK_URL = "https://www.instagram.com/maucode225?cplk=M2F0ZXphNGp6eXhz";

export const WHATSAPP_FORMATION_MESSAGE =
  "Bonjour MauCodeWeb, je souhaite m'inscrire à une formation Office.";
export const WHATSAPP_SITE_MESSAGE =
  "Bonjour MauCodeWeb, je souhaite un site web pour mon activité.";

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Nombre de modules accessibles sans compte, dans chaque cours (1 = le premier seulement)
export const FREE_MODULES_PER_COURSE = 1;