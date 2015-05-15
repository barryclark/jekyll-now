---
layout: post
title: 通过Swarm构建一个小型WEB站点
---

## 部署结构

典型的WEB站点一般是由负载均衡器（LB）负载接收用户的http请求，根据路由配置把请求交给后端的APP服务器进行真正的业务处理。

这种结构的好处总的来说有三个：

- LB可以把流量平摊给后端APP服务器，从而实现水平可扩展;
- 同时还可以监听后端APP服务器的监控状况，把有问题的APP摘除；

```
                              |----- service nginx 1 -----
internet --- proxy nginx--- |
                              |----- service nginx 2 -----
```

## 准备设备

我们通过vagrant来初始化CoreOS虚机机来模拟Swarm集群，因为资源有限，我创建3个虚拟机来模拟集群。首先需要下载vagrant配置：```https://github.com/coreos/coreos-vagrant.git```。

然后修改```config.rb```文件：

```
# Size of the CoreOS cluster created by Vagrant
$num_instances=3

# Customize VMs
#$vm_gui = false
$vm_memory = 512
$vm_cpus = 1
```

然后通过```vagrant up```命令即可完成三个虚拟机的创建工作：

```
└─[0 :)]>vagrant up core-03
Bringing machine 'core-03' up with 'virtualbox' provider...
==> core-03: Importing base box 'coreos-stable'...
==> core-03: Matching MAC address for NAT networking...
==> core-03: Setting the name of the VM: coreos-vagrant_core-03_1431600086998_48078
==> core-03: Fixed port collision for 22 => 2222. Now on port 2201.
==> core-03: Clearing any previously set network interfaces...
==> core-03: Preparing network interfaces based on configuration...
    core-03: Adapter 1: nat
    core-03: Adapter 2: hostonly
==> core-03: Forwarding ports...
    core-03: 22 => 2201 (adapter 1)
```

## 准备镜像

因为我们是通过Swarm来搭建nginx，所以我们需要下载两个镜像：

```
docker pull swarm
docker pull nginx
```

因为墙的原因，下载可能会受到影响，可以通过之前提到的```docker save```和```docker load```命令在多个设备之间传递镜像文件：

```
docker save -o /path/share/swarm.image swarm
docker load -i /path/share/swarm.image
```

## 初始化Swarm集群

现在准备工作已经就绪，接下来我们开始创建Swarm集群。Swarm默认的集群工作模式是通过docker官方的Discovery HUB实现的，这个需要自备梯子。而且对于自建的Swarm集群，也不会通过docker官方的Discovery，一般会通过ZK等机制来搭建Discovery。这里考虑复杂性，我们通过静态IP的方式来构建Swarm集群。

因为静态IP发现机制，需要agent节点先进行配置，需要打开Remote API端口：

```
core@core-02 ~ $ sudo cp /usr/lib64/systemd/system/docker.service /etc/systemd/system/
core@core-02 ~ $ sudo vi /etc/systemd/system/docker.service
core@core-02 ~ $ sudo systemctl daemon-reload
core@core-02 ~ $ sudo systemctl restart docker
core@core-02 ~ $ ps -ef | grep docker
root      9379     1  1 00:12 ?        00:00:00 docker --daemon --host=fd:// -H 172.17.8.102:12375

core@core-03 ~ $ sudo cp /usr/lib64/systemd/system/docker.service /etc/systemd/system/
core@core-03 ~ $ sudo vi /etc/systemd/system/docker.service
core@core-03 ~ $ sudo systemctl daemon-reload
core@core-03 ~ $ sudo systemctl restart docker
core@core-03 ~ $ ps -ef | grep docker
root      3072     1  2 14:25 ?        00:00:00 docker --daemon --host=fd:// -H 0.0.0.0:12375
```

首先在core-01上部署swarm manager，由它来管理core-02和core-03两个节点。注意由于2375端口被```systemd```进程占用，所以在进行端口映射的时候需要修改一下，同时在指定```nodes```的时候需要设置为修改后的端口：

```
core@core-01 ~ $ docker run -d -p 12375:2375 swarm manage -H tcp://0.0.0.0:2375 nodes://<node_ip1:2375>,<node_ip2:2375>
1c81a3f116f6e0cfa924a11e05e7061635c2806fa99d0937be110cba06b1a4b6
core@core-01 ~ $ docker ps
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS                     NAMES
1c81a3f116f6        swarm:0.2.0         "/swarm manage -H tc   2 seconds ago       Up 1 seconds        0.0.0.0:22375->2375/tcp   insane_bartik
core@core-01 ~ $ docker -H tcp://172.17.8.101:12375 info
Containers: 0
Strategy: spread
Filters: affinity, health, constraint, port, dependency
Nodes: 0
```

## 运行服务

集群已经准备完毕，core-01负责把docker命令分发到core-02和core-03上。首先我们来运行一个nginx容器：

```
core@core-01 ~ $ docker -H tcp://172.17.8.101:12375 run -d nginx
62bad462dfbaddf56fab8b2f3c0a05cb3b4a7496cf0bb6edf11316ec318a686e
```

注意这里的```-H tcp://172.17.8.101:12375```参数，它表示这个docker命令需要连接监听12375端口的```docker daemon```，它其实就是我们刚刚启动的swarm manager节点。

运行完成后，显示容器ID为```62bad462dfbaddf56fab8b2f3c0a05cb3b4a7496cf0bb6edf11316ec318a686e```，这里并看不出有任何集群相关的信息，这个容器具体运行在哪里，可以通过```docker ps```命令查看，当然依然需要携带```-H tcp://172.17.8.101:12375```参数：

```
core@core-01 ~/registry/gcc $ docker -H tcp://172.17.8.101:12375 ps -a
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS                  PORTS               NAMES
62bad462dfba        nginx:1             "nginx -g 'daemon of   9 seconds ago       Up Less than a second   443/tcp, 80/tcp     core-02/jovial_bartik
```

通过```NAME```可以看出，这个nginx容器运行在```core-02```设备上，我们到```core-02```设备上确认一下：

```
core@core-02 ~ $ docker ps
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS               NAMES
62bad462dfba        nginx:1             "nginx -g 'daemon of   7 minutes ago       Up 7 minutes        80/tcp, 443/tcp     jovial_bartik
```

## 构建HA服务集群

现在我们开始搭建文章最开始提到的高可用（HA）WEB站点集群。

首先我们需要一个proxy镜像，配置upstream为两台后端nginx设备，具体配置如下：

```
# For versions of nginx > 1.3.9 that include chunked transfer encoding support
# Replace with appropriate values where necessary

upstream backend {
  server 172.17.8.102:8080;
  server 172.17.8.103:8080;
}

# uncomment if you want a 301 redirect for users attempting to connect
# on port 80
# NOTE: docker client will still fail. This is just for convenience
# server {
#   listen *:80;
#   server_name my.docker.registry.com;
#   return 301 https://$server_name$request_uri;
# }

server {
  listen 80;
  server_name localhost;

  ssl off;
  # ssl_certificate /etc/ssl/certs/docker-registry/docker-registry.com.crt;
  # ssl_certificate_key /etc/ssl/private/docker-registry/docker-registry.com.key;

  client_max_body_size 0; # disable any limits to avoid HTTP 413 for large image uploads

  # required to avoid HTTP 411: see Issue #1486 (https://github.com/docker/docker/issues/1486)
  chunked_transfer_encoding on;

  location / {
    auth_basic            off;
    proxy_pass http://backend;
  }
}
```

然后我们来运行proxy容器：

```
core@core-01 ~ $ docker -H tcp://172.17.8.101:12375 run -d -v /Users/chenfei/tmp/upstream.conf:/etc/nginx/conf.d/default.conf -p 80:80 --name proxy nginx
2f58247e2d8f3352ee12410809ce88e921e8057b11926d805a411dded530a901
```

当然这个时候来访问页面，将会看到```502 Bad Gateway```错误，这是由于```backend```还没有启动导致，接下来启动```backend```容器：

```
core@core-01 ~ $ docker -H tcp://172.17.8.101:12375 run -d -v /Users/chenfei/tmp/html/:/usr/share/nginx/html:ro -p 8080:80 --name backend1 nginx
core@core-01 ~ $ docker -H tcp://172.17.8.101:12375 run -d -v /Users/chenfei/tmp/html/:/usr/share/nginx/html:ro -p 8080:80 --name backend2 nginx
core@core-01 ~ $ docker -H tcp://172.17.8.101:12375 ps
CONTAINER ID        IMAGE               COMMAND                CREATED                  STATUS                  PORTS                                NAMES
36b699800cbf        nginx:1             "nginx -g 'daemon of   Less than a second ago   Up 7 seconds            443/tcp, 172.17.8.103:8080->80/tcp   core-03/backend1
44189240a52a        nginx:1             "nginx -g 'daemon of   5 seconds ago            Up Less than a second   443/tcp, 172.17.8.102:8080->80/tcp   core-02/backend2
2f58247e2d8f        nginx:1             "nginx -g 'daemon of   9 minutes ago            Up 9 minutes            443/tcp, 172.17.8.102:80->80/tcp     core-02/proxy
```

至此简单的WEB站点就搭建完成了，访问界面你将看到```hello world```。

## 后记

大家可以思考几个问题：

- 运行另个backend容器，为什么他们会被运行在不同的两台机器上？
- 高可用架构需要具有哪些特性