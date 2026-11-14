#!/usr/bin/env python3
"""Фид offers.yml под требования Вебмастера (ответ поддержки 13.11.2026):
минимум 25 сетов, которые уже в поиске; у каждого оффера своя картинка, без дублей.

Что делает (идемпотентно):
1. Сеты: к 13 прежним добавляет страницы практик (13), посадочные (6) и главную — всего 33.
   В сет посадочной идут одиночные программы, на которые она ссылается; в сет главной —
   практики, на которые ссылается главная.
2. Картинки: каждому офферу свой файл public/feed-img/<id>.jpg из библиотеки сайта
   (выбор по контактному листу 14.11.2026, без кадров с текстом и без дублей сцены).
Запуск: python3 scripts/feed-sets-25.py
"""
import re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FEED = ROOT / "public" / "offers.yml"
IMG = ROOT / "public" / "feed-img"
SITE = "https://istova.ru"

PRACTICES = {  # страница практики → офферы
    "teplyy-massazh-tela": ("Тёплый массаж тела", ["teplota-warm-60", "teplota-warm-90"]),
    "energiya-kamnya": ("Энергия камня", ["teplota-stone-60", "teplota-stone-90"]),
    "tishina": ("Тишина", ["teplota-tishina"]),
    "glubina": ("Глубина", ["teplota-glubina"]),
    "kamen": ("Камень", ["teplota-kamen"]),
    "obnovlenie": ("Обновление", ["teplota-obnovlenie"]),
    "ukutyvanie": ("Укутывание", ["teplota-ukutyvanie"]),
    "obnovlenie-ukutyvanie": ("Обновление + Укутывание", ["teplota-obn-ukut"]),
    "teplye-kisti": ("Тёплые кисти", ["teplota-kisti"]),
    "legkie-stopy": ("Лёгкие стопы", ["teplota-stopy-l"]),
    "teplye-stopy": ("Тёплые стопы", ["teplota-stopy-t"]),
    "travyanoe-teplo": ("Травяное тепло", ["teplota-travy"]),
    "tyazhest-i-tishina": ("Тяжесть и тишина", ["teplota-tyazhest"]),
}
HEAD = ["rodnik-solo", "sumerki-volosy-solo", "yav-solo", "zarya-volosy-solo"]
LANDINGS = {  # посадочная → одиночные программы, на которые она ссылается (проверено по сборке 14.11)
    "massazh-golovy": ("Массаж головы в СПб", HEAD),
    "yaponskoe-spa-dlya-golovy": ("Японское спа для головы", HEAD),
    "spa-dlya-volos": ("Спа для волос", HEAD),
    "antistress": ("Антистресс", ["kedr-solo", "lada-solo", "sumerki-telo-solo", "sumerki-volosy-solo", "yav-solo"]),
    "rasslablyayushchiy-massazh": ("Расслабляющий массаж", ["kedr-solo", "lada-solo", "sumerki-telo-solo", "sumerki-volosy-solo"]),
    "spa-vasileostrovskiy": ("Спа на Васильевском острове", ["kedr-solo", "lada-solo", "rodnik-solo", "sumerki-telo-solo", "yav-solo", "zarya-volosy-solo"]),
}
MAIN = ("Head spa и практики Истовы", ["teplota-stone-60", "teplota-stone-90", "teplota-glubina", "teplota-kamen",
                                       "teplota-warm-60", "teplota-warm-90", "teplota-tishina"])

G = "public/gallery/"
PICS = {  # оффер → исходник; crop вырезает кадр без надписей (кадры из ленты Instagram и карточки сайта)
    "yav-solo": G + "2026-09/duga-kabinet.webp", "yav-pair": G + "head-spa/jade.jpg",
    "zarya-volosy-solo": G + "2026-09/duga-voda-krupno.webp", "zarya-volosy-pair": (G + "feed/De_-oz1u-Qd.webp", "crop=iw:ih*0.62:0:ih*0.38"),
    "sumerki-volosy-solo": G + "head-spa/wooden.jpg", "sumerki-volosy-pair": G + "2026-09/pena-golova.webp",
    "zarya-telo-solo": G + "clean/sauna.jpg", "zarya-telo-pair": G + "2026-09/sauna-dvoe.webp",
    "sumerki-telo-solo": G + "frag-massage.jpg", "sumerki-telo-pair": G + "frag-sauna.jpg",
    "rodnik-solo": G + "clean/chasha.jpg", "rodnik-pair": G + "2026-09/maska-dlya-sna.webp",
    "kedr-solo": G + "2026-09/g-muzhchina.webp", "kedr-pair": (G + "feed/DfFKSPujuGM.full.webp", "crop=iw:ih*0.38:0:ih*0.45"),  # dvoe-parallelno — та же сцена, что g-muzhchina
    "lada-solo": G + "head-spa/aurora.jpg", "lada-pair": G + "clean/massazh-golovy.jpg",
    "kedr-lada-pair": G + "frag-lounge.jpg",
    "teplota-tyazhest": G + "2026-09/kompress-litso.webp", "teplota-travy": G + "frag-aroma.jpg",
    "teplota-stopy-t": G + "frag-water.jpg", "teplota-stopy-l": G + "feed/DfCp3_5Ofgc.webp",
    "teplota-kisti": G + "2026-09/pena-ruki.webp", "teplota-obn-ukut": G + "frag-care.jpg",
    "teplota-ukutyvanie": G + "frag-headspa.jpg", "teplota-obnovlenie": G + "clean/skrab.jpg",
    "teplota-kamen": G + "2026-09/guasha-litso.webp", "teplota-glubina": G + "2026-09/massazh-litsa.webp",
    "teplota-tishina": (G + "feed/DfH1H-SuXoh.webp", "crop=iw:ih*0.66:0:ih*0.34"),
    "teplota-stone-90": G + "frag-body.jpg", "teplota-stone-60": G + "frag-tea.jpg",
    "teplota-warm-90": G + "frag-apples.jpg", "teplota-warm-60": G + "feed/DfPthy7uQVC.webp",
    "teplota-massage-90": (G + "feed/De2E9Fcu8cH.webp", "crop=iw:ih*0.72:0:0"),  # снизу надпись «ритуал опора»
    "teplota-massage-60": (G + "feed/DfSKDSFuNYY.webp", "crop=iw*0.85:ih*0.30:iw*0.15:ih*0.49"),  # 05-massage сделан из clean/massazh-golovy — дубль ЛАДЫ вдвоём
    "cert-any": "public/certificates/blank.jpg",
}

def make_images():
    IMG.mkdir(exist_ok=True)
    srcs = [v[0] if isinstance(v, tuple) else v for v in PICS.values()]
    assert len(set(srcs)) == len(srcs), "одна картинка у двух офферов"
    for oid, v in PICS.items():
        src, crop = (v if isinstance(v, tuple) else (v, None))
        vf = (crop + "," if crop else "") + "scale='min(1200,iw)':-2"
        out = IMG / f"{oid}.jpg"
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(ROOT / src), "-vf", vf, "-q:v", "3", str(out)], check=True)

def patch_feed():
    s = FEED.read_text(encoding="utf-8")
    new_sets = [(f"s-pr-{slug}", name, f"{SITE}/praktiki/{slug}/") for slug, (name, _) in PRACTICES.items()]
    new_sets += [(f"s-land-{slug}", name, f"{SITE}/{slug}/") for slug, (name, _) in LANDINGS.items()]
    new_sets.append(("s-main", MAIN[0], f"{SITE}/"))
    block = "".join(f'      <set id="{i}">\n        <name>{n}</name>\n        <url>{u}</url>\n      </set>\n'
                    for i, n, u in new_sets if f'<set id="{i}">' not in s)
    s = s.replace("    </sets>", block + "    </sets>", 1)
    member = {}
    for slug, (_, ids) in PRACTICES.items():
        for o in ids: member.setdefault(o, []).append(f"s-pr-{slug}")
    for slug, (_, ids) in LANDINGS.items():
        for o in ids: member.setdefault(o, []).append(f"s-land-{slug}")
    for o in MAIN[1]: member.setdefault(o, []).append("s-main")

    def fix(m):
        o = m.group(0); oid = m.group(1)
        cur = re.search(r"<set-ids>(.*?)</set-ids>", o).group(1).split(",")
        want = cur + [x for x in member.get(oid, []) if x not in cur]
        o = re.sub(r"<set-ids>.*?</set-ids>", f"<set-ids>{','.join(want)}</set-ids>", o)
        o = re.sub(r"<picture>.*?</picture>", f"<picture>{SITE}/feed-img/{oid}.jpg</picture>", o)
        return o
    s = re.sub(r'<offer id="([^"]+)".*?</offer>', fix, s, flags=re.S)
    FEED.write_text(s, encoding="utf-8")

if __name__ == "__main__":
    if "--feed-only" not in sys.argv: make_images()
    patch_feed()
    print("ok")
