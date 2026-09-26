import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена — Истова",
  description: "Такой страницы нет. Вернитесь на главную или выберите ритуал Истовы.",
  robots: { index: false, follow: true },
};

const RITUALS = [
  { href: "/programs/zarya-telo/", label: "Заря · тело" },
  { href: "/programs/zarya-volosy/", label: "Заря · волосы" },
  { href: "/programs/sumerki-telo/", label: "Сумерки · тело" },
  { href: "/programs/sumerki-volosy/", label: "Сумерки · волосы" },
];

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-sand flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center">
        <img
          src="/logo/istova-wordmark.webp"
          alt="ИСТŌВА"
          width={728}
          height={218}
          className="h-14 md:h-16 w-auto mx-auto mb-10"
        />

        <p className="text-xs tracking-widest uppercase text-brand/50 mb-4">
          Страница не найдена
        </p>

        <h1 className="font-display italic text-3xl md:text-4xl text-brand mb-5 leading-snug">
          Кажется, вы свернули не туда
        </h1>

        <p className="text-brand/70 mb-10 leading-relaxed">
          Такой страницы у нас нет: возможно, ссылка устарела или в адресе опечатка.
          Ниже дорога обратно.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-brand text-sand rounded-full font-medium hover:bg-brand-dark transition-colors duration-200"
          >
            На главную
          </Link>
          <Link
            href="/go/zapis/?from=page_404"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-brand/25 text-brand rounded-full hover:border-brand/60 transition-colors duration-200"
          >
            Записаться
          </Link>
        </div>

        <div className="border-t border-brand/10 pt-8">
          <p className="text-xs tracking-widest uppercase text-brand/50 mb-4">
            Ритуалы
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center mb-8">
            {RITUALS.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="text-sm text-brand/75 hover:text-brand underline underline-offset-4 decoration-brand/25 hover:decoration-brand/60 transition-colors duration-200"
              >
                {r.label}
              </Link>
            ))}
          </div>

          <p className="text-sm text-brand/60 leading-relaxed">
            Санкт-Петербург, ул. Беринга, 23 к. 2 · 10 минут от м. Приморская
            <br />
            <a
              href="tel:+78122099050"
              className="text-brand hover:text-brand-dark underline underline-offset-4 decoration-brand/25"
            >
              +7 812 209-90-50
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
