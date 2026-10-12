import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, getModule } from "@/lib/data/modules";
import { Visual, Quiz, Exercise, FeedbackForm } from "@/components/Lesson/lesson";
import styles from "../page.module.css";

export function generateStaticParams() {
  return Object.entries(COURSES).flatMap(([slug, c]) =>
    c.modules.map((m) => ({ slug, module: m.slug }))
  );
}

export default async function ModulePage({ params }) {
  const { slug, module: moduleSlug } = await params;
  const course = getCourse(slug);
  const mod = getModule(slug, moduleSlug);
  if (!course || !mod) notFound();

  const idx = course.modules.findIndex((m) => m.slug === moduleSlug);
  const prev = course.modules[idx - 1];
  const next = course.modules[idx + 1];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <Link href={`/works/${slug}`} className={styles.back}>← {course.title}</Link>
          <div>
            <span className={styles.badge} style={{ color: course.accent, background: `${course.accent}1A` }}>
              {course.emoji} {course.software}, module {idx + 1}
            </span>
          </div>
          <h1 className={styles.heroTitle}>{mod.title}</h1>
          <p className={styles.heroLead}>{mod.intro}</p>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.chapters}>
          {mod.chapters.map((ch, i) => (
            <article key={ch.title} className={styles.chapter}>
              <div className={styles.chapterHead}>
                <span className={styles.chapterNum}>{i + 1}</span>
                <h2>{ch.title}</h2>
              </div>
              {ch.explain.map((p) => <p key={p}>{p}</p>)}
              <Visual v={ch.visual} />
              {ch.tip && <div className={styles.tip}>💡 <strong>Astuce.</strong> {ch.tip}</div>}
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.container} ${styles.block}`}>
        <h2>Teste-toi</h2>
        <p className={styles.blockLead}>Clique sur la bonne réponse. Tu vois tout de suite si c'est juste.</p>
        <Quiz questions={mod.quiz} />
      </section>

      <section className={`${styles.container} ${styles.block}`}>
        <h2>À toi de jouer</h2>
        <p className={styles.blockLead}>Essaie d'abord seul. Le corrigé est là si tu es bloqué.</p>
        <Exercise exercise={mod.exercise} />
      </section>

      <section className={styles.feedback}>
        <div className={styles.container}>
          <div className={styles.block} style={{ paddingBottom: 0 }}>
            <h2>Ton avis ou ton inscription</h2>
            <p className={styles.blockLead}>Un commentaire, une question, ou l'envie de suivre la formation en direct ? Écris-nous.</p>
            <FeedbackForm course={course.software} module={mod.title} />
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <nav className={styles.nav} aria-label="Navigation entre modules">
          {prev ? <Link className={styles.navLink} href={`/works/${slug}/${prev.slug}`}>← {prev.title}</Link> : <span />}
          {next ? (
            <Link className={`${styles.navLink} ${styles.navNext}`} href={`/works/${slug}/${next.slug}`}>{next.title} →</Link>
          ) : (
            <Link className={`${styles.navLink} ${styles.navNext}`} href="/works">Voir les autres formations</Link>
          )}
        </nav>
      </div>
    </main>
  );
}