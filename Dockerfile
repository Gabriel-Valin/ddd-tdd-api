FROM node:18.12.0

WORKDIR /ddd

COPY package*.json /ddd/

RUN npm ci

EXPOSE 3013

COPY . .

CMD ["npm", "run", "go:dev"]
