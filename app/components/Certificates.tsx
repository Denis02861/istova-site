import TrackedLink from "./TrackedLink";

const tiers = [
  { amount: "5 000", note: "лёгкий подарок" },
  { amount: "10 000", note: "ритуал на двоих" },
  { amount: "15 000", note: "глубокое погружение" },
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 bg-sand">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-display text-4xl md:text-5xl text-brand mb-6 text-center tracking-tight">Подарите ритуал</h2>
        <p className="text-center text-brand-dark/80 mb-12 max-w-xl mx-auto">Сертификат можно подарить на любую сумму или конкретную программу. Действителен 6 месяцев. Бумажная или электронная версия — на ваш выбор.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map(t => (
            <div key={t.amount} className="bg-sand-soft p-8 text-center border border-brand/10 transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-lg hover:border-brand/25">
              <div className="font-display text-3xl text-brand mb-2">{t.amount} ₽</div>
              <div className="text-sm text-brand-dark/60 italic">{t.note}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <TrackedLink goal="BOOKING_CLICK" goalParams={{from:"certificates"}} href="#booking" className="inline-block px-8 py-3 bg-brand text-sand hover:bg-brand-dark transition-colors">Заказать сертификат</TrackedLink>
        </div>
      </div>
    </section>
  );
}
