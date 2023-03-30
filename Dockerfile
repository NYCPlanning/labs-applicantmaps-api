FROM node:16-bullseye

WORKDIR /usr/app
COPY package.json .
RUN npm i --quiet
RUN npm i --location=global nodemon

COPY . .
