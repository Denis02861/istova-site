import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, ProgramCards, FeatureRow, FaqBlock } from "../components/LandingBlocks";
import { programs } from "../lib/programs-data";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/rasslablyayushchiy-massazh/`;
const TITLE = "Расслабляющий массаж в СПб на Васильевском острове | Истова";
const DESCRIPTION =
  "Расслабляющий массаж тела и головы в Истове: мягкие техники, тёплая вода, без глубокой проработки боли. От 6800 ₽, м. Приморская. Записаться онлайн.";

const SLUGS = ["sumerki-telo", "lada", "kedr", "sumerki-volosy"];
const RELAX_PROGRAMS = programs.filter((p) => SLUGS.includes(p.slug));

const PHOTOS: Record<string, string> = {
  "sumerki-telo": "/gallery/clean/massazh-golovy.jpg",
  "lada": "/gallery/frag-body.jpg",
  "kedr": "/gallery/clean/sauna.jpg",
  "sumerki-volosy": "/gallery/frag-headspa.jpg",
};

const FAQ = [
  {
    q: "Чем расслабляющий массаж отличается от лечебного?",
    a: "Расслабляющий работает мягче, длинными плавными движениями и снижает активность нервной системы. Лечебный точечно и глубже воздействует на конкретную боль или спазм. Подробный разбор есть в нашей статье про расслабляющий массаж.",
  },
  {
    q: "Сколько стоит расслабляющий массаж в Истове?",
    a: "Расслабляющий массаж у нас часть спа-ритуала, а не отдельная короткая процедура. Стоимость начинается от 6800 рублей в зависимости от программы, точную цену подскажет администратор.",
  },
  {
    q: "Массаж только для тела или головы тоже?",
    a: "И для тела, и для головы: в наших ритуалах расслабляющий массаж тела сочетается с работой с кожей головы и шейно-воротниковой зоной, откуда чаще всего идёт напряжение.",
  },
  {
    q: "Что происходит с организмом во время расслабляющего массажа?",
    a: "Исследования показывают, что при умеренном давлении растёт активность парасимпатической нервной системы, отвечающей за покой и восстановление. Тело физически переключается из режима тревоги в режим отдыха.",
  },
  {
    q: "Как записаться на расслабляющий массаж?",
    a: "Через форму на сайте, по телефону +7 (901) 320-10-50 или в Telegram @Istova_spa. Администратор поможет выбрать программу под ваш запрос.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: ["расслабляющий массаж спб", "релакс массаж спб", "расслабляющий массаж тела спб", "массаж для расслабления", "Истова"],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Расслабляющий массаж в Истове" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function RelaxMassagePage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org", "@type": "Service", "@id": `${URL}#service`,
    serviceType: "Расслабляющий массаж", name: "Расслабляющий массаж в Санкт-Петербурге", description: DESCRIPTION,
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
      { "@type": "ListItem", position: 2, name: "Расслабляющий массаж", item: URL },
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
          title="Расслабляющий массаж"
          lead="Мягкие техники, тёплая вода и неспешный темп для тех, кому нужно дать телу и нервной системе полноценно отдохнуть, а не проработать конкретную боль."
          ctaFrom="rasslablyayushchiy_massazh_hero"
          priceHint="от 6800 ₽ · 75-150 минут"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Расслабляющий массаж</span>
          </nav>

          <SplitBlock
            title="Что это"
            paragraphs={[
              "Расслабляющий массаж работает мягче и ровнее лечебного: длинные плавные движения вместо глубокого продавливания мышц. Задача снизить общую активность нервной системы и дать телу почувствовать покой, а не исправить конкретную проблему.",
              "В Истове это часть спа-ритуала, а не отдельная десятиминутная процедура: тёплая вода, массаж тела, головы и шейно-воротниковой зоны, где обычно и копится напряжение от сидячей работы.",
            ]}
            photo="/gallery/clean/skrab.jpg"
            photoAlt="Ритуал ухода за телом в Истове"
          />

          <FeatureRow
            items={[
              { title: "Умеренное давление", text: "Исследования фиксируют рост активности парасимпатической нервной системы именно при таком воздействии." },
              { title: "Тело и голова вместе", text: "Массаж тела сочетается с работой с кожей головы и шеей, а не идёт отдельно от них." },
              { title: "Без работы через боль", text: "Если нужна точечная проработка спазма, это другой формат. Мастер скажет об этом прямо." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/frag-water.jpg"
            alt="Водный ритуал в Истове"
            caption="Тело замедляется, дыхание выравнивается, напряжение отпускает слой за слоем"
          />

          <ProgramCards title="Программы с расслабляющим массажем" programs={RELAX_PROGRAMS} photos={PHOTOS} />

          <section className="pb-4">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-4">Разобраться подробнее</div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { href: "/blog/rasslablyayushchiy-massazh/", t: "Расслабляющий или лечебный", d: "Чем отличаются и когда нужен какой" },
                  { href: "/blog/sheya-posle-raboty/", t: "Шея после рабочего дня", d: "Откуда зажимы и почему болит голова" },
                  { href: "/blog/kak-snizit-kortizol/", t: "Кортизол и массаж", d: "Что показали исследования" },
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
            <h2 className="font-display text-3xl md:text-4xl mb-5">Записаться на расслабляющий массаж</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, десять минут пешком от метро Приморская.
              Мастер поможет выбрать программу под ваше состояние.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK" goalParams={{ from: "rasslablyayushchiy_massazh_cta" }} href="/#booking"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK" goalParams={{ from: "rasslablyayushchiy_massazh_cta" }} href="tel:+79013201050"
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
