FROM node:18-alpine AS builder
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_GRAPHQL_ENDPOINT="https://duck.sch.bme.hu/api/graphql"
ENV REACT_APP_IMAGE_ENDPOINT="http://duck.sch.bme.hu:8081/images"
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]