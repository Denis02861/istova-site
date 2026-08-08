import BlurFade from "./magicui/BlurFade";

export default function Founder() {
  return (
    <section id="founder" className="relative py-24 md:py-36 overflow-hidden bg-brand-dark">
      {/* Тёплое свечение вместо фото — акцентный блок в ритме страницы, не дублирует снимки */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(211,188,163,0.20),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(163,114,96,0.18),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
        <BlurFade delay={0.05} yOffset={14}>
          <div className="text-xs uppercase tracking-[0.2em] text-sand/55 mb-8">От основателя</div>
        </BlurFade>
        <BlurFade delay={0.15} yOffset={18}>
          <blockquote className="font-display italic text-2xl md:text-4xl text-sand leading-snug">
            Мне важно, чтобы отсюда уходили по-настоящему отдохнувшими. Ради этого всё и затевалось.
          </blockquote>
        </BlurFade>
        <BlurFade delay={0.3} yOffset={12}>
          <div className="mt-10 text-sm uppercase tracking-[0.2em] text-sand/50">Денис · основатель</div>
        </BlurFade>
      </div>
    </section>
  );
}
