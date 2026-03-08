# ─────────────────────────────────────────────────────
# Stage 1: dev
# ─────────────────────────────────────────────────────
FROM node:20-alpine AS dev

WORKDIR /app

# Instalar dependencias necesarias para Expo
RUN apk add --no-cache bash

# Instalar dependencias del proyecto
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de Metro Bundler (8081)
EXPOSE 8081

# Variables para que Expo funcione correctamente en Docker
ENV EXPO_DEV_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=localhost

# Ejecutar expo en modo desarrollo
CMD ["npx", "expo", "start", "--tunnel"]
