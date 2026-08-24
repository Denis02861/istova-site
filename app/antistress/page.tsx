import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import { programs } from "../lib/programs-data";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/antistress/`;
const TITLE = "Антистресс-программы в СПб: спа-ритуалы против напряжения | Истова";
const DESCRIPTION =
  "Антистресс на Васильевском острове: спа-ритуалы для тела, головы и шеи, которые снимают накопленное напряжение. От 6800 ₽, м. Приморская. Без обещаний лечения.";

const ANTISTRESS_SLUGS = ["sumerki-telo", "sumerki-volosy", "kedr", "lada", "yav"];
const ANTISTRESS_PROGRAMS = programs.filter((p) => ANTISTRESS_SLUGS.includes(p.slug));

const FAQ = [
  {
    q: "Что входит в антистресс-программу в Истове?",
    a: "Отдельной процедуры с названием антистресс у нас нет. Вместо неё спокойные спа-ритуалы, которые решают ту же задачу: массаж тела, головы и шейно-воротниковой зоны, тёплая вода, тишина без спешки. Мастер подбирает конкретную программу под ваше состояние.",
  },
  {
    q: "Сколько стоит антистресс-программа?",
    a: "Стоимость зависит от выбранного ритуала и начинается от 6800 рублей. Точную цену под ваш запрос подскажет администратор при записи.",
  },
  {
    q: "Это лечит стресс или тревожность?",
    a: "Нет, мы не медицинский центр и не ставим диагнозы. Спа-ритуалы снимают накопленное телесное напряжение и дают нервной системе паузу, но при выраженной тревожности или выгорании это дополнение к работе со специалистом, а не замена ей.",
  },
  {
    q: "Как записаться на антистресс-программу?",
    a: "Через форму на сайте, по телефону +7 (901) 320-10-50 или в Telegram @Istova_spa. Администратор поможет подобрать ритуал под ваше состояние.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "антистресс спб",
    "антистресс программа спб",
    "снять стресс спб",
    "спа против стресса",
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
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Антистресс-программы в Истове" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.webp`],
  },
};

export default function AntistressPage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${URL}#service`,
    serviceType: "Антистресс-программа",
    name: "Антистресс-программы в Санкт-Петербурге",
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
      { "@type": "ListItem", position: 2, name: "Антистресс", item: URL },
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
          <nav className="text-xs uppercase tracking-widest text-brand/60 mb-12">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Антистресс</span>
          </nav>

          <header className="mb-16 pb-12 border-b border-brand/10">
            <div className="text-xs uppercase tracking-widest text-brand/60 mb-4">
              Санкт-Петербург · Васильевский остров
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-brand mb-6 leading-tight">
              Антистресс-программы в Санкт-Петербурге
            </h1>
            <p className="text-base md:text-lg text-brand-dark/85 leading-relaxed max-w-2xl mb-8">
              Для тех, кто вымотан накопленным напряжением последних недель, а не одним тяжёлым днём. Спа-ритуалы для тела, головы и шеи, тёплая вода и тишина, в которой можно наконец ничего не решать.
            </p>
            <TrackedLink
              goal="BOOKING_CLICK"
              goalParams={{ from: "antistress_hero" }}
              href="/#booking"
              className="inline-block text-sm uppercase tracking-widest px-8 py-4 bg-brand text-sand hover:bg-brand-dark transition-colors"
            >
              Записаться
            </TrackedLink>
          </header>

          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Что это
            </h2>
            <div className="space-y-4 text-base text-brand-dark/85 leading-relaxed">
              <p>
                Отдельной процедуры под названием антистресс в Истове нет, и мы не хотим обещать больше, чем можем дать. Вместо этого у нас спокойные спа-ритуалы, которые решают ту же задачу: снимают телесное напряжение, дают нервной системе паузу и помогают выдохнуть после тяжёлого периода.
              </p>
              <p>
                Мастер расспрашивает о вашем состоянии перед началом и подбирает программу под запрос: кому-то нужна работа с шеей и плечами, кому-то расслабляющий массаж тела, кому-то мягкий уход за кожей головы.
              </p>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Программы, которые чаще всего выбирают
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {ANTISTRESS_PROGRAMS.map((p) => (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}/`}
                  className="group block border border-brand/10 bg-sand-soft p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all"
                >
                  <div className="font-display text-xl text-brand mb-2">{p.name}</div>
                  <div className="text-sm text-brand-dark/70 leading-relaxed mb-4">{p.teaser}</div>
                  <div className="flex justify-between items-end pt-3 border-t border-brand/10 text-xs">
                    <span className="uppercase tracking-widest text-brand/70 group-hover:text-brand transition-colors">
                      Открыть →
                    </span>
                    <span className="text-right">
                      <span className="font-display text-lg text-brand block">{p.price}</span>
                      <span className="text-brand-dark/60">~ {p.dur}</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-16 p-8 bg-sand-soft border border-brand/10">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Честно о границах
            </h2>
            <div className="space-y-4 text-base text-brand-dark/85 leading-relaxed">
              <p>
                Мы не медицинский центр и не ставим диагнозов. Спа-ритуалы снимают накопленное напряжение в теле и дают нервной системе передышку, но это уход и поддержка, а не лечение тревожных состояний или выгорания.
              </p>
              <p>
                Если состояние держится месяцами и мешает жить, разумнее сначала обратиться к психологу или врачу. Спа в этом случае хорошо работает рядом с такой поддержкой, но не вместо неё.
              </p>
            </div>
          </section>

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

          <section className="p-10 bg-brand text-sand text-center">
            <h2 className="font-display text-2xl md:text-3xl mb-4">
              Записаться на антистресс-программу
            </h2>
            <p className="text-base text-sand/85 leading-relaxed max-w-xl mx-auto mb-8">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, 10 минут пешком от м. Приморская. Администратор поможет выбрать ритуал под ваше состояние.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK"
                goalParams={{ from: "antistress_cta" }}
                href="/#booking"
                className="inline-block text-sm uppercase tracking-widest px-8 py-4 bg-sand text-brand hover:bg-sand-soft transition-colors"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK"
                goalParams={{ from: "antistress_cta" }}
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
