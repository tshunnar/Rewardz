FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
