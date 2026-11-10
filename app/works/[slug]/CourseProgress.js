"use client";

import { useProgress, stateOf } from "@/lib/progress";
import styles from "./page.module.css";

/* Barre de progression du cours : modules validés sur le total */
export default function CourseProgress({ courseSlug, moduleSlugs }) {
  const { progress, ready } = useProgress();
  const total = moduleSlugs.length;
  const done = ready
    ? moduleSlugs.filter((m) => stateOf(progress, courseSlug, m).done).length
    : 0;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const text = !ready
    ? `${total} modules`
    : `${done} module${done > 1 ? "s" : ""} validé${done > 1 ? "s" : ""} sur ${total}`;

  return (
    <div className={styles.progress}>
      <div
        className={styles.progressBar}
        role="progressbar"
        aria-label="Progression dans le cours"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-valuetext={text}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className={styles.progressText}>{text}</p>
    </div>
  );
}