FROM node:18-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
CMD ["npm", "run", "start"]