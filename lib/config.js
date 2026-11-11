// Prix de la séance de formation poussée : à changer ici uniquement
export const SESSION_PRICE = "10\u00a0000\u00a0F";

// Infos du site : à changer ici uniquement
export const SITE_URL = "https://maucode-web.vercel.app";
export const SITE_NAME = "MauCode";

export const WHATSAPP_NUMBER = "2250507189082";
export const CONTACT_EMAIL = "fa0055970@gmail.com";

// Lien nettoyé : le paramètre "?cplk=..." n'est qu'un suivi Instagram, inutile ici
export const INSTAGRAM_URL = "https://www.instagram.com/maucode225";
// À remplacer par ton vrai lien TikTok quand tu en auras un
// (il pointait vers Instagram avant)
export const TIKTOK_URL = "https://www.instagram.com/maucode225";

// Première plateforme MauCode (lien affiché dans le footer)
export const ORIGINAL_PLATFORM_URL = "https://maucode2.vercel.app/";

export const WHATSAPP_FORMATION_MESSAGE =
  "Bonjour MauCodeWeb, je souhaite m'inscrire à une formation Office.";
export const WHATSAPP_SITE_MESSAGE =
  "Bonjour MauCodeWeb, je souhaite un site web pour mon activité.";
// Message neutre : pour les pages qui parlent à la fois de formation et de site
export const WHATSAPP_GENERAL_MESSAGE =
  "Bonjour MauCodeWeb, j'aimerais avoir des informations sur vos services.";

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Nombre de modules accessibles sans compte, dans chaque cours (1 = le premier seulement)
export const FREE_MODULES_PER_COURSE = 1;

// Menu principal : utilisé par la barre du haut ET par le footer.
// Pour renommer un onglet, change uniquement "label" ici.
export const NAV_LINKS = [
  { href: "/", label: "Hub" },
  { href: "/webPage", label: "Studio" },
  { href: "/works", label: "Académie" },
  { href: "/about", label: "À propos" },
];