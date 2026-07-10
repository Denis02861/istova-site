"use client";

import { useMemo, useState } from "react";
import BlurFade from "./magicui/BlurFade";
import { programs, type Program } from "../lib/programs-data";
import { track } from "../lib/track";

type Focus = "body" | "hair" | "silence";
type Time = "morning" | "evening" | "any";
type Mode = "solo" | "duo" | "any";

type RecItem = { kind: "single"; program: Program };

const byslug = (s: string) => programs.find((p) => p.slug === s)!;

function recommend(focus: Focus, time: Time, _mode: Mode): RecItem[] {
  // Возвращаем всегда одинаковые single-программы независимо от mode.
  // При mode=duo рендер сам покажет pair_price и бейдж «для двоих».
  if (focus === "silence") {
    return [{ kind: "single", program: byslug("otzvuk") }, { kind: "single", program: byslug("lada") }];
  }
  if (focus === "body") {
    if (time === "morning") return [{ kind: "single", program: byslug("zarya-telo") }, { kind: "single", program: byslug("yav") }];
    if (time === "evening") return [{ kind: "single", program: byslug("sumerki-telo") }, { kind: "single", program: byslug("lada") }];
    return [{ kind: "single", program: byslug("sumerki-telo") }, { kind: "single", program: byslug("zarya-telo") }];
  }
  if (focus === "hair") {
    if (time === "morning") return [{ kind: "single", program: byslug("zarya-volosy") }, { kind: "single", program: byslug("kedr") }];
    if (time === "evening") return [{ kind: "single", program: byslug("sumerki-volosy") }, { kind: "single", program: byslug("kedr") }];
    return [{ kind: "single", program: byslug("sumerki-volosy") }, { kind: "single", program: byslug("zarya-volosy") }];
  }
  return [{ kind: "single", program: byslug("zarya-telo") }, { kind: "single", program: byslug("sumerki-telo") }];
}

function openProgram(slug: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("istova:open-program", { detail: { slug } }));
  // прокрутка к секции programs
  const el = document.getElementById("programs");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [focus, setFocus] = useState<Focus | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);

  const recs = useMemo(
    () => (focus && time && mode ? recommend(focus, time, mode) : []),
    [focus, time, mode]
  );

  const reset = () => {
    setStep(0);
    setFocus(null);
    setTime(null);
    setMode(null);
  };

  const OPTIONS = {
    focus: [
      { v: "body" as Focus, label: "На тело", d: "массаж, тепло, кожа" },
      { v: "hair" as Focus, label: "На волосы", d: "кожа головы, уход, распускание" },
      { v: "silence" as Focus, label: "На тишину внутри", d: "звук, дыхание, отдых" },
    ],
    time: [
      { v: "morning" as Time, label: "Утром / днём", d: "проснуться, взбодриться" },
      { v: "evening" as Time, label: "Вечером", d: "отпустить, замедлиться" },
      { v: "any" as Time, label: "Без разницы", d: "покажите оба варианта" },
    ],
    mode: [
      { v: "solo" as Mode, label: "Только для себя", d: "тишина, никого рядом" },
      { v: "duo" as Mode, label: "Вдвоём", d: "с партнёром или близкими — парный ритуал" },
      { v: "any" as Mode, label: "Без разницы", d: "покажите оба варианта" },
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

  return (

    <section id="quiz" className="py-24 bg-sand-soft border-y border-brand/10">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-6"><span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium ">Что вам ближе</span></div>
        <BlurFade delay={0.05} yOffset={16}><h2 className="font-display text-3xl md:text-5xl text-brand mb-4 text-center tracking-tight">
          Какой ритуал подойдёт вам
        </h2></BlurFade>
        <p className="text-center text-brand-dark/70 mb-12 max-w-xl mx-auto">
          Три вопроса — и подскажем 1-2 ритуала под ваш день.
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1 w-10 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-brand" : "bg-brand/15"
              }`}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-3">
            <div className="text-center text-brand-dark/80 mb-6">Фокус ритуала</div>
            {OPTIONS.focus.map((o) => (
              <button
                key={o.v}
                onClick={() => { setFocus(o.v); setStep(1); track("QUIZ_ANSWER", { step: "focus", v: o.v }); }}
                className="w-full text-left border border-brand/15 bg-sand/60 hover:bg-sand hover:border-brand/40 p-5 transition-[background-color,border-color] duration-180 ease-out group"
              >
                <div className="font-display text-lg md:text-xl text-brand uppercase tracking-wider group-hover:translate-x-1 transition-transform">{o.label}</div>
                <div className="text-sm text-brand-dark/60 mt-1">{o.d}</div>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <div className="text-center text-brand-dark/80 mb-6">Когда вам приятнее</div>
            {OPTIONS.time.map((o) => (
              <button
                key={o.v}
                onClick={() => { setTime(o.v); setStep(2); track("QUIZ_ANSWER", { step: "time", v: o.v }); }}
                className="w-full text-left border border-brand/15 bg-sand/60 hover:bg-sand hover:border-brand/40 p-5 transition-[background-color,border-color] duration-180 ease-out group"
              >
                <div className="font-display text-lg md:text-xl text-brand uppercase tracking-wider group-hover:translate-x-1 transition-transform">{o.label}</div>
                <div className="text-sm text-brand-dark/60 mt-1">{o.d}</div>
              </button>
            ))}
            <button onClick={() => setStep(0)} className="mt-4 text-xs uppercase tracking-widest text-brand/60 hover:text-brand">← Назад</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="text-center text-brand-dark/80 mb-6">С кем идёте</div>
            {OPTIONS.mode.map((o) => (
              <button
                key={o.v}
                onClick={() => { setMode(o.v); setStep(3); track("QUIZ_ANSWER", { step: "mode", v: o.v }); }}
                className="w-full text-left border border-brand/15 bg-sand/60 hover:bg-sand hover:border-brand/40 p-5 transition-[background-color,border-color] duration-180 ease-out group"
              >
                <div className="font-display text-lg md:text-xl text-brand uppercase tracking-wider group-hover:translate-x-1 transition-transform">{o.label}</div>
                <div className="text-sm text-brand-dark/60 mt-1">{o.d}</div>
              </button>
            ))}
            <button onClick={() => setStep(1)} className="mt-4 text-xs uppercase tracking-widest text-brand/60 hover:text-brand">← Назад</button>
          </div>
        )}

        {step === 3 && recs.length > 0 && (
          <div>
            <div className="text-center text-brand-dark/80 mb-8">Ваши варианты</div>
            <div className="grid md:grid-cols-2 gap-5">
              {recs.map((r) => renderSingle(r.program, mode === "duo"))}
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
