import "./globals.css";
import Script from "next/script";
import WebMCPProvider from "./components/WebMCPProvider";
import type { Metadata } from "next";

const SITE_URL = "https://istova.ru";
const TITLE = "Истова — пространство истинного ухода в Петербурге";
const DESCRIPTION =
  "Премиальное бьюти-пространство в сердце Петербурга — авторские СПА-ритуалы, парикмахерское искусство, макияж. Сервис под ключ для особенных моментов. Васильевский остров, ул. Беринга, 23 к. 2.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  keywords: [
    "спа Санкт-Петербург",
    "спа Васильевский остров",
    "авторские спа-ритуалы",
    "СПА для тела и волос",
    "парикмахерская Петербург",
    "спа-программы",
    "сертификат на спа",
    "Истова",
  ],
  authors: [{ name: "Истова" }],
  category: "СПА и красота",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    siteName: "Истова",
    title: TITLE,
    description: DESCRIPTION,
    locale: "ru_RU",
    images: [
      {
        url: `${SITE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Истова",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.webp`],
  },
};

const YM_ID = 109992381;

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["BeautySalon", "HealthAndBeautyBusiness", "DaySpa"],
  "@id": `${SITE_URL}/#organization`,
  name: "Истова",
  alternateName: "Istova SPA",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/istova-icon.png`,
  image: [`${SITE_URL}/og-image.webp`],
  description: DESCRIPTION,
  telephone: "+7 (901) 320-10-50",
  priceRange: "6800—13000 ₽",
  currenciesAccepted: "RUB",
  paymentAccepted: "Cash, Credit Card, СБП",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Беринга, 23 к. 2",
    addressLocality: "Санкт-Петербург",
    addressRegion: "Санкт-Петербург",
    postalCode: "199397",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.9520,
    longitude: 30.2440,
  },
  areaServed: {
    "@type": "City",
    name: "Санкт-Петербург",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "22:00",
    },
  ],
  sameAs: [
    "https://t.me/Istova_spa",
  ],
  makesOffer: [
    { "@type": "Offer", name: "ЗАРЯ | ТЕЛО", price: "9200", priceCurrency: "RUB", url: `${SITE_URL}/programs/zarya-telo/` },
    { "@type": "Offer", name: "ЗАРЯ | ВОЛОСЫ", price: "8200", priceCurrency: "RUB", url: `${SITE_URL}/programs/zarya-volosy/` },
    { "@type": "Offer", name: "СУМЕРКИ | ТЕЛО", price: "10500", priceCurrency: "RUB", url: `${SITE_URL}/programs/sumerki-telo/` },
    { "@type": "Offer", name: "СУМЕРКИ | ВОЛОСЫ", price: "9500", priceCurrency: "RUB", url: `${SITE_URL}/programs/sumerki-volosy/` },
    { "@type": "Offer", name: "ОТЗВУК", price: "13000", priceCurrency: "RUB", url: `${SITE_URL}/programs/otzvuk/` },
  ],
  knowsAbout: [
    "СПА-ритуалы",
    "Парикмахерское искусство",
    "Массаж",
    "Уход за волосами",
    "Финская сауна",
  ],
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Истова",
  inLanguage: "ru-RU",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="agent-skills" href="/.well-known/agent-skills/index.json" type="application/json" />
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <link rel="alternate" href="/sitemap.xml" type="application/xml" title="Sitemap" />
        <link rel="preload" as="image" href="/logo/istova-wordmark.webp" fetchPriority="high" type="image/webp" />
        <link rel="preload" as="image" href="/brand/decor/cloud.webp" type="image/webp" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://yandex.ru" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
      </head>
      <body className="font-sans">
        {children}
        <WebMCPProvider />
        <Script id="org-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(ORG_JSONLD)}
        </Script>
        <Script id="website-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(WEBSITE_JSONLD)}
        </Script>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}", "ym");ym(${YM_ID}, "init", {ssr:true, clickmap:true, accurateTrackBounce:true, trackLinks:true, webvisor:true});`}
        </Script>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YM_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
