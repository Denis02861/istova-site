"use client";

import { useEffect } from "react";

type ProvideContextInput = {
  tools: Array<{
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    execute: (input: Record<string, unknown>) => Promise<unknown>;
  }>;
};

declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (ctx: ProvideContextInput) => void;
    };
  }
}

const PROGRAM_SLUGS = [
  "zarya-telo",
  "zarya-volosy",
  "sumerki-telo",
  "sumerki-volosy",
  "rodnik",
  "kedr",
  "lada",
  "yav",
  "kedr-lada",
];

export default function WebMCPProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!navigator.modelContext || typeof navigator.modelContext.provideContext !== "function") return;

    type IdleRequest = (cb: () => void) => number;
    const idle: IdleRequest =
      (window as Window & { requestIdleCallback?: IdleRequest }).requestIdleCallback ??
      ((cb) => window.setTimeout(cb, 1));

    const id = idle(() => {
      if (!navigator.modelContext) return;
      navigator.modelContext.provideContext({
      tools: [
        {
          name: "view_programs",
          description: "List all spa programs (4 paired base rituals + 5 author programs) with names, durations, and prices. Navigates to the programs section.",
          inputSchema: { type: "object", properties: {} },
          execute: async () => {
            window.location.hash = "#programs";
            return { ok: true, action: "navigated", target: "#programs" };
          },
        },
        {
          name: "view_program",
          description: "Open a detailed page of a specific spa program.",
          inputSchema: {
            type: "object",
            properties: {
              slug: {
                type: "string",
                enum: PROGRAM_SLUGS,
                description: "Program slug",
              },
            },
            required: ["slug"],
          },
          execute: async (input) => {
            const slug = String((input as { slug: string }).slug);
            if (!PROGRAM_SLUGS.includes(slug)) {
              return { ok: false, error: `unknown slug. allowed: ${PROGRAM_SLUGS.join(", ")}` };
            }
            window.location.href = `/programs/${slug}/`;
            return { ok: true, action: "navigated", target: `/programs/${slug}/` };
          },
        },
        {
          name: "book_appointment",
          description: "Open the booking form to schedule a spa appointment. Optionally pre-select a program by slug.",
          inputSchema: {
            type: "object",
            properties: {
              slug: {
                type: "string",
                enum: PROGRAM_SLUGS,
                description: "Optional program slug to pre-select",
              },
            },
          },
          execute: async (input) => {
            const slug = (input as { slug?: string })?.slug;
            if (slug && PROGRAM_SLUGS.includes(slug)) {
              window.location.href = `/programs/${slug}/#booking`;
            } else {
              window.location.hash = "#booking";
            }
            return { ok: true, action: "opened-booking", program: slug ?? null };
          },
        },
        {
          name: "view_contacts",
          description: "Show salon contacts (address in St. Petersburg, Telegram). Navigates to the contacts section.",
          inputSchema: { type: "object", properties: {} },
          execute: async () => {
            window.location.hash = "#contacts";
            return {
              ok: true,
              address: "St. Petersburg, Beringa St. 23 bld. 2 (Vasilyevsky Island)",
              telegram: "@Istova_spa",
            };
          },
        },
      ],
    });
    });

    return () => {
      const cancel = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (cancel) cancel(id);
      else window.clearTimeout(id);
    };
  }, []);

  return null;
}
