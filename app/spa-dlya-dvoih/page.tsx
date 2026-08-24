import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, ProgramCards, FeatureRow, FaqBlock } from "../components/LandingBlocks";
import { programs } from "../lib/programs-data";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/spa-dlya-dvoih/`;
const TITLE = "Спа для двоих в СПб: парные ритуалы на Васильевском | Истова";
const DESCRIPTION =
  "Спа для двоих в Санкт-Петербурге: парные ритуалы для тела и кожи головы, свой мастер у каждого. От 12 000 ₽ за двоих, м. Приморская. Тишина и время вместе.";

const PAIR_PROGRAMS = programs.filter((p) => p.pair_price);
const KEDR_LADA = programs.find((p) => p.slug === "kedr-lada");

const PHOTOS: Record<string, string> = {
  "zarya-telo": "/gallery/clean/skrab.jpg",
  "zarya-volosy": "/gallery/head-spa/aurora.jpg",
  "sumerki-telo": "/gallery/clean/massazh-golovy.jpg",
  "sumerki-volosy": "/gallery/frag-headspa.jpg",
  "rodnik": "/gallery/frag-care.jpg",
  "kedr": "/gallery/clean/sauna.jpg",
  "lada": "/gallery/frag-body.jpg",
  "yav": "/gallery/clean/chasha.jpg",
};

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
  keywords: ["спа для двоих спб", "спа для пары спб", "куда сходить вдвоем спб", "романтическое место спб", "Истова"],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Спа для двоих в Истове" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function SpaDlyaDvoihPage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org", "@type": "Service", "@id": `${URL}#service`,
    serviceType: "Спа для двоих", name: "Спа для двоих в Санкт-Петербурге", description: DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#organization` }, areaServed: { "@type": "City", name: "Санкт-Петербург" }, url: URL,
    offers: { "@type": "Offer", price: "12000", priceCurrency: "RUB", availability: "https://schema.org/InStock", url: URL },
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
      { "@type": "ListItem", position: 2, name: "Спа для двоих", item: URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <Header />

      <main className="bg-sand">
        <LandingHero
          eyebrow="Санкт-Петербург · Васильевский остров"
          title="Спа для двоих"
          lead="Провести время вместе, не разговаривая по очереди с телефоном в руке. Ритуалы проходят рядом: у каждого свой мастер, общий темп и тишина, в которой не нужно ничего решать."
          ctaFrom="spa_dlya_dvoih_hero"
          priceHint="от 12 000 ₽ за двоих · 90-180 минут"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Спа для двоих</span>
          </nav>

          <SplitBlock
            title="Два формата на выбор"
            paragraphs={[
              "Первый вариант проще: вы вдвоём проходите одну и ту же программу одновременно, каждый со своим мастером, а не по очереди. Так работает большинство ритуалов Истовы, и почти у каждого есть отдельная цена на двоих.",
              `Второй вариант для тех, кому одинаковая программа не подходит. Ритуал ${KEDR_LADA?.name ?? "КЕДР + ЛАДА"} собран из двух разных сценариев: для неё женская программа ЛАДА, для него мужская КЕДР. Оба идут параллельно, в одном пространстве, с общим финалом.`,
            ]}
            photo="/gallery/frag-tea.jpg"
            photoAlt="Чайная зона Истовы"
          />

          <FeatureRow
            items={[
              { title: "Каждому свой мастер", text: "Никто не ждёт своей очереди в коридоре: ритуалы идут одновременно и заканчиваются вместе." },
              { title: "Тишина без спешки", text: "Приглушённый свет, спокойный запах, отсутствие лишних разговоров. Время рассчитано с запасом." },
              { title: "Чай в финале", text: "После ритуала остаётся время просто посидеть рядом, не собираясь сразу бежать дальше." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/frag-water.jpg"
            alt="Водный ритуал в Истове"
            caption="Не нужен особый день, чтобы почувствовать себя особенной"
          />

          <ProgramCards
            title="Программы с ценой на двоих"
            programs={PAIR_PROGRAMS}
            photos={PHOTOS}
            showPairPrice
          />

          {KEDR_LADA && (
            <section className="pb-16">
              <Link
                href={`/programs/${KEDR_LADA.slug}/`}
                className="group block overflow-hidden rounded-[28px] border border-brand/10 bg-sand-soft hover:border-brand/30 transition-all duration-500"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto md:min-h-[280px] overflow-hidden">
                    <img
                      src="/gallery/frag-sauna.jpg"
                      alt={KEDR_LADA.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-3">
                      Два ритуала, прожитые вместе
                    </div>
                    <div className="font-display text-3xl text-brand mb-4">{KEDR_LADA.name}</div>
                    <p className="text-sm text-brand-dark/75 leading-relaxed mb-6">{KEDR_LADA.teaser}</p>
                    <div className="flex items-end justify-between pt-5 border-t border-brand/10">
                      <span className="text-xs uppercase tracking-widest text-brand/70 group-hover:text-brand transition-colors">
                        Открыть программу
                      </span>
                      <span className="text-right">
                        <span className="font-display text-2xl text-brand block leading-none">{KEDR_LADA.price}</span>
                        <span className="text-[11px] text-brand-dark/55">за двоих · ~ {KEDR_LADA.dur}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          <SplitBlock
            title="Когда стоит приходить вдвоём"
            flip
            paragraphs={[
              "Годовщина, день рождения, просто выходной, который хочется провести не за экраном. Спа для двоих подходит и для первого свидания без суеты, и для пары, которая вместе уже много лет и ищет повод отложить дела и побыть рядом.",
              "Отдельно это работает как подарок: сертификат на парную программу можно оформить заранее и вручить без привязки к конкретной дате визита.",
            ]}
            photo="/gallery/frag-tea.jpg"
            photoAlt="Чайная церемония в Истове"
          />

          <FaqBlock items={FAQ} />
        </div>

        <section className="bg-brand text-sand">
          <div className="container mx-auto px-6 max-w-3xl py-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-5">Записаться на спа для двоих</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, десять минут пешком от метро Приморская.
              Администратор поможет выбрать формат и время под вас двоих.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK"
                goalParams={{ from: "spa_dlya_dvoih_cta" }}
                href="/#booking"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK"
                goalParams={{ from: "spa_dlya_dvoih_cta" }}
                href="tel:+79013201050"
                className="inline-flex items-center justify-center px-9 py-3.5 border border-sand/40 text-sand rounded-full hover:bg-sand hover:text-brand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms]"
              >
                +7 (901) 320-10-50
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
