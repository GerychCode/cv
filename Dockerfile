# === ЕТАП 1: Збірка ===
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Виконуємо збірку
RUN npm run build

# === ЕТАП 2: Роздача ===
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

# ПЕРЕВІРКА:
# Якщо у тебе Create React App — заміни /app/dist на /app/build
# Якщо у тебе Vite — залиш /app/dist
COPY --from=build /app/dist ./dist

EXPOSE 1488

# Запускаємо сервер
CMD ["serve", "-s", "dist", "-l", "1488"]