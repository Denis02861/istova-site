"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "./Reveal";
import BlurFade from "./magicui/BlurFade";

const VALUES = [
  { icon: "heart", title: "Без оценок", text: "Здесь вас не разглядывают. Можно прийти уставшей, без сил и настроения — это нормально." },
  { icon: "leaf", title: "По-честному", text: "Настоящие фото места и программ, без стоков и глянца." },
  { icon: "waves", title: "Остаётся с вами", text: "После визита спокойствие держится ещё несколько дней: легче засыпается, в голове тише." },
];

function ValueIcon({ k }: { k: string }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (k === "heart") return (<svg {...common}><path d="M12 20.5S3.8 14.3 3.8 8.9C3.8 6.3 5.9 4.2 8.5 4.2C10.1 4.2 11.4 5.2 12 6.3C12.6 5.2 13.9 4.2 15.5 4.2C18.1 4.2 20.2 6.3 20.2 8.9C20.2 14.3 12 20.5 12 20.5Z" /></svg>);
  if (k === "leaf") return (<svg {...common}><path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-.7 0-1 .3-1 1" /><path d="M8 16c2.5-3 5-4.5 8-5.5" /></svg>);
  return (<svg {...common}><path d="M2 9c2-1.6 3.5-1.6 5.5 0S11 10.6 13 9s3.5-1.6 5.5 0S22 10.6 22 10.6" /><path d="M2 14c2-1.6 3.5-1.6 5.5 0S11 15.6 13 14s3.5-1.6 5.5 0" /></svg>);
}

export default function Concept() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  // Птица медленно улетает вправо-вверх по мере скролла
  const birdX = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const birdY = useTransform(scrollYProgress, [0, 1], ["0%", "110%"]);
  const birdRotate = useTransform(scrollYProgress, [0, 1], [-2, 6]);
  const birdScale = useTransform(scrollYProgress, [0, 1], [1, 0.65]);
  const birdOpacity = useTransform(scrollYProgress, [0, 0.9], [0.9, 0]);

  return (
    <section ref={sectionRef} id="concept" className="py-16 md:py-24 bg-sand-soft relative overflow-hidden">
      <motion.img
        src="/brand/decor/bird.webp"
        alt=""
        aria-hidden="true"
        loading="lazy" decoding="async"
        style={{ x: birdX, y: birdY, rotate: birdRotate, scale: birdScale, opacity: birdOpacity }}
        className="absolute top-2 md:top-24 right-3 md:right-[6%] w-12 md:w-28 pointer-events-none will-change-transform"
        width={512} height={512}
      />
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <BlurFade delay={0.1} yOffset={20}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-12 text-center tracking-tight">Место, не услуга</h2>
        </BlurFade>
        <div className="space-y-6 text-lg leading-relaxed text-brand-dark/90">
          <BlurFade delay={0.25} yOffset={16}><p>Истова — спа в Петербурге, где не торопят и не обещают лишнего.</p></BlurFade>
          <BlurFade delay={0.35} yOffset={16}><p>Работаем по проверенным программам. Натуральные масла, тёплая и холодная вода, тишина.</p></BlurFade>
          <BlurFade delay={0.45} yOffset={16}><p>Сюда возвращаются, чтобы выдохнуть.</p></BlurFade>
        </div>

        <div className="mt-20 pt-16 border-t border-brand/15">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">Что для нас важно</span>
          </div>
          <Reveal stagger={180} className="grid md:grid-cols-3 gap-5 md:gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="group p-1.5 rounded-[1.75rem] bg-brand/5 ring-1 ring-brand/10 transition-[transform,box-shadow] duration-[700ms] ease-[cubic-bezier(0.32,0.72,0,1)] md:hover:-translate-y-1.5 md:hover:shadow-[0_30px_60px_-30px_rgba(116,68,54,0.45)]"
              >
                <div className="h-full rounded-[calc(1.75rem-0.375rem)] bg-sand-soft p-8 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-brand/[0.06] text-brand/80 ring-1 ring-brand/10">
                    <ValueIcon k={v.icon} />
                  </span>
                  <h3 className="font-display text-2xl text-brand mb-3 tracking-tight">{v.title}</h3>
                  <p className="text-[15px] text-brand-dark/80 leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </Reveal>
          
        </div>
      </div>
    </section>
  );
}
