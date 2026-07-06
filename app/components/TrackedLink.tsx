"use client";

import { AnchorHTMLAttributes, ReactNode, useRef } from "react";
import { track } from "../lib/track";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  goal: string;
  goalParams?: Record<string, unknown>;
  children: ReactNode;
};

export default function TrackedLink({ goal, goalParams, onClick, onPointerDown, children, ...rest }: Props) {
  const firedRef = useRef(false);

  const fire = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    track(goal, goalParams);
    setTimeout(() => {
      firedRef.current = false;
    }, 500);
  };

  return (
    <a
      {...rest}
      onPointerDown={(e) => {
        fire();
        onPointerDown?.(e);
      }}
      onClick={(e) => {
        fire();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
