FROM node:lts-bullseye as builder
WORKDIR /home/node
USER node
COPY --chown=node:staff package.json .
RUN npm i
COPY --chown=node:staff webpack.config.js .
COPY --chown=node:staff src src
RUN npm run build

FROM nginx:1.19
WORKDIR /etc/nginx
COPY nginx.conf .
COPY default.conf conf.d
COPY --from=builder --chown=nginx:staff /home/node/dist dist
COPY --chown=nginx:staff docs /usr/share/nginx/html
