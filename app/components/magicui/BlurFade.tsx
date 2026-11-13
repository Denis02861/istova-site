"use client";

import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  once?: boolean;
  /**
   * Первый экран: то же проявление, но чистым CSS, без ожидания JS.
   * Через motion блок приходит в HTML с opacity:0 и становится виден только
   * после загрузки скриптов: 13.11.2026 на телефоне это давало первый экран
   * за 7-8 с, а робот без JS видел пустой заголовок.
   */
  instant?: boolean;
}

export default function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  blur = "8px",
  once = true,
  instant = false,
}: BlurFadeProps) {
  if (instant) {
    const style = {
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      "--bf-y": `${yOffset}px`,
      "--bf-blur": blur,
    } as CSSProperties;
    return (
      <div className={`blur-fade-instant${className ? ` ${className}` : ""}`} style={style}>
        {children}
      </div>
    );
  }
  return <BlurFadeMotion {...{ children, className, delay, duration, yOffset, blur, once }} />;
}

function BlurFadeMotion({
  children,
  className,
  delay,
  duration,
  yOffset,
  blur,
  once,
}: Required<Omit<BlurFadeProps, "className" | "instant">> & { className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset, filter: `blur(${blur})` },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay, duration, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
