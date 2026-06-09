export default function Space() {
  return (
    <section id="space" className="py-24 bg-sand">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="font-serif text-4xl md:text-5xl text-brand mb-6 text-center">Два мира под одной крышей</h2>
        <p className="text-center text-lg text-brand-dark/80 max-w-2xl mx-auto mb-16 leading-relaxed">256 квадратных метров на Васильевском острове, в шаге от Невы. Спа-зона с приватными кабинетами, общей зоной тишины, чайной комнатой. Парикмахерский зал с отдельным входом и атмосферой ритуала ухода.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-[4/5] bg-sand-deep flex items-center justify-center text-brand/30 font-serif text-2xl">
              фото {i}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-brand/40 mt-6 italic">Плейсхолдеры — заменим после фотосессии пространства</p>
      </div>
    </section>
  );
}
