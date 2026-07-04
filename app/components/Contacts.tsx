export default function Contacts() {
  const address = "Санкт-Петербург, ул. Беринга, 23 к. 2";
  const mapSrc = "https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=63939829435";
  return (
    <section id="contacts" className="py-24 bg-sand">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="font-display text-4xl md:text-5xl text-brand mb-16 text-center uppercase tracking-wider">Где нас найти</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display text-2xl text-brand mb-4 uppercase tracking-wider">Адрес</h3>
            <p className="text-brand-dark/80 mb-2">{address}</p>
            <p className="text-brand-dark/60 text-sm mb-6">Васильевский остров · 12 минут от м. Василеостровская</p>

            <h3 className="font-display text-2xl text-brand mb-4 mt-8 uppercase tracking-wider">Часы работы</h3>
            <p className="text-brand-dark/80 mb-1">Ежедневно, 10:00 — 22:00</p>
            <p className="text-brand-dark/80 mb-6">По предварительной записи</p>

            <h3 className="font-display text-2xl text-brand mb-4 mt-8 uppercase tracking-wider">Как с нами связаться</h3>
            <p className="text-brand-dark/80 mb-1">Телефон: <a href="tel:+79013201050" className="hover:text-brand">+7 (901) 320-10-50</a></p>
            <p className="text-brand-dark/80 mb-1">
              <a href="https://t.me/Istova_spa" target="_blank" rel="noopener noreferrer" className="hover:text-brand">@Istova_spa</a>
            </p>
          </div>
          <div className="aspect-square bg-sand-deep">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              frameBorder={0}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups"
              title="Карта — Истова"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
