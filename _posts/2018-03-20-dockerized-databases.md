---
layout: post
title: Dockerizing databases
date: 2018-03-20
author: Dorian 
categories: [Javascript]
published: true
---

# Dockerizing databases

```console
dorian@localhost:~$ docker pull mariadb
Using default tag: latest
latest: Pulling from library/mariadb
f2b6b4884fc8: Pull complete 
26d8bdca4f3e: Pull complete 
74f09e820cce: Pull complete 
5390f1fe4554: Pull complete 
3d3f1706a741: Pull complete 
2942f66426ea: Pull complete 
97ee11d39c75: Pull complete 
5f3d3e597bc0: Pull complete 
717718e492b1: Pull complete 
dba2794b394b: Pull complete 
b66b4021503c: Pull complete 
Digest: sha256:f5e93cd79cb34d7a34da1af1e11ef9bfdbcdac629f4a50c59c69b913b061fea7
Status: Downloaded newer image for mariadb:latest
dorian@localhost:~$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mariadb             latest              ea5e726062ce        6 days ago          396MB

```

## Installing mariadb docker image
