"use client";

import { useCallback, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { app, db } from "@/lib/firebase";
import { getAppCheckHeaders } from "@/lib/appCheck";
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

const PUSH_BODY_MAX = 300;

const fmt = (ms) =>
  ms ? new Date(ms).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "";

/* Envoie la notification à tous les abonnés (route réservée à l'admin) */
async function sendPush({ title, body, href, external }) {
  const user = getAuth(app).currentUser;
  if (!user) throw new Error("Non connecté.");
  const token = await user.getIdToken();

  const text = body.length > PUSH_BODY_MAX ? body.slice(0, PUSH_BODY_MAX - 1).trimEnd() + "…" : body;
  const url = href && !external ? href : "/";

  const res = await fetch("/api/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(await getAppCheckHeaders()),
    },
    body: JSON.stringify({ title, body: text, url }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "Envoi impossible.");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data; // { ok, sent, removed, failed }
}

export default function AnnouncementsAdmin() {
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [alsoPush, setAlsoPush] = useState(false);
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
    setAlsoPush(false);
  }

  async function submit(e) {
    e.preventDefault();
    if (busy || !valid) return;
    setBusy(true);
    setMessage(null);

    const wasEditing = Boolean(editingId);
    const wantPush = alsoPush && !wasEditing;
    const snapshot = { title, body, href: link.href, external: link.external };

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
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text:
          err.code === "permission-denied"
            ? "Refusé par Firestore : vérifie que tu es connecté avec le compte administrateur et que les règles sont publiées."
            : "Enregistrement impossible. Réessaie dans un instant.",
      });
      setBusy(false);
      return;
    }

    // L'annonce est enregistrée. Notification éventuelle :
    let text = wasEditing ? "Annonce modifiée." : "Annonce publiée.";
    let type = "ok";

    if (wantPush) {
      try {
        const r = await sendPush(snapshot);
        text += ` Notification envoyée à ${r.sent} appareil(s)`;
        if (r.removed) text += `, ${r.removed} abonnement(s) périmé(s) supprimé(s)`;
        if (r.failed) text += `, ${r.failed} échec(s)`;
        text += ".";
      } catch (err) {
        console.error(err);
        type = "error";
        text +=
          err.status === 403
            ? " Notification refusée (403) : compte non administrateur ou App Check."
            : err.status === 429
              ? " Notification non envoyée : trop d'envois, réessaie dans quelques minutes."
              : " Notification non envoyée : " + (err.message || "erreur") + ".";
      }
    }

    setMessage({ type, text });
    await load();
    setBusy(false);
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
    setAlsoPush(false);
    setForm({ title: a.title, body: a.body, href: a.href });
    setMessage(null);
  }

  return (
    <section className={s.card}>
      <h2 className={s.title}>Annonces</h2>
      <p className={s.lead}>
        Elles s&apos;affichent dans la cloche de la barre de navigation, pour tous les visiteurs.
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

        {!editingId && (
          <label className={s.check}>
            <input
              type="checkbox"
              checked={alsoPush}
              onChange={(e) => setAlsoPush(e.target.checked)}
              disabled={busy}
            />
            <span>
              Envoyer aussi en notification à tous les abonnés
              {body.length > 300 && " (message coupé à 300 caractères)"}
              {link.ok && link.external && " (le lien WhatsApp n'est pas repris : la notification ouvre l'accueil)"}
            </span>
          </label>
        )}

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