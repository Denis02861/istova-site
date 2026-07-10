"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export default function CardTilt({
  children,
  className = "",
  maxTilt = 14,
  scale = 1.04,
  perspective = 900,
}: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const sMouseX = useSpring(mouseX, springConfig);
  const sMouseY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(sMouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sMouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: `${perspective}px` }}
      className={className}
    >
      <motion.div
        whileHover={{ scale }}
        transition={{ type: "spring", ...springConfig }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
