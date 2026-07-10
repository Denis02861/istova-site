"use client";

import BlurFade from "./magicui/BlurFade";

const items = [
  {
    src: "/gallery/head-spa/jade.jpg",
    title: "Аква-медитация",
    desc: "Head spa под тёплой водой. Голова омывается непрерывным потоком из водной дуги, мастер работает нефритовыми скребками по коже головы. Японская техника — расслабляет глубже классического массажа, снимает напряжение с висков и шеи за 30 минут."
  },
  {
    src: "/gallery/head-spa/wooden.jpg",
    title: "Массаж головы",
    desc: "Ручной массаж с деревянными скребками. Работа по биоактивным точкам кожи головы усиливает микроциркуляцию, укрепляет корни волос, снимает мигренозное напряжение. Оливковое дерево в кабинете — символ восстановления и покоя."
  },
  {
    src: "/gallery/head-spa/aurora.jpg",
    title: "Массаж лица",
    desc: "Пластичный массаж мышц лица и шейно-воротниковой зоны. Мягкие движения возвращают тонус, снимают отёки после долгого рабочего дня, разглаживают статические заломы. В свете aurora — глубже, чем просто уход."
  },
];

export default function HeadSpa() {
  return (
    <section id="head-spa" className="py-24 md:py-32 bg-sand-soft relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">Наша визитка</span>
        </div>
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center tracking-tight">Head spa</h2>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-center text-brand-dark/70 mb-16 max-w-2xl mx-auto leading-relaxed">
            Восточная техника ухода за головой и лицом. То, за чем возвращаются к нам чаще всего.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it, i) => (
            <BlurFade key={i} delay={0.05 + i * 0.1} yOffset={30}>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-[0_25px_70px_-25px_rgba(116,68,54,0.4)] border border-brand/10 bg-brand/5 group">
                <img
                  src={it.src}
                  alt={it.title}
                  width={720}
                  height={1280}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover animate-ken-burns will-change-transform"
                  style={{ animationDelay: `${i * -4}s` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-sand">
                  <h3 className="font-display text-2xl md:text-3xl mb-3 tracking-tight">{it.title}</h3>
                  <p className="text-[13px] md:text-sm text-sand/90 leading-relaxed">{it.desc}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
