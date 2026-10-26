import { SITE_URL } from "@/lib/config";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}