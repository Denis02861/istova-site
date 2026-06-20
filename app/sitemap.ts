import type { MetadataRoute } from "next";

const BASE = "https://istova.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/politika-obrabotki-personalnyh-dannyh/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
