FROM node:8.5-alpine

LABEL maintainer "Michael J. Herold <michael@michaeljherold.com>"

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install --production && \
    adduser -u -9000 -D app

COPY engine.json /
COPY . ./
RUN chown -R app:app ./

USER app

VOLUME /code
WORKDIR /code

CMD ["/usr/src/app/bin/codeclimate-sass-lint"]
