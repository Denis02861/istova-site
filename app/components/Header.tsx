export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sand/80 backdrop-blur-sm border-b border-brand/10">
      <div className="flex justify-between items-center py-2 pr-6 pl-2 md:pl-4">
        <a href="#hero" className="flex items-center" aria-label="Истова — главная">
          <img src="/brand/decor/cloud.png" alt="Истова" className="h-14 md:h-16 w-auto" />
        </a>
        <nav className="hidden md:flex gap-8 text-sm text-brand/80">
          <a href="#concept" className="hover:text-brand">О нас</a>
          <a href="#ritual" className="hover:text-brand">Ритуал</a>
          <a href="#programs" className="hover:text-brand">Программы</a>
          <a href="#tea" className="hover:text-brand">Чай</a>
          <a href="#contacts" className="hover:text-brand">Контакты</a>
        </nav>
        <a href="#booking" className="hidden md:inline-block px-4 py-2 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors text-sm">Записаться</a>
      </div>
      <div className="bg-brand/5 border-t border-brand/10">
        <div className="container mx-auto px-6 py-1.5 text-center text-xs text-brand/70 tracking-wide">
          Сайт в процессе разработки — возможны изменения
        </div>
      </div>
    </header>
  );
}
