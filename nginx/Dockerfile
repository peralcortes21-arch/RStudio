FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY src/index.html /usr/share/nginx/html/index.html
COPY src/images/ /usr/share/nginx/html/images/ 2>/dev/null || true
COPY assets/ /usr/share/nginx/html/assets/ 2>/dev/null || true

EXPOSE 80
