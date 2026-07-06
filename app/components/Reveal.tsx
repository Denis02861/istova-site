"use client";

import * as React from "react";
import { useEffect, useRef, useState, ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "fade";

type Props = {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  stagger?: number;  // если задан — каждый direct-child появляется с delay = index * stagger мс
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

const hidden: Record<Variant, string> = {
  up:    "opacity-0 translate-y-16",
  left:  "opacity-0 -translate-x-24",
  right: "opacity-0 translate-x-24",
  scale: "opacity-0 scale-[0.95]",
  fade:  "opacity-0",
};

const shown: Record<Variant, string> = {
  up:    "opacity-100 translate-y-0",
  left:  "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  scale: "opacity-100 scale-100",
  fade:  "opacity-100",
};

export default function Reveal({ children, variant = "up", delay = 0, stagger, className, as }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let done = false;
    let raf = 0;

    const check = () => {
      raf = 0;
      if (done) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Триггер: когда верхняя граница блока опустилась ниже 88% высоты viewport
      // (значит блок виден на ~12% от низа экрана)
      if (rect.top < vh * 0.88 && rect.bottom > 0) {
        done = true;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (delay > 0) setTimeout(() => setVisible(true), delay);
        else setVisible(true);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };

    // первый вызов — если блок уже виден при монтировании
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [delay]);

  const baseCls = "transition-all ease-out will-change-transform";
  const baseStyle = { transitionDuration: "800ms", transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" };

  if (stagger) {
    const Tag = (as || "div") as keyof React.JSX.IntrinsicElements;
    return React.createElement(
      Tag,
      {
        ref,
        "data-stagger-visible": visible ? "true" : "false",
        style: { ["--stagger-step" as string]: `${stagger}ms` } as React.CSSProperties,
        className: `stagger-children ${className || ""}`,
      },
      children
    );
  }

  return (
    <div
      ref={ref}
      className={`${baseCls} ${visible ? shown[variant] : hidden[variant]}`}
      style={baseStyle}
    >
      {children}
    </div>
  );
}
