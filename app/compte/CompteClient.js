"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiAward,
  FiBookOpen,
  FiChevronRight,
  FiCompass,
  FiEye,
  FiEyeOff,
  FiFlag,
  FiLayers,
  FiLock,
  FiLogOut,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { useProgress, keyOf } from "@/lib/progress";
import { getChoice, isValidSlug } from "@/lib/attestation";
import s from "./page.module.css";

/* =====================================================
   TROPHÉES
   Tout est calculé ici à partir de la progression (déjà corrigée par le serveur).
   Rien n'est écrit : impossible de se donner un trophée en modifiant le navigateur.
===================================================== */
const TIERS = {
  bronze: { label: "Bronze", pts: 15 },
  silver: { label: "Argent", pts: 30 },
  gold: { label: "Or", pts: 90 },
  platinum: { label: "Platine", pts: 180 },
};

const LEVEL_STEP = 100; // points pour monter d'un niveau
const LEVEL_TITLES = ["Recrue", "Apprenti", "Pratiquant", "Confirmé", "Expert", "Maître", "Légende"];

/* Statistiques calculées sur le catalogue réel (les anciens modules supprimés sont ignorés) */
function buildStats(catalog, progress) {
  let done = 0;
  let perfect = 0;
  let touched = 0;
  let totalModules = 0;
  const perCourse = {};

  for (const c of catalog) {
    let d = 0;
    totalModules += c.modules.length;
    for (const m of c.modules) {
      const v = progress?.[keyOf(c.slug, m.slug)];
      if (!v?.done) continue;
      d += 1;
      if (v.total > 0 && v.score >= v.total) perfect += 1;
    }
    perCourse[c.slug] = d;
    done += d;
    if (d > 0) touched += 1;
  }
  return { done, perfect, touched, totalModules, perCourse };
}

function buildTrophies(catalog, stats) {
  const n = catalog.length;

  const base = [
    { id: "first", tier: "bronze", icon: FiFlag, name: "Premier pas", desc: "Valider ton premier module.", value: stats.done, target: 1 },
    { id: "three", tier: "bronze", icon: FiTrendingUp, name: "Sur la lancée", desc: "Valider 3 modules.", value: stats.done, target: 3 },
    { id: "flawless", tier: "bronze", icon: FiTarget, name: "Sans faute", desc: "Réussir un module avec 100 %.", value: stats.perfect, target: 1 },
    { id: "five", tier: "silver", icon: FiBookOpen, name: "Studieux", desc: "Valider 5 modules.", value: stats.done, target: 5 },
    { id: "flawless5", tier: "silver", icon: FiStar, name: "Perfectionniste", desc: "Réussir 5 modules avec 100 %.", value: stats.perfect, target: 5 },
    { id: "explorer", tier: "silver", icon: FiCompass, name: "Explorateur", desc: "Valider un module dans 2 formations.", value: stats.touched, target: Math.min(2, n) },
    { id: "ten", tier: "gold", icon: FiZap, name: "Machine de guerre", desc: "Valider 10 modules.", value: stats.done, target: 10 },
    { id: "flawless10", tier: "gold", icon: FiShield, name: "Main de maître", desc: "Réussir 10 modules avec 100 %.", value: stats.perfect, target: 10 },
    { id: "allrounder", tier: "gold", icon: FiLayers, name: "Touche-à-tout", desc: "Valider un module dans chaque formation.", value: stats.touched, target: n },
  ];

  const courses = catalog
    .filter((c) => c.modules.length > 0)
    .map((c) => ({
      id: `course-${c.slug}`,
      tier: "gold",
      icon: FiBookOpen,
      name: `${c.software} maîtrisé`,
      desc: `Valider tous les modules de la formation ${c.software}.`,
      value: stats.perCourse[c.slug] ?? 0,
      target: c.modules.length,
    }));

  const slam = {
    id: "grandslam",
    tier: "gold",
    icon: FiAward,
    name: "Grand chelem",
    desc: "Valider tous les modules de toutes les formations.",
    value: stats.done,
    target: stats.totalModules,
  };

  const all = [...base, ...courses, ...(stats.totalModules > 0 ? [slam] : [])]
    .filter((t) => t.target > 0)
    .map((t) => ({ ...t, unlocked: t.value >= t.target, value: Math.min(t.value, t.target) }));

  const platinum = {
    id: "platinum",
    tier: "platinum",
    icon: FiAward,
    name: "Platine",
    desc: "Débloquer tous les autres trophées.",
    value: all.filter((t) => t.unlocked).length,
    target: all.length,
    unlocked: all.length > 0 && all.every((t) => t.unlocked),
  };

  return [platinum, ...all];
}

/* Prochain module à faire : on reprend là où tu as validé en dernier, sinon la 1re formation non finie */
function findNextStep(catalog, progress) {
  const isDone = (c, m) => progress?.[keyOf(c.slug, m.slug)]?.done === true;
  const pending = (c) => c.modules.find((m) => !isDone(c, m));

  let latest = null;
  for (const c of catalog) {
    for (const m of c.modules) {
      const v = progress?.[keyOf(c.slug, m.slug)];
      if (!v?.done) continue;
      const at = v.at || 0;
      if (!latest || at > latest.at) latest = { course: c, at };
    }
  }
  if (latest) {
    const m = pending(latest.course);
    if (m) return { course: latest.course, module: m };
  }
  for (const c of catalog) {
    const m = pending(c);
    if (m) return { course: c, module: m };
  }
  return null;
}

/* =====================================================
   OUTILS D'AFFICHAGE
===================================================== */
function maskEmail(email) {
  if (typeof email !== "string" || !email.includes("@")) return "";
  const [local, domain] = email.split("@");
  return `${local.slice(0, 2)}${"•".repeat(Math.max(local.length - 2, 2))}@${domain}`;
}

/* Photo du compte Google (https uniquement), sinon initiale */
function Avatar({ user }) {
  const [broken, setBroken] = useState(false);
  const photo =
    typeof user?.photoURL === "string" && /^https:\/\//.test(user.photoURL) ? user.photoURL : null;
  const initial = (user?.displayName || user?.email || "?").trim().charAt(0).toUpperCase();

  if (photo && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt=""
        width={96}
        height={96}
        referrerPolicy="no-referrer"
        className={s.avatar}
        onError={() => setBroken(true)}
      />
    );
  }
  return (
    <span className={s.avatar} aria-hidden="true">
      {initial}
    </span>
  );
}

const RING_R = 56;
const RING_C = 2 * Math.PI * RING_R;

export default function CompteClient({ catalog }) {
  const router = useRouter();
  const { user, loading, isAdmin, logout } = useAuth();
  const { progress, ready } = useProgress();

  const [showEmail, setShowEmail] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [choices, setChoices] = useState({});

  /* Pas connecté : on renvoie vers la connexion, puis retour ici */
  useEffect(() => {
    if (loading || user || leaving) return;
    router.replace("/login?next=%2Fcompte");
  }, [loading, user, leaving, router]);

  /* Choix d'attestation (gardé dans le navigateur par AttestationPrompt) */
  useEffect(() => {
    const found = {};
    for (const c of catalog) found[c.slug] = isValidSlug(c.slug) ? getChoice(c.slug) : null;
    setChoices(found);
  }, [catalog]);

  const stats = useMemo(() => buildStats(catalog, progress), [catalog, progress]);
  const trophies = useMemo(() => buildTrophies(catalog, stats), [catalog, stats]);
  const next = useMemo(() => findNextStep(catalog, progress), [catalog, progress]);

  const unlockedCount = trophies.filter((t) => t.unlocked).length;
  const points = trophies.reduce((sum, t) => (t.unlocked ? sum + TIERS[t.tier].pts : sum), 0);
  const level = Math.floor(points / LEVEL_STEP) + 1;
  const levelTitle = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
  const ratio = ready ? (points % LEVEL_STEP) / LEVEL_STEP : 0;

  async function handleLogout() {
    if (leaving) return;
    setLeaving(true);
    setLogoutError("");
    try {
      await logout();
      router.replace("/login");
    } catch (e) {
      console.error(e);
      setLeaving(false);
      setLogoutError("Déconnexion impossible pour le moment. Réessaie.");
    }
  }

  if (loading || !user) {
    return (
      <main className={s.page}>
        <p className={s.status} role="status">
          Chargement…
        </p>
      </main>
    );
  }

  const fullName = user.displayName?.trim() || "";
  const email = user.email || "";

  /* Bouton « Continuer » */
  let resumeHref = "/works";
  let resumeTitle = "Continuer ma formation";
  let resumeMeta = "Ton premier module est gratuit";
  if (ready) {
    if (next) {
      resumeHref = `/works/${next.course.slug}/${next.module.slug}`;
      resumeTitle = `${stats.done === 0 ? "Commencer" : "Continuer"} : ${next.course.software}`;
      resumeMeta = next.module.title;
    } else if (stats.totalModules > 0 && stats.done >= stats.totalModules) {
      resumeTitle = "Programme terminé, bravo !";
      resumeMeta = "Revoir mes formations";
    }
  }

  return (
    <main className={s.page}>
      <div className={s.wrap}>
        {/* ---------- PROFIL ---------- */}
        <section className={`glass ${s.hero}`} aria-labelledby="compte-titre">
          <div className={s.ringBox}>
            <svg className={s.ring} viewBox="0 0 132 132" aria-hidden="true">
              <circle className={s.ringTrack} cx="66" cy="66" r={RING_R} />
              <circle
                className={s.ringValue}
                cx="66"
                cy="66"
                r={RING_R}
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C * (1 - ratio)}
              />
            </svg>
            <div className={s.avatarBox}>
              <Avatar user={user} />
            </div>
            <span className={s.levelBadge}>Niv. {ready ? level : "–"}</span>
          </div>

          <div className={s.heroInfo}>
            <p className={s.kicker}>{ready ? levelTitle : "Profil"}</p>
            <h1 id="compte-titre" className={s.name}>
              {fullName || "Mon compte"}
            </h1>
            <p className={s.sub}>
              {ready
                ? `${points % LEVEL_STEP} / ${LEVEL_STEP} points vers le niveau ${level + 1}`
                : "Chargement de ta progression…"}
            </p>
          </div>

          <dl className={s.stats}>
            <div className={s.stat}>
              <dt>Modules validés</dt>
              <dd>{ready ? `${stats.done}/${stats.totalModules}` : "–"}</dd>
            </div>
            <div className={s.stat}>
              <dt>Sans faute</dt>
              <dd>{ready ? stats.perfect : "–"}</dd>
            </div>
            <div className={s.stat}>
              <dt>Trophées</dt>
              <dd>{ready ? `${unlockedCount}/${trophies.length}` : "–"}</dd>
            </div>
            <div className={s.stat}>
              <dt>Points</dt>
              <dd>{ready ? points : "–"}</dd>
            </div>
          </dl>
        </section>

        {/* ---------- REPRENDRE ---------- */}
        <Link href={resumeHref} className={`console-card ${s.resume}`}>
          <span className={s.resumeIcon} aria-hidden="true">
            <FiBookOpen />
          </span>
          <span className={s.resumeText}>
            <span className={s.resumeTitle}>{resumeTitle}</span>
            <span className={s.resumeMeta}>{resumeMeta}</span>
          </span>
          <FiChevronRight className={s.resumeArrow} aria-hidden="true" />
        </Link>

        {/* ---------- MES FORMATIONS ---------- */}
        <section className={s.section} aria-labelledby="formations-titre">
          <div className={s.sectionHead}>
            <h2 id="formations-titre" className={s.sectionTitle}>
              Mes formations
            </h2>
          </div>

          <ul className={s.courseGrid}>
            {catalog.map((c) => {
              const total = c.modules.length;
              const d = stats.perCourse[c.slug] ?? 0;
              const complete = ready && total > 0 && d >= total;
              const pct = total > 0 ? Math.round((d / total) * 100) : 0;
              const wantsAttestation = choices[c.slug] === "yes";

              return (
                <li key={c.slug} className={`glass ${s.course}`} style={{ "--course": c.accent }}>
                  <div className={s.courseTop}>
                    <h3 className={s.courseName}>{c.software}</h3>
                    <span className={s.courseState}>
                      {!ready ? "…" : complete ? "Terminée" : d > 0 ? "En cours" : "Pas commencée"}
                    </span>
                  </div>

                  <div className={s.courseBar}>
                    <div
                      className={s.barTrack}
                      role="progressbar"
                      aria-label={`Progression ${c.software}`}
                      aria-valuemin={0}
                      aria-valuemax={total}
                      aria-valuenow={ready ? d : 0}
                    >
                      <div className={s.courseFill} style={{ width: ready ? `${pct}%` : "0%" }} />
                    </div>
                    <span className={s.barText}>
                      {ready ? d : "–"} / {total}
                    </span>
                  </div>

                  <div className={s.courseActions}>
                    <Link href={`/works/${c.slug}`} className={s.ghost}>
                      {complete ? "Revoir" : d > 0 ? "Continuer" : "Commencer"}
                    </Link>

                    {complete && (
                      <Link
                        href={wantsAttestation ? `/attestation/${encodeURIComponent(c.slug)}` : `/works/${c.slug}`}
                        className={s.ghost}
                      >
                        <FiAward aria-hidden="true" />
                        {wantsAttestation ? "Obtenir mon attestation" : "Demander mon attestation"}
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ---------- TROPHÉES ---------- */}
        <section className={s.section} aria-labelledby="trophees-titre">
          <div className={s.sectionHead}>
            <h2 id="trophees-titre" className={s.sectionTitle}>
              Trophées
            </h2>
            <p className={s.sectionMeta}>
              {ready ? `${unlockedCount} débloqué${unlockedCount > 1 ? "s" : ""} sur ${trophies.length}` : ""}
            </p>
          </div>

          {!ready ? (
            <div className={s.trophyGrid} aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`${s.trophy} ${s.skeleton}`} />
              ))}
            </div>
          ) : (
            <ul className={s.trophyGrid}>
              {trophies.map((t) => {
                const Icon = t.icon;
                const pct = Math.round((t.value / t.target) * 100);
                return (
                  <li
                    key={t.id}
                    className={`${s.trophy} ${s[`tier_${t.tier}`]} ${t.unlocked ? s.unlocked : s.locked}`}
                  >
                    <span className={s.trophyIcon} aria-hidden="true">
                      {t.unlocked ? <Icon /> : <FiLock />}
                    </span>
                    <div className={s.trophyBody}>
                      <p className={s.trophyTier}>
                        {TIERS[t.tier].label}
                        <span className={s.trophyPts}> · {TIERS[t.tier].pts} pts</span>
                      </p>
                      <h3 className={s.trophyName}>{t.name}</h3>
                      <p className={s.trophyDesc}>{t.desc}</p>

                      {t.unlocked ? (
                        <p className={s.trophyDone}>
                          <span className="sr-only">Trophée </span>Débloqué
                        </p>
                      ) : (
                        <div className={s.bar}>
                          <div
                            className={s.barTrack}
                            role="progressbar"
                            aria-label={`Progression : ${t.name}`}
                            aria-valuemin={0}
                            aria-valuemax={t.target}
                            aria-valuenow={t.value}
                          >
                            <div className={s.barFill} style={{ width: `${pct}%` }} />
                          </div>
                          <span className={s.barText}>
                            {t.value} / {t.target}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* ---------- COMPTE ET SÉCURITÉ ---------- */}
        <section className={`glass ${s.account}`} aria-labelledby="securite-titre">
          <h2 id="securite-titre" className={s.sectionTitle}>
            Compte et sécurité
          </h2>

          <div className={s.row}>
            <div className={s.rowText}>
              <span className={s.rowLabel}>Adresse e-mail</span>
              <span className={s.rowValue}>
                {email ? (showEmail ? email : maskEmail(email)) : "Non renseignée"}
              </span>
            </div>
            {email && (
              <button
                type="button"
                className={s.ghost}
                onClick={() => setShowEmail((v) => !v)}
                aria-pressed={showEmail}
              >
                {showEmail ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                {showEmail ? "Masquer" : "Afficher"}
              </button>
            )}
          </div>

          <p className={s.note}>
            Tes scores sont corrigés par nos serveurs : ils ne peuvent pas être inventés depuis le
            navigateur.
          </p>

          <div className={s.actions}>
            {isAdmin && (
              <Link href="/admin" className={s.ghost}>
                <FiShield aria-hidden="true" />
                Administration
              </Link>
            )}

            {!confirming ? (
              <button type="button" className={s.ghost} onClick={() => setConfirming(true)}>
                <FiLogOut aria-hidden="true" />
                Se déconnecter
              </button>
            ) : (
              <div className={s.confirm} role="group" aria-label="Confirmer la déconnexion">
                <span className={s.confirmText}>Te déconnecter de ce navigateur ?</span>
                <button type="button" className={s.danger} onClick={handleLogout} disabled={leaving}>
                  {leaving ? "Déconnexion…" : "Oui, me déconnecter"}
                </button>
                <button
                  type="button"
                  className={s.ghost}
                  onClick={() => setConfirming(false)}
                  disabled={leaving}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>

          {logoutError && (
            <p className={s.error} role="alert">
              {logoutError}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}