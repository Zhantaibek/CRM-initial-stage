FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g tsconfig-paths

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 5000

CMD ["sh", "docker-entrypoint.sh"]