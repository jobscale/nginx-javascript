FROM nginx:mainline
WORKDIR /etc/nginx
COPY nginx.conf .
COPY default.conf conf.d
COPY src js
COPY --chown=nginx:staff docs /usr/share/nginx/html
