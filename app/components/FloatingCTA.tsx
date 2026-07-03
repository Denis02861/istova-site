"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "../lib/track";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const bookingHref = pathname === "/" || pathname === "" ? "#booking" : "/#booking";

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      const doc = document.documentElement;
      const nearBottom = scrolled + vh >= doc.scrollHeight - 200;
      setShow(scrolled > vh * 0.8 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const el = anchorRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0;
    const apply = () => { raf = 0; el.style.setProperty("--mx", `${tx.toFixed(2)}px`); el.style.setProperty("--my", `${ty.toFixed(2)}px`); };
    const onMove = (ev: globalThis.MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = (ev.clientX - (r.left + r.width / 2)) * 0.35;
      ty = (ev.clientY - (r.top + r.height / 2)) * 0.35;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const reset = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply); };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", reset); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <a
      ref={anchorRef}
      href={bookingHref}
      onClick={() => track("BOOKING_CLICK", { from: "floating_cta" })}
      aria-label="Забронировать"
      style={{ transform: "translate3d(var(--mx, 0), var(--my, 0), 0)" }}
      className={`hidden md:inline-block fixed z-40 md:bottom-8 md:right-8 px-5 py-3 md:px-6 md:py-3.5 bg-brand text-sand text-sm md:text-base uppercase tracking-widest shadow-lg hover:bg-brand-dark transition-opacity duration-500 ease-out ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      Забронировать
    </a>
  );
}
