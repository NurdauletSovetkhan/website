# sovetkhan.kz — «живая тетрадь × таэквон-до ITF»

Один файл `index.html`, без сборки и зависимостей. Каллиграфия 태권도 уже встроена внутрь файла. Снаружи грузятся только шрифты Google Fonts.

## 1. Вставь свои ссылки
Открой `index.html` и найди в начале `<script>` блок `EDIT YOUR LINKS HERE`:
- `LINKS` — Telegram, GitHub, Instagram, LinkedIn (адрес и подпись);
- `PROJECTS` — ссылки на репозитории и сайты. Пустой `href` показывает подпись «(private — ask me)».

## 2. Цвет чернил
В начале `<style>` переменная `--ink` (сейчас синяя шариковая ручка). Попробуй `#1f1f24`, чтобы получились чёрные чернила.

## 3. Деплой на Nginx
```bash
sudo mkdir -p /var/www/sovetkhan.kz
sudo cp index.html /var/www/sovetkhan.kz/
```
```nginx
server {
    listen 80;
    server_name sovetkhan.kz www.sovetkhan.kz;
    root /var/www/sovetkhan.kz;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    gzip on; gzip_types text/html text/css application/javascript;
}
```
```bash
sudo nginx -t && sudo systemctl reload nginx
```
Или через Docker:
```bash
docker run -d --name sovetkhan -p 80:80 -v "$PWD":/usr/share/nginx/html:ro nginx:alpine
```

## Что внутри
- Крафтовая обложка с чёрным поясом: на скролле пояс соскальзывает, обложка открывается в 3D
- Имя пишется ручкой в реальном времени, каракули рисуются сами и «дрожат», как в рисованном мультике
- Разделы-раунды (준비 · 시작 · 경례), пояс в поле меняет цвет от белого к чёрному по мере чтения
- Стек в виде наклеек, их можно перетаскивать
- Рабочий судейский киоск: Хонг и Чхонг, +1/+2/+3, таймер раунда
- По странице можно рисовать мышкой, чернила потом выцветают
- Учитывается `prefers-reduced-motion`, вёрстка адаптивна под телефон
