import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import Reveal from "../components/Reveal";
import Booking from "../components/Booking";
import { FaqBlock } from "../components/LandingBlocks";
import { RATING } from "../lib/rating";

// Короткая посадочная под SMS-рассылку: первый экран, три причины с фото,
// все контакты одним блоком и уход на основной сайт. Длинного скролла быть не должно —
// человек пришёл с сообщения, а не из поиска, и читать простыню не будет.
// В поиске страница не нужна: холодный трафик нельзя мешать с поисковым в статистике.
const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/tishina/`;
const TITLE = "Тишина на 75 минут — Истова";
const DESCRIPTION =
  "Спа для головы на Васильевском острове: тёплая вода, работа с шеей, сушка и укладка в финале. От 6800 ₽, м. Приморская.";

const REASONS = [
  {
    photo: "/gallery/head-spa/aurora.webp",
    title: "Тёплая вода и тишина",
    text: "Отдельный кабинет, тёплая вода золотой дуги, работа с шеей и плечами. Никто не ходит мимо и не разговаривает.",
  },
  {
    photo: "/gallery/head-spa/jade.webp",
    title: "Уйдёте собранной",
    text: "Волосы вымоют, высушат и уложат, масло смоют. После можно спокойно ехать по делам.",
  },
  {
    photo: "/gallery/frag-tea.webp",
    title: "Время без спешки",
    text: "От 75 до 150 минут, отсчёт от начала ритуала. В финале чай и лаунж-зона.",
  },
];

// Вопросы взяты дословно из блока FAQ на главной (app/components/FAQ.tsx) —
// это уже утверждённые ответы, выдумывать для посадочной ничего нельзя.
// Отобраны те четыре, что закрывают главные страхи из портрета аудитории
// (reports/istova-sms-portret.txt): мокрая голова, боль, что взять с собой, спешка.
const FAQ_ITEMS = [
  {
    q: "Голова и волосы остаются мокрыми после?",
    a: "Нет. После аква-медитации мастер сушит и делает лёгкую укладку. В программах ЗАРЯ | ВОЛОСЫ и СУМЕРКИ | ВОЛОСЫ можно выбрать: самостоятельная сушка или со спа-мастером.",
  },
  {
    q: "Больно ли во время массажа головы?",
    a: "Нет. Все техники в Истове мягкие. Мы работаем с расслаблением, а не с силовой проработкой. Если давление некомфортно — говорите мастеру, он сразу поменяет технику.",
  },
  {
    q: "Нужно ли что-то с собой?",
    a: "Всё необходимое у нас: полотенца, халат, тапочки, душ. Снять украшения и контактные линзы — на месте всё расскажет администратор.",
  },
  {
    q: "Как добраться и есть ли парковка?",
    a: "Мы на Васильевском острове, ул. Беринга, 23 к. 2. Ближайшее метро — «Приморская» (10 мин пешком). Бесплатная парковка прямо у салона.",
  },
];

const LINKS = [
  { href: "tel:+79013201050", label: "+7 (901) 320-10-50", note: "Позвонить", goal: "PHONE_CLICK" },
  { href: "https://wa.me/79013201050", label: "WhatsApp", note: "Написать в мессенджер", goal: "WA_CLICK" },
  { href: "https://t.me/Istova_spa", label: "Telegram", note: "@Istova_spa", goal: "TG_CLICK" },
  { href: "https://dikidi.ru/2107431", label: "Онлайн-запись", note: "Выбрать время самому", goal: "BOOKING_CLICK" },
  {
    href: "https://yandex.ru/maps/org/istova/63939829435/",
    label: "Яндекс Карты",
    note: "Отзывы и маршрут",
    goal: "MAPS_CLICK",
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: URL,
    siteName: "Истова",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ru_RU",
    images: [{ url: `${SITE_URL}/og-image.webp`, width: 1200, height: 630, alt: "Истова" }],
  },
};

export default function TishinaPage() {
  return (
    <>
      <Header />

      <main className="bg-sand">
        <LandingHero
          eyebrow="Васильевский остров · 10 минут от Приморской"
          title="Когда голова не выключается сама"
          lead="Здесь от вас ничего не требуется: вы ложитесь, дальше всё делают за вас. Тёплая вода, тишина и чай в финале."
          ctaFrom="sms_hero"
          priceHint="от 6800 ₽ · 75-150 минут"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <section className="py-12 md:py-16">
            <div className="grid sm:grid-cols-3 gap-6">
              {REASONS.map((r, i) => (
                <Reveal key={r.title} variant="fade" delay={i * 0.08}>
                  <div>
                    <div className="overflow-hidden rounded-[22px] h-[200px] md:h-[240px] mb-4">
                      <img
                        src={r.photo}
                        alt={r.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="font-display text-xl text-brand mb-2 leading-snug">{r.title}</div>
                    <div className="text-sm text-brand-dark/70 leading-relaxed">{r.text}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Доказательство вместо увода на главную. Раньше здесь стояла кнопка
                «Смотреть весь сайт»: человек с SMS уходил с посадочной, так и не
                записавшись. Цифра берётся из единого источника app/lib/rating.ts,
                который синхронизируется с карточкой Яндекс.Карт. */}
            <div className="text-center mt-10">
              <TrackedLink
                goal="MAPS_CLICK"
                goalParams={{ from: "sms_rating" }}
                href="https://yandex.ru/maps/org/istova/63939829435/reviews/"
                className="inline-flex items-baseline gap-2 text-brand hover:text-brand-dark transition-colors"
              >
                <span className="font-display text-3xl">{RATING.value},0</span>
                <span className="text-sm text-brand-dark/65">
                  на Яндекс.Картах · {RATING.count} оценок
                </span>
              </TrackedLink>
            </div>
          </section>

          <FaqBlock items={FAQ_ITEMS} />

          <section className="pb-14">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-2">Связаться и записаться</div>
              <div className="text-brand-dark/70 text-[15px] leading-relaxed mb-7">
                Санкт-Петербург, ул. Беринга, 23 к. 2. Десять минут пешком от метро Приморская.
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {LINKS.map((l) => (
                  <TrackedLink
                    key={l.href}
                    goal={l.goal}
                    goalParams={{ from: "sms_contacts" }}
                    href={l.href}
                    className="group block rounded-[18px] border border-brand/12 bg-sand px-5 py-4 hover:border-brand/35 active:scale-[0.99] transition-[transform,border-color] duration-[200ms]"
                  >
                    <div className="text-brand font-medium leading-snug group-hover:text-brand-dark transition-colors">
                      {l.label}
                    </div>
                    <div className="text-xs text-brand-dark/55 mt-0.5">{l.note}</div>
                  </TrackedLink>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Форма. До 30.09.2026 её на посадочной не было вовсе: единственным
            действием была кнопка в онлайн-запись. По рассылке №1 из 59 человек
            9 кликнули телефон и 9 телеграм — то есть связаться хотели, но
            выбирать время в чужом календаре были не готовы. Цель «заявка
            отправлена» показывала ноль не потому, что никто не заполнил,
            а потому что заполнять было нечего. */}
        <Booking />

        {/* Уход на основной сайт оставлен, но неброско. Раньше здесь стоял
            полноэкранный баннер «Хотите посмотреть всё?» — он забирал человека
            с посадочной прямо перед точкой записи. */}
        <div className="container mx-auto px-6 max-w-5xl pb-16 text-center">
          <Link
            href="/"
            className="text-sm text-brand/60 hover:text-brand underline underline-offset-4 decoration-brand/25 transition-colors"
          >
            Все девять программ, цены и фотографии пространства
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
