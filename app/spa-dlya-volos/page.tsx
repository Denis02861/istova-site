import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, ProgramCards, FeatureRow, FaqBlock } from "../components/LandingBlocks";
import { programs } from "../lib/programs-data";

// Посадочная под кластер «спа для волос». По Вебмастеру за 30 дней:
// «спа для волос спб» 92 показа, плюс формулировки «спа для головы и волос спб»,
// «спа головы спб и волос», «спа для волос и головы спб». Отдельной страницы
// под волосы не было, отвечала /massazh-golovy/, а там фокус на расслаблении.
// Здесь фокус другой: состояние волос и кожи головы, уход, честно про эффект.
const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/spa-dlya-volos/`;
const TITLE = "Спа для волос в СПб — уход и массаж головы от 6800 ₽ · Истова";
const DESCRIPTION =
  "Спа для волос и кожи головы на Васильевском: тёплая вода, пилинг, уход Davines, сушка и укладка в финале. 75-150 минут, от 6800 ₽, м. Приморская.";

const SLUGS = ["zarya-volosy", "sumerki-volosy", "rodnik", "yav"];
const HAIR_PROGRAMS = programs.filter((p) => SLUGS.includes(p.slug));

const PHOTOS: Record<string, string> = {
  "zarya-volosy": "/gallery/head-spa/aurora.webp",
  "sumerki-volosy": "/gallery/head-spa/jade.webp",
  "rodnik": "/gallery/frag-care.webp",
  "yav": "/gallery/head-spa/wooden.webp",
};

const FAQ = [
  {
    q: "Что входит в спа для волос?",
    a: "Работа с кожей головы руками, водный ритуал под тёплым рассеянным потоком, уход Davines и сушка с укладкой в финале. В большинстве программ к этому добавляется работа с шеей и плечами, потому что напряжение в голову чаще всего приходит именно оттуда. Сеанс идёт от 75 до 150 минут в зависимости от программы.",
  },
  {
    q: "Сколько стоит спа для волос в СПб?",
    a: "От 6800 рублей за ЯВЬ на 75 минут. Утренняя ЗАРЯ для волос и вечерние СУМЕРКИ для волос стоят 8500 рублей, бережный РОДНИК 7900 рублей. Цена за ритуал целиком, отдельно за уход или сушку доплачивать не нужно.",
  },
  {
    q: "Спа для волос помогает от выпадения?",
    a: "Честный ответ: это уход и отдых, а не лечение. Исследования показывают, что регулярный массаж кожи головы может улучшать её состояние и влиять на толщину волоса, но средством от облысения он не является. Если волосы выпадают заметно и давно, сначала стоит показаться трихологу, а спа оставить как приятную часть ухода.",
  },
  {
    q: "Какой уход используете?",
    a: "Davines. Конкретные средства мастер подбирает под ваши волосы и кожу головы на месте: сухие и окрашенные волосы просят одного, жирная кожа головы другого. Если пользуетесь чем-то своим и не хотите менять, скажите об этом в начале.",
  },
  {
    q: "Подходит для окрашенных волос?",
    a: "Да. Вода тёплая, около температуры тела, агрессивных составов в ритуале нет. Если красились совсем недавно или делали сложное осветление, предупредите администратора при записи, мастер учтёт это при подборе ухода.",
  },
  {
    q: "Как часто можно ходить?",
    a: "Жёсткой нормы нет. Многие гости приходят раз в месяц, кто-то раз в две недели в тяжёлые периоды. Ограничений по частоте у ритуала нет, это не процедура с накопительным действием, которую нужно делать курсом.",
  },
  {
    q: "Нужно ли мыть голову перед визитом?",
    a: "Нет. Волосы промоют во время ритуала, высушат и уложат в финале, так что приходить можно прямо после рабочего дня и выходить сразу по делам.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "спа для волос",
    "спа для волос спб",
    "спа для головы и волос",
    "спа для головы и волос спб",
    "уход за волосами спб",
    "спа волосы Васильевский остров",
    "Истова",
  ],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Спа для волос в Истове" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function SpaDlyaVolosPage() {
  const SERVICE_JSONLD = {
    "@context": "https://schema.org", "@type": "Service", "@id": `${URL}#service`,
    serviceType: "Спа для волос",
    name: "Спа для волос и кожи головы в Санкт-Петербурге",
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
      { "@type": "ListItem", position: 2, name: "Спа для волос в Санкт-Петербурге", item: URL },
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
          title="Спа для волос"
          lead="Уход, который начинается с кожи головы, а не с длины. Тёплая вода, спокойная работа руками, средства Davines и сушка в финале, чтобы выйти отсюда собранной."
          ctaFrom="spa_dlya_volos_hero"
          priceHint="от 6800 ₽ · 75-150 минут"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Спа для волос</span>
          </nav>

          <SplitBlock
            title="Почему начинаем с кожи головы"
            paragraphs={[
              "Волосы растут из кожи головы, и состояние этой кожи определяет многое: как быстро волосы жирнеют, есть ли зуд и шелушение, насколько легко их укладывать. Поэтому ритуал начинается не с длины, а с того, что происходит у корней.",
              "Мастер работает руками по коже головы, а затем под тёплой водой, которая идёт мягким рассеянным потоком через изогнутую трубку. Вода убирает трение, поэтому движения получаются глубже, чем на сухих волосах, а кожа прогревается равномерно.",
              "Дальше волосы промывают, наносят уход Davines под ваш тип волос, сушат и укладывают. На выходе это и уход, и полтора-два часа, когда никто вас не трогает.",
            ]}
            photo="/gallery/head-spa/aurora.webp"
            photoAlt="Водный ритуал для волос"
          />

          <SplitBlock
            title="Что реально меняется, а что нет"
            flip
            paragraphs={[
              "Сразу после сеанса волосы чище и легче, кожа головы спокойнее, укладка ложится проще. Большинство гостей замечают, что в голове уходит тяжесть и ночью легче засыпается. Это ощутимый и предсказуемый результат.",
              "Чего ждать не стоит: спа не лечит выпадение и не заменяет трихолога. Исследования показывают, что регулярный массаж кожи головы может улучшать её состояние и влиять на толщину волоса, но средством от облысения он не является, и мы не будем обещать обратное.",
              "Если волосы выпадают заметно и давно, правильный порядок такой: сначала врач, потом уход. Одно другому не мешает, но местами их менять не стоит.",
            ]}
            photo="/gallery/frag-care.webp"
            photoAlt="Средства ухода за волосами"
          />

          <FeatureRow
            items={[
              { title: "Уход Davines", text: "Средства подбирает мастер на месте под ваши волосы и кожу головы, а не по общему шаблону." },
              { title: "Сушка и укладка", text: "Входят в ритуал. Доплачивать отдельно не нужно, выйти можно сразу по делам." },
              { title: "Без обещаний лечения", text: "Это уход и отдых. Если есть медицинский вопрос по волосам, сначала трихолог." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/head-spa/jade.webp"
            alt="Уход за кожей головы"
            caption="Полтора часа, когда телефон лежит в сумке, а с вашей головой работает другой человек"
          />

          <ProgramCards title="Программы со спа для волос" programs={HAIR_PROGRAMS} photos={PHOTOS} />

          <SplitBlock
            title="Сколько стоит"
            paragraphs={[
              "От 6800 рублей за ЯВЬ на 75 минут: знакомство с форматом, где кроме работы по голове есть массаж спины и плеч и уход за лицом.",
              "Утренняя ЗАРЯ для волос и вечерние СУМЕРКИ для волос стоят 8500 рублей. Это более длинные ритуалы, где уходу за волосами отведено больше времени. Бережный РОДНИК без нагрузки на тело стоит 7900 рублей.",
              "Вдвоём в двух смежных кабинетах выходит дешевле, чем два одиночных визита. Цены на пары есть на странице каждого ритуала и в разделе спа для двоих.",
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
                  { href: "/blog/vypadenie-volos-i-massazh-golovy/", t: "Массаж и волосы", d: "Честно про то, чего ждать не стоит" },
                  { href: "/blog/zhirnaya-kozha-golovy/", t: "Жирная кожа головы", d: "Почему волосы жирнеют на второй день" },
                  { href: "/blog/piling-kozhi-golovy/", t: "Пилинг кожи головы", d: "Зачем нужен и как часто его делать" },
                  { href: "/yaponskoe-spa-dlya-golovy/", t: "Японский массаж головы", d: "Тот же формат, другое название" },
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
            <h2 className="font-display text-3xl md:text-4xl mb-5">Записаться на спа для волос</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Истова на Васильевском острове, ул. Беринга, 23 к. 2, десять минут пешком от метро Приморская.
              Администратор подскажет, какой ритуал подойдёт вашим волосам.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK" goalParams={{ from: "spa_dlya_volos_cta" }}
                href="/go/zapis/?from=page_spa_dlya_volos" rel="nofollow"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK" goalParams={{ from: "spa_dlya_volos_cta" }} href="tel:+79013201050"
                className="inline-flex items-center justify-center px-9 py-3.5 border border-sand/40 text-sand rounded-full hover:bg-sand hover:text-brand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms]"
              >
                +7 (901) 320-10-50
              </TrackedLink>
              <TrackedLink
                goal="TG_CLICK" goalParams={{ from: "spa_dlya_volos_cta" }} href="https://t.me/Istova_spa"
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
