export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sand/80 backdrop-blur-sm border-b border-brand/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="font-serif text-2xl text-brand tracking-wide">ИСТОВА</a>
        <nav className="hidden md:flex gap-8 text-sm text-brand/80">
          <a href="#concept" className="hover:text-brand">О нас</a>
          <a href="#ritual" className="hover:text-brand">Ритуал</a>
          <a href="#programs" className="hover:text-brand">Программы</a>
          
          <a href="#contacts" className="hover:text-brand">Контакты</a>
        </nav>
        <a href="#booking" className="hidden md:inline-block px-4 py-2 border border-brand text-brand hover:bg-brand hover:text-sand transition-colors text-sm">Записаться</a>
      </div>
    </header>
  );
}
