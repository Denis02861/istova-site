export default function Contacts() {
  return (
    <section id="contacts" className="py-24 bg-sand">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="font-serif text-4xl md:text-5xl text-brand mb-16 text-center">Где нас найти</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-serif text-2xl text-brand mb-4">Адрес</h3>
            <p className="text-brand-dark/80 mb-2">Санкт-Петербург, ул. Беринга, 23 к. 2</p>
            <p className="text-brand-dark/60 text-sm mb-6">Васильевский остров · 12 минут от м. Василеостровская</p>

            <h3 className="font-serif text-2xl text-brand mb-4 mt-8">Часы работы</h3>
            <p className="text-brand-dark/80 mb-2">Ежедневно, 10:00 — 22:00</p>
            <p className="text-brand/40 text-xs italic mb-6">(подтвердить ближе к открытию)</p>

            <h3 className="font-serif text-2xl text-brand mb-4 mt-8">Как с вами связаться</h3>
            <p className="text-brand-dark/80 mb-1">Телефон: <a href="tel:+79013201050" className="hover:text-brand">+7 (901) 320-10-50</a></p>
            <p className="text-brand-dark/80 mb-1">@istova</p>
          </div>
          <div className="aspect-square bg-sand-deep flex items-center justify-center text-brand/40 font-serif">
            карта Яндекс (виджет)
          </div>
        </div>
      </div>
    </section>
  );
}
