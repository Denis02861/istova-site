"use client";

// Окно заказа подарочного сертификата (Денис 17.11.2026).
// Открывается любой ссылкой на #zakaz-sertifikata (кнопки на главной и на /podarochnyy-sertifikat/),
// прямая ссылка istova.ru/podarochnyy-sertifikat/#zakaz-sertifikata открывает его сразу.
// Заявка уходит тем же путём, что и запись (n8n → Telegram администратору): детали заказа
// идут строками в комментарий с заголовком «ЗАКАЗ СЕРТИФИКАТА», поэтому workflow менять не нужно.
// Поле kind: "certificate" n8n пока не читает — задел, если захотим отдельный заголовок.

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { programs } from "../lib/programs-data";
import { track } from "../lib/track";
import { leadSource } from "../lib/leadSource";

export const CERT_ORDER_HASH = "#zakaz-sertifikata";
const WEBHOOK = "https://n8nautoma.site/webhook/istova-booking";

const CHANNELS = ["Позвонить", "WhatsApp", "Telegram", "Не важно"];
const FORMATS = ["Электронный", "Бумажный в конверте"];

// Ритуалы с ценой: на одного и, где есть, на двоих
const RITUALS = programs.flatMap((p) =>
  p.pair_price ? [`${p.name} · ${p.price}`, `${p.name} на двоих · ${p.pair_price}`] : [`${p.name} · ${p.price}`]
);

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  if (!digits) return "";
  const p1 = digits.slice(1, 4), p2 = digits.slice(4, 7), p3 = digits.slice(7, 9), p4 = digits.slice(9, 11);
  let out = "+7";
  if (p1) out += ` (${p1}`;
  if (p1.length === 3) out += ")";
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}
const phoneOk = (v: string) => v.replace(/\D/g, "").length === 11;
const rub = (v: string) => v.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");

type Status = "idle" | "sending" | "sent" | "error";
const field = "w-full px-4 py-3 bg-sand border border-brand/20 focus:border-brand outline-none disabled:opacity-60";

export default function CertificateOrder() {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<"sum" | "ritual">("sum");
  const [amount, setAmount] = useState("");
  const [ritual, setRitual] = useState("");
  const [format, setFormat] = useState(FORMATS[0]);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState("Не важно");
  const [wish, setWish] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const firstRef = useRef<HTMLButtonElement | null>(null);

  const show = useCallback(() => {
    setOpen(true);
    track("CERT_ORDER_OPEN");
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // убрать #zakaz-sertifikata, чтобы следующий клик по кнопке снова открыл окно
    if (window.location.hash === CERT_ORDER_HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const check = () => { if (window.location.hash === CERT_ORDER_HASH) show(); };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [show]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("istova-modal-open");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    setTimeout(() => firstRef.current?.focus({ preventScroll: true }), 50);
    return () => {
      document.body.classList.remove("istova-modal-open");
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const what = kind === "sum" ? (amount.replace(/\D/g, "") ? `на сумму ${rub(amount)} ₽` : "") : ritual ? `на ритуал ${ritual}` : "";
    if (!what) {
      setStatus("error");
      setError(kind === "sum" ? "Укажите сумму сертификата" : "Выберите ритуал");
      return;
    }
    if (!name.trim() || !phoneOk(phone)) {
      setStatus("error");
      setError("Заполните ваше имя и телефон полностью");
      return;
    }
    if (!consent) {
      setStatus("error");
      setError("Требуется согласие на обработку персональных данных");
      return;
    }
    const lines = ["ЗАКАЗ СЕРТИФИКАТА", `Сертификат: ${what}`, `Формат: ${format.toLowerCase()}`];
    if (to.trim()) lines.push(`Кому: ${to.trim().slice(0, 80)}`);
    if (from.trim()) lines.push(`От кого: ${from.trim().slice(0, 80)}`);
    if (wish.trim()) lines.push(`Пожелание: ${wish.trim().slice(0, 200)}`);
    setStatus("sending");
    setError("");
    track("CERT_ORDER_SUBMIT", { kind, channel });
    try {
      const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ name, phone, channel, comment: lines.join("\n"), kind: "certificate", src: leadSource() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) throw new Error(data.error || "Ошибка отправки");
      setStatus("sent");
      // Заказ сертификата — такая же заявка: цель BOOKING_SUCCESS считает и рекламу (Ozon ведёт сюда)
      track("BOOKING_SUCCESS", { from: "certificate", channel });
      track("CERT_ORDER_SUCCESS", { kind, channel });
    } catch {
      setStatus("error");
      setError("Не удалось отправить автоматически. Позвоните +7 (901) 320-10-50 или напишите в Telegram @Istova_spa, оформим сразу.");
      track("CERT_ORDER_ERROR");
    }
  }

  if (!open) return null;
  const sending = status === "sending";
  const tab = (on: boolean) =>
    `flex-1 py-2.5 text-sm border transition-colors ${on ? "bg-brand text-sand border-brand" : "bg-sand text-brand border-brand/20 hover:border-brand/50"}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 bg-brand-dark/55 backdrop-blur-sm animate-modal-backdrop"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Заказ подарочного сертификата"
    >
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-sand-soft text-brand p-6 md:p-10 shadow-2xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть"
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-brand/60 hover:text-brand"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        {status === "sent" ? (
          <div className="py-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-5 animate-check-bounce">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p className="font-display text-2xl mb-3">Заявка отправлена</p>
            <p className="text-brand/70 mb-6">Администратор свяжется с вами, чтобы оформить сертификат.</p>
            <button type="button" onClick={close} className="text-sm text-brand/60 underline hover:text-brand">Закрыть</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <h2 className="font-display text-2xl md:text-3xl pr-8">Заказать сертификат</h2>
            <p className="text-sm text-brand/70 leading-relaxed">
              Заполните, что знаете. Администратор свяжется с вами и оформит сертификат.
            </p>

            <div className="flex gap-2" role="group" aria-label="Вид сертификата">
              <button ref={firstRef} type="button" className={tab(kind === "sum")} onClick={() => setKind("sum")}>На сумму</button>
              <button type="button" className={tab(kind === "ritual")} onClick={() => setKind("ritual")}>На ритуал</button>
            </div>
            {kind === "sum" ? (
              <input
                type="text" inputMode="numeric" aria-label="Сумма сертификата" placeholder="Сумма, ₽ *"
                value={amount ? rub(amount) : ""} onChange={(e) => setAmount(e.target.value.replace(/\D/g, "").slice(0, 7))}
                disabled={sending} className={field}
              />
            ) : (
              <select aria-label="Ритуал" value={ritual} onChange={(e) => setRitual(e.target.value)} disabled={sending}
                className={`${field} ${ritual ? "" : "text-brand/50"}`}>
                <option value="">Выберите ритуал *</option>
                {RITUALS.map((r) => <option key={r} value={r} className="text-brand">{r}</option>)}
                <option value="помогите выбрать" className="text-brand">Не знаю, помогите выбрать</option>
              </select>
            )}

            <select aria-label="Формат сертификата" value={format} onChange={(e) => setFormat(e.target.value)} disabled={sending} className={field}>
              {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" aria-label="Кому" placeholder="Кому (имя)" value={to} onChange={(e) => setTo(e.target.value)} disabled={sending} maxLength={80} className={field} />
              <input type="text" aria-label="От кого" placeholder="От кого" value={from} onChange={(e) => setFrom(e.target.value)} disabled={sending} maxLength={80} className={field} />
            </div>

            <div className="pt-2 border-t border-brand/10" />
            <input type="text" aria-label="Ваше имя" autoComplete="name" placeholder="Ваше имя *" value={name}
              onChange={(e) => setName(e.target.value)} disabled={sending} maxLength={100} className={field} />
            <div>
              <input type="tel" aria-label="Телефон" autoComplete="tel" inputMode="tel" placeholder="+7 (___) ___-__-__ *"
                value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} disabled={sending} maxLength={18}
                className={`${field} ${phone.replace(/\D/g, "").length > 5 && !phoneOk(phone) ? "border-red-500/60 focus:border-red-500" : ""}`} />
              {phone.replace(/\D/g, "").length > 5 && !phoneOk(phone) && (
                <p className="text-xs text-red-500/80 mt-1">Введите номер полностью — 11 цифр</p>
              )}
            </div>
            <select aria-label="Как с вами связаться" value={channel} onChange={(e) => setChannel(e.target.value)} disabled={sending} className={field}>
              {CHANNELS.map((c) => <option key={c} value={c}>{c === "Не важно" ? "Как связаться: не важно" : c}</option>)}
            </select>
            <textarea aria-label="Пожелание" placeholder="Пожелание или комментарий (необязательно)" value={wish}
              onChange={(e) => setWish(e.target.value)} disabled={sending} maxLength={200} rows={2} className={field} />

            {status === "error" && error && <p className="text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={sending} className="w-full py-3 bg-brand text-sand hover:bg-brand-dark transition-colors disabled:opacity-60">
              {sending ? "Отправляем…" : "Отправить заявку"}
            </button>
            <label className="flex items-start gap-3 pt-1 text-xs text-brand/60 leading-relaxed cursor-pointer">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 accent-brand shrink-0" />
              <span>
                Я даю согласие на обработку персональных данных в соответствии с{" "}
                <a href="/politika-obrabotki-personalnyh-dannyh/" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand">Политикой обработки ПДн</a>.
              </span>
            </label>
          </form>
        )}
      </div>
    </div>
  );
}
