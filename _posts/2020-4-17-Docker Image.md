---
layout: post
title: Docker Image
---

# 容器镜像
##### 15 如何查看和删除镜像
>Docker Image镜像：
>容器的基石
>层叠的制度文件系统
>联合加载（union mount）

![67a02dbd5cdfe8c8426b8050525f1af4.png](en-resource://database/1540:1)

>Docker信息：
```
# docker info
Client:
 Debug Mode: false

Server:
 Containers: 13
  Running: 1
  Paused: 0
  Stopped: 12
 Images: 3
 Server Version: 19.03.8
 Storage Driver: overlay2
  Backing Filesystem: <unknown>
  Supports d_type: true
  Native Overlay Diff: true
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 
 runc version: 
 init version: 
 Security Options:
  apparmor
  seccomp
   Profile: default
 Kernel Version: 5.4.0-21-generic
 Operating System: Ubuntu Focal Fossa (development branch)
 OSType: linux
 Architecture: x86_64
 CPUs: 2
 Total Memory: 1.914GiB
 Name: ubuntu
 ID: FMRX:YQAC:BFRN:ETDY:DMK6:7XOJ:VQCM:IEY4:FOJK:GEDE:6B54:7TAR
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Live Restore Enabled: false

WARNING: No swap limit support
```

>镜像存储位置：
>
```
/var/lib/docker/
```


> 列出镜像
```shell
$ docker images -a  //详细
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              4e5021d210f6        3 weeks ago         64.2MB
centos              latest              470671670cac        2 months ago        237MB
hello-world         latest              fce289e99eb9        15 months ago       1.84kB
```
```shell
$ docker images -a --no-trunc   //不截断
REPOSITORY          TAG                 IMAGE ID                                                                  CREATED             SIZE
ubuntu              latest              sha256:4e5021d210f65ebe915670c7089120120bc0a303b90208592851708c1b8c04bd   3 weeks ago         64.2MB
centos              latest              sha256:470671670cac686c7cf0081e0b37da2e9f4f768ddc5f6a26102ccd1c6954c1ee   2 months ago        237MB
hello-world         latest              sha256:fce289e99eb9bca977dae136fbe2a82b6b7d4c372474c9235adc1741675f587e   15 months ago       1.84kB
```
```shell
$ docker images -a -q   //只看截断
4e5021d210f6
470671670cac
fce289e99eb9
```

>仓库：REPOSITORY，一系列镜像的集合，例如Ubuntu包括很多版本的集合
>仓库？：REGISTRY，docker镜像的`存储`服务
>TAG：ubuntu:14.04, ubuntu:latest

>查看centos镜像
```shell
$ docker images centos
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
centos              latest              470671670cac        2 months ago        237MB
```

>使用`inspect`查看镜像详细信息：
```shell
$ docker inspect ubuntu:latest
[
    {
        "Id": "sha256:4e5021d210f65ebe915670c7089120120bc0a303b90208592851708c1b8c04bd",
        "RepoTags": [
            "ubuntu:latest"
        ],
        "RepoDigests": [
            "ubuntu@sha256:bec5a2727be7fff3d308193cfde3491f8fba1a2ba392b7546b43a051853a341d"
        ],
        "Parent": "",
        "Comment": "",
        "Created": "2020-03-20T19:20:22.835345724Z",
        "Container": "f35b3af588999f5c47b8132845d7e6c3a220cedac21a8dada926f41de36eef55",
        ……
```

>删除镜像，-f强制删除，--no-pune默认不删除untaged parent镜像
>查看hello-world镜像
```shell
$ docker images hello-world
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              fce289e99eb9        15 months ago       1.84kB
```
>如果使用中的镜像，不允许删除：
```shell
$ docker rmi hello-world
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container 4701ad8080a3 is using its referenced image fce289e99eb9
```
>使用`TAG的名字`只删除标签：
```shell
$ docker rmi hello-world
Untagged: hello-world:latest
Untagged: hello-world@sha256:f9dfddf63636d84ef479d645ab5885156ae030f611a56f3a7ac7f2fdd86d7e4e
Deleted: sha256:fce289e99eb9bca977dae136fbe2a82b6b7d4c372474c9235adc1741675f587e
Deleted: sha256:af0b15c8625bb1938f1d7b17081031f649fd14e6b233688eea3c5483994a66a3
```

>查看docker images
```shell
$ docker images -a
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              4e5021d210f6        3 weeks ago         64.2MB
centos              latest              470671670cac        2 months ago        237MB
hello-world         latest              fce289e99eb9        15 months ago       1.84kB
```
>使用`IMAGE ID`删除：
```shell
$ docker rmi fce289e99eb9
Error response from daemon: conflict: unable to delete fce289e99eb9 (must be forced) - image is being used by stopped container c6508810a656

$ docker rmi -f fce289e99eb9
Untagged: hello-world:latest
Untagged: hello-world@sha256:f9dfddf63636d84ef479d645ab5885156ae030f611a56f3a7ac7f2fdd86d7e4e
Deleted: sha256:fce289e99eb9bca977dae136fbe2a82b6b7d4c372474c9235adc1741675f587e
```
