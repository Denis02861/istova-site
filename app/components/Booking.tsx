"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { track } from "../lib/track";

type Status = "idle" | "sending" | "sent" | "error";

const BOOKING_WEBHOOK = "https://n8nautomat.site/webhook/istova-booking";

const CHANNELS = [
  { value: "Позвонить", label: "Позвонить" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Telegram", label: "Telegram" },
  { value: "Не важно", label: "Не важно" },
];

export default function Booking() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const sectionRef = useRef<HTMLElement | null>(null);
  const viewedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || viewedRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !viewedRef.current) {
            viewedRef.current = true;
            track("BOOKING_FORM_VIEW");
            obs.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!name.trim() || !phone.trim() || !channel) {
      setStatus("error");
      setErrorMsg("Заполните имя, телефон и способ связи");
      track("BOOKING_VALIDATION_ERROR");
      return;
    }
    if (!consent) {
      setStatus("error");
      setErrorMsg("Требуется согласие на обработку персональных данных");
      track("BOOKING_CONSENT_MISSING");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    track("BOOKING_SUBMIT", { channel });
    try {
      const res = await fetch(BOOKING_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, channel, comment }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Ошибка отправки");
      }
      setStatus("sent");
      track("BOOKING_SUCCESS", { channel });
      setName("");
      setPhone("");
      setChannel("");
      setComment("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ошибка сети");
      track("BOOKING_ERROR");
    }
  }

  const sending = status === "sending";

  return (
    <section ref={sectionRef} id="booking" className="py-24 bg-brand text-sand">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-6 uppercase tracking-wider">Записаться на ритуал</h2>
        <p className="mb-12 text-sand/80 max-w-xl mx-auto leading-relaxed">Оставьте заявку — администратор свяжется с вами в течение часа и подтвердит запись.</p>
        <div className="bg-sand-soft text-brand p-12 max-w-xl mx-auto">
          {status === "sent" ? (
            <div className="py-8">
              <p className="font-display text-2xl mb-3">Заявка отправлена</p>
              <p className="text-brand/70 mb-6">Администратор свяжется с вами в течение часа.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-sm text-brand/60 underline hover:text-brand"
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 text-left">
              <input
                type="text"
                placeholder="Имя *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={sending}
                required
                maxLength={100}
                className="w-full px-4 py-3 bg-sand border border-brand/20 focus:border-brand outline-none disabled:opacity-60"
              />
              <input
                type="tel"
                placeholder="Телефон *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={sending}
                required
                maxLength={30}
                className="w-full px-4 py-3 bg-sand border border-brand/20 focus:border-brand outline-none disabled:opacity-60"
              />
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                disabled={sending}
                required
                className={`w-full px-4 py-3 bg-sand border border-brand/20 focus:border-brand outline-none disabled:opacity-60 ${channel ? "" : "text-brand/50"}`}
              >
                <option value="" disabled>Как с вами связаться *</option>
                {CHANNELS.map((c) => (
                  <option key={c.value} value={c.value} className="text-brand">{c.label}</option>
                ))}
              </select>
              <textarea
                placeholder="Комментарий (опционально)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={sending}
                maxLength={500}
                rows={3}
                className="w-full px-4 py-3 bg-sand border border-brand/20 focus:border-brand outline-none disabled:opacity-60"
              />
              {status === "error" && errorMsg && (
                <p className="text-sm text-red-700">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-brand text-sand hover:bg-brand-dark transition-colors disabled:opacity-60"
              >
                {sending ? "Отправляем…" : "Отправить заявку"}
              </button>
              <label className="flex items-start gap-3 pt-2 text-xs text-brand/60 leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-brand shrink-0"
                />
                <span>
                  Я даю согласие на обработку персональных данных в соответствии с{" "}
                  <a
                    href="/politika-obrabotki-personalnyh-dannyh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-brand"
                  >
                    Политикой обработки ПДн
                  </a>
                  .
                </span>
              </label>
            </form>
          )}
          <div className="mt-8 pt-6 border-t border-brand/15 text-left">
            <p className="text-sm text-brand/70 mb-1">Или напишите нам напрямую</p>
            <p className="text-base text-brand">
              <a
                href="https://t.me/Istova_spa"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("TELEGRAM_CLICK", { from: "booking" })}
                className="hover:underline"
              >@Istova_spa</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
