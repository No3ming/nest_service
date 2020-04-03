# build stage
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:lts-alpine AS production-stage
RUN apk add --no-cache bash
MAINTAINER lidongming
LABEL description="文章管理后台"
WORKDIR /data/service/nest_service/
COPY --from=build-stage /app/node_modules/ /data/service/nest_service/node_modules/
COPY --from=build-stage /app/dist/ /data/service/nest_service/dist/
COPY --from=build-stage /app/production.env /data/service/nest_service/production.env
COPY --from=build-stage /app/development.env /data/service/nest_service/development.env
CMD ["node", "dist/main"]
EXPOSE 3000