"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getCountFromServer, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import AnnouncementsAdmin from "@/components/Announcements/AnnouncementsAdmin";
import { COURSES } from "@/lib/data/modules";
import s from "./page.module.css";

const fmt = (ms) =>
  ms ? new Date(ms).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "—";

function State({ children }) {
  return (
    <main className={s.page}>
      <div className={s.state}>{children}</div>
    </main>
  );
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      try {
        const usersCount = (await getCountFromServer(collection(db, "users"))).data().count;
        const snap = await getDocs(collection(db, "progress"));

        const byCourse = {};
        snap.forEach((d) => {
          const x = d.data();
          if (!x.uid || !x.courseSlug || !x.moduleSlug || typeof x.done !== "boolean") return;

          const c = (byCourse[x.courseSlug] ??= {
            learners: new Set(),
            modules: {},
            doneByUser: {},
            last: 0,
          });
          c.learners.add(x.uid);

          const m = (c.modules[x.moduleSlug] ??= { attempts: 0, passed: 0, pctSum: 0, pctN: 0 });
          m.attempts += 1;
          if (x.done) {
            m.passed += 1;
            c.doneByUser[x.uid] = (c.doneByUser[x.uid] || 0) + 1;
          }
          if (x.total > 0) {
            m.pctSum += x.score / x.total;
            m.pctN += 1;
          }
          const t = x.updatedAt?.toMillis?.() ?? 0;
          if (t > c.last) c.last = t;
        });

        if (!cancelled) setStats({ usersCount, byCourse });
      } catch (e) {
        console.error(e);
        if (!cancelled) setError(e.code || e.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) return <State>Chargement…</State>;

  if (!user)
    return (
      <State>
        <p>Tu n'es pas connecté.</p>
        <Link href="/login" className={s.btn}>Aller à la connexion</Link>
      </State>
    );

  if (error === "permission-denied")
    return (
      <State>
        <p><strong>Accès réservé.</strong></p>
        <p>Identifiant du compte connecté :</p>
        <code>{user.uid}</code>
      </State>
    );

  if (error) return <State>Erreur : {error}</State>;
  if (!stats) return <State>Calcul en cours…</State>;

  const allLearners = new Set();
  let totalValidated = 0;
  Object.values(stats.byCourse).forEach((c) => {
    c.learners.forEach((u) => allLearners.add(u));
    Object.values(c.modules).forEach((m) => {
      totalValidated += m.passed;
    });
  });

  return (
    <main className={s.page}>
      <div className={s.container}>
        <header className={s.header}>
          <span className={s.kicker}>Administration</span>
          <h1 className={s.title}>Tableau de bord</h1>
          <p className={s.lead}>Suivi des apprenants, des quiz validés et des annonces.</p>
        </header>

        <div className={s.kpis}>
          <div className={s.kpi}>
            <span className={s.kpiValue}>{stats.usersCount}</span>
            <span className={s.kpiLabel}>compte(s) créé(s)</span>
          </div>
          <div className={s.kpi}>
            <span className={s.kpiValue}>{allLearners.size}</span>
            <span className={s.kpiLabel}>apprenant(s) ayant fait un quiz</span>
          </div>
          <div className={s.kpi}>
            <span className={s.kpiValue}>{totalValidated}</span>
            <span className={s.kpiLabel}>module(s) validé(s)</span>
          </div>
        </div>

        <AnnouncementsAdmin />

        {Object.entries(COURSES).map(([courseSlug, course]) => {
          const data = stats.byCourse[courseSlug];
          const total = course.modules.length;
          const finishers = data
            ? Object.values(data.doneByUser).filter((n) => n >= total).length
            : 0;

          return (
            <section
              key={courseSlug}
              className={s.course}
              style={{ "--accent": course.accent }}
            >
              <h2 className={s.courseTitle}>
                <span className={s.dot} />
                {course.software}
              </h2>
              <p className={s.meta}>
                <strong>{data ? data.learners.size : 0}</strong> apprenant(s) ayant fait un quiz
                {" · "}
                <strong>{finishers}</strong> ayant terminé toute la formation
                <br />
                Dernière activité : {fmt(data?.last)}
              </p>

              <div className={s.tableWrap}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th>Essais</th>
                      <th>Validés</th>
                      <th>Taux de validation</th>
                      <th>Score moyen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.modules.map((m) => {
                      const st = data?.modules[m.slug];
                      const attempts = st?.attempts || 0;
                      const ok = st?.passed || 0;
                      const pct = attempts ? Math.round((ok / attempts) * 100) : 0;
                      return (
                        <tr key={m.slug}>
                          <td>{m.title}</td>
                          <td className={s.num}>{attempts}</td>
                          <td className={s.num}>{ok}</td>
                          <td>
                            {attempts ? (
                              <div className={s.rate}>
                                <div className={s.bar}>
                                  <div className={s.barFill} style={{ width: `${pct}%` }} />
                                </div>
                                <span className={s.num}>{pct} %</span>
                              </div>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className={s.num}>
                            {st?.pctN ? `${Math.round((st.pctSum / st.pctN) * 100)} %` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}