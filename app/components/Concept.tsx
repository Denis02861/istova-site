export default function Concept() {
  return (
    <section id="concept" className="py-24 bg-sand-soft relative overflow-hidden">
      <img
        src="/brand/decor/bird.webp"
        alt=""
        aria-hidden="true"
        className="absolute top-12 right-8 w-32 md:w-44 opacity-20 pointer-events-none"
       loading="lazy" decoding="async" />
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <h2 className="font-display text-4xl md:text-5xl text-brand mb-12 text-center uppercase tracking-wider">Истова — это про подлинное</h2>
        <div className="space-y-6 text-lg leading-relaxed text-brand-dark/90">
          <p>Истова — пространство ухода в Петербурге, где забота возвращается к себе истинной: без масок, без спешки, без обещаний которые невозможно сдержать.</p>
          <p>Здесь работают по программам, проверенным временем. Натуральные масла, ритмика тёплого и прохладного, тишина внутри, в которой можно услышать собственное дыхание.</p>
          <p>Мы строим место, в которое хочется возвращаться — не за процедурой, а за состоянием.</p>
        </div>
      </div>
    </section>
  );
}
