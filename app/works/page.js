import data from "@/lib/data/works.json";
import { getCourse } from "@/lib/data/modules";
import { SESSION_PRICE } from "@/lib/config";
import CoursesRail from "./CoursesRail";
import InviteBox from "./InviteBox";
import styles from "./page.module.css";

export const metadata = {
  title: "Formations : Word, Excel, PowerPoint et programmation pour débutants",
  description: data.program.description,
  alternates: { canonical: "/works" },
};

const VALUES = [
  {
    title: "Aucun prérequis",
    text: "On part de zéro. Chaque parcours commence par les bases, sans supposer que tu connais déjà le logiciel ou la programmation.",
  },
  {
    title: "Que l'essentiel",
    text: "Pas 200 fonctionnalités inutiles : uniquement ce qui sert vraiment au quotidien, au travail comme à l'école.",
  },
  {
    title: "Des cas concrets",
    text: "CV, budget, présentation à l'oral, calcul de prix : chaque parcours se termine sur un exercice qui ressemble à un vrai besoin.",
  },
];

export default function Works() {
  /* Données légères envoyées au composant client (pas tout le contenu des cours).
     Un cours listé dans works.json mais absent de modules.js est ignoré, au lieu de planter la page. */
  const courses = data.courses
    .map((c) => {
      const detail = getCourse(c.id);
      if (!detail) return null;
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
        icon: detail.icon ?? null,
        modules: detail.modules.map((m) => ({
          slug: m.slug,
          title: m.title,
          intro: m.intro,
          lessons: m.chapters.map((ch) => ch.title),
        })),
      };
    })
    .filter(Boolean);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>{data.program.tagline}</h1>
          <p className={styles.heroText}>{data.program.description}</p>
          <ul className={styles.tags}>
            <li>{data.program.audience}</li>
            <li>{courses.length} parcours : Office et programmation</li>
            <li>1er module gratuit, sans compte</li>
            <li>Exercices et corrigés</li>
            <li>Séance approfondie : {SESSION_PRICE}</li>
          </ul>
        </div>
      </section>

      <CoursesRail courses={courses} />

      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Apprendre, sans stress.</h2>
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