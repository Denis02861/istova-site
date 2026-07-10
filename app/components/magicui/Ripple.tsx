import React, { CSSProperties } from "react";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

export default function Ripple({
  mainCircleSize = 260,
  mainCircleOpacity = 0.5,
  numCircles = 9,
  className = "",
}: RippleProps) {
  return (
    <div className={"pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(closest-side,black_60%,transparent_100%)] " + className}>
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 90;
        const opacity = mainCircleOpacity - i * 0.045;
        const animationDelay = i * 0.09 + "s";
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        return (
          <div
            key={i}
            className="absolute animate-ripple rounded-full border-2"
            style={{
              width: size + "px",
              height: size + "px",
              opacity: Math.max(opacity, 0.05),
              animationDelay: animationDelay,
              borderStyle,
              borderColor: "#7a5b3c",
              backgroundColor: i < 2 ? "rgba(122,91,60,0.06)" : "transparent",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
            } as CSSProperties}
          />
        );
      })}
    </div>
  );
}
