/**
 * Обложки статей блога. Ключ — slug статьи, значение — путь к фото в /public.
 * Важно: сюда идут только чистые кадры. Файлы /gallery/01..06 это слайды
 * из соцсетей с напечатанным текстом — под заголовок их класть нельзя,
 * надписи наложатся друг на друга. Чистые вырезки лежат в /gallery/clean/.
 */
export const BLOG_COVERS: Record<string, string> = {
  // кожа головы и волосы
  "zhirnaya-kozha-golovy": "/gallery/head-spa/aurora.jpg",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/frag-care.jpg",
  "piling-kozhi-golovy": "/gallery/head-spa/jade.jpg",
  "vypadenie-volos-i-massazh-golovy": "/gallery/clean/massazh-golovy.jpg",
  "massazh-golovy-i-volosy": "/gallery/frag-headspa.jpg",

  // сон, стресс, состояние
  "kak-bystro-usnut": "/gallery/frag-lounge.jpg",
  "kak-snizit-kortizol": "/gallery/frag-aroma.jpg",
  "head-spa-i-son": "/gallery/head-spa/wooden.jpg",
  "massazh-golovy-i-stress": "/gallery/frag-massage.jpg",
  "vygoranie": "/gallery/frag-tea.jpg",
  "chto-snimaet-stress": "/gallery/frag-apples.jpg",
  "kak-rasslabitsya": "/gallery/clean/sauna.jpg",

  // тело и форматы
  "rasslablyayushchiy-massazh": "/gallery/frag-body.jpg",
  "sheya-posle-raboty": "/gallery/clean/skrab.jpg",
  "poyushchie-chashi": "/gallery/clean/chasha.jpg",
  "chto-takoe-head-spa": "/gallery/frag-water.jpg",
};

/** Фото-врезка в середине длинной статьи. Запасной вариант, если для slug не задано. */
export const BLOG_INLINE: Record<string, string> = {
  "zhirnaya-kozha-golovy": "/gallery/frag-care.jpg",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/head-spa/jade.jpg",
  "piling-kozhi-golovy": "/gallery/frag-headspa.jpg",
  "vypadenie-volos-i-massazh-golovy": "/gallery/head-spa/wooden.jpg",
  "kak-bystro-usnut": "/gallery/frag-aroma.jpg",
  "kak-snizit-kortizol": "/gallery/clean/massazh-golovy.jpg",
  "vygoranie": "/gallery/frag-lounge.jpg",
  "chto-snimaet-stress": "/gallery/clean/sauna.jpg",
  "kak-rasslabitsya": "/gallery/frag-tea.jpg",
  "rasslablyayushchiy-massazh": "/gallery/clean/skrab.jpg",
  "sheya-posle-raboty": "/gallery/frag-body.jpg",
  "poyushchie-chashi": "/gallery/head-spa/aurora.jpg",
};

export function coverFor(slug: string): string {
  return BLOG_COVERS[slug] || "/gallery/frag-sauna.jpg";
}

export function inlineFor(slug: string): string | null {
  return BLOG_INLINE[slug] || null;
}
