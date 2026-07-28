"use client";

import { ReactElement } from "react";
import TrackedLink from "./TrackedLink";

const WA_TEXT = encodeURIComponent("Здравствуйте! Пишу с сайта Истова");

type Tone = "brand" | "sand";

const ICONS: Record<string, ReactElement> = {
  telegram: (
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
  ),
  whatsapp: (
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.2 4.74 1.2 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm5.8 14.01c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.26.14.44.21.5.32.06.11.06.64-.18 1.32z" />
  ),
  instagram: (
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-10.85a1.44 1.44 0 10 1.44 1.44 1.44 1.44 0 00-1.44-1.44z" />
  ),
  vk: (
    <path d="M12.79 15.84h.96s.29-.03.44-.19c.14-.15.13-.42.13-.42s-.02-1.28.57-1.47c.58-.18 1.33 1.23 2.12 1.77.6.41 1.05.32 1.05.32l2.11-.03s1.1-.07.58-.94c-.04-.07-.3-.65-1.57-1.83-1.33-1.23-1.15-1.03.45-3.17.97-1.3 1.36-2.09 1.24-2.43-.12-.32-.84-.24-.84-.24l-2.38.01s-.18-.02-.31.06c-.13.08-.21.26-.21.26s-.38 1.01-.89 1.87c-1.07 1.82-1.5 1.91-1.68 1.8-.4-.26-.3-1.05-.3-1.61 0-1.75.27-2.48-.52-2.67-.26-.06-.45-.11-1.12-.11-.86 0-1.59 0-2 .2-.27.13-.49.43-.36.44.15.02.51.09.7.35.24.34.23 1.1.23 1.1s.14 2.05-.33 2.3c-.32.18-.76-.18-1.72-1.83-.49-.85-.86-1.78-.86-1.78s-.07-.17-.2-.27c-.15-.11-.37-.15-.37-.15l-2.26.01s-.34.01-.46.16c-.11.13-.01.41-.01.41s1.77 4.14 3.78 6.23c1.83 1.91 3.92 1.79 3.92 1.79z" />
  ),
};

const SOCIALS = [
  { key: "telegram", goal: "TG_CLICK", label: "Telegram", href: "https://t.me/Istova_spa" },
  { key: "whatsapp", goal: "WA_CLICK", label: "WhatsApp", href: `https://wa.me/79013201050?text=${WA_TEXT}` },
  { key: "instagram", goal: "IG_CLICK", label: "Instagram", href: "https://www.instagram.com/istova.spa" },
  { key: "vk", goal: "VK_CLICK", label: "ВКонтакте", href: "https://vk.ru/istova_spa" },
];

export default function ContactLinks({
  from = "site",
  tone = "brand",
  showBooking = true,
  className = "",
}: {
  from?: string;
  tone?: Tone;
  showBooking?: boolean;
  className?: string;
}) {
  const color = tone === "sand" ? "text-sand" : "text-brand";
  const ring = tone === "sand" ? "border-sand/25 hover:border-sand hover:bg-sand/10" : "border-brand/25 hover:border-brand hover:bg-brand/10";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <TrackedLink
          key={s.key}
          goal={s.goal}
          goalParams={{ from }}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full border transition-colors ${color} ${ring}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {ICONS[s.key]}
          </svg>
        </TrackedLink>
      ))}
      {showBooking && (
        <TrackedLink
          goal="DIKIDI_CLICK"
          goalParams={{ from }}
          href="https://dikidi.ru/2107431"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 h-11 px-5 rounded-full transition-colors ${
            tone === "sand" ? "bg-sand text-brand hover:bg-white" : "bg-brand text-sand hover:bg-brand-dark"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-sm font-medium whitespace-nowrap">Записаться онлайн</span>
        </TrackedLink>
      )}
    </div>
  );
}
