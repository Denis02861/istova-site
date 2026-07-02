"use client";

import Parallax from "./Parallax";

export default function Concept() {
  return (
    <section id="concept" className="py-24 bg-sand-soft relative overflow-hidden">
      <Parallax speed={0.4} className="absolute top-4 right-4 md:top-12 md:right-8 w-14 md:w-44 opacity-15 md:opacity-20 pointer-events-none">
        <img
          src="/brand/decor/bird.webp"
          alt=""
          aria-hidden="true"
          loading="lazy" decoding="async" className="w-full h-auto" width={512} height={512} />
      </Parallax>
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <h2 className="font-display text-4xl md:text-5xl text-brand mb-12 text-center uppercase tracking-wider">Истова — это про подлинное</h2>
        <div className="space-y-6 text-lg leading-relaxed text-brand-dark/90">
          <p>Истова — пространство ухода в Петербурге, где забота возвращается к себе истинной: без масок, без спешки, без обещаний которые невозможно сдержать.</p>
          <p>Здесь работают по программам, проверенным временем. Натуральные масла, ритмика тёплого и прохладного, тишина внутри, в которой можно услышать собственное дыхание.</p>
          <p>Мы строим место, в которое хочется возвращаться — не за процедурой, а за состоянием.</p>
        </div>

        <div className="mt-20 pt-16 border-t border-brand/15">
          <div className="text-xs uppercase tracking-widest text-brand/60 mb-8 text-center">
            Тихая идеальность
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12 text-center mb-16">
            <div>
              <h3 className="font-display text-2xl text-brand mb-4 uppercase tracking-wider">Принятие</h3>
              <p className="text-base text-brand-dark/80 leading-relaxed">
                Место, где вас не оценивают, а принимают такой, какая вы есть.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-brand mb-4 uppercase tracking-wider">Искренность</h3>
              <p className="text-base text-brand-dark/80 leading-relaxed">
                Без вылизанного глянца. Настоящие люди, эмоции и путь к себе.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl text-brand mb-4 uppercase tracking-wider">Целостность</h3>
              <p className="text-base text-brand-dark/80 leading-relaxed">
                Красота как состояние наполненности, которое уносишь с собой.
              </p>
            </div>
          </div>
          <p className="text-base md:text-lg text-brand-dark/85 leading-relaxed text-center italic max-w-2xl mx-auto">
            Истова — возможность отпустить роль «всеконтролирующей и ответственной», чтобы вернуться к себе и почувствовать свою ценность в атмосфере принятия.
          </p>
        </div>
      </div>
    </section>
  );
}
