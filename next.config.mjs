/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

/*
  CONTENT SECURITY POLICY (CSP)
  ------------------------------------------------------------
  Elle dit au navigateur d'où le site a le droit de charger des scripts,
  images, connexions... Si un pirate arrive à injecter du code, il sera bloqué.

  ÉTAPE 1 (maintenant) : ENFORCE_CSP = false
    -> la règle est en mode "rapport" : rien n'est bloqué, mais la console du
       navigateur (F12) affiche ce qui AURAIT été bloqué.
       Teste : accueil, connexion Google/Firebase (photo de profil comprise),
       formations, admin, attestation, formulaire de feedback.
  ÉTAPE 2 : si la console est propre, passe ENFORCE_CSP à true.
*/
const ENFORCE_CSP = false;

const csp = [
  "default-src 'self'",
  // 'unsafe-inline' est requis par Next.js sans système de nonce.
  // apis.google.com = script d'authentification Firebase (popup Google)
  // google.com/gstatic.com recaptcha = App Check (reCAPTCHA v3)
  `script-src 'self' 'unsafe-inline' ${
    isDev ? "'unsafe-eval' " : ""
  }https://apis.google.com https://va.vercel-scripts.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/`,
  "style-src 'self' 'unsafe-inline'",
  // lh3.googleusercontent.com = photo de profil Google. Plus de "https:" ouvert à tous.
  "img-src 'self' data: blob: https://lh3.googleusercontent.com",
  "font-src 'self' data:",
  // Firebase (Auth + Firestore + App Check, tous sous *.googleapis.com) + Vercel Analytics
  `connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebaseapp.com https://vitals.vercel-insights.com${
    isDev ? " ws: http://localhost:*" : ""
  }`,
  // Fenêtres d'authentification Firebase / Google + iframe reCAPTCHA
  "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://*.web.app https://www.google.com/recaptcha/ https://recaptcha.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  isDev ? "" : "upgrade-insecure-requests",
]
  .filter(Boolean)
  .join("; ");

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
  // Isole la fenêtre du site tout en gardant la popup de connexion Google fonctionnelle
  // (ne pas mettre "same-origin" strict : ça casserait la connexion par popup)
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // Accélère la navigation sans risque
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: ENFORCE_CSP
      ? "Content-Security-Policy"
      : "Content-Security-Policy-Report-Only",
    value: csp,
  },
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