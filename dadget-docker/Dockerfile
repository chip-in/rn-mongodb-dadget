FROM node:8-alpine

ENV CI_HOME=/usr/local/chip-in
ENV DADGET_VERSION=0.0.17

RUN apk --update add openssl
RUN mkdir -p ${CI_HOME}/ \
  && cd ${CI_HOME} \
  && wget -qO - https://github.com/chip-in/rn-mongodb-dadget/archive/v${DADGET_VERSION}.tar.gz | tar zxf - \
  && mv rn-mongodb-dadget-${DADGET_VERSION}/dadget-server . \
  && rmdir rn-mongodb-dadget-${DADGET_VERSION} \
  && cd dadget-server \
  && npm install \
  && npm run build
WORKDIR ${CI_HOME}/dadget-server
ENTRYPOINT ["npm", "start", "--"]

