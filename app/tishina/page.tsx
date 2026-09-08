import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import Reveal from "../components/Reveal";

// Короткая посадочная под SMS-рассылку: первый экран, три причины с фото,
// все контакты одним блоком и уход на основной сайт. Длинного скролла быть не должно —
// человек пришёл с сообщения, а не из поиска, и читать простыню не будет.
// В поиске страница не нужна: холодный трафик нельзя мешать с поисковым в статистике.
const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/tishina/`;
const TITLE = "Тишина на 70 минут — Истова";
const DESCRIPTION =
  "Спа для головы на Васильевском острове: тёплая вода, работа с шеей, сушка и укладка в финале. От 6800 ₽, м. Приморская.";

const REASONS = [
  {
    photo: "/gallery/head-spa/aurora.jpg",
    title: "Тёплая вода и тишина",
    text: "Отдельный кабинет, тёплая вода золотой дуги, работа с шеей и плечами. Никто не ходит мимо и не разговаривает.",
  },
  {
    photo: "/gallery/head-spa/jade.jpg",
    title: "Уйдёте собранной",
    text: "Волосы вымоют, высушат и уложат, масло смоют. После можно спокойно ехать по делам.",
  },
  {
    photo: "/gallery/frag-tea.jpg",
    title: "Время без спешки",
    text: "От 70 до 150 минут, отсчёт от начала ритуала. В финале чай и лаунж-зона.",
  },
];

const LINKS = [
  { href: "tel:+79013201050", label: "+7 (901) 320-10-50", note: "Позвонить", goal: "PHONE_CLICK" },
  { href: "https://wa.me/79013201050", label: "WhatsApp", note: "Написать в мессенджер", goal: "WA_CLICK" },
  { href: "https://t.me/Istova_spa", label: "Telegram", note: "@Istova_spa", goal: "TG_CLICK" },
  { href: "https://instagram.com/istova.spa", label: "Instagram", note: "@istova.spa", goal: "IG_CLICK" },
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
          priceHint="от 6800 ₽ · 70-150 минут"
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

            <div className="text-center mt-10">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 border border-brand/25 text-brand rounded-full hover:bg-brand hover:text-sand active:scale-[0.98] transition-[transform,background-color,color] duration-[220ms]"
              >
                Смотреть весь сайт
              </Link>
            </div>
          </section>

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

        <section className="bg-brand text-sand">
          <div className="container mx-auto px-6 max-w-3xl py-16 text-center">
            <h2 className="font-display text-2xl md:text-3xl mb-4">Хотите посмотреть всё?</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-8">
              Девять авторских программ, цены, как проходит визит и фотографии пространства.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
            >
              Перейти на основной сайт
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
