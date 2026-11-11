"use client";
/* App Check (reCAPTCHA Enterprise) : prouve que la requête vient de ton vrai site.
   Inactif tant que NEXT_PUBLIC_RECAPTCHA_SITE_KEY n'est pas définie.
   La clé de site reCAPTCHA est publique par nature : NEXT_PUBLIC_ est normal ici. */
import { app } from "@/lib/firebase";
import { initializeAppCheck, ReCaptchaEnterpriseProvider, getToken } from "firebase/app-check";

let appCheck = null;

export async function getAppCheckHeaders() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || typeof window === "undefined") return {};
  try {
    if (!appCheck) {
      if (process.env.NODE_ENV !== "production") self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    }
    const { token } = await getToken(appCheck, false);
    return { "X-Firebase-AppCheck": token };
  } catch (e) {
    console.error("App Check indisponible :", e);
    return {};
  }
}