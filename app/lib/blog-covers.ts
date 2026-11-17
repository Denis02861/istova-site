/**
 * Обложки статей блога. Ключ — slug статьи, значение — путь к фото в /public.
 * Важно: сюда идут только чистые кадры без текста, иначе надписи наложатся на заголовок.
 * С 17.11.2026 все обложки со съёмки 16.11 (/gallery/2026-11/), у каждой статьи своя,
 * врезка внутри статьи отличается от обложки.
 */
export const BLOG_COVERS: Record<string, string> = {
  // кожа головы и волосы
  "zhirnaya-kozha-golovy": "/gallery/2026-11/pennyy-massazh-2.webp",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/2026-11/grebni.webp",
  "piling-kozhi-golovy": "/gallery/2026-11/kamennaya-maska.webp",
  "vypadenie-volos-i-massazh-golovy": "/gallery/2026-11/massazh-golovy.webp",
  "massazh-golovy-i-volosy": "/gallery/2026-11/duga.webp",

  // сон, стресс, состояние
  "kak-bystro-usnut": "/gallery/2026-11/chaynaya-zona-h.webp",
  "kak-snizit-kortizol": "/gallery/2026-11/sauna.webp",
  "head-spa-i-son": "/gallery/2026-11/duga-greben.webp",
  "massazh-golovy-i-stress": "/gallery/2026-11/massazh-litsa-2.webp",
  "vygoranie": "/gallery/2026-11/travyanoy-meshochek-h.webp",
  "chto-snimaet-stress": "/gallery/2026-11/meshochki-ruki-h.webp",
  "kak-rasslabitsya": "/gallery/2026-11/kamni-h.webp",

  // тело и форматы
  "rasslablyayushchiy-massazh": "/gallery/2026-11/skrab-telo.webp",
  "sheya-posle-raboty": "/gallery/2026-11/massazh-litsa.webp",
  "poyushchie-chashi": "/gallery/2026-11/poyushchaya-chasha.webp",
  "chto-takoe-head-spa": "/gallery/2026-11/mytie-golovy.webp",
};

/** Фото-врезка в середине длинной статьи. Запасной вариант, если для slug не задано. */
export const BLOG_INLINE: Record<string, string> = {
  "zhirnaya-kozha-golovy": "/gallery/2026-11/mytie-golovy.webp",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/2026-11/kamennaya-maska.webp",
  "piling-kozhi-golovy": "/gallery/2026-11/duga.webp",
  "vypadenie-volos-i-massazh-golovy": "/gallery/2026-11/grebni.webp",
  "kak-bystro-usnut": "/gallery/2026-11/kamennaya-maska.webp",
  "kak-snizit-kortizol": "/gallery/2026-11/chaynaya-zona-h.webp",
  "vygoranie": "/gallery/2026-11/sauna.webp",
  "chto-snimaet-stress": "/gallery/2026-11/poyushchaya-chasha.webp",
  "kak-rasslabitsya": "/gallery/2026-11/chaynaya-zona-h.webp",
  "rasslablyayushchiy-massazh": "/gallery/2026-11/kamni-h.webp",
  "sheya-posle-raboty": "/gallery/2026-11/massazh-golovy.webp",
  "poyushchie-chashi": "/gallery/2026-11/massazh-golovy.webp",
};

export function coverFor(slug: string): string {
  return BLOG_COVERS[slug] || "/gallery/2026-11/sauna.webp";
}

export function inlineFor(slug: string): string | null {
  return BLOG_INLINE[slug] || null;
}
