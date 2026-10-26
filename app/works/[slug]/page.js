import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/lib/data/modules";
import { Icon } from "@/components/Lesson/icons";
import { CourseEnd } from "@/components/Lesson/lesson";
import ModuleCard from "./ModuleCard";
import styles from "./page.module.css";

export function generateStaticParams() {
  return Object.keys(COURSES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  return {
    title: `Apprendre ${course.software} : cours en ligne pour débutants`,
    description: `${course.intro} Leçons illustrées, quiz et exercices corrigés avec Maucode.`,
    alternates: { canonical: `/works/${slug}` },
  };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const moduleSlugs = course.modules.map((m) => m.slug);

  return (
    <main className={styles.page} style={{ "--accent": course.accent }}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <Link href="/works" className={styles.back}>← Toutes les formations</Link>
          <div>
            <span className={styles.badge} style={{ color: course.accent, background: `${course.accent}1A` }}>
              <Icon name={course.icon} /> {course.software}
            </span>
          </div>
          <h1 className={styles.heroTitle}>{course.title}</h1>
          <p className={styles.heroLead}>{course.intro}</p>
        </div>
      </section>

      <section className={styles.container}>
        <div className={styles.modulesGrid}>
          {course.modules.map((m, i) => (
            <ModuleCard key={m.slug} courseSlug={slug} moduleSlugs={moduleSlugs} index={i} module={m} />
          ))}
        </div>

        <CourseEnd course={slug} courseTitle={course.software} moduleSlugs={moduleSlugs} spaced />
      </section>
    </main>
  );
}