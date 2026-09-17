#!/usr/bin/env bash
# Превью страниц программ для соцсетей и мессенджеров, 1200x630.
#
# Два макета:
#   photo — кадр справа, текст слева. Идёт туда, где есть чистое фото по смыслу ритуала.
#   typo  — только типографика на фирменном фоне. Универсальный, работает без фото.
#
# Почему так: все кадры галереи вертикальные (720x1280, формат сторис), а превью
# горизонтальное. Растягивать нельзя, обрезать до полоски тоже. Чистых кадров всего
# четыре, у двух сверху остатки подписей от старых макетов, они здесь срезаются.
#
# Запуск: bash scripts/build-og.sh
# Результат: public/og/<slug>.jpg
#
# Обновлять при смене цен: цифры зашиты в таблицу ниже, сверять с programs-data.ts.

set -euo pipefail
cd "$(dirname "$0")/.."

OUT=public/og
mkdir -p "$OUT"
SAND='#FAF8F5'; BRAND='#744436'; DARK='#5A3328'; LIGHT='#A37260'
DISPLAY=public/fonts/UNCAGE-Variable.ttf
TEXT=public/fonts/Inter-Variable.ttf
LOGO=public/logo/istova-wordmark.webp

# Кадры с обрезкой верхней полосы, где остался текст старого макета.
prep_photo() {           # $1 файл, $2 сколько срезать сверху, $3 куда
  convert "$1" -gravity north -chop 0x"$2" +repage \
    -resize 470x630^ -gravity center -extent 470x630 "$3"
}
prep_photo public/gallery/clean/massazh-golovy.webp 20 /tmp/og_head.png
prep_photo public/gallery/clean/chasha.webp         70 /tmp/og_chasha.png
prep_photo public/gallery/clean/skrab.webp           0 /tmp/og_skrab.png
prep_photo public/gallery/clean/sauna.jpg            0 /tmp/og_sauna.png

# Макет с фото: строка1 и строка2 названия разнесены, чтобы длинные имена не жались.
make_photo() {           # slug, строка1, строка2, "90 минут · 8 500 ₽", фото
  convert -size 1200x630 xc:"$SAND" \
    \( "$5" \) -gravity east -geometry +0+0 -composite \
    -gravity northwest \
    \( "$LOGO" -resize 200x \) -geometry +80+70 -composite \
    -font "$TEXT"    -pointsize 20 -fill "$LIGHT" -annotate +80+250 'С П А - Р И Т У А Л' \
    -font "$DISPLAY" -pointsize 58 -fill "$BRAND" -annotate +80+300 "$2" \
    -font "$DISPLAY" -pointsize 58 -fill "$BRAND" -annotate +80+370 "$3" \
    -font "$TEXT"    -pointsize 25 -fill "$DARK"  -annotate +80+450 "$4" \
    -font "$TEXT"    -pointsize 18 -fill "$LIGHT" -annotate +80+540 'Васильевский остров · istova.ru' \
    -quality 88 "$OUT/$1.jpg"
}

# Макет без фото: всё по центру, воздуха много, читается даже в мелком превью.
make_typo() {            # slug, название, "100 минут · 8 900 ₽"
  convert -size 1200x630 xc:"$SAND" \
    \( "$LOGO" -resize 300x \) -gravity north -geometry +0+72 -composite \
    -gravity center \
    -font "$TEXT"    -pointsize 21 -fill "$LIGHT" -annotate +0-40 'С П А - Р И Т У А Л' \
    -font "$DISPLAY" -pointsize 76 -fill "$BRAND" -annotate +0+20 "$2" \
    -font "$TEXT"    -pointsize 27 -fill "$DARK"  -annotate +0+95 "$3" \
    -gravity south \
    -font "$TEXT"    -pointsize 19 -fill "$LIGHT" -annotate +0+60 'Санкт-Петербург · Васильевский остров · istova.ru' \
    -quality 88 "$OUT/$1.jpg"
}

# Фото там, где кадр совпадает с сутью ритуала.
make_photo zarya-volosy   'ЗАРЯ'    'ВОЛОСЫ' '90 минут · 8 500 ₽'  /tmp/og_head.png
make_photo zarya-telo     'ЗАРЯ'    'ТЕЛО'   '100 минут · 8 900 ₽' /tmp/og_skrab.png
make_photo kedr           'КЕДР'    ''       '150 минут · 11 900 ₽' /tmp/og_sauna.png
make_photo rodnik         'РОДНИК'  ''       '75 минут · 7 900 ₽'  /tmp/og_chasha.png

# Остальным типографика: подходящего чистого кадра под них нет.
make_typo sumerki-telo    'СУМЕРКИ | ТЕЛО'   '120 минут · 9 900 ₽'
make_typo sumerki-volosy  'СУМЕРКИ | ВОЛОСЫ' '90 минут · 8 500 ₽'
make_typo lada            'ЛАДА'             '150 минут · 11 900 ₽'
make_typo yav             'ЯВЬ'              '75 минут · 6 800 ₽'
make_typo kedr-lada       'КЕДР + ЛАДА'      '3 часа · 21 000 ₽ за двоих'

echo "готово: $(ls -1 $OUT/*.jpg | wc -l) превью в $OUT"
ls -la "$OUT"
