/**
 * Рейтинг Истовы с Яндекс.Карт (org 63939829435). ЕДИНЫЙ ИСТОЧНИК на весь сайт.
 *
 * Цифра раньше жила отдельно в layout.tsx и в Reviews.tsx, из-за чего их можно было
 * развести. Развести нельзя: Яндекс.Вебмастер сверяет число отзывов в public/offers.yml
 * с микроразметкой на странице, а размеченный рейтинг обязан совпадать с тем, что
 * видит гость в блоке отзывов. Иначе фид помечают ошибкой, а разметку могут снять.
 *
 * Обновляется скриптом scripts/sync-feed-reviews.py --apply: он тянет свежие цифры
 * с карточки и правит этот файл вместе с фидом. Руками менять не нужно.
 *
 * Сверено 26.09.2026: 58 оценок, все пятёрки.
 */
export const RATING = {
  value: "5",
  count: 58,
  best: "5",
  worst: "1",
} as const;

/** Готовый блок для schema.org. Вставляется в Organization, Service и Product. */
export const AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: RATING.value,
  reviewCount: RATING.count,
  bestRating: RATING.best,
  worstRating: RATING.worst,
} as const;
