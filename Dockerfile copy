FROM 784470602602.dkr.ecr.us-east-1.amazonaws.com/node-chrome-base:latest
WORKDIR /app
ADD . /app

RUN npm install

CMD npm run test && npm run generate-report:cucumber-html
