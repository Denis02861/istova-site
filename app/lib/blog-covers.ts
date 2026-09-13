/**
 * Обложки статей блога. Ключ — slug статьи, значение — путь к фото в /public.
 * Важно: сюда идут только чистые кадры. Файлы /gallery/01..06 это слайды
 * из соцсетей с напечатанным текстом — под заголовок их класть нельзя,
 * надписи наложатся друг на друга. Чистые вырезки лежат в /gallery/clean/.
 */
export const BLOG_COVERS: Record<string, string> = {
  // кожа головы и волосы
  "zhirnaya-kozha-golovy": "/gallery/head-spa/aurora.webp",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/frag-care.webp",
  "piling-kozhi-golovy": "/gallery/head-spa/jade.webp",
  "vypadenie-volos-i-massazh-golovy": "/gallery/clean/massazh-golovy.webp",
  "massazh-golovy-i-volosy": "/gallery/frag-headspa.webp",

  // сон, стресс, состояние
  "kak-bystro-usnut": "/gallery/frag-lounge.webp",
  "kak-snizit-kortizol": "/gallery/frag-aroma.webp",
  "head-spa-i-son": "/gallery/head-spa/wooden.webp",
  "massazh-golovy-i-stress": "/gallery/frag-massage.webp",
  "vygoranie": "/gallery/frag-tea.webp",
  "chto-snimaet-stress": "/gallery/frag-apples.webp",
  "kak-rasslabitsya": "/gallery/clean/sauna.jpg",

  // тело и форматы
  "rasslablyayushchiy-massazh": "/gallery/frag-body.webp",
  "sheya-posle-raboty": "/gallery/clean/skrab.webp",
  "poyushchie-chashi": "/gallery/clean/chasha.webp",
  "chto-takoe-head-spa": "/gallery/frag-water.webp",
};

/** Фото-врезка в середине длинной статьи. Запасной вариант, если для slug не задано. */
export const BLOG_INLINE: Record<string, string> = {
  "zhirnaya-kozha-golovy": "/gallery/frag-care.webp",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/head-spa/jade.webp",
  "piling-kozhi-golovy": "/gallery/frag-headspa.webp",
  "vypadenie-volos-i-massazh-golovy": "/gallery/head-spa/wooden.webp",
  "kak-bystro-usnut": "/gallery/frag-aroma.webp",
  "kak-snizit-kortizol": "/gallery/clean/massazh-golovy.webp",
  "vygoranie": "/gallery/frag-lounge.webp",
  "chto-snimaet-stress": "/gallery/clean/sauna.jpg",
  "kak-rasslabitsya": "/gallery/frag-tea.webp",
  "rasslablyayushchiy-massazh": "/gallery/clean/skrab.webp",
  "sheya-posle-raboty": "/gallery/frag-body.webp",
  "poyushchie-chashi": "/gallery/head-spa/aurora.webp",
};

export function coverFor(slug: string): string {
  return BLOG_COVERS[slug] || "/gallery/frag-sauna.webp";
}

export function inlineFor(slug: string): string | null {
  return BLOG_INLINE[slug] || null;
}
