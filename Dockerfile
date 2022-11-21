FROM node:18.12.0

WORKDIR /vln/app

COPY package*.json /vln/app/

RUN npm ci

EXPOSE 3013

COPY . .

CMD ["npm", "run", "go:dev"]
