import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, ProgramCards, FeatureRow, FaqBlock } from "../components/LandingBlocks";
import { programs } from "../lib/programs-data";

// Посадочная под кластер «японский массаж головы» и его синонимы. По Вебмастеру
// за 30 дней: «японский массаж головы» 208 показов, «японское спа для головы» 68,
// «японское спа головы» 50, «японское спа» 33, «japan head spa» 27, «хед спа» 30.
// Суммарно больше 400 показов в месяц при почти нулевых кликах: своей страницы
// под эти слова не было, отвечала статья блога и стояла на пятой странице выдачи.
const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/yaponskoe-spa-dlya-golovy/`;
const TITLE = "Японский массаж головы в СПб — head spa от 6800 ₽ · Истова";
const DESCRIPTION =
  "Японское спа для головы на Васильевском: тёплая вода, работа с кожей головы и шеей, уход Davines, сушка в финале. 75-150 минут, от 6800 ₽, м. Приморская.";

const SLUGS = ["zarya-volosy", "sumerki-volosy", "rodnik", "yav"];
const HEAD_PROGRAMS = programs.filter((p) => SLUGS.includes(p.slug));

const PHOTOS: Record<string, string> = {
  "zarya-volosy": "/gallery/head-spa/aurora.webp",
  "sumerki-volosy": "/gallery/head-spa/jade.webp",
  "rodnik": "/gallery/frag-care.webp",
  "yav": "/gallery/head-spa/wooden.webp",
};

const FAQ = [
  {
    q: "Что такое японский массаж головы?",
    a: "Это спокойный уход за кожей головы, где мастер работает руками под тёплой проточной водой, а не только по сухим волосам. Формат вырос из японской уходовой культуры, поэтому его называют то японским массажем головы, то японским спа для головы, то head spa. Слова разные, практика одна. Сеанс идёт от 75 до 150 минут и включает работу с шеей и плечами, уход за волосами и сушку в финале.",
  },
  {
    q: "Чем японский массаж головы отличается от обычного?",
    a: "Обычный массаж головы это короткая работа руками поверх волос, чаще всего минут на пятнадцать. В японском формате голова лежит в специальной раковине, сверху идёт тёплая вода мягким рассеянным потоком, и мастер работает прямо под ней. Вода убирает трение, поэтому движения получаются мягче и глубже, а кожа головы прогревается равномерно. Плюс к массажу добавляются уход за волосами и работа с шейно-воротниковой зоной.",
  },
  {
    q: "Сколько стоит японское спа для головы в Санкт-Петербурге?",
    a: "В Истове это не отдельная короткая процедура, а полноценный ритуал. Цена зависит от программы и начинается от 6800 рублей за ЯВЬ на 75 минут. Утренняя ЗАРЯ и вечерние СУМЕРКИ для волос стоят 8500 рублей, бережный РОДНИК 7900 рублей. Вдвоём в двух смежных кабинетах выходит дешевле, чем два одиночных визита.",
  },
  {
    q: "Как называется массаж головы водой?",
    a: "Чаще всего его и называют head spa или японским спа для головы. В Истове водную часть делают через изогнутую трубку, которую у нас зовут золотой дугой: тёплая вода идёт тонким рассеянным потоком, пока мастер работает с кожей головы. Эта часть занимает около сорока минут и входит во все программы для головы.",
  },
  {
    q: "Сколько длится сеанс и что входит?",
    a: "От 75 до 150 минут в зависимости от программы. В любую входят разговор с мастером до начала, массаж кожи головы, водный ритуал, работа с шеей и плечами, уход Davines, а в финале волосы сушат и приводят в порядок. После остаётся время на чай, никуда бежать не нужно.",
  },
  {
    q: "Нужно ли мыть голову перед визитом?",
    a: "Нет, специально готовиться не нужно. Волосы промоют во время ритуала и высушат в конце, так что выходить на улицу можно сразу. За полтора-два часа до визита лучше не есть плотно.",
  },
  {
    q: "Где сделать японский массаж головы в СПб?",
    a: "Истова находится на Васильевском острове, улица Беринга, 23 корпус 2, десять минут пешком от метро Приморская. Работаем каждый день с 10:00 до 22:00. Записаться можно онлайн, по телефону +7 (901) 320-10-50 или в Telegram @Istova_spa.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "японский массаж головы",
    "японский массаж головы спб",
    "японское спа для головы",
    "японское спа головы спб",
    "japan head spa",
    "хед спа",
    "head spa спб",
    "массаж головы водой",
    "Истова",
  ],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Японское спа для головы в Истове" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function YaponskoeSpaPage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org", "@type": "Service", "@id": `${URL}#service`,
    serviceType: "Японский массаж головы",
    name: "Японское спа для головы в Санкт-Петербурге",
    alternateName: ["Head spa", "Японский массаж головы", "Japan head spa"],
    description: DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Санкт-Петербург" },
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
      { "@type": "ListItem", position: 2, name: "Японский массаж головы в Санкт-Петербурге", item: URL },
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
          eyebrow="Санкт-Петербург · Васильевский остров"
          title="Японский массаж головы"
          lead="Тёплая вода, неспешная работа с кожей головы и шеей, уход за волосами и тишина. Тот самый формат, который в России знают как head spa, а ищут чаще всего словами японское спа для головы."
          ctaFrom="yaponskoe_spa_hero"
          priceHint="от 6800 ₽ · 75-150 минут"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Японский массаж головы</span>
          </nav>

          <SplitBlock
            title="Что это такое"
            paragraphs={[
              "Японский массаж головы это спокойный уход, где мастер работает с кожей головы руками под тёплой проточной водой. Голова лежит в специальной раковине, шея не висит и не напрягается, а вы просто лежите и ничего не делаете. Сеанс идёт от 75 до 150 минут.",
              "Формат вырос из японской уходовой культуры, где к голове относятся внимательно и без спешки. Отсюда и названия, которыми его ищут: японский массаж головы, японское спа для головы, head spa. Практика за всеми этими словами одна и та же.",
              "В Истове это не отдельная процедура на пятнадцать минут, а часть ритуала. Кроме самого массажа в него входят работа с шеей и плечами, уход Davines, а в финале волосы сушат и приводят в порядок, так что выходить на улицу можно сразу.",
            ]}
            photo="/gallery/2026-09/duga-raspyliteli.webp"
            photoAlt="Золотая дуга с распылителями над раковиной"
          />

          <SplitBlock
            title="Как проходит сеанс"
            flip
            paragraphs={[
              "Начинается всё с короткого разговора: как вы себя чувствуете, есть ли чувствительность кожи, какой аромат приятнее. Дальше вы ложитесь, и первые минуты уходят просто на то, чтобы привыкнуть к теплу.",
              "Водную часть у нас делают через изогнутую трубку, которую зовут золотой дугой. Вода идёт не струёй из душа, а мягким рассеянным потоком примерно температуры тела. Мастер работает руками прямо под ней: вода снимает трение, поэтому движения получаются мягче и глубже, чем на сухих волосах. Занимает эта часть около сорока минут.",
              "После воды волосы промывают, наносят уход Davines, сушат и укладывают. В конце остаётся время спокойно посидеть с чаем. Ничего активного сразу после планировать не стоит, вечер лучше оставить медленным.",
            ]}
            photo="/gallery/2026-09/duga-voda-krupno.webp"
            photoAlt="Тёплая вода идёт через золотую дугу"
          />

          <FeatureRow
            items={[
              { title: "Вода вместо сухих рук", text: "Тёплый рассеянный поток убирает трение. Это главное отличие японского формата от привычного массажа головы." },
              { title: "Шея и плечи тоже", text: "Зона, откуда тяжесть обычно и приходит в голову. Входит почти во все программы, отдельно доплачивать не нужно." },
              { title: "Выйдете собранной", text: "Волосы промоют, высушат и уложат. Планы на вечер после сеанса можно не отменять." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/2026-09/pena-ruki.webp"
            alt="Пенный массаж кожи головы"
            caption="Уходит тяжесть в голове, ночью легче засыпается, мысли становятся тише"
          />

          <ProgramCards title="Программы с японским спа для головы" programs={HEAD_PROGRAMS} photos={PHOTOS} />

          <SplitBlock
            title="Сколько стоит"
            paragraphs={[
              "Цена зависит от программы и её длительности. Начинается от 6800 рублей: это ЯВЬ на 75 минут, знакомство с форматом, куда кроме головы входят массаж спины и плеч и уход за лицом.",
              "Утренняя ЗАРЯ и вечерние СУМЕРКИ для волос стоят 8500 рублей, это более длинные ритуалы с полноценным уходом за волосами. Бережный РОДНИК без нагрузки на тело стоит 7900 рублей.",
              "Вдвоём в двух смежных кабинетах выходит заметно дешевле, чем два визита по одному. Точные цены на пары указаны на странице каждого ритуала и в разделе спа для двоих.",
            ]}
            photo="/gallery/frag-tea.webp"
            photoAlt="Чай после ритуала"
            flip
          />

          <section className="pb-4">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-4">Разобраться подробнее</div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { href: "/blog/chto-takoe-head-spa/", t: "Что такое head spa", d: "Формат простыми словами" },
                  { href: "/massazh-golovy/", t: "Массаж головы в СПб", d: "Все программы с работой по голове" },
                  { href: "/blog/piling-kozhi-golovy/", t: "Пилинг кожи головы", d: "Зачем нужен и как часто его делать" },
                  { href: "/kak-prohodit/", t: "Как проходит визит", d: "По шагам и по минутам" },
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
            <h2 className="font-display text-3xl md:text-4xl mb-5">Записаться на японское спа для головы</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, десять минут пешком от метро Приморская.
              Администратор поможет выбрать ритуал под ваше состояние и время.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK" goalParams={{ from: "yaponskoe_spa_cta" }}
                href="/go/zapis/?from=page_yaponskoe_spa" rel="nofollow"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK" goalParams={{ from: "yaponskoe_spa_cta" }} href="tel:+79013201050"
                className="inline-flex items-center justify-center px-9 py-3.5 border border-sand/40 text-sand rounded-full hover:bg-sand hover:text-brand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms]"
              >
                +7 (901) 320-10-50
              </TrackedLink>
              <TrackedLink
                goal="TG_CLICK" goalParams={{ from: "yaponskoe_spa_cta" }} href="https://t.me/Istova_spa"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-9 py-3.5 border border-sand/40 text-sand rounded-full hover:bg-sand hover:text-brand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms]"
              >
                Написать администратору
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
