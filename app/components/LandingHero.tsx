import TrackedLink from "./TrackedLink";
import BlurFade from "./magicui/BlurFade";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  photo: string;
  photoAlt: string;
  ctaFrom: string;
  priceHint?: string;
};

/** Крупный первый экран посадочной: фото на всю ширину, текст поверх затемнения. */
export default function LandingHero({ eyebrow, title, lead, photo, photoAlt, ctaFrom, priceHint }: Props) {
  return (
    <section className="relative min-h-[78vh] md:min-h-[86vh] flex items-end overflow-hidden">
      <img
        src={photo}
        alt={photoAlt}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* затемнение снизу вверх, чтобы текст читался на любом кадре */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/45 to-brand-dark/10" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 pb-16 md:pb-24 pt-32">
        <BlurFade delay={0.05} yOffset={14}>
          <div className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-sand/70 mb-5">
            {eyebrow}
          </div>
        </BlurFade>

        <BlurFade delay={0.18} yOffset={18}>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-sand mb-6 leading-[1.05] max-w-3xl">
            {title}
          </h1>
        </BlurFade>

        <BlurFade delay={0.32} yOffset={14}>
          <p className="text-base md:text-lg text-sand/85 leading-relaxed max-w-xl mb-9">
            {lead}
          </p>
        </BlurFade>

        <BlurFade delay={0.46} yOffset={12}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <TrackedLink
              goal="BOOKING_CLICK"
              goalParams={{ from: ctaFrom }}
              href="/#booking"
              className="inline-flex items-center justify-center px-9 py-3.5 bg-sand text-brand rounded-full font-medium shadow-[0_12px_40px_-10px_rgba(0,0,0,0.45)] hover:bg-white active:scale-[0.98] transition-[transform,background-color,box-shadow] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              Записаться
            </TrackedLink>
            {priceHint && (
              <span className="text-sm text-sand/70">{priceHint}</span>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
