# ─────────────────────────────────────────────────────
# Stage 1: deps
# Instala extensiones PHP y paquetes de Composer.
# Se reutiliza como base para dev y prod.
# ─────────────────────────────────────────────────────
FROM php:8.3-cli-alpine AS deps

RUN apk add --no-cache icu-dev libzip-dev postgresql-dev \
    && docker-php-ext-install intl pdo pdo_pgsql zip opcache

COPY --from=composer:2.9 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copiar solo los manifests primero.
# Docker reutiliza esta capa si composer.json y composer.lock no cambian,
# evitando reinstalar dependencias en cada cambio de código fuente.
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --prefer-dist

COPY . .
RUN composer dump-autoload --optimize


# ─────────────────────────────────────────────────────
# Stage 2: dev
# Servidor built-in de PHP. Solo para desarrollo local.
# ─────────────────────────────────────────────────────
FROM deps AS dev

EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]


# ─────────────────────────────────────────────────────
# Stage 3: prod
# PHP-FPM. Requiere Nginx como reverse proxy en docker-compose.
# ─────────────────────────────────────────────────────
FROM php:8.3-fpm-alpine AS prod

RUN apk add --no-cache icu-dev libzip-dev postgresql-dev \
    && docker-php-ext-install intl pdo pdo_pgsql zip opcache

WORKDIR /app
COPY --from=deps /app /app

EXPOSE 9000
CMD ["php-fpm"]
