import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const MAX_LEN = { name: 100, phone: 30, comment: 500 };

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  const token = process.env.ISTOVA_BOT_TOKEN;
  const chatId = process.env.ISTOVA_TG_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  let body: { name?: string; phone?: string; comment?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, MAX_LEN.name);
  const phone = (body.phone || "").trim().slice(0, MAX_LEN.phone);
  const comment = (body.comment || "").trim().slice(0, MAX_LEN.comment);

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Имя и телефон обязательны" }, { status: 400 });
  }

  const lines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
  ];
  if (comment) lines.push(`<b>Комментарий:</b> ${escapeHtml(comment)}`);
  lines.push("", "<i>istova.ru</i>");

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!tgRes.ok) {
    return NextResponse.json({ ok: false, error: "Telegram error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
