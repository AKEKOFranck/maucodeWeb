"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import styles from "./Attestation.module.css";

const MENTION_LEGALE =
  "Cette attestation de réussite est délivrée par Maucode, organisme de formation privé en ligne, à titre informatif. " +
  "Elle n'est ni un diplôme, ni un certificat ou un titre homologué, et n'est pas validée ni reconnue par l'État de Côte d'Ivoire. " +
  "Elle ne confère aucun grade, aucune équivalence académique ou professionnelle.";

function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function Attestation({ name, tool, reference, date, verifyUrl }) {
  // React échappe déjà le texte ; on limite en plus la longueur
  const safeName = String(name || "").trim().slice(0, 60);
  const safeTool = String(tool || "").slice(0, 80);
  const issued = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();

  return (
    <>
      <style>{`
        @page { size: A4 landscape; margin: 0; }
        @media print {
          body * { visibility: hidden !important; }
          [data-attestation], [data-attestation] * { visibility: visible !important; }
          [data-attestation] {
            position: fixed; inset: 0; width: 297mm; height: 210mm;
            margin: 0 !important; box-shadow: none !important; transform: none !important;
          }
        }
      `}</style>

      <section className={styles.sheet} data-attestation>
        <div className={styles.frame}>
          <header className={styles.header}>
            <Image
              src="/LogoMC.png"
              alt="Logo Maucode"
              width={80}
              height={80}
              className={styles.logo}
              priority
            />
            <p className={styles.brand}>MAUCODE</p>
            <p className={styles.tagline}>Formation en ligne · Abidjan, Côte d&apos;Ivoire</p>
          </header>

          <h1 className={styles.title}>Attestation de réussite</h1>
          <div className={styles.rule} />

          <p className={styles.lead}>Maucode atteste que</p>
          <p className={styles.name}>{safeName || "—"}</p>

          <p className={styles.body}>
            a suivi avec succès la formation <strong>{safeTool}</strong> et validé les évaluations (quiz)
            associées. Le titulaire a ainsi acquis les bases nécessaires à la maîtrise de l&apos;outil{" "}
            <strong>{safeTool}</strong>.
          </p>

          <div className={styles.meta}>
            <div>
              <span className={styles.label}>Délivrée à</span>
              <span>Abidjan, le {formatDate(issued)}</span>
            </div>

            <div className={styles.signature}>
              <span className={styles.label}>Pour Maucode</span>
              <span className={styles.signLine} />
              <span>Akeko Maurice</span>
            </div>

            <div className={styles.verify}>
              {verifyUrl && (
                <>
                  <div className={styles.qrBox}>
                    <QRCodeSVG value={verifyUrl} size={256} level="M" marginSize={0} className={styles.qr} />
                  </div>
                  <span className={styles.label}>Scanner pour vérifier</span>
                </>
              )}
              <span className={styles.label}>Référence</span>
              <span className={styles.ref}>{reference}</span>
            </div>
          </div>

          <p className={styles.legal}>{MENTION_LEGALE}</p>
        </div>
      </section>
    </>
  );
}