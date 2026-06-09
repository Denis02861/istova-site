# Миграция на Beget хостинг (план на 13.06.2026)

## Причина
Vercel CDN (216.198.79.x) частично блокируется российскими провайдерами. Часть пользователей не может открыть сайт. Beget — российский хостинг, стабильная доступность.

## Что нужно от Дениса 13.06

1. Зарегистрировать виртуальный хостинг на Beget (тариф «Старт» ~250 ₽/мес или выше). Хостинг + домен istova.ru — должны быть на одном аккаунте Beget
2. Дать мне доступ к FTP/SFTP (логин + пароль) — пришлёшь в /settings → 🔑 → ➕ как переменные `BEGET_FTP_USER` и `BEGET_FTP_PASS`

## Что подготовлено в ветке `agent/beget-migration`
- `next.config.js`: добавлен `output: 'export'` → теперь `npm run build` создаёт папку `out/` со статикой
- `MIGRATION.md`: этот документ — шаги миграции

## План работ 13.06 (1 час)

### Шаг 1. Build статики
```bash
cd /tmp/istova-site
git checkout agent/beget-migration
npm install
npm run build
# → создаётся out/ — папка со статикой
```

### Шаг 2. Заливка на Beget
Через SFTP в `~/site/istova.ru/public_html/`:
- Все файлы из `out/` → в `public_html/`
- Beget автоматически отдаёт `index.html` для корня

### Шаг 3. DNS обратно на Beget
В DNS-настройках istova.ru у Beget:
- A-запись `@` → IP Beget хостинга (даст после регистрации)
- CNAME `www` → istova.ru (или такой же IP)
- Vercel-записи (216.198.79.1, vercel-dns-017.com) — удалить

### Шаг 4. SSL сертификат
Beget даёт бесплатный Let's Encrypt в панели управления → Сайты → SSL → Включить.

### Шаг 5. Тест
- Открыть istova.ru с разных устройств
- Проверить мобильный
- Проверить через 4G и WiFi

## После миграции

### Обновления сайта (как менять контент)
Вариант A (вручную):
- Правка кода в GitHub → `npm run build` локально → залить `out/` через SFTP

Вариант B (автоматика через GitHub Actions):
- При push в main → GitHub Actions делает build → SFTP-загрузку на Beget
- Настроим после миграции, если будут частые правки

### Что обновится при следующих изменениях
- Фото программ → положить в `public/images/programs/`
- Финальные цены и описания → `app/components/Programs.tsx` массив `programs`
- DIKIDI виджет → `app/components/Booking.tsx`
- FAQ-вопросы → `app/components/FAQ.tsx` массив `items`

## Что НЕ остаётся
- Vercel — отвязать домен после успешного запуска на Beget. Подписку Vercel оставить бесплатной (free тариф) или закрыть
- Старый istova-site.vercel.app продолжит работать как preview-deploy для разработки

## Откат если Beget хуже
- Через 1-2 недели если Beget не устроит — переключаем DNS обратно на Vercel
- В этот период оба хостинга платны (минимальный overlap)
