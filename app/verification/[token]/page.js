import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { FiAlertTriangle, FiCheck, FiX } from "react-icons/fi";
import { adminDb } from "@/lib/firebaseAdmin";
import { TOKEN_RE } from "@/lib/attestationServer";
import { createLimiter, clientIp } from "@/lib/rateLimit";
import s from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vérification d'attestation | Maucode",
  robots: { index: false, follow: false },
  // Le code de vérification est dans l'adresse : on ne le transmet à aucun autre site
  referrer: "no-referrer",
};

/* 30 vérifications par visiteur et par 10 minutes : largement assez pour un usage normal,
   mais bloque le balayage de codes et limite les lectures Firestore. */
const limiter = createLimiter({ windowMs: 10 * 60 * 1000, max: 30 });

async function lookup(token) {
  const h = await headers();
  if (limiter(clientIp({ headers: h })) > 0) return { state: "toomany" };

  if (!TOKEN_RE.test(token)) return { state: "notfound" };
  try {
    const snap = await adminDb().collection("attestations").doc(token).get();
    if (!snap.exists) return { state: "notfound" };
    const d = snap.data();
    if (d.revoked === true) return { state: "revoked" };
    return {
      state: "valid",
      displayName: String(d.displayName || ""),
      courseTitle: String(d.courseTitle || ""),
      reference: String(d.reference || ""),
      issuedAt: d.issuedAt.toDate(),
    };
  } catch (e) {
    console.error("Vérification :", e);
    return { state: "error" };
  }
}

const fmt = (date) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(date);

const STATES = {
  valid: {
    tone: "ok",
    Icon: FiCheck,
    label: "Attestation authentique",
    title: "Cette attestation a bien été délivrée par Maucode",
  },
  revoked: {
    tone: "warn",
    Icon: FiAlertTriangle,
    label: "Attestation annulée",
    title: "Cette attestation n'est plus valable",
    text: "Elle a été annulée par Maucode. Contacte Maucode pour plus d'informations.",
  },
  notfound: {
    tone: "ko",
    Icon: FiX,
    label: "Aucune attestation trouvée",
    title: "Ce code ne correspond à aucune attestation",
    text: "Vérifie que tu as bien scanné le QR code du document. Si tu as un doute sur le document, contacte son titulaire ou Maucode.",
  },
  toomany: {
    tone: "warn",
    Icon: FiAlertTriangle,
    label: "Trop de vérifications",
    title: "Réessaie dans quelques minutes",
    text: "Beaucoup de vérifications ont été faites depuis ta connexion. Patiente un peu, puis rescanne le QR code.",
  },
  error: {
    tone: "warn",
    Icon: FiAlertTriangle,
    label: "Vérification indisponible",
    title: "Impossible de vérifier pour le moment",
    text: "Réessaie dans quelques minutes.",
  },
};

export default async function VerificationPage({ params }) {
  const { token } = await params;
  const r = await lookup(token);
  const st = STATES[r.state] ?? STATES.error;
  const Icon = st.Icon;

  return (
    <main className={s.wrap}>
      <div className={`glass ${s.card}`}>
        <Image src="/LogoMC.png" alt="Maucode" width={56} height={56} className={s.logo} />

        <div className={`${s.seal} ${s[st.tone]}`} aria-hidden="true">
          <Icon />
        </div>
        <p className={`${s.badge} ${s[`${st.tone}Text`]}`}>{st.label}</p>
        <h1 className={s.title}>{st.title}</h1>

        {r.state === "valid" ? (
          <>
            <dl className={s.list}>
              <div>
                <dt>Titulaire</dt>
                <dd>{r.displayName}</dd>
              </div>
              <div>
                <dt>Formation</dt>
                <dd>{r.courseTitle}</dd>
              </div>
              <div>
                <dt>Délivrée le</dt>
                <dd>{fmt(r.issuedAt)}</dd>
              </div>
              <div>
                <dt>Référence</dt>
                <dd className={s.ref}>{r.reference}</dd>
              </div>
            </dl>

            <p className={s.hint}>
              Vérifie que le nom et la référence sur le document correspondent à ceux affichés ici.
            </p>
          </>
        ) : (
          <p className={s.hint}>{st.text}</p>
        )}

        <div className={s.notice} role="note">
          <strong>Rappel :</strong> cette attestation de réussite est délivrée par Maucode, organisme de
          formation privé en ligne. Elle n&apos;est <strong>pas un diplôme</strong> et{" "}
          <strong>n&apos;est pas validée ni reconnue par l&apos;État de Côte d&apos;Ivoire</strong>.
        </div>

        <Link href="/" className={s.home}>
          Aller sur Maucode
        </Link>
      </div>
    </main>
  );
}