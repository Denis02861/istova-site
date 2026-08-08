"use client";

import { track } from "../lib/track";
import NumberTicker from "./magicui/NumberTicker";
import Aurora from "./magicui/Aurora";
import BlurFade from "./magicui/BlurFade";

export default function Hero() {
  return (
    <section id="hero" className="min-h-[100dvh] flex items-center justify-center bg-sand relative pt-20 overflow-hidden">
      <Aurora />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="sr-only">Истова — head spa и спа для головы в Санкт-Петербурге, Васильевский остров</h1>

        <BlurFade delay={0.1} yOffset={20}>
          <img
            src="/logo/istova-wordmark.webp"
            alt="ИСТŌВА"
            fetchPriority="high" decoding="async" className="h-20 md:h-28 w-auto mx-auto mb-6" width={728} height={218} />
        </BlurFade>

        <BlurFade delay={0.28} yOffset={18}>
          <p className="font-display italic text-2xl md:text-4xl text-brand mb-6 max-w-2xl mx-auto leading-snug">
            Не нужен особый день,<br/>чтобы почувствовать себя особенной
          </p>
        </BlurFade>

        <BlurFade delay={0.42} yOffset={14}>
          <p className="text-xs md:text-sm tracking-widest uppercase text-brand/60 mb-12">
            СПА · <NumberTicker value={256} className="tabular-nums" /> м² · Васильевский · запишитесь онлайн
          </p>
        </BlurFade>

        <BlurFade delay={0.56} yOffset={14}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a
              href="#booking"
              onClick={() => track("BOOKING_CLICK", { from: "hero" })}
              className="inline-flex items-center justify-center px-9 py-3.5 bg-brand text-sand rounded-full font-medium shadow-[0_12px_40px_-10px_rgba(116,68,54,0.55)] hover:bg-brand-dark hover:shadow-[0_18px_55px_-10px_rgba(116,68,54,0.7)] active:scale-[0.98] transition-[transform,background-color,color,box-shadow] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              Записаться
            </a>
            <a
              href="#concept"
              className="inline-flex items-center justify-center gap-2 px-9 py-3.5 border border-brand text-brand rounded-full hover:bg-brand hover:text-sand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              О пространстве
            </a>
          </div>
        </BlurFade>

        <BlurFade delay={0.7} yOffset={12}>
          <p className="text-sm text-brand/60 tracking-wide mt-8 pt-8 border-t border-brand/10">ул. Беринга, 23 к. 2 · Васильевский остров</p>
        </BlurFade>
      </div>
    </section>
  );
}
