import { articles } from "../lib/blog-data";

/**
 * RSS-фид блога.
 *
 * Зачем: GEO-аудит 21.09.2026 показал отсутствие RSS при живых 16 статьях.
 * Фид нужен не людям, а машинам: агрегаторы и краулеры ИИ используют его
 * как дешёвый канал обнаружения новых материалов, без обхода всего сайта.
 */

export const dynamic = "force-static";

const SITE_URL = "https://istova.ru";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const sorted = [...articles].sort((a, b) => (a.updated < b.updated ? 1 : -1));
  const lastBuild = new Date(sorted[0]?.updated ?? Date.now()).toUTCString();

  const items = sorted
    .map((a) => {
      const url = `${SITE_URL}/blog/${a.slug}/`;
      return `    <item>
      <title>${esc(a.h1)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description>${esc(a.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Истова — блог о спа для головы</title>
    <link>${SITE_URL}/blog/</link>
    <description>Как устроены head spa, массаж головы и уход за кожей головы. Материалы спа-пространства Истова в Санкт-Петербурге.</description>
    <language>ru</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
