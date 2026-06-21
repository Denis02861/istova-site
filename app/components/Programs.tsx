import Link from "next/link";
type Program = {
  slug: string;
  name: string;
  category: "base" | "special";
  accent?: string;
  steps: string[];
  after?: string;
  note?: string;
  dur: string;
  price: string;
};

const programs: Program[] = [
  // ─── БАЗОВЫЕ ПАРНЫЕ ───
  {
    slug: "zarya-telo",
    name: "ЗАРЯ | ТЕЛО",
    category: "base",
    accent: "УТРО · Ритуал пробуждения через тело",
    steps: [
      "Финская сауна с бодрящими эфирами (розмарин / грейпфрут / эвкалипт)",
      "Обновление кожи с гималайской солью и розовым грейпфрутом (пилинг тела)",
      "Тонизирующий СПА-массаж для лёгкости и энергии, 40 мин (задняя поверхность тела)",
      "Освежающий уход для лица (снятие утренней отёчности, свежесть кожи)",
      "Пробуждение через стопы (ручные техники + массажные ролики)",
    ],
    dur: "100 мин",
    price: "9 200 ₽",
  },
  {
    slug: "zarya-volosy",
    name: "ЗАРЯ | ВОЛОСЫ",
    category: "base",
    accent: "УТРО · Ритуал пробуждения через кожу головы",
    steps: [
      "Тонизирующий массаж лица и шейно-воротниковой зоны (ручные техники + криосферы)",
      "Пенный СПА-массаж кожи головы",
      "Золотая дуга — авторский аква-ритуал (водная практика с потоками тёплой воды)",
      "СПА-уход для кожи головы и волос Davines (очищение, тонус корней, утренняя свежесть)",
      "Пробуждение через кожу головы (ручные техники + гребни + массажные инструменты)",
    ],
    after: "Сушка и укладка волос",
    dur: "90 мин",
    price: "8 200 ₽",
  },
  {
    slug: "sumerki-telo",
    name: "СУМЕРКИ | ТЕЛО",
    category: "base",
    accent: "ВЕЧЕР · Ритуал расслабления через тело",
    steps: [
      "Финская сауна с успокаивающими эфирами (лаванда / иланг-иланг / пачули)",
      "Лавандовый ритуал обновления кожи (кремовый пилинг для тела)",
      "Сандаловое обёртывание для тела (согревает и питает кожу)",
      "Расслабляющий СПА-массаж на тёплом масле, 40 мин (задняя поверхность тела)",
      "Тёплая паровая маска для глаз",
      "Согревание кистей и стоп травяными мешочками",
    ],
    dur: "100 мин",
    price: "10 500 ₽",
  },
  {
    slug: "sumerki-volosy",
    name: "СУМЕРКИ | ВОЛОСЫ",
    category: "base",
    accent: "ВЕЧЕР · Ритуал расслабления через кожу головы",
    steps: [
      "Расслабляющий массаж лица и шейно-воротниковой зоны (ручные техники + нефритовые ролики)",
      "Тёплый травяной настой для кожи головы и волос (луговые травы, безопасен для окрашенных волос)",
      "Золотая дуга — авторский аква-ритуал (водная практика с потоками тёплой воды)",
      "СПА-уход для кожи головы и волос Davines (очищение, питание, восстановление)",
      "Расслабляющий массаж головы (ручные техники + гребни + массажные инструменты)",
      "Согревание кистей и стоп травяными мешочками",
    ],
    after: "Сушка волос — на выбор: самостоятельно или со СПА-мастером",
    dur: "90 мин",
    price: "9 500 ₽",
  },
  // ─── СПЕЦИАЛЬНЫЕ ───
  {
    slug: "potok",
    name: "ПОТОК",
    category: "special",
    accent: "ДЕНЬ · Авторский head spa",
    steps: [
      "Японский чай в зоне отдыха перед ритуалом (сенча или матча, по выбору)",
      "Очищение лица и шейно-воротниковой зоны",
      "Золотая дуга — авторский head spa (длительный поток тёплой воды на кожу головы, до 35 минут непрерывного контакта)",
      "Скраб для кожи головы под потоком",
      "Глубокая маска для кожи головы и волос (Davines, выдержка под тёплым полотенцем)",
      "Финальное промывание Дугой и уход для длины",
    ],
    after: "Сушка и лёгкая укладка",
    dur: "1 ч 30 мин",
    price: "9 000 ₽",
  },
  {
    slug: "otzvuk",
    name: "ОТЗВУК",
    category: "special",
    accent: "ВЕЧЕР · Ритуал глубокой тишины",
    note: "Программа без водных практик — полное погружение в тишину и звук.",
    steps: [
      "Аудиопогружение с подобранным звуковым рядом",
      "Сенсорный уход для лица (тихие техники с акцентом на тактильные ощущения)",
      "Sound bath — звуковая практика с поющими чашами",
      "Ритуал заземления через стопы (медленные техники для стоп и голеней с тёплым маслом)",
      "Ритуал веса (тёплые гречишные мешочки для тела)",
      "Массаж кожи головы с гребнями",
      "Финальный отдых под тяжёлым одеялом",
    ],
    dur: "2 ч",
    price: "13 000 ₽",
  },
  {
    slug: "yav",
    name: "ЯВЬ",
    category: "special",
    accent: "НАЧАЛО · Ритуал знакомства с Истовой",
    steps: [
      "Расслабляющий СПА-массаж спины и шейно-воротниковой зоны, 25 мин (знакомство с телесными практиками Истовы)",
      "Освежающий СПА-уход для лица",
      "Золотая дуга — авторский аква-ритуал (водная практика с потоками тёплой воды)",
      "СПА-уход для кожи головы и волос Davines (очищение, восстановление, мягкость)",
      "Расслабляющий массаж кожи головы (ручные техники + гребни)",
    ],
    after: "Сушка и лёгкая укладка волос",
    dur: "70 мин",
    price: "6 800 ₽",
  },
  {
    slug: "kedr",
    name: "КЕДР",
    category: "special",
    accent: "РАВНОВЕСИЕ · Мужской ритуал восстановления",
    steps: [
      "Финская сауна с кедровыми эфирами (кедр / можжевельник / сосна)",
      "Обновление кожи с морской солью и маслом кедра",
      "Креольский массаж бамбуковыми палочками",
      "Расслабляющий массаж тела с горячими камнями, 60 мин",
      "СПА-уход для лица и бороды Davines",
      "Восстанавливающий массаж кожи головы (ручные техники + гребни + массажные инструменты)",
      "Золотая дуга — авторский аква-ритуал (водная практика с потоками тёплой воды)",
      "СПА-уход для кожи головы и волос Davines (очищение, плотность, восстановление)",
    ],
    after: "Сушка волос — на выбор: самостоятельно или со СПА-мастером",
    dur: "2 ч 30 мин",
    price: "12 500 ₽",
  },
  {
    slug: "lada",
    name: "ЛАДА",
    category: "special",
    accent: "РАВНОВЕСИЕ · Женский ритуал восстановления",
    steps: [
      "Финская сауна с цветочными эфирами (роза / нероли / иланг-иланг)",
      "Турецкий пилинг кесе с розовым маслом (мягкое обновление кожи)",
      "СПА-массаж тела с тёплыми травяными мешочками, 40 мин",
      "Эстетический массаж лица и шейно-воротниковой зоны (ручные техники + гуаша)",
      "СПА-уход для лица (питание, увлажнение, сияние кожи)",
      "Расслабляющий массаж кожи головы (ручные техники + гребни + массажные инструменты)",
      "Золотая дуга — авторский аква-ритуал (водная практика с потоками тёплой воды)",
      "СПА-уход для кожи головы и волос Davines (питание, восстановление, мягкость)",
      "Ритуал для кистей с тёплым маслом нероли",
    ],
    after: "Сушка волос — на выбор: самостоятельно или со СПА-мастером",
    dur: "2 ч 30 мин",
    price: "12 500 ₽",
  },
  {
    slug: "rodnik",
    name: "РОДНИК",
    category: "special",
    accent: "РАВНОВЕСИЕ · Бережный ритуал для будущей мамы",
    note: "Программа адаптирована для беременных со 2 триместра и спустя 6 недель после родов.",
    steps: [
      "Расслабляющий массаж лица и шейно-воротниковой зоны (ручные техники + нефритовые ролики)",
      "Деликатный СПА-уход для лица (увлажнение, снятие признаков усталости и комфорт кожи)",
      "Расслабляющий массаж головы (ручные техники + гребни)",
      "Золотая дуга — авторский аква-ритуал (водная практика с потоками тёплой воды)",
      "СПА-уход для кожи головы и волос Davines (очищение, питание, восстановление)",
      "Ритуал лёгких ног (мягкие лимфодренажные техники)",
      "Охлаждающий крем для стоп и голеней",
    ],
    after: "Сушка волос — на выбор: самостоятельно или со СПА-мастером",
    dur: "1 ч 30 мин",
    price: "9 500 ₽",
  },
];

const DISCLAIMER =
  "*Перечень услуг составлен в соответствии с требованиями Приказа Росстандарта от 29.11.2012 №1597-ст и №1605-ст «ГОСТ Р 55317-2012». Истова не оказывает лечебные и оздоровительные процедуры.";

export { programs };

export default function Programs() {
  const baseProgs = programs.filter((p) => p.category === "base");
  const specialProgs = programs.filter((p) => p.category === "special");

  const renderCard = (p: Program) => (
    <article
      key={p.slug}
      className="bg-sand-soft border border-brand/10 p-10 flex flex-col min-h-[640px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-brand/25"
    >
      <header className="mb-8">
        <Link
          href={`/programs/${p.slug}/`}
          className="font-display text-3xl md:text-4xl tracking-wider text-brand mb-2 uppercase block hover:opacity-80 transition-opacity"
        >
          {p.name}
        </Link>
        {p.accent && (
          <div className="text-xs uppercase tracking-widest text-brand/60">
            {p.accent}
          </div>
        )}
        {p.note && (
          <div className="text-xs text-brand/70 italic mt-3">{p.note}</div>
        )}
      </header>

      <ul className="space-y-3 text-sm text-brand-dark/80 leading-relaxed flex-1 mb-6">
        {p.steps.map((step, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-brand/50 shrink-0">/</span>
            <span>{step}</span>
          </li>
        ))}
      </ul>

      {p.after && (
        <div className="text-xs text-brand-dark/70 mb-6 pt-4 border-t border-brand/10">
          <span className="font-medium">После:</span> {p.after}
        </div>
      )}

      <div className="flex justify-between items-end pt-6 border-t border-brand/10">
        <div className="flex flex-col gap-2">
          <a
            href="#booking"
            className="text-sm px-4 py-2 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors text-center"
          >
            Записаться
          </a>
          <Link
            href={`/programs/${p.slug}/`}
            className="text-xs uppercase tracking-widest text-brand/60 hover:text-brand text-center"
          >
            Подробнее →
          </Link>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl text-brand">{p.price}</div>
          <div className="text-xs text-brand-dark/60 mt-1">~ {p.dur}</div>
        </div>
      </div>
    </article>
  );

  return (
    <section id="programs" className="py-24 bg-sand-deep/30">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center uppercase tracking-wider">
          Программы Истовы
        </h2>
        <p className="text-center text-brand-dark/70 mb-12 max-w-2xl mx-auto">
          4 базовых ритуала и 5 авторских программ. Каждая — со своим темпом, ароматом и финалом.
        </p>

        {/* Сквозной блок — что объединяет все ритуалы */}
        <div className="max-w-3xl mx-auto mb-16 border border-brand/15 bg-sand-soft/60 p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-brand/60 mb-6 text-center">
            Каждый ритуал Истовы
          </div>
          <div className="space-y-4 text-sm md:text-base text-brand-dark/85 leading-relaxed text-center">
            <p>Открывается арома-выбором, который будет с вами в течение всего ритуала.</p>
            <p>Сопровождается звуковым ходом для мягкой настройки на каждый этап.</p>
            <p>Завершается выбранным чаем и тишиной в лаунж-зоне.</p>
          </div>
        </div>

        {/* Базовые парные */}
        <div className="mb-6">
          <div className="text-center text-xs uppercase tracking-widest text-brand/60 mb-8">
            Базовые парные ритуалы
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {baseProgs.map(renderCard)}
        </div>

        {/* Специальные */}
        <div className="mb-6">
          <div className="text-center text-xs uppercase tracking-widest text-brand/60 mb-8">
            Авторские программы
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {specialProgs.map(renderCard)}
        </div>

        <p className="text-[10px] text-brand-dark/40 leading-relaxed max-w-4xl mx-auto mt-12 px-2">
          {DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
