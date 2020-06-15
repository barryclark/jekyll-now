---
layout: post
title: K8S_externalTrafficPolicy
---

#### 为什么externalTrafficPolicy只支持NodePort和Load Balancer的Service，不支持Cluster IP呢？
原因在于externalTrafficPolicy的设定是当流量到达确定的节点后，再由Kube-proxy在该节点上找Service的Endpoint。
有些节点上存在Service endpoint，有些则没有，再配合Kube-proxy的健康检查就能确定哪些节点上有符合要求的后端Pod。访问NodePort和Load Balancer都能指定节点，但Cluster IP无法指定节点，因此Service的流量就永远出不来发起访问的客户端的那个节点，这也不是externalTrafficPolicy这个特性的设计初衷。
