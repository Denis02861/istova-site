"use client";

import TrackedLink from "./TrackedLink";
import Reveal from "./Reveal";
import CardTilt from "./magicui/CardTilt";
import BlurFade from "./magicui/BlurFade";

type Tier = { value: string; note: string; variant: "amount" | "program" | "placeholder" };

const tiers: Tier[] = [
  { value: "10 000 ₽",    note: "лёгкий подарок",       variant: "amount" },
  { value: "ЗАРЯ",        note: "конкретная программа", variant: "program" },
  { value: "выберите услугу",    note: "на любой ритуал",      variant: "placeholder" },
];

const styleFor = (v: Tier["variant"]) => {
  switch (v) {
    case "amount":
      return { cls: "font-display text-brand tracking-tight", size: "clamp(13px, 2.2vw, 24px)" };
    case "program":
      return { cls: "font-display text-brand tracking-tight", size: "clamp(13px, 2.2vw, 24px)" };
    case "placeholder":
      return { cls: "font-sans italic text-brand/60", size: "clamp(11px, 1.7vw, 16px)" };
  }
};

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 bg-sand">
      <div className="container mx-auto px-6 max-w-6xl">
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-6 text-center tracking-tight">Подарите ритуал</h2>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-center text-brand-dark/80 mb-14 max-w-xl mx-auto">
            Сертификат можно подарить на любую сумму или конкретную программу. Действителен 6 месяцев. Бумажная или электронная версия — на ваш выбор.
          </p>
        </BlurFade>
        <Reveal stagger={220} className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {tiers.map((t, i) => {
            const st = styleFor(t.variant);
            return (
              <CardTilt key={i} maxTilt={11} scale={1.04}>
                <div className="group relative aspect-[1748/1241] rounded-sm overflow-hidden shadow-[0_18px_50px_-12px_rgba(116,68,54,0.35)] hover:shadow-[0_30px_70px_-15px_rgba(116,68,54,0.45)] transition-shadow duration-500 border border-brand/10">
                  <img
                    src="/certificates/blank.jpg"
                    alt={`Подарочный сертификат ${t.value}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={1748}
                    height={1241}
                  />
                  <div
                    className={"absolute whitespace-nowrap " + st.cls}
                    style={{
                      top: "53%",
                      left: "24%",
                      fontSize: st.size,
                      lineHeight: 1,
                    }}
                  >
                    {t.value}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-brand/95 text-sand text-center py-2 text-xs uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {t.note}
                  </div>
                </div>
              </CardTilt>
            );
          })}
        </Reveal>
        <div className="text-center">
          <TrackedLink goal="BOOKING_CLICK" goalParams={{from:"certificates"}} href="#booking" className="inline-block px-8 py-3 bg-brand text-sand hover:bg-brand-dark transition-colors">Заказать сертификат</TrackedLink>
        </div>
      </div>
    </section>
  );
}
