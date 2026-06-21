const categories = [
  "Чёрные с глубоким вкусом",
  "Зелёные тонизирующие",
  "Травяные сборы",
  "Цветочные и расслабляющие",
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
          className="absolute right-2 top-4 md:right-0 md:top-12 w-16 md:w-56 opacity-12 md:opacity-20 pointer-events-none"
          loading="lazy"
          decoding="async"
          width={512}
          height={512}
        />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-base md:text-lg text-brand-dark/85 leading-relaxed mb-10">
            Чай — часть ритуала. Сопровождает встречу и завершает программу в тишине лаунж-зоны.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 text-sm md:text-base text-brand-dark/75">
            {categories.map((c) => (
              <div key={c} className="text-left md:text-center">
                <span className="text-brand/50 mr-2">·</span>
                {c}
              </div>
            ))}
          </div>

          <p className="text-sm md:text-base text-brand-dark/70 italic">
            Сорт подбираем под ваше состояние и время суток. Конкретику расскажем при встрече.
          </p>
        </div>
      </div>
    </section>
  );
}
