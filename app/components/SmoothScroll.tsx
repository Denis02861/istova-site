"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1,
      wheelMultiplier: 1,
      lerp: 0.09,
      // на touch-устройствах smooth-scroll не работает — оставляем нативное поведение
      // (Lenis без syncTouch не перехватывает touch-события)
    });

    (window as any).__lenis = lenis;
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Якорные ссылки ведём через Lenis — надёжно доводит до цели,
    // даже если высота страницы меняется от ленивой подгрузки картинок.
    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const i = href.indexOf("#");
      if (i < 0) return;
      const hash = href.slice(i);
      if (hash.length < 2) return;
      const path = href.slice(0, i);
      if (path && path !== window.location.pathname) return; // ссылка на другую страницу
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -84, duration: 1.2 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return null;
}
