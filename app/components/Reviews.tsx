"use client";

import BlurFade from "./magicui/BlurFade";

/**
 * Реальные отзывы гостей с Яндекс.Карт (org 63939829435).
 * Обновлять по мере накопления. Источник виден ссылкой на карточку.
 */
const YANDEX_URL = "https://yandex.ru/maps/org/istova/63939829435/reviews/";

type Review = { text: string; name: string; date: string };

const reviews: Review[] = [
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
    text: "Всё прошло здорово. Нам с девушкой понравилось. Ребята милые, красиво, и район приятный. Второе прикольное спа, в котором я был в городе.",
    name: "Виктор",
    date: "август 2026",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4 text-brand/70" aria-label="Оценка 5 из 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.9 6.26L21.5 9.3l-4.75 4.64L17.9 21 12 17.5 6.1 21l1.15-7.06L2.5 9.3l6.6-1.04L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-sand-deep/25 overflow-hidden">
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
          <p className="text-center text-brand-dark/70 mb-12 max-w-xl mx-auto">
            Живые отзывы с Яндекс.Карт — от тех, кто уже был на ритуале.
          </p>
        </BlurFade>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {reviews.map((r, i) => (
            <BlurFade key={i} delay={0.28 + i * 0.1} yOffset={18}>
              <figure className="h-full bg-sand-soft border border-brand/10 rounded-2xl p-7 flex flex-col shadow-[0_16px_45px_-20px_rgba(116,68,54,0.3)]">
                <Stars />
                <blockquote className="font-sans text-[14px] md:text-[15px] text-brand-dark/85 leading-relaxed flex-1 [display:-webkit-box] [-webkit-line-clamp:10] [-webkit-box-orient:vertical] overflow-hidden">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-brand/10 flex items-baseline justify-between gap-3">
                  <span className="font-display text-brand text-lg tracking-tight">{r.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-brand/50">{r.date}</span>
                </figcaption>
              </figure>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.55} yOffset={12}>
          <div className="text-center mt-12">
            <a
              href={YANDEX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border border-brand text-brand rounded-full hover:bg-brand hover:text-sand active:scale-[0.98] transition-[transform,background-color,color] duration-[200ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              Читать все отзывы на Яндексе
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
