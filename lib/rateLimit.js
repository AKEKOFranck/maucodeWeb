/* Limitation de débit en mémoire de l'instance serveur.
   Sur Vercel, plusieurs instances peuvent tourner : la limite est donc approximative.
   Pour une limite stricte, ajoute une règle de rate limiting dans le pare-feu Vercel. */

export function createLimiter({ windowMs, max, maxKeys = 5000 }) {
  const hits = new Map();

  /* Renvoie 0 si autorisé, sinon le nombre de secondes à attendre */
  return function check(key) {
    const now = Date.now();
    const mine = (hits.get(key) || []).filter((t) => now - t < windowMs);

    if (mine.length >= max) {
      hits.set(key, mine);
      return Math.max(1, Math.ceil((mine[0] + windowMs - now) / 1000));
    }

    mine.push(now);
    hits.set(key, mine);

    if (hits.size > maxKeys) {
      for (const [k, v] of hits) {
        if (!v.some((t) => now - t < windowMs)) hits.delete(k);
      }
    }
    return 0;
  };
}

/* Adresse du visiteur. Sur Vercel, ces en-têtes sont posés par la plateforme. */
export function clientIp(req) {
  const h = req.headers;
  const ip =
    h.get("x-vercel-forwarded-for") ||
    h.get("x-real-ip") ||
    (h.get("x-forwarded-for") || "").split(",")[0] ||
    "inconnu";
  return ip.trim().slice(0, 64) || "inconnu";
}