FROM starefossen/github-pages
MAINTAINER Scott Speights
ARG http_proxy=http://10.12.1.236:8083/
ARG https_proxy=http://10.12.1.236:8083/
VOLUME .:/usr/src/app
WORKDIR /usr/src/app





