"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { programs, type Program } from "../lib/programs-data";
const DISCLAIMER =
  "*Перечень услуг составлен в соответствии с требованиями Приказа Росстандарта от 29.11.2012 №1597-ст и №1605-ст «ГОСТ Р 55317-2012». Истова не оказывает лечебные и оздоровительные процедуры.";

export default function Programs() {
  const [open, setOpen] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const active = programs.find((p) => p.slug === open);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    if (open) {
      // iOS-safe scroll lock: фиксируем body с текущим scrollY
      const scrollY = window.scrollY;
      document.body.dataset.scrollLock = String(scrollY);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.classList.add("istova-modal-open");
      window.addEventListener("keydown", onKey);
    }
    return () => {
      if (document.body.dataset.scrollLock !== undefined) {
        const y = parseInt(document.body.dataset.scrollLock || "0", 10);
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        delete document.body.dataset.scrollLock;
        document.body.classList.remove("istova-modal-open");
        window.scrollTo(0, y);
      }
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.slug) setOpen(detail.slug);
    };
    window.addEventListener("istova:open-program", onOpen);
    return () => window.removeEventListener("istova:open-program", onOpen);
  }, []);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("button");
    const step = card ? card.offsetWidth + 20 : 400;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  const renderCard = (p: Program) => (
    <button
      key={p.slug}
      type="button"
      onClick={() => setOpen(p.slug)}
      className="group relative shrink-0 w-[80vw] sm:w-[340px] md:w-[380px] snap-start bg-sand-soft border border-brand/10 p-8 flex flex-col min-h-[360px] text-left transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(116,68,54,0.25)] hover:border-brand/40 overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand/40"
    >
      <span className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-brand/0 via-brand/40 to-brand/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {p.accent && (
          <div className="text-[10px] uppercase tracking-widest text-brand/60">
            {p.accent.split("·")[0].trim()}
          </div>
        )}
        {p.pair_price && (
          <div className="text-[10px] uppercase tracking-widest text-brand/70 px-2 py-0.5 border border-brand/20 bg-sand">
            Можно вдвоём
          </div>
        )}
      </div>
      <h3 className="font-display text-2xl md:text-3xl tracking-wider text-brand mb-4 uppercase">
        {p.name}
      </h3>
      <p className="font-display italic text-lg md:text-xl text-brand-dark/85 leading-snug mb-6 flex-1">
        {p.teaser}
      </p>
      <div className="flex justify-between items-end pt-4 border-t border-brand/10">
        <div className="text-xs uppercase tracking-widest text-brand/70 group-hover:text-brand transition-colors flex items-center gap-1">
          Что внутри
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
        <div className="text-right">
          <div className="font-display text-xl text-brand">{p.price}</div>
          <div className="text-[10px] text-brand-dark/60 mt-0.5">~ {p.dur}</div>
        </div>
      </div>
    </button>
  );

  return (
    <section id="programs" className="py-24 bg-sand-deep/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-xs uppercase tracking-widest text-brand/60 mb-4 text-center">Программы</div>
        <h2 className="font-display text-4xl md:text-5xl text-brand mb-4 text-center uppercase tracking-wider">
          9 ритуалов Истовы
        </h2>
        <p className="text-center text-brand-dark/70 mb-10 max-w-2xl mx-auto">
          4 базовых парных ритуала и 5 авторских. Каждый — со своим темпом, ароматом и финалом. Свайпайте карточки →
        </p>

        <div className="max-w-3xl mx-auto mb-10 border border-brand/15 bg-sand-soft/60 p-6 md:p-8">
          <div className="text-xs uppercase tracking-widest text-brand/60 mb-4 text-center">Каждый ритуал Истовы</div>
          <div className="space-y-2 text-sm md:text-base text-brand-dark/85 leading-relaxed text-center">
            <p>Открывается арома-выбором · сопровождается звуковыми акцентами · завершается чаем в лаунж-зоне.</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          data-lenis-prevent
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 px-6 md:px-[10vw] scroll-smooth touch-pan-x"
          style={{ scrollbarWidth: "thin", WebkitOverflowScrolling: "touch" }}
        >
          {programs.map(renderCard)}
          <div className="shrink-0 w-1 md:w-6" aria-hidden="true" />
        </div>

        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Предыдущая программа"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-sand-soft border border-brand/20 text-brand hover:bg-brand hover:text-sand transition-colors shadow-lg z-10"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Следующая программа"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-sand-soft border border-brand/20 text-brand hover:bg-brand hover:text-sand transition-colors shadow-lg z-10"
        >
          →
        </button>
      </div>

      <div className="container mx-auto px-6 mt-10 flex flex-col items-center gap-4">
        <Link
          href="/programs/"
          className="inline-block px-8 py-4 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors uppercase tracking-widest text-sm"
        >
          Все программы →
        </Link>
        <a
          href="#quiz"
          className="text-xs uppercase tracking-widest text-brand/70 hover:text-brand border-b border-brand/30 hover:border-brand pb-1 transition-colors"
        >
          Не знаете какую выбрать — пройдите квиз ↑
        </a>
        <p className="text-[10px] text-brand-dark/70 leading-relaxed max-w-4xl mx-auto mt-6 px-2 text-center">
          {DISCLAIMER}
        </p>
      </div>

      {mounted && active && createPortal(
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-brand-dark/50 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            data-lenis-prevent
            className="relative bg-sand-soft w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain p-6 md:p-10 border border-brand/20 shadow-2xl"
            style={{ WebkitOverflowScrolling: "touch" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Закрыть"
              className="sticky top-2 float-right z-10 w-11 h-11 flex items-center justify-center text-brand/70 hover:text-brand bg-sand-soft hover:bg-brand/5 border border-brand/15 rounded-full transition-colors text-2xl -mr-2 -mt-2 md:-mr-4 md:-mt-4"
            >
              ×
            </button>

            <div className="pr-10">
              {active.accent && (
                <div className="text-[10px] uppercase tracking-widest text-brand/60 mb-3">{active.accent}</div>
              )}
              <h3 className="font-display text-3xl md:text-4xl tracking-wider text-brand uppercase mb-4">
                {active.name}
              </h3>
              <p className="font-display italic text-lg text-brand-dark/85 leading-snug mb-6">
                {active.teaser}
              </p>
              {active.note && (
                <div className="text-xs text-brand/70 italic mb-6 pb-6 border-b border-brand/10">
                  {active.note}
                </div>
              )}

              <div className="text-xs uppercase tracking-widest text-brand/60 mb-4">Что внутри ритуала</div>
              <ul className="space-y-3 text-sm md:text-base text-brand-dark/85 leading-relaxed mb-6">
                {active.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-display text-brand/50 shrink-0 min-w-[24px]">0{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>

              {active.cosmetics && active.cosmetics.length > 0 && (
                <div className="mb-6 p-5 bg-sand/60 border border-brand/10">
                  <div className="text-xs uppercase tracking-widest text-brand/60 mb-3">Косметика и материалы</div>
                  <ul className="space-y-2 text-sm text-brand-dark/85 leading-relaxed">
                    {active.cosmetics.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brand/50 shrink-0">·</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active.after && (
                <div className="text-sm text-brand-dark/70 mb-6 p-4 bg-sand/60 border border-brand/10">
                  <span className="font-medium text-brand">После:</span> {active.after}
                </div>
              )}

              <div className="pt-6 border-t border-brand/10 mb-6">
                <div className="text-xs uppercase tracking-widest text-brand/60 mb-3">Стоимость и длительность</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-sand/60 border border-brand/10">
                    <div className="text-[10px] uppercase tracking-widest text-brand/60 mb-1">Одному</div>
                    <div className="font-display text-2xl md:text-3xl text-brand">{active.price}</div>
                    <div className="text-[10px] text-brand-dark/60 mt-1">~ {active.dur}</div>
                  </div>
                  {active.pair_price && (
                    <div className="p-4 bg-sand border border-brand/25">
                      <div className="text-[10px] uppercase tracking-widest text-brand/70 mb-1">Вдвоём · выгоднее</div>
                      <div className="font-display text-2xl md:text-3xl text-brand">{active.pair_price}</div>
                      <div className="text-[10px] text-brand-dark/60 mt-1">в двух кабинетах одновременно</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-2">
                <a
                  href="#booking"
                  onClick={() => {
                    try { sessionStorage.setItem("istova-preselect", JSON.stringify({ slug: active.slug, name: active.name, forDuo: false })); } catch {}
                    window.dispatchEvent(new CustomEvent("istova:preselect-program", { detail: { slug: active.slug, name: active.name, forDuo: false } }));
                    setOpen(null);
                  }}
                  className="flex-1 px-4 py-3 bg-brand text-sand text-center hover:bg-brand-dark transition-colors uppercase tracking-widest text-xs"
                >
                  Записаться одному
                </a>
                {active.pair_price && (
                  <a
                    href="#booking"
                    onClick={() => {
                      try { sessionStorage.setItem("istova-preselect", JSON.stringify({ slug: active.slug, name: active.name, forDuo: true })); } catch {}
                      window.dispatchEvent(new CustomEvent("istova:preselect-program", { detail: { slug: active.slug, name: active.name, forDuo: true } }));
                      setOpen(null);
                    }}
                    className="flex-1 px-4 py-3 bg-brand text-sand text-center hover:bg-brand-dark transition-colors uppercase tracking-widest text-xs"
                  >
                    Записаться вдвоём
                  </a>
                )}
                <Link
                  href={`/programs/${active.slug}/`}
                  className="px-6 py-3 border border-brand/40 text-brand text-center hover:bg-brand hover:text-sand transition-colors uppercase tracking-widest text-sm"
                >
                  Полная страница
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
