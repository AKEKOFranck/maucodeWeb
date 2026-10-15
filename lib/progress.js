"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "maucode:progress:v2";

/* Part de bonnes réponses pour valider un module (0.6 = 60 %). 3 questions -> 2 bonnes réponses. */
const PASS_RATIO = 0.6;

/* Nombre minimum de bonnes réponses pour un quiz de `total` questions */
export const minToPass = (total) => Math.ceil(total * PASS_RATIO);

/* Le score suffit-il pour valider ? */
export const passed = (score, total) => score >= minToPass(total);

export const keyOf = (course, slug) => `${course}/${slug}`;

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
};
const save = (v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {}
};

/* Permet à tous les composants de se mettre à jour en même temps */
const listeners = new Set();
const notify = () => listeners.forEach((f) => f());

/*
  const { progress, ready, record, reset } = useProgress();
  ready  : false tant que le navigateur n'a pas lu la sauvegarde (évite les décalages d'affichage)
  record : record(course, moduleSlug, score, total)
*/
export function useProgress() {
  const [progress, setProgress] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setProgress(load());
      setReady(true);
    };
    sync();
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const record = useCallback((course, slug, score, total) => {
    const all = load();
    const k = keyOf(course, slug);
    const old = all[k];
    const better = !old || score > (old.score ?? 0);
    all[k] = {
      score: better ? score : old.score,
      total: better ? total : old.total,
      done: Boolean(old?.done) || passed(score, total), // une fois validé, reste validé
      at: Date.now(),
    };
    save(all);
    notify();
  }, []);

  const reset = useCallback(() => {
    save({});
    notify();
  }, []);

  return { progress, ready, record, reset };
}

/* Résultat d'un module : { done, score, total } */
export function stateOf(progress, course, slug) {
  return progress?.[keyOf(course, slug)] ?? { done: false, score: 0, total: 0 };
}

/* Un module est accessible si c'est le premier, ou si le précédent est validé */
export function isUnlocked(progress, course, moduleSlugs, index) {
  if (index === 0) return true;
  return stateOf(progress, course, moduleSlugs[index - 1]).done;
}