const team = [
  { name: "Имя Фамилия", role: "Основатель и идеолог", desc: "1 строка о пути." },
  { name: "Имя Фамилия", role: "Главный спа-мастер", desc: "1 строка о специализации." },
  { name: "Имя Фамилия", role: "Парикмахер", desc: "1 строка о подходе." },
  { name: "Имя Фамилия", role: "Парикмахер-колорист", desc: "1 строка о специализации." },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-sand-soft">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="font-serif text-4xl md:text-5xl text-brand mb-4 text-center">Команда</h2>
        <p className="text-center text-brand-dark/70 mb-16 max-w-xl mx-auto">Каждый мастер — со своим путём. Объединяет одно: уважение к ритуалу.</p>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((m, i) => (
            <div key={i} className="text-center">
              <div className="aspect-square bg-sand-deep mb-4 flex items-center justify-center text-brand/30 font-serif text-xl">фото</div>
              <h3 className="font-serif text-lg text-brand mb-1">{m.name}</h3>
              <p className="text-xs text-brand/60 mb-2 tracking-wide uppercase">{m.role}</p>
              <p className="text-sm text-brand-dark/70 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
