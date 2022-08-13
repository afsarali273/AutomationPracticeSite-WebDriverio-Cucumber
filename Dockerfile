FROM node:alpine
WORKDIR /app
ADD . /app

RUN npm install

# CMD npm run test && npm run generate-report:cucumber-html
CMD npm run test
