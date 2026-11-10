import data from "@/lib/data/works.json";
import { getCourse } from "@/lib/data/modules";
import { SESSION_PRICE } from "@/lib/config";
import CoursesRail from "./CoursesRail";
import InviteBox from "./InviteBox";
import styles from "./page.module.css";

export const metadata = {
  title: "Formations Office : Word, Excel et PowerPoint pour débutants",
  description: data.program.description,
  alternates: { canonical: "/works" },
};

const VALUES = [
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
  /* Données légères envoyées au composant client (pas tout le contenu des cours) */
  const courses = data.courses.map((c) => {
    const detail = getCourse(c.id);
    return {
      id: c.id,
      software: c.software,
      title: c.title,
      pitch: c.pitch,
      level: c.level,
      duration: c.duration,
      format: c.format,
      outcomes: c.outcomes,
      color: c.accentColor,
      icon: detail?.icon ?? null,
      modules: (detail?.modules ?? []).map((m) => ({
        slug: m.slug,
        title: m.title,
        intro: m.intro,
        lessons: m.chapters.map((ch) => ch.title),
      })),
    };
  });

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>{data.program.tagline}</h1>
          <p className={styles.heroText}>{data.program.description}</p>
          <ul className={styles.tags}>
            <li>{data.program.audience}</li>
            <li>3 logiciels, 3 parcours</li>
            <li>1er module gratuit, sans compte</li>
            <li>Exercices et corrigés</li>
            <li>Séance approfondie : {SESSION_PRICE}</li>
          </ul>
        </div>
      </section>

      <CoursesRail courses={courses} />

      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Apprendre Office, sans stress.</h2>
          <ul className={styles.valueList}>
            {VALUES.map((v) => (
              <li key={v.title} className={`glass ${styles.valueItem}`}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InviteBox />
    </main>
  );
}