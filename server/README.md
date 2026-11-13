# Локальний API

Потрібні Node.js 20+ та MySQL 8+. Скопіюйте `.env.example` у `.env`, задайте реквізити MySQL, тоді виконайте:

```bash
npm install
npm run migrate
npm run dev
```

Міграція створює базу та таблиці. API слухає `0.0.0.0:3000`, тож Android Emulator звертається до нього через `http://10.0.2.2:3000`. Перевірка: `GET /health`.
