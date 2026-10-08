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
// Слово «цена» вынесено в title и описание намеренно: по Вебмастеру за 30 дней
// «спа массаж для двоих цена» 39 показов, «спа для двоих цена» 29, «спа для двоих
// цены» 24, и по всем трём ноль кликов. Цены на странице были, а в сниппете нет.
// Вордстат по СПб, снято 07.10.2026: рядом с «спа для двоих» (1695) стоит
// «массаж для двоих» (737) и «спа для пары» (248). Этих слов в заголовке
// и описании не было вовсе, отсюда узкий охват и выпадение из топ-100.
// Правка 08.10.2026, по выгрузке Вебмастера за период до 07.10 (834 показа в кусте
// «для двоих», 134 запроса, медиана позиции 11,0 при 6 кликах). Закрыты три
// подкуста, которых на странице не было ни одним словом:
//   аудитория не-пара  «спа для двоих девушек» 10 показов поз 12,9,
//                      «спа для двоих женщин» 6 показов поз 10,5
//   повод и время      «спа вечер для двоих» 14 поз 9,8,
//                      «выходные спа для двоих» 14 поз 8,1
//   приватность        «приватный спа спб для двоих» 8 поз 9,1
// НЕ закрыты намеренно: «спа на целый день для двоих» (33 показа), такого формата
// нет, максимум 3 часа; «абонемент в спа на двоих» (16 показов), такой услуги нет.
// Писать страницу под то, чего нет в прайсе, нельзя.
// Текст про смежные кабинеты поправлен: раньше в одном абзаце был «один кабинет»,
// а подписью к фото «два кабинета рядом». По плану помещения парные зоны это 1+2 и 5+6.
const TITLE = "Спа и массаж для двоих в СПб — цены от 12 000 ₽ за пару · Истова";
const DESCRIPTION =
  "Спа и массаж для двоих в Санкт-Петербурге: парные спа-программы для пары, свой мастер у каждого, оба ритуала идут одновременно. Цены на двоих от 12 000 ₽.";

const PAIR_PROGRAMS = programs.filter((p) => p.pair_price);
const KEDR_LADA = programs.find((p) => p.slug === "kedr-lada");

const PHOTOS: Record<string, string> = {
  "zarya-telo": "/gallery/clean/skrab.webp",
  "zarya-volosy": "/gallery/head-spa/aurora.webp",
  "sumerki-telo": "/gallery/clean/massazh-golovy.webp",
  "sumerki-volosy": "/gallery/frag-headspa.webp",
  "rodnik": "/gallery/frag-care.webp",
  "kedr": "/gallery/clean/sauna.jpg",
  "lada": "/gallery/frag-body.webp",
  "yav": "/gallery/clean/chasha.webp",
};

const FAQ = [
  {
    q: "Как проходит спа для двоих в Истове?",
    a: "Два формата на выбор. Первый: вы оба проходите один и тот же ритуал одновременно, каждый со своим мастером, по цене вдвоём. Второй: ритуал КЕДР + ЛАДА, где у него и у неё разные программы, но идут они параллельно и заканчиваются вместе.",
  },
  {
    q: "Сколько стоит спа для двоих?",
    a: "Цена указана за двоих целиком, а не за человека. ЯВЬ на двоих стоит 12 000 рублей, РОДНИК 14 000, ЗАРЯ и СУМЕРКИ для волос по 16 000, ЗАРЯ для тела 17 000, СУМЕРКИ для тела 18 000, а парный КЕДР и ЛАДА 21 000 рублей. Вдвоём всегда выходит дешевле, чем два одиночных визита по той же программе.",
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
    q: "Чем парный массаж для двоих отличается от двух записей подряд?",
    a: "Тем, что вы не ждёте друг друга. При двух обычных записях один проходит ритуал, второй сидит в лаунже, и вечер растягивается вдвое. В парном формате работают два мастера одновременно: начинаете вместе и заканчиваете вместе, а чай в финале пьёте уже вдвоём.",
  },
  {
    q: "Подойдёт ли это для романтического вечера?",
    a: "Да, парные ритуалы чаще всего и берут на годовщину или день рождения. Но формат спокойный, без свечей и лепестков: тишина, тёплая вода, приглушённый свет. Если нужен именно антураж, предупредите заранее при записи.",
  },
  {
    q: "Можно ли прийти не парой, а с подругой?",
    a: "Да, парную программу часто берут подруги, сёстры, мама с дочерью. Формат от этого не меняется: два мастера работают одновременно, цена остаётся ценой на двоих. Романтический сценарий никто не навязывает, при записи достаточно сказать, что вы приходите не как пара.",
  },
  {
    q: "Во сколько лучше приходить вдвоём вечером или в выходные?",
    a: "Истова работает с 10 до 22 все семь дней. Самый длинный парный ритуал идёт три часа, для него стоит выбирать время до 19 часов. Программы на 90 минут спокойно начинаются и в 20:00. Субботу и воскресенье разбирают раньше остальных дней, время на выходные лучше занимать заранее.",
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
          title="Спа и массаж для двоих"
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
              "Если вы искали массаж для двоих, а не спа целиком, он входит в каждую парную программу: в СУМЕРКАХ это массаж тела 45 минут, в КЕДРЕ работа тёплыми камнями. Отдельно парный расслабляющий массаж тоже есть, на 60 и на 90 минут.",
              "Спа программа для двоих у нас камерная и приватная: только вы двое и два мастера, в смежных кабинетах, без общего зала и чужих людей рядом. Бассейна и банного комплекса нет, и если вы ищете спа для пары именно с бассейном, это не к нам. Мы про тишину и работу руками, а не про аквазону.",
            ]}
            photo="/gallery/2026-09/sauna-dvoe.webp"
            photoAlt="Двое в финской сауне Истовы"
          />

          <FeatureRow
            items={[
              { title: "Каждому свой мастер", text: "Никто не ждёт своей очереди в коридоре: ритуалы идут одновременно и заканчиваются вместе." },
              { title: "Тишина без спешки", text: "Приглушённый свет, спокойный запах, отсутствие лишних разговоров. Время рассчитано с запасом." },
              { title: "Чай в финале", text: "После ритуала остаётся время просто посидеть рядом, не собираясь сразу бежать дальше." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/2026-09/dvoe-parallelno.webp"
            alt="Два ритуала идут одновременно в смежных кабинетах"
            caption="Два кабинета рядом: ритуалы идут одновременно и заканчиваются вместе"
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
                      src="/gallery/frag-sauna.webp"
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
              "Приходят не только парами. Две подруги, сёстры, мама с дочерью: в парной программе рядом просто два человека, которым спокойно молчать вместе. Цена на двоих от этого не меняется, и выбирать романтический сценарий никто не обязывает.",
              "Чаще всего берут вечер после работы и выходные. Истова открыта с 10 до 22 все семь дней, самый длинный парный ритуал идёт три часа, поэтому спа-вечер для двоих успевает вместить программу целиком и чай в финале без спешки. На субботу и воскресенье время разбирают раньше, их стоит занимать заранее.",
              "Отдельно это работает как подарок: сертификат на парную программу можно оформить заранее и вручить без привязки к конкретной дате визита.",
            ]}
            photo="/gallery/frag-tea.webp"
            photoAlt="Чайная церемония в Истове"
          />

          {/* Раздел для двоих не ссылался на блог вообще, хотя соседние посадочные
              ведут на три статьи каждая. Связь была односторонней. */}
          <section className="pb-4">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-4">Разобраться подробнее</div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { href: "/blog/kak-rasslabitsya/", t: "Как расслабиться по-настоящему", d: "Что работает, а что только кажется отдыхом" },
                  { href: "/blog/chto-takoe-head-spa/", t: "Что такое head spa", d: "Откуда пришла техника и как проходит" },
                  { href: "/blog/rasslablyayushchiy-massazh/", t: "Расслабляющий массаж", d: "Чем отличается от лечебного" },
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
            <h2 className="font-display text-3xl md:text-4xl mb-5">Записаться на спа для двоих</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, десять минут пешком от метро Приморская.
              Администратор поможет выбрать формат и время под вас двоих.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK"
                goalParams={{ from: "spa_dlya_dvoih_cta" }}
                href="/go/zapis/?from=page_spa_dlya_dvoih" rel="nofollow"
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
              <TrackedLink
                goal="TG_CLICK" goalParams={{ from: "spa_dlya_dvoih_cta" }} href="https://t.me/Istova_spa"
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
