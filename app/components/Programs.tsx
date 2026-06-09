const programs = [
  { name: "РОСА", desc: "Лёгкое утреннее пробуждение кожи и тела.", dur: "60 мин", price: "от ___ ₽" },
  { name: "ЗАВОДЬ", desc: "Глубокая релаксация с тёплыми компрессами.", dur: "90 мин", price: "от ___ ₽" },
  { name: "ЯВЬ", desc: "Возвращение в тело через дыхание и аромаритуал.", dur: "120 мин", price: "от ___ ₽" },
  { name: "ОБЛАКО", desc: "Лёгкость и парение. Программа для уставших.", dur: "90 мин", price: "от ___ ₽" },
  { name: "ЯНТАРЬ", desc: "Тёплый янтарный массаж с маслами.", dur: "120 мин", price: "от ___ ₽" },
  { name: "ГЛИНА", desc: "Очищение и обновление через минералы.", dur: "90 мин", price: "от ___ ₽" },
  { name: "МЁД", desc: "Питание и восстановление кожи.", dur: "90 мин", price: "от ___ ₽" },
  { name: "ЛАДА", desc: "Гармонизация женской энергии.", dur: "120 мин", price: "от ___ ₽" },
  { name: "КЕДР", desc: "Глубокий мужской ритуал с сауной.", dur: "150 мин", price: "от ___ ₽" },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-sand-deep/30">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-brand mb-4 text-center">9 программ ухода</h2>
        <p className="text-center text-brand-dark/70 mb-16 max-w-xl mx-auto">Каждая программа — отдельный мир. Выберите по настроению или попросите совета у администратора.</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programs.map(p => (
            <article key={p.name} className="bg-sand-soft p-8 border border-brand/10 hover:border-brand/30 transition-colors">
              <h3 className="font-serif text-2xl text-brand mb-3 tracking-wider">{p.name}</h3>
              <p className="text-sm text-brand-dark/70 mb-6 leading-relaxed min-h-[3rem]">{p.desc}</p>
              <div className="flex justify-between items-center text-sm text-brand/80 mb-6">
                <span>{p.dur}</span><span>{p.price}</span>
              </div>
              <a href="#booking" className="block text-center py-2 border border-brand text-brand text-sm hover:bg-brand hover:text-sand transition-colors">Записаться</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
