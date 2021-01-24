---
layout: post
title:  "Dockers"
---

# What ? intro ...
Dockers.. think of them as a ship with containers on it. You know which one i am talking about ?... anyway, They are awesome for security of device(embedded).

Docker is a set of services that use OS level virtualization to run self-contained instances of software. wow big sentence !
what that means is i dont have to virtulize the os everytime to run a service like website or ftp server. Each service is virtulized vs OS and Service.

A link to why companies like docker so much [Link](https://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/). Just in case a big ass link <https://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/>

So, i have been doing alot of studies on dockers. They are really easy to use and deploy.I was able to deploy my home automation server on raspi b + with docker!

FROM ubuntu:18.04
COPY . /app
RUN make /app
CMD python /app/app.py


    FROM creates a layer from the ubuntu:18.04 Docker image.
    COPY adds files from your Docker client’s current directory.
    RUN builds your application with make.
    CMD specifies what command to run within the container.
Source:[Link](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
