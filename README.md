# 🚀 CRM Backend API

Backend часть CRM системы, разработанная с использованием **Node.js, Express, TypeScript, Prisma и PostgreSQL**.

Проект реализует базовую систему пользователей, авторизации, товаров и заказов.

---

# ⚙️ Технологии

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (авторизация)
- bcrypt (хеширование паролей)

---

# 📦 Основной функционал

## 🔐 Авторизация
- Регистрация пользователей (signup)
- Вход в систему (login)
- Генерация JWT токена
- Хеширование паролей (bcrypt)

---

## 📦 Товары (Products)
- Создание товара
- Получение всех товаров
- Получение товара по ID
- Обновление товара
- Удаление товара

---

## 🧾 Заказы (Orders)
- Создание заказа
- Привязка заказа к пользователю
- Привязка товаров к заказу (many-to-many)
- Получение заказов

---

# 📁 Структура проекта

src/
├── modules/
│ ├── auth/
│ ├── products/
│ ├── orders/
├── common/
│ ├── middlewares/
├── config/
├── server.ts


---

# ⚙️ Установка и запуск

## 1. Установка зависимостей
```bash
npm install

2. Настройка окружения

Создать файл .env:

DATABASE_URL=postgresql://postgres:password@localhost:5432/my_new_db
JWT_SECRET=supersecretkey

3. Настройка Prisma

npx prisma generate
npx prisma db push

4. Запуск проекта

npm run dev

🔥 API Endpoints

🔐 Auth

POST /auth/signup   - регистрация
POST /auth/login    - вход

📦 Products (требует JWT)

GET    /products        - получить все товары
POST   /products        - создать товар
GET    /products/:id    - получить товар по ID
PUT    /products/:id    - обновить товар
DELETE /products/:id    - удалить товар

🧾 Orders (требует JWT)

POST /orders    - создать заказ
GET  /orders    - получить заказы

🔐 Авторизация

Все защищённые маршруты требуют JWT токен:

Authorization: Bearer <token>

🧠 Как работает система

Пользователь регистрируется
Логин → получает JWT токен
Токен используется для доступа к защищённым API
Заказы и товары привязаны к пользователю


🚀 Автор

Проект разработан в процессе обучения backend-разработке.

📌 Статус проекта

✔ Auth — готов
✔ Products — готов
✔ Orders — готов
⚙️ Улучшения (roles, refresh token, swagger) — в разработке