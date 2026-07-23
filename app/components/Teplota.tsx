"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BlurFade from "./magicui/BlurFade";

type Item = { name: string; desc: string; price: string };
type Group = { title: string; subtitle: string; hint: string; items: Item[] };

const groups: Group[] = [
  {
    title: "Прикосновение",
    subtitle: "Массажные практики",
    hint: "Для лица и тела",
    items: [
      { name: "Расслабляющий СПА-массаж", desc: "Медленные глубокие техники для снятия напряжения и возвращения лёгкости телу.", price: "60 мин — 4 300 ₽ · 90 мин — 5 900 ₽" },
      { name: "Тёплый массаж тела", desc: "Мягкая практика на тёплом масле свечи — для глубокого расслабления и ощущения тепла.", price: "60 мин — 4 500 ₽ · 90 мин — 6 100 ₽" },
      { name: "Энергия камня", desc: "Ручные техники и тёплые камни для глубокой проработки и расслабления тела.", price: "60 мин — 4 800 ₽ · 90 мин — 6 300 ₽" },
      { name: "Тишина", desc: "Расслабляющий массаж кожи головы руками и гребнями.", price: "20 мин — 2 500 ₽" },
      { name: "Глубина", desc: "Массаж лица, шейно-воротниковой зоны и кожи головы — для полного переключения.", price: "40 мин — 4 200 ₽" },
      { name: "Камень", desc: "Косметический массаж лица гуаша, роликами или криосферами — для свежести кожи.", price: "30 мин — 3 500 ₽" },
    ],
  },
  {
    title: "Тело",
    subtitle: "Самостоятельные уходы",
    hint: "Скраб · обёртывание · сауна",
    items: [
      { name: "Обновление", desc: "Скрабирование тела, тёплый душ и завершающий уход. Аромат выбираете перед практикой.", price: "30 мин — 3 500 ₽" },
      { name: "Укутывание", desc: "Финская сауна, питательное обёртывание, отдых в тепле и завершающий уход.", price: "50 мин — 4 200 ₽" },
      { name: "Обновление + Укутывание", desc: "Полный СПА-уход для кожи тела: прогревание, обновление, обёртывание и финиш.", price: "70 мин — 6 500 ₽" },
    ],
  },
  {
    title: "Малые ритуалы",
    subtitle: "Небольшие практики",
    hint: "Дополнение к любому ритуалу",
    items: [
      { name: "Тёплые кисти", desc: "Массаж кистей и уход с тёплым кремом.", price: "20 мин — 2 000 ₽" },
      { name: "Лёгкие стопы", desc: "Массаж стоп и голеней для снятия усталости и лёгкости.", price: "20 мин — 2 200 ₽" },
      { name: "Тёплые стопы", desc: "Массаж стоп и голеней с согреванием травяными мешочками.", price: "30 мин — 2 900 ₽" },
      { name: "Травяное тепло", desc: "Локальный ритуал с тёплыми травяными мешочками для выбранной зоны тела.", price: "20 мин — 2 500 ₽" },
      { name: "Тяжесть и тишина", desc: "Отдых под тяжёлым одеялом с тёплым компрессом для глаз — полное замедление.", price: "20 мин — 1 300 ₽" },
    ],
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Teplota() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="teplota" className="py-24 md:py-32 bg-brand-dark relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full border border-sand/25 text-[10px] uppercase tracking-[0.2em] text-sand/70 font-medium">
            Отдельные практики
          </span>
        </div>
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-sand mb-4 text-center tracking-tight">
            Теплота
          </h2>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-center text-sand/70 mb-12 max-w-xl mx-auto leading-relaxed">
            Иногда хочется прожить целый ритуал. Иногда — выбрать одно прикосновение.
            Выберите направление, чтобы увидеть практики.
          </p>
        </BlurFade>

        <div className="space-y-4">
          {groups.map((g, i) => {
            const isActive = active === i;
            return (
              <BlurFade key={g.title} delay={0.1 + i * 0.08} yOffset={20}>
                <div
                  className={`rounded-xl border transition-colors duration-700 ease-out ${
                    isActive
                      ? "border-sand/35 bg-sand/[0.06]"
                      : "border-sand/15 bg-sand/[0.02] hover:border-sand/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : i)}
                    aria-expanded={isActive}
                    className="group w-full text-left p-5 sm:p-6 flex items-start justify-between gap-3"
                  >
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl text-sand tracking-tight">{g.title}</h3>
                      <p className="text-sand/55 text-sm mt-1">{g.subtitle}</p>
                      <p className="text-sand/35 text-xs mt-0.5">{g.hint}</p>
                    </div>
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sand/25 text-sand/80 transition-transform duration-700 ease-out ${
                        isActive ? "rotate-[135deg] bg-sand/10" : "group-hover:rotate-90"
                      }`}
                      aria-hidden="true"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.75, ease: easeOut },
                          opacity: { duration: 0.5, ease: "easeOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.ul
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
                          className="px-5 sm:px-6 pb-2 divide-y divide-sand/10 border-t border-sand/12"
                        >
                          {g.items.map((it) => (
                            <motion.li
                              key={it.name}
                              variants={{
                                hidden: { opacity: 0, y: 18 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
                              }}
                              className="py-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6"
                            >
                              <div className="sm:flex-1">
                                <span className="text-sand text-[15px] font-medium tracking-wide uppercase">
                                  {it.name}
                                </span>
                                <p className="text-sand/55 text-sm leading-relaxed mt-0.5">{it.desc}</p>
                              </div>
                              <span className="text-sand/85 text-sm whitespace-nowrap tabular-nums shrink-0">
                                {it.price}
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </BlurFade>
            );
          })}
        </div>

        <BlurFade delay={0.2} yOffset={16}>
          <p className="text-center text-sand/45 text-xs mt-12 max-w-lg mx-auto leading-relaxed">
            Любую практику можно прожить отдельно или добавить к основному ритуалу Истовы.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
