"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

import data from "@/lib/data/works.json";
import { getCourse } from "@/lib/data/modules";
import { SESSION_PRICE } from "@/lib/config";
import ContactForm, { BESOIN_SEANCE } from "@/components/ContactForm/contactform";


const values = [
  {
    title: "Aucun prérequis",
    text: "On part de zéro. Chaque parcours commence par la prise en main de l'interface, sans supposer que tu connais déjà le logiciel.",
  },
  {
    title: "Que l'essentiel",
    text: "Pas 200 fonctionnalités inutiles : uniquement ce qui sert vraiment au quotidien, au travail comme à l'école.",
  },
  {
    title: "Des cas concrets",
    text: "CV, budget, présentation à l'oral : chaque parcours se termine sur un exercice qui ressemble à un vrai besoin.",
  },
];

export default function Works() {
  const [openCourse, setOpenCourse] = useState(null);

  const toggleCourse = (id) =>
    setOpenCourse((current) => (current === id ? null : id));

  return (
    <main className={styles.main}>
      {/* 1. Présentation */}
      <section className={styles.presentation}>
        <Image
          src="/fondAbout (1).png"
          alt="Formations Office Maucode"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />

        <div className={styles.heroContent}>
          <p className={styles.heroBrand} style={{ "--i": 0 }}>
            {data.program.name}
          </p>
          <h1 className={styles.heroTitle} style={{ "--i": 1 }}>
            {data.program.tagline}
          </h1>
          <p className={styles.heroText} style={{ "--i": 2 }}>
            {data.program.description}
          </p>
          <div className={styles.heroTags} style={{ "--i": 3 }}>
            <span>{data.program.audience}</span>
            <span>3 logiciels, 3 parcours</span>
            <span>Exercices et corrigés</span>
            <span>Séance approfondie : {SESSION_PRICE}</span>
          </div>
        </div>
      </section>

      {/* 2. Pourquoi cette formation */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleLight}>
            Apprendre Office, sans stress.
          </h2>
          <ul className={styles.valueList}>
            {values.map((v) => (
              <li key={v.title} className={styles.valueItem}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Les parcours */}
      <section className={styles.courses}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Choisis ton parcours</h2>

          <div className={styles.courseList}>
            {data.courses.map((course) => {
              const isOpen = openCourse === course.id;
              const detail = getCourse(course.id);

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
                      <h3 className={styles.courseTitle}>{course.title}</h3>
                      <p className={styles.coursePitch}>{course.pitch}</p>
                    </div>

                    <dl className={styles.courseMeta}>
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
                  </div>

                  <ul className={styles.outcomes}>
                    {course.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>

                  <div className={styles.courseActions}>
                    <Link
                      href={`/works/${course.id}`}
                      className={styles.btnPrimary}
                    >
                      Ouvrir le cours
                    </Link>
                    <button
                      type="button"
                      className={styles.btnOutline}
                      onClick={() => toggleCourse(course.id)}
                      aria-expanded={isOpen}
                    >
                      {isOpen ? "Masquer le programme" : "Voir le programme"}
                    </button>
                  </div>

                  {isOpen && (
                    <div className={styles.modules}>
                      {course.modules.map((module, index) => {
                        const slug = detail?.modules[index]?.slug;
                        return (
                          <div key={module.title} className={styles.moduleRow}>
                            <span className={styles.moduleIndex}>
                              {index + 1}
                            </span>
                            <div>
                              <h4 className={styles.moduleTitle}>
                                {module.title}
                              </h4>
                              <p className={styles.moduleIntro}>
                                {module.intro}
                              </p>
                              <div className={styles.lessonList}>
                                {module.lessons.map((lesson) => (
                                  <span
                                    key={lesson}
                                    className={styles.lessonPill}
                                  >
                                    {lesson}
                                  </span>
                                ))}
                              </div>
                              {slug && (
                                <Link
                                  href={`/works/${course.id}/${slug}`}
                                  className={styles.moduleLink}
                                >
                                  Ouvrir ce module
                                </Link>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Aller plus loin : séance avec un formateur */}
      <section className={styles.invitations}>
        <div className={styles.container}>
          <div className={styles.inviteBox}>
            <h2>Envie d&apos;aller plus loin ?</h2>
            <p>
              Les parcours en ligne te donnent les bases. Pour une formation
              plus poussée, réserve une séance avec un formateur :{" "}
              <strong>{SESSION_PRICE} la séance</strong>. Dis-nous quel
              logiciel tu veux approfondir et à quel moment tu es disponible,
              nous fixons la séance avec toi.
            </p>
            <div className={styles.inviteActions}>
              <ContactForm
                label="Réserver une séance"
                variant="primary"
                defaultBesoin={BESOIN_SEANCE}
              />
              <ContactForm label="Poser une question" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}