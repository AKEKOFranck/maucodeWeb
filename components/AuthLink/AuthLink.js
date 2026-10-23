"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider/AuthProvider";

// Même identifiant que dans la fonction isAdmin() des règles Firestore
const ADMIN_UID = "TON_UID_ICI";

export default function AuthLink({ className, activeClassName = "" }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return null;

  const items = [];
  if (user?.uid === ADMIN_UID) items.push({ href: "/admin", label: "Admin" });
  items.push({ href: "/login", label: user ? "Mon compte" : "Connexion" });

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