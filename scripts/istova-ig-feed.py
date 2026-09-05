#!/usr/bin/env python3
"""
Парсер контента Instagram @istova.spa для второй бегущей линии блока «Фрагменты».
- Тянет последние посты через Apify (apify~instagram-scraper), ключ APIFY_API_KEY2.
- Качает медиа в public/gallery/feed/ (ссылки инсты протухают — держим файлы локально).
- Для видео делает лёгкое 6-сек превью (ffmpeg) для ленты, полное mp4 — для модалки.
- Пишет public/gallery/feed.json.

Запуск: APIFY_API_KEY2=... python3 scripts/istova-ig-feed.py [--limit N]
"""
import os
import sys
import re
import json
import subprocess
import urllib.request
from pathlib import Path

ACCOUNT = "istova.spa"
LIMIT = 8
if "--limit" in sys.argv:
    LIMIT = int(sys.argv[sys.argv.index("--limit") + 1])

ROOT = Path(__file__).resolve().parent.parent
FEED_DIR = ROOT / "public" / "gallery" / "feed"
FEED_JSON = ROOT / "public" / "gallery" / "feed.json"
TOKEN = os.environ.get("APIFY_API_KEY2")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

PREVIEW_SECONDS = 6
POSTER_WIDTH = 400
PREVIEW_WIDTH = 480


def log(m):
    print(m, flush=True)


def apify_posts():
    if not TOKEN:
        sys.exit("APIFY_API_KEY2 не задан")
    url = f"https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token={TOKEN}"
    payload = {
        "directUrls": [f"https://www.instagram.com/{ACCOUNT}/"],
        "resultsType": "posts",
        "resultsLimit": LIMIT,
        "addParentData": False,
    }
    req = urllib.request.Request(url, data=json.dumps(payload).encode(),
                                 headers={"Content-Type": "application/json"})
    log(f"Apify: тяну до {LIMIT} постов @{ACCOUNT}…")
    with urllib.request.urlopen(req, timeout=300) as r:
        return json.loads(r.read())


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
                poster_webp = FEED_DIR / f"{code}.webp"
                make_poster_webp(poster, poster_webp)
                feed.append({
                    "type": "video",
                    "src": f"/gallery/feed/{full.name}",
                    "preview": f"/gallery/feed/{prev.name}",
                    "poster": f"/gallery/feed/{poster_webp.name}",
                    "alt": alt, "link": link,
                })
                log(f"  [video] {code} ({size // 1024} KB) + preview")
            else:
                img = FEED_DIR / f"{code}.jpg"
                size = download(p.get("displayUrl"), img)
                img_webp = FEED_DIR / f"{code}.webp"
                make_poster_webp(img, img_webp)
                feed.append({
                    "type": "image",
                    "src": f"/gallery/feed/{img.name}",
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
