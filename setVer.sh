#!/bin/sh
if [ $# -ne 1 ]; then
  echo "a version number required" 1>&2
  exit 1
fi
if [[ ! "$1" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-d[0-9]+)?$ ]]; then
  echo "a correct version number required" 1>&2
  exit 1
fi

sed -i -e "s/\(chipin\/rn-mongodb-dadget:v\)[0-9]\+\.[0-9]\+\.[0-9]\+\(-d[0-9]\+\)\?/\1$1/" docker-compose.yml
sed -i -e "s/\(\"version\": \)\"[0-9]\+\.[0-9]\+\.[0-9]\+\(-d[0-9]\+\)\?\",/\1\"$1\",/" dadget-server/package.json
sed -i -e "s/\(\"@chip-in\/dadget\": \)\"[0-9]\+\.[0-9]\+\.[0-9]\+\(-d[0-9]\+\)\?\"/\1\"$1\"/" dadget-server/package.json
sed -i -e "s/\(DADGET_VERSION=\)[0-9]\+\.[0-9]\+\.[0-9]\+\(-d[0-9]\+\)\?/\1$1/" dadget-docker/Dockerfile
