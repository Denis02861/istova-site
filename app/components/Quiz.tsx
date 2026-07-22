"use client";

import { useMemo, useState } from "react";
import BlurFade from "./magicui/BlurFade";
import { programs, type Program } from "../lib/programs-data";
import { track } from "../lib/track";

type Focus = "body" | "hair" | "both";
type Time = "morning" | "evening";
type Care = "peeling" | "sauna" | "aroma_fresh" | "aroma_soft" | "any";
type Special = "none" | "pregnancy" | "first" | "him" | "her";
type Mode = "solo" | "duo";

const byslug = (s: string) => programs.find((p) => p.slug === s)!;

function recommend(focus: Focus, time: Time, care: Care, special: Special, mode: Mode): Program[] {
  // Особый запрос перебивает всё
  if (special === "pregnancy") return [byslug("rodnik")];
  if (special === "first") return [byslug("yav")];
  if (special === "him") return [byslug("kedr")];
  if (special === "her") return [byslug("lada")];

  // Всё вместе — полный ритуал
  if (focus === "both") {
    if (mode === "duo") return [byslug("kedr-lada")];
    const p = care === "aroma_soft" ? "lada" : care === "aroma_fresh" ? "kedr" : time === "morning" ? "kedr" : "lada";
    return [byslug(p)];
  }

  // Тело
  if (focus === "body") {
    const primary = time === "morning" ? "zarya-telo" : "sumerki-telo";
    let second: string;
    if (care === "peeling" || care === "sauna") second = "kedr";
    else second = time === "morning" ? "sumerki-telo" : "zarya-telo";
    return [byslug(primary), byslug(second)];
  }

  // Голова и волосы
  const primary = time === "morning" ? "zarya-volosy" : "sumerki-volosy";
  const second = time === "morning" ? "sumerki-volosy" : "zarya-volosy";
  return [byslug(primary), byslug(second)];
}

function openProgram(slug: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("istova:open-program", { detail: { slug } }));
  const el = document.getElementById("programs");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const STEPS = 5;

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [focus, setFocus] = useState<Focus | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [care, setCare] = useState<Care | null>(null);
  const [special, setSpecial] = useState<Special | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);

  const recs = useMemo(
    () => (focus && time && care && special && mode ? recommend(focus, time, care, special, mode) : []),
    [focus, time, care, special, mode]
  );

  const reset = () => {
    setStep(0);
    setFocus(null);
    setTime(null);
    setCare(null);
    setSpecial(null);
    setMode(null);
  };

  const OPTIONS = {
    focus: [
      { v: "body" as Focus, label: "На тело", d: "массаж, тепло, кожа" },
      { v: "hair" as Focus, label: "Голова и волосы", d: "head spa, уход, распускание" },
      { v: "both" as Focus, label: "Всё вместе", d: "тело и голова, полный ритуал" },
    ],
    time: [
      { v: "morning" as Time, label: "Утром / днём", d: "проснуться, взбодриться" },
      { v: "evening" as Time, label: "Вечером", d: "отпустить, замедлиться" },
    ],
    care: [
      { v: "peeling" as Care, label: "Скраб и пилинг тела", d: "обновление кожи" },
      { v: "sauna" as Care, label: "Сауна и прогрев", d: "тепло, расслабление мышц" },
      { v: "aroma_fresh" as Care, label: "Бодрящие ароматы", d: "цитрус, хвоя" },
      { v: "aroma_soft" as Care, label: "Мягкие ароматы", d: "роза, цветы" },
      { v: "any" as Care, label: "Не важно", d: "положусь на мастера" },
    ],
    special: [
      { v: "none" as Special, label: "Обычный визит", d: "подберите по настроению" },
      { v: "pregnancy" as Special, label: "Жду ребёнка", d: "бережный ритуал" },
      { v: "first" as Special, label: "Первый раз в спа", d: "мягкое знакомство" },
      { v: "him" as Special, label: "Акцент на нём", d: "сила и восстановление" },
      { v: "her" as Special, label: "Акцент на ней", d: "женственность" },
    ],
    mode: [
      { v: "solo" as Mode, label: "Одному", d: "только для себя" },
      { v: "duo" as Mode, label: "Вдвоём", d: "парный ритуал, цена за двоих" },
    ],
  };

  const renderSingle = (p: Program, asDuo = false) => {
    const showPair = asDuo && p.pair_price;
    let struckSoloDoubleFmt = "";
    let discountPct = 0;
    if (showPair) {
      const solo = parseInt(p.price.replace(/\D/g, ""), 10);
      const pair = parseInt((p.pair_price as string).replace(/\D/g, ""), 10);
      const soloDouble = solo * 2;
      struckSoloDoubleFmt = soloDouble.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
      discountPct = Math.max(0, Math.round((1 - pair / soloDouble) * 100));
    }
    return (
      <button
        key={p.slug}
        type="button"
        onClick={() => { track("QUIZ_RESULT_OPEN", { slug: p.slug }); openProgram(p.slug); }}
        className="w-full text-left border border-brand/20 bg-sand p-6 flex flex-col hover:border-brand/40 hover:-translate-y-0.5 transition-[transform,border-color] duration-200 ease-out"
      >
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <div className="text-[10px] uppercase tracking-widest text-brand/60">
            {p.accent?.split("·")[0].trim()}
          </div>
          {showPair && (
            <div className="text-[10px] uppercase tracking-widest text-brand/70 px-2 py-0.5 border border-brand/20 bg-sand-soft">
              × 2 для двоих
            </div>
          )}
        </div>
        <div className="font-display text-2xl text-brand uppercase tracking-wider mb-3">{p.name}</div>
        <p className="text-sm text-brand-dark/75 italic mb-4">{p.teaser}</p>
        {showPair ? (
          <div className="mt-auto flex flex-col gap-1 pt-3 border-t border-brand/10">
            <div className="flex justify-between items-baseline">
              <div className="text-xs uppercase tracking-widest text-brand/70">
                Вдвоём одновременно
                <div className="text-[10px] normal-case text-brand/50 mt-0.5">
                  <span className="line-through">{struckSoloDoubleFmt}</span> · −{discountPct}%
                </div>
              </div>
              <div className="font-display text-xl text-brand">{p.pair_price}</div>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-brand/60 mt-1">Открыть →</div>
          </div>
        ) : (
          <div className="mt-auto flex justify-between items-end pt-3 border-t border-brand/10">
            <div className="text-xs uppercase tracking-widest text-brand/70">Открыть →</div>
            <div className="text-right">
              <div className="font-display text-xl text-brand">{p.price}</div>
              <div className="text-[10px] text-brand-dark/60">~ {p.dur}</div>
            </div>
          </div>
        )}
      </button>
    );
  };

  const questionStep = (
    idx: number,
    title: string,
    opts: { v: string; label: string; d: string }[],
    onPick: (v: string) => void,
    back: number | null
  ) => (
    <div className="space-y-3">
      <div className="text-center text-brand-dark/80 mb-6">{title}</div>
      {opts.map((o) => (
        <button
          key={o.v}
          onClick={() => { onPick(o.v); setStep(idx + 1); track("QUIZ_ANSWER", { step: idx, v: o.v }); }}
          className="w-full text-left border border-brand/15 bg-sand/60 hover:bg-sand hover:border-brand/40 p-5 transition-[background-color,border-color] duration-180 ease-out group"
        >
          <div className="font-display text-lg md:text-xl text-brand uppercase tracking-wider group-hover:translate-x-1 transition-transform">{o.label}</div>
          <div className="text-sm text-brand-dark/60 mt-1">{o.d}</div>
        </button>
      ))}
      {back !== null && (
        <button onClick={() => setStep(back)} className="mt-4 text-xs uppercase tracking-widest text-brand/60 hover:text-brand">← Назад</button>
      )}
    </div>
  );

  return (
    <section id="quiz" className="py-24 bg-sand-soft border-y border-brand/10">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-6"><span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium ">Что вам ближе</span></div>
        <BlurFade delay={0.05} yOffset={16}><h2 className="font-display text-3xl md:text-5xl text-brand mb-4 text-center tracking-tight">
          Какой ритуал подойдёт вам
        </h2></BlurFade>
        <p className="text-center text-brand-dark/70 mb-12 max-w-xl mx-auto">
          Пять коротких вопросов — и подберём ритуал точно под вас.
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span
              key={i}
              className={`h-1 w-8 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-brand" : "bg-brand/15"
              }`}
            />
          ))}
        </div>

        {step === 0 && questionStep(0, "Фокус ритуала", OPTIONS.focus, (v) => setFocus(v as Focus), null)}
        {step === 1 && questionStep(1, "Когда вам приятнее", OPTIONS.time, (v) => setTime(v as Time), 0)}
        {step === 2 && questionStep(2, "Что важнее в уходе", OPTIONS.care, (v) => setCare(v as Care), 1)}
        {step === 3 && questionStep(3, "Особый запрос", OPTIONS.special, (v) => setSpecial(v as Special), 2)}
        {step === 4 && questionStep(4, "С кем идёте", OPTIONS.mode, (v) => setMode(v as Mode), 3)}

        {step === 5 && recs.length > 0 && (
          <div>
            <div className="text-center text-brand-dark/80 mb-8">
              {recs.length === 1 ? "Ваш ритуал" : "Ваш ритуал и ещё один вариант"}
            </div>
            <div className={`grid gap-5 ${recs.length > 1 ? "md:grid-cols-2" : "max-w-md mx-auto"}`}>
              {recs.map((p) => renderSingle(p, mode === "duo"))}
            </div>
            <div className="text-center mt-8">
              <button onClick={reset} className="text-xs uppercase tracking-widest text-brand/60 hover:text-brand">
                Пройти заново
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
