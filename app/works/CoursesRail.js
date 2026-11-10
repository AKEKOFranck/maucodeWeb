"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Lesson/icons";
import { useProgress, stateOf } from "@/lib/progress";
import { FREE_MODULES_PER_COURSE } from "@/lib/config";
import styles from "./CoursesRail.module.css";

/* Rangée de parcours (Word, Excel, PowerPoint).
   Même comportement que le Hub : survol ou focus = sélection, clic = ouverture,
   flèches ← → / Home / End = navigation, écran tactile : 1er appui sélectionne, 2e ouvre. */
export default function CoursesRail({ courses }) {
  const [active, setActive] = useState(0);
  const [openId, setOpenId] = useState(null);
  const tileRefs = useRef([]);
  const tapRef = useRef(null);
  const { progress, ready } = useProgress();

  if (!courses?.length) return null;
  const course = courses[active] ?? courses[0];

  const doneCount = (c) =>
    c.modules.filter((m) => stateOf(progress, c.id, m.slug).done).length;

  const metaOf = (c) => {
    const total = c.modules.length;
    const done = ready ? doneCount(c) : 0;
    return done > 0 ? `${done} sur ${total} modules validés` : `${total} modules`;
  };

  const onRailKeyDown = (e) => {
    const last = courses.length - 1;
    const current = tileRefs.current.indexOf(document.activeElement);
    const from = current === -1 ? active : current;

    let next = null;
    if (e.key === "ArrowRight") next = Math.min(from + 1, last);
    else if (e.key === "ArrowLeft") next = Math.max(from - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;

    e.preventDefault();
    tileRefs.current[next]?.focus();
  };

  const onTilePointerDown = (e, i) => {
    tapRef.current = { touch: e.pointerType === "touch", wasActive: i === active };
  };

  const onTileClick = (e, i) => {
    const tap = tapRef.current;
    tapRef.current = null;
    if (tap && tap.touch && !tap.wasActive) {
      e.preventDefault();
      setActive(i);
    }
  };

  const total = course.modules.length;
  const done = ready ? doneCount(course) : 0;
  const programOpen = openId === course.id;

  return (
    <section className={styles.section} aria-labelledby="parcours-titre">
      {/* Lueur de fond : une couche par parcours, seule la couche active est visible */}
      <div className={styles.ambient} aria-hidden="true">
        {courses.map((c, i) => (
          <span
            key={c.id}
            className={`${styles.glow} ${i === active ? styles.glowOn : ""}`}
            style={{ "--from": c.color }}
          />
        ))}
      </div>

      <div className={styles.container}>
        <h2 id="parcours-titre" className={styles.title}>
          Choisis ton parcours
        </h2>

        <div
          className={styles.rail}
          role="group"
          aria-label="Choisir un parcours"
          onKeyDown={onRailKeyDown}
        >
          {courses.map((c, i) => (
            <Link
              key={c.id}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              href={`/works/${c.id}`}
              className={`${styles.tile} ${i === active ? styles.tileActive : ""}`}
              style={{ "--from": c.color }}
              aria-label={`${c.software} : ${metaOf(c)}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onPointerDown={(e) => onTilePointerDown(e, i)}
              onClick={(e) => onTileClick(e, i)}
            >
              <span className={styles.tileIcon} aria-hidden="true">
                <Icon name={c.icon} />
              </span>
              <span className={styles.tileName}>{c.software}</span>
              <span className={styles.tileMeta}>{metaOf(c)}</span>
            </Link>
          ))}
        </div>

        <p className={styles.hint} aria-hidden="true">
          Utilisez les flèches ← → du clavier pour naviguer
        </p>

        <div
          className={`glass ${styles.panel}`}
          role="region"
          aria-live="polite"
          aria-label="Détails du parcours"
        >
          <div className={styles.panelBody} key={course.id}>
            <h3 className={styles.panelTitle}>{course.title}</h3>
            <p className={styles.pitch}>{course.pitch}</p>

            <dl className={styles.meta}>
              <div>
                <dt>Niveau</dt>
                <dd>{course.level}</dd>
              </div>
              <div>
                <dt>Durée</dt>
                <dd>{course.duration}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{course.format}</dd>
              </div>
            </dl>

            {ready && done > 0 && (
              <p className={styles.progressLine}>
                Ta progression : {done} module{done > 1 ? "s" : ""} validé{done > 1 ? "s" : ""} sur{" "}
                {total}
              </p>
            )}

            <ul className={styles.outcomes}>
              {course.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Link href={`/works/${course.id}`} className={styles.btnPrimary}>
                Ouvrir le cours
              </Link>
              <button
                type="button"
                className={styles.btnGlass}
                aria-expanded={programOpen}
                aria-controls={`programme-${course.id}`}
                onClick={() => setOpenId(programOpen ? null : course.id)}
              >
                {programOpen ? "Masquer le programme" : "Voir le programme"}
              </button>
            </div>

            {programOpen && (
              <ol className={styles.program} id={`programme-${course.id}`}>
                {course.modules.map((m, i) => {
                  const res = stateOf(progress, course.id, m.slug);
                  return (
                    <li key={m.slug} className={styles.progItem}>
                      <span className={styles.progNum} aria-hidden="true">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className={styles.progTitle}>
                          {m.title}
                          {ready && res.done && <span className={styles.progDone}>Validé</span>}
                        </h4>
                        <p className={styles.progIntro}>{m.intro}</p>
                        <ul className={styles.lessons}>
                          {m.lessons.map((l) => (
                            <li key={l}>{l}</li>
                          ))}
                        </ul>
                        <Link href={`/works/${course.id}/${m.slug}`} className={styles.progLink}>
                          {i < FREE_MODULES_PER_COURSE
                            ? "Essayer gratuitement, sans compte"
                            : "Ouvrir ce module"}
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}