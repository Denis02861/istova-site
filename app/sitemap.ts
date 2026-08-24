import type { MetadataRoute } from "next";
import { articles } from "./lib/blog-data";
import { programs } from "./lib/programs-data";

const SITE_URL = "https://istova.ru";

// Статические страницы вне каталогов программ и блога.
// При добавлении новой посадочной страницы дописать сюда одну строку.
const STATIC_PAGES: { path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/programs/", priority: 0.95, changefreq: "monthly" },
  { path: "/spa-dlya-dvoih/", priority: 0.9, changefreq: "monthly" },
  { path: "/massazh-golovy/", priority: 0.9, changefreq: "monthly" },
  { path: "/antistress/", priority: 0.9, changefreq: "monthly" },
  { path: "/rasslablyayushchiy-massazh/", priority: 0.9, changefreq: "monthly" },
  { path: "/blog/", priority: 0.7, changefreq: "weekly" },
  { path: "/politika-obrabotki-personalnyh-dannyh/", priority: 0.3, changefreq: "yearly" },
  { path: "/oferta/", priority: 0.3, changefreq: "yearly" },
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().slice(0, 10);

  const statics = STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: today,
    changeFrequency: p.changefreq,
    priority: p.priority,
  }));

  const programPages = programs.map((p) => ({
    url: `${SITE_URL}/programs/${p.slug}/`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const articlePages = articles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}/`,
    lastModified: a.updated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...statics, ...programPages, ...articlePages];
}
