import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import TrackedLink from "../components/TrackedLink";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import { SplitBlock, PhotoStrip, ProgramCards, FeatureRow } from "../components/LandingBlocks";
import { programs } from "../lib/programs-data";

// Посадочная под SMS-рассылку. В поиске не нужна: сюда приходит холодный трафик,
// который ничего не искал, и мешать его с поисковым в статистике нельзя.
// Задача страницы — объяснить с нуля и развести человека по разделам сайта.
const SITE_URL = "https://istova.ru";
const URL = `${SITE_URL}/tishina/`;
const TITLE = "Тишина на 70 минут — Истова";
const DESCRIPTION =
  "Спа для головы на Васильевском острове: тёплая вода, работа с шеей, сушка и укладка в финале. От 6800 ₽, м. Приморская.";

const SLUGS = ["yav", "sumerki-volosy", "lada"];
const QUIET_PROGRAMS = programs.filter((p) => SLUGS.includes(p.slug));

const PHOTOS: Record<string, string> = {
  yav: "/gallery/clean/chasha.jpg",
  "sumerki-volosy": "/gallery/frag-headspa.jpg",
  lada: "/gallery/frag-body.jpg",
};

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
          lead="Бывает, что день закончился, а мысли всё крутятся. Здесь от вас ничего не требуется: вы ложитесь, дальше всё делают за вас. Тёплая вода, тишина и чай в финале."
          ctaFrom="sms_hero"
          priceHint="от 6800 ₽ · 70-150 минут"
        />

        <div className="container mx-auto px-6 max-w-5xl">
          <SplitBlock
            title="Что здесь происходит"
            paragraphs={[
              "Спа для головы это не про короткий массаж и не про мытьё волос. Вы лежите в отдельном кабинете, мастер работает с шеей, плечами и кожей головы, а тёплая вода из золотой дуги льётся так, что через несколько минут перестаёшь следить за временем.",
              "Мы не обещаем вылечить усталость и не ставим диагнозов. Мы даём то, чего обычно не хватает: несколько часов, когда никто ничего от вас не хочет.",
            ]}
            photo="/gallery/04-head-spa.jpg"
            photoAlt="Спа для головы в Истове"
          />

          <FeatureRow
            items={[
              {
                title: "Вам будет тепло",
                text: "Тёплый кабинет, подогретая вода и масло. Это звучит мелко ровно до того момента, пока не замёрзнешь там, где пришёл расслабляться.",
              },
              {
                title: "Время не урежут",
                text: "Отсчёт идёт от начала ритуала, а не от вашего прихода. Сколько заявлено, столько и будет.",
              },
              {
                title: "Уйдёте собранной",
                text: "Волосы вымоют, высушат и уложат, масло смоют. После можно спокойно ехать по делам, а не прятать голову под шапкой.",
              },
            ]}
          />

          <PhotoStrip
            photo="/gallery/frag-tea.jpg"
            alt="Чай в лаунж-зоне Истовы"
            caption="Финал каждого ритуала: чай и время посидеть молча"
          />

          <ProgramCards title="С чего обычно начинают" programs={QUIET_PROGRAMS} photos={PHOTOS} />

          <section className="pb-4">
            <div className="rounded-[28px] bg-sand-soft border border-brand/10 p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-5">Как нас найти</div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3 text-brand-dark/75 text-[15px] leading-relaxed">
                  <div>
                    <span className="text-brand/55">Адрес</span>
                    <br />
                    Санкт-Петербург, ул. Беринга, 23 к. 2
                  </div>
                  <div>
                    <span className="text-brand/55">Как добраться</span>
                    <br />
                    Десять минут пешком от метро Приморская, Васильевский остров
                  </div>
                  <div>
                    <span className="text-brand/55">Телефон</span>
                    <br />
                    <TrackedLink
                      goal="PHONE_CLICK"
                      goalParams={{ from: "sms_contacts" }}
                      href="tel:+79013201050"
                      className="text-brand hover:text-brand-dark transition-colors"
                    >
                      +7 (901) 320-10-50
                    </TrackedLink>
                  </div>
                  <div>
                    <span className="text-brand/55">Телеграм</span>
                    <br />
                    <a
                      href="https://t.me/Istova_spa"
                      className="text-brand hover:text-brand-dark transition-colors"
                    >
                      @Istova_spa
                    </a>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[20px] border border-brand/10">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=30.221%2C59.947&z=16&text=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%91%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%B0%2C%2023%D0%BA2"
                    width="100%"
                    height="240"
                    frameBorder="0"
                    allowFullScreen
                    title="Истова на карте"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="py-14">
            <div className="text-[11px] uppercase tracking-[0.18em] text-brand/55 mb-5">Посмотреть дальше</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { href: "/programs/", t: "Все программы", d: "Девять авторских ритуалов и цены" },
                { href: "/kak-prohodit/", t: "Как проходит", d: "По минутам, от входа до чая" },
                { href: "/", t: "О пространстве", d: "Кто мы и почему так устроено" },
                { href: "/massazh-golovy/", t: "Спа для головы", d: "Подробно про технику и дугу" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="group block">
                  <div className="font-display text-lg text-brand mb-1.5 leading-snug group-hover:text-brand-dark transition-colors">
                    {l.t}
                  </div>
                  <div className="text-sm text-brand-dark/65 leading-relaxed">{l.d}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-brand text-sand">
          <div className="container mx-auto px-6 max-w-3xl py-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-5">Записаться</h2>
            <p className="text-base text-sand/80 leading-relaxed mb-9">
              Выберите удобное время онлайн или позвоните: администратор поможет подобрать ритуал под ваше состояние.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedLink
                goal="BOOKING_CLICK"
                goalParams={{ from: "sms_cta" }}
                href="/#booking"
                className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium hover:bg-white active:scale-[0.98] transition-[transform,background-color] duration-[220ms]"
              >
                Записаться онлайн
              </TrackedLink>
              <TrackedLink
                goal="PHONE_CLICK"
                goalParams={{ from: "sms_cta" }}
                href="tel:+79013201050"
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
