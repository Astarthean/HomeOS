# ─────────────────────────────────────────────────────
# Stage 1: dev
# ─────────────────────────────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto de NestJS (por defecto 3000)
EXPOSE 3000

# Ejecutar NestJS en modo watch
CMD ["npm", "run", "start:dev"]

