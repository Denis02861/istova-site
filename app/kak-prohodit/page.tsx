import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, FeatureRow, FaqBlock } from "../components/LandingBlocks";
import Reveal from "../components/Reveal";

const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/kak-prohodit/`;
const TITLE = "Как проходит спа-ритуал в Истове: по шагам и по минутам | СПб";
const DESCRIPTION =
  "Как проходит спа для головы и тела в Истове: пять шагов от встречи до чая, сколько длится каждый, тепло в кабинете, отдельный кабинет, сушка и укладка в финале. Васильевский остров.";

const STEPS = [
  {
    n: "01",
    t: "Встреча",
    time: "5 минут",
    d: "Администратор встречает в холле, показывает раздевалку, шкафчик для вещей и зону отдыха. Если вы у нас впервые, вас проведут по всему маршруту и расскажут, что будет дальше. Спрашивать ничего не придётся.",
  },
  {
    n: "02",
    t: "Арома-выбор",
    time: "5 минут",
    d: "Вы выбираете аромат, который будет сопровождать весь ритуал. Можно нюхать, можно читать состав, можно попросить мастера рассказать про каждый. Тут не бывает неправильного выбора и глупых вопросов.",
  },
  {
    n: "03",
    t: "Ритуал",
    time: "от 70 до 150 минут",
    d: "Основная часть. Перед началом мастер спрашивает про самочувствие, чувствительность кожи, зоны, которые беспокоят, и комфортную интенсивность. По ходу уточняет ещё раз: если что-то некомфортно, скажите в любой момент, мастер сразу поменяет.",
  },
  {
    n: "04",
    t: "Финал и чай",
    time: "15-20 минут",
    d: "Волосы моют, сушат и приводят в порядок. Масло смывают, душ есть. После — чай по карте в лаунж-зоне, в тишине. Это время входит в программу, торопить вас никто не будет.",
  },
  {
    n: "05",
    t: "Возвращение",
    time: "сколько нужно",
    d: "Приглушённый свет, тишина, неспешность. Можно посидеть ещё, можно собраться сразу. Мы не выгоняем из кресла и не намекаем, что пора.",
  },
];

const FAQ = [
  {
    q: "Что будет, если я опоздаю?",
    a: "Позвоните и предупредите, мы подстроимся. Если опоздание небольшое, программа пройдёт целиком. Если существенное, мастер вместе с вами решит, что убрать, чтобы не спешить: лучше сделать меньше, но спокойно, чем всё бегом. Стоимость в таком случае пересчитывается.",
  },
  {
    q: "Тепло ли в кабинете?",
    a: "Да. Кабинет прогрет заранее, вода и масло подогреты, полы не холодные. Если вам всё равно прохладно, скажите мастеру — принесут плед и добавят тепла. Это нормальная просьба, а не каприз.",
  },
  {
    q: "Слышно ли, что происходит в соседнем кабинете?",
    a: "Нет. Ритуал проходит в отдельном закрытом кабинете, а не за ширмой и не в общем зале. Мимо вас никто не ходит.",
  },
  {
    q: "Я выйду с мокрой головой?",
    a: "Нет. Мастер моет, сушит и приводит волосы в порядок, это входит в программу. В ритуалах ЗАРЯ | ВОЛОСЫ и СУМЕРКИ | ВОЛОСЫ можно выбрать: сушиться самостоятельно или со спа-мастером.",
  },
  {
    q: "Нужно ли что-то брать с собой?",
    a: "Ничего. Полотенца, халат, тапочки и душ у нас есть. Украшения и контактные линзы лучше снять, администратор подскажет где оставить. Ценные вещи убираются в шкафчик.",
  },
  {
    q: "Надо ли мыть голову перед визитом?",
    a: "Не надо. Волосы вымоют здесь, это часть ритуала.",
  },
  {
    q: "Можно ли есть перед визитом?",
    a: "За полтора-два часа лучше не есть плотно. Воду пить можно и нужно. После ритуала будет чай и лёгкий перекус.",
  },
  {
    q: "Что если мне не понравится по ходу процедуры?",
    a: "Скажите сразу, не терпите. Слишком сильно, слишком слабо, неудобно лежать, не тот аромат, холодно — всё это решается за минуту. Мастер спросит сам, но вы можете сказать в любой момент.",
  },
  {
    q: "Можно ли беременным?",
    a: "Есть отдельная программа РОДНИК: со второго триместра и через шесть недель после родов. Остальные программы обсуждаем индивидуально, при записи уточните срок.",
  },
  {
    q: "Как часто можно приходить?",
    a: "Лёгкие ритуалы вроде ЯВЬ — хоть еженедельно. Глубокие, КЕДР и ЛАДА — раз в две-четыре недели. Регулярность важнее частоты, обычно хватает одного-двух визитов в месяц.",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  keywords: ["как проходит спа для головы", "как проходит спа ритуал", "спа для головы спб", "что взять с собой в спа", "Истова"],
  authors: [{ name: "Истова", url: SITE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: URL, siteName: "Истова", title: TITLE, description: DESCRIPTION, locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Как проходит ритуал в Истове" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/og-image.webp`] },
};

export default function KakProhoditPage() {
  const FAQ_JSONLD = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const HOWTO_JSONLD = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Как проходит спа-ритуал в Истове",
    description: DESCRIPTION,
    totalTime: "PT150M",
    inLanguage: "ru-RU",
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.t,
      text: s.d,
    })),
  };
  const BREADCRUMB_JSONLD = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Как проходит ритуал", item: URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />
      <Header />

      <main className="bg-sand">
        <LandingHero
          eyebrow="Санкт-Петербург · Васильевский остров"
          title="Как проходит визит"
          lead="Подробно и без сюрпризов: что происходит с момента, когда вы заходите в дверь, до момента, когда выходите обратно. Сколько занимает каждый шаг и что делать, если что-то пойдёт не так."
          ctaFrom="kak_prohodit_hero"
          priceHint="от 70 до 150 минут"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="text-xs uppercase tracking-widest text-brand/50 pt-8">
            <Link href="/" className="hover:text-brand">Главная</Link>
            <span className="mx-2">·</span>
            <span className="text-brand">Как проходит</span>
          </nav>

          {/* Пять шагов с таймингом */}
          <section className="py-16">
            <h2 className="font-display text-3xl md:text-4xl text-brand mb-3 text-center">Пять шагов</h2>
            <p className="text-center text-brand-dark/70 max-w-xl mx-auto mb-14 leading-relaxed">
              Время указано примерное. Оно считается от начала ритуала, а не от вашего прихода.
            </p>

            <ol className="max-w-3xl mx-auto space-y-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} variant="up" delay={i * 60}>
                  <li className="rounded-[24px] bg-sand-soft border border-brand/10 p-7 md:p-9">
                    <div className="flex items-baseline gap-5 mb-3">
                      <span className="font-display text-3xl md:text-4xl text-brand/40 leading-none">{s.n}</span>
                      <div>
                        <h3 className="font-display text-xl md:text-2xl text-brand leading-snug">{s.t}</h3>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mt-1">{s.time}</div>
                      </div>
                    </div>
                    <p className="text-base text-brand-dark/80 leading-relaxed">{s.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>

          <FeatureRow
            items={[
              { title: "В кабинете тепло", text: "Кабинет прогрет заранее, вода и масло подогреты, полы не холодные. Замёрзнуть здесь нельзя, а если всё же прохладно — скажите, добавим." },
              { title: "Отдельный кабинет", text: "Не ширма и не общий зал. Дверь закрывается, мимо вас никто не ходит, соседей не слышно." },
              { title: "Выйдете собранной", text: "Волосы вымоют, высушат и приведут в порядок. Масло смоют, душ есть. Планы на вечер можно не отменять." },
            ]}
          />

          <PhotoStrip
            photo="/gallery/frag-lounge.jpg"
            alt="Лаунж-зона Истовы"
            caption="Чайная пауза входит в программу. Никто не торопит собираться"
          />

          <SplitBlock
            title="Если вы у нас впервые"
            paragraphs={[
              "Ничего брать с собой не нужно. Полотенца, халат, тапочки и душ есть здесь. Ценные вещи убираются в шкафчик, украшения и линзы лучше снять — администратор покажет куда положить.",
              "Голову перед визитом мыть не надо, её вымоют здесь. За полтора-два часа лучше не есть плотно, а воду пить можно и нужно.",
            ]}
            photo="/gallery/frag-care.jpg"
            photoAlt="Средства для ухода в Истове"
          />

          <SplitBlock
            title="Если что-то идёт не так"
            flip
            paragraphs={[
              "Скажите сразу, не терпите до конца. Слишком сильно или слишком слабо, неудобно лежать, не тот аромат, прохладно — всё это решается за минуту. Мастер спросит сам в начале и по ходу, но вы можете остановить в любой момент.",
              "Если опаздываете, позвоните. Подстроимся: при небольшом опоздании программа пройдёт целиком, при существенном мастер вместе с вами решит, что убрать, чтобы не пришлось спешить. Стоимость тогда пересчитывается.",
            ]}
            photo="/gallery/head-spa/wooden.jpg"
            photoAlt="Гребни для массажа головы"
          />

          <FaqBlock items={FAQ} />
        </div>

        <section className="bg-brand text-sand">
          <div className="container mx-auto px-6 max-w-3xl py-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-5">Выбрать ритуал</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Восемь авторских программ от семидесяти до ста пятидесяти минут, плюс парный вариант.
              Мастер поможет выбрать под ваше состояние.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/programs/"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Смотреть программы
              </Link>
              <TrackedLink
                goal="BOOKING_CLICK" goalParams={{ from: "kak_prohodit_cta" }} href="/#booking"
                className="inline-flex items-center justify-center px-9 py-3.5 border border-sand/40 text-sand rounded-full hover:bg-sand hover:text-brand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms]"
              >
                Записаться
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
