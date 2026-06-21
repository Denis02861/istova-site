const steps = [
  { n: "01", t: "Встреча", d: "Администратор принимает вас в холле, помогает раздеться и проводит в зону отдыха." },
  { n: "02", t: "Арома-выбор", d: "На ресепшене подбираете аромат, который будет сопровождать весь ритуал." },
  { n: "03", t: "Программа", d: "Выбранный ритуал. От 70 до 150 минут вашего времени." },
  { n: "04", t: "Чайная пауза", d: "После ритуала — выбранный чай по карте в тишине лаунж-зоны." },
  { n: "05", t: "Возвращение", d: "Плед, приглушённый свет, время. Возвращаемся в мир медленно." },
];

export default function Ritual() {
  return (
    <section id="ritual" className="py-24 bg-sand relative overflow-hidden">
      <img
        src="/brand/decor/spiral.webp"
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-12 left-8 w-32 md:w-44 opacity-15 pointer-events-none"
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
