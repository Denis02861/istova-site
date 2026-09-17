"use client";

import { useRef, useState } from "react";
import BlurFade from "./magicui/BlurFade";

/**
 * Реальные отзывы гостей с Яндекс.Карт (org 63939829435).
 * Карусель: листается свайпом/стрелками, карточка раскрывается по клику.
 * Обновлять по мере накопления. Источник виден ссылкой на карточку.
 */
const YANDEX_URL = "https://yandex.ru/maps/org/istova/63939829435/reviews/";
const GIS_URL = "https://2gis.ru/spb/search/Истова%20Беринга%2023";
const EASE = "cubic-bezier(0.23,1,0.32,1)";

/**
 * Рейтинг по площадкам. Цифры сверены 17.09.2026 и обязаны совпадать с
 * aggregateRating в layout.tsx: расхождение видимого и размеченного рейтинга
 * площадки считают нарушением. Обновлять оба места разом.
 */
const RATINGS = [
  { place: "оценки на Яндекс Картах", count: 44, href: YANDEX_URL },
  { place: "оценок в 2ГИС", count: 16, href: GIS_URL },
];

type Review = { text: string; name: string; date: string };

const reviews: Review[] = [
  {
    text: "Невероятное уникальное место, которое помогает почувствовать себя живым человеком. Здесь прекрасно и комфортно всё: начиная от приёма с выбора ароматических масел, заканчивая вкусным чаем с мёдом и сладостями в завершении посещения. Очень дружелюбный персонал и лёгкая запись, большое спасибо, обязательно вернусь снова.",
    name: "Екатерина Р.",
    date: "сентябрь 2026",
  },
  {
    text: "Очень давно хотела отказаться от телефона и провести время наедине с собой, и это место мне в этом помогло. На целых 75 минут я выпала из этого мира. У мастера самые золотые руки. Администратор очень вежливая и общительная девушка. Атмосфера очень расслабляющая, если вы думаете, то не думайте, а идите.",
    name: "Анастасия Калашникова",
    date: "сентябрь 2026",
  },
  {
    text: "Были с подружкой на совместном спа-ритуале Явь. Остались в полном восторге. Атмосфера пространства очень приятная и спокойная. Спасибо большое за прекрасно проведённое время.",
    name: "Сурая А.",
    date: "сентябрь 2026",
  },
  {
    text: "Были на парном спа, всё очень понравилось, рекомендую мастеров Анну и Екатерину, программа Лада. А ещё у них очень вкусный чай.",
    name: "Суровцев А.",
    date: "сентябрь 2026",
  },
  {
    text: "Если вы ещё здесь не были — вы не знаете, что такое отдых нервной системы. Я как ценитель массажа и спа просто в восторге. Каждый сотрудник будто с обложки журнала и такой же красивый душой. Всё продумано до мелочей — от выбора масла для массажа до угощений после. Пространство выглядит как дорогой тихий люкс. Очень расслабляется голова и нервная система. Поющие чаши, сауна, вся косметика Davines.",
    name: "Ира Ерёмина",
    date: "июль 2026",
  },
  {
    text: "Очень понравилось и пространство, и сама программа. Всё чисто, уютно, каждая деталь продумана. Никаких громких разговоров — мастер говорит мягко, шёпотом и только по делу, для меня это было важно. Отдельный респект за выбор косметики, после Davines волосы мягкие. А спа головы — это что-то нереальное.",
    name: "Екатерина",
    date: "август 2026",
  },
  {
    text: "Получила невероятное расслабление — комплекс массажа, уход за волосами и водяная дуга. Даже уснула во время процедуры, настолько расслабилась. Мастер очень приятная, было комфортно. За 75 минут буквально становишься новым человеком. Отдельно отмечу чаепитие после и приглушённый свет — идеальные дополнения.",
    name: "Софья",
    date: "август 2026",
  },
  {
    text: "Были вместе с мамой на программе Родник. Очень понравились мастера — у меня был мастер с невероятно нежными руками, лёгкий приятный массаж. И, конечно, впервые попробовала золотую дугу. Спа для волос — это роскошь, всё на продукции Davines. Если хочется тотального расслабления — это сюда. Остались очень довольны.",
    name: "Анна",
    date: "август 2026",
  },
  {
    text: "Первый раз побывали в таком роскошном месте — прошли программу Родник. За полтора часа полный релакс и восстановление, тело в блаженстве, душа поёт. Всё очень чисто и сделано с любовью и заботой. Персонал внимательный и нежный. В конце — чай из трав на выбор. Рекомендую, если цените тишину, заботу и эстетику.",
    name: "Светлана Ивандюк",
    date: "август 2026",
  },
  {
    text: "Была в первый раз — это кайф. Девушки умнички, продумано абсолютно всё: от входа до выхода, с такой заботой о тебе. Отдельная благодарность мастеру Софье — работает с теплотой, было очень комфортно. Хочется возвращаться.",
    name: "Ксения",
    date: "август 2026",
  },
  {
    text: "Очень приятная студия. Ходила на программу Явь и осталась очень довольна: волосы после процедуры мягкие, лицо сияет, настроение поднялось. А молочный улун в конце был особенно вкусный.",
    name: "Елизавета",
    date: "август 2026",
  },
  {
    text: "Была на процедуре Лада. При входе предложили выбрать аромат масел для массажа — приятно удивил выбор. Вышла очень расслабленной после рабочей недели. Салон новый, всё чисто, работают профессионалы. Буду советовать всем.",
    name: "Люся",
    date: "август 2026",
  },
  {
    text: "Очень рекомендую место! На массаж приду сюда ещё не раз и точно посоветую знакомым. Спа-процедуры тоже 10 из 10, была первый раз, но планирую стать частым гостем. И отдельный плюс за безумно красивый интерьер.",
    name: "Ника",
    date: "август 2026",
  },
  {
    text: "Всё прошло здорово. Нам с девушкой понравилось. Ребята милые, красиво, и район приятный. Второе прикольное спа, в котором я был в городе.",
    name: "Виктор",
    date: "август 2026",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-brand-light" aria-label="Оценка 5 из 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.26L21.5 9.3l-4.75 4.64L17.9 21 12 17.5 6.1 21l1.15-7.06L2.5 9.3l6.6-1.04L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const el = trackRef.current;
    const card = el?.querySelector("figure");
    return card ? card.clientWidth + 20 : 340;
  };

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / step()));
  };

  return (
    <section id="reviews" className="py-20 md:py-32 bg-sand-deep/25 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <BlurFade delay={0.05} yOffset={16}>
          <div className="text-center mb-3">
            <span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">Отзывы гостей</span>
          </div>
        </BlurFade>
        <BlurFade delay={0.12} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-3 text-center tracking-tight">
            Что говорят гости
          </h2>
        </BlurFade>
        <BlurFade delay={0.2} yOffset={16}>
          {/* Плашка рейтинга. Цифры обязаны совпадать с aggregateRating в layout.tsx
              и с тем, что сейчас на карточке Яндекса. Сверено 17.09.2026. */}
          <div className="flex flex-col items-center gap-4 mb-14">
            <div className="flex flex-wrap items-stretch justify-center gap-3">
              {RATINGS.map((r) => (
                <a
                  key={r.place}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 rounded-full bg-sand-soft ring-1 ring-brand/10 pl-6 pr-7 py-3 shadow-[0_18px_44px_-26px_rgba(116,68,54,0.55)] hover:ring-brand/25 hover:-translate-y-0.5 transition-[box-shadow,transform,--tw-ring-color] duration-[450ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                >
                  <span className="font-display text-[28px] leading-none text-brand tabular-nums">5,0</span>
                  <span className="flex flex-col gap-1.5">
                    <Stars />
                    <span className="text-[10px] uppercase tracking-[0.16em] text-brand/50">
                      {r.count} {r.place}
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <p className="text-center text-brand-dark/70 max-w-xl mx-auto">
              Живые отзывы гостей. Пролистайте и раскройте любой целиком.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.28} yOffset={18}>
          <div className="relative">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Предыдущие отзывы"
              className="group hidden md:flex absolute -left-3 top-[46%] -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-sand-soft/85 backdrop-blur-sm ring-1 ring-brand/10 text-brand shadow-[0_16px_40px_-18px_rgba(116,68,54,0.5)] hover:bg-brand hover:text-sand active:scale-95 transition-[transform,background-color,color] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              <span className="transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-0.5">
                <Arrow dir="left" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Следующие отзывы"
              className="group hidden md:flex absolute -right-3 top-[46%] -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-sand-soft/85 backdrop-blur-sm ring-1 ring-brand/10 text-brand shadow-[0_16px_40px_-18px_rgba(116,68,54,0.5)] hover:bg-brand hover:text-sand active:scale-95 transition-[transform,background-color,color] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              <span className="transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5">
                <Arrow dir="right" />
              </span>
            </button>

            <div
              ref={trackRef}
              onScroll={onScroll}
              className="flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 md:px-9 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
            >
              {reviews.map((r, i) => {
                const isOpen = open === i;
                const long = r.text.length > 200;
                return (
                  <figure key={i} className="group snap-start shrink-0 w-[86%] sm:w-[356px] pt-3 pb-1">
                    <div className="relative h-full rounded-[2rem] bg-sand/50 ring-1 ring-brand/10 p-1.5 shadow-[0_26px_60px_-32px_rgba(116,68,54,0.5)] transition-[transform,box-shadow] duration-[550ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_40px_80px_-34px_rgba(116,68,54,0.6)]">
                      <div className="relative h-full flex flex-col rounded-[1.625rem] bg-sand-soft p-7 pt-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)]">
                        <span aria-hidden="true" className="pointer-events-none absolute top-3 right-6 font-display text-[68px] leading-none text-brand-light/20 select-none">”</span>

                        <Stars />

                        <div
                          className="relative mt-5 overflow-hidden transition-[max-height] duration-[550ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                          style={{ maxHeight: isOpen ? "34rem" : long ? "8.75rem" : "17rem" }}
                        >
                          <blockquote className="font-sans text-[14.5px] md:text-[15px] text-brand-dark/85 leading-[1.72]">
                            {r.text}
                          </blockquote>
                          {long && !isOpen && (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-sand-soft via-sand-soft/80 to-transparent" />
                          )}
                        </div>

                        {long && (
                          <button
                            type="button"
                            onClick={() => setOpen(isOpen ? null : i)}
                            className="mt-4 self-start inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-brand/70 hover:text-brand active:scale-[0.97] transition-[color,transform] duration-300"
                          >
                            {isOpen ? "свернуть" : "читать полностью"}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? "rotate-180" : ""}`}>
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </button>
                        )}

                        <figcaption className="mt-auto pt-6 flex items-center gap-3">
                          <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sand font-display text-lg leading-none">
                            {r.name.trim().charAt(0)}
                          </span>
                          <span className="flex flex-col">
                            <span className="font-display text-brand text-[17px] tracking-tight leading-tight">{r.name}</span>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-brand/45 mt-1">{r.date}</span>
                          </span>
                        </figcaption>
                      </div>
                    </div>
                  </figure>
                );
              })}
            </div>

            <div className="flex justify-center gap-1.5 mt-8" aria-hidden="true">
              {reviews.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    i === active ? "w-6 bg-brand" : "w-1.5 bg-brand/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.4} yOffset={12}>
          <div className="text-center mt-12">
            <a
              href={YANDEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 pl-8 pr-3 py-3 border border-brand text-brand rounded-full hover:bg-brand hover:text-sand active:scale-[0.98] transition-[transform,background-color,color] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              Читать все отзывы на Яндексе
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/8 group-hover:bg-sand/20 transition-[background-color,transform] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </span>
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
