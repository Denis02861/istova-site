"use client";

import BlurFade from "./magicui/BlurFade";
import CardTilt from "./magicui/CardTilt";
import Reveal from "./Reveal";

type Zone = { title: string; desc: string; img?: string };

const zones: Zone[] = [
  { title: "Спа для головы", desc: "Азиатская техника, аква-медитация с водной дугой", img: "/gallery/04-head-spa.jpg" },
  { title: "Финская сауна", desc: "70-90°C — расслабление мышц, дополняет уходы за телом", img: "/gallery/03-sauna.jpg" },
  { title: "Ритуалы для тела", desc: "Скрабирование натуральными скрабами, тёплые обёртывания", img: "/gallery/06-body.jpg" },
  { title: "Массаж", desc: "Мастера владеют техниками расслабляющего массажа. Забота в каждом прикосновении", img: "/gallery/05-massage.jpg" },
  { title: "Настройка", desc: "Первые минуты — плавное переключение из внешней суеты в состояние ритуала", img: "/gallery/01-nastroyka.jpg" },
  { title: "Спа-зона", desc: "Приватные кабинеты, чайная комната, зона тишины с тёплыми пледами", img: "/gallery/02-spa-zone.jpg" },
];

export default function Space() {
  return (
    <section id="space" className="py-24 bg-sand-soft relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">Пространство</span>
        </div>
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center tracking-tight">256 м² — из чего сложены ритуалы</h2>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-center text-brand-dark/70 mb-16 max-w-xl mx-auto leading-relaxed">
            Каждая зона работает вместе с другими. Плавные переходы между теплом и прохладой, ароматом и тишиной.
          </p>
        </BlurFade>
        <Reveal stagger={140} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {zones.map((z, i) => (
            <CardTilt key={i} maxTilt={9} scale={1.03}>
              <div className="relative aspect-[9/16] rounded-sm overflow-hidden bg-brand/5 shadow-[0_18px_50px_-15px_rgba(116,68,54,0.3)] hover:shadow-[0_30px_70px_-20px_rgba(116,68,54,0.5)] transition-shadow duration-500 border border-brand/10">
                {z.img && (
                  <img src={z.img} alt={z.title} width={720} height={1280} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
            </CardTilt>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
