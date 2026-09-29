#!/usr/bin/env python3
"""
Добавляет в offers.yml секцию <sets> и <set-ids> в каждое предложение.

Зачем. Вебмастер (тип фида SERVICES, «Исполнители») требует у каждого <offer>
элемент <set-ids>. Ошибка от 29.09.2026:
  «В предложении < offer > отсутствуют обязательные элементы < set-ids >»

Что такое сет. Это НЕ категория. Сет = страница сайта, сниппет которой Яндекс
дополняет предложениями из этого сета. Структура из официального примера Яндекса:
  <sets>
    <set id="s1"><name>...</name><url>https://...</url></set>
  </sets>
и в предложении: <set-ids>s1</set-ids>

Привязка сетов к категориям фида (категории заданы в самом offers.yml):
  1 СПА-ритуалы              -> /programs/
  2 СПА-ритуалы для двоих    -> /spa-dlya-dvoih/
  3 Отдельные практики       -> /            (блок «Теплота» на главной)
  4 Подарочные сертификаты   -> /podarochnyy-sertifikat/
Все четыре страницы проверены, отдают 200.

Скрипт идемпотентный: повторный запуск ничего не дублирует.
Запуск: python3 scripts/patch-offers-sets.py
"""
import re
import sys
from pathlib import Path

FEED = Path(__file__).resolve().parent.parent / "public" / "offers.yml"

# categoryId -> (set id, название подборки, url страницы)
SETS = {
    "1": ("s-programs", "СПА-ритуалы Истовы", "https://istova.ru/programs/"),
    "2": ("s-dvoe", "СПА-ритуалы для двоих", "https://istova.ru/spa-dlya-dvoih/"),
    "3": ("s-teplota", "Отдельные практики Теплота", "https://istova.ru/"),
    "4": ("s-sertifikat", "Подарочные сертификаты", "https://istova.ru/podarochnyy-sertifikat/"),
}


def build_sets_block(indent="    "):
    lines = [f"{indent}<sets>"]
    for _, (sid, name, url) in sorted(SETS.items()):
        lines.append(f'{indent}  <set id="{sid}">')
        lines.append(f"{indent}    <name>{name}</name>")
        lines.append(f"{indent}    <url>{url}</url>")
        lines.append(f"{indent}  </set>")
    lines.append(f"{indent}</sets>")
    return "\n".join(lines)


def main():
    if not FEED.exists():
        sys.exit(f"нет файла: {FEED}")

    text = FEED.read_text(encoding="utf-8")

    # 1. Секция <sets> ставится сразу после </categories>, до <offers>
    if "<sets>" in text:
        text = re.sub(r"[ \t]*<sets>.*?</sets>\n", "", text, flags=re.S)
        print("старая секция sets удалена, пересобираю")
    text = text.replace("    </categories>\n", "    </categories>\n" + build_sets_block() + "\n", 1)

    # 2. <set-ids> в каждое предложение, сразу после <categoryId>
    text = re.sub(r"[ \t]*<set-ids>[^<]*</set-ids>\n", "", text)

    def add_set_id(m):
        indent, cat = m.group(1), m.group(2)
        sid = SETS.get(cat, (None,))[0]
        if not sid:
            print(f"  ВНИМАНИЕ: нет сета для categoryId={cat}")
            return m.group(0)
        return f"{m.group(0)}{indent}<set-ids>{sid}</set-ids>\n"

    text, n = re.subn(r"([ \t]*)<categoryId>(\d+)</categoryId>\n", add_set_id, text)
    FEED.write_text(text, encoding="utf-8")

    # 3. Проверка
    offers = len(re.findall(r"<offer ", text))
    setids = len(re.findall(r"<set-ids>", text))
    sets = len(re.findall(r"<set id=", text))
    print(f"предложений: {offers} | set-ids проставлено: {setids} | сетов: {sets}")
    if offers != setids:
        sys.exit(f"ОШИБКА: {offers} предложений, но {setids} set-ids")
    print("ок, у каждого предложения есть set-ids")


if __name__ == "__main__":
    main()
