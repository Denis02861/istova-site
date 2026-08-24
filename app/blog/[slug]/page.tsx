import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "../../lib/blog-data";
import { programs } from "../../lib/programs-data";
import { coverFor, inlineFor } from "../../lib/blog-covers";
import Reveal from "../../components/Reveal";
import Parallax from "../../components/Parallax";
import Header from "../../components/Header";
import TrackedLink from "../../components/TrackedLink";
import Footer from "../../components/Footer";

const SITE_URL = "https://istova.ru";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  const url = `${SITE_URL}/blog/${slug}/`;
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author, url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Истова",
      title: article.title,
      description: article.description,
      locale: "ru_RU",
      publishedTime: `${article.date}T00:00:00+03:00`,
      modifiedTime: `${article.updated}T00:00:00+03:00`,
      authors: [article.author],
      images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: article.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [`${SITE_URL}/og-image.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const url = `${SITE_URL}/blog/${slug}/`;

  const BLOGPOSTING_JSONLD = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.h1,
    description: article.description,
    inLanguage: "ru-RU",
    datePublished: article.date,
    dateModified: article.updated,
    author: { "@type": "Person", name: article.author, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [`${SITE_URL}/og-image.webp`],
    keywords: article.keywords.join(", "),
  };

  const FAQ_JSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog/` },
      { "@type": "ListItem", position: 3, name: article.h1, item: url },
    ],
  };

  const related = article.relatedSlugs
    ? article.relatedSlugs
        .map((s) => articles.find((a) => a.slug === s))
        .filter((a): a is (typeof articles)[number] => Boolean(a))
    : articles.filter((a) => a.slug !== slug).slice(0, 2);

  const linkedProgram = article.programSlug
    ? programs.find((p) => p.slug === article.programSlug)
    : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOGPOSTING_JSONLD) }}
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

      {/* Обложка */}
      <section className="relative min-h-[62vh] md:min-h-[72vh] flex items-end overflow-hidden">
        <img
          src={coverFor(article.slug)}
          alt={article.h1}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/92 via-brand-dark/50 to-brand-dark/15" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10 pb-14 md:pb-20 pt-32">
          <nav className="text-[11px] uppercase tracking-[0.18em] text-sand/60 mb-6">
            <Link href="/" className="hover:text-sand">Главная</Link>
            <span className="mx-2">·</span>
            <Link href="/blog/" className="hover:text-sand">Блог</Link>
          </nav>
          <div className="text-[11px] uppercase tracking-[0.18em] text-sand/70 mb-4">
            {article.keyword_main}
          </div>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-sand mb-5 leading-[1.08]">
            {article.h1}
          </h1>
          <p className="text-base md:text-lg text-sand/85 leading-relaxed max-w-2xl">
            {article.description}
          </p>
        </div>
      </section>

      <main className="bg-sand py-20 relative overflow-hidden">
        <img src={["/brand/decor/seaweed.webp","/brand/decor/spiral.webp","/brand/decor/bird.webp"][(articles.findIndex((a)=>a.slug===article.slug)+3)%3]} alt="" aria-hidden="true" className="pointer-events-none select-none absolute top-10 right-[-48px] w-52 md:w-80 opacity-[0.12] rotate-6" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">

          {/* Инфографика: ключевые цифры */}
          {article.stats && article.stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
              {article.stats.map((st, i) => (
                <div key={i} className="bg-sand-soft border border-brand/10 rounded-2xl px-6 py-8 text-center">
                  <div className="font-display text-3xl md:text-4xl text-brand mb-2 leading-none">{st.value}</div>
                  <div className="text-sm text-brand-dark/70 leading-snug">{st.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Текст статьи */}
          <article className="space-y-14">
            {article.sections.map((section, i) => (
              <div key={i}>
                <Reveal variant="up">
                  <section>
                    <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
                      {section.h2}
                    </h2>
                    <div className="space-y-4">
                      {section.body.split("\n\n").map((p, j) => (
                        <p
                          key={j}
                          className={
                            i === 0 && j === 0
                              ? "text-lg md:text-xl text-brand-dark/90 leading-relaxed font-display italic"
                              : "text-base text-brand-dark/85 leading-relaxed"
                          }
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>

                {/* фото-врезка в середине длинной статьи */}
                {i === 2 && inlineFor(article.slug) && (
                  <Reveal variant="fade">
                    <div className="relative overflow-hidden rounded-[24px] h-[220px] md:h-[320px] mt-14">
                      <Parallax speed={0.14}>
                        <img
                          src={inlineFor(article.slug) as string}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover scale-110"
                        />
                      </Parallax>
                    </div>
                  </Reveal>
                )}
              </div>
            ))}
          </article>

          {/* Источники */}
          {article.sources && article.sources.length > 0 && (
            <section className="mt-16 border-t border-brand/10 pt-12">
              <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-8 font-normal">
                Источники
              </h2>
              <ol className="space-y-3 list-decimal list-inside">
                {article.sources.map((s, i) => (
                  <li key={i} className="text-sm text-brand-dark/70 leading-relaxed">
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="underline hover:text-brand">{s.title}</a>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* FAQ */}
          {article.faq.length > 0 && (
            <section className="mt-16 border-t border-brand/10 pt-12">
              <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-8 font-normal">
                Частые вопросы
              </h2>
              <div className="space-y-4">
                {article.faq.map((f, i) => (
                  <Reveal key={i} variant="up" delay={i * 60}>
                    <div className="rounded-2xl bg-sand-soft border border-brand/10 px-6 py-5">
                      <h3 className="font-display text-lg text-brand mb-2 leading-snug">{f.q}</h3>
                      <p className="text-sm text-brand-dark/80 leading-relaxed">{f.a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* CTA на запись */}
          <section className="mt-16 p-10 md:p-12 bg-sand-soft border border-brand/10 rounded-[28px] text-center">
            <h2 className="font-display text-2xl md:text-3xl text-brand mb-4">
              Хочется попробовать head spa?
            </h2>
            <p className="text-base text-brand-dark/80 leading-relaxed max-w-xl mx-auto mb-8">
              Запишитесь в Истову на Васильевском острове. Мастер поможет выбрать ритуал под ваше состояние и подскажет, с чего начать.
            </p>
            <TrackedLink
              goal="BOOKING_CLICK"
              goalParams={{ from: "blog_article", slug: article.slug }}
              href="/#booking"
              className="inline-flex items-center justify-center px-9 py-3.5 bg-brand text-sand rounded-full font-medium shadow-[0_12px_40px_-12px_rgba(116,68,54,0.5)] hover:bg-brand-dark active:scale-[0.98] transition-[transform,background-color,box-shadow] duration-[220ms]"
            >
              Записаться на ритуал
            </TrackedLink>
            {linkedProgram && (
              <p className="mt-6 text-sm text-brand-dark/70">
                Ближе всего к теме статьи программа{" "}
                <Link href={`/programs/${linkedProgram.slug}/`} className="underline hover:text-brand">
                  {linkedProgram.name}
                </Link>
                .
              </p>
            )}
          </section>

          {/* Другие статьи */}
          {related.length > 0 && (
            <section className="mt-20 border-t border-brand/10 pt-12">
              <h2 className="text-xs uppercase tracking-widest text-brand/60 mb-8 text-center font-normal">
                Ещё почитать
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}/`}
                    className="group block overflow-hidden rounded-[22px] border border-brand/10 bg-sand-soft hover:border-brand/30 hover:-translate-y-1 hover:shadow-[0_24px_60px_-35px_rgba(90,51,40,0.5)] transition-all duration-500"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={coverFor(a.slug)}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/45 to-transparent" />
                    </div>
                    <div className="p-6">
                    <div className="font-display text-xl text-brand mb-2 leading-snug">
                      {a.h1}
                    </div>
                    <div className="text-sm text-brand-dark/70 leading-relaxed">
                      {a.description}
                    </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
