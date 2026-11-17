/**
 * Обложки статей блога. Ключ — slug статьи, значение — путь к фото в /public.
 * Важно: сюда идут только чистые кадры. Файлы /gallery/01..06 это слайды
 * из соцсетей с напечатанным текстом — под заголовок их класть нельзя,
 * надписи наложатся друг на друга. Чистые вырезки лежат в /gallery/clean/.
 */
export const BLOG_COVERS: Record<string, string> = {
  // кожа головы и волосы
  "zhirnaya-kozha-golovy": "/gallery/2026-11/massazh-golovy.webp",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/2026-11/vstrecha.webp",
  "piling-kozhi-golovy": "/gallery/2026-11/kamennaya-maska.webp",
  "vypadenie-volos-i-massazh-golovy": "/gallery/2026-11/massazh-litsa-2.webp",
  "massazh-golovy-i-volosy": "/gallery/2026-11/duga.webp",

  // сон, стресс, состояние
  "kak-bystro-usnut": "/gallery/2026-11/chaynaya-zona.webp",
  "kak-snizit-kortizol": "/gallery/2026-11/vybor-masla.webp",
  "head-spa-i-son": "/gallery/2026-11/grebni.webp",
  "massazh-golovy-i-stress": "/gallery/2026-11/massazh-litsa.webp",
  "vygoranie": "/gallery/2026-11/chay.webp",
  "chto-snimaet-stress": "/gallery/2026-11/chay-yabloki.webp",
  "kak-rasslabitsya": "/gallery/2026-11/sauna.jpg",

  // тело и форматы
  "rasslablyayushchiy-massazh": "/gallery/2026-11/skrab-telo.webp",
  "sheya-posle-raboty": "/gallery/2026-11/skrab-telo.webp",
  "poyushchie-chashi": "/gallery/2026-11/poyushchaya-chasha.webp",
  "chto-takoe-head-spa": "/gallery/2026-11/interer.webp",
};

/** Фото-врезка в середине длинной статьи. Запасной вариант, если для slug не задано. */
export const BLOG_INLINE: Record<string, string> = {
  "zhirnaya-kozha-golovy": "/gallery/2026-11/vstrecha.webp",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/2026-11/kamennaya-maska.webp",
  "piling-kozhi-golovy": "/gallery/2026-11/duga.webp",
  "vypadenie-volos-i-massazh-golovy": "/gallery/2026-11/grebni.webp",
  "kak-bystro-usnut": "/gallery/2026-11/vybor-masla.webp",
  "kak-snizit-kortizol": "/gallery/2026-11/massazh-litsa-2.webp",
  "vygoranie": "/gallery/2026-11/chaynaya-zona.webp",
  "chto-snimaet-stress": "/gallery/2026-11/sauna.jpg",
  "kak-rasslabitsya": "/gallery/2026-11/chay.webp",
  "rasslablyayushchiy-massazh": "/gallery/2026-11/skrab-telo.webp",
  "sheya-posle-raboty": "/gallery/2026-11/skrab-telo.webp",
  "poyushchie-chashi": "/gallery/2026-11/massazh-golovy.webp",
};

export function coverFor(slug: string): string {
  return BLOG_COVERS[slug] || "/gallery/2026-11/sauna.webp";
}

export function inlineFor(slug: string): string | null {
  return BLOG_INLINE[slug] || null;
}
