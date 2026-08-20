import type { Metadata } from "next";
import RedirectClient from "./RedirectClient";

// Страница-прослойка для внешних площадок (Яндекс Карты, 2ГИС, соцсети).
// Отправляет цель DIKIDI_CLICK в Метрику с пометкой источника и уводит в DIKIDI с UTM.
// В поиске не нужна — закрыта от индексации.
export const metadata: Metadata = {
  title: "Онлайн-запись — Истова",
  robots: { index: false, follow: false },
};

export default function GoZapisPage() {
  return <RedirectClient />;
}
