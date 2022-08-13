FROM 237245230124.dkr.ecr.us-east-2.amazonaws.com/node-alpine:latest
WORKDIR /app
ADD . /app

RUN npm install

# CMD npm run test && npm run generate-report:cucumber-html
CMD npm run test
