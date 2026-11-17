"use client";

import { useCallback, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { PAID_COURSES, WAVE_NUMBER } from "@/lib/paymentConfig";
import s from "./PayBox.module.css";

async function api(method, url, body) {
  const user = auth.currentUser;
  if (!user) throw new Error("Connecte-toi d'abord.");
  const token = await user.getIdToken();
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Une erreur est survenue.");
  return data;
}

export default function PayBox({ courseSlug, courseTitle, onUnlocked }) {
  const price = PAID_COURSES[courseSlug]?.price ?? 5000;
  const [info, setInfo] = useState(null); // { entitled, request, rejected }
  const [tx, setTx] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setMsg("");
    try {
      const d = await api("GET", `/api/payment/request?course=${encodeURIComponent(courseSlug)}`);
      setInfo(d);
      if (d.entitled) onUnlocked?.();
    } catch (e) {
      setMsg(e.message);
    }
  }, [courseSlug, onUnlocked]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const run = async (fn) => {
    setBusy(true);
    setMsg("");
    try {
      await fn();
    } catch (e) {
      setMsg(e.message);
    }
    setBusy(false);
  };

  const req = info?.request;
  const fmt = (n) => n.toLocaleString("fr-FR");

  return (
    <section className={`glass ${s.box}`} aria-labelledby="pay-titre">
      <h2 id="pay-titre" className={s.title}>
        Débloque le cours complet : {fmt(price)} F
      </h2>
      <p>
        Le premier module est gratuit, tu l’as déjà essayé. Pour la suite de la formation{" "}
        <strong>{courseTitle}</strong> : toutes les leçons, les quiz corrigés, tes trophées et l’attestation de
        réussite. Un seul paiement, pas d’abonnement.
      </p>

      {!info && !msg && <p className={s.muted}>Chargement…</p>}

      {info && !req && (
        <>
          {info.rejected && (
            <p className={s.err} role="alert">
              Ton dernier paiement n’a pas pu être vérifié. Tu peux refaire une demande ci-dessous.
            </p>
          )}
          <button
            type="button"
            className={s.btn}
            disabled={busy}
            onClick={() => run(async () => { await api("POST", "/api/payment/request", { courseSlug }); await refresh(); })}
          >
            Je débloque le cours
          </button>
        </>
      )}

      {req?.status === "pending" && (
        <>
          <ol className={s.steps}>
            <li>
              Ouvre Wave et envoie <strong>{fmt(req.amount)} F</strong> au <strong>{WAVE_NUMBER}</strong>.
            </li>
            <li>
              Dans le motif du paiement, écris cette référence : <code>{req.reference}</code>
            </li>
            <li>Colle ci-dessous l’ID de ta transaction Wave (il est sur ton reçu).</li>
          </ol>
          <label htmlFor="wave-tx" className={s.label}>ID de transaction Wave</label>
          <input
            id="wave-tx"
            className={s.input}
            value={tx}
            onChange={(e) => setTx(e.target.value)}
            placeholder="Ex. T_ABC123XYZ"
            maxLength={40}
            autoComplete="off"
          />
          <button
            type="button"
            className={s.btn}
            disabled={busy || tx.trim().length < 8}
            onClick={() => run(async () => { await api("POST", "/api/payment/submit", { requestId: req.id, transactionId: tx }); await refresh(); })}
          >
            J’ai payé, envoyer
          </button>
        </>
      )}

      {req?.status === "submitted" && (
        <>
          <p className={s.ok} role="status">
            Merci ! Ton paiement est bien reçu (référence <code>{req.reference}</code>). Nous le vérifions et ton
            accès s’ouvre dès validation. Si notre service client est momentanément indisponible, la validation
            peut prendre un peu plus de temps : pas d’inquiétude, ta demande est enregistrée. Garde ton reçu Wave.
          </p>
          <button type="button" className={s.btnGhost} disabled={busy} onClick={() => run(refresh)}>
            Vérifier mon accès
          </button>
        </>
      )}

      {msg && (
        <p className={s.err} role="alert">
          {msg}
        </p>
      )}
    </section>
  );
}