"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider/AuthProvider";

/* Le lien « Admin » n'est qu'un confort d'affichage : l'accès réel est
   contrôlé par les règles Firestore (custom claim "admin"). */
export default function AuthLink({ className, activeClassName = "" }) {
  const { user, isAdmin, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return null;

  const items = [];
  if (user && isAdmin) items.push({ href: "/admin", label: "Admin" });
  items.push(
    user
      ? { href: "/compte", label: "Mon compte" }
      : { href: "/login", label: "Connexion" }
  );

  return items.map(({ href, label }) => {
    const active = pathname.startsWith(href);
    return (
      <li key={href}>
        <Link
          href={href}
          className={`${className} ${active ? activeClassName : ""}`}
          aria-current={active ? "page" : undefined}
        >
          {label}
        </Link>
      </li>
    );
  });
}