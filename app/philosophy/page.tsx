import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Философия — Истова",
  description: "Название «ИСТОВА» — от старорусского «истово»: искренне, глубоко, с полной отдачей. Не просто салон, а состояние.",
  alternates: { canonical: "https://istova.ru/philosophy/" },
};

const FOUR = [
  {
    title: "Искренне",
    body: "Не работаем по шаблону. Видим человека и стараемся понять, что ему нужно именно сегодня: тишина, забота, тепло, возможность побыть наедине с собой.",
  },
  {
    title: "Внимательно",
    body: "Каждая деталь имеет значение: температура полотенца, интонация голоса, аромат в кабинете, скорость движений, чашка чая после программы. Из этих мелочей — большое ощущение заботы.",
  },
  {
    title: "Глубоко",
    body: "Работаем не только с телом. Работаем с состоянием. Гость уходит не просто с расслабленными мышцами — а с внутренним облегчением и восстановлением.",
  },
  {
    title: "С полной отдачей",
    body: "Не механически, а вкладывая внимание, профессионализм и душу. Именно это отличает настоящее гостеприимство от обычного сервиса.",
  },
];

export default function PhilosophyPage() {
  return (
    <main className="bg-cream text-ink-900 min-h-screen">
      {/* HERO */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs md:text-sm tracking-widest uppercase text-brand/60 mb-6">
            Философия · ИСТОВА
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-8">
            «Истово»
          </h1>
          <p className="text-xl md:text-2xl text-ink-700 leading-relaxed">
            От старорусского слова — <i>искренне</i>, <i>глубоко</i>,
            <br className="hidden md:block" /> <i>всем сердцем</i>, <i>с полной отдачей</i>.
          </p>
          <p className="text-ink-500 mt-6 max-w-xl mx-auto">
            Для нас это не просто красивое слово. Это главный принцип нашей работы.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs tracking-widest uppercase text-brand/60 mb-4">Зачем мы существуем</div>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-ink-700">
            <p>
              Современному человеку не хватает мест, где можно по-настоящему остановиться. Мы живём в постоянной спешке, информационном шуме, бесконечных задачах. Даже отдых часто становится ещё одним пунктом в списке дел.
            </p>
            <p className="font-medium text-ink-900">
              Мы создаём другое пространство.
            </p>
            <p>
              ИСТОВА — это место, где человек может выдохнуть, почувствовать безопасность, замедлиться и снова услышать себя.
            </p>
            <p className="text-2xl md:text-3xl font-display italic text-brand mt-8 leading-snug">
              Мы не продаём массаж, уход за волосами или СПА-программы. Мы создаём состояние.
            </p>
            <p>Состояние покоя, заботы и внутреннего восстановления.</p>
          </div>
        </div>
      </section>

      {/* FOUR MEANINGS */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs tracking-widest uppercase text-brand/60 mb-4">Четыре смысла</div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink-900">
              Что значит «истово»
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {FOUR.map((f, i) => (
              <div key={f.title} className="bg-white border border-sand rounded-3xl p-8 md:p-10">
                <div className="text-brand text-sm tracking-widest uppercase mb-3">0{i + 1}</div>
                <div className="font-display text-2xl md:text-3xl text-ink-900 mb-4">
                  Истово — значит {f.title.toLowerCase()}.
                </div>
                <p className="text-ink-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR STAFF */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs tracking-widest uppercase text-brand/60 mb-4">Для сотрудников</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-8">
            Ежедневный ориентир
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-ink-700 mb-6">
            Когда мы задаём себе вопрос: <i>«Как поступить?»</i> — ответ всегда один:
          </p>
          <p className="text-3xl md:text-5xl font-display font-semibold text-brand mb-10 leading-tight">
            поступить истово.
          </p>
          <div className="space-y-4 text-lg text-ink-700 border-l-2 border-brand/30 pl-6">
            <p>
              Проводить программу — <b>с полным присутствием.</b>
            </p>
            <p>
              Встречать гостя — <b>искренне.</b>
            </p>
            <p>
              Создавать атмосферу так, чтобы человек <b>почувствовал безопасность</b> и смог отпустить напряжение.
            </p>
          </div>
        </div>
      </section>

      {/* GOAL */}
      <section className="py-20 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-xs tracking-widest uppercase text-brand/60 mb-6">Наша цель</div>
          <p className="text-xl md:text-2xl text-ink-700 mb-4">
            Мы не стремимся сделать самый громкий или самый модный салон.
          </p>
          <p className="text-xl md:text-2xl text-ink-700 mb-12">
            Мы стремимся стать пространством, в которое возвращаются за одним ощущением:
          </p>
          <blockquote className="font-display text-3xl md:text-5xl italic text-brand leading-[1.15] mb-16">
            «Здесь обо мне по-настоящему позаботились».
          </blockquote>
          <div className="pt-12 border-t border-sand max-w-xl mx-auto">
            <p className="text-lg text-ink-700">
              Именно в этом и заключается смысл ИСТОВЫ — <b>глубокая, искренняя и настоящая забота о человеке.</b>
            </p>
          </div>
          <div className="mt-16">
            <Link
              href="/#programs"
              className="inline-flex items-center px-8 py-3.5 bg-brand text-cream rounded-full text-base font-medium hover:bg-brand-dark transition"
            >
              Смотреть программы →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
