"use client";
import Link from "next/link";
import BlurFade from "./magicui/BlurFade";

export default function PhilosophyTeaser() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <BlurFade delay={0.05} yOffset={16}>
          <div className="text-[10px] uppercase tracking-[0.2em] text-brand/60 mb-6">
            Философия ИСТОВА
          </div>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={18}>
          <p className="font-display italic text-2xl md:text-4xl text-brand mb-6 leading-snug">
            «Истово» — искренне, глубоко, всем сердцем, с полной отдачей.
          </p>
        </BlurFade>
        <BlurFade delay={0.3} yOffset={16}>
          <p className="text-ink-700 text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
            Это не просто название нашего салона. Это принцип каждого действия — от того, как встречаем гостя, до того, какая температура у полотенца.
          </p>
        </BlurFade>
        <BlurFade delay={0.45} yOffset={14}>
          <Link
            href="/philosophy"
            className="inline-flex items-center gap-2 text-brand hover:text-brand-dark border-b border-brand/40 hover:border-brand-dark pb-1 text-base md:text-lg transition"
          >
            Читать полностью
            <span aria-hidden>→</span>
          </Link>
        </BlurFade>
      </div>
    </section>
  );
}
