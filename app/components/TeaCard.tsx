const teas = [
  {
    name: "Ассам с чабрецом",
    desc: "Чёрный чай с глубоким вкусом и душистыми нотами чабреца. Согревает и возвращает в тонус.",
  },
  {
    name: "Таёжный сбор",
    desc: "Ароматный чёрный чай с пихтой, лесными ягодами и северными травами. Погружает в спокойствие таёжного леса.",
  },
  {
    name: "Молочный улун",
    desc: "Мягкий китайский улун со сливочным ароматом и бархатным послевкусием. Окутывает теплом и мягко успокаивает.",
  },
  {
    name: "Сенча с лемонграссом и имбирём",
    desc: "Купаж традиционного японского зелёного чая с бодрящим цитрусом и пряным имбирём. Мягко тонизирует и настраивает на продолжение дня.",
  },
  {
    name: "Фруктовый сбор",
    desc: "Насыщенный красный чай с приятной кислинкой и сочными нотами спелых фруктов. Освежает и поднимает настроение.",
  },
  {
    name: "Гречишный чай с яблоком и корицей",
    desc: "Злаковый чай с ароматом печёного яблока, корицы и тёплыми ореховыми нотами.",
  },
  {
    name: "Луговой травяной сбор",
    desc: "Душистые травы с природным послевкусием — выдох после насыщенного дня.",
  },
  {
    name: "Ромашка и мелисса",
    desc: "Цветочные ноты ромашки и лёгкая свежесть мелиссы. Мягко расслабляет и готовит ко сну.",
  },
];

export default function TeaCard() {
  return (
    <section id="tea" className="bg-sand">
      <div className="bg-moss py-8">
        <h2 className="font-display text-3xl md:text-4xl text-sand text-center tracking-[0.2em] uppercase">
          Чайная карта
        </h2>
      </div>

      <div className="container mx-auto px-6 py-16 relative">
        <img
          src="/brand/decor/seaweed.webp"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-12 w-40 md:w-56 opacity-20 pointer-events-none"
         loading="lazy" decoding="async"  width={512} height={512} />

        <p className="text-center text-brand-dark/70 mb-12 max-w-2xl mx-auto">
          Чай — часть ритуала: он сопровождает встречу, паузу между этапами и завершение программы. Восемь сортов под разные состояния.
        </p>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto relative z-10">
          {teas.map((t) => (
            <article key={t.name} className="border-b border-brand/15 pb-6">
              <h3 className="font-display text-xl text-brand mb-2 uppercase tracking-wider">{t.name}</h3>
              <p className="text-sm text-brand-dark/70 leading-relaxed">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
