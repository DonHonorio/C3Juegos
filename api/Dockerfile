FROM php:8.2-fpm-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache \
    nginx \
    curl \
    zip \
    unzip \
    git \
    nodejs \
    npm

# Instalar extensiones PHP necesarias para Laravel
RUN docker-php-ext-install pdo pdo_mysql bcmath

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Permisos
RUN chown -R www-data:www-data storage bootstrap/cache

# Copiar configuración de nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Script de arranque
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8000

CMD ["/start.sh"]