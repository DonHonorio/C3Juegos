#!/bin/sh

# Crear enlace simbólico para que los logs de Laravel vayan a stdout
rm -rf /var/www/html/storage/logs/laravel.log
ln -sf /dev/stdout /var/www/html/storage/logs/laravel.log

# Ejecutar migraciones
php artisan migrate --force

# Cachear configuración
php artisan config:cache
php artisan route:cache

# Iniciar PHP-FPM en background
php-fpm -D

# Iniciar Nginx en foreground
nginx -g "daemon off;"
