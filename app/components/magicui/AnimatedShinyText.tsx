import { CSSProperties, ReactNode } from "react";

export default function AnimatedShinyText({
  children,
  className = "",
  shimmerWidth = 100,
}: {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}) {
  return (
    <span
      style={{ "--shimmer-width": `${shimmerWidth}px` } as CSSProperties}
      className={
        "mx-auto inline-block max-w-md text-brand/70 " +
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite] " +
        "[--bg:linear-gradient(90deg,rgba(0,0,0,0)_40%,rgba(70,50,30,0.85)_50%,rgba(0,0,0,0)_60%)] [background-image:var(--bg)] " +
        className
      }
    >
      {children}
    </span>
  );
}
