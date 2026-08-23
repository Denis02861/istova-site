import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "../../lib/blog-data";
import { programs } from "../../lib/programs-data";
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
      <main className="bg-sand py-24 relative overflow-hidden">
        <img src={["/brand/decor/seaweed.webp","/brand/decor/spiral.webp","/brand/decor/bird.webp"][(articles.findIndex((a)=>a.slug===article.slug)+3)%3]} alt="" aria-hidden="true" className="pointer-events-none select-none absolute top-10 right-[-48px] w-52 md:w-80 opacity-[0.12] rotate-6" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          {/* Хлебные крошки */}
          <nav className="text-xs uppercase tracking-widest text-brand/60 mb-12">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <Link href="/blog/" className="hover:text-brand">Блог</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">{article.h1}</span>
          </nav>

          {/* Заголовок */}
          <header className="mb-12 pb-12 border-b border-brand/10">
            <div className="text-xs uppercase tracking-widest text-brand/60 mb-4">
              {article.keyword_main}
            </div>
            <h1 className="font-display text-3xl md:text-5xl text-brand mb-6 leading-tight">
              {article.h1}
            </h1>
            <p className="text-base text-brand-dark/85 leading-relaxed max-w-2xl">
              {article.description}
            </p>
          </header>

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
          <article className="space-y-12">
            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-2xl md:text-3xl text-brand mb-5 leading-snug">
                  {section.h2}
                </h2>
                <div className="space-y-4">
                  {section.body.split("\n\n").map((p, j) => (
                    <p key={j} className="text-base text-brand-dark/85 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
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
              <div className="space-y-6">
                {article.faq.map((f, i) => (
                  <div key={i}>
                    <h3 className="font-display text-lg text-brand mb-2">{f.q}</h3>
                    <p className="text-sm text-brand-dark/80 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA на запись */}
          <section className="mt-16 p-10 bg-sand-soft border border-brand/10 text-center">
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
              className="inline-block text-sm uppercase tracking-widest px-8 py-4 bg-brand text-sand hover:bg-brand-dark transition-colors"
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
                    className="border border-brand/10 p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all bg-sand-soft"
                  >
                    <div className="font-display text-xl text-brand mb-2 leading-snug">
                      {a.h1}
                    </div>
                    <div className="text-sm text-brand-dark/70 leading-relaxed">
                      {a.description}
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
