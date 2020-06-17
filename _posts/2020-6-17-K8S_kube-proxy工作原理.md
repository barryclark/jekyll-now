---
layout: post
title: kube-proxy工作原理
---

## kube-proxy & service 必要说明

说到 kube-proxy，就不得不提到 k8s 中 service，下面对它们两做简单说明：

* kube-proxy 其实就是管理 service 的访问入口，包括集群内 Pod 到 

    <msreadoutspan class="msreadout-line-highlight msreadout-inactive-highlight">Service</msreadoutspan>

    <msreadoutspan class="msreadout-line-highlight msreadout-inactive-highlight"> 的访问和集群外访问 <msreadoutspan class="msreadout-word-highlight">service</msreadoutspan>。</msreadoutspan>

* kube-proxy 管理 sevice 的 Endpoints，该 service 对外暴露一个 Virtual IP，也成为 Cluster IP, 集群内通过访问这个`Cluster IP:Port`就能访问到集群内对应的 serivce 下的 Pod。
* service 是通过 Selector 选择的一组 Pods 的服务抽象，其实就是一个微服务，提供了服务的 LB 和反向代理的能力，而 kube-proxy 的主要作用就是负责 service 的实现。
* service 另外一个重要作用是，一个服务后端的 Pods 可能会随着生存灭亡而发生 IP 的改变，service 的出现，给服务提供了一个固定的 IP，而无视后端 Endpoint 的变化。

## 服务发现

k8s 提供了两种方式进行服务发现：

*  环境变量： 当你创建一个 Pod 的时候，kubelet 会在该 Pod 中注入集群内所有 Service 的相关环境变量。需要注意的是，要想一个 Pod 中注入某个 Service 的环境变量，则必须 Service 要先比该 Pod 创建。这一点，几乎使得这种方式进行服务发现不可用。
     比如，一个 ServiceName 为 redis-master 的 Service，对应的 ClusterIP:Port 为 10.0.0.11:6379，则其对应的环境变量为：
     	REDIS_MASTER_SERVICE_HOST=10.0.0.11 	REDIS_MASTER_SERVICE_PORT=6379 	REDIS_MASTER_PORT=tcp://10.0.0.11:6379 	REDIS_MASTER_PORT_6379_TCP=tcp://10.0.0.11:6379 	REDIS_MASTER_PORT_6379_TCP_PROTO=tcp 	REDIS_MASTER_PORT_6379_TCP_PORT=6379 	REDIS_MASTER_PORT_6379_TCP_ADDR=10.0.0.11

*  DNS：这也是 k8s 官方强烈推荐的方式。可以通过 cluster add-on 的方式轻松的创建 KubeDNS 来对集群内的 Service 进行服务发现。更多关于 KubeDNS 的内容，请查看我的博文：[Kubernetes DNS Service 技术研究](http://blog.csdn.net/waltonwang/article/details/54317082) , 在此不再赘述。

## 发布 (暴露) 服务

k8s 原生的，一个 Service 的 ServiceType 决定了其发布服务的方式。

* ClusterIP：这是 k8s 默认的 ServiceType。通过集群内的 ClusterIP 在内部发布服务。
* NodePort：这种方式是常用的，用来对集群外暴露 Service，你可以通过访问集群内的每个 NodeIP:NodePort 的方式，访问到对应 Service 后端的 Endpoint。
* LoadBalancer: 这也是用来对集群外暴露服务的，不同的是这需要 Cloud Provider 的支持，比如 AWS 等。
* ExternalName：这个也是在集群内发布服务用的，需要借助 KubeDNS(version>= 1.7) 的支持，就是用 KubeDNS 将该 service 和 ExternalName 做一个 Map，KubeDNS 返回一个 CNAME 记录。

\##kube-proxy 内部原理

kube-proxy 当前实现了两种 proxyMode：userspace 和 iptables。其中 userspace mode 是 v1.0 及之前版本的默认模式，从 v1.1 版本中开始增加了 iptables mode，在 v1.2 版本中正式替代 userspace 模式成为默认模式。

\###userspace mode userspace 是在用户空间，通过 kube-proxy 来实现 service 的代理服务。废话不多说，其原理如下如图所示： 

可见，这种 mode 最大的问题是，service 的请求会先从用户空间进入内核 iptables，然后再回到用户空间，由 kube-proxy 完成后端 Endpoints 的选择和代理工作，这样流量从用户空间进出内核带来的性能损耗是不可接受的。这也是 k8s v1.0 及之前版本中对 kube-proxy 质疑最大的一点，因此社区就开始研究 iptables mode。

\####Example

<pre>
$ kubectl get service
NAME             LABELS                                    SELECTOR              IP(S)            PORT(S)
kubernetes       component=apiserver,provider=kubernetes   <none>                10.254.0.1       443/TCP
ssh-service1     name=ssh,role=service                     ssh-service=true      10.254.132.107   2222/TCP

$ kubectl describe service ssh-service1 
Name:			ssh-service1
Namespace:		default
Labels:			name=ssh,role=service
Selector:		ssh-service=true
Type:			LoadBalancer
IP:			10.254.132.107
Port:			<unnamed>	2222/TCP
NodePort:		<unnamed>	30239/TCP
Endpoints:		<none>
Session Affinity:	None
No events.
</pre>

NodePort 的工作原理与 ClusterIP 大致相同，发送到某个 NodeIP:NodePort 的请求，通过 iptables 重定向到 kube-proxy 对应的端口 (Node 上的随机端口) 上，然后由 kube-proxy 再将请求发送到其中的一个 Pod:TargetPort。

这里，假如 Node 的 ip 为 10.0.0.5，则对应的 iptables 如下：

<pre>
$ sudo iptables -S -t nat
...
-A KUBE-NODEPORT-CONTAINER -p tcp -m comment --comment "default/ssh-service1:" -m tcp --dport 30239 -j REDIRECT --to-ports 36463
-A KUBE-NODEPORT-HOST -p tcp -m comment --comment "default/ssh-service1:" -m tcp --dport 30239 -j DNAT --to-destination 10.0.0.5:36463
-A KUBE-PORTALS-CONTAINER -d 10.254.132.107/32 -p tcp -m comment --comment "default/ssh-service1:" -m tcp --dport 2222 -j REDIRECT --to-ports 36463
-A KUBE-PORTALS-HOST -d 10.254.132.107/32 -p tcp -m comment --comment "default/ssh-service1:" -m tcp --dport 2222 -j DNAT --to-destination 10.0.0.5:36463
</pre>

可见：访问 10.0.0.5:30239 端口会被转发到 node 上的 36463 端口（随机监听端口）。而且在访问 clusterIP 10.254.132.107 的 2222 端口时，也会把请求转发到本地的 36463 端口。 36463 端口实际被 kube-proxy 所监听，将流量进行导向到后端的 pod 上。

\###iptables mode 另一种 mode 是 iptables，它完全利用内核 iptables 来实现 service 的代理和 LB。是 v1.2 及之后版本默认模式，其原理图如下所示： 

iptables mode 因为使用 iptable NAT 来完成转发，也存在不可忽视的性能损耗。另外，如果集群中存在上万的 Service/Endpoint，那么 Node 上的 iptables rules 将会非常庞大，性能还会再打折扣。

这也导致，目前大部分企业用 k8s 上生产时，都不会直接用 kube-proxy 作为服务代理，而是通过自己开发或者通过 Ingress Controller 来集成 HAProxy, Nginx 来代替 kube-proxy。

\####Example iptables 的方式则是利用了 linux 的 iptables 的 nat 转发进行实现。

<pre>
apiVersion: v1
kind: Service
metadata:
  labels:
    name: mysql
    role: service
  name: mysql-service
spec:
  ports:
    - port: 3306
      targetPort: 3306
      nodePort: 30964
  type: NodePort
  selector:
    mysql-service: "true"
</pre>

mysql-service 对应的 nodePort 暴露出来的端口为 30964，对应的 cluster IP(10.254.162.44) 的端口为 3306，进一步对应于后端的 pod 的端口为 3306。

mysql-service 后端代理了两个 pod，ip 分别是 192.168.125.129 和 192.168.125.131。先来看一下 iptables。

<pre>
$iptables -S -t nat
...
-A PREROUTING -m comment --comment "kubernetes service portals" -j KUBE-SERVICES
-A OUTPUT -m comment --comment "kubernetes service portals" -j KUBE-SERVICES
-A POSTROUTING -m comment --comment "kubernetes postrouting rules" -j KUBE-POSTROUTING
-A KUBE-MARK-MASQ -j MARK --set-xmark 0x4000/0x4000
-A KUBE-NODEPORTS -p tcp -m comment --comment "default/mysql-service:" -m tcp --dport 30964 -j KUBE-MARK-MASQ
-A KUBE-NODEPORTS -p tcp -m comment --comment "default/mysql-service:" -m tcp --dport 30964 -j KUBE-SVC-67RL4FN6JRUPOJYM
-A KUBE-SEP-ID6YWIT3F6WNZ47P -s 192.168.125.129/32 -m comment --comment "default/mysql-service:" -j KUBE-MARK-MASQ
-A KUBE-SEP-ID6YWIT3F6WNZ47P -p tcp -m comment --comment "default/mysql-service:" -m tcp -j DNAT --to-destination 192.168.125.129:3306
-A KUBE-SEP-IN2YML2VIFH5RO2T -s 192.168.125.131/32 -m comment --comment "default/mysql-service:" -j KUBE-MARK-MASQ
-A KUBE-SEP-IN2YML2VIFH5RO2T -p tcp -m comment --comment "default/mysql-service:" -m tcp -j DNAT --to-destination 192.168.125.131:3306
-A KUBE-SERVICES -d 10.254.162.44/32 -p tcp -m comment --comment "default/mysql-service: cluster IP" -m tcp --dport 3306 -j KUBE-SVC-67RL4FN6JRUPOJYM
-A KUBE-SERVICES -m comment --comment "kubernetes service nodeports; NOTE: this must be the last rule in this chain" -m addrtype --dst-type LOCAL -j KUBE-NODEPORTS
-A KUBE-SVC-67RL4FN6JRUPOJYM -m comment --comment "default/mysql-service:" -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-ID6YWIT3F6WNZ47P
-A KUBE-SVC-67RL4FN6JRUPOJYM -m comment --comment "default/mysql-service:" -j KUBE-SEP-IN2YML2VIFH5RO2T
</pre>

首先如果是通过 node 的 30964 端口访问，则会进入到以下链:

<pre>
-A KUBE-NODEPORTS -p tcp -m comment --comment "default/mysql-service:" -m tcp --dport 30964 -j KUBE-MARK-MASQ
-A KUBE-NODEPORTS -p tcp -m comment --comment "default/mysql-service:" -m tcp --dport 30964 -j KUBE-SVC-67RL4FN6JRUPOJYM
</pre>

然后进一步跳转到 KUBE-SVC-67RL4FN6JRUPOJYM 的链:

<pre>
-A KUBE-SVC-67RL4FN6JRUPOJYM -m comment --comment "default/mysql-service:" -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-ID6YWIT3F6WNZ47P
-A KUBE-SVC-67RL4FN6JRUPOJYM -m comment --comment "default/mysql-service:" -j KUBE-SEP-IN2YML2VIFH5RO2T
</pre>

这里利用了 iptables 的–probability 的特性，使连接有 50% 的概率进入到 KUBE-SEP-ID6YWIT3F6WNZ47P 链，50% 的概率进入到 KUBE-SEP-IN2YML2VIFH5RO2T 链。

KUBE-SEP-ID6YWIT3F6WNZ47P 的链的具体作用就是将请求通过 DNAT 发送到 192.168.125.129 的 3306 端口。

<pre>
-A KUBE-SEP-ID6YWIT3F6WNZ47P -s 192.168.125.129/32 -m comment --comment "default/mysql-service:" -j KUBE-MARK-MASQ
-A KUBE-SEP-ID6YWIT3F6WNZ47P -p tcp -m comment --comment "default/mysql-service:" -m tcp -j DNAT --to-destination 192.168.125.129:3306
</pre>

同理 KUBE-SEP-IN2YML2VIFH5RO2T 的作用是通过 DNAT 发送到 192.168.125.131 的 3306 端口。

<pre>
-A KUBE-SEP-IN2YML2VIFH5RO2T -s 192.168.125.131/32 -m comment --comment "default/mysql-service:" -j KUBE-MARK-MASQ
-A KUBE-SEP-IN2YML2VIFH5RO2T -p tcp -m comment --comment "default/mysql-service:" -m tcp -j DNAT --to-destination 192.168.125.131:3306
</pre>

分析完 nodePort 的工作方式，接下里说一下 clusterIP 的访问方式。 对于直接访问 cluster IP(10.254.162.44) 的 3306 端口会直接跳转到 KUBE-SVC-67RL4FN6JRUPOJYM。

<pre>
-A KUBE-SERVICES -d 10.254.162.44/32 -p tcp -m comment --comment "default/mysql-service: cluster IP" -m tcp --dport 3306 -j KUBE-SVC-67RL4FN6JRUPOJYM
</pre>

接下来的跳转方式同 NodePort 方式。

参考：

* https://kubernetes.io/docs/user-guide/services/
* https://xuxinkun.github.io/2016/07/22/kubernetes-proxy/
