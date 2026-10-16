#!/usr/bin/env python3
"""
IndexNow: сообщить Яндексу и Bing о новых и изменённых страницах сразу, без Вебмастера.

Зачем (16.10.2026): API Вебмастера лежало, а 15 новых страниц практик надо было
отдать в обход. Bing к тому же питает поиск ChatGPT: срез трекера нейросетей
показал, что ChatGPT про Истову почти ничего не знает.

Ключ лежит открыто в public/<ключ>.txt — так устроен протокол: поисковик проверяет,
что файл с ключом есть на сайте. Секрета тут нет.

Запуск:
  python3 scripts/indexnow.py                 # все адреса из sitemap.xml с прода
  python3 scripts/indexnow.py URL [URL ...]   # только указанные
"""
import json
import re
import sys
import urllib.request

HOST = "istova.ru"
KEY = "7f156c98d37b9730e3f6add5b9724564"
ENDPOINTS = ["https://yandex.com/indexnow", "https://api.indexnow.org/indexnow"]


def sitemap_urls():
    with urllib.request.urlopen(f"https://{HOST}/sitemap.xml", timeout=30) as r:
        xml = r.read().decode("utf-8")
    return re.findall(r"<loc>([^<]+)</loc>", xml)


def main():
    urls = sys.argv[1:] or sitemap_urls()
    body = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"https://{HOST}/{KEY}.txt", "urlList": urls}).encode()
    for ep in ENDPOINTS:
        req = urllib.request.Request(ep, data=body, method="POST", headers={"Content-Type": "application/json; charset=utf-8"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                print(f"{ep}: {r.status}, адресов {len(urls)}")
        except urllib.error.HTTPError as e:
            print(f"{ep}: {e.code} {e.read()[:200].decode('utf-8', 'ignore')}")
        except Exception as e:
            print(f"{ep}: ошибка {e}")


if __name__ == "__main__":
    main()
