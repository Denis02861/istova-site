"use client";

import { track } from "../lib/track";
import Parallax from "./Parallax";

export default function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] flex items-center justify-center bg-sand relative pt-20 overflow-hidden">
      <img
        src="/brand/decor/spiral.webp"
        alt=""
        aria-hidden="true"
        loading="lazy" decoding="async"
        className="absolute bottom-8 right-4 md:bottom-24 md:right-8 w-16 md:w-48 opacity-10 md:opacity-20 pointer-events-none"
        width={512} height={512}
      />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="sr-only">Истова</h1>
        <img
          src="/logo/istova-wordmark.webp"
          alt="ИСТŌВА"
          fetchPriority="high" decoding="async" className="h-20 md:h-28 w-auto mx-auto mb-6" width={728} height={218} />
        <p className="font-display italic text-2xl md:text-4xl text-brand mb-6 max-w-2xl mx-auto leading-snug">
          Не нужен особый день,<br/>чтобы почувствовать себя особенной
        </p>
        <p className="text-xs md:text-sm tracking-widest uppercase text-brand/60 mb-12">
          СПА · 256 м² · Васильевский · открыт 2026
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            href="#booking"
            onClick={() => track("BOOKING_CLICK", { from: "hero" })}
            className="group inline-flex items-center gap-3 pl-8 pr-2 py-2 bg-brand text-sand rounded-full hover:bg-brand-dark active:scale-[0.98] transition-[transform,background-color,color] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <span className="font-medium">Записаться</span>
            <span className="w-10 h-10 rounded-full bg-sand/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]" aria-hidden="true">↗</span>
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
