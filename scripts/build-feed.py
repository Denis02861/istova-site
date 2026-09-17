#!/usr/bin/env python3
"""
Товарный фид (YML) для Яндекс.Директа: программы Истовы с актуальными ценами.

Источник правды — app/lib/programs-data.ts и SHORT_DESC со страницы программы.
Ничего не придумывает: если цену или название не нашёл, падает с ошибкой, а не
подставляет заглушку. Фид с неверной ценой хуже отсутствующего фида.

Запуск: python3 scripts/build-feed.py
Результат: public/feed.yml → https://istova.ru/feed.yml

Обновлять после каждой смены прайса. Парные предложения идут отдельными офферами:
в Директе это разные предложения с разной ценой.
"""
import re
import sys
from datetime import datetime
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://istova.ru"

# Картинка под каждую программу: берём кадр, который ближе всего по смыслу ритуала.
PICTURES = {
    "zarya-telo": "/gallery/06-body.webp",
    "zarya-volosy": "/gallery/04-head-spa.webp",
    "sumerki-telo": "/gallery/05-massage.webp",
    "sumerki-volosy": "/gallery/frag-headspa.webp",
    "rodnik": "/gallery/frag-care.webp",
    "kedr": "/gallery/03-sauna.webp",
    "lada": "/gallery/frag-body.webp",
    "kedr-lada": "/gallery/02-spa-zone.webp",
    "yav": "/gallery/frag-water.webp",
}

CATEGORIES = [(1, "Спа-ритуалы"), (2, "Спа-ритуалы для двоих")]


def rub(price: str) -> int:
    """8 900 ₽ -> 8900. Неразрывные пробелы в данных встречаются, чистим все."""
    digits = re.sub(r"[^\d]", "", price.replace(" ", " "))
    if not digits:
        raise ValueError(f"не разобрал цену: {price!r}")
    return int(digits)


def parse_programs(ts_text: str):
    out = []
    blocks = re.findall(r'slug:\s*"([^"]+)"(.*?)(?=\n  \{\n    slug:|\];)', ts_text, re.S)
    for slug, body in blocks:
        def one(field):
            m = re.search(rf'\b{field}:\s*"([^"]*)"', body)
            return m.group(1) if m else None
        out.append({
            "slug": slug,
            "name": one("name"),
            "dur": one("dur"),
            "price": one("price"),
            "pair_price": one("pair_price"),
            "teaser": one("teaser"),
            "accent": one("accent"),
        })
    return out


def parse_short_desc(page_text: str):
    block = re.search(r"const SHORT_DESC[^=]*=\s*\{(.*?)\n\};", page_text, re.S)
    if not block:
        return {}
    return dict(re.findall(r'"([^"]+)":\s*\n?\s*"([^"]+)"', block.group(1)))


def offer(oid, url, price, cat, picture, name, description, params):
    parts = [
        f'      <offer id="{escape(oid)}" available="true">',
        f"        <url>{escape(url)}</url>",
        f"        <price>{price}</price>",
        "        <currencyId>RUB</currencyId>",
        f"        <categoryId>{cat}</categoryId>",
        f"        <picture>{escape(picture)}</picture>",
        "        <vendor>Истова</vendor>",
        f"        <name>{escape(name)}</name>",
        f"        <description>{escape(description)}</description>",
    ]
    for key, value in params:
        parts.append(f'        <param name="{escape(key)}">{escape(value)}</param>')
    parts.append("      </offer>")
    return "\n".join(parts)


def main():
    programs = parse_programs((ROOT / "app/lib/programs-data.ts").read_text(encoding="utf-8"))
    descs = parse_short_desc((ROOT / "app/programs/[slug]/page.tsx").read_text(encoding="utf-8"))
    if not programs:
        sys.exit("не нашёл ни одной программы в programs-data.ts")

    offers, missing = [], []
    for p in programs:
        slug = p["slug"]
        if not p["price"] or not p["name"]:
            missing.append(slug)
            continue
        url = f"{SITE}/programs/{slug}/"
        pic = SITE + PICTURES.get(slug, "/og-image.webp")
        desc = descs.get(slug) or p["teaser"] or ""
        dur = p["dur"] or ""
        # КЕДР + ЛАДА продаётся только парой, поэтому сразу во вторую категорию.
        cat = 2 if slug == "kedr-lada" else 1
        offers.append(offer(
            slug, url, rub(p["price"]), cat, pic,
            f"{p['name']} · спа-ритуал {dur}".strip(" ·"),
            desc,
            [("Длительность", dur), ("Район", "Васильевский остров"),
             ("Адрес", "ул. Беринга, 23 к. 2")],
        ))
        # Парный вариант: отдельное предложение, цена за двоих.
        if p["pair_price"]:
            offers.append(offer(
                f"{slug}-pair", url, rub(p["pair_price"]), 2, pic,
                f"{p['name']} для двоих · спа-ритуал {dur}".strip(" ·"),
                f"{desc} Цена указана за двоих, каждый со своим мастером.".strip(),
                [("Длительность", dur), ("Количество гостей", "2"),
                 ("Район", "Васильевский остров")],
            ))

    if missing:
        sys.exit(f"нет цены или названия: {', '.join(missing)}")

    cats = "\n".join(
        f'      <category id="{cid}">{escape(cname)}</category>' for cid, cname in CATEGORIES
    )
    yml = f"""<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="{datetime.now().strftime('%Y-%m-%d %H:%M')}">
  <shop>
    <name>Истова</name>
    <company>ИП Карасёв Денис Игоревич</company>
    <url>{SITE}</url>
    <currencies>
      <currency id="RUB" rate="1"/>
    </currencies>
    <categories>
{cats}
    </categories>
    <offers>
{chr(10).join(offers)}
    </offers>
  </shop>
</yml_catalog>
"""
    out = ROOT / "public/feed.yml"
    out.write_text(yml, encoding="utf-8")
    print(f"готово: {out.relative_to(ROOT)}, офферов {len(offers)}, размер {out.stat().st_size} байт")


if __name__ == "__main__":
    main()
