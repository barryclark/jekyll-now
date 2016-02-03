---
layout: post
title: Docker volumes in one minute
---

A volume is a folder within a container that can be accessed ( read and write ) by the docker host.

A volume can be specified inside the Dockerfile :

```
VOLUME /var/www
```

Each time we a container ( using the "run" command ) from this image, the content of the container folder "/var/www" is copied to the host file system ( usually in "/var/lib/docker/volumes" ). You can use the following command to locate the volume on your host :

```
docker inspect [container]
```

The location of the volumes on the host can be found in the section "Mounts" :

```
"Mounts": [
        {
            "Name": "c8f4ee658ecd4f1d9871bdec968a1d330eba7a0eeda24c1bb158fff416d5e25b",
            "Source": "/var/lib/docker/volumes/c8f4ee658ecd4f1d9871bdec968a1d330eba7a0eeda24c1bb158fff416d5e25b/_data",
            "Destination": "/var/www",
            "Driver": "local",
            "Mode": "",
            "RW": true
        }
    ]
```

Any modification in this host folder affects the docker container, and any modification in the container folder affects this host shared folder.

It is possible to set the volumes when the "run" command is executed, directly for the current container only, using the -v option :

```
docker run --name container -i -t -d -v /var/www image
```

The container folder "/var/www" is available on the host at /var/lib/docker/volumes.

Then, we can also mount a host folder inside a container :

```
docker run --name container -i -t -d -v /home/jean/site:/var/www image
```

This command mounts the local folder "/home/jean/site" inside the folder "/var/www" of the Docker container.
