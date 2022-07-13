FROM node:16-alpine

USER root

WORKDIR /home/app

COPY . .

EXPOSE 3000