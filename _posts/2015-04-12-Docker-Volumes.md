---
layout: post
name: Docker-Volumes
title: Making Sense of Docker Volumes
date: 2015-04-12 18:31:00 +00:00
author: Toby Retallick
---

[Docker](http://www.docker.com) is a platform that allows users to build, ship, and run distributed applications. Applications are stored inside **docker containers**.

A docker container uses a **Union File System** that consists of read only layers and a read / write layer on top.

Whilst the container is running, it is possible to write information to disk, however when the container is removed that information does not persist.

In order to persist information it is necessary to **mount a volume**. A volume operates outside of the Union File System and allows any information written to the write layer to be copied to the volume. The volume continues to be accessible on the host machine even if the container is removed or no longer running.

Volumes decouple the life of the data being stored in them from the life of the container that created them. 


## Mounting a Volume

Volumes can be mounted to container at run time ...

```
docker run -d -P --name javaContainer -v /myVol bin/echo "Doing java stuff" > /myVol

```

... or from within the docker file.

```
FROM java
RUN mkdir /myvol
RUN echo "Doing java stuff" > /myvol
VOLUME /myvol

```

But what if you have multiple instances of the application that need to access the same volume? You need to make the most of the sharability that Docker provides. 

## The Data Container Pattern

Rather than mounting a volume to your applications' container, the Data Container Pattern follows the single responsibility principle and involves setting up a volume in a separate **data container**. Your application container then points to the data container to read and write information (using the **volume-from** command). This is a common practice when working with databases. 


## The Lifecycle of a Data Container      

The data container only runs whilst it is needed and is largely passive. The application container mounts the volume contained inside the data container, once this is done the data container shuts down as it has done its job.

When creating a data container (e.g for running a database) it's wise to use the same base image in both your application container and data container. This will prevent any file permission issues (the data container will seed the application container will the correct file permissions) … and most efficient approach (since you are reusing the image).

## Further reading
- [Docker Documentation](https://docs.docker.com/userguide/dockervolumes/) 
- [Persistent volumes with Docker - Data-only container pattern](http://container42.com/2013/12/16/persistent-volumes-with-docker-container-as-volume-pattern/)
- [Understanding volumes in Docker](http://container-solutions.com/2014/12/understanding-volumes-docker/)
- [Docker Indepth: Volumes](http://container42.com/2014/11/03/docker-indepth-volumes/)


##Thanks
*Thanks to Rob Taylor for proofing this article*

