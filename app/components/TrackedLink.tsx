"use client";

import { AnchorHTMLAttributes, ReactNode } from "react";
import { track } from "../lib/track";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  goal: string;
  goalParams?: Record<string, unknown>;
  children: ReactNode;
};

export default function TrackedLink({ goal, goalParams, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(goal, goalParams);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
