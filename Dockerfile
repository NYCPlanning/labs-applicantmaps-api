FROM node:16-bullseye

WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
RUN npm i --location=global nodemon
RUN yarn

COPY . .
