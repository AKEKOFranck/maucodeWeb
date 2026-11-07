/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Force HTTPS pendant 2 ans
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Empêche d'intégrer le site dans une iframe (anti-clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Empêche le navigateur de deviner les types de fichiers
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limite les infos envoyées aux autres sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Coupe les accès matériel inutiles
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig = {
  // Cache la mention « X-Powered-By: Next.js »
  poweredByHeader: false,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Les réponses de l'API ne doivent jamais être mises en cache
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;