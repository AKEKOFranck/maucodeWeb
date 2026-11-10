"use client";

import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const KEY = "maucode:progress:v3";

/* Part de bonnes réponses pour valider un module (0.6 = 60 %). 3 questions -> 2 bonnes réponses.
   Le serveur applique la même règle (lib/quizServer.js). Ici, c'est seulement pour l'affichage. */
const PASS_RATIO = 0.6;

export const minToPass = (total) => Math.ceil(total * PASS_RATIO);
export const passed = (score, total) => score >= minToPass(total);
export const keyOf = (course, slug) => `${course}/${slug}`;

/* ---------- Stockage du navigateur (visiteurs non connectés) ----------
   On garde le résultat ET les réponses : à la connexion, le serveur corrige ces réponses.
   Un score écrit à la main dans le navigateur ne vaut donc rien. */
const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
};
const save = (v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {}
};

/* ---------- État partagé par tous les composants ---------- */
let state = { progress: {}, ready: false, uid: null };
const listeners = new Set();
const emit = () => listeners.forEach((f) => f());
const setState = (patch) => {
  state = { ...state, ...patch };
  emit();
};

const docId = (uid, course, slug) => `${uid}_${course}_${slug}`;

/* ---------- Appel au serveur : c'est lui qui corrige et enregistre ---------- */
const ERRORS = {
  401: "Connecte-toi pour continuer ce cours.",
  403: "Ce module est verrouillé : réussis d'abord le précédent.",
  429: "Trop d'essais pour le moment. Patiente quelques minutes, puis réessaie.",
};

async function grade(course, slug, answers) {
  const headers = { "Content-Type": "application/json" };
  const user = auth.currentUser;
  if (user) headers.Authorization = `Bearer ${await user.getIdToken()}`;

  let res;
  try {
    res = await fetch("/api/quiz", {
      method: "POST",
      headers,
      body: JSON.stringify({ course, module: slug, answers }),
    });
  } catch {
    throw new Error("Pas de connexion internet. Vérifie ton réseau et réessaie.");
  }

  let out = null;
  try {
    out = await res.json();
  } catch {}

  if (!res.ok || !out) {
    throw Object.assign(new Error(ERRORS[res.status] || "La correction a échoué. Réessaie dans un instant."), {
      status: res.status,
    });
  }
  return out;
}

/* À la connexion : le serveur corrige les réponses gardées dans le navigateur */
async function migrateLocal() {
  const local = load();
  const remaining = {};

  for (const [k, v] of Object.entries(local)) {
    const [course, slug] = k.split("/");
    if (!course || !slug || !Array.isArray(v?.answers)) continue; // ancien format : non vérifiable, ignoré
    try {
      await grade(course, slug, v.answers);
    } catch (e) {
      console.error("Migration de la progression impossible :", e);
      remaining[k] = v; // on réessaiera à la prochaine connexion
    }
  }
  save(remaining);
}

let started = false;
let unsub = null;

function start() {
  if (started) return;
  started = true;

  window.addEventListener("storage", () => {
    if (state.ready && !state.uid) setState({ progress: load() });
  });

  onAuthStateChanged(auth, async (user) => {
    if (unsub) {
      unsub();
      unsub = null;
    }

    if (!user) {
      setState({ progress: load(), ready: true, uid: null });
      return;
    }

    const uid = user.uid;
    setState({ progress: {}, ready: false, uid });
    await migrateLocal();
    if (state.uid !== uid) return; // déconnecté ou changé de compte entre-temps

    unsub = onSnapshot(
      query(collection(db, "progress"), where("uid", "==", uid)),
      (snap) => {
        const p = {};
        snap.forEach((d) => {
          const x = d.data();
          if (!x.courseSlug || !x.moduleSlug || typeof x.done !== "boolean") return;
          p[keyOf(x.courseSlug, x.moduleSlug)] = {
            score: x.score ?? 0,
            total: x.total ?? 0,
            done: x.done,
            at: x.updatedAt?.toMillis?.() ?? 0,
          };
        });
        setState({ progress: p, ready: true });
      },
      (err) => {
        console.error(err);
        setState({ ready: true });
      }
    );
  });
}

/*
  const { progress, ready, submitQuiz, reset } = useProgress();
  ready      : false tant que la progression n'est pas chargée
  submitQuiz : submitQuiz(course, moduleSlug, answers) -> résultat du serveur
               { score, total, passed, results, best }
*/
export function useProgress() {
  const [snap, setSnap] = useState({ progress: {}, ready: false });

  useEffect(() => {
    start();
    const sync = () => setSnap({ progress: state.progress, ready: state.ready });
    listeners.add(sync);
    sync();
    return () => listeners.delete(sync);
  }, []);

  const submitQuiz = useCallback(async (course, slug, answers) => {
    const out = await grade(course, slug, answers);
    const k = keyOf(course, slug);

    if (state.uid) {
      // Le serveur a déjà enregistré : on affiche tout de suite, l'écouteur Firestore confirmera
      const b = out.best;
      setState({ progress: { ...state.progress, [k]: { score: b.score, total: b.total, done: b.done, at: Date.now() } } });
      return out;
    }

    // Visiteur sans compte : résultat + réponses gardés dans le navigateur
    const all = load();
    const old = all[k];
    const better =
      !old ||
      (out.passed && !old.done) ||
      (out.passed === Boolean(old.done) && out.score * (old.total || 1) > (old.score || 0) * out.total);

    all[k] = better
      ? { score: out.score, total: out.total, done: Boolean(old?.done) || out.passed, answers, at: Date.now() }
      : { ...old, done: Boolean(old.done) || out.passed };
    save(all);
    setState({ progress: all });
    return out;
  }, []);

  const reset = useCallback(async () => {
    const uid = state.uid;
    if (!uid) {
      save({});
      setState({ progress: {} });
      return;
    }
    const keys = Object.keys(state.progress);
    setState({ progress: {} });
    await Promise.all(
      keys.map((k) => {
        const [c, s] = k.split("/");
        return deleteDoc(doc(db, "progress", docId(uid, c, s))).catch(console.error);
      })
    );
  }, []);

  return { progress: snap.progress, ready: snap.ready, submitQuiz, reset };
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