"use client";

const steps = [
  { n: "01", t: "Встреча", d: "Администратор встречает вас в холле, провожает в раздевалку и зону отдыха." },
  { n: "02", t: "Арома-выбор", d: "На ресепшене подбираете аромат, который будет сопровождать весь ритуал.", img: "/gallery/04-head-spa.jpg" },
  { n: "03", t: "Программа", d: "Выбранный ритуал. От 70 до 150 минут вашего времени.", img: "/gallery/05-massage.jpg" },
  { n: "04", t: "Чайная пауза", d: "После ритуала — выбранный чай по карте в тишине лаунж-зоны." },
  { n: "05", t: "Возвращение", d: "Плед, приглушённый свет, время. Возвращаемся в мир медленно." },
];

import Parallax from "./Parallax";
import BlurFade from "./magicui/BlurFade";
import CardTilt from "./magicui/CardTilt";
import Aurora from "./magicui/Aurora";

export default function Ritual() {
  return (
    <section id="ritual" className="py-24 bg-sand relative overflow-hidden">
      <Aurora />
      <Parallax speed={0.32} className="absolute bottom-6 left-4 md:top-12 md:left-8 md:bottom-auto w-14 md:w-44 opacity-10 md:opacity-15 pointer-events-none">
        <img src="/brand/decor/spiral.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-auto" width={512} height={512} />
      </Parallax>
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-6"><span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">Пять шагов</span></div>
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center tracking-tight">Как проходит ваш визит</h2>
        </BlurFade>
        <p className="text-center text-brand-dark/70 max-w-xl mx-auto mb-20 leading-relaxed">
          От встречи в холле до тихого возвращения — путь, который не хочется прерывать.
        </p>

        <ol className="space-y-16 md:space-y-24">
          {steps.map((step, i) => {
            const withImg = !!step.img;
            const imgLeft = i % 2 === 0;
            return (
              <BlurFade key={step.n} delay={0.05} yOffset={30}>
                {withImg ? (
                  <li className="md:grid md:grid-cols-[300px_1fr] md:gap-14 md:items-center">
                    <div className={"mb-6 md:mb-0 " + (imgLeft ? "md:order-1" : "md:order-2")}>
                      <CardTilt maxTilt={6} scale={1.02}>
                        <div className="relative aspect-[9/16] rounded-sm overflow-hidden shadow-[0_20px_60px_-20px_rgba(116,68,54,0.4)] border border-brand/10 mx-auto max-w-[280px] md:max-w-none">
                          <img src={step.img} alt={step.t} className="w-full h-full object-cover" loading="lazy" width={720} height={1280} />
                        </div>
                      </CardTilt>
                    </div>
                    <div className={"flex gap-6 md:gap-8 " + (imgLeft ? "md:order-2" : "md:order-1")}>
                      <div className="shrink-0 w-[76px] md:w-[104px] flex items-start justify-center">
                        <div className="relative group">
                          <span className="absolute inset-0 rounded-full bg-brand/5 scale-100 group-hover:scale-125 transition-transform duration-500 ease-out" aria-hidden="true" />
                          <span className="relative block font-display text-4xl md:text-6xl leading-none text-brand/85 group-hover:text-brand transition-colors duration-300 px-2 py-1 bg-sand">{step.n}</span>
                        </div>
                      </div>
                      <div className="flex-1 pt-1 md:pt-3">
                        <h3 className="font-display text-xl md:text-2xl text-brand mb-3">{step.t}</h3>
                        <p className="text-sm md:text-base text-brand-dark/75 leading-relaxed max-w-lg">{step.d}</p>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li className="flex gap-6 md:gap-10 max-w-3xl mx-auto">
                    <div className="shrink-0 w-[76px] md:w-[104px] flex items-start justify-center">
                      <div className="relative group">
                        <span className="absolute inset-0 rounded-full bg-brand/5 scale-100 group-hover:scale-125 transition-transform duration-500 ease-out" aria-hidden="true" />
                        <span className="relative block font-display text-4xl md:text-6xl leading-none text-brand/85 group-hover:text-brand transition-colors duration-300 px-2 py-1 bg-sand">{step.n}</span>
                      </div>
                    </div>
                    <div className="flex-1 pt-1 md:pt-3">
                      <h3 className="font-display text-xl md:text-2xl text-brand mb-3">{step.t}</h3>
                      <p className="text-sm md:text-base text-brand-dark/75 leading-relaxed max-w-lg">{step.d}</p>
                    </div>
                  </li>
                )}
              </BlurFade>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
