import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";

const SITE_URL = "https://istova.ru";
const TITLE = "Истова — пространство истинного ухода в Петербурге";
const DESCRIPTION =
  "Спа-ритуалы и пространство красоты на Васильевском острове. ул. Беринга, 23 к. 2.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
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
        url: `${SITE_URL}/og-image.jpg`,
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
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const YM_ID = 109992381;

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Истова",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/istova-icon.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Беринга, 23 к. 2",
    addressLocality: "Санкт-Петербург",
    addressCountry: "RU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans">
        {children}
        <Script id="org-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(ORG_JSONLD)}
        </Script>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}", "ym");ym(${YM_ID}, "init", {ssr:true, clickmap:true, accurateTrackBounce:true, trackLinks:true});`}
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
