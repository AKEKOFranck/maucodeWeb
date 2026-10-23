import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/navigation";
import Footer from "@/components/Footer/footer";
import {NotificationsProvider} from "@/components/Notifications/notifications";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";
import { useAuth } from "@/components/AuthProvider/AuthProvider";

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

export const metadata = {
  metadataBase: new URL("https://maucode2.vercel.app/"),

  title: {
    default: "MauCodeWeb | Formation & Création de sites web à Abidjan",
    template: "%s | MauCodeWeb",
  },

  description:
    "MauCodeWeb propose des formations accessibles en informatique et la création de sites web modernes à Abidjan et en ligne.",

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

  authors: [
    {
      name: "MauCodeWeb",
    },
  ],

  creator: "MauCodeWeb",

  icons: {
    icon: "/LogoMC.ico",
    shortcut: "/LogoMC.ico",
    apple: "/LogoMC.png",
  },

  openGraph: {
    title: "MauCodeWeb | Formation & Création de sites web",
    description:
      "Apprenez les bases de l'informatique et donnez vie à votre présence en ligne avec MauCodeWeb.",
    url: "https://maucode2.vercel.app/",
    siteName: "MauCodeWeb",
    locale: "fr_FR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${plusJakarta.variable} ${geistMono.variable}`}
    >
      <body>
        <AuthProvider>
          <NotificationsProvider>
            <Navigation />
            {children}
            <Footer />
          </NotificationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}