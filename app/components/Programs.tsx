const programs = [
  {
    name: "ЗАРЯ",
    desc: "Утренняя программа пробуждения через контраст температур. Финская сауна с эфирами бергамота и мяты, солёный скраб, тонизирующий массаж и холодные металлические роллеры. Завершается чаем с лимоном и имбирём.",
    dur: "1 ч 30 мин",
    price: "от ___ ₽",
  },
  {
    name: "СУМЕРКИ",
    desc: "Вечерний уход в тишину: глубокий прогрев в сауне, согревающее обёртывание и длинные техники массажа с тёплыми тибетскими камнями. Финал — утяжелённое одеяло, приглушённый свет, одиночество с собой.",
    dur: "2 ч",
    price: "от ___ ₽",
  },
  {
    name: "ПОТОК",
    desc: "Японский head spa, которого почти нет в России. Длительный массаж скальпа под непрерывным потоком тёплой воды через Дугу, акупунктура и скраб для кожи головы прямо под струёй. Финал — зелёная сенча в японском ритуале подачи.",
    dur: "1 ч 30 мин",
    price: "от ___ ₽",
    accent: "Уникальная",
  },
  {
    name: "ОТЗВУК",
    desc: "Звукотерапия и ASMR в формате спа-ритуала. Бинауральные ASMR-звуки в наушниках во время ухода за лицом, затем тибетские поющие чаши на теле и Дуга в полной тишине. Программа для тех, кто хочет полностью отключиться.",
    dur: "2 ч",
    price: "от ___ ₽",
    accent: "Уникальная",
  },
  {
    name: "ЯВЬ",
    desc: "Флагман — всё лучшее в одной программе. Сауна, обёртывание, длинный массаж, уход за кожей головы на Дуге, авторский уход для лица. Универсальный ритуал, с которого хорошо начинать знакомство с Истовой.",
    dur: "2 ч",
    price: "от ___ ₽",
  },
  {
    name: "КЕДР",
    desc: "Мужская программа с плотными техниками: бамбуковые палки по спине, глубокий массаж разогретыми камнями, скальп-уход и завершение в сауне. Без декоративных деталей — только глубокая работа с телом.",
    dur: "2 ч 30 мин",
    price: "от ___ ₽",
  },
  {
    name: "РОДНИК",
    desc: "Бережная программа для беременных и тех, кому противопоказана сауна. Мягкий массаж в положении на боку, уход за лицом, скальп-уход на Дуге в положении полусидя. Без термических нагрузок, спокойный темп.",
    dur: "1 ч 30 мин",
    price: "от ___ ₽",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-sand-deep/30">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-brand mb-4 text-center">7 программ ухода</h2>
        <p className="text-center text-brand-dark/70 mb-16 max-w-2xl mx-auto">
          Каждая программа — отдельный мир со своим темпом, ароматом и финалом. Выберите по настроению или попросите совета у администратора.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programs.map((p) => (
            <article
              key={p.name}
              className="bg-sand-soft p-8 border border-brand/10 hover:border-brand/30 transition-colors flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-serif text-2xl text-brand tracking-wider">{p.name}</h3>
                {p.accent && (
                  <span className="text-[10px] uppercase tracking-widest text-brand/60 border border-brand/30 px-2 py-1">
                    {p.accent}
                  </span>
                )}
              </div>
              <p className="text-sm text-brand-dark/70 mb-6 leading-relaxed flex-1">{p.desc}</p>
              <div className="flex justify-between items-center text-sm text-brand/80 mb-6">
                <span>{p.dur}</span>
                <span>{p.price}</span>
              </div>
              <a
                href="#booking"
                className="block text-center py-2 border border-brand text-brand text-sm hover:bg-brand hover:text-sand transition-colors"
              >
                Записаться
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
