"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { track } from "../lib/track";

type Action = { label: string; href: string; goal: string; ext?: boolean; primary?: boolean; icon: React.ReactNode };

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const bookingHref = pathname === "/" || pathname === "" ? "#booking" : "/#booking";

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      const doc = document.documentElement;
      const nearBottom = scrolled + vh >= doc.scrollHeight - 200;
      setShow(scrolled > vh * 0.6 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const actions: Action[] = [
    { label: "Записаться", href: bookingHref, goal: "BOOKING_CLICK", primary: true,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v3M16 3v3M9 14l2 2 4-4"/></svg>) },
    { label: "Telegram", href: "https://t.me/Istova_spa", goal: "TG_CLICK", ext: true,
      icon: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M21.9 4.3 18.6 19.8c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L4.4 13.3l-4.8-1.5c-1-.3-1-1 .2-1.5L20.6 2c.9-.3 1.6.2 1.3 2.3z"/></svg>) },
    { label: "Instagram", href: "https://www.instagram.com/istova.spa", goal: "IG_CLICK", ext: true,
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>) },
    { label: "Позвонить", href: "tel:+79013201050", goal: "PHONE_CLICK",
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><path d="M4 5c0-1 .8-2 2-2h1.5c.5 0 .9.3 1 .8l.8 3c.1.4 0 .8-.3 1L8 8.5c1 2 2.5 3.5 4.5 4.5l.7-1c.3-.3.7-.4 1-.3l3 .8c.5.1.8.5.8 1V15c0 1.2-1 2-2 2C9.5 17 4 11.5 4 5z"/></svg>) },
  ];

  return (
    <div
      className={`hidden md:block fixed z-40 bottom-8 right-8 transition-opacity duration-500 ease-out ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex flex-col items-end gap-2.5 mb-3">
        {actions.map((a, i) => (
          <a
            key={a.label}
            href={a.href}
            target={a.ext ? "_blank" : undefined}
            rel={a.ext ? "noopener noreferrer" : undefined}
            onClick={() => track(a.goal, { from: "floating_widget" })}
            style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
            className={`group flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-full shadow-lg text-sm tracking-wide transition-all duration-300 ease-out ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"} ${a.primary ? "bg-brand text-sand hover:bg-brand-dark" : "bg-sand text-brand-dark hover:bg-white border border-brand/15"}`}
          >
            <span className="whitespace-nowrap">{a.label}</span>
            <span className={`flex items-center justify-center w-7 h-7 rounded-full ${a.primary ? "bg-sand/20" : "bg-brand/10"}`}>{a.icon}</span>
          </a>
        ))}
      </div>
      <button
        aria-label="Связаться с нами"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex items-center justify-center w-14 h-14 rounded-full bg-brand text-sand shadow-xl hover:bg-brand-dark transition-colors duration-300"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`w-6 h-6 transition-transform duration-300 ${open ? "rotate-90 scale-90" : ""}`}>
          {open ? (<path d="M6 6l12 12M18 6L6 18"/>) : (<path d="M21 11.5a8.4 8.4 0 0 1-11.8 7.7L3 21l1.9-6a8.4 8.4 0 1 1 16.1-3.5z"/>)}
        </svg>
      </button>
    </div>
  );
}
