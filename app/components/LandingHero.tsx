import TrackedLink from "./TrackedLink";
import BlurFade from "./magicui/BlurFade";
import Aurora from "./magicui/Aurora";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  ctaFrom: string;
  priceHint?: string;
};

/**
 * Первый экран посадочной: светлый фон с плавающими пятнами Aurora, как на главной.
 * Фото сюда не ставим — исходники 720 px шириной мылят на весь экран.
 */
export default function LandingHero({ eyebrow, title, lead, ctaFrom, priceHint }: Props) {
  return (
    <section className="relative min-h-[68vh] md:min-h-[78vh] flex items-center overflow-hidden bg-sand pt-24 pb-16">
      <Aurora />

      <div className="container mx-auto px-6 max-w-3xl relative z-10 text-center">
        <BlurFade delay={0.05} yOffset={14}>
          <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-brand/55 mb-6">
            {eyebrow}
          </div>
        </BlurFade>

        <BlurFade delay={0.18} yOffset={18}>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-brand mb-7 leading-[1.05]">
            {title}
          </h1>
        </BlurFade>

        <BlurFade delay={0.32} yOffset={14}>
          <p className="text-base md:text-lg text-brand-dark/80 leading-relaxed max-w-xl mx-auto mb-10">
            {lead}
          </p>
        </BlurFade>

        <BlurFade delay={0.46} yOffset={12}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedLink
              goal="BOOKING_CLICK"
              goalParams={{ from: ctaFrom }}
              href="/#booking"
              className="inline-flex items-center justify-center px-9 py-3.5 bg-brand text-sand rounded-full font-medium shadow-[0_12px_40px_-10px_rgba(116,68,54,0.55)] hover:bg-brand-dark hover:shadow-[0_18px_55px_-10px_rgba(116,68,54,0.7)] active:scale-[0.98] transition-[transform,background-color,box-shadow] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              Записаться
            </TrackedLink>
            {priceHint && (
              <span className="text-sm text-brand/60">{priceHint}</span>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
