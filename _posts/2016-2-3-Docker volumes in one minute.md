---
layout: post
title: Docker volumes in one minute
---

A volume is a folder within a container that can be accessed ( read and write ) by the docker host.

A volume can be specified inside the Dockerfile :

```docker
VOLUME /var/www
```

Each time we "run" a container ( using the run command ) from this image, the content of the folder /var/www inside the container will be copied from the container to the host file system ( usually in /var/lib/docker/volumes ). You can use the following command to locate the volume on your host :

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

Any modification on the host inside this folder will affect the docker container, and any modification inside the container folder will affect this shared folder on the host.
