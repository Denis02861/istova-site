"use client";

import BlurFade from "./magicui/BlurFade";
import CardTilt from "./magicui/CardTilt";
import Reveal from "./Reveal";

type Zone = { title: string; desc: string; img?: string };

const zones: Zone[] = [
  { title: "Спа-зона", desc: "Приватные кабинеты, чайная комната, зона тишины с тёплыми пледами" },
  { title: "Спа для головы", desc: "Азиатская техника, аква-медитация с водной дугой — авторская программа Истовы", img: "/services/04-head-spa.jpg" },
  { title: "Финская сауна", desc: "70-90°C — идеальное расслабление мышц. Дополнение к уходам за телом", img: "/services/03-sauna.jpg" },
  { title: "Ритуалы для тела", desc: "Скрабирование натуральными скрабами, тёплые обёртывания для питания и увлажнения кожи", img: "/services/06-body.jpg" },
  { title: "Парикмахерский зал", desc: "Отдельный вход, авторские кресла, ритуал ухода в атмосфере спа" },
  { title: "Лаунж после ритуала", desc: "Плед, приглушённый свет, время. Возвращение в мир — медленно" },
];

export default function Space() {
  return (
    <section id="space" className="py-24 bg-sand-soft relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">Пространство</span>
        </div>
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center tracking-tight">256 м² — 6 зон</h2>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-center text-brand-dark/70 mb-14 max-w-xl mx-auto">
            Каждая — со своим смыслом. Плавные переходы между теплом и прохладой, ароматом и тишиной, программой и отдыхом.
          </p>
        </BlurFade>
        <Reveal stagger={140} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {zones.map((z, i) => (
            <CardTilt key={i} maxTilt={9} scale={1.03}>
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-brand/10 shadow-[0_18px_50px_-15px_rgba(116,68,54,0.25)] hover:shadow-[0_30px_60px_-15px_rgba(116,68,54,0.4)] transition-shadow duration-500 bg-sand h-full">
                {z.img ? (
                  <>
                    <img
                      src={z.img}
                      alt={z.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-sand">
                      <h3 className="font-display text-2xl md:text-3xl mb-2 tracking-tight">{z.title}</h3>
                      <p className="text-sm text-sand/90 leading-relaxed">{z.desc}</p>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col justify-end p-6 bg-brand/5">
                    <h3 className="font-display text-2xl md:text-3xl text-brand mb-2 tracking-tight">{z.title}</h3>
                    <p className="text-sm text-brand-dark/75 leading-relaxed">{z.desc}</p>
                  </div>
                )}
              </div>
            </CardTilt>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
