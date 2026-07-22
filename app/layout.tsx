import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";

const SITE_URL = "https://istova.ru";
const TITLE = "Истова — head spa и спа для головы в Санкт-Петербурге";
const DESCRIPTION =
  "Head spa и спа для головы на Васильевском острове, м. Приморская. ✔ 9 авторских ритуалов ✔ Спа для двоих ✔ Аква-массаж ✔ Sound bath. Ул. Беринга, 23 к. 2.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  keywords: [
    "head spa",
    "head spa Санкт-Петербург",
    "спа для головы",
    "спа для головы Санкт-Петербург",
    "азиатская спа",
    "азиатский head spa",
    "аква-массаж головы",
    "спа Санкт-Петербург",
    "спа Васильевский остров",
    "авторские спа-ритуалы",
    "спа для тела и волос",
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
    { "@type": "Offer", name: "КЕДР + ЛАДА", price: "21000", priceCurrency: "RUB", url: `${SITE_URL}/programs/kedr-lada/` },
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
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://mc.yandex.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://mc.yandex.ru https://mc.yandex.com https://yandex.ru https://storage.mds.yandex.net; font-src 'self' data:; connect-src 'self' https://mc.yandex.ru https://mc.yandex.com https://n8nautomat.site; frame-src 'self' https://yandex.ru https://mc.yandex.ru; frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://n8nautomat.site" />
        <meta name="permissions-policy" content="camera=(), microphone=(), geolocation=(), payment=()" />
        <link rel="agent-skills" href="/.well-known/agent-skills/index.json" type="application/json" />
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <link rel="alternate" href="/sitemap.xml" type="application/xml" title="Sitemap" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192.png" />
        <link rel="preload" as="image" href="/logo/istova-wordmark.webp" fetchPriority="high" type="image/webp" />
        <link rel="preload" as="font" href="/fonts/Inter-Variable.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://yandex.ru" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className="font-sans">
        <a href="#hero" className="skip-link">Перейти к содержимому</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}", "ym");ym(${YM_ID}, "init", {ssr:true, webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-980B4F1TWG"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-980B4F1TWG');`}
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
