"use client";

import { useEffect } from "react";
import { track } from "../lib/track";

export default function ProgramTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track("PROGRAM_OPEN", { slug });
  }, [slug]);
  return null;
}
