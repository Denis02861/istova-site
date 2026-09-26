#!/usr/bin/env python3
"""
Синхронизация рейтинга и числа отзывов в YML-фиде с карточкой Яндекс.Карт.

Зачем: Яндекс.Вебмастер сверяет число отзывов и рейтинг в фиде с МИКРОРАЗМЕТКОЙ
на самом сайте (istova.ru), а не с карточкой на Картах. Поэтому цифра живёт
в двух местах и оба обязаны совпадать:
  public/offers.yml   — фид для Вебмастера
  app/lib/rating.ts   — единый источник для сайта: оттуда её берут и schema.org
                        в layout.tsx, и видимый блок отзывов в Reviews.tsx
Раньше цифра лежала в layout.tsx и Reviews.tsx порознь, и их можно было развести.
Если развести, Вебмастер пометит фид ошибкой, а разметку могут снять.
Отзывы копятся сами, поэтому цифра устаревает каждый месяц.

Запуск:
    python3 scripts/sync-feed-reviews.py            # только проверка, ничего не меняет
    python3 scripts/sync-feed-reviews.py --apply    # правит фид, коммитит и пушит

Выход:
    0 — расхождений нет либо всё успешно обновлено
    1 — расхождение найдено (в режиме проверки)
    2 — ошибка получения данных, фид НЕ тронут

Принцип: если Карты не ответили или вернули бессмыслицу (ноль отзывов, рейтинг вне
1..5), скрипт падает и НИЧЕГО не пишет. Фид с выдуманной цифрой хуже устаревшего.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FEED = ROOT / "public" / "offers.yml"
RATING_TS = ROOT / "app" / "lib" / "rating.ts"  # единый источник рейтинга для сайта

# Карточка Истовы на Яндекс.Картах
ORG_ID = "63939829435"
MAPS_URL = f"https://yandex.ru/maps/org/istova/{ORG_ID}/reviews/"
ACTOR = "zen-studio~yandex-maps-reviews-scraper"

MSK = timezone(timedelta(hours=3))


def fetch_maps_stats():
    """Рейтинг и число отзывов с карточки. Бросает исключение, если данные негодные."""
    token = os.environ.get("APIFY_API_KEY")
    if not token:
        raise RuntimeError("нет APIFY_API_KEY в окружении")

    url = (f"https://api.apify.com/v2/acts/{ACTOR}"
           f"/run-sync-get-dataset-items?token={token}")
    payload = json.dumps({
        "startUrls": [{"url": MAPS_URL}],
        "maxReviews": 1,          # нужна только шапка карточки, отзывы не тянем
    }).encode()

    req = urllib.request.Request(
        url, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        items = json.load(r)

    if not items:
        raise RuntimeError("актор вернул пустой список")

    head = items[0]
    rating = head.get("businessRating")
    count = head.get("businessRatingsCount")

    # Защита от мусора: лучше упасть, чем записать в фид ерунду
    if not isinstance(count, int) or count <= 0:
        raise RuntimeError(f"негодное число отзывов: {count!r}")
    if not isinstance(rating, (int, float)) or not (1 <= rating <= 5):
        raise RuntimeError(f"негодный рейтинг: {rating!r}")

    return rating, count


def read_feed_stats(text):
    """Что сейчас стоит в фиде. Возвращает (множество рейтингов, множество отзывов)."""
    ratings = set(re.findall(r'<param name="Рейтинг">([^<]+)</param>', text))
    counts = set(re.findall(r'<param name="Число отзывов">([^<]+)</param>', text))
    return ratings, counts


def fmt_rating(value):
    """5.0 -> 5, 4.8 -> 4.8. Яндекс принимает оба вида, но целые без хвоста читаются лучше."""
    return str(int(value)) if float(value).is_integer() else str(value)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true",
                    help="применить правки, закоммитить и запушить")
    args = ap.parse_args()

    try:
        rating, count = fetch_maps_stats()
    except Exception as e:
        print(f"[ошибка] не смог получить данные с Карт: {e}")
        print("[ошибка] фид не тронут")
        return 2

    rating_s, count_s = fmt_rating(rating), str(count)
    print(f"[карты]  рейтинг {rating_s}, отзывов {count_s}")

    text = FEED.read_text(encoding="utf-8")
    cur_ratings, cur_counts = read_feed_stats(text)
    print(f"[фид]    рейтинг {sorted(cur_ratings) or '—'}, "
          f"отзывов {sorted(cur_counts) or '—'}")

    if not cur_ratings or not cur_counts:
        print("[ошибка] в фиде не найдены параметры Рейтинг / Число отзывов.")
        print("[ошибка] проверь регистр: Яндекс требует их с заглавной буквы.")
        return 2

    if cur_ratings == {rating_s} and cur_counts == {count_s}:
        print("[итог]   совпадает, делать нечего")
        return 0

    print(f"[итог]   расхождение: рейтинг {sorted(cur_ratings)} -> {rating_s}, "
          f"отзывы {sorted(cur_counts)} -> {count_s}")

    if not args.apply:
        print("[режим]  проверка. Чтобы применить: --apply")
        return 1

    new = re.sub(r'(<param name="Рейтинг">)[^<]+(</param>)',
                 rf'\g<1>{rating_s}\g<2>', text)
    new = re.sub(r'(<param name="Число отзывов">)[^<]+(</param>)',
                 rf'\g<1>{count_s}\g<2>', new)
    new = re.sub(r'<yml_catalog date="[^"]*">',
                 f'<yml_catalog date="{datetime.now(MSK):%Y-%m-%dT%H:%M:%S%z}">'
                 .replace("+0300", "+03:00"), new)

    # Убеждаемся, что XML не развалился, прежде чем писать на диск
    import xml.etree.ElementTree as ET
    try:
        ET.fromstring(new)
    except ET.ParseError as e:
        print(f"[ошибка] после правки XML сломался: {e}")
        return 2

    FEED.write_text(new, encoding="utf-8")
    print(f"[правка] {FEED.relative_to(ROOT)} обновлён")

    if not sync_site(rating_s, count_s):
        return 2

    return git_push(rating_s, count_s)


def sync_site(rating_s, count_s):
    """Правит единый источник рейтинга. Его импортируют и микроразметка в layout.tsx,
    и видимый блок отзывов, поэтому расходиться между собой они физически не могут."""
    if not RATING_TS.exists():
        print(f"[ошибка] нет файла {RATING_TS.relative_to(ROOT)}")
        return False

    src = RATING_TS.read_text(encoding="utf-8")
    out, n_count = re.subn(r"(\n  count: )\d+", rf"\g<1>{count_s}", src)
    out, n_value = re.subn(r'(\n  value: ")[^"]+(")', rf"\g<1>{rating_s}\g<2>", out)

    if n_count != 1 or n_value != 1:
        print(f"[ошибка] в {RATING_TS.relative_to(ROOT)} не нашёл, что править "
              f"(count: {n_count}, value: {n_value})")
        print("[ошибка] структура файла изменилась, правь руками")
        return False

    today = f"{datetime.now(MSK):%d.%m.%Y}"
    out = re.sub(r"Сверено \d{2}\.\d{2}\.\d{4}: \d+ оценок",
                 f"Сверено {today}: {count_s} оценок", out)

    RATING_TS.write_text(out, encoding="utf-8")
    print(f"[правка] {RATING_TS.relative_to(ROOT)}: рейтинг {rating_s}, отзывов {count_s}")
    return True


def git_push(rating_s, count_s):
    """Коммит и push. Токен уходит заголовком, а не в URL."""
    def git(*a, **kw):
        return subprocess.run(["git", "-C", str(ROOT), *a],
                              capture_output=True, text=True, **kw)

    tracked = ["public/offers.yml", "app/lib/rating.ts"]
    if not git("diff", "--quiet", "--", *tracked).returncode:
        print("[git]    нечего коммитить")
        return 0

    git("add", *tracked)
    msg = (f"[agent] отзывы {count_s}, рейтинг {rating_s}: фид и rating.ts "
           f"синхронизированы с Яндекс.Картами")
    r = git("commit", "-m", msg)
    if r.returncode:
        print(f"[ошибка] commit: {r.stderr.strip()}")
        return 2

    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("[git]    коммит сделан, но нет GITHUB_TOKEN — push пропущен")
        return 0

    import base64
    auth = base64.b64encode(f"x-access-token:{token}".encode()).decode()
    r = git("-c", f"http.extraheader=Authorization: Basic {auth}",
            "push", "origin", "main")
    if r.returncode:
        print(f"[ошибка] push: {r.stderr.strip()}")
        return 2

    print("[git]    запушено в main, Layero пересоберёт сайт")
    return 0


if __name__ == "__main__":
    sys.exit(main())
