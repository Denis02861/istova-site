const steps = [
  { n: "01", t: "Встреча", d: "Администратор принимает вас в холле, помогает раздеться, проводит к зоне." },
  { n: "02", t: "Арома-выбор", d: "На ресепшене подбираете аромат который будет сопровождать ритуал." },
  { n: "03", t: "Чайная пауза", d: "Перед началом программы — чашка чая по нашей карте. Время остановиться." },
  { n: "04", t: "Программа", d: "Выбранный ритуал. Длительность от 60 до 180 минут." },
  { n: "05", t: "Отдых", d: "После процедуры — отдельная зона тишины, плед, чай. Время вернуться в мир медленно." },
];

export default function Ritual() {
  return (
    <section id="ritual" className="py-24 bg-sand relative overflow-hidden">
      <img
        src="/brand/decor/spiral.webp"
        alt=""
        aria-hidden="true"
        className="absolute top-12 left-8 w-32 md:w-44 opacity-15 pointer-events-none"
       loading="lazy" decoding="async"  width={512} height={512} />
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="font-display text-4xl md:text-5xl text-brand mb-16 text-center uppercase tracking-wider">Как проходит ваш визит</h2>
        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {steps.map(s => (
            <div key={s.n} className="text-center">
              <div className="font-display text-3xl text-moss/60 mb-3">{s.n}</div>
              <h3 className="font-display text-xl text-brand mb-3 uppercase tracking-wider">{s.t}</h3>
              <p className="text-sm text-brand-dark/70 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
