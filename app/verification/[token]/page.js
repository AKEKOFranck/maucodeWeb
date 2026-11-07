import Image from "next/image";
import { adminDb } from "@/lib/firebaseAdmin";
import { TOKEN_RE } from "@/lib/attestationServer";
import s from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vérification d'attestation | Maucode",
  robots: { index: false, follow: false },
};

async function lookup(token) {
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

export default async function VerificationPage({ params }) {
  const { token } = await params;
  const r = await lookup(token);

  return (
    <main className={s.wrap}>
      <div className={s.card}>
        <Image src="/LogoMC.png" alt="Maucode" width={64} height={64} className={s.logo} />

        {r.state === "valid" && (
          <>
            <p className={`${s.badge} ${s.ok}`}>
              <span aria-hidden="true">✓</span> Attestation authentique
            </p>
            <h1 className={s.title}>Cette attestation a bien été délivrée par Maucode</h1>

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
        )}

        {r.state === "revoked" && (
          <>
            <p className={`${s.badge} ${s.warn}`}>
              <span aria-hidden="true">!</span> Attestation annulée
            </p>
            <h1 className={s.title}>Cette attestation n&apos;est plus valable</h1>
            <p className={s.hint}>Elle a été annulée par Maucode. Contacte Maucode pour plus d&apos;informations.</p>
          </>
        )}

        {r.state === "notfound" && (
          <>
            <p className={`${s.badge} ${s.ko}`}>
              <span aria-hidden="true">✕</span> Aucune attestation trouvée
            </p>
            <h1 className={s.title}>Ce code ne correspond à aucune attestation</h1>
            <p className={s.hint}>
              Vérifie que tu as bien scanné le QR code du document. Si le document est de bonne foi, contacte
              son titulaire ou Maucode.
            </p>
          </>
        )}

        {r.state === "error" && (
          <>
            <p className={`${s.badge} ${s.warn}`}>
              <span aria-hidden="true">!</span> Vérification indisponible
            </p>
            <h1 className={s.title}>Impossible de vérifier pour le moment</h1>
            <p className={s.hint}>Réessaie dans quelques minutes.</p>
          </>
        )}

        <div className={s.notice} role="note">
          <strong>Rappel :</strong> cette attestation de réussite est délivrée par Maucode, organisme de
          formation privé en ligne. Elle n&apos;est <strong>pas un diplôme</strong> et{" "}
          <strong>n&apos;est pas validée ni reconnue par l&apos;État de Côte d&apos;Ivoire</strong>.
        </div>
      </div>
    </main>
  );
}