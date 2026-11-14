/*
  Manifest de l'application (généré par Next.js sur /manifest.webmanifest).
  SÉCURITÉ : toutes les URLs sont relatives à ton domaine (aucune URL externe).
*/
export default function manifest() {
  return {
    id: "/",
    name: "MauCodeWeb : Formation & Sites web",
    short_name: "Maucode",
    description:
      "Formations Word, Excel, PowerPoint et création de sites web à Abidjan et en ligne.",
    lang: "fr",
    dir: "ltr",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    background_color: "#f6f7fb",
    theme_color: "#f6f7fb",
    prefer_related_applications: false, // MODIF
    categories: ["education", "business", "productivity"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Académie Office", url: "/works" },
      { name: "Studio web", url: "/webPage" },
      { name: "Mon compte", url: "/compte" },
    ],
  };
}