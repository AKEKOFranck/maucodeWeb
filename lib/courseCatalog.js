/* Catalogue des formations, côté SERVEUR : il dit quels modules il faut valider
   pour obtenir l'attestation. Il lit directement lib/data/modules.js, donc tout nouveau
   module ajouté là-bas est automatiquement exigé pour l'attestation.
   Ne fais jamais confiance à une liste envoyée par le navigateur. */
import { COURSES } from "@/lib/data/modules";

export function getCourse(slug) {
  const c = Object.hasOwn(COURSES, slug) ? COURSES[slug] : null;
  if (!c || !Array.isArray(c.modules) || c.modules.length === 0) return null;
  return {
    title: String(c.software || slug),
    modules: c.modules.map((m) => m.slug),
  };
}