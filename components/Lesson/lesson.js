"use client";

import { Fragment, useState } from "react";
import s from "./lesson.module.css";
import { Icon } from "./icons";
import { minToPass, useProgress, stateOf } from "@/lib/progress";
import { SESSION_PRICE } from "@/lib/config";
import { getAppCheckHeaders } from "@/lib/appCheck";
import { useToast } from "@/components/Notifications/notifications";

/* ---------- Illustrations ---------- */
export function Visual({ v }) {
  if (!v) return null;

  if (v.type === "scene") {
    return (
      <figure className={s.visual}>
        <div className={s.scene}>
          {v.items.map((it, i) => (
            <Fragment key={it.label}>
              <div className={s.sceneItem}>
                <span className={s.emoji}><Icon name={it.icon} /></span>
                <span>{it.label}</span>
              </div>
              {v.arrows !== false && i < v.items.length - 1 && (
                <span className={s.arrow}><Icon name="FaArrowRight" /></span>
              )}
            </Fragment>
          ))}
        </div>
        <figcaption>{v.caption}</figcaption>
      </figure>
    );
  }

  if (v.type === "grid") {
    const cols = Math.max(...v.rows.map((r) => r.length));
    const letters = Array.from({ length: cols }, (_, i) => String.fromCharCode(65 + i));
    return (
      <figure className={s.visual}>
        <div className={s.gridWrap}>
          <table className={s.grid}>
            <thead>
              <tr>
                <th />
                {letters.map((l) => <th key={l}>{l}</th>)}
              </tr>
            </thead>
            <tbody>
              {v.rows.map((row, r) => (
                <tr key={r}>
                  <th>{r + 1}</th>
                  {letters.map((l, c) => {
                    const id = `${l}${r + 1}`;
                    return (
                      <td key={id} className={v.highlight?.includes(id) ? s.hl : ""}>
                        {row[c] ?? ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <figcaption>{v.caption}</figcaption>
      </figure>
    );
  }

  if (v.type === "slide") {
    return (
      <figure className={s.visual}>
        <div className={s.slide}>
          <div className={s.slideTitle}>{v.title}</div>
          <ul>{v.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
        <figcaption>{v.caption}</figcaption>
      </figure>
    );
  }
  return null;
}

/* ---------- Quiz ----------
   Les bonnes réponses ne sont PAS dans le navigateur : on envoie les réponses au serveur,
   qui renvoie le score et la correction. */
export function Quiz({ questions, onSubmit }) {
  const toast = useToast();
  const [picked, setPicked] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const total = questions.length;
  const allPicked = Object.keys(picked).length === total;

  function choose(i, k) {
    if (result || busy) return;
    setPicked((p) => ({ ...p, [i]: k }));
  }

  async function submit() {
    if (!allPicked || busy) return;
    setBusy(true);
    setError("");
    try {
      const out = await onSubmit(questions.map((_, i) => picked[i]));
      setResult(out);
      toast(
        out.passed
          ? `Bravo ! ${out.score}/${out.total}, module validé`
          : `Quiz terminé : ${out.score}/${out.total}. Il faut au moins ${minToPass(out.total)} bonnes réponses, réessaie`,
        { type: out.passed ? "success" : "info" }
      );
    } catch (e) {
      setError(e.message || "La correction a échoué. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  function retry() {
    setPicked({});
    setResult(null);
    setError("");
  }

  return (
    <div className={s.quiz}>
      {questions.map((q, i) => {
        const chosen = picked[i];
        const r = result?.results?.[i];
        return (
          <div key={q.q} className={s.question}>
            <p className={s.qText}>{i + 1}. {q.q}</p>
            <div className={s.options}>
              {q.options.map((o, k) => {
                let cls = s.option;
                const isRight = r && r.answer !== undefined && k === r.answer;
                const isWrong = r && k === chosen && !r.correct;
                if (isRight) cls += ` ${s.right}`;
                else if (isWrong) cls += ` ${s.wrong}`;
                else if (!r && k === chosen) cls += ` ${s.selected}`;
                return (
                  <button
                    key={o}
                    type="button"
                    className={cls}
                    disabled={Boolean(result) || busy}
                    aria-pressed={k === chosen}
                    onClick={() => choose(i, k)}
                  >
                    <span>{o}</span>
                    {isRight && <Icon name="FaCircleCheck" />}
                    {isWrong && <Icon name="FaCircleXmark" />}
                  </button>
                );
              })}
            </div>
            {r && (
              <p className={s.why} role="status">
                {r.correct ? "Bravo ! " : "Pas tout à fait. "}
                {r.why}
              </p>
            )}
          </div>
        );
      })}

      {error && <p className={s.error} role="alert">{error}</p>}

      {!result && (
        <button type="button" className={s.primary} onClick={submit} disabled={!allPicked || busy} aria-busy={busy}>
          {busy ? "Correction…" : "Corriger mon quiz"}
        </button>
      )}

      {result && (
        <div className={s.score} role="status">
          Ton score : {result.score} sur {result.total}{" "}
          {result.passed ? (
            <><Icon name="FaTrophy" /> {result.score === result.total ? "Parfait !" : "Module validé !"}</>
          ) : (
            `Il faut au moins ${minToPass(result.total)} bonnes réponses : relis le cours et réessaie.`
          )}
          <button type="button" className={s.ghost} onClick={retry}>
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Exercice + corrigé ---------- */
export function Exercise({ exercise }) {
  const [show, setShow] = useState(false);
  return (
    <div className={s.exercise}>
      <h3>{exercise.title}</h3>
      <p className={s.exHint}>Fais-le sur ton ordinateur, étape par étape.</p>
      <ol className={s.steps}>
        {exercise.instructions.map((t) => <li key={t}>{t}</li>)}
      </ol>
      <button type="button" className={s.primary} onClick={() => setShow((x) => !x)}>
        {show ? "Cacher le corrigé" : "Voir le corrigé"}
      </button>
      {show && (
        <div className={s.correction}>
          <h4>Le corrigé</h4>
          <ol className={s.steps}>
            {exercise.correction.map((t) => <li key={t}>{t}</li>)}
          </ol>
          <Visual v={exercise.visual} />
        </div>
      )}
    </div>
  );
}

/* ---------- Avis / inscription ---------- */
const SEND_TIMEOUT_MS = 15000;

export function FeedbackForm({ course, module, fixedKind, withPhone, messageLabel = "Ton message", submitLabel = "Envoyer" }) {
  const toast = useToast();
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "loading") return; // évite les doubles envois

    const f = new FormData(e.currentTarget);
    setState("loading");
    setError("");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(await getAppCheckHeaders()) },
        body: JSON.stringify({ ...Object.fromEntries(f), course, module }),
        signal: controller.signal,
      });

      // La réponse n'est pas toujours du JSON (erreur du serveur, requête trop grosse...)
      let out = null;
      try {
        out = await res.json();
      } catch {}

      if (!res.ok) {
        throw new Error(
          typeof out?.error === "string" ? out.error : "L'envoi a échoué. Réessaie dans un instant."
        );
      }

      setState("sent");
      toast("Message envoyé, merci !", { type: "success" });
    } catch (err) {
      const message =
        err.name === "AbortError"
          ? "Le serveur met trop de temps à répondre. Réessaie dans un instant."
          : err instanceof TypeError
          ? "Pas de connexion internet. Vérifie ton réseau et réessaie."
          : err.message;
      setError(message);
      toast(message, { type: "error" });
      setState("idle");
    } finally {
      clearTimeout(timer);
    }
  }

  if (state === "sent") {
    return <p className={s.sent} role="status">Merci ! Ton message est bien parti. Nous te répondons vite.</p>;
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      {/* Piège anti-robot : invisible pour les humains, les robots le remplissent */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      >
        <label>
          Ne remplis pas ce champ
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <label>
        Ton prénom
        <input name="name" required maxLength={80} autoComplete="given-name" />
      </label>
      <label>
        Ton e-mail
        <input name="email" type="email" required maxLength={120} autoComplete="email" />
      </label>
      {fixedKind ? (
        <input type="hidden" name="kind" value={fixedKind} />
      ) : (
        <label>
          Je veux
          <select name="kind" defaultValue="Commentaire">
            <option>Commentaire</option>
            <option>M'inscrire à la formation</option>
          </select>
        </label>
      )}
      {withPhone && (
        <label>
          Téléphone ou WhatsApp
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} />
        </label>
      )}
      <label className={s.full}>
        {messageLabel}
        <textarea name="message" rows={4} required maxLength={1500} />
      </label>
      {error && <p className={s.error} role="alert">{error}</p>}
      <button type="submit" className={s.primary} disabled={state === "loading"} aria-busy={state === "loading"}>
        {state === "loading" ? "Envoi…" : submitLabel}
      </button>
    </form>
  );
}

/* ---------- Fin de formation + réservation d'une séance ---------- */
function Reserve({ course }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={s.primary} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "Fermer" : "Réserver une séance"}
      </button>
      {open && (
        <div className={s.reserveForm}>
          <FeedbackForm
            course={course}
            module="Réservation"
            fixedKind={`Réservation d'une séance (${SESSION_PRICE})`}
            withPhone
            messageLabel="Quand es-tu disponible, et que veux-tu approfondir ?"
            submitLabel="Envoyer ma demande"
          />
        </div>
      )}
    </>
  );
}

export function CourseEnd({ course, courseTitle, moduleSlugs, spaced }) {
  const { progress, ready } = useProgress();
  if (!ready) return null;
  if (!moduleSlugs.every((slug) => stateOf(progress, course, slug).done)) return null;
  return (
    <section className={`${s.end} ${spaced ? s.endSpaced : ""}`}>
      <Icon name="FaTrophy" className={s.endIcon} />
      <h3>Bravo, tu as terminé la formation {courseTitle} !</h3>
      <p>
        Tu connais maintenant les bases. Pour des formations plus poussées, tu peux réserver une
        séance avec un formateur à <strong>{SESSION_PRICE}</strong>.
      </p>
      <div className={s.endActions}>
        <Reserve course={courseTitle} />
      </div>
    </section>
  );
}