"use client";

import { motion } from "motion/react";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import BlurFade from "./magicui/BlurFade";
import Aurora from "./magicui/Aurora";

const steps = [
  { n: "01", t: "Встреча", d: "Администратор встречает вас в холле, провожает в раздевалку и зону отдыха." },
  { n: "02", t: "Арома-выбор", d: "На ресепшене подбираете аромат, который будет сопровождать весь ритуал." },
  { n: "03", t: "Программа", d: "Выбранный ритуал. От 70 до 150 минут вашего времени." },
  { n: "04", t: "Чайная пауза", d: "После ритуала — выбранный чай по карте в тишине лаунж-зоны." },
  { n: "05", t: "Возвращение", d: "Плед, приглушённый свет, время. Возвращаемся в мир медленно." },
];

export default function Ritual() {
  return (
    <section id="ritual" className="py-24 bg-sand relative overflow-hidden">
      <Aurora />
      <Parallax speed={0.32} className="absolute bottom-6 left-4 md:top-12 md:left-8 md:bottom-auto w-14 md:w-44 opacity-10 md:opacity-15 pointer-events-none">
        <img src="/brand/decor/spiral.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-auto" width={512} height={512} />
      </Parallax>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-6"><span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">Пять шагов</span></div>
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center tracking-tight">Как проходит ваш визит</h2>
        </BlurFade>
        <p className="text-center text-brand-dark/70 max-w-xl mx-auto mb-20 leading-relaxed">
          От встречи в холле до тихого возвращения — путь, который не хочется прерывать.
        </p>

        <Reveal as="ol" stagger={220} className="max-w-3xl mx-auto relative">
          <div className="absolute left-[38px] md:left-[52px] top-4 bottom-4 w-px bg-gradient-to-b from-brand/5 via-brand/20 to-brand/5 pointer-events-none" aria-hidden="true" />
          {steps.map((step) => (
            <li key={step.n} className="relative flex gap-6 md:gap-10 pb-6 md:pb-8 last:pb-0 group">
              <div className="relative shrink-0 w-[76px] md:w-[104px] flex items-start justify-center transition-transform duration-500 ease-out md:group-hover:-translate-y-1">
                <span className="relative block font-display text-4xl md:text-6xl leading-none text-brand-dark transition-all duration-300 md:group-hover:text-brand md:group-hover:scale-105">{step.n}</span>
              </div>
              <div className="flex-1 pt-1 md:pt-3 transition-transform duration-500 ease-out md:group-hover:-translate-y-1">
                <h3 className="font-display text-xl md:text-2xl text-brand mb-3 md:mb-0 transition-colors duration-300 md:group-hover:text-brand-dark">{step.t}</h3>
                <div className="md:overflow-hidden md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100 md:transition-all md:duration-[600ms] md:ease-out md:pt-3">
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: 0.4, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="text-sm md:text-base text-brand-dark/75 leading-relaxed max-w-lg"
                  >
                    {step.d}
                  </motion.p>
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
