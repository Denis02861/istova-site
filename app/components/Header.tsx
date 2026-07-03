"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "../lib/track";

const NAV = [
  { href: "#concept", label: "О нас" },
  { href: "#ritual", label: "Ритуал" },
  { href: "#programs", label: "Программы" },
  { href: "#tea", label: "Чай" },
  { href: "#contacts", label: "Контакты" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === "";
  const link = (h: string) => (onHome ? h : `/${h}`);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled ? "bg-sand/95 backdrop-blur-md shadow-[0_2px_20px_rgba(116,68,54,0.08)] border-b border-brand/15" : "bg-sand/80 backdrop-blur-sm border-b border-brand/10"}`}>
      <div className="flex justify-between items-center py-2 pr-4 pl-2 md:pl-4 md:pr-6">
        <a href={link("#hero")} onClick={() => setOpen(false)} className="flex items-center" aria-label="Истова — главная">
          <img src="/brand/decor/cloud.webp" alt="Истова" className={`w-auto transition-all duration-500 ease-out ${scrolled ? "h-11 md:h-12" : "h-14 md:h-16"}`} width={512} height={512} />
        </a>

        <nav className="hidden md:flex gap-8 text-sm text-brand/80">
          {NAV.map((n) => (
            <a key={n.href} href={link(n.href)} className="hover:text-brand transition-colors">{n.label}</a>
          ))}
        </nav>

        <a
          href={link("#booking")}
          onClick={() => track("BOOKING_CLICK", { from: "header_desktop" })}
          className="hidden md:inline-block px-4 py-2 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors text-sm"
        >
          Записаться
        </a>

        {/* Бургер — только мобила */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 -mr-1 relative"
        >
          <span className={`absolute h-0.5 w-6 bg-brand transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-2"}`} />
          <span className={`absolute h-0.5 w-6 bg-brand transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute h-0.5 w-6 bg-brand transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-2"}`} />
        </button>
      </div>

      <div className={`bg-brand/5 border-t border-brand/10 overflow-hidden transition-all duration-500 ease-out ${scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"}`}>
        <div className="container mx-auto px-6 py-1.5 text-center text-xs text-brand/70 tracking-wide">
          Сайт в процессе разработки — возможны изменения
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`md:hidden fixed inset-x-0 top-full bg-sand/95 backdrop-blur-md border-b border-brand/10 transition-all duration-300 ease-out overflow-hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={link(n.href)}
              onClick={() => setOpen(false)}
              className="py-3 text-lg text-brand border-b border-brand/10"
            >
              {n.label}
            </a>
          ))}
          <a
            href={link("#booking")}
            onClick={() => {
              setOpen(false);
              track("BOOKING_CLICK", { from: "header_mobile" });
            }}
            className="mt-4 py-3 text-center bg-brand text-sand text-base uppercase tracking-wider"
          >
            Записаться
          </a>
        </nav>
      </div>
    </header>
  );
}
