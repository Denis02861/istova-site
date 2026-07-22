import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { programs } from "../../lib/programs-data";
import Header from "../../components/Header";
import TrackedLink from "../../components/TrackedLink";
import Footer from "../../components/Footer";
import ProgramTracker from "../../components/ProgramTracker";

const SITE_URL = "https://istova.ru";

const SHORT_DESC: Record<string, string> = {
  "zarya-telo":
    "Утренний ритуал пробуждения через тело: финская сауна с бодрящими эфирами, пилинг с гималайской солью, тонизирующий массаж 45 мин, СПА-уход для лица с криосферами.",
  "zarya-volosy":
    "Утренняя head spa (90 мин): тонизирующий массаж с криосферами, охлаждающая каменная маска для глаз, Золотая дуга, Davines, пенный массаж головы, кисти на цитрусе, сенсорный массаж.",
  "sumerki-telo":
    "Вечерний ритуал (120 мин): финская сауна с лавандой, кремовый пилинг, питательная маска-обёртывание, СПА-массаж 45 мин, тёплая маска для глаз, согревание кистей и стоп.",
  "sumerki-volosy":
    "Вечерняя head spa (90 мин): расслабляющий массаж лица, тёплая маска для глаз, сенсорный массаж головы, травяной ритуал, Золотая дуга, Davines, согревание кистей и стоп.",
  "kedr-lada":
    "Парный ритуал для двоих (3 часа): он — КЕДР (хвойная сауна, кедровый пилинг, бамбук, тёплые камни 60 мин), она — ЛАДА (цветочная сауна, кесе-пилинг, массаж с розой, гуаша). Обоим — уход за лицом, массаж головы, Золотая дуга, Davines. Цена указана за двоих.",
  "yav":
    "Ритуал знакомства с Истовой (75 мин): выбор аромата, массаж спины/плеч/рук, массаж головы, лицо, Золотая дуга, Davines, кисти, звучание чаши. Без сауны.",
  "kedr":
    "Ритуал силы и восстановления (150 мин): хвойная сауна, кедровый солевой пилинг, бамбуковые палочки, тёплые камни 60 мин, СПА-уход для лица, Золотая дуга, Davines, кедровый ритуал для кистей и стоп.",
  "lada":
    "Женский спа-ритуал (150 мин): выбор цветочного аромата, финская сауна, турецкий пилинг кесе, СПА-массаж тела 45 мин, гуаша+нефрит для лица, ритуал кистей с нероли, звучание чаши.",
  "rodnik":
    "Ритуал женского восстановления (75 мин): массаж лица и ШВЗ, деликатный СПА-уход, прохладные каменные ролики, массаж головы, Золотая дуга, Davines, ритуал лёгкости для голеней и стоп.",
};

const SHORT_TITLE_ACCENT: Record<string, string> = {
  "zarya-volosy": "УТРО · Пробуждение кожи головы",
  "sumerki-volosy": "ВЕЧЕР · Расслабление кожи головы",
};

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};
  const titleAccent = SHORT_TITLE_ACCENT[slug] ?? program.accent ?? "";
  const title = `${program.name} — ${titleAccent} | Истова`;
  const rawDesc = SHORT_DESC[slug] ?? program.accent ?? "";
  const description = `${rawDesc} ${program.dur}, ${program.price}.`.replace(/\s+/g, " ").trim();
  const url = `${SITE_URL}/programs/${slug}/`;
  return {
    title,
    description,
    keywords: [
      program.name,
      "спа-ритуал Санкт-Петербург",
      "спа Васильевский остров",
      "Истова",
      `${program.dur} спа`,
    ],
    authors: [{ name: "Истова", url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Истова",
      title,
      description,
      locale: "ru_RU",
      publishedTime: "2026-06-09T00:00:00+03:00",
      modifiedTime: "2026-07-03T00:00:00+03:00",
      authors: ["Истова"],
      images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: program.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const rawDesc = SHORT_DESC[slug] ?? program.accent ?? "";
  const description = `${rawDesc} ${program.dur}, ${program.price}.`.replace(/\s+/g, " ").trim();
  const url = `${SITE_URL}/programs/${slug}/`;

  const SERVICE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType: program.name,
    name: program.name,
    description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Санкт-Петербург" },
    offers: {
      "@type": "Offer",
      price: program.price.replace(/[^\d]/g, ""),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url,
      validFrom: "2026-06-09",
    },
    datePublished: "2026-06-09",
    dateModified: "2026-07-03",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "ru-RU",
  };

  const FAQ_JSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Сколько длится ритуал \"${program.name}\"?`,
        acceptedAnswer: { "@type": "Answer", text: `Продолжительность — примерно ${program.dur}. Точное время зависит от вашего темпа отдыха между этапами.` },
      },
      {
        "@type": "Question",
        name: `Сколько стоит ритуал \"${program.name}\"?`,
        acceptedAnswer: { "@type": "Answer", text: `Стоимость одиночного визита — ${program.price}. Ритуал можно провести вдвоём в двух смежных кабинетах со скидкой (для этого ритуала — ${program.pair_price ?? "уточните у администратора"}).` },
      },
      {
        "@type": "Question",
        name: "Что взять с собой?",
        acceptedAnswer: { "@type": "Answer", text: "Ничего специального. Полотенца, халат, тапочки и уходовая косметика включены. За 1,5-2 часа до визита не рекомендуем плотно есть." },
      },
      {
        "@type": "Question",
        name: "Как записаться?",
        acceptedAnswer: { "@type": "Answer", text: "Через форму на сайте, по телефону +7 (901) 320-10-50 или в Telegram @Istova_spa. Администратор свяжется в течение часа." },
      },
    ],
  };

  const BREADCRUMB_JSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Программы",
        item: `${SITE_URL}/programs/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: program.name,
        item: url,
      },
    ],
  };

  const related = programs.filter((p) => p.slug !== slug).slice(0, 4);

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
      <ProgramTracker slug={slug} />
      <Header />
      <main className="bg-sand py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Хлебные крошки */}
          <nav className="text-xs uppercase tracking-widest text-brand/60 mb-12">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <Link href="/programs/" className="hover:text-brand">Программы</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">{program.name}</span>
          </nav>

          {/* Заголовок */}
          <header className="mb-12 pb-12 border-b border-brand/10">
            <h1 className="font-display text-4xl md:text-6xl text-brand mb-4 uppercase tracking-wider">
              {program.name}
            </h1>
            {program.accent && (
              <p className="text-sm md:text-base uppercase tracking-widest text-brand/70">
                {program.accent}
              </p>
            )}
            {program.note && (
              <p className="text-sm text-brand/70 italic mt-6">{program.note}</p>
            )}
            <p className="text-base text-brand-dark/85 leading-relaxed mt-8 max-w-2xl">
              {description}
            </p>
          </header>

          {/* Программа */}
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-6 font-normal">
              Этапы ритуала
            </h2>
            <ul className="space-y-4 text-base text-brand-dark/85 leading-relaxed">
              {program.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-brand/50 shrink-0">/</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            {program.after && (
              <div className="mt-8 pt-6 border-t border-brand/10 text-sm text-brand-dark/85">
                <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-2 font-normal">
                  После
                </h2>
                {program.after}
              </div>
            )}
          </section>

          {program.cosmetics && program.cosmetics.length > 0 && (
            <section className="mb-12 p-8 bg-sand-soft border border-brand/10">
              <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-6 font-normal">
                Косметика и материалы
              </h2>
              <ul className="space-y-3 text-base text-brand-dark/85 leading-relaxed">
                {program.cosmetics.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-brand/50 shrink-0">·</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Цена и запись */}
          <section className="mb-20 flex flex-wrap items-end justify-between gap-8 pt-8 border-t border-brand/10">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-brand/60 mb-1 font-normal">
                Длительность
              </h3>
              <div className="text-2xl text-brand-dark">~ {program.dur}</div>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest text-brand/60 mb-1 font-normal">
                Одному
              </h3>
              <div className="font-display text-3xl md:text-4xl text-brand">{program.price}</div>
            </div>
            {program.pair_price && (
              <div>
                <h3 className="text-xs uppercase tracking-widest text-brand/60 mb-1 font-normal">
                  Вдвоём · выгоднее
                </h3>
                <div className="font-display text-3xl md:text-4xl text-brand">{program.pair_price}</div>
                <div className="text-xs text-brand/60 mt-1">в двух смежных кабинетах</div>
              </div>
            )}
            <TrackedLink
              goal="BOOKING_CLICK"
              goalParams={{from:"program_page", slug: program.slug}}
              href="/#booking"
              className="text-sm uppercase tracking-widest px-8 py-4 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors"
            >
              Записаться на ритуал
            </TrackedLink>
          </section>

          {/* FAQ */}
          <section className="mb-16 border-t border-brand/10 pt-12">
            <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-8 font-normal">Частые вопросы</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg text-brand mb-2">Сколько длится ритуал?</h3>
                <p className="text-sm text-brand-dark/80 leading-relaxed">Продолжительность — примерно {program.dur}. Точное время зависит от вашего темпа отдыха между этапами.</p>
              </div>
              <div>
                <h3 className="font-display text-lg text-brand mb-2">Сколько стоит ритуал?</h3>
                <p className="text-sm text-brand-dark/80 leading-relaxed">Стоимость одиночного визита — {program.price}. Ритуал можно провести вдвоём в двух смежных кабинетах со скидкой{program.pair_price ? ` (${program.pair_price})` : ""}.</p>
              </div>
              <div>
                <h3 className="font-display text-lg text-brand mb-2">Что взять с собой?</h3>
                <p className="text-sm text-brand-dark/80 leading-relaxed">Ничего специального. Полотенца, халат, тапочки и уходовая косметика включены. За 1,5-2 часа до визита не рекомендуем плотно есть.</p>
              </div>
              <div>
                <h3 className="font-display text-lg text-brand mb-2">Как записаться?</h3>
                <p className="text-sm text-brand-dark/80 leading-relaxed">Через форму на сайте, по телефону <TrackedLink goal="PHONE_CLICK" goalParams={{from:"program_page"}} href="tel:+79013201050" className="underline hover:text-brand">+7 (901) 320-10-50</TrackedLink> или в Telegram <TrackedLink goal="TG_CLICK" goalParams={{from:"program_page"}} href="https://t.me/Istova_spa" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">@Istova_spa</TrackedLink>. Администратор свяжется в течение часа.</p>
              </div>
            </div>
          </section>

          {/* Другие программы */}
          <section className="border-t border-brand/10 pt-12">
            <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-8 text-center font-normal">
              Другие ритуалы Истовы
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}/`}
                  className="border border-brand/10 p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all bg-sand-soft"
                >
                  <div className="font-display text-2xl text-brand uppercase tracking-wider mb-2">
                    {p.name}
                  </div>
                  {p.accent && (
                    <div className="text-xs uppercase tracking-widest text-brand/60 mb-3">
                      {p.accent}
                    </div>
                  )}
                  <div className="text-sm text-brand-dark/70">
                    {p.dur} · {p.price}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
