"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import BlurFade from "./magicui/BlurFade";

// Видео в ленте грузится и запускается только когда плитка попала в кадр.
// Раньше все семь клипов стартовали при загрузке страницы, включая те,
// что за краем экрана: около 1,8 МБ трафика и лишняя работа процессора.
function LazyVideo({ src, poster, className }: { src: string; poster: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Без поддержки IntersectionObserver просто грузим как раньше
    if (typeof IntersectionObserver === "undefined") {
      el.src = src;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src) el.src = src;
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return <video ref={ref} poster={poster} muted loop playsInline preload="none" className={className} />;
}

type Item = {
  type: "image" | "video";
  src: string;      // полноразмер: фото или полное mp4 (для модалки)
  preview?: string; // лёгкий 6-сек клип для ленты (только video)
  poster: string;   // превью-картинка
  alt: string;
  link?: string;    // ссылка на пост в Instagram
};

// Первая линия — студийные фото Истовы (все в одну ленту)
// Съёмка 16.11.2026 (фотобанк IST-261116-*): один свет и одна подача по всей ленте.
// Из сентябрьских оставлены мужчина и сертификат: таких сцен в новой съёмке нет.
// Карточки вертикальные 3:4, поэтому горизонтальные кадры лежат здесь вертикальными версиями (*-v).
const studioPhotos: Item[] = [
  { type: "image", src: "/gallery/2026-11/duga-greben-v.webp", poster: "/gallery/2026-11/duga-greben-v.webp", alt: "Золотая дуга: водный ритуал для кожи головы" },
  { type: "image", src: "/gallery/2026-11/mytie-golovy-v.webp", poster: "/gallery/2026-11/mytie-golovy-v.webp", alt: "Тёплая вода у Золотой дуги" },
  { type: "image", src: "/gallery/2026-11/kamennaya-maska-v.webp", poster: "/gallery/2026-11/kamennaya-maska-v.webp", alt: "Каменная маска для глаз и массаж гребнями" },
  { type: "image", src: "/gallery/2026-11/pennyy-massazh.webp", poster: "/gallery/2026-11/pennyy-massazh.webp", alt: "Пенный массаж кожи головы" },
  { type: "image", src: "/gallery/2026-11/vstrecha.webp", poster: "/gallery/2026-11/vstrecha.webp", alt: "Встреча гостя у стойки Истовы" },
  { type: "image", src: "/gallery/2026-11/kriosfery.webp", poster: "/gallery/2026-11/kriosfery.webp", alt: "Массаж лица криосферами" },
  { type: "image", src: "/gallery/2026-11/sauna-v.webp", poster: "/gallery/2026-11/sauna-v.webp", alt: "Финская сауна" },
  { type: "image", src: "/gallery/2026-11/guasha.webp", poster: "/gallery/2026-11/guasha.webp", alt: "Массаж лица гуаша" },
  { type: "image", src: "/gallery/2026-09/g-muzhchina.webp", poster: "/gallery/2026-09/g-muzhchina.webp", alt: "Мужской ритуал для головы, в зеркале виден второй кабинет" },
  { type: "image", src: "/gallery/2026-11/massazh-golovy-v.webp", poster: "/gallery/2026-11/massazh-golovy-v.webp", alt: "Массаж кожи головы руками" },
  { type: "image", src: "/gallery/2026-11/kamni.webp", poster: "/gallery/2026-11/kamni.webp", alt: "Ритуал с тёплыми камнями" },
  { type: "image", src: "/gallery/2026-11/chaynaya-zona.webp", poster: "/gallery/2026-11/chaynaya-zona.webp", alt: "Чайная зона после ритуала" },
  { type: "image", src: "/gallery/2026-11/skrab-telo-v.webp", poster: "/gallery/2026-11/skrab-telo-v.webp", alt: "Обновление кожи тела скрабом" },
  { type: "image", src: "/gallery/2026-11/travyanoy-meshochek.webp", poster: "/gallery/2026-11/travyanoy-meshochek.webp", alt: "Тёплые травяные мешочки" },
  { type: "image", src: "/gallery/2026-09/g-konvert.webp", poster: "/gallery/2026-09/g-konvert.webp", alt: "Подарочный сертификат и витрина с уходом" },
  { type: "image", src: "/gallery/2026-11/sushka-volos.webp", poster: "/gallery/2026-11/sushka-volos.webp", alt: "Сушка волос после ритуала" },
  { type: "image", src: "/gallery/2026-11/poyushchaya-chasha-v.webp", poster: "/gallery/2026-11/poyushchaya-chasha-v.webp", alt: "Звучание поющей чаши" },
  { type: "image", src: "/gallery/2026-11/chay.webp", poster: "/gallery/2026-11/chay.webp", alt: "Чай после ритуала" },
];

export default function Gallery() {
  // модалка: активный список + индекс внутри него
  const [list, setList] = useState<Item[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [feed, setFeed] = useState<Item[]>([]);
  const open = index !== null;

  useEffect(() => setMounted(true), []);

  // Вторая линия — живой контент из Instagram @istova.spa (public/gallery/feed.json)
  useEffect(() => {
    fetch("/gallery/feed.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Item[]) => Array.isArray(data) && setFeed(data))
      .catch(() => setFeed([]));
  }, []);

  const openModal = useCallback((items: Item[], i: number) => {
    setList(items);
    setIndex(i);
  }, []);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i + list.length - 1) % list.length)), [list.length]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % list.length)), [list.length]);

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

  const Tile = ({ item, onClick, live }: { item: Item; onClick: () => void; live?: boolean }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={item.type === "video" ? `Открыть видео: ${item.alt}` : `Открыть фото: ${item.alt}`}
      className={`group relative shrink-0 w-40 sm:w-48 aspect-[3/4] soft-edge cursor-pointer transition-opacity duration-700 ${live ? "opacity-85" : "opacity-70"} hover:opacity-100`}
      style={{ backgroundImage: `url(${item.poster})` }}
    >
      <div className="soft-sharp absolute inset-0">
      {item.type === "video" ? (
        <LazyVideo
          src={item.preview || item.src}
          poster={item.poster}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${live ? "" : "blur-[2.5px] scale-105 group-hover:blur-0 group-hover:scale-100"}`}
        />
      ) : (
        <img
          src={item.poster}
          alt={item.alt}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${live ? "" : "blur-[2.5px] scale-105 group-hover:blur-0 group-hover:scale-100"}`}
          loading="lazy"
        />
      )}
      </div>
      {item.type === "video" && (
        <span className="absolute bottom-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-brand-dark/45 backdrop-blur-sm text-sand pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        </span>
      )}
    </button>
  );

  const Row = ({ items, reverse, live }: { items: Item[]; reverse?: boolean; live?: boolean }) => (
    <div className={`flex gap-4 w-max ${reverse ? "frag-track-rev" : "frag-track"}`}>
      {[...items, ...items].map((it, k) => (
        <Tile key={`${it.src}-${k}`} item={it} live={live} onClick={() => openModal(items, k % items.length)} />
      ))}
    </div>
  );

  const active = open ? list[index as number] : null;

  return (
    <section id="gallery" className="py-20 md:py-28 bg-sand fade-top-soft relative overflow-hidden">
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

      {/* плывущие ленты: первая — студия, вторая — живой контент из Instagram */}
      <div className="frag-wrap space-y-4 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <Row items={studioPhotos} />
        {feed.length > 0 && <Row items={feed} reverse live />}
      </div>

      {mounted && active && createPortal(
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-brand-dark/50 backdrop-blur-sm animate-modal-backdrop"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр"
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
              {active.type === "video" ? (
                <video
                  key={active.src}
                  src={active.src}
                  poster={active.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[74vh] w-auto max-w-full object-contain rounded-sm bg-black"
                />
              ) : (
                <img
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  className="max-h-[74vh] w-auto max-w-full object-contain rounded-sm select-none"
                />
              )}
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 px-1">
              <button
                onClick={prev}
                aria-label="Предыдущее"
                className="w-10 h-10 flex items-center justify-center text-brand/70 hover:text-brand bg-sand hover:bg-brand/5 border border-brand/15 rounded-full transition-colors shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <div className="text-center min-w-0">
                <p className="text-sm text-brand-dark/80 truncate">{active.alt}</p>
                {active.link ? (
                  <a href={active.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-brand/60 hover:text-brand tracking-widest mt-0.5 inline-block underline underline-offset-2">
                    Открыть в Instagram
                  </a>
                ) : (
                  <p className="text-[11px] text-brand/50 tracking-widest mt-0.5">{(index as number) + 1} / {list.length}</p>
                )}
              </div>
              <button
                onClick={next}
                aria-label="Следующее"
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
