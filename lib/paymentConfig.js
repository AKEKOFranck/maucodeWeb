/* Cours payants. Un cours absent d'ici reste comme avant (modules après le gratuit : compte gratuit).
   Les modules gratuits (FREE_MODULES_PER_COURSE dans lib/config.js) restent ouverts à tous.
   Exemple : PAID_COURSES = { excel: { price: 5000 }, word: { price: 5000 } } */
import { FREE_MODULES_PER_COURSE } from "@/lib/config";

export const WAVE_NUMBER = "0507189082";

export const PAID_COURSES = {
  fondamentaux: { price: 5000 },
  "html-css": { price: 5000 },
};

export const isPaidCourse = (slug) => Object.hasOwn(PAID_COURSES, slug);
export const isPaidModule = (slug, index) => isPaidCourse(slug) && index >= FREE_MODULES_PER_COURSE;