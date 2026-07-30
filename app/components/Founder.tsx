export default function Founder() {
  return (
    <section id="founder" className="py-24 bg-sand-soft">
      <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
        <div className="text-xs uppercase tracking-widest text-brand/60 mb-6">От основателя</div>
        <blockquote className="relative">
          <span
            aria-hidden="true"
            className="font-display absolute -top-8 -left-2 md:-left-8 text-8xl md:text-9xl text-brand/10 leading-none select-none"
          >
            «
          </span>
          <p className="font-display italic text-2xl md:text-3xl text-brand leading-snug relative z-10">
            Мне важно, чтобы отсюда уходили по-настоящему отдохнувшими. Ради этого всё и затевалось.
          </p>
        </blockquote>
        <div className="mt-10 text-sm uppercase tracking-widest text-brand-dark/60">
          Денис · основатель
        </div>
      </div>
    </section>
  );
}
