FROM node:22

# Node user already exists

USER node

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]