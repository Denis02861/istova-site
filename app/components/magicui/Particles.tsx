"use client";

import { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
  size?: number;
}

// Простые плавающие частицы — «пыльца». Тихие, редкие, brand-цветом.
export default function Particles({
  className = "",
  quantity = 45,
  staticity = 60,
  ease = 60,
  color = "#7a5b3c",
  size = 1.4,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; targetA: number };
    const particles: P[] = Array.from({ length: quantity }, () => {
      const r = size * (0.5 + Math.random() * 1.4);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15 - 0.05, // лёгкое поднятие вверх, как пыльца в тёплом воздухе
        r,
        a: 0,
        targetA: 0.15 + Math.random() * 0.55,
      };
    });

    // rgb parse
    const hex = color.replace("#", "");
    const R = parseInt(hex.slice(0, 2), 16);
    const G = parseInt(hex.slice(2, 4), 16);
    const B = parseInt(hex.slice(4, 6), 16);

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // wrap
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;
        p.a += (p.targetA - p.a) / ease;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${R},${G},${B},${p.a})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(step);
    };
    step();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [quantity, ease, color, size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={"pointer-events-none absolute inset-0 " + className}
    />
  );
}
