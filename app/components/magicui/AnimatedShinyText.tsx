import { CSSProperties, ReactNode } from "react";

export default function AnimatedShinyText({
  children,
  className = "",
  shimmerWidth = 120,
}: {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}) {
  return (
    <span
      style={{ "--shimmer-width": `${shimmerWidth}px` } as CSSProperties}
      className={
        "inline-block bg-clip-text text-transparent bg-no-repeat " +
        "[background-position:0_0] [background-size:var(--shimmer-width)_100%] " +
        "[background-image:linear-gradient(110deg,#7a5b3c_0%,#7a5b3c_40%,#e6d4b3_45%,#f5e9d3_50%,#e6d4b3_55%,#7a5b3c_60%,#7a5b3c_100%)] " +
        "animate-shiny-text " +
        className
      }
    >
      {children}
    </span>
  );
}
