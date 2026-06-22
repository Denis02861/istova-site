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
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Истова",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/istova-icon.png`,
  image: `${SITE_URL}/og-image.webp`,
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
      <head>
        <link rel="agent-skills" href="/.well-known/agent-skills/index.json" type="application/json" />
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <link rel="alternate" href="/sitemap.xml" type="application/xml" title="Sitemap" />
      </head>
      <body className="font-sans">
        {children}
        <WebMCPProvider />
        <Script id="org-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(ORG_JSONLD)}
        </Script>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}", "ym");ym(${YM_ID}, "init", {ssr:true, clickmap:true, accurateTrackBounce:true, trackLinks:true, webvisor:true});`}
        </Script>
        {CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_ID}");`}
          </Script>
        )}
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
