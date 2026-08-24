/** Обложки статей блога. Ключ — slug статьи, значение — путь к фото в /public. */
export const BLOG_COVERS: Record<string, string> = {
  // кожа головы и волосы
  "zhirnaya-kozha-golovy": "/gallery/head-spa/aurora.jpg",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/frag-care.jpg",
  "piling-kozhi-golovy": "/gallery/head-spa/jade.jpg",
  "vypadenie-volos-i-massazh-golovy": "/gallery/04-head-spa.jpg",
  "massazh-golovy-i-volosy": "/gallery/frag-headspa.jpg",

  // сон, стресс, состояние
  "kak-bystro-usnut": "/gallery/frag-lounge.jpg",
  "kak-snizit-kortizol": "/gallery/frag-aroma.jpg",
  "head-spa-i-son": "/gallery/01-nastroyka.jpg",
  "massazh-golovy-i-stress": "/gallery/head-spa/wooden.jpg",
  "vygoranie": "/gallery/frag-tea.jpg",
  "chto-snimaet-stress": "/gallery/frag-apples.jpg",
  "kak-rasslabitsya": "/gallery/02-spa-zone.jpg",

  // тело и форматы
  "rasslablyayushchiy-massazh": "/gallery/05-massage.jpg",
  "sheya-posle-raboty": "/gallery/frag-massage.jpg",
  "poyushchie-chashi": "/gallery/frag-water.jpg",
  "chto-takoe-head-spa": "/gallery/frag-sauna.jpg",
};

/** Фото-врезка в середине длинной статьи. Запасной вариант, если для slug не задано. */
export const BLOG_INLINE: Record<string, string> = {
  "zhirnaya-kozha-golovy": "/gallery/frag-care.jpg",
  "zud-i-shelushenie-kozhi-golovy": "/gallery/head-spa/jade.jpg",
  "piling-kozhi-golovy": "/gallery/frag-headspa.jpg",
  "vypadenie-volos-i-massazh-golovy": "/gallery/head-spa/wooden.jpg",
  "kak-bystro-usnut": "/gallery/frag-aroma.jpg",
  "kak-snizit-kortizol": "/gallery/05-massage.jpg",
  "vygoranie": "/gallery/frag-lounge.jpg",
  "chto-snimaet-stress": "/gallery/06-body.jpg",
  "kak-rasslabitsya": "/gallery/frag-tea.jpg",
  "rasslablyayushchiy-massazh": "/gallery/frag-body.jpg",
  "sheya-posle-raboty": "/gallery/06-body.jpg",
  "poyushchie-chashi": "/gallery/01-nastroyka.jpg",
};

export function coverFor(slug: string): string {
  return BLOG_COVERS[slug] || "/gallery/02-spa-zone.jpg";
}

export function inlineFor(slug: string): string | null {
  return BLOG_INLINE[slug] || null;
}
