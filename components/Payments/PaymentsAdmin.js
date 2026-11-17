"use client";
/* Panneau admin : paiements Wave envoyés par les élèves, à vérifier puis valider ou refuser.
   Utilise /api/admin/payments (réservé aux administrateurs, vérifié côté serveur). */
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import s from "./paymentsadmin.module.css";

export default function PaymentsAdmin() {
  const { user } = useAuth();
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const call = useCallback(
    async (method, body) => {
      const token = await user.getIdToken();
      const res = await fetch("/api/admin/payments", {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      return data;
    },
    [user]
  );

  const load = useCallback(async () => {
    setError("");
    try {
      const data = await call("GET");
      setItems(data.items || []);
    } catch (e) {
      setError(e.message);
      setItems([]);
    }
  }, [call]);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  async function decide(id, action) {
    const label = action === "approve" ? "VALIDER ce paiement et débloquer le cours" : "REFUSER ce paiement";
    if (!window.confirm(`Tu confirmes : ${label} ?`)) return;
    setBusy(id);
    setError("");
    try {
      await call("POST", { requestId: id, action });
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy("");
    }
  }

  return (
    <section className={s.box} aria-labelledby="pay-title">
      <div className={s.head}>
        <h2 id="pay-title" className={s.title}>Paiements à valider</h2>
        <button type="button" className={s.ghost} onClick={load}>Actualiser</button>
      </div>
      <p className={s.help}>
        Avant de valider, ouvre Wave et vérifie : le montant reçu, l&apos;ID de transaction et la référence MC-… dans le motif.
      </p>

      {error && <p className={s.error} role="alert">{error}</p>}
      {items === null && <p className={s.help}>Chargement…</p>}
      {items && items.length === 0 && !error && <p className={s.help}>Aucun paiement en attente.</p>}

      <ul className={s.list}>
        {(items || []).map((p) => (
          <li key={p.id} className={s.item}>
            <dl className={s.info}>
              <div><dt>Élève</dt><dd>{p.email || "—"}</dd></div>
              <div><dt>Cours</dt><dd>{p.course}</dd></div>
              <div><dt>Montant</dt><dd>{p.amount} F</dd></div>
              <div><dt>Référence</dt><dd className={s.mono}>{p.reference}</dd></div>
              <div><dt>ID Wave</dt><dd className={s.mono}>{p.transactionId}</dd></div>
            </dl>
            <div className={s.actions}>
              <button type="button" className={s.ok} disabled={busy === p.id} onClick={() => decide(p.id, "approve")}>
                Valider
              </button>
              <button type="button" className={s.no} disabled={busy === p.id} onClick={() => decide(p.id, "reject")}>
                Refuser
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}