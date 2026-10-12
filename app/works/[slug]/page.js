import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/lib/data/modules";
import styles from "./page.module.css";

export function generateStaticParams() {
  return Object.keys(COURSES).map((slug) => ({ slug }));
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <Link href="/works" className={styles.back}>← Toutes les formations</Link>
          <div>
            <span className={styles.badge} style={{ color: course.accent, background: `${course.accent}1A` }}>
              {course.emoji} {course.software}
            </span>
          </div>
          <h1 className={styles.heroTitle}>{course.title}</h1>
          <p className={styles.heroLead}>{course.intro}</p>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.modulesGrid}>
          {course.modules.map((m, i) => (
            <Link key={m.slug} href={`/works/${slug}/${m.slug}`} className={styles.moduleCard}>
              <span className={styles.moduleEmoji} aria-hidden="true">{m.emoji}</span>
              <h2>Module {i + 1} : {m.title}</h2>
              <p>{m.intro}</p>
              <span className={styles.moduleMeta}>
                {m.chapters.length} chapitres, un quiz et un exercice
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}