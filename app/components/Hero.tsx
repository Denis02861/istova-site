"use client";

import { track } from "../lib/track";
import NumberTicker from "./magicui/NumberTicker";
import Aurora from "./magicui/Aurora";

export default function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] flex items-center justify-center bg-sand relative pt-20 overflow-hidden">
      <Aurora />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="sr-only">Истова — head spa и спа для головы в Санкт-Петербурге, Васильевский остров</h1>
        <img
          src="/logo/istova-wordmark.webp"
          alt="ИСТŌВА"
          fetchPriority="high" decoding="async" className="h-20 md:h-28 w-auto mx-auto mb-6" width={728} height={218} />
        <p className="font-display italic text-2xl md:text-4xl text-brand mb-6 max-w-2xl mx-auto leading-snug">
          Не нужен особый день,<br/>чтобы почувствовать себя особенной
        </p>
        <p className="text-xs md:text-sm tracking-widest uppercase text-brand/60 mb-12">
          СПА · <NumberTicker value={256} className="tabular-nums" /> м² · Васильевский · открытие записей 22.07.2026
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            href="#booking"
            onClick={() => track("BOOKING_CLICK", { from: "hero" })}
            className="inline-flex items-center px-8 py-3 bg-brand text-sand rounded-full font-medium hover:bg-brand-dark active:scale-[0.98] transition-[transform,background-color,color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            Записаться
          </a>
          <a
            href="#concept"
            className="inline-flex items-center gap-2 px-8 py-3 border border-brand text-brand rounded-full hover:bg-brand hover:text-sand active:scale-[0.98] transition-[transform,background-color,color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            О пространстве
          </a>
        </div>

        <p className="text-sm text-brand/60 tracking-wide mt-8 pt-8 border-t border-brand/10">ул. Беринга, 23 к. 2 · Васильевский остров</p>
      </div>
    </section>
  );
}
