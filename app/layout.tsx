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
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "HandheldFriendly": "true",
    "MobileOptimized": "width",
    "format-detection": "telephone=yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Истова",
    "theme-color": "#F4F2EF",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
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
  founder: {
    "@type": "Person",
    name: "Карасёв Денис Игоревич",
    jobTitle: "Основатель",
  },
  foundingDate: "2026-06",
  legalName: "ИП Карасёв Денис Игоревич",
  taxID: "280118121214",
  vatID: "280118121214",
  identifier: [
    { "@type": "PropertyValue", propertyID: "ИНН", value: "280118121214" },
    { "@type": "PropertyValue", propertyID: "ОГРНИП", value: "326237500185610" },
    { "@type": "PropertyValue", propertyID: "ОКВЭД", value: "96.02" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7 (901) 320-10-50",
    contactType: "reservations",
    areaServed: "RU",
    availableLanguage: ["Russian"],
    email: "istomaspa@yandex.ru",
  },
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Истова",
  alternateName: "Istova SPA",
  inLanguage: "ru-RU",
  publisher: { "@id": `${SITE_URL}/#organization` },
  copyrightHolder: { "@id": `${SITE_URL}/#organization` },
  datePublished: "2026-06-09",
  dateModified: "2026-07-03",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://mc.yandex.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://mc.yandex.ru https://mc.yandex.com https://yandex.ru https://storage.mds.yandex.net; font-src 'self' data:; connect-src 'self' https://mc.yandex.ru https://mc.yandex.com https://n8nautomat.site; frame-src 'self' https://yandex.ru https://mc.yandex.ru; frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://n8nautomat.site; upgrade-insecure-requests" />
        <meta name="permissions-policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
        <link rel="agent-skills" href="/.well-known/agent-skills/index.json" type="application/json" />
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <link rel="alternate" href="/sitemap.xml" type="application/xml" title="Sitemap" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192.png" />
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
