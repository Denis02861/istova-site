export default function Footer() {
  return (
    <footer className="bg-brand-dark text-sand/80 py-14">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-display text-2xl text-sand mb-2 tracking-wider">ИСТОВА</div>
            <p className="text-sm italic text-sand/60 mb-3">
              Пространство истинного ухода
            </p>
            <p className="text-sm text-sand/70">
              Санкт-Петербург, Васильевский остров
              <br />
              ул. Беринга, 23 к. 2
            </p>
            <p className="text-sm text-sand/70 mt-3">
              <a href="tel:+79013201050" className="hover:text-sand">+7 (901) 320-10-50</a>
            </p>
            <p className="text-sm text-sand/70">
              <a href="https://t.me/Istova_spa" target="_blank" rel="noopener noreferrer" className="hover:text-sand">
                @Istova_spa
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-sand mb-3 text-sm tracking-wide uppercase">Документы</h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a href="/politika-obrabotki-personalnyh-dannyh/" className="hover:text-sand">
                  Политика обработки ПДн
                </a>
              </li>
              <li>
                <a href="/oferta/" className="hover:text-sand">
                  Публичная оферта
                </a>
              </li>
              <li>
                <a href="/programs/" className="hover:text-sand">
                  Все программы
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sand mb-3 text-sm tracking-wide uppercase">Реквизиты</h4>
            <p className="text-xs text-sand/70 leading-relaxed">
              ИП Карасёв Денис Игоревич
              <br />
              ИНН 280118121214
              <br />
              ОГРНИП 326237500185610
              <br />
              ОКВЭД 96.02
            </p>
            <p className="text-xs text-sand/50 leading-relaxed mt-3">
              Адрес регистрации:
              <br />
              353451, Краснодарский край, г. Анапа, ул. Парковая, 60 к. 2, кв. 39
            </p>
          </div>
        </div>

        <div className="border-t border-sand/10 pt-6 text-center text-xs text-sand/40">
          © 2026 ИП Карасёв Д.И. · Все права защищены
        </div>
      </div>
    </footer>
  );
}
