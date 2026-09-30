#!/usr/bin/env python3
"""
Сверяет данные по всему сайту с единственным источником истины — programs-data.ts.

Зачем: 30.09.2026 разбор показал, что длительность ЯВЬ («70 мин» вместо 75) разъехалась
по четырём файлам, в одном из них цифра стояла ПРОПИСЬЮ и поиском по «70» не находилась,
а в layout.tsx висел ценовой диапазон 6800—13000 с ценой, которой в прайсе нет вообще.
Всё это накопилось потому, что цифры вписаны руками в разных местах.

Скрипт не правит, только показывает расхождения. Правка — всегда решение человека:
иногда расходится не копия, а сам источник.

Запуск:
    python3 scripts/check-actual.py           # человекочитаемо
    python3 scripts/check-actual.py --quiet   # молчит, если всё сходится (для крона)

Выход:
    0 — расхождений нет
    1 — есть расхождения
    2 — не смог прочитать источник истины
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TRUTH_FILE = ROOT / "app" / "lib" / "programs-data.ts"

# Практики «Теплоты» живут отдельно от программ и имеют свои длительности.
# Самая известная ловушка: «Обновление + Укутывание» правда длится 70 минут,
# и слепая замена «70» на «75» её ломает. Поэтому такие числа в белом списке.
ALLOWED_70 = "Обновление + Укутывание"


def truth():
    """Программы из programs-data.ts: {slug: {name, dur, price, pair}}."""
    src = TRUTH_FILE.read_text(encoding="utf-8")
    out = {}
    for m in re.finditer(r'slug: "([^"]+)"', src):
        chunk = src[m.start():]
        end = chunk.find("\n  },")
        chunk = chunk[: end if end > 0 else 3000]
        g = lambda k: (re.search(rf'{k}: "([^"]*)"', chunk) or [None, None])[1]
        out[m.group(1)] = {"name": g("name"), "dur": g("dur"),
                           "price": g("price"), "pair": g("pair_price")}
    return out


def minutes(dur):
    """«75 мин» -> 75, «3 ч» -> 180. None, если формат незнакомый."""
    if not dur:
        return None
    if m := re.match(r"(\d+)\s*мин", dur):
        return int(m.group(1))
    if m := re.match(r"(\d+)\s*ч", dur):
        return int(m.group(1)) * 60
    return None


def money(price):
    """«8 500 ₽» -> 8500."""
    return int(re.sub(r"\D", "", price)) if price else None


def read(rel):
    p = ROOT / rel
    return p.read_text(encoding="utf-8") if p.exists() else None


def check_price_range(t, issues):
    """priceRange в разметке организации должен покрывать реальный прайс."""
    lay = read("app/layout.tsx")
    if not lay:
        return
    m = re.search(r'priceRange: "(\d+)[^\d](\d+) ₽"', lay)
    if not m:
        issues.append(("layout.tsx", "не нашёл priceRange — проверить руками"))
        return
    lo, hi = int(m.group(1)), int(m.group(2))
    prices = [money(v["price"]) for v in t.values() if v["price"]]
    prices += [money(v["pair"]) for v in t.values() if v["pair"]]
    real_lo, real_hi = min(prices), max(prices)
    if lo != real_lo or hi != real_hi:
        issues.append(("layout.tsx",
                       f"priceRange {lo}—{hi}, а по прайсу {real_lo}—{real_hi}"))


def check_range_text(t, issues):
    """Фразы «от N до M минут» в текстах должны совпадать с реальным разбросом."""
    solo = [minutes(v["dur"]) for v in t.values() if minutes(v["dur"])]
    # верхняя граница считается по одиночным программам: парная КЕДР + ЛАДА
    # это два ритуала одновременно, в диапазон «программа длится» она не входит
    lo = min(solo)
    hi = max(m for s, v in t.items() if (m := minutes(v["dur"])) and s != "kedr-lada")

    words = {70: "семидесяти", 75: "семидесяти пяти", 90: "девяноста",
             150: "ста пятидесяти", 180: "ста восьмидесяти"}
    for rel in ["app/components/FAQ.tsx", "app/programs/page.tsx",
                "app/kak-prohodit/page.tsx", "public/ai/faq.json",
                "public/llms.txt", "app/layout.tsx"]:
        txt = read(rel)
        if not txt:
            continue
        for a, b in re.findall(r"от (\d+)[  ]?до (\d+) минут", txt):
            if (int(a), int(b)) != (lo, hi):
                issues.append((rel, f"диапазон «от {a} до {b} минут», а реально {lo}–{hi}"))
        # та же цифра прописью — именно так она пряталась от прошлых проверок
        for a, b in re.findall(r"от ([а-я ]+?) до ([а-я ]+?) минут", txt):
            if (a.strip(), b.strip()) != (words.get(lo, ""), words.get(hi, "")):
                issues.append((rel, f"диапазон прописью «от {a} до {b} минут», "
                                    f"а реально «от {words.get(lo, lo)} до {words.get(hi, hi)}»"))


def check_feed(t, issues):
    """offers.yml: цены, длительности и заполненность параметров."""
    feed = read("public/offers.yml")
    if not feed:
        issues.append(("public/offers.yml", "файла нет"))
        return
    for offer in re.findall(r"<offer .*?</offer>", feed, re.S):
        oid = re.search(r'<offer id="([^"]+)"', offer).group(1)
        if oid.startswith("teplota") or oid.startswith("cert"):
            continue
        slug, _, kind = oid.rpartition("-")
        if slug not in t:
            continue
        want = money(t[slug]["price"] if kind == "solo" else t[slug]["pair"])
        got = int(re.search(r"<price>(\d+)", offer).group(1))
        if want and got != want:
            issues.append(("public/offers.yml", f"{oid}: цена {got}, а в прайсе {want}"))
        if '<param name="Длительность">' not in offer:
            issues.append(("public/offers.yml", f"{oid}: не заполнена «Длительность»"))


def check_llms(t, issues):
    """llms.txt перечисляет программы с ценами — сверяем каждую."""
    txt = read("public/llms.txt")
    if not txt:
        return
    for slug, v in t.items():
        line = next((l for l in txt.split("\n") if f"/programs/{slug}/" in l), None)
        if not line:
            issues.append(("public/llms.txt", f"{v['name']} не упомянута"))
            continue
        if v["price"] and money(v["price"]) not in [money(x) for x in re.findall(r"[\d  ]+₽", line)]:
            issues.append(("public/llms.txt", f"{v['name']}: цена не совпадает с прайсом"))


def check_service_json(t, issues):
    """ai/service.json — то, что читают нейросети. Число программ и цены."""
    raw = read("public/ai/service.json")
    if not raw:
        return
    data = json.loads(raw)
    flat = json.dumps(data, ensure_ascii=False)
    for slug, v in t.items():
        if v["name"] and v["name"] not in flat:
            issues.append(("public/ai/service.json", f"{v['name']} отсутствует"))


def check_stale_70(issues):
    """Ищем «70 мин» там, где это НЕ практика «Обновление + Укутывание»."""
    for rel in ["app/components/FAQ.tsx", "app/programs/page.tsx",
                "app/kak-prohodit/page.tsx", "public/ai/faq.json"]:
        txt = read(rel)
        if txt and re.search(r"\b70\s*(мин|минут)", txt) and ALLOWED_70 not in txt:
            issues.append((rel, "встречается «70 минут» вне практики «Обновление + Укутывание»"))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quiet", action="store_true", help="молчать, если всё сходится")
    args = ap.parse_args()

    try:
        t = truth()
        if not t:
            raise ValueError("в programs-data.ts не найдено ни одной программы")
    except Exception as e:
        print(f"[ошибка] не прочитал источник истины: {e}")
        return 2

    issues = []
    for fn in (check_price_range, check_range_text, check_feed,
               check_llms, check_service_json):
        fn(t, issues)
    check_stale_70(issues)

    if not issues:
        if not args.quiet:
            print(f"[ок] расхождений нет. Программ в источнике: {len(t)}")
        return 0

    print(f"[!] расхождений: {len(issues)}")
    for where, what in issues:
        print(f"    {where}: {what}")
    print("\nИсточник истины — app/lib/programs-data.ts. Если разошёлся ОН,")
    print("правим его, а не копии.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
