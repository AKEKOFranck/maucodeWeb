/* Quiz : tout ce qui touche aux bonnes réponses reste côté SERVEUR. */
import "server-only";
import { COURSES } from "@/lib/data/modules";
import { isValidSlug } from "@/lib/attestation";

/* Cherche un module. Renvoie null si le cours ou le module n'existe pas. */
export function findModule(courseSlug, moduleSlug) {
  if (!isValidSlug(courseSlug) || !isValidSlug(moduleSlug)) return null;
  if (!Object.hasOwn(COURSES, courseSlug)) return null;
  const mods = COURSES[courseSlug].modules;
  const index = mods.findIndex((m) => m.slug === moduleSlug);
  if (index < 0) return null;
  return { index, moduleSlugs: mods.map((m) => m.slug), quiz: mods[index].quiz };
}

/* Version du module envoyée au navigateur : questions et options, sans réponses ni explications */
export function publicModule(mod) {
  return { ...mod, quiz: mod.quiz.map(({ q, options }) => ({ q, options })) };
}

/* Corrige un quiz. Renvoie null si les réponses sont mal formées.
   Seuil : 60 % (même règle que lib/progress.js et l'API d'attestation). */
export function gradeQuiz(quiz, answers) {
  const total = quiz.length;
  if (!Array.isArray(answers) || answers.length !== total) return null;
  for (let i = 0; i < total; i++) {
    const a = answers[i];
    if (!Number.isInteger(a) || a < 0 || a >= quiz[i].options.length) return null;
  }

  const flags = quiz.map((q, i) => answers[i] === q.answer);
  const score = flags.filter(Boolean).length;
  const passed = total >= 1 && score * 10 >= total * 6;

  // La bonne réponse n'est révélée que pour les questions réussies, ou si le module est validé.
  // L'explication (why) est toujours renvoyée.
  const results = quiz.map((q, i) => ({
    correct: flags[i],
    why: q.why,
    ...(flags[i] || passed ? { answer: q.answer } : {}),
  }));

  return { score, total, passed, results };
}