"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { track } from "../lib/track";

type Answer = "focus" | "time" | "mode";
type Focus = "body" | "hair" | "silence";
type Time = "morning" | "evening" | "any";
type Mode = "solo" | "duo" | "any";

type Rec = {
  slug: string;
  name: string;
  tag: string;
  price: string;
  dur: string;
};

const R: Record<string, Rec> = {
  zarya_telo:     { slug: "zarya-telo",     name: "ЗАРЯ | ТЕЛО",     tag: "УТРО · тело",          price: "9 200 ₽",  dur: "100 мин" },
  zarya_volosy:   { slug: "zarya-volosy",   name: "ЗАРЯ | ВОЛОСЫ",   tag: "УТРО · волосы",        price: "8 200 ₽",  dur: "90 мин" },
  sumerki_telo:   { slug: "sumerki-telo",   name: "СУМЕРКИ | ТЕЛО",  tag: "ВЕЧЕР · тело",         price: "10 500 ₽", dur: "100 мин" },
  sumerki_volosy: { slug: "sumerki-volosy", name: "СУМЕРКИ | ВОЛОСЫ",tag: "ВЕЧЕР · волосы",       price: "9 500 ₽",  dur: "90 мин" },
  otzvuk:         { slug: "otzvuk",         name: "ОТЗВУК",          tag: "ВЕЧЕР · тишина",       price: "13 000 ₽", dur: "2 ч" },
  yav:            { slug: "yav",            name: "ЯВЬ",             tag: "УТРО · короткий",      price: "6 800 ₽",  dur: "70 мин" },
  kedr:           { slug: "kedr",           name: "КЕДР",            tag: "МУЖСКОЙ · тело/борода",price: "7 200 ₽",  dur: "80 мин" },
  lada:           { slug: "lada",           name: "ЛАДА",            tag: "ЖЕНСКИЙ · глубокий",   price: "11 500 ₽", dur: "130 мин" },
  rodnik:         { slug: "rodnik",         name: "РОДНИК",          tag: "БЕРЕМЕННЫМ · мягко",   price: "9 000 ₽",  dur: "90 мин" },
};

function recommend(focus: Focus, time: Time, mode: Mode): Rec[] {
  if (focus === "silence") return [R.otzvuk, R.lada];
  if (focus === "body") {
    if (time === "morning") return [R.zarya_telo, R.yav];
    if (time === "evening") return [R.sumerki_telo, R.lada];
    return [R.sumerki_telo, R.zarya_telo];
  }
  if (focus === "hair") {
    if (time === "morning") return [R.zarya_volosy, R.kedr];
    if (time === "evening") return [R.sumerki_volosy, R.kedr];
    return [R.sumerki_volosy, R.zarya_volosy];
  }
  return [R.zarya_telo, R.sumerki_telo];
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [focus, setFocus] = useState<Focus | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);

  const recs = useMemo(() => (focus && time && mode ? recommend(focus, time, mode) : []), [focus, time, mode]);

  const reset = () => { setStep(0); setFocus(null); setTime(null); setMode(null); };

  const OPTIONS = {
    focus: [
      { v: "body" as Focus,    label: "На тело",              d: "массаж, тепло, кожа" },
      { v: "hair" as Focus,    label: "На волосы",            d: "кожа головы, уход, распускание" },
      { v: "silence" as Focus, label: "На тишину внутри",     d: "звук, дыхание, отдых" },
    ],
    time: [
      { v: "morning" as Time, label: "Утром / днём",       d: "проснуться, взбодриться" },
      { v: "evening" as Time, label: "Вечером",            d: "отпустить, замедлиться" },
      { v: "any" as Time,     label: "Без разницы",        d: "покажите оба варианта" },
    ],
    mode: [
      { v: "solo" as Mode, label: "Одной",       d: "тишина, никого рядом" },
      { v: "duo" as Mode,  label: "Вдвоём",      d: "с партнёром или подругой" },
      { v: "any" as Mode,  label: "Без разницы", d: "покажите оба варианта" },
    ],
  };

  return (
    <section id="quiz" className="py-24 bg-sand-soft border-y border-brand/10">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-xs uppercase tracking-widest text-brand/60 mb-4 text-center">Что вам ближе</div>
        <h2 className="font-display text-3xl md:text-5xl text-brand mb-4 text-center uppercase tracking-wider">
          Какой ритуал подойдёт вам
        </h2>
        <p className="text-center text-brand-dark/70 mb-12 max-w-xl mx-auto">
          Три вопроса — и подскажем 1-2 ритуала под ваш день. Меняется в любой момент.
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-1 w-10 rounded-full transition-colors duration-300 ${i <= step ? "bg-brand" : "bg-brand/15"}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-3">
            <div className="text-center text-brand-dark/80 mb-6">Фокус ритуала</div>
            {OPTIONS.focus.map((o) => (
              <button
                key={o.v}
                onClick={() => { setFocus(o.v); setStep(1); track("QUIZ_ANSWER", { step: "focus", v: o.v }); }}
                className="w-full text-left border border-brand/15 bg-sand/60 hover:bg-sand hover:border-brand/40 p-5 transition-all group"
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
                className="w-full text-left border border-brand/15 bg-sand/60 hover:bg-sand hover:border-brand/40 p-5 transition-all group"
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
                className="w-full text-left border border-brand/15 bg-sand/60 hover:bg-sand hover:border-brand/40 p-5 transition-all group"
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
              {recs.map((r) => (
                <div key={r.slug} className="border border-brand/20 bg-sand p-6 flex flex-col">
                  <div className="text-[10px] uppercase tracking-widest text-brand/60 mb-2">{r.tag}</div>
                  <div className="font-display text-2xl text-brand uppercase tracking-wider mb-3">{r.name}</div>
                  <div className="text-sm text-brand-dark/70 mb-4">
                    <span className="text-brand">{r.price}</span> · {r.dur}
                  </div>
                  <div className="mt-auto flex gap-3">
                    <Link href={`/programs/${r.slug}/`} className="text-xs uppercase tracking-widest text-brand/70 hover:text-brand py-2">Подробнее →</Link>
                    <a
                      href="#booking"
                      onClick={() => track("BOOKING_CLICK", { from: "quiz", slug: r.slug })}
                      className="ml-auto text-sm px-4 py-2 bg-brand text-sand hover:bg-brand-dark transition-colors"
                    >
                      Записаться
                    </a>
                  </div>
                </div>
              ))}
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
