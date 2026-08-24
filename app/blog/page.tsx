import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "../lib/blog-data";
import { coverFor } from "../lib/blog-covers";
import Reveal from "../components/Reveal";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SITE_URL = "https://istova.ru";
const TITLE = "Блог Истовы: про head spa, спа для головы и уход в СПб";
const DESCRIPTION =
  "Спокойные тексты о head spa и спа для головы: что это, как проходит, что даёт и кому подходит. Опыт спа-салона Истова на Васильевском острове в Санкт-Петербурге.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog/` },
  keywords: [
    "блог о спа",
    "head spa",
    "спа для головы",
    "японское спа для головы",
    "уход за головой и волосами",
    "Истова",
  ],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog/`,
    siteName: "Истова",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Блог Истовы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.webp`],
  },
};

export default function BlogIndexPage() {
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));

  const BLOG_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog/#blog`,
    name: "Блог Истовы",
    description: DESCRIPTION,
    url: `${SITE_URL}/blog/`,
    inLanguage: "ru-RU",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: sorted.map((a) => ({
      "@type": "BlogPosting",
      headline: a.h1,
      url: `${SITE_URL}/blog/${a.slug}/`,
      datePublished: a.date,
      dateModified: a.updated,
    })),
  };

  const BREADCRUMB_JSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <Header />
      <main className="bg-sand py-24 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          <nav className="text-xs uppercase tracking-widest text-brand/60 mb-12">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Блог</span>
          </nav>

          <header className="mb-16 text-center">
            <div className="text-xs uppercase tracking-widest text-brand/60 mb-4">Журнал</div>
            <h1 className="font-display text-4xl md:text-6xl text-brand uppercase tracking-wider mb-6">
              Блог
            </h1>
            <p className="text-base md:text-lg text-brand-dark/80 max-w-2xl mx-auto leading-relaxed">
              Спокойные тексты про head spa, спа для головы и уход за собой. Делимся тем, как устроены наши ритуалы и что стоит знать перед первым визитом.
            </p>
          </header>

          {/* Первая статья крупным блоком */}
          {sorted[0] && (
            <Reveal variant="fade">
              <Link
                href={`/blog/${sorted[0].slug}/`}
                className="group block overflow-hidden rounded-[28px] border border-brand/10 bg-sand-soft hover:border-brand/30 transition-all duration-500 mb-8"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-60 md:h-auto md:min-h-[300px] overflow-hidden">
                    <img
                      src={coverFor(sorted[0].slug)}
                      alt=""
                      aria-hidden="true"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-brand/55 mb-3">
                      Свежее · {sorted[0].keyword_main}
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-brand mb-4 leading-snug">
                      {sorted[0].h1}
                    </h2>
                    <p className="text-sm text-brand-dark/75 leading-relaxed mb-6">
                      {sorted[0].description}
                    </p>
                    <span className="text-xs uppercase tracking-widest text-brand/70 group-hover:text-brand transition-colors">
                      Читать
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {sorted.slice(1).map((a, i) => (
              <Reveal key={a.slug} variant="up" delay={(i % 2) * 90}>
                <Link
                  href={`/blog/${a.slug}/`}
                  className="group flex flex-col h-full overflow-hidden rounded-[22px] border border-brand/10 bg-sand-soft hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(90,51,40,0.45)] hover:border-brand/30 transition-all duration-500"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={coverFor(a.slug)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-brand/55 mb-3">
                      {a.keyword_main}
                    </div>
                    <h2 className="font-display text-xl md:text-2xl text-brand mb-3 leading-snug">
                      {a.h1}
                    </h2>
                    <p className="text-sm text-brand-dark/75 leading-relaxed mb-6 flex-1">
                      {a.description}
                    </p>
                    <span className="text-xs uppercase tracking-widest text-brand/70 group-hover:text-brand transition-colors pt-4 border-t border-brand/10">
                      Читать
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="text-center pt-16 mt-16 border-t border-brand/10">
            <Link
              href="/#booking"
              className="inline-flex items-center justify-center px-9 py-3.5 bg-brand text-sand rounded-full font-medium shadow-[0_12px_40px_-12px_rgba(116,68,54,0.5)] hover:bg-brand-dark active:scale-[0.98] transition-[transform,background-color,box-shadow] duration-[220ms]"
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
