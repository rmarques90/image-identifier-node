FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 30001

CMD ["node", "index.js"]