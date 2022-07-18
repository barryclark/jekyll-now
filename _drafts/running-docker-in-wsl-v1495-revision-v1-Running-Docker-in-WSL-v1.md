---
id: 553
title: 'Running Docker in WSL v1'
date: '2022-06-26T15:00:28+00:00'
author: Ryan
layout: revision
guid: 'https://geekyryan.com/?p=553'
permalink: '/?p=553'
---

I have somewhat of a niche issue, where I have no network connectivity while connecting to my work VPN inside of WSL v2. I have found others complaining about this issue on Github. Though no one seems to know how to fix it and I have not had the time to properly investigate.

Because of this, I’m required to continue using WSL v1. Though, with WSL v1, Docker does not work. I receive this nice message:

```
<pre class="wp-block-code">```
$ docker

The command 'docker' could not be found in this WSL 1 distro.
We recommend to convert this distro to WSL 2 and activate
the WSL integration in Docker Desktop settings.

See https://docs.docker.com/docker-for-windows/wsl/ for details.
```
```

So I’m in somewhat of a catch-22 here…

To work around this problem until a proper solution is found, I was able to get Docker working with WSL v1.

If you happen to be having a similar issue (and it seems like quite a few people are, considering the number of Github posts I found), just follow these steps:

- Expose the Docker daemon in docker desktop settings:

<figure class="wp-block-image size-large is-style-default has-lightbox">![](https://geekyryan.com/wp-content/uploads/2022/02/image-10-1024x585.png)</figure>Install the stand-alone Docker client in WSL v1:

```
<pre class="wp-block-code">```
$ wget https://download.docker.com/linux/static/stable/x86_64/docker-20.10.5.tgz
$ tar zxvf docker-20.10.5.tgz
$ cd docker
```
```

Set the default Docker daemon in WSL v1:

```
<pre class="wp-block-code">```
export DOCKER_HOST=tcp://localhost:2375
```
```

Verify you can connect to Docker running on Windows from within WSL:

```
<pre class="wp-block-code">```
./docker info
```
```

This is also beneficial in that you only have one Docker host to manage your containers, network, etc., rather than two.