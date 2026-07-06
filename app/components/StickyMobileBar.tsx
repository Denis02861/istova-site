"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "../lib/track";
import TrackedLink from "./TrackedLink";

export default function StickyMobileBar() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const bookingHref = pathname === "/" || pathname === "" ? "#booking" : "/#booking";

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      const doc = document.documentElement;
      const nearBottom = scrolled + vh >= doc.scrollHeight - 300;
      setShow(scrolled > vh * 0.5 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-mobile-sticky-bar
      className={`md:hidden fixed left-0 right-0 bottom-0 z-40 bg-sand/95 backdrop-blur-md border-t border-brand/15 shadow-[0_-2px_20px_rgba(116,68,54,0.08)] transition-all duration-500 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 divide-x divide-brand/10">
        <TrackedLink
          goal="PHONE_CLICK"
          goalParams={{ from: "sticky_bar" }}
          href="tel:+79013201050"
          className="py-3 text-center text-xs uppercase tracking-widest text-brand-dark/80 active:bg-brand/5"
          aria-label="Позвонить"
        >
          Позвонить
        </TrackedLink>
        <TrackedLink
          goal="TG_CLICK"
          goalParams={{ from: "sticky_bar" }}
          href="https://t.me/Istova_spa"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 text-center text-xs uppercase tracking-widest text-brand-dark/80 active:bg-brand/5"
          aria-label="Написать в Telegram"
        >
          Telegram
        </TrackedLink>
        <a
          href={bookingHref}
          onClick={() => track("BOOKING_CLICK", { from: "sticky_bar" })}
          className="py-3 text-center text-xs uppercase tracking-widest text-sand bg-brand active:bg-brand-dark"
          aria-label="Забронировать"
        >
          Записаться
        </a>
      </div>
    </div>
  );
}
