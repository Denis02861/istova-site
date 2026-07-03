import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "../lib/programs-data";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SITE_URL = "https://istova.ru";
const TITLE = "Все программы Истовы — 9 авторских спа-ритуалов в Петербурге";
const DESCRIPTION =
  "4 базовых парных ритуала и 5 авторских программ Истовы. Утренние и вечерние спа-ритуалы, мужские и женские программы восстановления, бережный ритуал для беременных, программа знакомства и ритуал тишины.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/programs/` },
  keywords: [
    "спа-программы Санкт-Петербург",
    "спа Васильевский остров",
    "авторские ритуалы",
    "спа для двоих",
    "программы Истовы",
  ],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/programs/`,
    siteName: "Истова",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Программы Истовы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.webp`],
  },
};

export default function ProgramsCatalogPage() {
  const baseProgs = programs.filter((p) => p.category === "base");
  const specialProgs = programs.filter((p) => p.category === "special");

  const renderCard = (p: typeof programs[number]) => (
    <Link
      key={p.slug}
      href={`/programs/${p.slug}/`}
      className="group block border border-brand/10 bg-sand-soft p-8 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(116,68,54,0.2)] hover:border-brand/30 transition-all duration-500"
    >
      {p.accent && (
        <div className="text-[10px] uppercase tracking-widest text-brand/60 mb-3">
          {p.accent}
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-brand uppercase tracking-wider mb-4">
        {p.name}
      </h2>
      <p className="font-display italic text-lg text-brand-dark/85 leading-snug mb-6">
        {p.teaser}
      </p>
      <div className="flex justify-between items-end pt-4 border-t border-brand/10">
        <div className="text-xs uppercase tracking-widest text-brand/70 group-hover:text-brand transition-colors">
          Открыть программу →
        </div>
        <div className="text-right">
          <div className="font-display text-2xl text-brand">{p.price}</div>
          {p.pair_price && (
            <div className="text-[10px] text-brand/60 mt-0.5">Вдвоём {p.pair_price}</div>
          )}
          <div className="text-[10px] text-brand-dark/60 mt-0.5">~ {p.dur}</div>
        </div>
      </div>
    </Link>
  );

  const ITEMLIST_JSONLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/programs/#itemlist`,
    name: "Программы Истовы",
    numberOfItems: programs.length,
    itemListElement: programs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/programs/${p.slug}/`,
      name: p.name,
    })),
  };

  const BREADCRUMB_JSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Программы", item: `${SITE_URL}/programs/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEMLIST_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <Header />
      <main className="bg-sand py-24 min-h-screen">
        <div className="container mx-auto px-6 max-w-6xl">
          <nav className="text-xs uppercase tracking-widest text-brand/60 mb-12">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Все программы</span>
          </nav>

          <header className="mb-16 text-center">
            <div className="text-xs uppercase tracking-widest text-brand/60 mb-4">Программы</div>
            <h1 className="font-display text-4xl md:text-6xl text-brand uppercase tracking-wider mb-6">
              9 ритуалов Истовы
            </h1>
            <p className="text-base md:text-lg text-brand-dark/80 max-w-2xl mx-auto leading-relaxed">
              4 базовых парных ритуала (ЗАРЯ и СУМЕРКИ, тело и волосы) — темпоритмы утра и вечера. 5 авторских программ — знакомство с Истовой, глубокое женское и мужское восстановление, бережный ритуал для будущей мамы, глубокая тишина.
            </p>
          </header>

          <div className="mb-8">
            <div className="text-center text-xs uppercase tracking-widest text-brand/60 mb-6">
              Базовые парные ритуалы
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {baseProgs.map(renderCard)}
          </div>

          <div className="mb-8">
            <div className="text-center text-xs uppercase tracking-widest text-brand/60 mb-6">
              Авторские программы
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {specialProgs.map(renderCard)}
          </div>

          <div className="text-center pt-12 border-t border-brand/10">
            <Link
              href="/#booking"
              className="inline-block px-10 py-4 bg-brand text-sand uppercase tracking-widest text-sm hover:bg-brand-dark transition-colors"
            >
              Записаться на ритуал
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
