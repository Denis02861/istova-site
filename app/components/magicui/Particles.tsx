"use client";

import { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  colorLight?: string;
  minSize?: number;
  maxSize?: number;
}

// Плавающие «пылинки» — премиум спа-атмосфера. Работают на canvas + rAF.
export default function Particles({
  className = "",
  quantity = 90,
  color = "#7a5b3c",
  colorLight = "#e6d4b3",
  minSize = 1.2,
  maxSize = 3.6,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      x: number; y: number; vx: number; vy: number;
      r: number; a: number; targetA: number;
      light: boolean; wobble: number; wobbleV: number;
    };
    let particles: P[] = [];
    let W = 0, H = 0;

    const parseColor = (hex: string) => {
      const h = hex.replace("#", "");
      return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
      ] as [number, number, number];
    };
    const [R, G, B] = parseColor(color);
    const [RL, GL, BL] = parseColor(colorLight);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const init = () => {
      particles = Array.from({ length: quantity }, () => {
        const r = rand(minSize, maxSize);
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: rand(-0.18, 0.18),
          vy: rand(-0.22, -0.02), // всплывает вверх
          r,
          a: 0,
          targetA: rand(0.25, 0.75),
          light: Math.random() < 0.35,
          wobble: Math.random() * Math.PI * 2,
          wobbleV: rand(0.005, 0.02),
        };
      });
    };

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // сброс + масштаб
      if (particles.length === 0 || particles[0].x > W || particles[0].y > H) init();
    };

    resize();
    init();

    const step = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.wobble += p.wobbleV;
        p.x += p.vx + Math.sin(p.wobble) * 0.15;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        p.a += (p.targetA - p.a) / 60;

        // glow
        const cr = p.light ? RL : R;
        const cg = p.light ? GL : G;
        const cb = p.light ? BL : B;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${p.a})`);
        grad.addColorStop(0.4, `rgba(${cr},${cg},${cb},${p.a * 0.35})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${p.a * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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
  }, [quantity, color, colorLight, minSize, maxSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={"pointer-events-none absolute inset-0 w-full h-full " + className}
    />
  );
}
