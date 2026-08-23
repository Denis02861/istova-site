import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import { programs } from "../lib/programs-data";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/spa-dlya-dvoih/`;
const TITLE = "Спа для двоих в СПб: парные ритуалы на Васильевском | Истова";
const DESCRIPTION =
  "Спа для двоих в Санкт-Петербурге: парные ритуалы для тела и кожи головы, свой мастер у каждого. От 12 000 ₽ за двоих, м. Приморская. Тишина и время вместе.";

const PAIR_PROGRAMS = programs.filter((p) => p.pair_price);
const KEDR_LADA = programs.find((p) => p.slug === "kedr-lada");

const FAQ = [
  {
    q: "Как проходит спа для двоих в Истове?",
    a: "Два формата на выбор. Первый: вы оба проходите один и тот же ритуал одновременно, каждый со своим мастером, по цене вдвоём. Второй: ритуал КЕДР + ЛАДА, где у него и у неё разные программы, но идут они параллельно и заканчиваются вместе.",
  },
  {
    q: "Сколько стоит спа для двоих?",
    a: "Стоимость вдвоём зависит от программы и начинается от 12 000 рублей. Точную цену под выбранный ритуал подскажет администратор при записи.",
  },
  {
    q: "Можно ли выбрать разные программы для двоих?",
    a: "Да, для этого есть ритуал КЕДР + ЛАДА: для неё женская программа ЛАДА, для него мужская КЕДР, каждый со своим мастером, но одновременно и в одном пространстве.",
  },
  {
    q: "Подходит ли спа для двоих в подарок?",
    a: "Да, это частый повод для визита: день рождения, годовщина, просто желание провести время вместе без телефонов. Записаться можно заранее на удобную дату.",
  },
  {
    q: "Как записаться на спа для двоих?",
    a: "Через форму на сайте, по телефону +7 (901) 320-10-50 или в Telegram @Istova_spa. Администратор подберёт программу и время на двоих.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "спа для двоих спб",
    "спа для пары спб",
    "куда сходить вдвоем спб",
    "романтическое место спб",
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
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Спа для двоих в Истове" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.webp`],
  },
};

export default function SpaDlyaDvoihPage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${URL}#service`,
    serviceType: "Спа для двоих",
    name: "Спа для двоих в Санкт-Петербурге",
    description: DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Санкт-Петербург" },
    url: URL,
    offers: {
      "@type": "Offer",
      price: "12000",
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
      { "@type": "ListItem", position: 2, name: "Спа для двоих", item: URL },
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
            <span className="text-brand">Спа для двоих</span>
          </nav>

          <header className="mb-16 pb-12 border-b border-brand/10">
            <div className="text-xs uppercase tracking-widest text-brand/60 mb-4">
              Санкт-Петербург · Васильевский остров
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-brand mb-6 leading-tight">
              Спа для двоих в Санкт-Петербурге
            </h1>
            <p className="text-base md:text-lg text-brand-dark/85 leading-relaxed max-w-2xl mb-8">
              Провести время вместе, не разговаривая по очереди с телефоном в руке. Парные спа-ритуалы Истовы проходят рядом: у каждого свой мастер, общий темп и тишина, в которой не нужно ничего решать и обсуждать.
            </p>
            <TrackedLink
              goal="BOOKING_CLICK"
              goalParams={{ from: "spa_dlya_dvoih_hero" }}
              href="/#booking"
              className="inline-block text-sm uppercase tracking-widest px-8 py-4 bg-brand text-sand hover:bg-brand-dark transition-colors"
            >
              Записаться вдвоём
            </TrackedLink>
          </header>

          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Два формата на выбор
            </h2>
            <div className="space-y-4 text-base text-brand-dark/85 leading-relaxed">
              <p>
                Первый вариант проще: вы вдвоём проходите одну и ту же программу одновременно, каждый со своим мастером, а не по очереди. Так работает большинство ритуалов Истовы, и почти у каждого есть отдельная цена на двоих.
              </p>
              <p>
                Второй вариант для тех, кому одинаковая программа не подходит. Ритуал {KEDR_LADA?.name ?? "КЕДР + ЛАДА"} собран из двух разных сценариев: ей женский ритуал ЛАДА, ему мужской КЕДР. Оба идут параллельно, в одном пространстве, с общим финалом.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Программы с ценой на двоих
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {PAIR_PROGRAMS.map((p) => (
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
                      <span className="font-display text-lg text-brand block">Вдвоём {p.pair_price}</span>
                      <span className="text-brand-dark/60">~ {p.dur}</span>
                    </span>
                  </div>
                </Link>
              ))}
              {KEDR_LADA && (
                <Link
                  href={`/programs/${KEDR_LADA.slug}/`}
                  className="group block border border-brand/10 bg-sand-soft p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all sm:col-span-2"
                >
                  <div className="text-[10px] uppercase tracking-widest text-brand/60 mb-2">
                    {KEDR_LADA.accent}
                  </div>
                  <div className="font-display text-xl text-brand mb-2">{KEDR_LADA.name}</div>
                  <div className="text-sm text-brand-dark/70 leading-relaxed mb-4">{KEDR_LADA.teaser}</div>
                  <div className="flex justify-between items-end pt-3 border-t border-brand/10 text-xs">
                    <span className="uppercase tracking-widest text-brand/70 group-hover:text-brand transition-colors">
                      Открыть →
                    </span>
                    <span className="text-right">
                      <span className="font-display text-lg text-brand block">{KEDR_LADA.price} за двоих</span>
                      <span className="text-brand-dark/60">~ {KEDR_LADA.dur}</span>
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </section>

          <section className="mb-16 p-8 bg-sand-soft border border-brand/10">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Когда стоит приходить вдвоём
            </h2>
            <div className="space-y-4 text-base text-brand-dark/85 leading-relaxed">
              <p>
                Годовщина, день рождения, просто выходной, который хочется провести не за экраном. Спа для двоих подходит и для первого свидания без суеты, и для пары, которая вместе уже много лет и ищет повод отложить дела и побыть рядом.
              </p>
              <p>
                Отдельно это работает как подарок: сертификат на парную программу можно оформить заранее и вручить без привязки к конкретной дате визита.
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
              Записаться на спа для двоих
            </h2>
            <p className="text-base text-sand/85 leading-relaxed max-w-xl mx-auto mb-8">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, 10 минут пешком от м. Приморская. Администратор поможет выбрать формат и время под вас двоих.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK"
                goalParams={{ from: "spa_dlya_dvoih_cta" }}
                href="/#booking"
                className="inline-block text-sm uppercase tracking-widest px-8 py-4 bg-sand text-brand hover:bg-sand-soft transition-colors"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK"
                goalParams={{ from: "spa_dlya_dvoih_cta" }}
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
