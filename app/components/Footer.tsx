export default function Footer() {
  return (
    <footer className="bg-brand-dark text-sand/80 py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-serif text-2xl text-sand mb-2 tracking-wider">ИСТОВА</div>
            <p className="text-sm italic text-sand/60">Пространство истинного ухода</p>
          </div>
          <div>
            <h4 className="text-sand mb-3 text-sm tracking-wide uppercase">Как с вами связаться</h4>
            <p className="text-sm">@istova</p>
          </div>
          <div>
            <h4 className="text-sand mb-3 text-sm tracking-wide uppercase">Документы</h4>
            <p className="text-sm mb-1">
              <a href="/politika-obrabotki-personalnyh-dannyh/" className="hover:text-sand">Политика конфиденциальности</a>
            </p>
          </div>
        </div>
        <div className="border-t border-sand/10 pt-6 text-center text-xs text-sand/40">© Истова 2026</div>
      </div>
    </footer>
  );
}
