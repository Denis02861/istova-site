import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { programs } from "../../components/Programs";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProgramTracker from "../../components/ProgramTracker";

const SITE_URL = "https://istova.ru";

const SHORT_DESC: Record<string, string> = {
  "zarya-telo":
    "Утренний 100-минутный ритуал пробуждения через тело: финская сауна с бодрящими эфирами, пилинг с гималайской солью, тонизирующий массаж и пробуждение через стопы.",
  "zarya-volosy":
    "Утренний 90-минутный ритуал для кожи головы: тонизирующий массаж с криосферами, пенный СПА-массаж, Золотая дуга и СПА-уход Davines.",
  "sumerki-telo":
    "Вечерний 100-минутный ритуал расслабления через тело: сауна с успокаивающими эфирами, лавандовый пилинг, сандаловое обёртывание и расслабляющий массаж на тёплом масле.",
  "sumerki-volosy":
    "Вечерний 90-минутный ритуал расслабления через кожу головы: тёплый травяной настой, Золотая дуга, СПА-уход Davines и расслабляющий массаж головы.",
  "otzvuk":
    "Двухчасовой ритуал глубокой тишины. Программа без водных практик — полное погружение в тишину и звук. Аудиопогружение, сенсорный уход для лица, sound bath с поющими чашами, ритуалы заземления и веса, финал под тяжёлым одеялом.",
  "yav":
    "70-минутный ритуал знакомства с Истовой: расслабляющий массаж спины и шейно-воротниковой зоны, освежающий уход за лицом, Золотая дуга и СПА-уход Davines для кожи головы.",
  "kedr":
    "Мужской ритуал восстановления, 2 ч 30 мин: финская сауна с кедровыми эфирами, креольский массаж бамбуковыми палочками, массаж с горячими камнями, уход за лицом и бородой.",
  "lada":
    "Женский ритуал восстановления, 2 ч 30 мин: финская сауна с цветочными эфирами, турецкий пилинг кесе с розовым маслом, тёплые травяные мешочки, эстетический массаж лица с гуаша, Золотая дуга и финал — ритуал для кистей с маслом нероли.",
  "rodnik":
    "Бережный 90-минутный ритуал для будущей мамы. Адаптирован для беременных со 2 триместра и спустя 6 недель после родов. Деликатный уход за лицом, лёгкие лимфодренажные техники, ритуал лёгких ног.",
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
  const title = `${program.name} — ${program.accent ?? ""} | Истова`;
  const description = SHORT_DESC[slug] ?? program.accent ?? "";
  const url = `${SITE_URL}/programs/${slug}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Истова",
      title,
      description,
      locale: "ru_RU",
      images: [`${SITE_URL}/og-image.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
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

  const description = SHORT_DESC[slug] ?? program.accent ?? "";
  const url = `${SITE_URL}/programs/${slug}/`;

  const SERVICE_JSONLD = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: program.name,
    name: program.name,
    description,
    provider: {
      "@type": "BeautySalon",
      name: "Истова",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Беринга, 23 к. 2",
        addressLocality: "Санкт-Петербург",
        addressCountry: "RU",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Санкт-Петербург",
    },
    offers: {
      "@type": "Offer",
      price: program.price.replace(/[^\d]/g, ""),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url,
    },
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
        item: `${SITE_URL}/#programs`,
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
      <ProgramTracker slug={slug} />
      <Header />
      <main className="bg-sand py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Хлебные крошки */}
          <nav className="text-xs uppercase tracking-widest text-brand/60 mb-12">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <Link href="/#programs" className="hover:text-brand">Программы</Link>
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
                Стоимость
              </h3>
              <div className="font-display text-4xl text-brand">{program.price}</div>
            </div>
            <Link
              href="/#booking"
              className="text-sm uppercase tracking-widest px-8 py-4 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors"
            >
              Записаться на ритуал
            </Link>
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
