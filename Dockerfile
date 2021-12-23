FROM node:14 as builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig.json ./

USER node
RUN npm install

COPY --chown=node:node . .
RUN npm run build

EXPOSE 3000
CMD [ "node", "build/server.js" ]
