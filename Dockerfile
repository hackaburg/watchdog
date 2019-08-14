FROM node:alpine

WORKDIR /watchdog
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./

USER node
CMD [ "node", "index.js" ]
