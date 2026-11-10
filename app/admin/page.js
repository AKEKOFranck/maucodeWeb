import { COURSES } from "@/lib/data/modules";
import AdminClient from "./AdminClient";

export default function AdminPage() {
  // Seulement ce dont le tableau de bord a besoin : jamais les quiz ni leurs réponses
  const catalog = Object.entries(COURSES).map(([slug, c]) => ({
    slug,
    software: c.software,
    accent: c.accent,
    modules: c.modules.map((m) => ({ slug: m.slug, title: m.title })),
  }));
  return <AdminClient catalog={catalog} />;
}