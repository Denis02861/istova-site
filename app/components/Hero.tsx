export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-sand relative pt-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="font-serif text-6xl md:text-8xl text-brand mb-4 tracking-wider">ИСТОВА</h1>
        <p className="font-serif italic text-xl md:text-2xl text-brand/80 mb-12 max-w-xl mx-auto leading-relaxed">
          Пространство истинного ухода<br/>в Петербурге
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
