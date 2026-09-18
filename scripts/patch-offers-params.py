#!/usr/bin/env python3
"""
Дописывает в offers.yml параметры, которых требует Яндекс от фида услуг.

Зачем: 18.09.2026 фид отвалился с fatal-ошибкой REQUIRED_PARAMS_DO_NOT_EXIST —
не хватало параметров «рейтинг» и «число отзывов» ни в одном из предложений.

Цифры берутся из RATING ниже и обязаны совпадать с тем, что видит гость на сайте
и что стоит в микроразметке layout.tsx. Обновлять все три места разом.

Скрипт идемпотентный: если параметр уже есть, второй раз не добавит.
Запуск: python3 scripts/patch-offers-params.py
"""
import re
import sys
from pathlib import Path

SRC = Path(__file__).resolve().parent.parent / "public" / "offers.yml"

# Рейтинг и отзывы сверены 17.09.2026 по карточке Яндекс.Карт (org 63939829435).
# Годы опыта — решение Дениса 18.09.2026: ставим 1, по самому салону.
# В рекламе нельзя завышать, поэтому цифра по Истове, а не по опыту в нише.
RATING = {
    "рейтинг": "5",
    "число отзывов": "44",
    "годы опыта": "1",
}

ANCHOR = '<param name="Регион">Санкт-Петербург</param>'


def main():
    text = SRC.read_text(encoding="utf-8")
    before = len(re.findall(r"<offer ", text))

    added = []
    for name, value in RATING.items():
        tag = f'<param name="{name}">{value}</param>'
        if f'name="{name}"' in text:
            print(f"  {name}: уже есть, пропускаю")
            continue
        text = text.replace(ANCHOR, f"{ANCHOR}\n      {tag}")
        added.append(name)

    if not added:
        print("нечего добавлять, фид уже полный")
        return

    SRC.write_text(text, encoding="utf-8")
    after = len(re.findall(r"<offer ", text))
    if before != after:
        sys.exit(f"число предложений изменилось ({before} -> {after}), проверь файл")
    print(f"добавлено: {', '.join(added)} в {after} предложений")


if __name__ == "__main__":
    main()
