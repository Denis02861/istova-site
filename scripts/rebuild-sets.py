#!/usr/bin/env python3
"""
Перестраивает блок <sets> в offers.yml: сет = РЕАЛЬНАЯ страница сайта.

Зачем. 07.10.2026 Вебмастер дал fatal: «Недостаточно данных для формирования
ответа — передайте больше предложений и сетов». Разбор показал причину:
в фиде было 35 сетов, в каждом ровно одно предложение, и 18 сетов вели на один
и тот же адрес (главная с параметром ?p=...#якорь). Яндекс отбрасывает параметр
и якорь, видит кучу сетов на одном url и не может собрать блок: карусель
из одного элемента не строится.

Новая раскладка. Сет соответствует странице, на которой человек реально выбирает,
и содержит ВСЕ предложения этой страницы. Одно предложение входит в несколько
сетов — <set-ids> принимает список через запятую.

    s-programs   /programs/                 9 одиночных ритуалов
    s-dvoih      /spa-dlya-dvoih/           9 парных
    s-<slug>     /programs/<slug>/          одиночный + парный одной программы
    s-teplota    /                          17 дневных практик «Теплоты»
    s-cert       /podarochnyy-sertifikat/   сертификат

Итого 13 сетов вместо 35, наполнение от 1 до 17 предложений.

URL самих предложений НЕ трогаем: оффер должен вести туда, где услугу заказывают,
и якорь помогает человеку попасть в нужную секцию.

Скрипт идемпотентный. Запуск: python3 scripts/rebuild-sets.py
"""
import re
import sys
from pathlib import Path

FEED = Path(__file__).resolve().parent.parent / "public" / "offers.yml"
SITE = "https://istova.ru"

# Человекочитаемые имена программ для сетов отдельных страниц.
PROGRAM_NAMES = {
    "zarya-telo": "ЗАРЯ | ТЕЛО", "zarya-volosy": "ЗАРЯ | ВОЛОСЫ",
    "sumerki-telo": "СУМЕРКИ | ТЕЛО", "sumerki-volosy": "СУМЕРКИ | ВОЛОСЫ",
    "rodnik": "РОДНИК", "kedr": "КЕДР", "lada": "ЛАДА", "yav": "ЯВЬ",
    "kedr-lada": "КЕДР + ЛАДА",
}


def main():
    text = FEED.read_text(encoding="utf-8")
    offers = re.findall(r"<offer .*?</offer>", text, re.S)
    if not offers:
        sys.exit("предложений не найдено")

    ids = [re.search(r'<offer id="([^"]+)"', o).group(1) for o in offers]
    solo = [i for i in ids if i.endswith("-solo")]
    pair = [i for i in ids if i.endswith("-pair")]
    teplota = [i for i in ids if i.startswith("teplota-")]
    cert = [i for i in ids if i.startswith("cert")]

    # сет -> (имя, url, список предложений)
    sets = {
        "s-programs": ("Спа-ритуалы Истовы", f"{SITE}/programs/", solo),
        "s-dvoih": ("Спа для двоих", f"{SITE}/spa-dlya-dvoih/", pair),
        "s-teplota": ("Отдельные практики", f"{SITE}/", teplota),
    }
    if cert:
        sets["s-cert"] = ("Подарочный сертификат", f"{SITE}/podarochnyy-sertifikat/", cert)

    # страница каждой программы: одиночный + парный вариант
    for slug, name in PROGRAM_NAMES.items():
        members = [i for i in ids if i in (f"{slug}-solo", f"{slug}-pair")]
        if members:
            sets[f"s-{slug}"] = (name, f"{SITE}/programs/{slug}/", members)

    # предложение -> в каких сетах состоит
    belongs = {}
    for sid, (_, _, members) in sets.items():
        for m in members:
            belongs.setdefault(m, []).append(sid)

    orphan = [i for i in ids if i not in belongs]
    if orphan:
        sys.exit(f"ОШИБКА: предложения без сета: {orphan}")

    # собираем новый блок <sets>
    lines = ["    <sets>"]
    for sid, (name, url, members) in sets.items():
        lines += [f'      <set id="{sid}">', f"        <name>{name}</name>",
                  f"        <url>{url}</url>", "      </set>"]
    lines.append("    </sets>")
    block = "\n".join(lines)

    text = re.sub(r"[ \t]*<sets>.*?</sets>\n", "", text, flags=re.S)
    text = text.replace("    </categories>\n", "    </categories>\n" + block + "\n", 1)

    # проставляемset-ids: у предложения может быть несколько сетов через запятую
    text = re.sub(r"[ \t]*<set-ids>[^<]*</set-ids>\n", "", text)

    def add(m):
        body = m.group(0)
        oid = re.search(r'<offer id="([^"]+)"', body).group(1)
        val = ",".join(belongs[oid])
        return re.sub(r"([ \t]*)<categoryId>(\d+)</categoryId>\n",
                      lambda c: f"{c.group(0)}{c.group(1)}<set-ids>{val}</set-ids>\n",
                      body, count=1)

    text = re.sub(r"<offer .*?</offer>", add, text, flags=re.S)

    import xml.etree.ElementTree as ET
    try:
        ET.fromstring(text)
    except ET.ParseError as e:
        sys.exit(f"ОШИБКА: XML сломался — {e}")

    FEED.write_text(text, encoding="utf-8")

    print(f"предложений {len(ids)} · сетов {len(sets)}")
    for sid, (name, url, members) in sets.items():
        print(f"  {sid:16} {len(members):>2} предл.  {url}")
    multi = sum(1 for v in belongs.values() if len(v) > 1)
    print(f"\nпредложений сразу в нескольких сетах: {multi}")
    print("url предложений не трогались")


if __name__ == "__main__":
    main()
