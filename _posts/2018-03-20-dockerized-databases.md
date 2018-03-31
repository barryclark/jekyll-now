---
layout: post
title: Dockerizing databases
date: 2018-03-20
author: Dorian 
categories: [Javascript]
published: false
---

# Dockerized application deployment

So this was my first hands-on experience with docker. It's a technology that has become huge in the last few years, and I was curious to see what all the fuss was about. 

## Continuous Deployment

My use-case for Docker is to make deploying a [Knowledge Repo](https://github.com/airbnb/knowledge-repo) at my organization easier. The webserver being deployed is a flask webserver+database, and since the application wasn't too advanced this meant I could focus on learning Docker. The added value would be making testing on my laptop have the same environment (docker) as the server it would be deployed to. I also wanted to try out a continuous deployment workflow, which means that when code is committed to git, the rest of the deployment process is completely automated. 

Automated deployment means time for development and features, but implementing it does involve a time and knowledge investment initially. How do I automatically test/build/deploy my code? For each of these steps there are lots of solutions on the market, but your organization problems supports a certain tool for each one. In my case, Gitlab is the code repository, Jenkins as the build server which performs automated testing, Docker for building and "packaging", and Nolio for deployment to the production server. 

# img

There are lots of articles to be found about how to achieve continuous deployment, but the picture above is how I currently envision my own setup. 

## What's the deal with docker?

## Docker for dummies

```console
dorian@localhost:~/workspace$ docker images
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
jupyter/base-notebook   latest              f8002b8c66eb        2 days ago          696MB
mariadb                 latest              ea5e726062ce        2 weeks ago         396MB
```

## Connecting our containers

```bash
#!/bin/bash

# Starting database container
docker run \
    --name mariadb \
    -e MYSQL_ROOT_PASSWORD=password \
    -e MYSQL_DATABASE=test_db \  # this creates an empty db
    -v ~/workspace/mariadb_data:/var/lib/mysql \  # persisting data
    --rm \  # deletes container when stopped
    -d mariadb  # runs without prompt (detached mode)

# Starting second container for testing connectivity
docker run \
    --name jupyter \
    --link mariadb \  # add db container to this ones network
    -v ~/workspace/notebooks:/home/jovyan/notebooks \
    -it \  # runs with interactive console
    --rm \  # deletes container when stopped
    -p 8888:8888 \  # exposes port 8888 to host system
    jupyter/base-notebook
```
