"use client";
import { useState } from "react";

const items = [
  { q: "Что такое спа-ритуал?", a: "Это не «процедура» в привычном смысле. Это последовательность действий: подготовка пространства, аромавыбор, чай, основная работа с телом, отдых. От 60 до 180 минут." },
  { q: "Чем вы отличаетесь от обычного салона красоты?", a: "Фокус на состоянии, а не результате. Программы построены вокруг ощущений, а не «исправления». Здесь не торопят. Время — часть ритуала." },
  { q: "Можно ли беременным?", a: "Многие программы можно с 12-й недели по согласованию с вашим врачом. Есть отдельные мягкие программы для будущих мам. Перед записью уточните у администратора." },
  { q: "Как часто можно посещать?", a: "Зависит от программы. Лёгкие — еженедельно. Глубокие — раз в 2-4 недели. Регулярность важнее частоты." },
  { q: "Нужно ли что-то с собой?", a: "Всё необходимое — у нас. Полотенца, халат, тапочки, душ. Снять украшения и контактные линзы — на месте всё расскажет администратор." },
  { q: "Что с едой и питьём перед визитом?", a: "За 1.5-2 часа лучше не есть плотно. Воду пить можно и нужно. После ритуала — лёгкий перекус и тёплый чай." },
  { q: "Есть ли подарочные сертификаты?", a: "Да. Бумажные и электронные, на любую сумму или конкретную программу. Срок действия 6 месяцев." },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: it.a,
    },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 bg-sand-soft">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl text-brand mb-16 text-center uppercase tracking-wider">Частые вопросы</h2>
        <div className="space-y-4">
          {items.map((it, i) => (
            <article key={i} className="border-b border-brand/10 pb-4">
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="w-full text-left flex justify-between items-center py-3 min-h-[44px]">
                <span className="font-display text-lg text-brand">{it.q}</span>
                <span className="text-brand/60 text-2xl">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p className="text-brand-dark/80 leading-relaxed pb-3">{it.a}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
