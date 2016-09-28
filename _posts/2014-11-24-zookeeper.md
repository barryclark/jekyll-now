---
published: true
layout: post
title:  "ZooKeeper介绍"
date:   2014-11-24 18:53
categories: 分布式系统 理论
---

ZooKeeper使用了**client-server（客户端-服务器）**的架构，其中server指的是提供ZooKeeper服务的那些结点，而client指的是使用ZooKeeper服务的那些结点。[^ibm_blog]

客户端通过TCP协议连接到其中一台服务器，它通过周期性对已连接的服务器发送ping请求以便让服务器知道此客户端还是活的，而服务器对ping做出响应以便让客户端知道此服务器还活着。如果客户端在一定时间内收不到服务器的响应，它就连接到其他服务器，客户端session也会转移到新的服务器上。使用方式可以如下：

```bash
# bin/zkCli.sh -server zkserver1.mybiz.com:2181,zkserver2.mybiz.com:2181,zkserver3.mybiz.com:2181
```

> 特定时间一个客户端只会连接到一台服务器。单台ZooKeeper服务器可以处理很多客户端连接。

ZooKeeper里的数据是以类似于Linux文件系统的方式进行存储的，其中的组成单元叫做*znode*。Znode可以看成是linux系统里的目录，它们可以有子目录，以下是示例图：[^ali_blog]

![ZooKeeper中的数据模型][zk_dm]

Znode具有以下特性：[^ali_blog]

* Znode可以有子znode，而且本身可以存数据。默认情况下每个znode最多可以存1M的数据，这些数据都会载入ZooKeeper的每台服务器内存中。
* Znode中的数据可以有多个版本，比如某一个路径下存有多个数据版本，那么查询这个路径下的数据就需要带上版本。
* Znode的目录名可以自动编号，如App1已经存在，再创建的话，将会自动命名为App2。
* Znode可以是*临时（EPHEMERAL）节点*，一旦创建这个znode的客户端与服务器失去联系，这个znode也将自动删除。Zookeeper的客户端和服务器通信采用长连接方式，每个客户端和服务器通过心跳来保持连接，这个连接状态称为session，如果 znode是临时节点，这个session失效，znode也就删除了。
* Znode可以被监控，包括这个目录节点中存储的数据的修改，子节点目录的变化等，一旦变化可以通知设置监控的客户端，这个功能是zookeeper对于应用最重要的特性，通过这个特性可以实现的功能包括配置的集中管理，集群管理，分布式锁等等。


ZooKeeper的所有服务器会选取出其中的一台作为**Leader**，而其他的服务器被称为**Follower**。

客户端的读请求只需要它连接的服务器就可以响应，而所有客户端的写请求都会转到leader，由leader按顺序统一处理。leader将写操作序列化（如果有多个写操作请求会保证它们的请求按顺序）后发给所有服务器，要求他们按序列完成写操作[^junlin]。当大部分（>50%；如果有2f+1台服务器，至少要f+1台）服务器告诉leader它们成功完成写操作，这次写操作才算成功，成功完成写操作的消息才会传回请求的客户端。所以，如果不可用的服务器达到一半数量，ZooKeeper服务就完蛋了。这也是为什么2f+1台服务器的情况下，至多允许f台服务器不可用。ZooKeeper最好是*奇数*台服务器。3个结点最多只允许一个结点不可用，而4个结点也是最多只允许一个结点不可用。

> 所有服务器都可以处理读请求，但只有Leader能够处理写请求。

ZooKeeper这种处理写请求的方法带来的一个问题是有些服务器上的数据可能不是最新的，客户端可能会读到过期数据。ZooKeeper的API接口中提供了Sync操作来解决这个问题。客户端在读数据前调用此操作可以让连接的服务器首先从leader服务器同步数据，然后再响应读请求。这样就可以保证客户端读到是最新的数据。[^junlin]



从上面的介绍可见，增加服务器数量会提升读请求的性能，但是写请求的性能会下降。最常用的服务器数量是3，5或者7。比如50个结点的HBase集群使用5个结点的ZooKeeper就可以。

关于ZooKeeper服务的搭建和配置，请见参考文献[^ibm_blog] [^ali_blog]。



[zk_dm]: /images/zk_ali.jpg "ZooKeeper中的数据模型"



# References

[^ibm_blog]: Mark Grover. [ZooKeeper fundamentals, deployment, and applications](http://www.ibm.com/developerworks/library/bd-zookeeper/), 2013.
[^ali_blog]: Alibaba. [zookeeper使用和原理探究（一）](http://jm-blog.aliapp.com/?p=665). 
[^junlin]: 张俊林，《大数据日知录》，2014.