import type { Metadata } from "next";
import Link from "next/link";
import { practices, GROUPS, MASSAGE, MASSAGE_LANDING, priceLine, type PracticeGroup } from "../lib/practices-data";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/praktiki/`;
const TITLE = "Отдельные спа-практики в СПб: массаж, камни, скраб, обёртывание — от 1 300 ₽ · Истова";
const DESCRIPTION =
  "Теплота — отдельные практики Истовы: массаж тела, камни, массаж головы и лица, скраб, сауна с обёртыванием, стопы и кисти. От 20 минут и 1 300 ₽. Васильевский остров, м. Приморская.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: ["спа практики спб", "массаж тела спб", "массаж стоп спб", "скраб для тела спа", "обёртывание спб", "Истова"],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Истова",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Отдельные практики Истовы" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

const ORDER: PracticeGroup[] = ["touch", "body", "small"];

export default function PracticesHub() {
  const ITEMLIST_JSONLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Отдельные практики Истовы",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: MASSAGE.name, url: `${SITE_URL}${MASSAGE_LANDING}` },
      ...practices.map((p, i) => ({ "@type": "ListItem", position: i + 2, name: p.name, url: `${SITE_URL}/praktiki/${p.slug}/` })),
    ],
  };
  const BREADCRUMB_JSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Отдельные практики", item: URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEMLIST_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }} />
      <Header />
      <main className="bg-sand py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <nav className="text-xs uppercase tracking-widest text-brand/60 mb-12">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Отдельные практики</span>
          </nav>

          <header className="mb-16 pb-12 border-b border-brand/10">
            <p className="text-xs uppercase tracking-widest text-brand/60 mb-4">Теплота</p>
            <h1 className="font-display text-4xl md:text-6xl text-brand mb-6 uppercase tracking-wider">Отдельные практики</h1>
            <p className="font-sans text-base md:text-lg text-brand-dark/85 leading-relaxed max-w-2xl">
              Иногда хочется прожить целый ритуал. Иногда — выбрать только одно прикосновение. Практики можно выбрать
              отдельно или дополнить ими любой подходящий{" "}
              <Link href="/programs/" className="underline underline-offset-2 decoration-brand/30 hover:decoration-brand">
                ритуал Истовы
              </Link>
              .
            </p>
          </header>

          {ORDER.map((g) => (
            <section key={g} className="mb-16">
              <h2 className="font-display text-2xl md:text-3xl text-brand uppercase tracking-wider mb-2">{GROUPS[g].title}</h2>
              <p className="font-sans text-sm text-brand-dark/70 mb-8 max-w-2xl">{GROUPS[g].intro}</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {g === "touch" && (
                  <Link
                    href={MASSAGE_LANDING}
                    className="border border-brand/10 p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all bg-sand-soft"
                  >
                    <div className="font-display text-xl text-brand uppercase tracking-wider mb-2">{MASSAGE.name}</div>
                    <div className="font-sans text-sm text-brand-dark/80 leading-relaxed mb-3">{MASSAGE.desc}</div>
                    <div className="text-sm text-brand">{MASSAGE.priceLine}</div>
                  </Link>
                )}
                {practices
                  .filter((p) => p.group === g)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/praktiki/${p.slug}/`}
                      className="border border-brand/10 p-6 hover:border-brand/30 hover:-translate-y-0.5 transition-all bg-sand-soft"
                    >
                      <div className="font-display text-xl text-brand uppercase tracking-wider mb-2">{p.name}</div>
                      <div className="font-sans text-sm text-brand-dark/80 leading-relaxed mb-3">{p.desc}</div>
                      <div className="text-sm text-brand">{priceLine(p)}</div>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
