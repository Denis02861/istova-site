import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, ProgramCards, FeatureRow, FaqBlock } from "../components/LandingBlocks";
import { programs } from "../lib/programs-data";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/massazh-golovy/`;
const TITLE = "Массаж головы в СПб: спа-массаж головы на Васильевском | Истова";
const DESCRIPTION =
  "Спа-массаж головы 75–150 минут: тёплая вода «золотой дуги», работа с шеей и плечами, уход Davines, сушка и укладка в финале. От 6800 ₽, м. Приморская.";

const SLUGS = ["zarya-volosy", "sumerki-volosy", "rodnik", "yav"];
const HEAD_PROGRAMS = programs.filter((p) => SLUGS.includes(p.slug));

const PHOTOS: Record<string, string> = {
  "zarya-volosy": "/gallery/head-spa/aurora.jpg",
  "sumerki-volosy": "/gallery/head-spa/jade.jpg",
  "rodnik": "/gallery/frag-care.jpg",
  "yav": "/gallery/head-spa/wooden.jpg",
};

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
    q: "Массаж головы влияет на волосы?",
    a: "Исследования показывают, что регулярный массаж может увеличивать толщину волоса и улучшать состояние кожи головы. Средством от облысения он не является. Подробный разбор есть в нашей статье про волосы.",
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
  keywords: ["массаж головы спб", "спа массаж головы спб", "массаж головы в спб", "расслабляющий массаж головы спб", "массаж кожи головы", "Истова"],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Массаж головы в Истове" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function MassazhGolovyPage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org", "@type": "Service", "@id": `${URL}#service`,
    serviceType: "Массаж головы", name: "Спа-массаж головы в Санкт-Петербурге", description: DESCRIPTION,
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
      { "@type": "ListItem", position: 2, name: "Массаж головы в Санкт-Петербурге", item: URL },
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
          title="Массаж головы"
          lead="Спокойный спа-массаж для тех, кто много думает и к вечеру ощущает тяжесть в затылке и шее. Мягкие техники, тёплая вода, уход за волосами и тишина, в которой можно наконец ни о чём не думать."
          ctaFrom="massazh_golovy_hero"
          priceHint="от 6800 ₽ · 75-150 минут"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Массаж головы</span>
          </nav>

          <SplitBlock
            title="Что это"
            paragraphs={[
              "Массаж головы в Истове это не быстрая процедура между делом, а часть спокойного спа-ритуала. Мастер работает с кожей головы, висками, затылком и зоной шеи и плеч, куда чаще всего уходит дневное напряжение.",
              "Мы не ставим задачу что-то исправить во внешности. Задача другая: помочь расслабиться и дать голове отдохнуть так, как это редко получается в обычном дне.",
            ]}
            photo="/gallery/head-spa/aurora.jpg"
            photoAlt="Водный ритуал Золотая дуга"
          />

          <FeatureRow
            items={[
              { title: "Тёплая вода", text: "Авторский водный ритуал делает массаж мягче и глубже, чем работа только руками." },
              { title: "Шея и плечи", text: "Зона, откуда напряжение обычно и приходит в голову. Входит почти во все программы." },
              { title: "Уход Davines", text: "После массажа кожа головы получает уход, а волосы приводят в порядок." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/head-spa/jade.jpg"
            alt="Ритуал ухода за кожей головы"
            caption="Уходит тяжесть в голове, ночью легче засыпается, мысли становятся тише"
          />

          <ProgramCards title="Программы с массажем головы" programs={HEAD_PROGRAMS} photos={PHOTOS} />

          <SplitBlock
            title="Как проходит"
            flip
            paragraphs={[
              "Сначала короткий разговор с мастером: как вы себя чувствуете, есть ли чувствительность кожи, какой аромат приятнее. Дальше начинается сам уход, с мягким массажем и тёплой водой, без спешки и лишних движений.",
              "Точную последовательность мастер выстраивает под вас на месте. Ближе к финалу приводит волосы в порядок, и остаётся время спокойно посидеть с чаем. Ничего активного сразу после планировать не стоит.",
            ]}
            photo="/gallery/head-spa/wooden.jpg"
            photoAlt="Гребни для массажа головы"
          />

          <section className="pb-4">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-4">Разобраться подробнее</div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { href: "/blog/chto-takoe-head-spa/", t: "Что такое head spa", d: "Формат простыми словами" },
                  { href: "/blog/kak-snizit-kortizol/", t: "Массаж и кортизол", d: "Что показали исследования" },
                  { href: "/blog/vypadenie-volos-i-massazh-golovy/", t: "Массаж и волосы", d: "Честно про то, чего ждать не стоит" },
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
            <h2 className="font-display text-3xl md:text-4xl mb-5">Записаться на массаж головы</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, десять минут пешком от метро Приморская.
              Мастер поможет выбрать ритуал под ваше состояние.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK" goalParams={{ from: "massazh_golovy_cta" }} href="/#booking"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK" goalParams={{ from: "massazh_golovy_cta" }} href="tel:+79013201050"
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
