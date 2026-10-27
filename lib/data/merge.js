/*
  Fusionne le contenu complémentaire (extra.js) dans COURSES.
  Sécurité et robustesse : chaque chapitre et chaque question est contrôlé
  (types, tailles, doublons, nom d'icône) avant d'être ajouté. Ce qui est
  invalide est ignoré, et signalé dans le terminal en mode développement.
  Le contenu est affiché par React comme du texte : jamais de HTML.
*/

const MAX = { title: 100, text: 700, tip: 400, label: 70, option: 120, quiz: 20 };
const ICON = /^Fa[A-Za-z0-9]{1,40}$/;
const CELL = /^[A-F][1-8]$/;

const isStr = (v, max) => typeof v === "string" && v.trim() !== "" && v.length <= max;
const allStr = (a, max, maxN, minN = 1) =>
  Array.isArray(a) &&
  a.length >= minN &&
  a.length <= maxN &&
  a.every((x) => isStr(x, max)) &&
  new Set(a).size === a.length;

function okVisual(v) {
  if (v === undefined) return true;
  if (!v || typeof v !== "object" || !isStr(v.caption, MAX.text)) return false;

  if (v.type === "scene") {
    return (
      Array.isArray(v.items) &&
      v.items.length >= 1 &&
      v.items.length <= 5 &&
      v.items.every(
        (it) => it && typeof it.icon === "string" && ICON.test(it.icon) && isStr(it.label, MAX.label)
      ) &&
      new Set(v.items.map((it) => it.label)).size === v.items.length
    );
  }

  if (v.type === "grid") {
    return (
      Array.isArray(v.rows) &&
      v.rows.length >= 1 &&
      v.rows.length <= 8 &&
      v.rows.every(
        (r) =>
          Array.isArray(r) &&
          r.length >= 1 &&
          r.length <= 6 &&
          r.every((c) => typeof c === "string" && c.length <= 80)
      ) &&
      (v.highlight === undefined ||
        (Array.isArray(v.highlight) && v.highlight.every((h) => CELL.test(h))))
    );
  }

  if (v.type === "slide") {
    return isStr(v.title, MAX.title) && allStr(v.bullets, MAX.option, 6);
  }
  return false;
}

function warn(msg) {
  if (process.env.NODE_ENV !== "production") console.warn("[extra.js] " + msg);
}

// Retourne la liste des champs invalides (vide = chapitre valide)
function chapterErrors(c) {
  if (!c) return ["chapitre vide"];
  const errors = [];
  if (!isStr(c.title, MAX.title)) errors.push("title");
  if (!allStr(c.explain, MAX.text, 4)) errors.push("explain");
  if (!isStr(c.tip, MAX.tip)) errors.push("tip");
  if (!okVisual(c.visual)) errors.push("visual");
  return errors;
}

function questionErrors(q) {
  if (!q) return ["question vide"];
  const errors = [];
  if (!isStr(q.q, MAX.text)) errors.push("q");
  if (!allStr(q.options, MAX.option, 5, 2)) errors.push("options");
  if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < (q.options?.length ?? 0)))
    errors.push("answer");
  if (!isStr(q.why, MAX.text)) errors.push("why");
  return errors;
}

export function withExtra(base, extra) {
  warn(
    `withExtra appelée — cours base: [${Object.keys(base)}] / cours extra: [${Object.keys(extra ?? {})}]`
  );

  const out = {};
  for (const [courseSlug, course] of Object.entries(base)) {
    out[courseSlug] = {
      ...course,
      modules: course.modules.map((m) => {
        const add = extra?.[courseSlug]?.[m.slug];
        if (!add) return m;

        const titles = new Set(m.chapters.map((c) => c.title));
        const chapters = [...m.chapters];
        for (const c of add.chapters ?? []) {
          const errs = chapterErrors(c);
          if (errs.length === 0 && !titles.has(c.title)) {
            chapters.push(c);
            titles.add(c.title);
          } else {
            const why = errs.length ? errs.join(", ") : "titre déjà existant";
            warn(`chapitre ignoré (${courseSlug}/${m.slug}) : ${c?.title ?? "sans titre"} → ${why}`);
          }
        }

        const asked = new Set(m.quiz.map((q) => q.q));
        const quiz = [...m.quiz];
        for (const q of add.quiz ?? []) {
          const errs = questionErrors(q);
          if (errs.length === 0 && !asked.has(q.q) && quiz.length < MAX.quiz) {
            quiz.push(q);
            asked.add(q.q);
          } else {
            const why = errs.length ? errs.join(", ") : "doublon ou limite atteinte";
            warn(`question ignorée (${courseSlug}/${m.slug}) : ${q?.q ?? "sans texte"} → ${why}`);
          }
        }

        warn(`${courseSlug}/${m.slug} : ${chapters.length} chapitres, ${quiz.length} questions`);
        return { ...m, chapters, quiz };
      }),
    };
  }
  return out;
}