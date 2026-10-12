"use client";

import { Fragment, useState } from "react";
import s from "./lesson.module.css";

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
                <span className={s.emoji} aria-hidden="true">{it.emoji}</span>
                <span>{it.label}</span>
              </div>
              {v.arrows !== false && i < v.items.length - 1 && (
                <span className={s.arrow} aria-hidden="true">➜</span>
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

/* ---------- Quiz ---------- */
export function Quiz({ questions }) {
  const [picked, setPicked] = useState({});
  const done = Object.keys(picked).length === questions.length;
  const score = questions.filter((q, i) => picked[i] === q.answer).length;

  return (
    <div className={s.quiz}>
      {questions.map((q, i) => {
        const chosen = picked[i];
        const answered = chosen !== undefined;
        return (
          <div key={q.q} className={s.question}>
            <p className={s.qText}>{i + 1}. {q.q}</p>
            <div className={s.options}>
              {q.options.map((o, k) => {
                let cls = s.option;
                if (answered && k === q.answer) cls += ` ${s.right}`;
                else if (answered && k === chosen) cls += ` ${s.wrong}`;
                return (
                  <button
                    key={o}
                    type="button"
                    className={cls}
                    disabled={answered}
                    onClick={() => setPicked((p) => ({ ...p, [i]: k }))}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className={s.why} role="status">
                {chosen === q.answer ? "Bravo ! " : "Pas tout à fait. "}
                {q.why}
              </p>
            )}
          </div>
        );
      })}
      {done && (
        <div className={s.score} role="status">
          Ton score : {score} sur {questions.length}{" "}
          {score === questions.length ? "🏆 Parfait !" : "💪 Relis le cours et réessaie."}
          <button type="button" className={s.ghost} onClick={() => setPicked({})}>
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
export function FeedbackForm({ course, module }) {
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setState("loading");
    setError("");
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(f), course, module }),
      });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error || "Erreur");
      setState("sent");
    } catch (err) {
      setError(err.message);
      setState("idle");
    }
  }

  if (state === "sent") {
    return <p className={s.sent} role="status">Merci ! Ton message est bien parti. Nous te répondons vite.</p>;
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <label>
        Ton prénom
        <input name="name" required maxLength={80} />
      </label>
      <label>
        Ton e-mail
        <input name="email" type="email" required maxLength={120} />
      </label>
      <label>
        Je veux
        <select name="kind" defaultValue="Commentaire">
          <option>Commentaire</option>
          <option>M'inscrire à la formation</option>
        </select>
      </label>
      <label className={s.full}>
        Ton message
        <textarea name="message" rows={4} required maxLength={1500} />
      </label>
      {error && <p className={s.error} role="alert">{error}</p>}
      <button type="submit" className={s.primary} disabled={state === "loading"}>
        {state === "loading" ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}