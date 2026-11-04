#!/usr/bin/env python3
"""
Парсер контента Instagram @istova.spa для второй бегущей линии блока «Фрагменты».
- Тянет последние посты через Apify (apify~instagram-scraper), ключ APIFY_API_KEY2.
- Качает медиа в public/gallery/feed/ (ссылки инсты протухают — держим файлы локально).
- Для видео делает лёгкое 6-сек превью (ffmpeg) для ленты, полное mp4 — для модалки.
- Пишет public/gallery/feed.json.

Запуск: python3 scripts/istova-ig-feed.py [--limit N]  (ключи APIFY_API_KEY2, затем APIFY_API_KEY из окружения)
"""
import os
import sys
import re
import json
import subprocess
import urllib.error
import urllib.request
from pathlib import Path

ACCOUNT = "istova.spa"
LIMIT = 8
if "--limit" in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index("--limit") + 1])

ROOT = Path(__file__).resolve().parent.parent
FEED_DIR = ROOT / "public" / "gallery" / "feed"
FEED_JSON = ROOT / "public" / "gallery" / "feed.json"
# Сначала второй ключ, потом первый: 01.11.2026 второй был выбран до сброса, и лента не обновлялась.
TOKENS = [t for t in (os.environ.get("APIFY_API_KEY2"), os.environ.get("APIFY_API_KEY")) if t]
# Потолок расхода на один прогон: 29.10 помощник без потолка съел 3,26 $ вместо 1,5.
MAX_CHARGE_USD = "0.10"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

PREVIEW_SECONDS = 6
POSTER_WIDTH = 400
PREVIEW_WIDTH = 480


def log(m):
    print(m, flush=True)


def apify_posts():
    if not TOKENS:
        sys.exit("нет ни APIFY_API_KEY2, ни APIFY_API_KEY")
    payload = {
        "directUrls": [f"https://www.instagram.com/{ACCOUNT}/"],
        "resultsType": "posts",
        "resultsLimit": LIMIT,
        "addParentData": False,
    }
    log(f"Apify: тяну до {LIMIT} постов @{ACCOUNT}…")
    for i, token in enumerate(TOKENS):
        url = ("https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items"
               f"?maxTotalChargeUsd={MAX_CHARGE_USD}")
        req = urllib.request.Request(url, data=json.dumps(payload).encode(),
                                     headers={"Content-Type": "application/json", "Authorization": f"Bearer {token}"})
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            # 402/403 — ключ выбран до конца месяца, пробуем следующий.
            if e.code in (402, 403) and i + 1 < len(TOKENS):
                log(f"Apify: ключ {i + 1} не принят ({e.code}), беру следующий")
                continue
            raise


def download(src, dest):
    req = urllib.request.Request(src, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest, "wb") as f:
        f.write(r.read())
    return dest.stat().st_size


def make_preview(full_mp4, out_mp4):
    """6-сек беззвучный клип, ширина 480, для лёгкой бегущей ленты."""
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(full_mp4),
        "-t", str(PREVIEW_SECONDS), "-an",
        "-vf", f"scale={PREVIEW_WIDTH}:-2",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "28",
        "-movflags", "+faststart", str(out_mp4),
    ]
    subprocess.run(cmd, check=True)


def make_poster_webp(src_jpg, out_webp):
    """Лёгкий постер для ленты: плитка на сайте 160-192px, поэтому 400px хватает
    с запасом под retina. Даёт примерно минус 80% веса против исходного JPEG."""
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(src_jpg),
        "-vf", f"scale={POSTER_WIDTH}:-2",
        "-c:v", "libwebp", "-quality", "80", str(out_webp),
    ]
    subprocess.run(cmd, check=True)


# Полное видео для окна просмотра (04.11.2026): из инсты приходит до 8 МБ на ролик.
# Ужимаем до 720 по ширине — в модалке на телефоне разницы не видно, а весит в разы меньше.
FULL_VIDEO_WIDTH = 720
FULL_IMAGE_WIDTH = 1080


def shrink_video(path):
    tmp = path.with_suffix(".tmp.mp4")
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(path),
        "-vf", f"scale='min({FULL_VIDEO_WIDTH},iw)':-2",
        "-c:v", "libx264", "-preset", "medium", "-crf", "28", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart", str(tmp),
    ]
    subprocess.run(cmd, check=True)
    tmp.replace(path)


def full_image_webp(src_jpg, out_webp):
    cmd = [
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(src_jpg),
        "-vf", f"scale='min({FULL_IMAGE_WIDTH},iw)':-2",
        "-c:v", "libwebp", "-quality", "82", str(out_webp),
    ]
    subprocess.run(cmd, check=True)


def clean_alt(caption):
    if not caption:
        return "Кадр из жизни Истовы"
    t = re.sub(r"\s+", " ", caption).strip()
    t = re.sub(r"#\S+", "", t).strip()
    return (t[:90] + "…") if len(t) > 90 else (t or "Кадр из жизни Истовы")


def main():
    FEED_DIR.mkdir(parents=True, exist_ok=True)
    for old in FEED_DIR.glob("*"):
        old.unlink()

    posts = apify_posts()
    log(f"Получено постов: {len(posts)}")
    feed = []
    for p in posts:
        code = p.get("shortCode") or p.get("id")
        if not code:
            continue
        ptype = (p.get("type") or "").lower()
        is_video = bool(p.get("videoUrl")) or ptype == "video"
        alt = clean_alt(p.get("caption"))
        link = p.get("url") or f"https://www.instagram.com/p/{code}/"
        try:
            if is_video:
                full = FEED_DIR / f"{code}.mp4"
                prev = FEED_DIR / f"{code}.preview.mp4"
                poster = FEED_DIR / f"{code}.jpg"
                size = download(p["videoUrl"], full)
                download(p.get("displayUrl"), poster)
                make_preview(full, prev)
                shrink_video(full)
                poster_webp = FEED_DIR / f"{code}.webp"
                make_poster_webp(poster, poster_webp)
                poster.unlink()  # на сайте обложка только webp, jpg не нужен
                feed.append({
                    "type": "video",
                    "src": f"/gallery/feed/{full.name}",
                    "preview": f"/gallery/feed/{prev.name}",
                    "poster": f"/gallery/feed/{poster_webp.name}",
                    "alt": alt, "link": link,
                })
                log(f"  [video] {code} ({size // 1024} KB → {full.stat().st_size // 1024} KB) + preview")
            else:
                img = FEED_DIR / f"{code}.jpg"
                size = download(p.get("displayUrl"), img)
                img_webp = FEED_DIR / f"{code}.webp"
                make_poster_webp(img, img_webp)
                full_webp = FEED_DIR / f"{code}.full.webp"
                full_image_webp(img, full_webp)
                img.unlink()
                feed.append({
                    "type": "image",
                    "src": f"/gallery/feed/{full_webp.name}",
                    "poster": f"/gallery/feed/{img_webp.name}",
                    "alt": alt, "link": link,
                })
                log(f"  [image] {code} ({size // 1024} KB)")
        except Exception as e:
            log(f"  [skip] {code}: {e}")

    FEED_JSON.write_text(json.dumps(feed, ensure_ascii=False, indent=2))
    log(f"feed.json: {len(feed)} элементов → {FEED_JSON}")


if __name__ == "__main__":
    main()
