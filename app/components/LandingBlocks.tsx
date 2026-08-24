import Link from "next/link";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import type { Program } from "../lib/programs-data";

/** Смысловой блок: текст слева, фото справа (или наоборот). */
export function SplitBlock({
  title,
  paragraphs,
  photo,
  photoAlt,
  flip = false,
}: {
  title: string;
  paragraphs: string[];
  photo: string;
  photoAlt: string;
  flip?: boolean;
}) {
  return (
    <section className="py-16 md:py-24">
      <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
        <Reveal variant={flip ? "right" : "left"}>
          <h2 className="font-display text-3xl md:text-4xl text-brand mb-6 leading-snug">{title}</h2>
          <div className="space-y-4 text-base text-brand-dark/85 leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal variant="scale" delay={120}>
          <div className="relative overflow-hidden rounded-[28px] shadow-[0_30px_80px_-40px_rgba(90,51,40,0.55)]">
            <Parallax speed={0.12}>
              <img
                src={photo}
                alt={photoAlt}
                loading="lazy"
                decoding="async"
                className="w-full h-[320px] md:h-[440px] object-cover scale-110"
              />
            </Parallax>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Широкая фото-полоса между секциями, чтобы страница дышала. */
export function PhotoStrip({ photo, alt, caption }: { photo: string; alt: string; caption?: string }) {
  return (
    <section className="my-6 md:my-10">
      <Reveal variant="fade">
        <div className="relative overflow-hidden rounded-[28px] h-[240px] md:h-[380px]">
          <Parallax speed={0.16}>
            <img src={photo} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover scale-110" />
          </Parallax>
          {caption && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 font-display italic text-lg md:text-2xl text-sand leading-snug">
                {caption}
              </p>
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/** Карточки программ с фото и ценой. */
export function ProgramCards({
  title,
  programs,
  photos,
  showPairPrice = false,
}: {
  title: string;
  programs: Program[];
  photos: Record<string, string>;
  showPairPrice?: boolean;
}) {
  return (
    <section className="py-16 md:py-20">
      <Reveal variant="up">
        <h2 className="font-display text-3xl md:text-4xl text-brand mb-10 leading-snug">{title}</h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-6">
        {programs.map((p, i) => (
          <Reveal key={p.slug} variant="up" delay={i * 90}>
            <Link
              href={`/programs/${p.slug}/`}
              className="group block h-full overflow-hidden rounded-[24px] bg-sand-soft border border-brand/10 hover:border-brand/30 hover:-translate-y-1 hover:shadow-[0_28px_70px_-35px_rgba(90,51,40,0.5)] transition-all duration-500"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={photos[p.slug] || "/gallery/02-spa-zone.jpg"}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/55 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="font-display text-2xl text-sand tracking-wide">{p.name}</div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-brand-dark/75 leading-relaxed mb-5 min-h-[3.5rem]">{p.teaser}</p>
                <div className="flex justify-between items-end pt-4 border-t border-brand/10">
                  <span className="text-xs uppercase tracking-widest text-brand/70 group-hover:text-brand transition-colors">
                    Открыть
                  </span>
                  <span className="text-right">
                    <span className="font-display text-xl text-brand block leading-none">
                      {showPairPrice && p.pair_price ? p.pair_price : p.price}
                    </span>
                    <span className="text-[11px] text-brand-dark/55">
                      {showPairPrice && p.pair_price ? "за двоих · " : ""}~ {p.dur}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Три-четыре коротких тезиса в ряд. */
export function FeatureRow({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section className="py-14 md:py-16">
      <div className={`grid gap-8 ${items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
        {items.map((it, i) => (
          <Reveal key={i} variant="up" delay={i * 100}>
            <div className="h-full">
              <div className="w-10 h-[2px] bg-brand/40 mb-5" />
              <h3 className="font-display text-xl text-brand mb-3 leading-snug">{it.title}</h3>
              <p className="text-sm text-brand-dark/75 leading-relaxed">{it.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** FAQ в аккуратных карточках. */
export function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="py-16 border-t border-brand/10">
      <Reveal variant="fade">
        <h2 className="text-xs uppercase tracking-[0.2em] text-brand/55 mb-9 font-normal">Частые вопросы</h2>
      </Reveal>
      <div className="space-y-4">
        {items.map((f, i) => (
          <Reveal key={i} variant="up" delay={i * 70}>
            <div className="rounded-2xl bg-sand-soft border border-brand/10 px-6 py-5">
              <h3 className="font-display text-lg text-brand mb-2 leading-snug">{f.q}</h3>
              <p className="text-sm text-brand-dark/80 leading-relaxed">{f.a}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
