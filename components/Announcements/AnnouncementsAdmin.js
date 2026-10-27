"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LIMITS, checkHref, fetchAnnouncements, invalidateCache } from "@/lib/announcements";
import s from "./AnnouncementsAdmin.module.css";

const FIRST = {
  title: "Du nouveau arrive",
  body:
    "La chaîne WhatsApp MauCode ouvre bientôt : tu y recevras les nouveautés en premier. " +
    "Chaque module va aussi recevoir au moins 2 nouveaux chapitres.",
  href: "",
};

const EMPTY = { title: "", body: "", href: "" };

const fmt = (ms) =>
  ms ? new Date(ms).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "";

export default function AnnouncementsAdmin() {
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const load = useCallback(async () => {
    try {
      setItems(await fetchAnnouncements({ cache: false, max: 50, strict: true }));
    } catch (e) {
      setItems([]);
      setMessage({ type: "error", text: "Impossible de lire les annonces (" + (e.code || "erreur") + ")." });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const title = form.title.trim();
  const body = form.body.trim();
  const link = checkHref(form.href);
  const valid =
    title.length > 0 &&
    title.length <= LIMITS.title &&
    body.length > 0 &&
    body.length <= LIMITS.body &&
    link.ok;

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  function reset() {
    setForm(EMPTY);
    setEditingId(null);
  }

  async function submit(e) {
    e.preventDefault();
    if (busy || !valid) return;
    setBusy(true);
    setMessage(null);
    try {
      if (editingId) {
        await updateDoc(doc(db, "announcements", editingId), {
          title,
          body,
          href: link.href ? link.href : deleteField(),
        });
      } else {
        const data = { title, body, createdAt: serverTimestamp() };
        if (link.href) data.href = link.href;
        await addDoc(collection(db, "announcements"), data);
      }
      invalidateCache();
      reset();
      setMessage({ type: "ok", text: editingId ? "Annonce modifiée." : "Annonce publiée." });
      await load();
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text:
          err.code === "permission-denied"
            ? "Refusé par Firestore : vérifie que tu es connecté avec le compte administrateur et que les règles sont publiées."
            : "Enregistrement impossible. Réessaie dans un instant.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (busy || !window.confirm("Supprimer cette annonce ?")) return;
    setBusy(true);
    setMessage(null);
    try {
      await deleteDoc(doc(db, "announcements", id));
      invalidateCache();
      if (editingId === id) reset();
      setMessage({ type: "ok", text: "Annonce supprimée." });
      await load();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Suppression impossible." });
    } finally {
      setBusy(false);
    }
  }

  function startEdit(a) {
    setEditingId(a.id);
    setForm({ title: a.title, body: a.body, href: a.href });
    setMessage(null);
  }

  return (
    <section className={s.card}>
      <h2 className={s.title}>Annonces</h2>
      <p className={s.lead}>
        Elles s'affichent dans la cloche de la barre de navigation, pour tous les visiteurs.
        Texte simple uniquement. Lien autorisé : une page du site (par exemple /works) ou une
        adresse WhatsApp (whatsapp.com, chat.whatsapp.com, wa.me).
      </p>

      <form className={s.form} onSubmit={submit}>
        <label>
          Titre
          <input name="title" value={form.title} onChange={change} maxLength={LIMITS.title} required />
          <span className={s.counter}>{form.title.length}/{LIMITS.title}</span>
        </label>

        <label>
          Message
          <textarea name="body" rows={4} value={form.body} onChange={change} maxLength={LIMITS.body} required />
          <span className={s.counter}>{form.body.length}/{LIMITS.body}</span>
        </label>

        <label>
          Lien (facultatif)
          <input
            name="href"
            value={form.href}
            onChange={change}
            maxLength={LIMITS.href}
            placeholder="/works ou https://whatsapp.com/channel/..."
            autoComplete="off"
          />
          {!link.ok && (
            <span className={s.error}>
              Lien refusé : utilise une page du site ou une adresse WhatsApp officielle.
            </span>
          )}
        </label>

        {(title || body) && (
          <div className={s.preview} aria-label="Aperçu">
            <strong>{title || "Titre"}</strong>
            <p>{body || "Message"}</p>
          </div>
        )}

        {message && (
          <p className={message.type === "ok" ? s.ok : s.error} role="status">
            {message.text}
          </p>
        )}

        <div className={s.actions}>
          <button type="submit" className={s.primary} disabled={busy || !valid}>
            {busy ? "Envoi…" : editingId ? "Enregistrer les modifications" : "Publier l'annonce"}
          </button>
          {editingId && (
            <button type="button" className={s.ghost} onClick={reset} disabled={busy}>
              Annuler la modification
            </button>
          )}
          {!editingId && !form.title && !form.body && (
            <button type="button" className={s.ghost} onClick={() => setForm(FIRST)}>
              Remplir la première annonce
            </button>
          )}
        </div>
      </form>

      <div className={s.list}>
        {items === null && <p className={s.lead}>Chargement…</p>}
        {items?.length === 0 && <p className={s.lead}>Aucune annonce publiée.</p>}
        {items?.map((a) => (
          <article key={a.id} className={s.row}>
            <div className={s.rowHead}>
              <strong>{a.title}</strong>
              <time>{fmt(a.createdAt)}</time>
            </div>
            <p className={s.rowText}>{a.body}</p>
            {a.href && <p className={s.rowLink}>Lien : {a.href}</p>}
            <div className={s.actions}>
              <button type="button" className={s.ghost} onClick={() => startEdit(a)} disabled={busy}>
                Modifier
              </button>
              <button type="button" className={s.danger} onClick={() => remove(a.id)} disabled={busy}>
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}