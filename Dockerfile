# === ЕТАП 1: Збірка ===
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Запускаємо білд
RUN npm run build

# ЦЕЙ РЯДОК ПОКАЖЕ НАМ ПРАВДУ В ЛОГАХ
RUN ls -la /app

# === ЕТАП 2: Роздача ===
FROM node:20-alpine

WORKDIR /app
RUN npm install -g serve

# Тимчасово закоментуй цей рядок, якщо білд знову впаде,
# щоб просто побачити лог 'ls -la' з попереднього етапу
COPY --from=build /app/dist ./dist

EXPOSE 1488
CMD ["serve", "-s", "dist", "-l", "1488"]