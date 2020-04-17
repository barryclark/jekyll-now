---
layout: post
title: How to Install Docker On Ubuntu 20.04 LTS Focal Fossa
---

##### 一、Install Docker From a standard Ubuntu Repository
###### 1. 查看`kernel`版本：
```shell
itaas@ubuntu:~$ uname -a
Linux ubuntu 5.4.0-21-generic #25-Ubuntu SMP Sat Mar 28 13:10:28 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```
###### 2. 查看驱动
```shell
itaas@ubuntu:~$ ls -l /sys/class/misc/device-mapper
lrwxrwxrwx 1 root root 0 Apr 14 21:17 /sys/class/misc/device-mapper -> ../../devices/virtual/misc/device-mapper
```
###### 1. 使用`apt`命令安装`docker.io`
```shell
sudo apt install docker.io -y
```
###### 2. 启动docker且`enable`到开机启动:
```shell
sudo systemctl enable --now docker
```
###### 3. 可选给指定用户管理员权限运行docker：
```shell
sudo usermod -aG docker itaas  //必须重启docker服务后生效
sudo systemctl restart docker

//另外一种方法：
sudo groupadd docker
sudo gpasswd -a itaas docker
sudo systemctl restart docker
```
###### 4. 检查docker版本： 
```shell
itaas@ubuntu:~$ docker --version
Docker version 19.03.8, build afacb8b7f0
```
###### 5. 使用`hello-world`的container测试docker
```shell
itaas@ubuntu:~$ sudo docker run hello-world
sudo docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
1b930d010525: Pull complete 
Digest: sha256:f9dfddf63636d84ef479d645ab5885156ae030f611a56f3a7ac7f2fdd86d7e4e
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
 
 ---------------------------------------------------
itaas@ubuntu:~$ sudo docker run ubuntu echo "hello world!!!"
sudo docker run ubuntu echo "hello worldsudo docker ps -a!"
Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
5bed26d33875: Pull complete 
f11b29a9c730: Pull complete 
930bda195c84: Pull complete 
78bf9a5ad49e: Pull complete 
Digest: sha256:bec5a2727be7fff3d308193cfde3491f8fba1a2ba392b7546b43a051853a341d
Status: Downloaded newer image for ubuntu:latest
hello world
```

##### 二、使用Docker公司维护的版本
###### 1. 检查apt的https支持，查看/usr/lib/apt/methods/https文件是否存在，如果不存在，运行安装命令
```shell
itaas@ubuntu:~$ ls -l /usr/lib/apt/methods/https 
lrwxrwxrwx 1 root root 4 Apr 15  2020 /usr/lib/apt/methods/https -> http*
```
如果文件不存在：
```shell
sudo apt-get install -y curl
sudo curl -sSL https://get.docker.com/ubuntu/ | sudo sh
```
