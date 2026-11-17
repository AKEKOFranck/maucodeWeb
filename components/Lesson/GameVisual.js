"use client";
/* Visuels « jeu » : terminal animé, extrait de code, mission avec aperçu en direct.
   Sécurité :
   - tout le texte est affiché par React (jamais interprété comme du HTML) ;
   - le code tapé par l'élève s'affiche dans un iframe sandbox="" (sans scripts, sans accès au site),
     avec une politique CSP qui interdit tout chargement externe ;
   - la validation d'une mission est un jeu d'entraînement côté navigateur : elle ne débloque rien.
     Le module n'est validé que par le quiz, corrigé par le serveur (/api/quiz). */
import { useEffect, useMemo, useRef, useState } from "react";
import s from "./gamevisual.module.css";
import { Icon } from "./icons";
import { useToast } from "@/components/Notifications/notifications";

const MAX_CODE = 2000;
const BASE_CSS =
  "body{font-family:Arial,Helvetica,sans-serif;margin:12px;color:#111;background:#fff;line-height:1.5}" +
  "table{border-collapse:collapse}th,td{border:1px solid #888;padding:4px 10px}";
const CSP = "default-src 'none'; style-src 'unsafe-inline'; img-src data:";
const BLOCKED_TAGS = /<\s*(script|iframe|object|embed|meta|link|base|frame|frameset|applet)/gi;

/* Même nettoyage que scripts/check-courses.mjs : un commentaire ne valide pas une mission */
const stripComments = (t) => t.replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "");

function buildDoc(v, code) {
  let css = BASE_CSS + (v.baseCss || "");
  let body;
  if (v.mode === "css") {
    body = v.baseHtml || "";
    css += code.replace(/</g, ""); // un « < » n'a rien à faire dans du CSS : impossible de fermer la balise style
  } else {
    body = code.replace(BLOCKED_TAGS, "&lt;$1");
  }
  return (
    `<!doctype html><html lang="fr"><head><meta charset="utf-8">` +
    `<meta http-equiv="Content-Security-Policy" content="${CSP}">` +
    `<style>${css}</style></head><body>${body}</body></html>`
  );
}

const MARK = { cmd: "$", ok: "✔", warn: "!", out: "" };

function Chrome({ title, children }) {
  return (
    <div className={s.bar}>
      <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
      <span className={s.title}>{title}</span>
      {children}
    </div>
  );
}

/* ---------- Terminal : les lignes s'écrivent une à une quand il devient visible ---------- */
function Terminal({ v }) {
  const ref = useRef(null);
  const total = v.lines.length;
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(total);
      return undefined;
    }
    let timer;
    const play = () => {
      let i = 0;
      setShown(0);
      const tick = () => {
        i += 1;
        setShown(i);
        if (i < total) timer = setTimeout(tick, 450);
      };
      timer = setTimeout(tick, 250);
    };
    // Les étapes cachées du module ne sont pas visibles : l'animation démarre quand l'élève arrive dessus
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        play();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [total, run]);

  return (
    <figure className={s.console} ref={ref}>
      <Chrome title={v.title}>
        <span className={s.xp}><Icon name="FaTerminal" /> console</span>
      </Chrome>
      <div className={s.body}>
        <p className="sr-only">{v.lines.map((l) => l.t).join(" ")}</p>
        <div aria-hidden="true">
          {v.lines.slice(0, shown).map((l, i) => (
            <div key={i} className={`${s.line} ${s[l.k]}`}>
              <span className={s.prompt}>{MARK[l.k]}</span>
              <span>{l.t}</span>
            </div>
          ))}
          <span className={s.cursor} />
        </div>
        <div className={s.actions}>
          <button type="button" className={s.btn} onClick={() => setRun((n) => n + 1)}>Rejouer</button>
        </div>
      </div>
      <figcaption className={s.cap}>{v.caption}</figcaption>
    </figure>
  );
}

/* ---------- Extrait de code (lecture seule) ---------- */
function Code({ v }) {
  return (
    <figure className={s.console}>
      <Chrome title={v.language === "css" ? "style.css" : "index.html"} />
      <div className={s.body}>
        <pre className={s.pre} tabIndex={0}><code>{v.code}</code></pre>
      </div>
      <figcaption className={s.cap}>{v.caption}</figcaption>
    </figure>
  );
}

/* ---------- Mission : on tape, on voit, on valide ---------- */
function Playground({ v }) {
  const toast = useToast();
  const [code, setCode] = useState(v.starter);
  const [doc, setDoc] = useState(() => buildDoc(v, v.starter));
  const [phone, setPhone] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [won, setWon] = useState(false);

  // L'aperçu se met à jour 250 ms après la dernière frappe
  useEffect(() => {
    const t = setTimeout(() => setDoc(buildDoc(v, code)), 250);
    return () => clearTimeout(t);
  }, [v, code]);

  const checks = useMemo(() => {
    const clean = stripComments(code);
    return v.checks.map((c) => {
      let ok = false;
      try { ok = new RegExp(c.re, "i").test(clean); } catch {}
      return { label: c.label, ok };
    });
  }, [v, code]);
  const done = checks.every((c) => c.ok);

  useEffect(() => {
    if (done && !won) {
      setWon(true);
      toast(`Mission réussie ! +${v.xp} XP`, { type: "success" });
    }
  }, [done, won, toast, v.xp]);

  const lang = v.mode === "css" ? "style.css" : "index.html";

  return (
    <figure className={s.console}>
      <Chrome title={`mission : ${lang}`}>
        <span className={s.xp}><Icon name="FaStar" /> {won ? `+${v.xp} XP` : `${v.xp} XP`}</span>
      </Chrome>
      <div className={s.body}>
        <p className={s.mission}><Icon name="FaGamepad" /> <strong>Mission :</strong> {v.mission}</p>

        {v.example && (
          <div>
            <p className={s.label}>Exemple</p>
            <pre className={s.pre} tabIndex={0}><code>{v.example}</code></pre>
          </div>
        )}

        <div className={s.workspace}>
          <div>
            <p className={s.label}>Ton code</p>
            <textarea
              className={s.editor}
              value={code}
              onChange={(e) => setCode(e.target.value.slice(0, MAX_CODE))}
              maxLength={MAX_CODE}
              rows={9}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label={`Éditeur de code (${lang})`}
            />
          </div>
          <div>
            <p className={s.label}>Résultat</p>
            <div className={s.frameWrap}>
              <iframe
                title="Aperçu du résultat"
                sandbox=""
                srcDoc={doc}
                referrerPolicy="no-referrer"
                className={phone ? s.framePhone : s.frame}
              />
            </div>
          </div>
        </div>

        <ul className={s.checks} aria-label="Objectifs de la mission">
          {checks.map((c) => (
            <li key={c.label} className={`${s.check} ${c.ok ? s.done : ""}`}>
              <span aria-hidden="true">{c.ok ? "✔" : "○"}</span>
              <span>{c.label}<span className="sr-only">{c.ok ? " : réussi" : " : pas encore"}</span></span>
            </li>
          ))}
        </ul>

        {done && (
          <p className={s.win} role="status">
            <Icon name="FaStar" /> Mission réussie ! +{v.xp} XP
          </p>
        )}

        <div className={s.actions}>
          <button type="button" className={s.btn} onClick={() => setCode(v.starter)}>Recommencer</button>
          {v.viewport && (
            <button type="button" className={s.btn} aria-pressed={phone} onClick={() => setPhone((p) => !p)}>
              <Icon name="FaMobileScreenButton" /> {phone ? "Téléphone" : "Ordinateur"}
            </button>
          )}
          <button type="button" className={s.btn} aria-expanded={showSolution} onClick={() => setShowSolution((x) => !x)}>
            {showSolution ? "Cacher la solution" : "Voir une solution"}
          </button>
        </div>

        {showSolution && <pre className={s.pre} tabIndex={0}><code>{v.solution}</code></pre>}
      </div>
      <figcaption className={s.cap}>{v.caption}</figcaption>
    </figure>
  );
}

export default function GameVisual({ v }) {
  if (v?.type === "terminal") return <Terminal v={v} />;
  if (v?.type === "code") return <Code v={v} />;
  if (v?.type === "playground") return <Playground v={v} />;
  return null;
}