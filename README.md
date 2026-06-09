# istova-site

Сайт istova.ru на Next.js 15 + Tailwind, деплой на Vercel.

## Структура

- `app/page.tsx` — главная страница (импортирует 11 блоков)
- `app/components/` — компоненты каждого блока (Hero, Concept, Ritual, Programs, Space, Team, Certificates, FAQ, Contacts, Booking, Footer, Header)
- `app/globals.css` — глобальные стили (Tailwind)
- `tailwind.config.ts` — палитра (brand, sand) и шрифты (Cormorant Garamond + Inter)

## Как подменить контент

Заходишь в `app/components/<имя-блока>.tsx`. Меняешь только текст. Сохраняешь — деплой автоматический.

Примеры:
- Программы: `Programs.tsx`, массив `programs` сверху — название, описание, длительность, цена
- FAQ: `FAQ.tsx`, массив `items` — вопрос и ответ
- Команда: `Team.tsx`, массив `team` — имена и должности
- Контакты: `Contacts.tsx` — адрес, телефон, часы

## Деплой на Vercel

1. На vercel.com → New Project → Import Git Repository → выбрать `istova-site`
2. Vercel сам определит Next.js, нажать Deploy
3. Сайт доступен на `istova-site-{username}.vercel.app`
4. Подключение домена istova.ru: Settings → Domains → Add → istova.ru. Vercel покажет DNS-настройки. У регистратора заменить A-запись с Tilda на Vercel
