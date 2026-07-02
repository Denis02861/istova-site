"use client";

import { useEffect, useRef, ReactNode, MouseEvent } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.35,
  onClick,
  target,
  rel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = 0, ty = 0;

    const onMove = (ev: globalThis.MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ev.clientX - cx;
      const dy = ev.clientY - cy;
      tx = dx * strength;
      ty = dy * strength;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const reset = () => {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const apply = () => {
      raf = 0;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </a>
  );
}
