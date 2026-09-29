#!/usr/bin/env python3
"""
Приводит offers.yml к образцу Яндекса для фида исполнителей (SERVICES).

ИСТОЧНИК ПРАВДЫ: https://edu.s3.yandex.net/sample/services.yml
Разбор образца 29.09.2026 показал модель, которую мы раньше понимали неверно:

  set   = страница-подборка (вид услуги). Сниппет ЭТОЙ страницы Яндекс дополняет
          предложениями из её сета.
  offer = исполнитель, который эту услугу оказывает.
  В образце один исполнитель «Дмитрий А.» повторяется в трёх офферах, но каждый
  оффер лежит в СВОЁМ сете. То есть дублировать <name> можно, а держать несколько
  офферов в одном сете не нужно.

Отсюда схема для Истовы (единственный исполнитель — сам салон):
  один оффер = один сет, url сета = url предложения, name сета = название услуги.
  <name> оффера остаётся «Истова» — этого требовали Яндекс.Карты 10.07.2026
  («в name имя исполнителя, в description название услуги»), и конфликта
  с Вебмастером теперь нет.

Скрипт идемпотентный. Запуск: python3 scripts/patch-offers-sets.py
"""
import re
import sys
from pathlib import Path

FEED = Path(__file__).resolve().parent.parent / "public" / "offers.yml"
# человекочитаемые имена услуг для <set><name>, взяты из коммита 7bc22c4 (23.09.2026)
NAME_SRC_COMMIT = "7bc22c4"


def service_names():
    """id предложения -> название услуги, из исторического коммита."""
    import subprocess
    out = subprocess.run(
        ["git", "show", f"{NAME_SRC_COMMIT}:public/offers.yml"],
        capture_output=True, text=True, cwd=FEED.parent.parent,
    ).stdout
    names = {}
    for o in re.findall(r"<offer .*?</offer>", out, re.S):
        oid = re.search(r'<offer id="([^"]+)"', o).group(1)
        nm = re.search(r"<name>(.*?)</name>", o, re.S).group(1).strip()
        names[oid] = nm.replace("Истова, ", "").strip()
    return names


def main():
    text = FEED.read_text(encoding="utf-8")
    svc = service_names()

    offers = re.findall(r"<offer .*?</offer>", text, re.S)
    if not offers:
        sys.exit("предложений не найдено")

    # 1. <name> предложения = имя исполнителя (требование Яндекс.Карт от 10.07.2026)
    def fix_name(m):
        b = m.group(0)
        cur = re.search(r"<name>(.*?)</name>", b, re.S).group(1)
        return b if cur.strip() == "Истова" else b.replace(f"<name>{cur}</name>", "<name>Истова</name>", 1)

    text = re.sub(r"<offer .*?</offer>", fix_name, text, flags=re.S)

    # 2. Сет на каждое предложение: url сета = url предложения
    sets_lines = ["    <sets>"]
    for o in re.findall(r"<offer .*?</offer>", text, re.S):
        oid = re.search(r'<offer id="([^"]+)"', o).group(1)
        url = re.search(r"<url>(.*?)</url>", o, re.S).group(1).strip()
        nm = svc.get(oid, oid)
        sets_lines += [
            f'      <set id="s-{oid}">',
            f"        <name>{nm}</name>",
            f"        <url>{url}</url>",
            "      </set>",
        ]
    sets_lines.append("    </sets>")
    sets_block = "\n".join(sets_lines)

    text = re.sub(r"[ \t]*<sets>.*?</sets>\n", "", text, flags=re.S)
    text = text.replace("    </categories>\n", "    </categories>\n" + sets_block + "\n", 1)

    # 3. <set-ids> у каждого предложения ссылается на его собственный сет
    text = re.sub(r"[ \t]*<set-ids>[^<]*</set-ids>\n", "", text)

    def add_setid(m):
        b = m.group(0)
        oid = re.search(r'<offer id="([^"]+)"', b).group(1)
        return re.sub(
            r"([ \t]*)<categoryId>(\d+)</categoryId>\n",
            lambda c: f"{c.group(0)}{c.group(1)}<set-ids>s-{oid}</set-ids>\n",
            b, count=1,
        )

    text = re.sub(r"<offer .*?</offer>", add_setid, text, flags=re.S)
    FEED.write_text(text, encoding="utf-8")

    n_off = len(re.findall(r"<offer ", text))
    n_set = len(re.findall(r"<set id=", text))
    n_sid = len(re.findall(r"<set-ids>", text))
    print(f"предложений {n_off} | сетов {n_set} | set-ids {n_sid}")
    if not (n_off == n_set == n_sid):
        sys.exit("ОШИБКА: числа не сходятся")
    print("ок: один оффер = один сет, как в образце Яндекса")


if __name__ == "__main__":
    main()
