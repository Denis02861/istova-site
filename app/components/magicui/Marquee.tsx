import { ReactNode } from "react";

export default function Marquee({
  children,
  duration = 90,
  className = "",
  gap = "gap-16",
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  gap?: string;
}) {
  return (
    <div className={"relative overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] " + className}>
      <div className={"flex " + gap + " animate-marquee whitespace-nowrap"} style={{ animationDuration: duration + "s" }}>
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
