"use client";

import { useEffect, useState } from "react";
import { track } from "../lib/track";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

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

  return (
    <a
      href="#booking"
      onClick={() => track("BOOKING_CLICK", { from: "floating_cta" })}
      aria-label="Забронировать"
      className={`hidden md:inline-block fixed z-40 md:bottom-8 md:right-8 px-5 py-3 md:px-6 md:py-3.5 bg-brand text-sand text-sm md:text-base uppercase tracking-widest shadow-lg hover:bg-brand-dark transition-all duration-500 ease-out ${
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      Забронировать
    </a>
  );
}
