# services/finance/Dockerfile

FROM php:8.3-cli-alpine

WORKDIR /app

RUN apk add --no-cache icu-dev libzip-dev postgresql-dev git unzip \
    && docker-php-ext-install intl pdo pdo_pgsql zip opcache

# Instalar Composer
COPY --from=composer:2.9 /usr/bin/composer /usr/bin/composer

COPY . .

EXPOSE 8000

CMD sh -c "composer install && php -S 0.0.0.0:8000 -t public"