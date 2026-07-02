"use client";

const steps = [
  { n: "01", t: "Встреча", d: "Администратор принимает вас в холле, помогает раздеться и проводит в зону отдыха." },
  { n: "02", t: "Арома-выбор", d: "На ресепшене подбираете аромат, который будет сопровождать весь ритуал." },
  { n: "03", t: "Программа", d: "Выбранный ритуал. От 70 до 150 минут вашего времени." },
  { n: "04", t: "Чайная пауза", d: "После ритуала — выбранный чай по карте в тишине лаунж-зоны." },
  { n: "05", t: "Возвращение", d: "Плед, приглушённый свет, время. Возвращаемся в мир медленно." },
];

import Parallax from "./Parallax";

export default function Ritual() {
  return (
    <section id="ritual" className="py-24 bg-sand relative overflow-hidden">
      <Parallax speed={0.32} className="absolute bottom-6 left-4 md:top-12 md:left-8 md:bottom-auto w-14 md:w-44 opacity-10 md:opacity-15 pointer-events-none">
        <img
          src="/brand/decor/spiral.webp"
          alt=""
          aria-hidden="true"
          loading="lazy" decoding="async" className="w-full h-auto" width={512} height={512} />
      </Parallax>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-xs uppercase tracking-widest text-brand/60 mb-4 text-center">Пять шагов</div>
        <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center uppercase tracking-wider">
          Как проходит ваш визит
        </h2>
        <p className="text-center text-brand-dark/70 max-w-xl mx-auto mb-20 leading-relaxed">
          От встречи в холле до тихого возвращения — путь, который не хочется прерывать.
        </p>

        <ol className="max-w-3xl mx-auto relative">
          <div className="absolute left-[38px] md:left-[52px] top-4 bottom-4 w-px bg-gradient-to-b from-brand/5 via-brand/20 to-brand/5 pointer-events-none" aria-hidden="true" />
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="relative flex gap-6 md:gap-10 pb-10 md:pb-14 last:pb-0 group"
            >
              <div className="relative shrink-0 w-[76px] md:w-[104px] flex items-start justify-center">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-brand/5 scale-100 group-hover:scale-125 transition-transform duration-500 ease-out" aria-hidden="true" />
                  <span className="relative block font-display text-4xl md:text-6xl leading-none text-brand/85 group-hover:text-brand transition-colors duration-300 px-2 py-1 bg-sand">
                    {s.n}
                  </span>
                </div>
              </div>
              <div className="flex-1 pt-1 md:pt-3">
                <h3 className="font-display text-xl md:text-2xl text-brand mb-3 uppercase tracking-wider">
                  {s.t}
                </h3>
                <p className="text-sm md:text-base text-brand-dark/75 leading-relaxed max-w-lg">
                  {s.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
