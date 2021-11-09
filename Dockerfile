FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 8000

CMD [ "node", "index.js" ]
