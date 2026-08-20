"use client";

import { useEffect, useState } from "react";

const DIKIDI_URL = "https://dikidi.ru/2107431";
const YM_ID = 109992381;

// Источники, которые умеем размечать. Ключ приходит в ?from=
const SOURCES: Record<string, { utm_source: string; utm_medium: string; label: string }> = {
  yandex_maps: { utm_source: "yandex_maps", utm_medium: "card_button", label: "Яндекс Карты" },
  "2gis": { utm_source: "2gis", utm_medium: "card_button", label: "2ГИС" },
  instagram: { utm_source: "instagram", utm_medium: "bio", label: "Instagram" },
  telegram: { utm_source: "telegram", utm_medium: "post", label: "Telegram" },
  vk: { utm_source: "vk", utm_medium: "post", label: "ВКонтакте" },
  qr: { utm_source: "offline", utm_medium: "qr", label: "QR-код" },
};

const FALLBACK = { utm_source: "direct", utm_medium: "link", label: "прямой переход" };

export default function RedirectClient() {
  const [target, setTarget] = useState<string>(DIKIDI_URL);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = (params.get("from") || "").toLowerCase();
    const src = SOURCES[from] ?? FALLBACK;

    const url = new URL(DIKIDI_URL);
    url.searchParams.set("utm_source", src.utm_source);
    url.searchParams.set("utm_medium", src.utm_medium);
    url.searchParams.set("utm_campaign", "istova_booking");
    if (from) url.searchParams.set("utm_content", from);

    const finalUrl = url.toString();
    setTarget(finalUrl);

    // цель в Метрике с пометкой источника
    try {
      window.ym?.(YM_ID, "reachGoal", "DIKIDI_CLICK", { source: src.utm_source, from: from || "direct" });
    } catch {
      // no-op
    }

    // даём счётчику успеть отправить событие, затем уводим в DIKIDI
    const t = setTimeout(() => {
      window.location.replace(finalUrl);
    }, 400);

    return () => clearTimeout(t);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        textAlign: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#F4EFE8",
        color: "#2a2320",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600 }}>Открываем онлайн-запись…</div>
      <div style={{ fontSize: 14, opacity: 0.7 }}>
        Если ничего не произошло —{" "}
        <a href={target} style={{ color: "#7A4A3A", textDecoration: "underline" }}>
          нажмите здесь
        </a>
      </div>
    </main>
  );
}
