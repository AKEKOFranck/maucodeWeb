/* Vérifie les fichiers de cours AVANT npm run dev ou le build.
   Usage : node scripts/check-courses.mjs
   Ne dépend d'aucun package et ne touche à rien : il lit seulement les fichiers. */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Fichiers de cours à contrôler : { fichier, nom de l'export }
const FILES = [
  { file: "lib/data/programming.js", name: "PROGRAMMING" },
  { file: "lib/data/htmlcss.js", name: "HTMLCSS" },
];

const SLUG = /^[a-z0-9-]{1,50}$/;
const COLOR = /^#[0-9a-fA-F]{6}$/;
const ICON = /^Fa[A-Za-z0-9]{1,40}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const CELL = /^([A-Z]{1,2})([1-9]\d{0,2})$/;
const HTML_LIKE = /<\s*\/?\s*[a-zA-Z!]|javascript\s*:|&#?\w+;/i;
/* Les champs de CODE (visuels code et playground) ont le droit d'avoir des balises,
   mais jamais de quoi exécuter ou charger quelque chose. */
const CODE_BAD = /<\s*\/?\s*(script|iframe|object|embed|meta|link|base|frame|frameset|applet)\b|javascript\s*:|data\s*:\s*text\/html|\bon[a-z]{3,}\s*=/i;

// Icônes déjà utilisées dans modules.js : une autre icône est signalée en avertissement
const KNOWN_ICONS = new Set(`FaFileWord FaFileExcel FaFilePowerpoint FaCompass FaFile FaKeyboard FaPen FaBold FaFont FaPalette
FaFloppyDisk FaPenToSquare FaFolderOpen FaArrowPointer FaWandMagicSparkles FaHeading FaAlignLeft FaAlignCenter FaAlignRight
FaImage FaListUl FaClipboardList Fa1 Fa2 Fa3 Fa5 FaCopy FaPaste FaEye FaPrint FaFilePdf FaPaperPlane FaHashtag FaCircleCheck
FaTableCells FaUsers FaCalculator FaBrain FaShuffle FaArrowDownAZ FaBarsStaggered FaChartColumn FaChartPie FaChartLine
FaMagnifyingGlassPlus FaFilm FaCirclePlus FaRegSquare FaDisplay FaShapes FaCircle FaSquare FaArrowRight FaFillDrip FaCloudRain
FaMountainSun FaWater FaScissors FaCircleHalfStroke FaPersonChalkboard FaStopwatch FaTrophy
FaHtml5 FaCss3Alt FaCode FaTerminal FaGamepad FaLayerGroup FaMobileScreenButton FaStar`.split(/\s+/));

const errors = [];
const warnings = [];

function load({ file, name }) {
  const full = path.join(root, file);
  if (!existsSync(full)) {
    errors.push(`${file} : fichier introuvable`);
    return null;
  }
  let src = readFileSync(full, "utf8");
  if (/^\s*import\s/m.test(src)) {
    errors.push(`${file} : ne doit contenir aucun import`);
    return null;
  }
  src = src.replace(new RegExp(`export\\s+const\\s+${name}\\s*=`), `const ${name} =`);
  try {
    return new Function(`${src}\n;return ${name};`)();
  } catch (e) {
    errors.push(`${file} : syntaxe invalide (${e.message})`);
    return null;
  }
}

const isStr = (v, max) => typeof v === "string" && v.trim().length > 0 && v.length <= max;

function text(where, value, max) {
  if (!isStr(value, max)) {
    errors.push(`${where} : texte manquant, vide ou trop long (max ${max})`);
    return;
  }
  if (HTML_LIKE.test(value)) errors.push(`${where} : contient du HTML ou un script, interdit : « ${value.slice(0, 40)}… »`);
}

/* Code : texte libre (balises permises), mais rien d'actif. Renvoie true si valide. */
function codeText(where, value, max) {
  if (!isStr(value, max)) {
    errors.push(`${where} : code manquant, vide ou trop long (max ${max})`);
    return false;
  }
  if (CODE_BAD.test(value)) {
    errors.push(`${where} : contient une balise ou un attribut interdit (script, iframe, meta, link, base, onclick...)`);
    return false;
  }
  return true;
}

function icon(where, value) {
  if (typeof value !== "string" || !ICON.test(value)) return errors.push(`${where} : nom d'icône invalide (${String(value)})`);
  if (!KNOWN_ICONS.has(value)) warnings.push(`${where} : icône « ${value} » absente de modules.js, vérifie qu'elle existe dans components/Lesson/icons.js`);
}

function colIndex(letters) {
  return [...letters].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0);
}

/* Même nettoyage que le jeu (components/Lesson/GameVisual.js) : les commentaires ne comptent pas */
const stripComments = (t) => t.replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "");

function playground(where, v) {
  if (!["html", "css"].includes(v.mode)) errors.push(`${where}.mode : doit être html ou css`);
  text(`${where}.mission`, v.mission, 220);
  if (v.example !== undefined) codeText(`${where}.example`, v.example, 800);
  if (v.mode === "css") codeText(`${where}.baseHtml`, v.baseHtml, 1200);
  else if (v.baseHtml !== undefined) errors.push(`${where}.baseHtml : seulement pour le mode css`);
  if (v.baseCss !== undefined) codeText(`${where}.baseCss`, v.baseCss, 600);
  const okStarter = codeText(`${where}.starter`, v.starter, 1500);
  const okSolution = codeText(`${where}.solution`, v.solution, 1500);
  if (!Number.isInteger(v.xp) || v.xp < 5 || v.xp > 50) errors.push(`${where}.xp : entier entre 5 et 50 attendu`);
  if (v.viewport !== undefined && typeof v.viewport !== "boolean") errors.push(`${where}.viewport : doit être true ou false`);

  if (!Array.isArray(v.checks) || v.checks.length < 1 || v.checks.length > 5) return errors.push(`${where}.checks : 1 à 5 vérifications attendues`);
  const compiled = [];
  v.checks.forEach((c, i) => {
    text(`${where}.checks[${i}].label`, c?.label, 100);
    if (!isStr(c?.re, 400)) return errors.push(`${where}.checks[${i}].re : expression régulière manquante ou trop longue`);
    try {
      compiled.push({ label: c.label, re: new RegExp(c.re, "i") });
    } catch (e) {
      errors.push(`${where}.checks[${i}].re : expression invalide (${e.message})`);
    }
  });
  if (compiled.length !== v.checks.length) return;

  // Auto-test : la solution doit réussir toutes les vérifications, le départ ne doit pas tout réussir
  if (okSolution) {
    const sol = stripComments(v.solution);
    compiled.forEach((c) => { if (!c.re.test(sol)) errors.push(`${where} : la solution échoue à la vérification « ${c.label} »`); });
  }
  if (okStarter && compiled.every((c) => c.re.test(stripComments(v.starter)))) {
    errors.push(`${where} : le code de départ réussit déjà toute la mission`);
  }
}

function visual(where, v) {
  if (!v || typeof v !== "object") return errors.push(`${where} : visuel manquant`);
  if (!["scene", "grid", "slide", "code", "terminal", "playground"].includes(v.type))
    return errors.push(`${where} : type de visuel invalide (${v.type}), attendu scene, grid, slide, code, terminal ou playground`);
  text(`${where}.caption`, v.caption, 200);
  if (v.type === "scene") {
    if (!Array.isArray(v.items) || v.items.length < 2 || v.items.length > 6) errors.push(`${where} : scene demande 2 à 6 items`);
    else v.items.forEach((it, i) => { icon(`${where}.items[${i}].icon`, it?.icon); text(`${where}.items[${i}].label`, it?.label, 60); });
    if (v.arrows !== undefined && typeof v.arrows !== "boolean") errors.push(`${where}.arrows : doit être true ou false`);
  } else if (v.type === "grid") {
    if (!Array.isArray(v.rows) || v.rows.length < 1 || v.rows.length > 12) return errors.push(`${where} : grid demande 1 à 12 lignes`);
    const width = Array.isArray(v.rows[0]) ? v.rows[0].length : 0;
    v.rows.forEach((r, i) => {
      if (!Array.isArray(r) || r.length !== width || width < 1 || width > 8) return errors.push(`${where}.rows[${i}] : toutes les lignes doivent avoir le même nombre de colonnes (1 à 8)`);
      r.forEach((c, j) => { if (typeof c !== "string" || c.length > 60 || HTML_LIKE.test(c)) errors.push(`${where}.rows[${i}][${j}] : cellule invalide`); });
    });
    if (!Array.isArray(v.highlight)) errors.push(`${where}.highlight : doit être une liste (vide si rien à surligner)`);
    else v.highlight.forEach((h) => {
      const m = CELL.exec(h);
      if (!m || colIndex(m[1]) > width || Number(m[2]) > v.rows.length) errors.push(`${where}.highlight : case « ${h} » hors du tableau`);
    });
  } else if (v.type === "slide") {
    text(`${where}.title`, v.title, 80);
    if (!Array.isArray(v.bullets) || v.bullets.length < 1 || v.bullets.length > 6) errors.push(`${where} : slide demande 1 à 6 puces`);
    else v.bullets.forEach((b, i) => text(`${where}.bullets[${i}]`, b, 80));
  } else if (v.type === "code") {
    if (!["html", "css"].includes(v.language)) errors.push(`${where}.language : doit être html ou css`);
    codeText(`${where}.code`, v.code, 1500);
  } else if (v.type === "terminal") {
    text(`${where}.title`, v.title, 40);
    if (!Array.isArray(v.lines) || v.lines.length < 1 || v.lines.length > 12) errors.push(`${where} : terminal demande 1 à 12 lignes`);
    else v.lines.forEach((l, i) => {
      if (!["cmd", "out", "ok", "warn"].includes(l?.k)) errors.push(`${where}.lines[${i}].k : doit être cmd, out, ok ou warn`);
      text(`${where}.lines[${i}].t`, l?.t, 120);
    });
  } else {
    playground(where, v);
  }
}

function list(where, arr, min, max, len) {
  if (!Array.isArray(arr) || arr.length < min || arr.length > max) return errors.push(`${where} : liste de ${min} à ${max} textes attendue`);
  arr.forEach((t, i) => text(`${where}[${i}]`, t, len));
}

function checkCourse(file, slug, c, seen) {
  const at = `${file} > ${slug}`;
  if (!SLUG.test(slug)) errors.push(`${at} : slug de cours invalide`);
  if (seen.has(slug)) errors.push(`${at} : slug de cours en double`);
  seen.add(slug);
  text(`${at}.software`, c.software, 40);
  text(`${at}.title`, c.title, 100);
  text(`${at}.intro`, c.intro, 400);
  icon(`${at}.icon`, c.icon);
  if (typeof c.accent !== "string" || !COLOR.test(c.accent)) errors.push(`${at}.accent : couleur invalide (format #rrggbb)`);
  if (!Array.isArray(c.modules) || c.modules.length === 0) return errors.push(`${at} : aucun module`);

  const slugs = new Set();
  c.modules.forEach((m, mi) => {
    const mat = `${at} > module ${mi + 1} (${m?.slug})`;
    if (!m || typeof m.slug !== "string" || !SLUG.test(m.slug)) return errors.push(`${mat} : slug de module invalide`);
    if (slugs.has(m.slug)) errors.push(`${mat} : slug de module en double`);
    slugs.add(m.slug);
    if (m.added !== undefined && (!DATE.test(m.added) || Number.isNaN(new Date(m.added).getTime()))) errors.push(`${mat}.added : date invalide (AAAA-MM-JJ)`);
    text(`${mat}.title`, m.title, 80);
    text(`${mat}.intro`, m.intro, 300);
    icon(`${mat}.icon`, m.icon);

    if (!Array.isArray(m.chapters) || m.chapters.length < 1 || m.chapters.length > 12) errors.push(`${mat} : 1 à 12 chapitres attendus`);
    else m.chapters.forEach((ch, ci) => {
      const cat = `${mat} > chapitre ${ci + 1}`;
      text(`${cat}.title`, ch?.title, 100);
      list(`${cat}.explain`, ch?.explain, 1, 4, 800);
      text(`${cat}.tip`, ch?.tip, 400);
      visual(`${cat}.visual`, ch?.visual);
    });

    if (!Array.isArray(m.quiz) || m.quiz.length < 3 || m.quiz.length > 12) errors.push(`${mat} : 3 à 12 questions de quiz attendues`);
    else m.quiz.forEach((q, qi) => {
      const qat = `${mat} > question ${qi + 1}`;
      text(`${qat}.q`, q?.q, 200);
      text(`${qat}.why`, q?.why, 300);
      list(`${qat}.options`, q?.options, 2, 5, 120);
      if (Array.isArray(q?.options)) {
        if (new Set(q.options.map((o) => String(o).trim().toLowerCase())).size !== q.options.length) errors.push(`${qat} : deux options identiques`);
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) errors.push(`${qat}.answer : doit être un entier entre 0 et ${q.options.length - 1}`);
      }
    });

    const ex = m.exercise;
    if (!ex || typeof ex !== "object") errors.push(`${mat} : exercice manquant`);
    else {
      text(`${mat}.exercise.title`, ex.title, 100);
      list(`${mat}.exercise.instructions`, ex.instructions, 1, 8, 300);
      list(`${mat}.exercise.correction`, ex.correction, 1, 8, 400);
      if (Array.isArray(ex.instructions) && Array.isArray(ex.correction) && ex.instructions.length !== ex.correction.length)
        warnings.push(`${mat}.exercise : ${ex.instructions.length} consignes pour ${ex.correction.length} corrections`);
      if (ex.visual !== undefined) visual(`${mat}.exercise.visual`, ex.visual);
    }
  });
}

const seen = new Set();
let courses = 0, modules = 0, chapters = 0, questions = 0;
for (const f of FILES) {
  const data = load(f);
  if (!data) continue;
  if (typeof data !== "object" || Array.isArray(data)) { errors.push(`${f.file} : l'export doit être un objet { slug: cours }`); continue; }
  for (const [slug, c] of Object.entries(data)) {
    courses++;
    checkCourse(f.file, slug, c, seen);
    for (const m of c?.modules ?? []) {
      modules++;
      chapters += m?.chapters?.length ?? 0;
      questions += m?.quiz?.length ?? 0;
    }
  }
}

warnings.forEach((w) => console.warn(`Avertissement : ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`ERREUR : ${e}`));
  console.error(`\n${errors.length} erreur(s). Corrige-les avant de lancer le site.`);
  process.exit(1);
}
console.log(`Aucun problème trouvé : ${courses} cours, ${modules} modules, ${chapters} chapitres, ${questions} questions.`);