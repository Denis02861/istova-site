"use client";

const zones = [
  { t: "Спа-зона", d: "Приватные кабинеты, чайная комната, зона тишины с тёплыми пледами" },
  { t: "Парикмахерский зал", d: "Отдельный вход, авторские кресла, ритуал ухода в атмосфере спа" },
  { t: "Ресепшн и холл", d: "Первая точка встречи, арома-выбор, чайная карта" },
  { t: "Лаунж после ритуала", d: "Плед, приглушённый свет, время. Возвращение в мир — медленно" },
  { t: "Спа-душ и сауна", d: "Финская сауна с эфирами, зона перехода между сухим и влажным теплом" },
  { t: "Зона тишины", d: "Комната без звонков, без разговоров. Только вы и тепло" },
];

export default function Space() {
  return (
    <section id="space" className="py-24 bg-sand">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-6"><span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium ">Пространство</span></div>
        <BlurFade delay={0.05} yOffset={16}><h2 className="font-display text-4xl md:text-5xl text-brand mb-6 text-center tracking-tight">
          Два мира под одной крышей
        </h2></BlurFade>
        <p className="text-center text-lg text-brand-dark/80 max-w-2xl mx-auto mb-16 leading-relaxed">
          256 квадратных метров на Васильевском острове, в шаге от Невы. Спа-зона с приватными кабинетами и общей зоной тишины. Парикмахерский зал с отдельным входом и атмосферой ритуала ухода.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {zones.map((z, i) => (
            <div
              key={z.t}
              className="group relative aspect-[4/5] bg-gradient-to-br from-sand-deep/60 via-sand-deep/40 to-sand-soft border border-brand/10 p-6 flex flex-col justify-end overflow-hidden transition-all duration-500 hover:border-brand/30 hover:shadow-[0_16px_40px_-16px_rgba(116,68,54,0.2)]"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
                <span className="font-display text-[8rem] leading-none text-brand">
                  0{i + 1}
                </span>
              </div>
              <div className="relative">
                <div className="font-display text-xl text-brand mb-2 uppercase tracking-wider">
                  {z.t}
                </div>
                <p className="text-sm text-brand-dark/70 leading-relaxed">
                  {z.d}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-brand/50 mt-8 italic">
          Фотогалерея появится после фотосессии пространства
        </p>
      </div>
    </section>
  );
}
