"use client";

import { useRef, useState } from "react";
import styles from "./contactform.module.css";

const MAUCODE_EMAIL = "fa0055970@gmail.com";

const BESOINS = [
  "Formation Office (Word, Excel, PowerPoint)",
  "Création de site web",
  "Autre demande",
];

/**
 * Bouton + petit formulaire qui ouvre un brouillon Gmail
 * adressé à Maucode.
 *
 * Props :
 * - label          : texte du bouton
 * - variant        : "dark" (par défaut) ou "primary"
 * - defaultBesoin  : besoin présélectionné
 */
export default function ContactForm({
  label = "Écrire à Maucode",
  variant = "dark",
  defaultBesoin = BESOINS[0],
}) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    besoin: defaultBesoin,
    message: "",
  });

  const ouvrir = () => dialogRef.current?.showModal();
  const fermer = () => dialogRef.current?.close();

  const changer = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const envoyer = (e) => {
    e.preventDefault();

    const sujet = `Maucode - ${form.besoin} - ${form.nom}`;
    const corps = [
      `Nom : ${form.nom}`,
      `Email : ${form.email}`,
      `Besoin : ${form.besoin}`,
      "",
      form.message,
    ].join("\n");

    const url =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(MAUCODE_EMAIL)}` +
      `&su=${encodeURIComponent(sujet)}` +
      `&body=${encodeURIComponent(corps)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    fermer();
  };

  return (
    <>
      <button
        type="button"
        className={variant === "primary" ? styles.btnPrimary : styles.btnDark}
        onClick={ouvrir}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={(e) => e.target === dialogRef.current && fermer()}
      >
        <form className={styles.form} onSubmit={envoyer}>
          <div className={styles.formHead}>
            <h3>Votre demande</h3>
            <button
              type="button"
              className={styles.close}
              onClick={fermer}
              aria-label="Fermer le formulaire"
            >
              ✕
            </button>
          </div>

          <label>
            Nom
            <input
              name="nom"
              value={form.nom}
              onChange={changer}
              required
              autoComplete="name"
            />
          </label>

          <label>
            Votre email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={changer}
              required
              autoComplete="email"
            />
          </label>

          <label>
            Votre besoin
            <select name="besoin" value={form.besoin} onChange={changer}>
              {BESOINS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={changer}
              placeholder="Décrivez votre besoin"
              required
            />
          </label>

          <button type="submit" className={styles.btnPrimary}>
            Envoyer via Gmail
          </button>
        </form>
      </dialog>
    </>
  );
}