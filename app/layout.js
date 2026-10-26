import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navigation from "@/components/Navigation/navigation";
import Footer from "@/components/Footer/footer";
import { NotificationsProvider } from "@/components/Notifications/notifications";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";
import SignupBanner from "@/components/SignupBanner/SignupBanner";
import {
  SITE_URL,
  SITE_NAME,
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
} from "@/lib/config";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "MauCodeWeb propose des formations accessibles en informatique et la création de sites web modernes à Abidjan et en ligne.";

// Image affichée quand on partage le lien (WhatsApp, Facebook...).
// Remplace par "/og-image.png" (1200x630) quand tu l'auras créée.
const SHARE_IMAGE = "/main.jpg";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "MauCodeWeb | Formation & Création de sites web à Abidjan",
    template: "%s | MauCodeWeb",
  },

  description: DESCRIPTION,

  keywords: [
    "MauCodeWeb",
    "MauCode",
    "formation informatique Abidjan",
    "formation Word Abidjan",
    "formation Excel Abidjan",
    "formation PowerPoint Abidjan",
    "formation bureautique Abidjan",
    "création site web Abidjan",
    "création site vitrine Abidjan",
    "site web professionnel Abidjan",
    "formation informatique en ligne",
  ],

  authors: [{ name: "MauCodeWeb" }],
  creator: "MauCodeWeb",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/LogoMC.ico",
    shortcut: "/LogoMC.ico",
    apple: "/LogoMC.png",
  },

  openGraph: {
    title: "MauCodeWeb | Formation & Création de sites web",
    description:
      "Apprenez les bases de l'informatique et donnez vie à votre présence en ligne avec MauCodeWeb.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: SHARE_IMAGE,
        alt: "MauCodeWeb : formation Office et création de sites web à Abidjan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MauCodeWeb | Formation & Création de sites web",
    description:
      "Apprenez les bases de l'informatique et donnez vie à votre présence en ligne avec MauCodeWeb.",
    images: [SHARE_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
  },

  // Quand tu auras ajouté ton site dans Google Search Console (méthode "balise HTML"),
  // colle ici le code de vérification puis décommente :
  // verification: {
  //   google: "TON_CODE_ICI",
  // },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  telephone: `+${WHATSAPP_NUMBER}`,
  areaServed: "Abidjan, Côte d'Ivoire",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  sameAs: [INSTAGRAM_URL],
  knowsAbout: [
    "Formation Word",
    "Formation Excel",
    "Formation PowerPoint",
    "Création de site web",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${plusJakarta.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <NotificationsProvider>
            <Navigation />
            <SignupBanner />
            {children}
            <Footer />
          </NotificationsProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}