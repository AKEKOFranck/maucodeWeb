import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, getModule } from "@/lib/data/modules";
import { Icon } from "@/components/Lesson/icons";
import ModuleFlow from "./Moduleflow";
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
  const pick = (m) => (m ? { slug: m.slug, title: m.title } : null);

  return (
    <main className={styles.page} style={{ "--accent": course.accent }}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <Link href={`/works/${slug}`} className={styles.back}>← {course.title}</Link>
          <div>
            <span className={styles.badge} style={{ color: course.accent, background: `${course.accent}1A` }}>
              <Icon name={course.icon} /> {course.software}, module {idx + 1}
            </span>
          </div>
          <h1 className={styles.heroTitle}>{mod.title}</h1>
          <p className={styles.heroLead}>{mod.intro}</p>
        </div>
      </section>

      <ModuleFlow
        courseSlug={slug}
        courseTitle={course.software}
        moduleSlugs={course.modules.map((m) => m.slug)}
        index={idx}
        module={mod}
        prev={pick(course.modules[idx - 1])}
        next={pick(course.modules[idx + 1])}
      />
   
    </main>
  );
}