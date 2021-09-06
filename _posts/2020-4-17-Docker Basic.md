---
layout: post
title: Docker Basic
---

###### 03 Docker镜像
```shell
$ docker version    //docker版本
$ docker search tutorial    //寻找tutorial镜像
$ docker pull zhangsan/tutorial     //下载镜像全名
$ docker run zhangsan/tutorial echo "hello world"   //直接使用镜像输出内容
$ docker run zhangsan/tutorial apt-get install -y ping  //在镜像中安装ping命令，在容器的可写层做操作
$ docker ps -l    //得到images的key值
$ docker commit xxx zhangsan/ping    //提交key值
$ docker run zhangsan/ping ping www.google.com
$ docker inspect xxx    //查看镜像json
$ docker push zhangsan/ping     //上传镜像
```
* * *


###### 04 Docker Docker 容器相关技术简介
###### Docker依赖的Linux内核特性
- NameSpace 命名空间

      Namespace又称为命名空间，它主要做访问隔离。其原理是针对一类资源进行抽象，并将其封装在一起提供给一个容器使用，对于这类资源，因为每个容器都有自己的抽象，而他们彼此之间是不可见的，所以就可以做到访问隔离。
      
       Namespace 主要用作环境的隔离，主要有以下namespace：
           UTS:  主机名与域名
           IPC:  信号量、消息队列和共享内存
           PID:  进程编号
           Network:  网络设备、网络栈、端口等等
           Mount:  挂载点
           User:  用户和用户组

- Contrl groups（cgroups）控制组

       Cgroup是control group，又称为控制组，它主要是做资源控制。原理是将一组进程放在放在一个控制组里，通过给这个控制组分配指定的可用资源，达到控制这一组进程可用资源的目的。
       
       Cgroup主要是用作资源的限制，常见的有cpu、内存、blkio等
* * *

###### 07 Ubuntu Docker 在 Ubuntu 中安装 Docker


>Docker版本分为两个：**Docker Community Edition (CE)** 和 **Docker Enterprise Edition (EE)**。Docker CE社区版本适合个人用户使用。Ubuntu18.04下安装Docker CE有如下几种主要方法。


###### 详细查看“How to Install Docker On Ubuntu 20.04 LTS Focal Fossa step by step”文档



* * *
###### 12 Docker容器的基本操作
启动容器：
```shell
$ docker run ubuntu echo 'hello world!!!'
hello world!!!
```
启动交互式容器：
```shell
// -i  --interactive=true|fasle 默认是false
// -t  --tty=true|false 默认是false
$ docker run -it ubuntu /bin/bash
root@ad7337e84e18:/# 
```

查看运行过哪些容器，-a是所有容器，-l是最新的容器：
```
$ docker ps -l
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
ad7337e84e18        ubuntu              "/bin/bash"         3 minutes ago       Exited (0) 29 seconds ago                       determined_hoover
```

查看容器详细检查：
```shell
$ docker inspect ad7337e84e18
```

自动以容器名字，例如centos01：
```shell
$ docker run --name=centos01 -it centos /bin/bash
[root@a51f851619a9 /]# 
```

查看刚刚定义的名字
```shell
$ docker ps -l
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
a51f851619a9        centos              "/bin/bash"         28 seconds ago      Exited (0) 11 seconds ago                       centos01
```

可以检查详细信息：
```shell
$ docker inspect centos01
```

容器重新启动/停止容器：
```shell
$ docker start centos01
centos01

$ docker stop centos01
centos01
```

容器`rm`删除不需要容器，必须先stop后才行，运行中不允许删除：
```shell
$ docker rm centos01
Error response from daemon: You cannot remove a running container a51f851619a932caa943e12c1b08161418c1a7a5f8b913d835e1befdb29f239f. Stop the container before attempting removal or force remove

$ docker stop centos01
centos01

$ docker rm centos01
centos01
```


* * *

###### 13 后台运行容器（守护式）
>能够长期运行
>没有交互式会话
>适合运行应用程序和服务

>以后台运行容器，CTRL+P+Q：
```shell
$ docker run -it --name centos02 centos /bin/bash
```

>附加到运行中的容器：
```shell
$ docker attach centos02 
[root@f65e95a4dfeb /]# 
```

>直接启动`后台`运行容器：
```shell
$ docker run --name centos03 -d centos /bin/bash -c "while true; do echo hello world; sleep 1; done"
2b934779fbb06d50e253c17ce78e0ab8356e3168dd4f1d4e17e80c61c533f965
```

>查看容器日志，-f  --follows=true |false 默认为false，-t  --timestamps=true| false 默认为false， --tail=“all”：
```shell
$ docker logs -tf  centos03
2020-04-15T07:57:04.060674481Z hello world
2020-04-15T07:57:05.062525457Z hello world
2020-04-15T07:57:06.068239915Z hello world
2020-04-15T07:57:07.072123060Z hello world
2020-04-15T07:57:08.078788789Z hello world

$ docker logs -ft --tail 0 centos03
2020-04-15T07:58:25.574406159Z hello world
2020-04-15T07:58:26.583959988Z hello world
2020-04-15T07:58:27.589361808Z hello world
```

>查看运行进程：
```shell
$ docker top centos03
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                5241                5221                0                   00:50               ?                   00:00:00            /bin/bash -c while true; do echo hello world; sleep 1; done
root                6130                5241                0                   00:59               ?                   00:00:00            /usr/bin/coreutils --coreutils-prog-shebang=sleep /usr/bin/sleep 1
```

>在运行中的容器内启动新进程，通过使用`exec`在已经启动的容器中，启动新的进程：
```shell
$ docker exec -itd centos03 /bin/bash
```

>通过使用`stop`和`kill`停止守护式容器：
```shell
$ docker stop centos03  //发送信号，等待停止
$ docker kill centos03    //直接停止
```


* * *

###### 14 在容器中部署静态网站
>网站服务通过80端口提供服务，端口映射。
>-P，--publish-all=true|false 默认为false，所有端口进行映射
```shell
$ docker run -P -it ubuntu /bin/bash
root@989a0c5dd998:/# 
```
>-p，指定端口
>容器Port  
```shell
$ docker run -p 80 -it ubuntu /bin/bash
```
>主机Port:容器Port
```
$ docker run -p 8080:80 -it ubuntu /bin/bash
```
>IP:容器Port
>
```
$ docker run -p 0.0.0.0:80 -it ubuntu /bin/bash
```
> ip:主机Port:容器Port
```
$ docker run -p 0.0.0.0:8080:80 -it ubuntu /bin/bash
```


* * *
###### 创建网站步骤：
>创建映射80端口的交互式容器
>安装Nginx
>安装问吧编辑器vim
>创建静态页面
>修改Nginx配置文件
>运行Nginx
>验证网站访问

```shell
$ docker run -p 80 --name web -it ubuntu /bin/bash
root@64c4701a0e6e:/# sudo apt update
root@64c4701a0e6e:/# sudo apt vim lrzsz net-tools systemd curl

root@64c4701a0e6e:/# cat /etc/issue
Ubuntu 18.04.4 LTS \n \l

root@64c4701a0e6e:/# apt-get instll -y nginx
root@64c4701a0e6e:/# apt-get instll -y vim

root@64c4701a0e6e:/# mkdir -p /var/www/html
root@64c4701a0e6e:/# cd /var/www/html

root@64c4701a0e6e:/# vim web.html
<html>
        <head>
            <title>This is my first docer page!</title>
        </head>
        <body>
             <h1>hello guys</h1>
        </body> 
</html>
```
>查找nginx安装在哪里
```shell
$ whereis nginx
```
>修改`default`文件
```shell
$ vim /etc/nginx/sites-enabled/default    //修改root地址
root /var/www/html
```
>启动nginx
```shell
$ nginx
```
>看一下进程
```shell
$ ps -ef
```

>使用CTRL+P+Q退出


>使用docker ps查看，映射端口情况：
```shell
$ docker ps
```

>使用`port`查看端口映射：
```shell
$ docker port web
80/tcp -> 0.0.0.0:32770
```

>查看web是否能访问：
```
$ curl http://127.0.0.1:32770
```

>查看docker镜像的IP地址，容器的IP：
```
$ docker inspect web |grep IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "172.17.0.2",
```

> 可以访问容器的IP：
```
$ curl 172.17.0.2
<!DOCTYPE html>
<html>
<head>
<title>Welcome to Docker!</title>
……
```

可以使用`exec`命令在主机启动docker内部命令：
```
$ docker exec web nginx
```

###### 重点：
当我们stop容器，然后start后，docker的IP地址和端口都会改变！
