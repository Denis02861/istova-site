export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-sand relative pt-20 overflow-hidden">
      <img
        src="/brand/decor/spiral.webp"
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute bottom-24 right-8 w-32 md:w-48 opacity-20 pointer-events-none"
       width={512} height={512} />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="sr-only">Истова</h1>
        <img
          src="/logo/istova-wordmark.webp"
          alt="ИСТŌВА"
          className="h-20 md:h-28 w-auto mx-auto mb-6 animate-breath"
         width={728} height={218} />
        <p className="font-display italic text-2xl md:text-4xl text-brand mb-6 max-w-2xl mx-auto leading-snug">
          Не нужен особый день,<br/>чтобы почувствовать себя особенной
        </p>
        <p className="text-xs md:text-sm tracking-widest uppercase text-brand/60 mb-12">
          Пространство истинного ухода · Петербург
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#booking" className="px-8 py-3 bg-brand text-sand hover:bg-brand-dark transition-colors">Записаться</a>
          <a href="#concept" className="px-8 py-3 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors">О пространстве</a>
        </div>
        <p className="text-sm text-brand/60 tracking-wide">ул. Беринга, 23 к. 2 · Васильевский остров</p>
      </div>
    </section>
  );
}
