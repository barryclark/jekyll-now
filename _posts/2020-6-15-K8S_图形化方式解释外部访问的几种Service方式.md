---
layout: post
titile: 以图形化的方式简单介绍 Kubernetes Service
---


本文主要以图形化的方式简单介绍了 Kubernetes Service 的四种类型，即 ClusterIP、NodePort、LoadBalancer 和 ExternalName。  

### 索引本文有两部分：  

* 第一部分：以图形化的方式简单介绍 Kubernetes Service，即这篇文章
* 第二部分：[以图形化的方式简单介绍 Kubernetes Ingress](http://www.dockone.io/article/9684)  

### 内容摘要Kubernetes 有四种 service 类型，而 ClusterIP 是最基础的：   

[![1.png](http://dockone.io/uploads/article/20200121/b75e84b74bfb29776523bcc6b7dba168.png "1.png")](http://dockone.io/uploads/article/20200121/b75e84b74bfb29776523bcc6b7dba168.png)  

如上图所示，你可以想象一下，如果你要创建一个 NodePort 类型的 service，Kubernetes 也会创建一个 ClusterIP。如果你要创建一个 LoadBalancer 类型的 service，Kubernetes 会创建一个 NodePort 以及 ClusterIP。如果你这么思考了，对 Kubernetes service 的理解将变得容易。  

接下来我们将会对此进行一一解释。  

### Services 和 PodsServices 通过使用 labels 直接指向 pods，而不是指向 deployments 或者 replicasets。这种设计的灵活性极高，因为创建 pods 的方式有很多，而 Service 不需要关心 pods 通过哪种方式创建。  

我们先阐述一个简单的示例，然后逐步介绍不同的 service 类型，来了解它们是如何在彼此之上构建的。  

### 不使用 Services首先，让我们看下不使用 services 的情况。  

[![2.png](http://dockone.io/uploads/article/20200121/6a8d778e54dfb61c1c33be8bd88d569d.png "2.png")](http://dockone.io/uploads/article/20200121/6a8d778e54dfb61c1c33be8bd88d569d.png)  

如上图，我们有2个 node 和 1 个 pod。两个 node 分别使用外部 IP 地址（`4.4.4.1`和`4.4.4.2`）以及内部 IP 地址（`1.1.1.1`和`1.1.1.2`），而名为 **pod-python** 的 pod 只有一个内部 IP 地址。  

[![3.png](http://dockone.io/uploads/article/20200121/7a5733e69e993a132afb4de6991e1987.png "3.png")](http://dockone.io/uploads/article/20200121/7a5733e69e993a132afb4de6991e1987.png)  

如上图，现在我们添加第二个名为 **pod-nginx** 的 pod，它被调度到了 **node-1** 上。虽然两个 pod 在不同的 node 上，但这不影响它们互相访问。在 Kubernetes 集群中，所有的 pod 都可以通过内部 IP 地址访问其他的 pod，不管它们运行在哪个 node 上。  

这就意味着 **pod-nginx** 能通过内部 IP 地址 `1.1.1.3` ping通或者连接 **pod-python**。  

[![4.png](http://dockone.io/uploads/article/20200121/e612c9129ba1f4595029879af51d93f7.png "4.png")](http://dockone.io/uploads/article/20200121/e612c9129ba1f4595029879af51d93f7.png)  

如上图，现在我们考虑将 **pod-python** 杀死并重建一个新 pod。（本文不负责介绍如何管理和控制 pod。）操作完成之后，**pod-nginx** 就无法继续访问 IP 地址 `1.1.1.3`，这样系统就中断崩溃了。为了避免这种问题，我们来创建第一类 service！  

### ClusterIP 类型

[![5.png](http://dockone.io/uploads/article/20200121/85efb26703434d7276a134a51b9037c5.png "5.png")](http://dockone.io/uploads/article/20200121/85efb26703434d7276a134a51b9037c5.png)  

与上述场景一样，但这次我们配置了一个 ClusterIP 类型的 service。service 不像 pod 会调度到特定的 node 上，在本文中你可以假定service 仅在整个集群的内存中生效。  

现在，**pod-nginx** 总是能够安全地连接 IP 地址 `1.1.10.1` 或者域名地址 `service-python`，然后重定向到一个活跃的 python pod 上。没有灾难，一切美好。  

[![6.png](http://dockone.io/uploads/article/20200121/06b233891c905f8ab516b73982516d45.png "6.png")](http://dockone.io/uploads/article/20200121/06b233891c905f8ab516b73982516d45.png)  

我们来延申下这个示例，将 python 服务扩展到 3 个实例，并且现在我们把 service 和所有 pod 实例的内部 IP 地址以及端口都标注在图中。  

集群中的所有 pod 都能通过 `http://1.1.10.1:3000` 或者 `http://service-python:3000` 访问到 python pod 的 443 端口。**service-python** 这个 ClusterIP 类型的 service 将基于随机或者轮询方式分发请求。这就是 ClusterIP 类型的 service 要做的事情，它能够让集群中的 pod 通过一个名字或者 IP 达到可用性。  

上述图中 **service-python** 的 yaml 文件内容可能如下：  

<pre class="prettyprint">
apiVersion: v1  

kind: Service  

metadata:  

name: service-python  

spec:  

ports:  

- port: 3000  

  protocol: TCP  

  targetPort: 443  

selector:  

  run: pod-python  

type: ClusterIP  
</pre>  

运行命令 `kubectl get svc`，结果如下：  

[![7.png](http://dockone.io/uploads/article/20200121/42096b3d06dc45b8ab514b98681d6d93.png "7.png")](http://dockone.io/uploads/article/20200121/42096b3d06dc45b8ab514b98681d6d93.png)  

### NodePort 类型现在我们想让 ClusterIP 类型的 service 在集群外部也能够使用，所以将其转换成 NodePort 类型的 service。基于我们的示例，只需将  **service-python** 的 yaml 文件做两处简单的修改，如下所示：  

<pre class="prettyprint">
apiVersion: v1  

kind: Service  

metadata:  

name: service-python  

spec:  

ports:  

- port: 3000  

protocol: TCP  

targetPort: 443  

nodePort: 30080  

selector:  

run: pod-python  

type: NodePort  
</pre>  

[![8.png](http://dockone.io/uploads/article/20200121/68257e34289fde93307159200e665625.png "8.png")](http://dockone.io/uploads/article/20200121/68257e34289fde93307159200e665625.png)  
_通过 node-2 的外部请求_  

如上图所示，现在我们集群内部的 **service-python** 也能通过所有 node 的内部以及外部 IP 地址和端口 30080 访问。  

[![9.png](http://dockone.io/uploads/article/20200121/4b16762d30f36d5c7ff3a5cd6ee29f95.png "9.png")](http://dockone.io/uploads/article/20200121/4b16762d30f36d5c7ff3a5cd6ee29f95.png)  
_通过 node-1 的外部请求_  

如下图所示，集群内部的 pod 也能访问 node 的内部 IP 地址和端口 30080。  

[![10.png](http://dockone.io/uploads/article/20200121/b7086b7cce5387e863d5516d65b05314.png "10.png")](http://dockone.io/uploads/article/20200121/b7086b7cce5387e863d5516d65b05314.png)  

运行命令 `kubectl get svc`，结果展示了相同的 cluster ip，但类型显示不一样了，而且多了个额外的 NodePort 端口。  

[![11.png](http://dockone.io/uploads/article/20200121/bf2b2097f33bdf02b33f3b4f09732d50.png "11.png")](http://dockone.io/uploads/article/20200121/bf2b2097f33bdf02b33f3b4f09732d50.png)  

在集群内部，NodePort 类型的 service 同样扮演着之前 ClusterIP 类型 service 的角色。这帮助了我们去想象一个 NodePort 类型的 service 创建了一个 ClusterIP 类型的 service，尽管事实上并没有额外增加一个 ClusterIP 类型的 service。  

### LoadBalancer 类型当我们想通过一个 IP 地址将请求分发到所有 node 节点的外部 IP 地址时，可以使用 LoadBalancer 类型的 service。因此，它是构建于 NodePort 类型的 service 之上，如下图所示：  

[![12.png](http://dockone.io/uploads/article/20200121/8f3e2d5b83f2769b6713436359ff21ab.png "12.png")](http://dockone.io/uploads/article/20200121/8f3e2d5b83f2769b6713436359ff21ab.png)  

我们可以想象成一个 LoadBalancer 类型的 service 创建了一个 NodePort 类型的 service，接着创建了一个 ClusterIP 类型的 service。只需简单修改下 NodePort 类型的 yaml 文件即可变更为 LoadBalancer 类型，如下所示：  

<pre class="prettyprint">
apiVersion: v1  

kind: Service  

metadata:  

name: service-python  

spec:  

ports:  

- port: 3000  

protocol: TCP  

targetPort: 443  

nodePort: 30080  

selector:  

run: pod-python  

type: LoadBalancer  
</pre>  

LoadBalancer 类型的 service 所要做的就是创建一个 NodePort 类型的 service，然后发消息给部署 Kubernetes 集群的云服务提供商，请求其为所有 node 节点的外部 IP 地址以及设定的 NodePort 端口配置负载均衡。如果云服务提供商不支持这类请求消息的处理，任何事情都不会发生，LoadBalancer 类型的 service 就会和 NodePort 类型一样了。  

运行命令 `kubectl get svc`，结果仅多展示了一个 EXTERNAL-IP 字段以及不同的类型。  

[![13.png](http://dockone.io/uploads/article/20200121/338022a3c09a43bf3d597a6c9a3de578.png "13.png")](http://dockone.io/uploads/article/20200121/338022a3c09a43bf3d597a6c9a3de578.png)  

LoadBalancer 类型的 service 同样会在所有 node 节点内外 IP 地址上开放 30080 端口。在集群内部，它和 ClusterIP 类型的 service 作用一样。  

### ExternalName 类型最后介绍下 ExternalName 类型的 service，它可以被认为是有点分开的，和之前介绍的 3 种不在一个技术栈。简而言之，它创建了一个内部服务，端点指向了一个 DNS 域名。  

基于我们之前的示例，现在假设 **pod-nginx** 已经迁移到了我们新的 Kubernetes 集群，但 python 服务还在外部（原来的地方）：  

[![14.png](http://dockone.io/uploads/article/20200121/4ad63b78f676815eaf4ff28808194efc.png "14.png")](http://dockone.io/uploads/article/20200121/4ad63b78f676815eaf4ff28808194efc.png)  

如上图所示，**pod-nginx** 可以直接连接 `http://remote.server.url.com`，这样是没有问题的。但不久之后，我们想将 python 服务也迁移到新的集群中，到那时就会出问题了，因此我们可以创建一个 ExternalName 类型的 service。  

[![15.png](http://dockone.io/uploads/article/20200121/3655d181e78a8864cdd32d8a771628ef.png "15.png")](http://dockone.io/uploads/article/20200121/3655d181e78a8864cdd32d8a771628ef.png)  

使用的 yaml 文件内容如下：  

<pre class="prettyprint">
kind: Service  

apiVersion: v1  

metadata:  

name: service-python  

spec:  

ports:  

- port: 3000  

protocol: TCP  

targetPort: 443  

type: ExternalName  

externalName: remote.server.url.com  
</pre>  

现在，**pod-nginx** 可以简单地与 `http://service-python:3000` 建立连接，就像使用 ClusterIP 类型的 service 一样。当最终我们决定将Python 服务迁移到新的 Kubernetes 集群中时，我们只需要将 service 的类型改成 ClusterIP 并使用对应的 labels 配置即可。  

[![16.png](http://dockone.io/uploads/article/20200121/81489abc30789e8e375df83ad7ed69df.png "16.png")](http://dockone.io/uploads/article/20200121/81489abc30789e8e375df83ad7ed69df.png)  

使用 ExternalName 类型 service 的最大好处在于，你可以先建设好 Kubernetes 集群基础设施，并且基于 services 和 IP 地址设定好规则与限制，尽管有些服务依然存在于集群外部。  

**原文链接：[Kubernetes Services simply visually explained](https://medium.com/swlh/kubernetes-services-simply-visually-explained-2d84e58d70e5)（翻译：肖远昊）**
