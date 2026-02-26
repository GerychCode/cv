# === ЕТАП 1: Збірка ===
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Команда створює папку /app/build
RUN npm run build

# === ЕТАП 2: Роздача ===
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

# Копіюємо з папки build (яку створив react-scripts)
# і кладемо її в папку dist для сервера serve
COPY --from=build /app/build ./dist

EXPOSE 1488

# Запускаємо сервер на порту 1488
CMD ["serve", "-s", "dist", "-l", "1488"]