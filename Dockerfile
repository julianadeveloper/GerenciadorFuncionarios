FROM node:14-alpine

USER root

WORKDIR /home/app

COPY . .

EXPOSE 3000