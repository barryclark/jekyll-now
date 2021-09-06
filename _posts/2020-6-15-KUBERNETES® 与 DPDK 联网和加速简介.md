---
lauout: post
title: Kubernetes DPDK
---

## 介绍

Kubernetes 是一个众所周知的便携式、可扩展的开源平台，用于管理容器化工作负载和服务，这既便于声明性配置，又有利于自动化。它有一个规模庞大、快速增长的生态系统。Kubernetes 服务、支持和工具随处可见。本文重点介绍 Kubernetes 中的网络，简要介绍了 Kubernetes 网络通信，并提到了使用数据平面开发工具包 （DPDK） 加速的两个选项。

Kubernetes 内部的网络通信可以分为四个部分，如图 1 所示：

* Pod 内的容器和容器之间通信
* Pod 到 pod 通信
* Pod 和 Service 之间的通信
* Service 与 Kubernetes环境外部应用程序之间的通信

[![](https://01.org/sites/default/files/resize/users/u71223/k8s-netwk-1-676x500.png)](https://01.org/sites/default/files/users/u71223/k8s-netwk-1.png)

图 1.Kubernetes网络模型

### Pod 内的容器和容器之间通信

Kubernetes 为每个 Pod 分配一个 IP 地址，并且同一Pod中的所有容器共享该Pod的相同网络名称空间，包括 IP 地址和网络端口，这意味着它们可以通过本地主机地址和容器端口相互访问。网络模型称为“IP-per-Pod”。请务必注意，网络命名空间是网络接口和路由表的集合，即网络上的两个设备之间的连接以及分别向何处发送数据包的位置说明。

<font _mstmutation="1" _msthash="1464801" _msttexthash="4173428571">此模型的实现利用了称为pause容器的secret容器，并确保其命名空间被启动状态。创建 Pod 时，Kubernetes 首先在节点上创建一个pause容器，获取相应的 pod 的 IP 地址，并为加入该Pod的所有其他容器设置网络命名空间。Pod 中的所有其他容器称为application容器，使用</font>`--net=container:<id>`只需在创建网络命名空间时加入它们。之后，它们都在同一网络命名空间中运行。

使用 Kubernetes 的 IP-per-Pod 网络模型，允许本地主机网络访问 Pod 中的容器。Pod中的容器必须协调才能有效地使用端口，这意味着端口分配上不存在冲突。他们不必担心与其他Pod中的容器的端口碰撞。

### Pod To Pod之间通信

pod 可以在同一节点上运行，也可以在不同的节点上运行，因此在Pod之间的通信分为两类：
    1.同一节点上的 pod 之间的通信。
    2.不同节点上的 pod 之间的通信。

对于同一节点上的 pod 之间的通信，每个 pod 都认为它获得了正常的以太网设备 eth0，并且具有真正的 IP 地址。但是Kubernetes使用虚拟以太网连接vethX来伪造它，每个 Pod实际上都连接到它。连接有两个方面：在Pod的一侧 eth0,和节点侧的 vethX。虚拟设备（网桥）是连接 pod 网络和节点的隧道。一个网桥将两个网络从两个Pod连接在一起。节点上的每个 Pod 都是网桥的一部分，网桥连接同一节点上的所有 pod。使用此机制对用户透明，同一节点上的不同 pod 可以直接使用 IP 地址进行通信，而不考虑其他发现机制（如 DNS、Consul等）。

[![](https://01.org/sites/default/files/resize/users/u71223/k8s-netwk-2-578x400.png)](https://01.org/sites/default/files/users/u71223/k8s-netwk-2.png)

图 2.同一节点上的 Pod 间通信

如图 2 所示，Pod 1 和 Pod 2 通过 veth 连接到同一网桥。其 IP 地址（IP1 和 IP2）是从网桥的网段动态获取的。此外，在 Pod 1 和 Pod 2 的 Linux® 协议堆栈上，默认路由是网桥的地址。这意味着到非本地地址的所有网络流量在默认情况下发送到网桥，并由网桥直接传输。由于 Pod 1 和 Pod 2 都连接到同一网桥，并且位于同一网段中，因此可以直接进行通信。

对于不同节点上的 pod 之间的通信，网桥和Pod的地址位于同一网段，网桥作为默认网关。网桥的网段和节点的NIC卡是两个完全不同的IP网段，不同节点之间的通信只能通过节点的物理NIC卡进行。

另一方面，也可以找到动态分配并隐藏在网桥后面的私有 IP 地址。Kubernetes 记录所有正在运行的 pod 的 IP 分配信息，并将信息保存在etcd中，作为服务的endpoint，因为这些私有 IP 地址是 Kubernetes 在 pod 之间通信所必需的。此外，规划这些 Pod 的 IP 地址也很重要。必须在整个Kubernetes集群中避免地址冲突。

简而言之，必须满足两个条件来支持不同节点上的 pod 间通信：
* 规划和分配整个 Kubernetes 集群中 Pod 的 IP 地址，而不会发生任何冲突。
* 为了在 pod 之间通信，Pod 的 IP 地址必须与节点的 IP 地址相关联。

对于第一个条件，需要规划网桥的 IP 地址，以确保在部署 Kubernetes 时，不会与每个节点上网桥的其他 IP 地址发生冲突。对于第二个条件，需要一个机制来了解在源pod准备发送数据时装载目标pod IP 地址的节点。也就是说，在将数据发送到目标节点的 NIC 卡之前，必须找到目标节点的 IP 地址，然后将数据传输到该节点上的网桥。数据到达目标节点后，该节点内的网桥知道如何将数据发送到目标窗格。

[![](https://01.org/sites/default/files/resize/users/u71223/k8s-netwk-3-614x400.png)](https://01.org/sites/default/files/users/u71223/k8s-netwk-3.png)

图 3.不同节点上的 Pod 间通信

如图 3 所示，IP1 对应于 Pod1，IP2 对应于 Pod2。当 Pod1 访问 Pod2 时，它首先从源 Pod 1 eth0 发送数据包，查找并到达目标node节点2 eth0。也就是说，在大多数情况下，数据包通过隧道协议（如 vxlan）从节点 1 发送到节点 2，然后发送到 Pod 2。

因此，在不同节点上的 pod 之间寻址和通信必须使用节点的 IP 地址实现，并使用将 IP 地址范围映射到集群级别各个节点的表。在实际环境中，除了部署Kubernetes和 Docker®外，还需要额外的网络配置来实现此目的。在某些情况下，还需要额外的设施或插件，以便Pod可以透明地相互通信。

### Pod 和Service之间的通信

Kubernetes的Pod不稳定或持续时间长，它们可以因不同原因被销毁和制造。例如，在垂直缩放或滚动升级过程中，旧Pod将被销毁，并替换为新 pod，这将更改 IP 地址。为了防止前端由于 IP 地址更改而无法访问 Pod 的情况，Kubernetes 引入了 Service 的概念 。

[![](https://01.org/sites/default/files/resize/users/u71223/k8s-netwk-4-580x400.png)](https://01.org/sites/default/files/users/u71223/k8s-netwk-4.png)

图 4.Pod 和Service之间的通信

创建服务时，Kubernetes 会为它分配一个虚拟 IP 地址，该地址在服务的生命周期内是固定的。访问在 Pod 中的容器提供的功能时，不会直接访问 pod 的 IP 地址和端口，而是使用Service的虚拟 IP 地址及其端口。服务将请求转发到Pod。例如，在图 4 中，前端服务后面存在三个 pod。此外，Kubernetes 还通过服务实现负载平衡、服务发现和 DNS 等。

创建Service时，Kubernetes 使用Service的标签选择器查找 pod，并创建与Service同名的endpoint。Service的目标端口和 pod 的 IP 地址将保存在该endpoint中。更改Pod的 IP 地址后，endpoint也会相应地更改。当Pod收到新请求时，它能够找到目标地址以通过endpoint转发请求。

Service是抽象实体，其 IP 地址是虚拟的。节点上的 kube-proxy负责转发请求。

在 Kubernetes v1.0 中，服务是第 4 层的结构，即在开放系统互连 （OSI） 七层网络模型中，IP 上的 TCP/UDP，并且 kube-proxy纯粹在用户空间中运行。

在 Kubernetes v1.1 中，入口 API （beta） 被添加为表示第 7 层，即 HTTP 服务。此外，还添加了代理 iptables，它已成为自 Kubernetes v1.2 以来Kubernetes操作的默认模式。

在 Kubernetes v1.8.0-beta.0 中，添加了代理 ipvs。因此，目前库贝代理有三种请求转发模式：NameSpace、iptables 和 ipvs。

1.  <font _mstmutation="1" _msthash="1859364" _msttexthash="10592416588">NameSpace<br _mstmutation="1" _istranslated="1">
    在NameSpace模式下，kube-proxy 监控主节点对Service和endpoint的添加和删除，主节点是集群管理和调度子节点的主控制单元。创建Service时，节点上的 kube-proxy会随机打开Service的端口（称为代理端口），然后建立 iptables 规则。稍后，iptables 完成从代理端口转发到代理端口的流量，然后在端点中选择一个Pod，并将流量从代理端口传输到Pod。当endpoint下有多个 pod 时，有两种算法用于选择该Pod。一个是循环方法，这意味着如果一个Pod不响应，则尝试下一个Pod。另一种方法是拾取一个更接近请求的源 IP 地址的 pod。</font>`<the virtual IP of the service, the port>`

2.  <font _mstmutation="1" _msthash="1859365" _msttexthash="13328564301">iptables<br _mstmutation="1" _istranslated="1">
    在 iptables 模式下，当创建服务时，节点上的 kube-proxy 会建立两个 iptables 规则，一个用于服务将流量传输到后端，另一个用于终结点选择 pod，其中默认情况下选择是随机的。但是，与用户空间模式下的 kube 代理不同，如果最初选择的 pod 未响应，则 iptables 模式下的 kube 代理不会自动重试另一个 pod。因此，使用 iptables 模式需要就绪探测。Kubelet 使用就绪探测来了解容器何时可以开始接受流量。当吊舱内的所有容器准备就绪时，该吊舱将被视为已准备好接受流量。当吊舱未就绪时，它将从服务负载均衡器中删除。因此，就绪探测可用于控制哪些 pod 用作服务的后端。</font>`<the virtual IP of the service, the port>`

3.  ipvs  
    在 ipvs 模式下，kube-proxy 调用 netlink 接口以创建相应的 ipvs 规则，并定期将 ipvs 规则与服务和终结点同步，以确保 ipvs 状态与预期一致。访问服务时，流量将重定向到其中一个后端窗格。与 iptables 类似，ipvs 还基于网过滤器挂钩功能。但是，区别在于 iptables 使用顺序匹配，而 ipv 使用基于哈希的匹配。当规则的数量较大时，iptables 的匹配持续时间将显著延长。哈希表用作 ipvs 的基础数据结构，匹配在内核空间中工作。这样，匹配持续时间就会变短。这也意味着 ipvs 可以更快地重定向流量，并在同步代理规则时具有更好的性能。此外，ipvs 还提供各种负载平衡算法，例如：循环 （rr）、最小连接 （lc）、目标哈希 （dh）、源哈希 （sh）、最短预期延迟 （sed）、从不排队 （nq） 等。值得注意的是，ipvs 模式要求 ipvs 内核模块在节点上预安装。在 ipv 模式下启动 kube 代理时，kube 代理将验证 ipv 模块是否安装在节点上。如果为负，则 kube 代理使用 iptables 模式。

### Service与Kubernetes外部之间的通信

Kubernetes提供四种类型的服务：

* Cluster IP：在集群内的 IP 地址上提供服务。只能从群集中访问这种类型的服务。这是Kubernetes的默认类型。
* <font _mstmutation="1" _msthash="1865318" _msttexthash="1782074983">NodePort：通过 NodeIP 上的静态端口（节点端口）提供外部服务。集群外部可以通过访问相应的端口。使用此模式时，将自动创建群集 IP，并且访问节点端口的请求最终将路由到Cluster IP。</font>`<NodeIP>: <NodePort>`
* LoadBalancer：使用云服务提供商的负载均衡器在群集外提供服务。使用此模式时，将自动创建 NodePort 和群集IP，群集中的负载均衡器最终将请求路由到节点端口和群集IP。
* <font _mstmutation="1" _msthash="1866826" _msttexthash="355540276">ExternalName：将服务映射到群集中的资源，例如。使用此模式需要 kube-dns 版本 1.7 或更高版本。</font>`foo.bar.example.com`

## Kubernetes与DPDK的网络通信加速

DPDK 是一组数据平面库和网络接口控制器驱动程序，用于快速数据包处理，目前作为 Linux 基础下的开源项目进行管理*DPDK 为 x86、ARM® 和 PowerPC® 处理器提供了编程框架，并且能够更快地开发高速数据包网络应用程序。

DPDK 绕过 Linux 内核网络堆栈的重层，直接与网络硬件对话。它使用由库和驱动程序组成的核心要素，这些组合称为轮询模式驱动程序 （PMD）。它还使用内存大页面，这意味着需要较少的内存页数，并且翻译旁白缓冲区 （TLB） 丢失次数显著减少。此外，DPDK 需要或利用其他平台技术来避免不必要的开销并提高性能，包括 CPU 固定以进行 CPU 密集型工作负载、非统一内存访问 （NUMA）、数据直接 I/O （DDIO）、一些 IA 新指令和增强的平台感知 （EPA） 功能等。

为了提高 Kubernetes 网络通信的性能，英特尔为容器提出了多种加速解决方案，例如单根 I/O 虚拟化 （SR-IOV） 插件和 virtio 用户，如下图 5 所示。

[![](https://01.org/sites/default/files/resize/users/u71223/k8s-netwk-5-741x425.png)](https://01.org/sites/default/files/users/u71223/k8s-netwk-5.png)

图 5.使用 DPDK 的容器网络加速

virtio 用户是利用 DPDK 的选项。它是 virtio 的前端，能够连接到 vhost 后端，例如用于通信的 DPDK vhost-user。在此示例中，DPDK vhost-user 端口由软件虚拟交换机（如打开 vSwitch®（OVS+）-DPDK 或矢量数据包处理 （VPP））提供。

SR-IOV插件是另一种将SR-IOV应用于库伯内特和容器的替代方案。当容器运行时，通过将虚拟函数 （VF） 添加到容器的网络命名空间，对容器可见 NIC 卡（ 即虚拟 NIC）。有了这一点，VF 驱动程序在用户空间中使用 DPDK，容器的网络性能得到了显著提高。

为了支持更灵活的用户定义的网络模型，Kubernetes 提供了符合容器网络接口 （CNI） 容器网络规范的网络插件接口。为了将 SR-IOV 和 virtio 用户应用于基于 Kubernetes 的容器环境，英特尔为上述两个网络加速选项提供了 SR-IOV CNI 插件和 vhost-user CNI 插件。

## 总结

为了帮助读者了解网络在 Kubernetes 环境中的工作原理，本文引入了 Kubernetes 网络通信，包括 Pod 内的容器到容器通信、pod 到 pod 通信、Pod 和服务之间的通信以及服务与 Kubernetes 外部应用程序之间的通信。它还提到了使用 DPDK 进行加速的两个选项，特别是 SR-IOV 插件和病毒用户。Kubernetes 使用 DPDK 和其他硬件技术实现网络加速对于高度依赖于网络通信的服务和工作负载至关重要，例如，NFV 中的各种容器化网络功能 （CNF）。我们鼓励读者通过下载 SR-IOV CNI 插件、将 Kubernetes pod 直接连接到 SR-IOV 虚拟功能来获取 CNF 的高性能网络，并通过github.com提供反馈来试用。

### 引用

* <font _mstmutation="1" _msthash="1861093" _msttexthash="99715200">为 NFV 白皮书启用库贝内斯的新功能：</font>  
    [<font _mstmutation="1" _msthash="2085603" _msttexthash="6738849">https://builders.intel.com/docs/networkbuilders/enabling_new_features_in_kubernetes_for_NFV.pdf</font>](https://builders.intel.com/docs/networkbuilders/enabling_new_features_in_kubernetes_for_NFV.pdf)
* <font _mstmutation="1" _msthash="1861847" _msttexthash="66755273">库伯内斯网络中的服务理念：</font>[<font _mstmutation="1" _msthash="2085551" _msttexthash="3193060">https://kubernetes.io/docs/concepts/services-networking/service/</font>](https://kubernetes.io/docs/concepts/services-networking/service/)
* <font _mstmutation="1" _msthash="1862601" _msttexthash="39981136">数据平面开发套件：</font>[<font _mstmutation="1" _msthash="2086305" _msttexthash="425139">https://www.dpdk.org/</font>](https://www.dpdk.org/)
* <font _mstmutation="1" _msthash="1863355" _msttexthash="25159433">SR-IOV CNI 插件：</font>[<font _mstmutation="1" _msthash="2087059" _msttexthash="1006538">https://github.com/intel/sriov-cni</font>](https://github.com/intel/sriov-cni)
