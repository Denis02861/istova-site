"use client";

import { useEffect } from "react";
import { captureTouch } from "../lib/leadSource";

// Запоминает, откуда гость пришёл на сайт. Ничего не рисует.
export default function LeadSourceCapture() {
  useEffect(() => {
    captureTouch();
  }, []);
  return null;
}
