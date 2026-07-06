"use client";

import { track } from "../lib/track";
import Parallax from "./Parallax";
import MagneticButton from "./MagneticButton";

const STATS = [
  { v: "256", u: "м²", l: "пространства" },
  { v: "9", u: "", l: "авторских ритуалов" },
  { v: "2", u: "", l: "мира под одной крышей" },
];

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-sand relative pt-20 overflow-hidden">
      <Parallax speed={0.35} className="absolute bottom-8 right-4 md:bottom-24 md:right-8 w-16 md:w-48 opacity-10 md:opacity-20 pointer-events-none">
        <img
          src="/brand/decor/spiral.webp"
          alt=""
          aria-hidden="true"
          loading="lazy" decoding="async" className="w-full h-auto" width={512} height={512} />
      </Parallax>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="sr-only">Истова</h1>
        <img
          src="/logo/istova-wordmark.webp"
          alt="ИСТŌВА"
          fetchPriority="high" decoding="async" className="h-20 md:h-28 w-auto mx-auto mb-6 animate-breath" width={728} height={218} />
        <p className="font-display italic text-2xl md:text-4xl text-brand mb-6 max-w-2xl mx-auto leading-snug">
          Не нужен особый день,<br/>чтобы почувствовать себя особенной
        </p>
        <p className="text-xs md:text-sm tracking-widest uppercase text-brand/60 mb-12">
          Спа и пространство красоты · Васильевский остров
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <MagneticButton href="#booking" onClick={() => track("BOOKING_CLICK", { from: "hero" })} className="px-8 py-3 bg-brand text-sand hover:bg-brand-dark transition-colors">Записаться</MagneticButton>
          <MagneticButton href="#concept" strength={0.25} className="px-8 py-3 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors">О пространстве</MagneticButton>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-12 pt-8 border-t border-brand/10">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl md:text-5xl text-brand leading-none">
                {s.v}<span className="text-lg md:text-2xl text-brand/70">{s.u}</span>
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-brand-dark/60 mt-2 leading-tight">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-brand/60 tracking-wide">ул. Беринга, 23 к. 2 · Васильевский остров</p>
      </div>
    </section>
  );
}
