"use client";

import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const KEY = "maucode:progress:v2";

/* Part de bonnes réponses pour valider un module (0.6 = 60 %). 3 questions -> 2 bonnes réponses. */
const PASS_RATIO = 0.6;

export const minToPass = (total) => Math.ceil(total * PASS_RATIO);
export const passed = (score, total) => score >= minToPass(total);
export const keyOf = (course, slug) => `${course}/${slug}`;

/* ---------- Stockage du navigateur (visiteurs non connectés) ---------- */
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

/* Envoie la progression du navigateur vers le compte, sans jamais écraser un meilleur résultat */
async function migrateLocal(uid) {
  const local = load();
  const entries = Object.entries(local);
  if (!entries.length) return;

  try {
    const existing = {};
    const snap = await getDocs(query(collection(db, "progress"), where("uid", "==", uid)));
    snap.forEach((d) => {
      const x = d.data();
      existing[keyOf(x.courseSlug, x.moduleSlug)] = x;
    });

    for (const [k, v] of entries) {
      const [course, slug] = k.split("/");
      if (!course || !slug) continue;

      const e = existing[k];
      const done = Boolean(e?.done) || Boolean(v.done);
      const localScore = v.score ?? 0;
      if (e && e.done === done && (e.score ?? 0) >= localScore) continue;

      const better = !e || localScore > (e.score ?? 0);
      const data = {
        uid,
        courseSlug: course,
        moduleSlug: slug,
        score: better ? localScore : e.score ?? 0,
        total: better ? v.total ?? 0 : e.total ?? 0,
        done,
        updatedAt: serverTimestamp(),
      };
      if (done && !e?.done) data.completedAt = serverTimestamp();
      await setDoc(doc(db, "progress", docId(uid, course, slug)), data, { merge: true });
    }
    save({}); // le navigateur est maintenant "vidé" : le compte suivant ne l'héritera pas
  } catch (e) {
    console.error("Migration de la progression impossible :", e);
  }
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
    await migrateLocal(uid);
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
  const { progress, ready, record, reset } = useProgress();
  ready  : false tant que la progression n'est pas chargée
  record : record(course, moduleSlug, score, total)
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

  const record = useCallback(async (course, slug, score, total) => {
    const k = keyOf(course, slug);
    const old = state.progress[k];
    const better = !old || score > (old.score ?? 0);
    const next = {
      score: better ? score : old.score,
      total: better ? total : old.total,
      done: Boolean(old?.done) || passed(score, total), // une fois validé, reste validé
      at: Date.now(),
    };

    const uid = state.uid;

    if (!uid) {
      const all = load();
      all[k] = next;
      save(all);
      setState({ progress: all });
      return;
    }

    setState({ progress: { ...state.progress, [k]: next } }); // affichage immédiat
    const data = {
      uid,
      courseSlug: course,
      moduleSlug: slug,
      score: next.score,
      total: next.total,
      done: next.done,
      updatedAt: serverTimestamp(),
    };
    if (next.done && !old?.done) data.completedAt = serverTimestamp();

    try {
      await setDoc(doc(db, "progress", docId(uid, course, slug)), data, { merge: true });
    } catch (e) {
      console.error("Enregistrement impossible :", e);
    }
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

  return { progress: snap.progress, ready: snap.ready, record, reset };
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