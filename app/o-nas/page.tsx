import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, FeatureRow, FaqBlock } from "../components/LandingBlocks";

/**
 * Страница «О нас».
 *
 * Зачем: GEO-аудит 21.09.2026 показал провал по доверию к личности бренда
 * (Identity Trust 2/5, About page not detected). Страницы о салоне не было вовсе,
 * хотя и поисковики, и языковые модели используют её как основной сигнал,
 * что за сайтом стоит реальная организация, а не лендинг-однодневка.
 */

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/o-nas/`;
const TITLE = "О спа-пространстве Истова: кто мы и как работаем | Санкт-Петербург";
const DESCRIPTION =
  "Истова — спа-пространство 256 м² на Васильевском острове. Что значит название, почему занимаемся спа для головы и кто работает с гостями.";

const FAQ = [
  {
    q: "Что означает название Истова?",
    a: "От старорусского слова истово: искренне, внимательно, с полной отдачей. Так раньше говорили о работе, которую делают не для галочки. Мы взяли это слово как рабочий принцип, а не как красивую вывеску.",
  },
  {
    q: "Чем Истова отличается от салона красоты?",
    a: "Мы не стрижём и не красим волосы. Совсем. Основное направление — head spa, то есть уход за кожей головы и волосами через тёплую воду и массаж, плюс ритуалы для тела: сауна, скрабы, обёртывания, массаж. Человек приходит не менять внешность, а выйти из напряжения.",
  },
  {
    q: "Сколько человек работает в салоне?",
    a: "В команде восемь мастеров и администраторы. На смене одновременно минимум три мастера, чтобы гостю не приходилось подстраиваться под чужое расписание. Старший спа-технолог отвечает за протоколы и обучение новых мастеров.",
  },
  {
    q: "Можно ли попросить мастера определённого пола?",
    a: "Да, и это нормальная просьба. Скажите при записи, администратор поставит мастера, с которым вам будет спокойнее. Заранее это сделать проще, чем в день визита.",
  },
  {
    q: "Где вы находитесь и как добраться?",
    a: "Санкт-Петербург, улица Беринга, 23 корпус 2. Это север Васильевского острова, десять минут пешком от метро Приморская. Во дворе есть где оставить машину, парковка свободнее, чем в центре.",
  },
  {
    q: "Сколько лет работает Истова?",
    a: "Истова открылась в 2026 году. До неё основатель несколько лет вёл спа-пространство в Петербурге, и весь опыт того проекта лёг в основу этого: от планировки кабинетов до протоколов, по которым работают мастера.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: [
    "истова спа",
    "истова санкт-петербург",
    "о салоне истова",
    "спа пространство васильевский остров",
    "head spa салон спб",
  ],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Спа-пространство Истова" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function ONasPage() {
  const ABOUT_JSONLD = {
    "@context": "https://schema.org", "@type": "AboutPage", "@id": `${URL}#about`,
    name: TITLE, description: DESCRIPTION, url: URL,
    mainEntity: { "@id": `${SITE_URL}/#organization` },
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
      { "@type": "ListItem", position: 2, name: "О нас", item: URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <Header />

      <main className="bg-sand">
        <LandingHero
          eyebrow="Санкт-Петербург · Васильевский остров"
          title="О нас"
          lead="Истова это 256 м² на севере Васильевского острова, восемь мастеров и одно правило: человек уходит отсюда отдохнувшим, а не просто обслуженным."
          ctaFrom="onas_hero"
          priceHint="ул. Беринга, 23 к. 2 · 10 минут от м. Приморская"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">О нас</span>
          </nav>

          <SplitBlock
            title="Откуда название"
            paragraphs={[
              "Истово это старорусское слово. Так говорили о работе, которую делают искренне, внимательно и с полной отдачей, а не для галочки. Слово редкое, и мы взяли его сознательно: оно описывает не атмосферу, а способ работать.",
              "На практике это выглядит буднично. Температура полотенца, интонация администратора, скорость движений мастера, чай после ритуала. Из таких мелочей и складывается то, ради чего сюда приходят.",
            ]}
            photo="/gallery/frag-tea.webp"
            photoAlt="Чай в лаунж-зоне Истовы"
          />

          <SplitBlock
            title="Почему именно голова"
            flip
            paragraphs={[
              "Голова устаёт не меньше тела, а расслабляют её куда реже. К вечеру напряжение оседает в затылке, висках и у основания шеи, и снять его самому получается не всегда. Head spa как раз про это: тёплая вода, массаж кожи головы, шеи и плеч, уход за волосами и сорок минут, когда можно ничего не решать.",
              "Стрижек и окрашивания у нас нет вообще. Это не салон красоты, где массаж головы идёт бонусом к стрижке. Здесь он и есть смысл визита.",
            ]}
            photo="/gallery/04-head-spa.webp"
            photoAlt="Спа для головы с тёплой водой"
          />

          <FeatureRow
            items={[
              { title: "256 м² и несколько кабинетов", text: "Гости не пересекаются в коридорах и не ждут очереди на виду у других. Парные ритуалы идут в смежных кабинетах, двое рядом." },
              { title: "Восемь мастеров", text: "На смене одновременно минимум трое. Старший спа-технолог отвечает за протоколы и обучение. Можно попросить мастера определённого пола." },
              { title: "Девять авторских ритуалов", text: "Утренние и вечерние, для тела и для волос, одиночные и парные. Плюс отдельные практики, которые берут дополнением." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/02-spa-zone.webp"
            alt="Спа-зона Истовы на Васильевском острове"
            caption="Жилой район у залива: тишина начинается ещё до входа"
          />

          <SplitBlock
            title="Как мы работаем с гостем"
            paragraphs={[
              "Перед первым визитом администратор спрашивает не про предпочтения по аромату, а про состояние: что беспокоит, сколько спите, где копится напряжение. От этого зависит, какой ритуал предложить и на чём мастер сделает акцент.",
              "Мы не оказываем медицинских услуг и не лечим. Если у гостя есть противопоказания, мы честно говорим об этом и предлагаем другой вариант или просим сначала сходить к врачу. Это скучная часть разговора, но она важнее красивых обещаний.",
            ]}
            photo="/gallery/frag-care.webp"
            photoAlt="Работа мастера с гостем"
          />

          <section className="pb-4">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-4">Что посмотреть дальше</div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { href: "/programs/", t: "Все ритуалы", d: "Девять программ с ценами и длительностью" },
                  { href: "/kak-prohodit/", t: "Как проходит визит", d: "От двери до чая, по шагам" },
                  { href: "/massazh-golovy/", t: "Массаж головы и head spa", d: "Главное направление Истовы" },
                  { href: "/spa-vasileostrovskiy/", t: "Спа на Васильевском", d: "Адрес, дорога от метро, парковка" },
                  { href: "/podarochnyy-sertifikat/", t: "Подарочный сертификат", d: "На сумму или на конкретный ритуал" },
                  { href: "/blog/chto-takoe-head-spa/", t: "Что такое head spa", d: "Откуда пришла техника и как проходит" },
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
            <h2 className="font-display text-3xl md:text-4xl mb-5">Прийти и посмотреть</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Санкт-Петербург, ул. Беринга, 23 к. 2. Десять минут пешком от метро Приморская.
              Если не знаете, с чего начать, администратор подберёт ритуал под состояние.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK" goalParams={{ from: "onas_cta" }} href="/go/zapis/?from=page_onas"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK" goalParams={{ from: "onas_cta" }} href="tel:+79013201050"
                className="inline-flex items-center justify-center px-9 py-3.5 border border-sand/40 text-sand rounded-full hover:bg-sand hover:text-brand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms]"
              >
                +7 (901) 320-10-50
              </TrackedLink>
              <TrackedLink
                goal="TG_CLICK" goalParams={{ from: "onas_cta" }} href="https://t.me/Istova_spa"
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
