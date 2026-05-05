FROM nginx:1.25-alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY src/index.html /usr/share/nginx/html/index.html
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80
