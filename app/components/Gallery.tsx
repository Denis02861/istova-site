"use client";

import BlurFade from "./magicui/BlurFade";
import CardTilt from "./magicui/CardTilt";

const photos = [
  { src: "/gallery/01-nastroyka.jpg", alt: "Настройка перед спа-ритуалом" },
  { src: "/gallery/04-head-spa.jpg",  alt: "Спа для головы — аква-медитация" },
  { src: "/gallery/03-sauna.jpg",     alt: "Финская сауна" },
  { src: "/gallery/05-massage.jpg",   alt: "Массаж" },
  { src: "/gallery/06-body.jpg",      alt: "Ритуалы для тела" },
  { src: "/gallery/02-spa-zone.jpg",  alt: "Спа-зона" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-sand relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">
            Как это выглядит
          </span>
        </div>
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center tracking-tight">
            Фрагменты
          </h2>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-center text-brand-dark/70 mb-16 max-w-xl mx-auto leading-relaxed">
            Кадры из ритуалов. Настройка, вода, тепло, руки, ароматы, тишина.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {photos.map((p, i) => (
            <BlurFade key={i} delay={0.05 + i * 0.06} yOffset={30}>
              <CardTilt maxTilt={9} scale={1.03}>
                <div className="relative aspect-[9/16] rounded-sm overflow-hidden bg-brand/5 shadow-[0_20px_60px_-20px_rgba(116,68,54,0.35)] hover:shadow-[0_35px_80px_-20px_rgba(116,68,54,0.5)] transition-shadow duration-500 border border-brand/10">
                  <img
                    src={p.src}
                    alt={p.alt}
                    width={720}
                    height={1280}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </CardTilt>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
