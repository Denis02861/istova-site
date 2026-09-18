import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, ProgramCards, FeatureRow, FaqBlock } from "../components/LandingBlocks";
import { programs } from "../lib/programs-data";

/**
 * Гео-посадочная под Васильевский остров.
 *
 * Зачем: по запросам «спа на васильевском острове» (16 место), «массаж на
 * васильевском острове» (24) и «салон красоты на васильевском» (40) Яндекс
 * показывал главную, отдельной страницы под район не было вовсе.
 * Проверено Топвизором 18.09.2026.
 */

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/spa-vasileostrovskiy/`;
const TITLE = "Спа на Васильевском острове: ритуалы у м. Приморская | Истова";
const DESCRIPTION =
  "Спа-пространство на Васильевском острове, 256 м², 10 минут пешком от м. Приморская. Спа для головы, массаж, финская сауна. От 6800 ₽, ул. Беринга, 23 к. 2.";

const SLUGS = ["yav", "rodnik", "zarya-volosy", "sumerki-telo", "kedr", "lada"];
const LOCAL_PROGRAMS = programs.filter((p) => SLUGS.includes(p.slug));

const PHOTOS: Record<string, string> = {
  "yav": "/gallery/frag-water.webp",
  "rodnik": "/gallery/frag-care.webp",
  "zarya-volosy": "/gallery/04-head-spa.webp",
  "sumerki-telo": "/gallery/05-massage.webp",
  "kedr": "/gallery/03-sauna.webp",
  "lada": "/gallery/frag-body.webp",
};

const FAQ = [
  {
    q: "Где именно находится спа на Васильевском острове?",
    a: "Санкт-Петербург, улица Беринга, 23 корпус 2. Это север Васильевского острова, десять минут пешком от станции метро Приморская. Вход со стороны двора, ориентир — вывеска Истова.",
  },
  {
    q: "Как добраться от метро Приморская?",
    a: "От выхода из метро идти по Наличной улице в сторону улицы Беринга, дальше налево. Пешком выходит около десяти минут спокойным шагом. На машине есть где оставить автомобиль во дворе.",
  },
  {
    q: "Чем спа на Васильевском отличается от салонов в центре?",
    a: "Тише. В центре спа-салоны часто стоят в проходных местах, с окнами на оживлённую улицу. Здесь жилой район у залива, и тишина начинается ещё до входа. Плюс 256 м² на несколько кабинетов, поэтому гости не пересекаются.",
  },
  {
    q: "Можно ли приехать с Петроградской или из центра?",
    a: "Да, от Петроградской и центра дорога занимает 20-30 минут. Многие гости приезжают именно ради того, чтобы выйти из плотного города и провести пару часов в тишине.",
  },
  {
    q: "Сколько стоит спа на Васильевском острове?",
    a: "Ритуалы начинаются от 6800 рублей за 75 минут. Парные варианты — от 12 000 рублей за двоих. Точную цену под выбранную программу подскажет администратор при записи.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "спа на васильевском острове",
    "массаж на васильевском острове",
    "спа васильевский остров",
    "салон красоты на васильевском",
    "спа у метро приморская",
    "Истова",
  ],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Спа на Васильевском острове" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function VasileostrovskiyPage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org", "@type": "Service", "@id": `${URL}#service`,
    serviceType: "Спа-ритуалы", name: "Спа на Васильевском острове", description: DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Place", name: "Васильевский остров" },
      { "@type": "City", name: "Санкт-Петербург" },
    ],
    url: URL,
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
      { "@type": "ListItem", position: 2, name: "Спа на Васильевском острове", item: URL },
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
          eyebrow="Санкт-Петербург · 10 минут от м. Приморская"
          title="Спа на Васильевском острове"
          lead="256 м² тишины на севере Васильевского. Спа для головы, массаж, финская сауна и чай в лаунже, без соседства с проходной улицей."
          ctaFrom="vasileostrovskiy_hero"
          priceHint="от 6800 ₽ · ул. Беринга, 23 к. 2"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Спа на Васильевском острове</span>
          </nav>

          <SplitBlock
            title="Почему именно здесь"
            paragraphs={[
              "Истова стоит на улице Беринга, это север Васильевского острова, десять минут пешком от метро Приморская. Район жилой и спокойный: рядом залив, вечером здесь тихо даже на улице.",
              "Для спа это важнее, чем кажется. Расслабление начинается не в кабинете, а по дороге. Когда до двери идёшь через плотный поток центра, первые двадцать минут ритуала уходят на то, чтобы просто перестать спешить.",
            ]}
            photo="/gallery/02-spa-zone.webp"
            photoAlt="Спа-зона Истовы на Васильевском острове"
          />

          <FeatureRow
            items={[
              { title: "10 минут от метро", text: "От Приморской по Наличной улице до Беринга. Пешком, без пересадок и маршруток." },
              { title: "256 м² на несколько кабинетов", text: "Гости не пересекаются в коридорах. Для спа это ощутимо: никто не ждёт своей очереди на виду у других." },
              { title: "Есть где оставить машину", text: "Двор жилого дома, парковка свободнее, чем в центре. Из других районов доезжают за 20-30 минут." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/frag-water.webp"
            alt="Водный ритуал в Истове на Васильевском"
            caption="Тишина начинается ещё до входа"
          />

          <ProgramCards title="Ритуалы, которые здесь проходят" programs={LOCAL_PROGRAMS} photos={PHOTOS} />

          <SplitBlock
            title="Что рядом на острове"
            flip
            paragraphs={[
              "Гости часто совмещают визит с прогулкой: от нас недалеко до набережной и парка 300-летия. После ритуала это работает лучше, чем сразу нырять обратно в дела.",
              "Если вы живёте на Васильевском, дорога занимает считанные минуты, и спа перестаёт быть событием, ради которого надо выкраивать полдня. Многие приходят раз в две-три недели просто потому, что близко.",
            ]}
            photo="/gallery/frag-tea.webp"
            photoAlt="Чай в лаунж-зоне после ритуала"
          />

          <section className="pb-4">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-4">Ещё по теме</div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { href: "/massazh-golovy/", t: "Массаж головы и head spa", d: "Азиатская техника с водной дугой" },
                  { href: "/spa-dlya-dvoih/", t: "Спа для двоих", d: "Парные ритуалы в смежных кабинетах" },
                  { href: "/rasslablyayushchiy-massazh/", t: "Расслабляющий массаж", d: "Когда напряжение копилось неделями" },
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
            <h2 className="font-display text-3xl md:text-4xl mb-5">Записаться на Васильевском</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Санкт-Петербург, ул. Беринга, 23 к. 2. Десять минут пешком от метро Приморская.
              Администратор поможет выбрать ритуал и время.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK" goalParams={{ from: "vasileostrovskiy_cta" }} href="/#booking"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK" goalParams={{ from: "vasileostrovskiy_cta" }} href="tel:+79013201050"
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
