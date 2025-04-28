FROM node:20.19-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 80
CMD ["npx", "serve", "-s", "dist"]