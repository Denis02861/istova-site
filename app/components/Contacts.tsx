"use client";

import TrackedLink from "./TrackedLink";
import BlurFade from "./magicui/BlurFade";

export default function Contacts() {
  const address = "Санкт-Петербург, ул. Беринга, 23 к. 2";
  const mapSrc = "https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=63939829435";
  return (
    <section id="contacts" className="py-24 bg-sand relative overflow-hidden">
      <img
        src="/brand/decor/spiral.webp"
        alt=""
        aria-hidden="true"
        loading="lazy" decoding="async"
        className="absolute bottom-8 right-4 md:bottom-16 md:right-10 w-20 md:w-40 opacity-[0.07] md:opacity-[0.1] pointer-events-none"
        width={512} height={512}
      />
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <BlurFade delay={0.05} yOffset={16}><h2 className="font-display text-4xl md:text-5xl text-brand mb-16 text-center tracking-tight">Где нас найти</h2></BlurFade>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-display text-2xl text-brand mb-4 ">Адрес</h3>
            <p className="text-brand-dark/80 mb-2">{address}</p>
            <p className="text-brand-dark/60 text-sm mb-6">Васильевский остров · 12 минут от м. Василеостровская</p>
            <p className="text-brand-dark/70 text-sm mb-1 mt-4">Парковка: свободная во дворе</p>
            <p className="text-brand-dark/60 text-sm mb-6">Открытый двор дома, автомобиль оставите спокойно</p>

            <h3 className="font-display text-2xl text-brand mb-4 mt-8 ">Часы работы</h3>
            <p className="text-brand-dark/80 mb-1">Ежедневно, 10:00 — 22:00</p>
            <p className="text-brand-dark/80 mb-6">По предварительной записи</p>

            <h3 className="font-display text-2xl text-brand mb-4 mt-8 ">Как с нами связаться</h3>
            <p className="text-brand-dark/80 mb-1">Телефон: <TrackedLink goal="PHONE_CLICK" goalParams={{from:"contacts"}} href="tel:+79013201050" className="hover:text-brand">+7 (901) 320-10-50</TrackedLink></p>
            <p className="text-brand-dark/80 mb-1">
              <TrackedLink goal="TG_CLICK" goalParams={{from:"contacts"}} href="https://t.me/Istova_spa" target="_blank" rel="noopener noreferrer" className="hover:text-brand">@Istova_spa</TrackedLink>
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
