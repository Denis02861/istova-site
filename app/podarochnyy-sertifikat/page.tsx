import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, ProgramCards, FeatureRow, FaqBlock } from "../components/LandingBlocks";
import { programs } from "../lib/programs-data";

/**
 * Посадочная под подарочные сертификаты.
 *
 * Зачем: запрос «подарочный сертификат спа» не отрабатывала ни одна страница —
 * на главной есть блок и позиция в фиде, отдельной страницы не было.
 * В Директе за 22 дня августа запросы про сертификаты съели 2438 ₽ при 2 заявках,
 * причём «купить сертификат на спа» 75 ₽ и «купить подарочный сертификат в спа
 * салон в спб» 68 ₽ уходили на главную. Тема сезонная, к декабрю растёт кратно.
 */

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/podarochnyy-sertifikat/`;
const TITLE = "Подарочный сертификат в спа-салон, Санкт-Петербург | Истова";
const DESCRIPTION =
  "Подарочный сертификат в спа на Васильевском острове: на сумму или на ритуал, от 6800 ₽. Бумажный или электронный, действует 6 месяцев. Оформим за день.";

const SLUGS = ["yav", "zarya-volosy", "sumerki-telo", "kedr", "lada", "kedr-lada"];
const GIFT_PROGRAMS = programs.filter((p) => SLUGS.includes(p.slug));

const PHOTOS: Record<string, string> = {
  "yav": "/gallery/frag-water.webp",
  "zarya-volosy": "/gallery/04-head-spa.webp",
  "sumerki-telo": "/gallery/05-massage.webp",
  "kedr": "/gallery/03-sauna.webp",
  "lada": "/gallery/frag-body.webp",
  "kedr-lada": "/gallery/frag-care.webp",
};

const FAQ = [
  {
    q: "Сколько стоит подарочный сертификат в спа?",
    a: "Сертификат оформляется на любую сумму от 6800 рублей. Это стоимость самого короткого ритуала, 75 минут. Сертификат на парный ритуал для двоих начинается от 12 000 рублей, на большие программы с сауной и уходом за волосами от 21 000 рублей.",
  },
  {
    q: "Сертификат на сумму или на конкретную программу?",
    a: "Можно и так, и так. На сумму удобнее, когда вы не знаете, что человеку ближе: он сам выберет ритуал и при желании доплатит разницу. На конкретную программу лучше, когда вы уверены в выборе и хотите, чтобы подарок читался сразу.",
  },
  {
    q: "Сколько действует сертификат?",
    a: "Шесть месяцев с даты покупки. Этого хватает, чтобы спокойно выбрать время и не бежать записываться в последнюю неделю.",
  },
  {
    q: "Бумажный или электронный?",
    a: "На ваш выбор. Электронный приходит на почту и его можно переслать в мессенджере, это удобно, когда подарок нужен сегодня. Бумажный забираете в салоне на Беринга, 23 корпус 2, он в плотном конверте и выглядит как подарок, а не как чек.",
  },
  {
    q: "Как быстро оформить сертификат?",
    a: "Электронный делаем в течение дня, часто за час. Достаточно написать или позвонить, выбрать сумму или программу и оплатить. За бумажным приезжайте в салон, он будет готов к вашему приходу.",
  },
  {
    q: "Что если человеку не подойдёт время или программа?",
    a: "Время он выбирает сам при записи, никаких привязок к дате в сертификате нет. Если захочет другой ритуал вместо указанного, администратор пересчитает: разницу можно доплатить на месте.",
  },
  {
    q: "Можно подарить сертификат на двоих?",
    a: "Да, парные ритуалы проходят в смежных кабинетах, двое гостей рядом. Такой сертификат чаще берут на годовщину или на день рождения паре.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "подарочный сертификат спа",
    "подарочный сертификат в спа салон спб",
    "купить сертификат на спа",
    "сертификат на массаж спб",
    "подарочный сертификат на массаж головы",
    "спа сертификат в подарок",
    "Истова",
  ],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Подарочный сертификат в спа Истова" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function SertifikatPage() {
  const PRODUCT_JSONLD = {
    "@context": "https://schema.org", "@type": "Product", "@id": `${URL}#product`,
    name: "Подарочный сертификат в спа Истова",
    description: DESCRIPTION,
    category: "Подарочный сертификат",
    brand: { "@type": "Brand", name: "Истова" },
    image: [`${SITE_URL}/certificates/blank.webp`],
    url: URL,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "6800", highPrice: "21000", priceCurrency: "RUB",
      offerCount: GIFT_PROGRAMS.length,
      availability: "https://schema.org/InStock",
      url: URL,
      seller: { "@id": `${SITE_URL}/#organization` },
    },
    inLanguage: "ru-RU",
  };
  const FAQ_JSONLD = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const BREADCRUMB_JSONLD = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Подарочный сертификат", item: URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <Header />

      <main className="bg-sand">
        <LandingHero
          eyebrow="Санкт-Петербург · Васильевский остров"
          title="Подарочный сертификат в спа"
          lead="На сумму или на конкретный ритуал. Бумажный в конверте или электронный на почту. Действует полгода, время человек выбирает сам."
          ctaFrom="sertifikat_hero"
          priceHint="от 6800 ₽ · оформляем за день"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Подарочный сертификат</span>
          </nav>

          <SplitBlock
            title="Что именно вы дарите"
            paragraphs={[
              "Сертификат на ритуал отличается от подарка вещью тем, что его нельзя отложить в шкаф. Человек приходит, ложится, и два часа за него всё решают другие: какая температура воды, когда подадут чай, сколько длится тишина.",
              "Чаще всего его берут тем, кто сам до спа не дойдёт. Не потому что не хочет, а потому что в списке дел это всегда последняя строчка. Сертификат эту строчку двигает наверх.",
            ]}
            photo="/gallery/frag-water.webp"
            photoAlt="Водный ритуал в спа Истова"
          />

          <FeatureRow
            items={[
              { title: "На сумму или на программу", text: "На сумму человек выберет ритуал сам. На конкретную программу подарок читается сразу, когда вы уверены в выборе." },
              { title: "Полгода на визит", text: "Шесть месяцев с даты покупки. Никакой привязки к дате, время выбирает сам гость при записи." },
              { title: "Бумажный или электронный", text: "Электронный приходит на почту за час, его можно переслать. Бумажный в плотном конверте, забираете в салоне." },
            ]}
          />

          <PhotoStrip
            photo="/certificates/blank.webp"
            alt="Бланк подарочного сертификата Истовы"
            caption="Бумажный сертификат выглядит как подарок, а не как чек"
          />

          <ProgramCards title="На какие ритуалы берут сертификат" programs={GIFT_PROGRAMS} photos={PHOTOS} />

          <SplitBlock
            title="Как оформить"
            flip
            paragraphs={[
              "Напишите или позвоните администратору, скажите сумму или название программы. Электронный сертификат уходит на указанную почту в тот же день, обычно в течение часа. Бумажный готовим к вашему приезду на Беринга, 23 корпус 2.",
              "Если дарите паре, скажите об этом сразу: парные ритуалы проходят в смежных кабинетах, и на них лучше бронировать время заранее, особенно на выходные и под праздники.",
            ]}
            photo="/gallery/frag-tea.webp"
            photoAlt="Лаунж-зона Истовы, чай после ритуала"
          />

          <section className="pb-4">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-4">Ещё по теме</div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { href: "/spa-dlya-dvoih/", t: "Спа для двоих", d: "Парные ритуалы в смежных кабинетах" },
                  { href: "/massazh-golovy/", t: "Массаж головы и head spa", d: "Азиатская техника с водной дугой" },
                  { href: "/programs/", t: "Все ритуалы", d: "Девять программ с ценами и длительностью" },
                  { href: "/kak-prohodit/", t: "Как проходит визит", d: "От двери до чая, по шагам" },
                  { href: "/blog/chto-takoe-head-spa/", t: "Что такое head spa", d: "Откуда пришла техника и как проходит" },
                  { href: "/spa-vasileostrovskiy/", t: "Спа на Васильевском", d: "10 минут от метро Приморская" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="group block">
                    <div className="font-display text-lg text-brand mb-1.5 leading-snug group-hover:text-brand-dark transition-colors">
                      {l.t}
                    </div>
                    <div className="text-sm text-brand-dark/65 leading-relaxed">{l.d}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <FaqBlock items={FAQ} />
        </div>

        <section className="bg-brand text-sand">
          <div className="container mx-auto px-6 max-w-3xl py-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-5">Заказать сертификат</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Скажите сумму или название ритуала, остальное сделаем сами.
              Электронный отправим на почту в течение дня, бумажный подготовим к вашему приезду.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK" goalParams={{ from: "sertifikat_cta" }} href="/go/zapis/?from=page_sertifikat" rel="nofollow"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Заказать онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK" goalParams={{ from: "sertifikat_cta" }} href="tel:+79013201050"
                className="inline-flex items-center justify-center px-9 py-3.5 border border-sand/40 text-sand rounded-full hover:bg-sand hover:text-brand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms]"
              >
                +7 (901) 320-10-50
              </TrackedLink>
              <TrackedLink
                goal="TG_CLICK" goalParams={{ from: "sertifikat_cta" }} href="https://t.me/Istova_spa"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-9 py-3.5 border border-sand/40 text-sand rounded-full hover:bg-sand hover:text-brand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms]"
              >
                Написать администратору
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
