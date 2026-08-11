import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/massazh-golovy/`;
const TITLE = "Массаж головы в СПб — спа-массаж головы на Васильевском | Истова";
const DESCRIPTION =
  "Расслабляющий спа-массаж головы в СПб: тёплая вода, мягкие техники, уход Davines и тишина. Уходит тяжесть в голове и зажатость в шее. От 6800 ₽, ежедневно 10:00–22:00, м. Приморская. Запись онлайн.";

const FAQ = [
  {
    q: "Сколько стоит массаж головы в СПб?",
    a: "В Истове массаж кожи головы входит в спа-ритуалы, а не продаётся отдельной короткой процедурой. Стоимость зависит от программы и начинается от 6800 рублей. Точную цену под ваш запрос подскажет администратор при записи.",
  },
  {
    q: "Чем спа-массаж головы отличается от обычного?",
    a: "Обычный массаж головы это короткая работа руками. Спа-массаж проходит дольше и спокойнее: к рукам добавляются тёплая вода, уход за волосами и работа с шеей и плечами, откуда напряжение часто и идёт.",
  },
  {
    q: "Массаж головы помогает при напряжении и усталости?",
    a: "Чаще всего после сеанса уходит тяжесть в голове и зажатость в шее, легче засыпается, мысли становятся тише. Это уход и отдых, а не лечение: если беспокоит здоровье, сначала стоит показаться врачу.",
  },
  {
    q: "Как записаться на массаж головы?",
    a: "Через форму на сайте, по телефону +7 (901) 320-10-50 или в Telegram @Istova_spa. Администратор свяжется в течение часа и поможет выбрать ритуал.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "массаж головы спб",
    "спа массаж головы спб",
    "массаж головы в спб",
    "расслабляющий массаж головы спб",
    "массаж кожи головы",
    "Истова",
  ],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Истова",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Массаж головы в Истове" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.webp`],
  },
};

export default function MassazhGolovyPage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${URL}#service`,
    serviceType: "Массаж головы",
    name: "Спа-массаж головы в Санкт-Петербурге",
    description: DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Санкт-Петербург" },
    url: URL,
    offers: {
      "@type": "Offer",
      price: "6800",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: URL,
    },
    inLanguage: "ru-RU",
  };

  const FAQ_JSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const BREADCRUMB_JSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Массаж головы в Санкт-Петербурге", item: URL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Header />
      <main className="bg-sand py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Хлебные крошки */}
          <nav className="text-xs uppercase tracking-widest text-brand/60 mb-12">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Массаж головы</span>
          </nav>

          {/* Hero */}
          <header className="mb-16 pb-12 border-b border-brand/10">
            <div className="text-xs uppercase tracking-widest text-brand/60 mb-4">
              Санкт-Петербург · Васильевский остров
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-brand mb-6 leading-tight">
              Массаж головы в Санкт-Петербурге
            </h1>
            <p className="text-base md:text-lg text-brand-dark/85 leading-relaxed max-w-2xl mb-8">
              Спокойный спа-массаж головы для тех, кто много думает и к вечеру ощущает тяжесть в затылке и шее. Мягкие техники, тёплая вода, уход за волосами и тишина, в которой можно наконец ни о чём не думать.
            </p>
            <TrackedLink
              goal="BOOKING_CLICK"
              goalParams={{ from: "massazh_golovy_hero" }}
              href="/#booking"
              className="inline-block text-sm uppercase tracking-widest px-8 py-4 bg-brand text-sand hover:bg-brand-dark transition-colors"
            >
              Записаться
            </TrackedLink>
          </header>

          {/* Смысловые блоки */}
          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Что это
            </h2>
            <div className="space-y-4 text-base text-brand-dark/85 leading-relaxed">
              <p>
                Массаж головы в Истове это не быстрая процедура между делом, а часть спокойного спа-ритуала. Мастер работает с кожей головы, висками, затылком и зоной шеи и плеч, куда чаще всего уходит дневное напряжение.
              </p>
              <p>
                Мы не ставим задачу что-то исправить во внешности. Задача другая: помочь расслабиться и дать голове отдохнуть так, как это редко получается в обычном дне.
              </p>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Что даёт
            </h2>
            <div className="space-y-4 text-base text-brand-dark/85 leading-relaxed">
              <p>
                Чаще всего после сеанса уходит тяжесть в голове и зажатость в шее. Многие замечают, что в ближайшие ночи легче засыпается, а мысли становятся тише. Кожа головы после мягкого ухода чувствует себя свежее, волосы выглядят ухоженными.
              </p>
              <p>
                Это про отдых и уход, а не про лечение. Если беспокоит здоровье кожи головы или выпадение волос, это вопрос к врачу. А усталость и перегруз это как раз к нам.
              </p>
            </div>
          </section>

          <section className="mb-16 p-8 bg-sand-soft border border-brand/10">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Как проходит
            </h2>
            <div className="space-y-4 text-base text-brand-dark/85 leading-relaxed">
              <p>
                Сначала короткий разговор с мастером: как вы себя чувствуете, есть ли чувствительность кожи, какой аромат приятнее. Дальше начинается сам уход, с мягким массажем и тёплой водой, без спешки и лишних движений.
              </p>
              <p>
                Точную последовательность и тайминг мастер выстраивает под вас на месте. Ближе к финалу приводит волосы в порядок, и остаётся время спокойно посидеть с чаем. Ничего активного сразу после планировать не стоит.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16 border-t border-brand/10 pt-12">
            <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-8 font-normal">
              Частые вопросы
            </h2>
            <div className="space-y-6">
              {FAQ.map((f, i) => (
                <div key={i}>
                  <h3 className="font-display text-lg text-brand mb-2">{f.q}</h3>
                  <p className="text-sm text-brand-dark/80 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="p-10 bg-brand text-sand text-center">
            <h2 className="font-display text-2xl md:text-3xl mb-4">
              Записаться на массаж головы
            </h2>
            <p className="text-base text-sand/85 leading-relaxed max-w-xl mx-auto mb-8">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, 10 минут пешком от м. Приморская. Мастер поможет выбрать ритуал под ваше состояние.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK"
                goalParams={{ from: "massazh_golovy_cta" }}
                href="/#booking"
                className="inline-block text-sm uppercase tracking-widest px-8 py-4 bg-sand text-brand hover:bg-sand-soft transition-colors"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK"
                goalParams={{ from: "massazh_golovy_cta" }}
                href="tel:+79013201050"
                className="inline-block text-sm uppercase tracking-widest px-8 py-4 border border-sand/40 text-sand hover:bg-sand hover:text-brand transition-colors"
              >
                +7 (901) 320-10-50
              </TrackedLink>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
