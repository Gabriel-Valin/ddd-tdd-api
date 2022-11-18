FROM node:18.12.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3013

CMD ["npm", "run", "go:dev"]
