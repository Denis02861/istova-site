"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "./Reveal";
import BlurFade from "./magicui/BlurFade";

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
    <section ref={sectionRef} id="concept" className="py-24 bg-sand-soft relative overflow-hidden">
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
          <Reveal stagger={220} className="grid md:grid-cols-6 gap-10 md:gap-14 mb-16">
            <div className="md:col-span-3 md:pr-8">
              <h3 className="font-display text-2xl md:text-3xl text-brand mb-4 tracking-tight">Без оценок</h3>
              <p className="text-base text-brand-dark/80 leading-relaxed">Здесь вас не разглядывают. Можно прийти уставшей, без сил и настроения, это нормально.</p>
            </div>
            <div className="md:col-span-3 md:pl-8 md:mt-16">
              <h3 className="font-display text-2xl md:text-3xl text-brand mb-4 tracking-tight">По-честному</h3>
              <p className="text-base text-brand-dark/80 leading-relaxed">Настоящие фото места и программ, без стоков и глянца.</p>
            </div>
            <div className="md:col-span-4 md:col-start-2 md:mt-8">
              <h3 className="font-display text-2xl md:text-3xl text-brand mb-4 tracking-tight">Остаётся с вами</h3>
              <p className="text-base text-brand-dark/80 leading-relaxed">После визита спокойствие держится ещё несколько дней: легче засыпается, в голове тише.</p>
            </div>
          </Reveal>
          
        </div>
      </div>
    </section>
  );
}
