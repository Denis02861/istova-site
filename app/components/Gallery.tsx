"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import BlurFade from "./magicui/BlurFade";

const photos = [
  { src: "/gallery/frag-lounge.jpg",  alt: "Зона отдыха с закатным светом" },
  { src: "/gallery/frag-tea.jpg",     alt: "Чайный ритуал" },
  { src: "/gallery/frag-headspa.jpg", alt: "Кабинет спа для головы" },
  { src: "/gallery/frag-aroma.jpg",   alt: "Арома-ритуалы Истовы" },
  { src: "/gallery/frag-sauna.jpg",   alt: "Финская сауна" },
  { src: "/gallery/frag-water.jpg",   alt: "Welcome-зона" },
  { src: "/gallery/frag-massage.jpg", alt: "Массажный кабинет" },
  { src: "/gallery/frag-care.jpg",    alt: "Уход и косметика Davines" },
  { src: "/gallery/frag-body.jpg",    alt: "Ритуалы для тела" },
  { src: "/gallery/frag-apples.jpg",  alt: "Лаунж-зона" },
];

const rowA = [0, 1, 2, 3, 4];
const rowB = [5, 6, 7, 8, 9];

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const open = index !== null;

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i + photos.length - 1) % photos.length)), []);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % photos.length)), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("istova-modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("istova-modal-open");
    };
  }, [open, close, prev, next]);

  const Tile = ({ i }: { i: number }) => (
    <button
      type="button"
      onClick={() => setIndex(i)}
      aria-label={`Открыть фото: ${photos[i].alt}`}
      className="group relative shrink-0 w-40 sm:w-48 aspect-[3/4] rounded-lg overflow-hidden border border-brand/10 bg-brand/5 cursor-pointer"
    >
      <img
        src={photos[i].src}
        alt={photos[i].alt}
        className="w-full h-full object-cover blur-[2.5px] opacity-70 scale-105 transition-all duration-700 ease-out group-hover:blur-0 group-hover:opacity-100 group-hover:scale-100"
        loading="lazy"
      />
    </button>
  );

  const Row = ({ ids, reverse }: { ids: number[]; reverse?: boolean }) => (
    <div className={`flex gap-4 w-max ${reverse ? "frag-track-rev" : "frag-track"}`}>
      {[...ids, ...ids].map((i, k) => (
        <Tile key={`${i}-${k}`} i={i} />
      ))}
    </div>
  );

  return (
    <section id="gallery" className="py-20 md:py-28 bg-sand relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full border border-brand/20 text-[10px] uppercase tracking-[0.2em] text-brand/70 font-medium">
            Как это выглядит
          </span>
        </div>
        <BlurFade delay={0.05} yOffset={16}>
          <h2 className="font-display text-4xl md:text-5xl text-brand mb-3 text-center tracking-tight">
            Фрагменты
          </h2>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={16}>
          <p className="text-center text-brand/50 text-xs uppercase tracking-[0.18em] mb-12">
            Нажмите на кадр, чтобы открыть и листать
          </p>
        </BlurFade>
      </div>

      {/* плывущая лента с лёгким расфокусом */}
      <div className="frag-wrap space-y-4 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <Row ids={rowA} />
        <Row ids={rowB} reverse />
      </div>

      {mounted && index !== null && createPortal(
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-brand-dark/50 backdrop-blur-sm animate-modal-backdrop"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
        >
          <div
            className="relative bg-sand-soft w-full max-w-xl max-h-[90vh] p-3 md:p-4 border border-brand/20 shadow-2xl animate-modal-in flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Закрыть"
              className="absolute top-3 right-3 z-20 w-11 h-11 flex items-center justify-center text-brand/70 hover:text-brand bg-sand-soft hover:bg-brand/5 border border-brand/15 rounded-full transition-colors text-2xl"
            >
              ×
            </button>

            <div className="relative flex-1 min-h-0 flex items-center justify-center">
              <img
                key={index}
                src={photos[index].src}
                alt={photos[index].alt}
                className="max-h-[74vh] w-auto max-w-full object-contain rounded-sm select-none"
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 px-1">
              <button
                onClick={prev}
                aria-label="Предыдущее фото"
                className="w-10 h-10 flex items-center justify-center text-brand/70 hover:text-brand bg-sand hover:bg-brand/5 border border-brand/15 rounded-full transition-colors shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <div className="text-center min-w-0">
                <p className="text-sm text-brand-dark/80 truncate">{photos[index].alt}</p>
                <p className="text-[11px] text-brand/50 tracking-widest mt-0.5">{index + 1} / {photos.length}</p>
              </div>
              <button
                onClick={next}
                aria-label="Следующее фото"
                className="w-10 h-10 flex items-center justify-center text-brand/70 hover:text-brand bg-sand hover:bg-brand/5 border border-brand/15 rounded-full transition-colors shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
