---
layout: post
title: Dockerizing databases
date: 2018-03-20
author: Dorian 
categories: [Javascript]
published: false
---

# Dockerizing databases

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
