import { SITE_URL, FREE_MODULES_PER_COURSE } from "@/lib/config";
import { COURSES } from "@/lib/data/modules";

export default function sitemap() {
  const now = new Date();

  const pages = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/webPage`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/works`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const courses = Object.entries(COURSES).flatMap(([slug, course]) => [
    { url: `${SITE_URL}/works/${slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...course.modules.slice(0, FREE_MODULES_PER_COURSE).map((m) => ({
      url: `${SITE_URL}/works/${slug}/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ]);

  return [...pages, ...courses];
}