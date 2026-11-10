import { SITE_URL, FREE_MODULES_PER_COURSE } from "@/lib/config";
import { COURSES } from "@/lib/data/modules";

export default function sitemap() {
  const pages = ["", "/webPage", "/works", "/about"].map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
  }));

  // Seuls les modules gratuits sont publics : les autres demandent un compte
  const courses = Object.entries(COURSES).flatMap(([slug, course]) => [
    { url: `${SITE_URL}/works/${slug}` },
    ...course.modules
      .slice(0, FREE_MODULES_PER_COURSE)
      .map((m) => ({ url: `${SITE_URL}/works/${slug}/${m.slug}` })),
  ]);

  return [...pages, ...courses];
}