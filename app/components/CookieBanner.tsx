"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "istova-cookie-consent-v1";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        const t = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage может быть недоступен — просто не показываем
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, at: new Date().toISOString() }));
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление о файлах cookie"
      className="fixed left-4 right-4 bottom-4 md:left-6 md:bottom-6 md:right-auto md:max-w-md z-[75] bg-sand-soft border border-brand/20 shadow-[0_20px_60px_-20px_rgba(116,68,54,0.35)] p-5 md:p-6"
    >
      <p className="text-sm text-brand-dark/85 leading-relaxed mb-4">
        Мы используем cookie и Яндекс.Метрику, чтобы понимать, как сайт помогает посетителям.
        Продолжая пользоваться сайтом, вы соглашаетесь с этим и с{" "}
        <a href="/politika-obrabotki-personalnyh-dannyh/" className="underline hover:text-brand">
          Политикой обработки персональных данных
        </a>
        .
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={accept}
          className="px-5 py-2 bg-brand text-sand text-sm uppercase tracking-widest hover:bg-brand-dark transition-colors"
        >
          Хорошо
        </button>
        <a
          href="/politika-obrabotki-personalnyh-dannyh/"
          className="text-xs uppercase tracking-widest text-brand/70 hover:text-brand pb-0.5 border-b border-brand/30"
        >
          Подробнее
        </a>
      </div>
    </div>
  );
}
