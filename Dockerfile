FROM node:bullseye as builder
WORKDIR /home/node
COPY . .
RUN chown -R node. .
USER node
RUN rm -fr node_modules package-lock.json yarn.lock
RUN npm i
RUN npm run build

FROM ghcr.io/jobscale/nginx-net
WORKDIR /etc/nginx
COPY nginx.conf .
COPY default.conf conf.d
COPY --from=builder /home/node/dist dist
COPY docs /usr/share/nginx/html
RUN chown -R nginx. /usr/share/nginx/html
