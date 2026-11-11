import { COURSES } from "@/lib/data/modules";
import CompteClient from "./CompteClient";

/*
  Composant SERVEUR : lit le catalogue (lib/data/modules.js est "server-only")
  et n'envoie au navigateur que le strict nécessaire : slugs, titres, couleur.
  Les quiz et leurs réponses ne quittent JAMAIS le serveur.
*/
const HEX = /^#[0-9a-fA-F]{6}$/;

function buildCatalog() {
  return Object.entries(COURSES).map(([slug, c]) => ({
    slug,
    software: String(c.software || slug).slice(0, 40),
    accent: typeof c.accent === "string" && HEX.test(c.accent) ? c.accent : "#4cc3ff",
    modules: (Array.isArray(c.modules) ? c.modules : []).map((m) => ({
      slug: String(m.slug),
      title: String(m.title || m.slug).slice(0, 100),
    })),
  }));
}

export default function ComptePage() {
  return <CompteClient catalog={buildCatalog()} />;
}