// Откуда пришёл гость. Запоминаем при входе на сайт и отдаём вместе с заявкой,
// чтобы админ видел источник прямо в сообщении. Названия источников
// подставляет n8n (workflow «Istova — Booking Form»), здесь только сырые данные.

export type Touch = {
  s?: string; // utm_source
  m?: string; // utm_medium
  c?: string; // utm_campaign
  ct?: string; // utm_content
  ref?: string; // домен, с которого перешли
  ya?: 1; // yclid: клик по рекламе Директа
  biz?: 1; // yabizcmpgn: продвижение в Яндекс Бизнесе
  land: string; // страница входа
  at: number; // когда зашёл
};

const SESSION_KEY = "istova-touch-v1"; // этот заход
const LAST_KEY = "istova-last-touch-v1"; // последний заход не напрямую
const LAST_MAX_AGE = 60 * 24 * 3600 * 1000;

const OWN_HOSTS = ["istova.ru", "www.istova.ru", "162.141.78.128"];

const clip = (v: string | null) => (v ? v.trim().slice(0, 80) : undefined);

function readTouch(): Touch {
  const p = new URLSearchParams(window.location.search);
  const t: Touch = { land: window.location.pathname, at: Date.now() };
  t.s = clip(p.get("utm_source"));
  t.m = clip(p.get("utm_medium"));
  t.c = clip(p.get("utm_campaign"));
  t.ct = clip(p.get("utm_content"));
  if (p.get("yclid")) t.ya = 1;
  if (p.get("yabizcmpgn")) t.biz = 1;
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : "";
    if (host && !OWN_HOSTS.includes(host)) t.ref = host.slice(0, 80);
  } catch {}
  return t;
}

const isDirect = (t: Touch) => !t.s && !t.ref && !t.ya && !t.biz;

// Зовётся один раз на загрузку страницы (LeadSourceCapture в layout).
export function captureTouch() {
  if (typeof window === "undefined") return;
  try {
    const t = readTouch();
    if (sessionStorage.getItem(SESSION_KEY)) {
      // Внутри захода ходит по страницам. Новая метка (вернулся по другой ссылке
      // в той же вкладке) перебивает старую, переходы по сайту нет.
      if (isDirect(t)) return;
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(t));
    if (!isDirect(t)) localStorage.setItem(LAST_KEY, JSON.stringify(t));
  } catch {}
}

function load(store: Storage, key: string): Touch | undefined {
  try {
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as Touch) : undefined;
  } catch {
    return undefined;
  }
}

// Что уходит в заявку: этот заход, прошлый заход не напрямую (если был),
// и страница, на которой заполнили форму.
export function leadSource() {
  if (typeof window === "undefined") return undefined;
  const touch = load(sessionStorage, SESSION_KEY);
  let last = load(localStorage, LAST_KEY);
  if (last && Date.now() - last.at > LAST_MAX_AGE) last = undefined;
  if (last && touch && last.at === touch.at) last = undefined;
  return { touch, last, page: window.location.pathname };
}
