import { COURSES } from "@/lib/data/modules";
import AdminClient from "./AdminClient";

/* Seulement ce dont le tableau de bord a besoin : jamais les quiz ni leurs réponses.
   Les valeurs sont contrôlées avant d'aller au navigateur. */
const HEX = /^#[0-9a-fA-F]{6}$/;

export default function AdminPage() {
  const catalog = Object.entries(COURSES).map(([slug, c]) => ({
    slug,
    software: String(c.software || slug).slice(0, 40),
    accent: typeof c.accent === "string" && HEX.test(c.accent) ? c.accent : "#4cc3ff",
    modules: (Array.isArray(c.modules) ? c.modules : []).map((m) => ({
      slug: String(m.slug),
      title: String(m.title || m.slug).slice(0, 100),
    })),
  }));
  return <AdminClient catalog={catalog} />;
}