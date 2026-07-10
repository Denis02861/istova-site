"use client";

import { useEffect, useRef, useState } from "react";
import BlurFade from "./magicui/BlurFade";

const TEAS = [
  {
    img: "/tea/assam-thyme.webp",
    name: "АССАМ С ЧАБРЕЦОМ",
    desc: "Чёрный чай с глубоким вкусом и душистыми нотами чабреца. Согревает и возвращает в тонус.",
  },
  {
    img: "/tea/taiga.webp",
    name: "ТАЁЖНЫЙ СБОР",
    desc: "Ароматный чёрный чай с пихтой, лесными ягодами и северными травами. Погружает в спокойствие таёжного леса.",
  },
  {
    img: "/tea/milk-oolong.webp",
    name: "МОЛОЧНЫЙ УЛУН",
    desc: "Мягкий китайский улун со сливочным ароматом и бархатным послевкусием. Окутывает теплом и мягко успокаивает.",
  },
  {
    img: "/tea/sencha.webp",
    name: "СЕНЧА С ЛЕМОНГРАССОМ И ИМБИРЁМ",
    desc: "Купаж традиционного японского зелёного чая с бодрящим цитрусом и пряным имбирём. Мягко тонизирует и настраивает на продолжение дня.",
  },
  {
    img: "/tea/fruit.webp",
    name: "ФРУКТОВЫЙ СБОР",
    desc: "Насыщенный красный чай с приятной кислинкой и сочными нотами спелых фруктов. Освежает и поднимает настроение.",
  },
  {
    img: "/tea/soba.webp",
    name: "ГРЕЧИШНЫЙ ЧАЙ С ЯБЛОКОМ И КОРИЦЕЙ",
    desc: "Злаковый чай с ароматом печёного яблока, корицы и тёплыми ореховыми нотами.",
  },
  {
    img: "/tea/meadow.webp",
    name: "ЛУГОВОЙ ТРАВЯНОЙ СБОР",
    desc: "Душистые травы с природным послевкусием. Ощущается как выдох после насыщенного дня.",
  },
  {
    img: "/tea/chamomile-melissa.webp",
    name: "РОМАШКА И МЕЛИССА",
    desc: "Цветочные ноты ромашки и лёгкая свежесть мелиссы. Мягко расслабляет и готовит ко сну.",
  },
];

function TeaRow({ img, name, desc }: { img: string; name: string; desc: string }) {
  const rowRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const el = rowRef.current;
    if (!el) return;

    let triggered = false;
    let raf = 0;

    const check = () => {
      raf = 0;
      if (triggered) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top < vh * 0.75 && rect.bottom > vh * 0.1) {
        triggered = true;
        // двойной rAF, чтобы браузер точно применил начальный класс перед transition
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setInView(true));
        });
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <article
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-4 md:gap-4 py-5 md:py-8"
    >
      <div className="overflow-visible">
        <img
          src={img}
          alt={name}
          loading="lazy"
          decoding="async"
          className={`w-full h-auto object-contain will-change-transform transition-all duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-24"
          }`}
        />
      </div>
      <div className="md:pl-4">
        <h3 className="font-display text-xl md:text-2xl text-brand tracking-tight mb-2 md:mb-3">
          {name}
        </h3>
        <p className="text-sm md:text-base text-brand-dark/75 leading-relaxed">
          {desc}
        </p>
      </div>
    </article>
  );
}

export default function TeaCard() {
  return (
    <section id="tea" className="bg-sand">
      <div className="bg-moss py-8">
        <BlurFade delay={0.05} yOffset={16}><h2 className="font-display text-3xl md:text-4xl text-sand text-center tracking-tight">
          Чайная карта
        </h2></BlurFade>
      </div>

      <div className="container mx-auto px-6 pt-12 md:pt-16 pb-16 relative">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-16">
          <p className="text-base md:text-lg text-brand-dark/85 leading-relaxed">
            Чай — часть ритуала. Сопровождает встречу и завершает программу в тишине лаунж-зоны. Подбираем сорт под ваше состояние и время суток.
          </p>
        </div>

        <div className="max-w-5xl mx-auto divide-y divide-brand/10">
          {TEAS.map((t) => (
            <TeaRow key={t.name} {...t} />
          ))}
        </div>

        <p className="text-center text-xs md:text-sm text-brand-dark/60 italic mt-14 max-w-xl mx-auto">
          Карта может меняться по сезону. Точный сорт на день визита администратор подберёт при встрече.
        </p>
      </div>
    </section>
  );
}
