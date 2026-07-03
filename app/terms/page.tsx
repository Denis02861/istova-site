import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SITE_URL = "https://istova.ru";
const TARGET = "/oferta/";

export const metadata: Metadata = {
  title: "Перенаправление — Истова",
  robots: { index: false, follow: true },
  alternates: { canonical: `${SITE_URL}${TARGET}` },
};

export default function AliasPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `if (typeof window !== 'undefined') { window.location.replace('${TARGET}'); }`,
        }}
      />
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      </noscript>
      <Header />
      <main className="bg-sand min-h-screen py-24 flex items-center justify-center">
        <div className="text-center container mx-auto px-6 max-w-md">
          <h1 className="font-display text-2xl text-brand mb-4 uppercase tracking-wider">Переход</h1>
          <p className="text-brand-dark/80 mb-6">
            Страница перемещена. Если переадресация не сработала, перейдите вручную:
          </p>
          <Link href={TARGET} className="inline-block px-6 py-3 bg-brand text-sand uppercase tracking-widest text-sm">
            Открыть страницу
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
