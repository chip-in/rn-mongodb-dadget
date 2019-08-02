FROM node:8-alpine

ENV CI_HOME=/usr/local/chip-in
ENV DADGET_VERSION=0.1.4-d1

RUN apk update \
  && apk --update add openssl \
  && apk add ca-certificates wget \
  && update-ca-certificates
RUN mkdir -p ${CI_HOME}/ \
  && cd ${CI_HOME} \
  && wget -qO - https://github.com/chip-in/rn-mongodb-dadget/archive/v${DADGET_VERSION}.tar.gz | tar zxf - \
  && ln -s rn-mongodb-dadget-${DADGET_VERSION}/dadget-server dadget-server \
  && cd dadget-server \
  && npm install \
  && npm run build
WORKDIR ${CI_HOME}/dadget-server
ENTRYPOINT ["npm", "start", "--"]

