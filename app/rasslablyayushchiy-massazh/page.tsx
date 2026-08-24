import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import { programs } from "../lib/programs-data";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/rasslablyayushchiy-massazh/`;
const TITLE = "Расслабляющий массаж в СПб на Васильевском острове | Истова";
const DESCRIPTION =
  "Расслабляющий массаж тела и головы в Истове: мягкие техники, тёплая вода, без глубокой проработки боли. От 6800 ₽, м. Приморская. Записаться онлайн.";

const RELAX_SLUGS = ["sumerki-telo", "lada", "kedr", "sumerki-volosy"];
const RELAX_PROGRAMS = programs.filter((p) => RELAX_SLUGS.includes(p.slug));

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
    q: "Как записаться на расслабляющий массаж?",
    a: "Через форму на сайте, по телефону +7 (901) 320-10-50 или в Telegram @Istova_spa. Администратор поможет выбрать программу под ваш запрос.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "расслабляющий массаж спб",
    "релакс массаж спб",
    "расслабляющий массаж тела спб",
    "массаж для расслабления",
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
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Расслабляющий массаж в Истове" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.webp`],
  },
};

export default function RelaxMassagePage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${URL}#service`,
    serviceType: "Расслабляющий массаж",
    name: "Расслабляющий массаж в Санкт-Петербурге",
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
      { "@type": "ListItem", position: 2, name: "Расслабляющий массаж", item: URL },
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
            <span className="text-brand">Расслабляющий массаж</span>
          </nav>

          <header className="mb-16 pb-12 border-b border-brand/10">
            <div className="text-xs uppercase tracking-widest text-brand/60 mb-4">
              Санкт-Петербург · Васильевский остров
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-brand mb-6 leading-tight">
              Расслабляющий массаж в Санкт-Петербурге
            </h1>
            <p className="text-base md:text-lg text-brand-dark/85 leading-relaxed max-w-2xl mb-8">
              Мягкие техники, тёплая вода и неспешный темп для тех, кому нужно дать телу и нервной системе полноценно отдохнуть, а не проработать конкретную боль.
            </p>
            <TrackedLink
              goal="BOOKING_CLICK"
              goalParams={{ from: "rasslablyayushchiy_massazh_hero" }}
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
                Расслабляющий массаж работает мягче и ровнее лечебного: длинные плавные движения вместо глубокого продавливания мышц. Задача снизить общую активность нервной системы и дать телу почувствовать покой, а не исправить конкретную проблему.
              </p>
              <p>
                В Истове это часть спа-ритуала, а не отдельная десятиминутная процедура: тёплая вода, массаж тела, головы и шейно-воротниковой зоны, где обычно и копится напряжение от сидячей работы и постоянной занятости.
              </p>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
              Программы с расслабляющим массажем
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {RELAX_PROGRAMS.map((p) => (
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
              Записаться на расслабляющий массаж
            </h2>
            <p className="text-base text-sand/85 leading-relaxed max-w-xl mx-auto mb-8">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, 10 минут пешком от м. Приморская. Мастер поможет выбрать программу под ваше состояние.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK"
                goalParams={{ from: "rasslablyayushchiy_massazh_cta" }}
                href="/#booking"
                className="inline-block text-sm uppercase tracking-widest px-8 py-4 bg-sand text-brand hover:bg-sand-soft transition-colors"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK"
                goalParams={{ from: "rasslablyayushchiy_massazh_cta" }}
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
