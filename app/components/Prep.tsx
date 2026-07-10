"use client";

import BlurFade from "./magicui/BlurFade";

const bring = [
  "Себя — без спешки и списка дел",
  "Косметичку (мы дадим косметику, но привычная — приятнее)",
  "Свободную одежду на выход",
];

const skip = [
  "Плотный обед — за 1.5-2 часа до визита лучше не есть",
  "Украшения и контактные линзы — снимите на месте",
  "Полотенце, халат, тапочки — всё уже есть у нас",
];

export default function Prep() {
  return (
    <section id="prep" className="py-24 bg-sand-deep/30">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-xs uppercase tracking-widest text-brand/60 mb-4 text-center">Первый визит</div>
        <BlurFade delay={0.05} yOffset={16}><h2 className="font-display text-3xl md:text-5xl text-brand mb-4 text-center uppercase tracking-wider">
          Что взять и о чём не думать
        </h2></BlurFade>
        <p className="text-center text-brand-dark/70 mb-14 max-w-xl mx-auto">
          Короткая практическая заметка перед первым визитом. Всё остальное — расскажет администратор.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-brand/15 bg-sand-soft p-8">
            <div className="font-display text-xl text-brand uppercase tracking-wider mb-5">
              <span className="text-brand/50 mr-2">+</span>Возьмите
            </div>
            <ul className="space-y-3 text-sm md:text-base text-brand-dark/85 leading-relaxed">
              {bring.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-brand/50 shrink-0 mt-0.5">/</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-brand/15 bg-sand-soft p-8">
            <div className="font-display text-xl text-brand uppercase tracking-wider mb-5">
              <span className="text-brand/50 mr-2">—</span>Не нужно
            </div>
            <ul className="space-y-3 text-sm md:text-base text-brand-dark/85 leading-relaxed">
              {skip.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-brand/50 shrink-0 mt-0.5">/</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
