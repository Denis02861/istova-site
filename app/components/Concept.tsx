"use client";

import Parallax from "./Parallax";
import Reveal from "./Reveal";
import BlurFade from "./magicui/BlurFade";
import CardTilt from "./magicui/CardTilt";

export default function Concept() {
  return (
    <section id="concept" className="py-24 bg-sand-soft relative overflow-hidden">
      <Parallax speed={0.4} className="absolute top-4 right-4 md:top-12 md:right-8 w-14 md:w-44 opacity-15 md:opacity-20 pointer-events-none">
        <img src="/brand/decor/bird.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-auto" width={512} height={512} />
      </Parallax>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <BlurFade delay={0.1} yOffset={20}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-16 text-center tracking-tight">Место, не услуга</h2>
        </BlurFade>

        <div className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-10 md:gap-14 items-center mb-20">
          <div className="space-y-6 text-lg leading-relaxed text-brand-dark/90 order-2 md:order-1">
            <BlurFade delay={0.25} yOffset={16}><p>Истова — спа в Петербурге. Место без масок, без спешки, без обещаний, которые невозможно сдержать.</p></BlurFade>
            <BlurFade delay={0.35} yOffset={16}><p>Здесь работают по программам, проверенным временем. Натуральные масла, ритмика тёплого и прохладного, тишина внутри, в которой можно услышать собственное дыхание.</p></BlurFade>
            <BlurFade delay={0.45} yOffset={16}><p>Место, в которое возвращаются не за процедурой, а за состоянием.</p></BlurFade>
          </div>
          <BlurFade delay={0.15} yOffset={20} className="order-1 md:order-2">
            <CardTilt maxTilt={7} scale={1.02}>
              <div className="relative aspect-[9/16] rounded-sm overflow-hidden shadow-[0_25px_70px_-20px_rgba(116,68,54,0.4)] border border-brand/10 mx-auto max-w-[320px] md:max-w-none">
                <img src="/gallery/01-nastroyka.jpg" alt="Настройка перед ритуалом" className="w-full h-full object-cover" loading="lazy" width={720} height={1280} />
              </div>
            </CardTilt>
          </BlurFade>
        </div>

        <div className="pt-16 border-t border-brand/15">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">Три опоры</span>
          </div>
          <Reveal stagger={220} className="grid md:grid-cols-6 gap-10 md:gap-14 mb-16">
            <div className="md:col-span-3 md:pr-8">
              <h3 className="font-display text-2xl md:text-3xl text-brand mb-4 tracking-tight">Принятие</h3>
              <p className="text-base text-brand-dark/80 leading-relaxed">Место, где вас не оценивают, а принимают такой, какая вы есть.</p>
            </div>
            <div className="md:col-span-3 md:pl-8 md:mt-16">
              <h3 className="font-display text-2xl md:text-3xl text-brand mb-4 tracking-tight">Искренность</h3>
              <p className="text-base text-brand-dark/80 leading-relaxed">Без глянца. Настоящие люди, реальные фото, живой опыт.</p>
            </div>
            <div className="md:col-span-4 md:col-start-2 md:mt-8">
              <h3 className="font-display text-2xl md:text-3xl text-brand mb-4 tracking-tight">Целостность</h3>
              <p className="text-base text-brand-dark/80 leading-relaxed">Красота как состояние наполненности, которое уносишь с собой.</p>
            </div>
          </Reveal>
          <p className="text-base md:text-lg text-brand-dark/85 leading-relaxed text-center italic max-w-2xl mx-auto">
            Возможность отложить роль «всё контролирую сама» и почувствовать что тебя держат.
          </p>
        </div>
      </div>
    </section>
  );
}
