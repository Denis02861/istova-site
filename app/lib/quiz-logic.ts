// Подбор ритуала в тесте на главной. До 16.10.2026 был деревом условий: «особый запрос»
// перебивал все ответы (80% сочетаний не смотрели на первые три вопроса), «вдвоём» не
// меняло результат в 140 из 150 случаев, а спа для головы выпадало первым в 12 из 300.
// Теперь каждый ответ добавляет баллы ритуалам, у которых это свойство действительно
// есть по составу (programs-data.ts), и итог зависит от всех пяти ответов.
import { programs, type Program } from "./programs-data";

export type Focus = "body" | "hair" | "both";
export type Time = "morning" | "evening";
export type Care = "peeling" | "sauna" | "aroma_fresh" | "aroma_soft" | "any";
export type Special = "none" | "pregnancy" | "first" | "him" | "her";
export type Mode = "solo" | "duo";

type Traits = {
  body: number; hair: number; both: number;
  morning: number; evening: number;
  sauna: boolean; peeling: boolean; fresh: boolean; soft: boolean;
  arc: boolean; // водный ритуал «Золотая дуга»
};

// Свойства по составу ритуала. Сауна, скраб, ароматы и дуга — из этапов в programs-data.ts.
const TRAITS: Record<string, Traits> = {
  "zarya-volosy":   { body: 0, hair: 3, both: 1, morning: 2, evening: 0, sauna: false, peeling: false, fresh: true,  soft: false, arc: true },
  "sumerki-volosy": { body: 0, hair: 3, both: 1, morning: 0, evening: 2, sauna: false, peeling: false, fresh: false, soft: true,  arc: true },
  "zarya-telo":     { body: 3, hair: 0, both: 1, morning: 2, evening: 0, sauna: true,  peeling: true,  fresh: true,  soft: false, arc: false },
  "sumerki-telo":   { body: 3, hair: 0, both: 1, morning: 0, evening: 2, sauna: true,  peeling: true,  fresh: false, soft: true,  arc: false },
  rodnik:           { body: 0, hair: 2, both: 1, morning: 1, evening: 1, sauna: false, peeling: false, fresh: false, soft: true,  arc: true },
  yav:              { body: 1, hair: 2, both: 2, morning: 1, evening: 1, sauna: false, peeling: false, fresh: false, soft: false, arc: true },
  kedr:             { body: 2, hair: 1, both: 3, morning: 1, evening: 1, sauna: true,  peeling: true,  fresh: true,  soft: false, arc: true },
  lada:             { body: 2, hair: 1, both: 3, morning: 1, evening: 1, sauna: true,  peeling: true,  fresh: false, soft: true,  arc: true },
  "kedr-lada":      { body: 2, hair: 1, both: 3, morning: 1, evening: 1, sauna: true,  peeling: true,  fresh: true,  soft: true,  arc: true },
};

// При равных баллах — сначала спа для головы: это то, за чем идут в Истову.
const TIE_ORDER = ["zarya-volosy", "sumerki-volosy", "yav", "rodnik", "zarya-telo", "sumerki-telo", "lada", "kedr", "kedr-lada"];

export type Answers = { focus: Focus; time: Time; care: Care; special: Special; mode: Mode };
export type Pick = { program: Program; reasons: string[] };

function score(slug: string, a: Answers): number {
  const t = TRAITS[slug];
  let s = 3 * t[a.focus] + t[a.time];
  if (a.care === "sauna" && t.sauna) s += 3;
  if (a.care === "peeling" && t.peeling) s += 3;
  if (a.care === "aroma_fresh" && t.fresh) s += 2;
  if (a.care === "aroma_soft" && t.soft) s += 2;
  if (a.special === "first" && slug === "yav") s += 5;
  if (a.special === "first" && slug === "rodnik") s += 1;
  if (a.special === "him") s += slug === "kedr" ? 4 : slug === "lada" ? -4 : 0;
  if (a.special === "her") s += slug === "lada" ? 4 : slug === "kedr" ? -4 : 0;
  if (slug === "kedr-lada") s += a.focus === "both" ? 6 : 1; // пара «ей и ему» — только вдвоём
  return s;
}

function reasons(slug: string, a: Answers): string[] {
  const t = TRAITS[slug];
  const r: string[] = [];
  if (a.special === "pregnancy") r.push("бережный ритуал, можно со второго триместра");
  if (a.special === "first" && slug === "yav") r.push("мягкое знакомство с Истовой");
  if (a.special === "him" && (slug === "kedr" || slug === "kedr-lada")) r.push("ритуал силы для него");
  if (a.special === "her" && (slug === "lada" || slug === "kedr-lada")) r.push("ритуал женственности для неё");
  if (a.focus === "hair" && t.hair >= 2) r.push(t.arc ? "спа для головы с «Золотой дугой»" : "уход за кожей головы");
  if (a.focus === "body" && t.body >= 2) r.push("работа с телом");
  if (a.focus === "both" && t.both >= 2) r.push("и тело, и голова");
  if (a.time === "morning" && t.morning >= 2) r.push("утренний, бодрит");
  if (a.time === "evening" && t.evening >= 2) r.push("вечерний, помогает замедлиться");
  if (a.care === "sauna" && t.sauna) r.push("есть сауна");
  if (a.care === "peeling" && t.peeling) r.push("есть скраб для тела");
  if (a.care === "aroma_fresh" && t.fresh) r.push("бодрящие ароматы");
  if (a.care === "aroma_soft" && t.soft) r.push("мягкие ароматы");
  if (a.mode === "duo") r.push(slug === "kedr-lada" ? "ей ЛАДА, ему КЕДР — одновременно" : "вдвоём одновременно, каждый со своим мастером");
  return r.slice(0, 4);
}

export function recommend(a: Answers): Pick[] {
  const by = (s: string) => programs.find((p) => p.slug === s);
  // Беременность — жёсткое правило: в остальных ритуалах сауна и прогрев.
  if (a.special === "pregnancy") {
    const p = by("rodnik");
    return p ? [{ program: p, reasons: reasons("rodnik", a) }] : [];
  }
  const pool = Object.keys(TRAITS).filter((s) => by(s) && (a.mode === "duo" || s !== "kedr-lada"));
  const ranked = pool
    .map((s) => ({ s, v: score(s, a) }))
    .sort((x, y) => y.v - x.v || TIE_ORDER.indexOf(x.s) - TIE_ORDER.indexOf(y.s));
  const top = ranked.slice(0, 2).map(({ s }) => s);
  // Особый запрос не перебивает остальные ответы, но его ритуал всегда среди двух вариантов:
  // первый раз — ЯВЬ, для него — КЕДР, для неё — ЛАДА.
  const signature = a.special === "first" ? "yav" : a.special === "him" ? "kedr" : a.special === "her" ? "lada" : null;
  if (signature && !top.includes(signature) && pool.includes(signature)) top[1] = signature;
  return top.map((s) => ({ program: by(s)!, reasons: reasons(s, a) }));
}
