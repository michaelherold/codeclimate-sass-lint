FROM node:8.5-alpine

LABEL maintainer "Michael J. Herold <michael@michaeljherold.com>"

WORKDIR /usr/src/app
COPY engine.json /
COPY package*.json ./

RUN npm install --silent && \
  adduser -u 9000 -D app

COPY . ./
RUN chown -R app:app ./

USER app

VOLUME /code
WORKDIR /code

CMD ["/usr/src/app/bin/codeclimate-sass-lint"]
