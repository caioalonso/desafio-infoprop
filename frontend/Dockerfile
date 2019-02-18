FROM node:11.9.0-alpine
RUN apk update && apk add yarn git g++ make && rm -rf /var/cache/apk/*
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ADD package.json /app/package.json
RUN yarn
ADD . /app
EXPOSE 8080
RUN yarn build
CMD ["yarn", "dev"]