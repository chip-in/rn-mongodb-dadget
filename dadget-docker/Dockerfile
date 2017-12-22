FROM centos:7
RUN yum -y update \
    && yum -y install unzip wget sudo lsof telnet bind-utils tar tcpdump vim sysstat strace less
ENV HOME /root
WORKDIR ${HOME}
RUN echo "export TERM=xterm" >> .bash_profile
ENV NODEJS_VERSION=v8.5.0
ENV DADGET_VERSION=0.0.8
RUN wget -qO - https://nodejs.org/dist/${NODEJS_VERSION}/node-${NODEJS_VERSION}-linux-x64.tar.xz | tar xf - -C /usr/local -J \
  && ln -s /usr/local/node-${NODEJS_VERSION}-linux-x64 /usr/local/nodejs
RUN wget -qO - https://github.com/chip-in/rn-mongodb-daget/archive/v${DADGET_VERSION}.tar.gz | tar zxf -
WORKDIR ${HOME}/rn-mongodb-daget-${DADGET_VERSION}/dadget-server
ENV PATH $PATH:/usr/local/nodejs/bin
RUN npm install && npm run build
CMD ["/usr/local/nodejs/bin/node", "lib/server.js"]
