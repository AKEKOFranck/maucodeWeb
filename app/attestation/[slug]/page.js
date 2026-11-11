"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { FiAward, FiLock } from "react-icons/fi";
import Attestation from "@/components/Attestation/Attestation";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { isValidSlug, toolLabel, cleanName, maskName, verifyUrlFor } from "@/lib/attestation";
import s from "./page.module.css";

export default function AttestationPage() {
  const { slug } = useParams();
  const valid = isValidSlug(slug);

  const { user, loading: authLoading } = useAuth();

  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [data, setData] = useState(null); // { eligible, attestation, courseTitle }
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  /* Appel de l'API avec le jeton Firebase de l'utilisateur */
  const callApi = useCallback(
    async (method, body) => {
      const idToken = await user.getIdToken();
      const url = method === "GET" ? `/api/attestation?slug=${encodeURIComponent(slug)}` : "/api/attestation";
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${idToken}`,
          ...(body ? { "Content-Type": "application/json" } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
      });
      const json = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, json };
    },
    [user, slug]
  );

  /* Au chargement : attestation déjà émise ? apprenant éligible ?
     Quand l'utilisateur se déconnecte ou change de compte, on efface tout ce qui
     appartenait à la personne précédente (ordinateurs partagés, cybercafés). */
  useEffect(() => {
    if (!valid || authLoading) return;

    if (!user) {
      setData(null);
      setName("");
      setAgreed(false);
      setError("");
      setStatus("loading");
      return;
    }

    let cancelled = false;
    setData(null);
    setStatus("loading");

    (async () => {
      try {
        const r = await callApi("GET");
        if (cancelled) return;
        if (!r.ok) {
          setStatus("error");
          return;
        }
        setData(r.json);
        setStatus("ready");
        if (user.displayName) setName((prev) => prev || user.displayName.slice(0, 60));
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [valid, authLoading, user, callApi]);

  const generate = async () => {
    setError("");
    const clean = cleanName(name);
    if (!clean) {
      setError("Entre ton prénom et ton nom (lettres, espaces, tirets et apostrophes uniquement).");
      return;
    }
    setBusy(true);
    try {
      const r = await callApi("POST", { slug, fullName: clean });
      if (r.ok && r.json.attestation) {
        setData((d) => ({ ...d, eligible: true, attestation: r.json.attestation }));
      } else if (r.json?.error === "not_completed") {
        setError("Termine d'abord tous les modules de la formation.");
      } else {
        setError("Impossible de générer l'attestation pour le moment. Réessaie dans un instant.");
      }
    } catch {
      setError("Connexion impossible. Vérifie ton réseau et réessaie.");
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible */
    }
  };

  if (!valid) notFound();

  if (authLoading || (user && status === "loading")) {
    return (
      <main className={s.wrap}>
        <p className={s.msg} role="status">
          Chargement…
        </p>
      </main>
    );
  }

  if (!user) {
    const back = encodeURIComponent(`/attestation/${slug}`);
    return (
      <main className={s.wrap}>
        <div className={`glass ${s.box}`}>
          <FiLock className={s.boxIcon} aria-hidden="true" />
          <h1>Connecte-toi</h1>
          <p>Connecte-toi avec ton compte pour accéder à ton attestation de réussite.</p>
          <Link href={`/login?next=${back}`} className={s.btn}>
            Me connecter
          </Link>
        </div>
      </main>
    );
  }

  if (status === "error" || !data) {
    return (
      <main className={s.wrap}>
        <div className={`glass ${s.box}`}>
          <h1>Un problème est survenu</h1>
          <p>Impossible de charger ton attestation pour le moment. Réessaie plus tard.</p>
          <Link href={`/works/${slug}`} className={s.btn}>
            Retour à la formation
          </Link>
        </div>
      </main>
    );
  }

  const att = data.attestation;
  const tool = toolLabel(slug, att?.courseTitle || data.courseTitle);

  /* Pas encore éligible */
  if (!att && !data.eligible) {
    return (
      <main className={s.wrap}>
        <div className={`glass ${s.box}`}>
          <h1>Pas encore disponible</h1>
          <p>
            L&apos;attestation est disponible quand tous les modules de la formation {tool} sont validés
            (quiz réussis).
          </p>
          <Link href={`/works/${slug}`} className={s.btn}>
            Retour à la formation
          </Link>
        </div>
      </main>
    );
  }

  /* Éligible mais pas encore générée : confirmation du nom */
  if (!att) {
    const clean = cleanName(name);
    return (
      <main className={s.wrap}>
        <div className={s.controls}>
          <h1 className={s.title}>
            <FiAward aria-hidden="true" /> Génère ton attestation {tool}
          </h1>

          <label htmlFor="nom" className={s.label}>
            Ton prénom et ton nom, tels qu&apos;ils doivent apparaître
          </label>
          <input
            id="nom"
            value={name}
            maxLength={60}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            className={s.input}
          />

          <p className={s.notice}>
            Une fois générée, l&apos;attestation est <strong>enregistrée et ne peut plus être modifiée</strong>.
            Elle est délivrée par Maucode, organisme de formation privé : ce n&apos;est{" "}
            <strong>pas un diplôme</strong> et elle <strong>n&apos;est pas validée par l&apos;État</strong>.
          </p>

          <label className={s.consent}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>
              Je confirme l&apos;exactitude de mon nom et j&apos;accepte qu&apos;une attestation vérifiable en ligne soit
              enregistrée. Seul mon nom abrégé sera visible publiquement
              {clean ? <> (« {maskName(clean)} »)</> : null}, avec la formation et la date.
            </span>
          </label>

          {error && (
            <p className={s.error} role="alert">
              {error}
            </p>
          )}

          <button type="button" className={s.btn} disabled={!clean || !agreed || busy} onClick={generate}>
            {busy ? "Génération…" : "Générer mon attestation"}
          </button>
        </div>
      </main>
    );
  }

  /* Attestation émise */
  const verifyUrl = verifyUrlFor(att.token);

  return (
    <main className={s.wrap}>
      <div className={s.controls}>
        <h1 className={s.title}>
          <FiAward aria-hidden="true" /> Ton attestation de réussite {tool}
        </h1>

        <div className={s.row}>
          <button type="button" className={s.btn} onClick={() => window.print()}>
            Télécharger en PDF / Imprimer
          </button>
          <button type="button" className={s.btnGhost} onClick={() => copyLink(verifyUrl)}>
            {copied ? "Lien copié ✓" : "Copier le lien de vérification"}
          </button>
        </div>

        <p className={s.tip}>
          Dans la fenêtre d&apos;impression : « Enregistrer au format PDF », format A4, paysage, décoche
          « En-têtes et pieds de page » et coche « Graphiques d&apos;arrière-plan ».
        </p>
        <p className={s.notice}>
          Rappel : attestation délivrée par Maucode, organisme de formation privé. Elle n&apos;est{" "}
          <strong>pas un diplôme</strong> et <strong>n&apos;est pas validée par l&apos;État</strong>.
        </p>
      </div>

      <div className={s.preview}>
        <Attestation
          name={att.fullName}
          tool={tool}
          reference={att.reference}
          date={new Date(att.issuedAt)}
          verifyUrl={verifyUrl}
        />
      </div>
    </main>
  );
}