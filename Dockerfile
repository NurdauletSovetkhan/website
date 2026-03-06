# Use PHP with Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html/

# Enable Apache mod_rewrite (if needed)
RUN a2enmod rewrite

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
