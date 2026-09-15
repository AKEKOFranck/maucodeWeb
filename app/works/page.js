"use client";

import { useState } from "react";
import styles from "./page.module.css";

import data from "@/lib/data/works.json";

export default function Works() {
  const [openCourse, setOpenCourse] = useState(null);

  const toggleCourse = (id) => {
    setOpenCourse((current) => (current === id ? null : id));
  };

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDot} />
            <span className={styles.eyebrow}>{data.program.name}</span>
          </div>

          <h1 className={styles.heroTitle}>{data.program.tagline}</h1>

          <p className={styles.heroLead}>{data.program.description}</p>

          <div className={styles.heroMeta}>
            <span className={styles.heroMetaItem}>{data.program.audience}</span>
            <span className={styles.heroMetaItem}>3 logiciels, 3 parcours</span>
            <span className={styles.heroMetaItem}>Exercices pratiques inclus</span>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className={styles.container}>
        <div className={styles.values}>
          <div className={styles.valueCard}>
            <div className={styles.valueTitle}>Aucun prérequis</div>
            <div className={styles.valueText}>
              On part de zéro. Chaque parcours commence par la prise en main de
              l'interface, sans supposer que tu connais déjà le logiciel.
            </div>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueTitle}>Que l'essentiel</div>
            <div className={styles.valueText}>
              Pas 200 fonctionnalités inutiles : uniquement ce qui sert vraiment
              au quotidien, au travail comme à l'école.
            </div>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueTitle}>Des cas concrets</div>
            <div className={styles.valueText}>
              CV, budget, présentation à l'oral : chaque parcours se termine sur
              un exercice qui ressemble à un vrai besoin.
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className={styles.container}>
        <div className={styles.courses}>
          {data.courses.map((course) => {
            const isOpen = openCourse === course.id;
            return (
              <article key={course.id} className={styles.courseCard}>
                <div className={styles.courseHead}>
                  <div>
                    <span
                      className={styles.softwareTag}
                      style={{
                        color: course.accentColor,
                        background: `${course.accentColor}1A`,
                      }}
                    >
                      <span
                        className={styles.softwareDot}
                        style={{ background: course.accentColor }}
                      />
                      {course.software}
                    </span>

                    <h2 className={styles.courseTitle}>{course.title}</h2>
                    <p className={styles.coursePitch}>{course.pitch}</p>
                  </div>

                  <div className={styles.courseMeta}>
                    <span className={styles.metaRow}>
                      Niveau <strong>{course.level}</strong>
                    </span>
                    <span className={styles.metaRow}>
                      Durée <strong>{course.duration}</strong>
                    </span>
                    <span className={styles.metaRow}>
                      Format <strong>{course.format}</strong>
                    </span>
                    <button
                      type="button"
                      className={styles.toggleBtn}
                      onClick={() => toggleCourse(course.id)}
                    >
                      {isOpen ? "Masquer le programme" : "Voir le programme"}
                    </button>
                  </div>
                </div>

                <div className={styles.outcomes}>
                  {course.outcomes.map((outcome) => (
                    <div key={outcome} className={styles.outcomeItem}>
                      {outcome}
                    </div>
                  ))}
                </div>

                {isOpen && (
                  <div className={styles.modules}>
                    {course.modules.map((module, index) => (
                      <div key={module.title} className={styles.moduleRow}>
                        <div className={styles.moduleIndex}>
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <div className={styles.moduleTitle}>{module.title}</div>
                          <div className={styles.moduleIntro}>{module.intro}</div>
                          <div className={styles.lessonList}>
                            {module.lessons.map((lesson) => (
                              <span key={lesson} className={styles.lessonPill}>
                                {lesson}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

     
    </main>
  );
}