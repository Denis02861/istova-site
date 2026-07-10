"use client";

import Reveal from "./Reveal";
import BlurFade from "./magicui/BlurFade";
import CardTilt from "./magicui/CardTilt";
import Aurora from "./magicui/Aurora";

const services = [
  { src: "/services/01-nastroyka.jpg", title: "Настройка", desc: "Первые минуты — плавное переключение из внешней суеты в состояние ритуала." },
  { src: "/services/02-spa-zone.jpg",  title: "Спа-зона",  desc: "Комплекс ритуалов для расслабления головы, тела и полной перезагрузки." },
  { src: "/services/03-sauna.jpg",     title: "Финская сауна", desc: "70-90°C — расслабление мышц и снятие напряжения. Дополняет уходы за телом." },
  { src: "/services/04-head-spa.jpg",  title: "Спа головы", desc: "Азиатская техника и аква-медитация с водной дугой. Авторские программы Истовы." },
  { src: "/services/05-massage.jpg",   title: "Массаж",     desc: "Мастера владеют техниками расслабляющего массажа. Забота в каждом прикосновении." },
  { src: "/services/06-body.jpg",      title: "Для тела",   desc: "Деликатное скрабирование натуральными скрабами, тёплые обёртывания." },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-sand-soft relative overflow-hidden">
      <Aurora />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">Из чего сложены ритуалы</span>
        </div>
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center tracking-tight">Услуги внутри пространства</h2>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-center text-brand-dark/70 mb-16 max-w-xl mx-auto">
            Каждый ритуал — сочетание нескольких практик. Настройка, сауна, спа для головы, массаж, ритуалы для тела — работают вместе, а не по отдельности.
          </p>
        </BlurFade>
        <Reveal stagger={140} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {services.map((s, i) => (
            <CardTilt key={i} maxTilt={10} scale={1.03}>
              <div className="relative aspect-[9/16] rounded-sm overflow-hidden shadow-[0_18px_50px_-15px_rgba(116,68,54,0.35)] hover:shadow-[0_30px_70px_-15px_rgba(116,68,54,0.5)] transition-shadow duration-500 border border-brand/10 bg-brand/5">
                <img
                  src={s.src}
                  alt={s.title}
                  width={720}
                  height={1280}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </CardTilt>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
