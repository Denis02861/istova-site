import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, ProgramCards, FeatureRow, FaqBlock } from "../components/LandingBlocks";
import { programs } from "../lib/programs-data";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/antistress/`;
const TITLE = "Антистресс-программы в СПб: спа-ритуалы против напряжения | Истова";
const DESCRIPTION =
  "Антистресс на Васильевском острове: спа-ритуалы для тела, головы и шеи, которые снимают накопленное напряжение. От 6800 ₽, м. Приморская. Без обещаний лечения.";

const SLUGS = ["sumerki-telo", "sumerki-volosy", "kedr", "lada", "yav"];
const ANTISTRESS_PROGRAMS = programs.filter((p) => SLUGS.includes(p.slug));

const PHOTOS: Record<string, string> = {
  "sumerki-telo": "/gallery/clean/massazh-golovy.jpg",
  "sumerki-volosy": "/gallery/frag-headspa.jpg",
  "kedr": "/gallery/clean/sauna.jpg",
  "lada": "/gallery/frag-body.jpg",
  "yav": "/gallery/clean/chasha.jpg",
};

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
    q: "Как понять, что мне нужен именно расслабляющий формат?",
    a: "Если беспокоит не конкретная боль, а общая перегрузка, усталость и невозможность расслабиться самостоятельно, подойдёт расслабляющий формат. Подробнее мы разобрали разницу в статье про расслабляющий массаж.",
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
  keywords: ["антистресс спб", "антистресс программа спб", "снять стресс спб", "спа против стресса", "Истова"],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Антистресс-программы в Истове" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function AntistressPage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org", "@type": "Service", "@id": `${URL}#service`,
    serviceType: "Антистресс-программа", name: "Антистресс-программы в Санкт-Петербурге", description: DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#organization` }, areaServed: { "@type": "City", name: "Санкт-Петербург" }, url: URL,
    offers: { "@type": "Offer", price: "6800", priceCurrency: "RUB", availability: "https://schema.org/InStock", url: URL },
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
      { "@type": "ListItem", position: 2, name: "Антистресс", item: URL },
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
          title="Когда напряжение копилось неделями"
          lead="Для тех, кто вымотан накопленным напряжением последних недель, а не одним тяжёлым днём. Ритуалы для тела, головы и шеи, тёплая вода и тишина, в которой можно наконец ничего не решать."
          ctaFrom="antistress_hero"
          priceHint="от 6800 ₽ · 75-150 минут"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Антистресс</span>
          </nav>

          <SplitBlock
            title="Что это на самом деле"
            paragraphs={[
              "Отдельной процедуры под названием антистресс в Истове нет, и мы не хотим обещать больше, чем можем дать. Вместо этого у нас спокойные спа-ритуалы, которые решают ту же задачу: снимают телесное напряжение, дают нервной системе паузу и помогают выдохнуть после тяжёлого периода.",
              "Мастер расспрашивает о вашем состоянии перед началом и подбирает программу под запрос: кому-то нужна работа с шеей и плечами, кому-то расслабляющий массаж тела, кому-то мягкий уход за кожей головы.",
            ]}
            photo="/gallery/frag-massage.jpg"
            photoAlt="Расслабляющий массаж в Истове"
          />

          <FeatureRow
            items={[
              { title: "Разговор до начала", text: "Мастер спрашивает, где копится напряжение и что беспокоит, и подбирает интенсивность под это." },
              { title: "Работа с шеей", text: "Шейно-воротниковая зона входит почти во все ритуалы: у большинства гостей напряжение оседает именно там." },
              { title: "Время без спешки", text: "От 75 до 150 минут. Ничего активного сразу после планировать не стоит, вечер лучше оставить медленным." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/frag-sauna.jpg"
            alt="Финская сауна в Истове"
            caption="Тишина, в которой не нужно ничего решать"
          />

          <ProgramCards title="Программы, которые чаще всего выбирают" programs={ANTISTRESS_PROGRAMS} photos={PHOTOS} />

          <SplitBlock
            title="Честно о границах"
            flip
            paragraphs={[
              "Мы не медицинский центр и не ставим диагнозов. Спа-ритуалы снимают накопленное напряжение в теле и дают нервной системе передышку, но это уход и поддержка, а не лечение тревожных состояний или выгорания.",
              "Если состояние держится месяцами и мешает жить, разумнее сначала обратиться к психологу или врачу. Спа в этом случае хорошо работает рядом с такой поддержкой, но не вместо неё.",
            ]}
            photo="/gallery/frag-tea.jpg"
            photoAlt="Чай в лаунж-зоне Истовы"
          />

          <section className="pb-4">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-4">Разобраться подробнее</div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { href: "/blog/kak-snizit-kortizol/", t: "Как снизить кортизол", d: "Что работает по исследованиям, а что миф" },
                  { href: "/blog/vygoranie/", t: "Выгорание или усталость", d: "Как отличить и когда пора к специалисту" },
                  { href: "/blog/chto-snimaet-stress/", t: "Что реально снимает стресс", d: "Алкоголь, сериалы, спорт, массаж" },
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
            <h2 className="font-display text-3xl md:text-4xl mb-5">Записаться на ритуал</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, десять минут пешком от метро Приморская.
              Администратор поможет выбрать программу под ваше состояние.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK" goalParams={{ from: "antistress_cta" }} href="/#booking"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK" goalParams={{ from: "antistress_cta" }} href="tel:+79013201050"
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
