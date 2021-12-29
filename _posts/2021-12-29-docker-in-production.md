---
title: "Docker in Production"
date: 2021-12-29T13+01:00
---

Use Official Images as Base Image

for security and cleaner 


Do not use the `latest` tag but use specific version tags -- it wil lmake your pull result more predictable.

Use lean and small OS distributions like Alpine.

### Optimize caching image layer

Use `docker history IMAGE_NAME` to view the layers and their respective sizes:

    a48f1cbb24cf   3 years ago   /bin/sh -c #(nop)  ENTRYPOINT ["preentry.sh"]   0B
    <missing>      3 years ago   /bin/sh -c #(nop) COPY file:3a07244e024c4710…   520B
    <missing>      3 years ago   /bin/sh -c addgroup -g 2999 docker              1.46kB
    <missing>      3 years ago   /bin/sh -c apk add --no-cache ca-certificates   64.5kB
    <missing>      3 years ago   /bin/sh -c #(nop)  CMD []                       0B
    <missing>      3 years ago   /bin/sh -c #(nop)  ENTRYPOINT ["dockerd-entr…   0B

Order the commands from least to most frequent changes, for example:

    COPY ./requirements.txt /app/requirements.txt
    RUN pip install --no-cache-dir --upgrade -r requirements.txt
    COPY server.py /app/

First, copy the requirements and do the install. After that, copy your application code. Thus the dependencies will not be installed again when something in your app changes.  

Use the `.dockerignore` file to prevent unneccessary files to be included into the image. Everything that is used to build the image does nt need to be in the image.
Separate **build stage** from the **runtime stage**:

```Dockerfile
# Build stage

FROM maven AS build
WORKDIR /app
COPY myapp /app
RUN mvn package

# Run stage
FROM tomcat
COPY --from-build /app/target/file.war /usr/local/tomcat/web-app/
```

Use a dedicated, less priviledged user to run the application inside the container. For example, the `node` image has a user `node` which can be used to run the app:

```Dockerfile
FROM node:10-alpine
RUN chown -R node:node /app
USER node
```


## Check for security vulnerability

`docker scan` 

Everything is explained in-depth by the wonderful Youtube channel [Techworld with Nana](https://youtu.be/8vXoMqWgbQQ).
