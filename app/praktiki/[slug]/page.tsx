import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { practices, GROUPS, MASSAGE_LANDING, MASSAGE, priceLine } from "../../lib/practices-data";
import Header from "../../components/Header";
import TrackedLink from "../../components/TrackedLink";
import Footer from "../../components/Footer";

const SITE_URL = "https://istova.ru";

export function generateStaticParams() {
  return practices.map((p) => ({ slug: p.slug }));
}

function rub(price: string): string {
  return price.replace(/[^\d]/g, "");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = practices.find((x) => x.slug === slug);
  if (!p) return {};
  const from = p.variants[0];
  // Как у страниц ритуалов: впереди то, что набирают в поиске, потом название и цена.
  const priceFrom = p.variants.length > 1 ? `от ${from.price}` : from.price;
  const title = `${p.seoLead} — ${p.name}, ${priceFrom} · Истова`;
  const description = `${p.desc} ${priceLine(p)}. Васильевский остров, м. Приморская.`.replace(/\s+/g, " ");
  const url = `${SITE_URL}/praktiki/${slug}/`;
  return {
    title,
    description,
    keywords: [p.name, p.seoLead.replace(/ в СПб|, СПб/g, ""), "спа Васильевский остров", "Истова"],
    authors: [{ name: "Истова", url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Истова",
      title,
      description,
      locale: "ru_RU",
      images: [{ url: `${SITE_URL}${p.picture}`, width: 1200, height: 630, alt: p.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}${p.picture}`] },
    robots: { index: true, follow: true },
  };
}

export default async function PracticePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = practices.find((x) => x.slug === slug);
  if (!p) notFound();

  const group = GROUPS[p.group];
  const url = `${SITE_URL}/praktiki/${slug}/`;
  const description = `${p.desc} ${priceLine(p)}.`;
  const prices = p.variants.map((v) => Number(rub(v.price)));

  // Цена в сниппете: Product с Offer, как у страниц ритуалов. Две длительности —
  // AggregateOffer с нижней и верхней ценой.
  const PRODUCT_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: p.name,
    description,
    image: [`${SITE_URL}${p.picture}`],
    brand: { "@type": "Brand", name: "Истова" },
    category: "Спа-практики",
    url,
    offers:
      p.variants.length > 1
        ? {
            "@type": "AggregateOffer",
            lowPrice: String(Math.min(...prices)),
            highPrice: String(Math.max(...prices)),
            offerCount: String(p.variants.length),
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            url,
            seller: { "@id": `${SITE_URL}/#organization` },
          }
        : {
            "@type": "Offer",
            price: String(prices[0]),
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            url,
            priceValidUntil: "2027-12-31",
            seller: { "@id": `${SITE_URL}/#organization` },
            areaServed: { "@type": "City", name: "Санкт-Петербург" },
          },
  };

  const FAQ = [
    { q: "Сколько длится практика?", a: `${p.variants.map((v) => v.dur).join(" или ")}.` },
    { q: "Сколько стоит?", a: `${priceLine(p)}.` },
    {
      q: "Можно ли добавить её к ритуалу?",
      a: "Да. Практики можно выбрать отдельно или дополнить ими любой подходящий ритуал Истовы. Администратор подскажет, что хорошо сочетается.",
    },
    {
      q: "Что взять с собой?",
      a: "Ничего специального. Полотенца, халат, тапочки и уходовая косметика включены.",
    },
    {
      q: "Как записаться?",
      a: "Через форму на сайте, по телефону +7 (901) 320-10-50 или в Telegram @Istova_spa.",
    },
  ];
  const FAQ_JSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const BREADCRUMB_JSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Отдельные практики", item: `${SITE_URL}/praktiki/` },
      { "@type": "ListItem", position: 3, name: p.name, item: url },
    ],
  };

  const sameGroup = practices.filter((x) => x.group === p.group && x.slug !== p.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <Header />
      <main className="bg-sand py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <nav className="text-xs uppercase tracking-widest text-brand/60 mb-12">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <Link href="/praktiki/" className="hover:text-brand">Отдельные практики</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">{p.name}</span>
          </nav>

          <header className="mb-12 pb-12 border-b border-brand/10">
            <p className="text-xs uppercase tracking-widest text-brand/60 mb-4">
              Теплота · {group.title}
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-brand mb-4 uppercase tracking-wider">{p.name}</h1>
            <p className="text-sm md:text-base uppercase tracking-widest text-brand/70">{group.subtitle}</p>
            <p className="font-sans text-base md:text-lg text-brand-dark/85 leading-relaxed mt-8 max-w-2xl">{p.desc}</p>
          </header>

          <section className="mb-16 flex flex-wrap items-end justify-between gap-8">
            {p.variants.map((v) => (
              <div key={v.offerId}>
                <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-1 font-normal">{v.dur}</h2>
                <div className="font-display text-3xl md:text-4xl text-brand">{v.price}</div>
              </div>
            ))}
            <TrackedLink
              goal="BOOKING_CLICK"
              goalParams={{ from: "practice_page", slug: p.slug }}
              href={`/go/zapis/?from=page_practice_${p.slug.replace(/-/g, "_")}`}
              rel="nofollow"
              className="text-sm uppercase tracking-widest px-8 py-4 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors"
            >
              Записаться
            </TrackedLink>
          </section>

          <section className="mb-16 p-8 bg-sand-soft border border-brand/10">
            <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-4 font-normal">Отдельно или вместе с ритуалом</h2>
            <p className="font-sans text-base text-brand-dark/85 leading-relaxed">
              Иногда хочется прожить целый ритуал. Иногда — выбрать только одно прикосновение. Практики можно
              выбрать отдельно или дополнить ими любой подходящий{" "}
              <Link href="/programs/" className="underline underline-offset-2 decoration-brand/30 hover:decoration-brand">
                ритуал Истовы
              </Link>
              .
            </p>
          </section>

          <section className="mb-16 border-t border-brand/10 pt-12">
            <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-8 font-normal">Частые вопросы</h2>
            <div className="space-y-6">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <h3 className="font-display text-lg text-brand mb-2">{f.q}</h3>
                  <p className="font-sans text-sm text-brand-dark/80 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-brand/10 pt-12">
            <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-8 text-center font-normal">
              {group.title}: другие практики
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {p.group === "touch" && (
                <Link
                  href={MASSAGE_LANDING}
                  className="border border-brand/10 p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all bg-sand-soft"
                >
                  <div className="font-display text-2xl text-brand uppercase tracking-wider mb-2">{MASSAGE.name}</div>
                  <div className="text-sm text-brand-dark/70">{MASSAGE.priceLine}</div>
                </Link>
              )}
              {sameGroup.map((x) => (
                <Link
                  key={x.slug}
                  href={`/praktiki/${x.slug}/`}
                  className="border border-brand/10 p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all bg-sand-soft"
                >
                  <div className="font-display text-2xl text-brand uppercase tracking-wider mb-2">{x.name}</div>
                  <div className="text-sm text-brand-dark/70">{priceLine(x)}</div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/praktiki/" className="text-xs uppercase tracking-widest text-brand/70 hover:text-brand">
                Все отдельные практики
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
