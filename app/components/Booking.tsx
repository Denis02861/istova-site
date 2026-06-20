export default function Booking() {
  return (
    <section id="booking" className="py-24 bg-brand text-sand">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-6 uppercase tracking-wider">Записаться на ритуал</h2>
        <p className="mb-12 text-sand/80 max-w-xl mx-auto leading-relaxed">Выберите программу, дату и время. Администратор подтвердит запись в течение часа.</p>
        <div className="bg-sand-soft text-brand p-12 max-w-xl mx-auto">
          <p className="font-display text-xl mb-4">Виджет DIKIDI</p>
          <p className="text-sm text-brand/60 italic mb-6">Здесь будет embed-код виджета онлайн-записи когда подключим аккаунт</p>
          <form className="space-y-4 text-left">
            <input type="text" placeholder="Имя" className="w-full px-4 py-3 bg-sand border border-brand/20 focus:border-brand outline-none" />
            <input type="tel" placeholder="Телефон" className="w-full px-4 py-3 bg-sand border border-brand/20 focus:border-brand outline-none" />
            <textarea placeholder="Комментарий (опционально)" rows={3} className="w-full px-4 py-3 bg-sand border border-brand/20 focus:border-brand outline-none"></textarea>
            <button type="submit" className="w-full py-3 bg-brand text-sand hover:bg-brand-dark transition-colors">Отправить заявку</button>
          </form>
          <div className="mt-8 pt-6 border-t border-brand/15 text-left">
            <p className="text-sm text-brand/70 mb-1">Как с вами связаться</p>
            <p className="text-base text-brand">@istova</p>
          </div>
        </div>
      </div>
    </section>
  );
}
