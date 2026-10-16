// Отдельные практики «Теплоты». До 16.10.2026 жили только якорями на главной
// (/#teplota-...), для поиска их не существовало, а фид ссылался на главную.
// Тексты и цены дословно из SOURCE-programs-final-2026-07-23.docx (раздел ТЕПЛОТА),
// сверены с public/offers.yml. Ничего не дописывать от себя: новая цена или состав
// приходят из исходника, а не из головы.
//
// «Расслабляющий СПА-массаж» своей страницы здесь не получает: под него уже есть
// посадочная /rasslablyayushchiy-massazh/, вторая страница отняла бы у неё запрос.

export type PracticeGroup = "touch" | "body" | "small";

export type Practice = {
  slug: string;
  anchor: string; // старый якорь на главной: /#teplota-<anchor>
  name: string;
  group: PracticeGroup;
  desc: string;
  variants: { dur: string; price: string; offerId: string }[];
  seoLead: string; // начало title: что человек набирает в поиске
  picture: string;
};

export const GROUPS: Record<PracticeGroup, { title: string; subtitle: string; intro: string }> = {
  touch: {
    title: "Прикосновение",
    subtitle: "Массажные практики для лица и тела",
    intro: "Массажные практики для лица и тела.",
  },
  body: {
    title: "Тело",
    subtitle: "Самостоятельные ритуалы ухода",
    intro: "Самостоятельные ритуалы ухода за кожей тела.",
  },
  small: {
    title: "Малые ритуалы",
    subtitle: "Небольшие практики",
    intro:
      "Небольшие практики, которые меняют ощущение от всего ритуала. Выберите основной ритуал и дополните его тем, чего хочется именно сегодня.",
  },
};

export const practices: Practice[] = [
  {
    slug: "teplyy-massazh-tela",
    anchor: "warm",
    name: "Тёплый массаж тела",
    group: "touch",
    desc: "Мягкая массажная практика на тёплом масле свечи — для глубокого расслабления и ощущения тепла.",
    variants: [
      { dur: "60 минут", price: "4 500 ₽", offerId: "teplota-warm-60" },
      { dur: "90 минут", price: "6 100 ₽", offerId: "teplota-warm-90" },
    ],
    seoLead: "Тёплый массаж тела со свечой в СПб",
    picture: "/gallery/05-massage.jpg",
  },
  {
    slug: "energiya-kamnya",
    anchor: "stone",
    name: "Энергия камня",
    group: "touch",
    desc: "Сочетание ручных техник и тёплых камней для глубокой проработки и расслабления тела.",
    variants: [
      { dur: "60 минут", price: "4 800 ₽", offerId: "teplota-stone-60" },
      { dur: "90 минут", price: "6 300 ₽", offerId: "teplota-stone-90" },
    ],
    seoLead: "Массаж тёплыми камнями в СПб",
    picture: "/gallery/05-massage.jpg",
  },
  {
    slug: "tishina",
    anchor: "tishina",
    name: "Тишина",
    group: "touch",
    desc: "Расслабляющий массаж кожи головы руками и гребнями.",
    variants: [{ dur: "20 минут", price: "2 500 ₽", offerId: "teplota-tishina" }],
    seoLead: "Массаж головы с гребнями в СПб",
    picture: "/gallery/04-head-spa.jpg",
  },
  {
    slug: "glubina",
    anchor: "glubina",
    name: "Глубина",
    group: "touch",
    desc: "Массаж лица, шейно-воротниковой зоны и кожи головы с гребнями — для снятия напряжения и полного переключения.",
    variants: [{ dur: "40 минут", price: "4 200 ₽", offerId: "teplota-glubina" }],
    seoLead: "Массаж лица, шеи и головы в СПб",
    picture: "/gallery/04-head-spa.jpg",
  },
  {
    slug: "kamen",
    anchor: "kamen",
    name: "Камень",
    group: "touch",
    desc: "Косметический массаж лица с гуаша, роликами или криосферами — для расслабления, лёгкости и свежего вида кожи.",
    variants: [{ dur: "30 минут", price: "3 500 ₽", offerId: "teplota-kamen" }],
    seoLead: "Массаж лица гуаша и криосферами в СПб",
    picture: "/gallery/frag-care.jpg",
  },
  {
    slug: "obnovlenie",
    anchor: "obnovlenie",
    name: "Обновление",
    group: "body",
    desc: "Скрабирование тела, тёплый душ и завершающий уход. Ароматическое направление выбирается перед практикой.",
    variants: [{ dur: "30 минут", price: "3 500 ₽", offerId: "teplota-obnovlenie" }],
    seoLead: "Скраб для тела в спа, СПб",
    picture: "/gallery/03-sauna.jpg",
  },
  {
    slug: "ukutyvanie",
    anchor: "ukutyvanie",
    name: "Укутывание",
    group: "body",
    desc: "Финская сауна, питательное обёртывание, отдых в тепле и завершающий уход для мягкости и комфорта кожи.",
    variants: [{ dur: "50 минут", price: "4 200 ₽", offerId: "teplota-ukutyvanie" }],
    seoLead: "Сауна и обёртывание в СПб",
    picture: "/gallery/03-sauna.jpg",
  },
  {
    slug: "obnovlenie-ukutyvanie",
    anchor: "obn-ukut",
    name: "Обновление + Укутывание",
    group: "body",
    desc: "Полный СПА-уход для кожи тела: прогревание, обновление, обёртывание и завершающий уход.",
    variants: [{ dur: "70 минут", price: "6 500 ₽", offerId: "teplota-obn-ukut" }],
    seoLead: "Спа-уход для тела: сауна, скраб и обёртывание в СПб",
    picture: "/gallery/03-sauna.jpg",
  },
  {
    slug: "teplye-kisti",
    anchor: "kisti",
    name: "Тёплые кисти",
    group: "small",
    desc: "Массаж кистей и уход с тёплым кремом.",
    variants: [{ dur: "20 минут", price: "2 000 ₽", offerId: "teplota-kisti" }],
    seoLead: "Массаж кистей рук в СПб",
    picture: "/gallery/frag-body.jpg",
  },
  {
    slug: "legkie-stopy",
    anchor: "stopy-l",
    name: "Лёгкие стопы",
    group: "small",
    desc: "Массаж стоп и голеней для снятия усталости и ощущения лёгкости.",
    variants: [{ dur: "20 минут", price: "2 200 ₽", offerId: "teplota-stopy-l" }],
    seoLead: "Массаж стоп и голеней в СПб",
    picture: "/gallery/frag-body.jpg",
  },
  {
    slug: "teplye-stopy",
    anchor: "stopy-t",
    name: "Тёплые стопы",
    group: "small",
    desc: "Массаж стоп и голеней с последующим согреванием травяными мешочками.",
    variants: [{ dur: "30 минут", price: "2 900 ₽", offerId: "teplota-stopy-t" }],
    seoLead: "Массаж стоп с травяными мешочками в СПб",
    picture: "/gallery/frag-body.jpg",
  },
  {
    slug: "travyanoe-teplo",
    anchor: "travy",
    name: "Травяное тепло",
    group: "small",
    desc: "Локальный ритуал с тёплыми травяными мешочками для выбранной зоны тела.",
    variants: [{ dur: "20 минут", price: "2 500 ₽", offerId: "teplota-travy" }],
    seoLead: "Массаж травяными мешочками в СПб",
    picture: "/gallery/frag-body.jpg",
  },
  {
    slug: "tyazhest-i-tishina",
    anchor: "tyazhest",
    name: "Тяжесть и тишина",
    group: "small",
    desc: "Отдых под тяжёлым одеялом с тёплым компрессом для глаз — практика полного замедления.",
    variants: [{ dur: "20 минут", price: "1 300 ₽", offerId: "teplota-tyazhest" }],
    seoLead: "Отдых под утяжелённым одеялом в спа, СПб",
    picture: "/gallery/frag-body.jpg",
  },
];

// Практика, у которой вместо своей страницы — существующая посадочная.
export const MASSAGE_LANDING = "/rasslablyayushchiy-massazh/";
export const MASSAGE = {
  name: "Расслабляющий СПА-массаж",
  desc: "Медленные глубокие техники для снятия напряжения и возвращения ощущения лёгкости в теле.",
  priceLine: "60 мин — 4 300 ₽ · 90 мин — 5 900 ₽",
};

export function practiceHref(anchor: string): string | null {
  if (anchor === "massage") return MASSAGE_LANDING;
  const p = practices.find((x) => x.anchor === anchor);
  return p ? `/praktiki/${p.slug}/` : null;
}

export function priceLine(p: Practice): string {
  return p.variants.map((v) => `${v.dur.replace(" минут", " мин")} — ${v.price}`).join(" · ");
}
