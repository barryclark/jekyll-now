---
layout: post
title: State of Kubernetes on Azure
subtitle: Assessment of the Azure Container Service regarding Kubernetes support
category: general
tags: [cloud, microservice, devops, docker]
author: martin_danielsson
author_email: martin.danielsson@haufe-lexware.com
header-img: "images/bg-post-clover.jpg"
---

**IMPORTANT NOTE**: This blog post was written with the state of Kubernetes Support in Azure as of end of December 2016. If you're reading this significantly later, things will most probably have changed.

#### Table of Contents

* [Azure Container Services](#acs)
* [Deployment Modes](#deployment)
    * [What you get](#whatyouget)
* [What works well](#whatworkswell)
    * [Standard use of `kubectl`](#kubectl)
    * [Ingress Configurations](#ingress)
    * [Automatic Load Balancer Configuration](#lbconfig)
    * [Combining with other Kubernetes Components](#prometheus)
* [What does not work well (yet)](#whatworkswellnot)
    * [Scaling Agent VMs](#scaling)
    * [Setting up H/A masters](#hamasters)
    * [Upgrading Kubernetes (e.g. to 1.5.1)](#upgrading)
    * [Persistent Storage](#storage)
* [Future work](#futurework)
* [tl;dr](#tldr)
* [Links](#links)

As we all know, containers are all the rage, and of course Microsofts also takes a shot at implementing a reliable runtime for running those Docker containers, called "[Azure Container Service](https://azure.microsoft.com/de-de/services/container-service/)". Fairly recently, the also [introduced support for one of the most interesting - and mature - runtime orchestration layers for containers: Kubernetes](https://azure.microsoft.com/en-us/blog/azure-container-service-the-cloud-s-most-open-option-for-containers/) (in addition to Docker Swarm and DC/OS).

This blog post will cover how well Kubernetes is supported on Azure today, and where there is still room to improve.

### Azure Container Services {#acs}

![Azure Container Service](https://azurecomcdn.azureedge.net/cvt-556d5b89aaa50eecaebfddb9370f603d4de2b20a9a4d3aa06639b68db336f1c8/images/page/services/container-service/01-create.png)

First, just a few words on what Azure Container Services (ACS) does: It's not a proprietary implementation of some container orchestration runtime, but more of a collection of best practice templates on how to deploy and operate container clusters on Azure, very much like [`kops` (Kubernetes Operations) for AWS](https://github.com/kubernetes/kops). Azure tries to stick to standards, and just leverages Azure Infrastructure where it fits. All efforts are open sourced (you've come a long way, Microsoft!) and [available on GitHub](https://github.com/Azure/acs-engine). For most things, ACS leverages Azure Resource Manager (ARM) templates.

### Deployment Modes {#deployment}

If you want to deploy a Kubernetes Cluster to Azure, you have the choice to do it in two ways: Either using the ["new" Portal](https://portal.azure.com), or using the [Azure Command Line Interface (Azure-CLI 2.0)](https://docs.microsoft.com/en-us/cli/azure/install-az-cli2). Both ways work - under the hood - in a similar fashion, by creating ARM templates and instanciating those into an Azure subscription. In the end you will get the same end result: A resource group containing all necessary IaaS components you need to run a Kubernetes cluster.

The main difference between the two deployment methods is that the command line is able to automatically create a Service Principal for the Kubernetes cluster, which has to be done in advance when deploying via the Portal. The command line will also let you specify an existing Service Principal, so that method is the more flexible one. Before you ask: The Service Principal is needed to be able to change infrastructure components during the runtime of the cluster. This is important to be able to change Load Balancer settings to expose services. In the future this may also be important to scale Agents, but currently, that's not (yet) implemented (more later).

* [Creating a cluster via the Portal](https://docs.microsoft.com/de-de/azure/container-service/container-service-deployment)
* [Creating a cluster via the CLI 2.0](https://docs.microsoft.com/en-us/azure/container-service/container-service-kubernetes-walkthrough)

**Important Note**: Getting the Service Principal right is extremely important. Passing on wrong credentials (client ID and secret) will not make any error messages surface, but some things will simply not work (such as accessing the deployed cluster,...). Client ID is the Application ID of the Service Principal, the Client Secret is a create Key for that Application.

#### What you get {#whatyouget}

Using either of those ways you end up with a correctly configured Kubernetes cluster with a predefined number of Worker Agents and a single Master. The Agents' VM size can be selected from the available ones in Azure, whereas the Master VM is currently(?) set to the `Standard_D2` size (and cannot be changed).

The Master node also runs the `etcd` database which is the place where Kubernetes stores all its data. This is a native install of `etcd` directly on the Master VM, and thus using the VMs Virtual Hard Drive (VHD) directly for storing its data. This choice is both good and bad: Kubernetes recommends running `etcd` in a clustered mode using three (or more) dedicated machines for really high availability, and ACS runs `etcd` on a single VM, not dedicated, but shared with the Kubernetes Master.

For many situations this may even be sufficient for production use in case you don't have very high demands on availability. If you can settle for a good MTTR instead of a high MTBF, this may be enough, as Azure by default stores its VHDs in a redundant and safe way. Adding a backup strategy for `etcd` may still be advisable though.

In short: Instanciating a Kubernetes Cluster is very simple, and you get a fairly decent Kubernetes deployment. Now let's get on to what actually works and what does not.

### What works well {#whatworkswell}

#### Standard use of `kubectl` {#kubectl}

ACS gives you a Kubernetes Deployment which works very much as a vanilla Kubernetes 1.4.6 deployment. This means you can use the standard `kubectl` tooling to deploy and change things on your Kubernetes cluster.

Microsoft do supply a specific version of `kubectl` via their `az acs kubernetes install-cli` command, but any already installed version (which is compatible with the deployed 1.4.6 server version) will work.

The Kubernetes components seem to be unchanged versions of Kubernetes, built without any additions. Just the parts which are intended to be implemented by Cloud Providers are Azure specific. This by contrast to e.g. Rancher.io which deploys a special version of Kubernetes which contains tweaks to make it run on Rancher. This is a really good thing on Azure, as it means that an upgrade will be very much more likely to succeed than if there is a need to repackage Kubernetes for a specific runtime.

#### Ingress Configurations (e.g. nginx) {#ingress}

The above on `kubectl` also means that standard configurations of e.g. Ingress Controllers are much more likely to "just work", which is the case for current nginx Ingress Controllers (tested: 0.8.3). The tests I did using the plain Kubernetes nginx Ingress Controller 0.8.3 were all successful and behaved as advertised.

Ingress Controllers on Kubernetes are used to route traffic from the "border" of the Kubernetes Cluster to services on the inside. Typical use cases for ingress controllers are TLS termination and Host routing. This works out of the box with the Azure Kubernetes Cluster.

#### Automatic Load Balancer Configuration {#lbconfig}

Hand in hand with the ingress configuration comes the exposure of ports on the cluster via external load balancers. This is a Kubernetes concept which needs to be taken care of by the Cloud Provider which runs the cluster. A special kind of service is defined to expose a port to the public internet, and the cloud provider (here: Azure) needs to take care of the load balancing of the port. This works very well, both using plain services as well as with ingress controllers: After exposing the service, it takes around 2-3 minutes, and a route from the public load balancer to the services is built up and announced via `kubectl`, just as it's defined to work in the official Kubernetes documentation. I like!

What this does is very basic though: The Azure LB does **not** take care of TLS termination or Host routing; that has to be done via an Ingress Controller. This may change in the future; Azure does have corresponding functionality in the "Application Gateway", which is considered for adaption for Kubernetes. But it's not quite there yet.

#### Combining with other Kubernetes Components {#prometheus}

The Azure Kubernetes Cluster being a standard deployment of Kubernetes enables you to use other prepackaged standard tooling adapted to Kubernetes, such as [Prometheus](https://prometheus.io). A vanilla Prometheus installation is out of the box able to scrape all usual and useful metrics from the master, the agents and the containers which run on the agents, without any kind of advanced configuration. This makes it fairly easy to set up monitoring of the Kubernetes cluster, as everything behaves just as it was intended by the Kubernetes folks.

### What does not work well (yet) {#whatworkswellnot}

There are some things which do not work that well yet though, and those should also be mentioned. Kubernetes on Azure is still in "Preview", and is not deemed to be ready for production workloads just yet. The following things are the ones which stick out.

#### Scaling Agent VMs {#scaling}

One of the most compelling features of container clusters would be that it's very easy to scale out whenever your infrastructure peaks in terms of workload. Simply adding more Agents and scaling out the number of containers running on them is a basic use case.

Unfortunately, this is something which is not yet implemented for Kubernetes for Azure. Using both the Portal or the CLI 2.0, it is not possible to scale the number of agent VMs. It's exposed both in the Portal UI and in the command line interface (`az acs scale`), but it just does not work. I suspect this will be implemented very soon though.

Underneath the hood in Azure there are multiple ways of implementing such a thing, and the newest feature in Azure for this would be using [VM Scale Sets (VMSS)](https://azure.microsoft.com/en-us/services/virtual-machine-scale-sets/). The `acs` templates currently do **not** use this feature, and I suspect this is why it's not yet implemented without it. Doing it with VMSS is supposedly a lot easier or more flexible, but it takes some time to port the current templates to using VMSS.

Other open issues are e.g. the support for multiple Agent Pools (e.g. for different types of workloads/containers; Kubernetes supports tagging agents/nodes and letting containers choose by selecting via "labels"). Agent Pools are exposed in the UI, which means that the infrastructure has been implemented, but the management parts of Agent Pools does not seem to be fully implemented yet. It may very well be possible right now to define multiple agent pools if you write your own ARM templates, but there is no rock solid guidance yet on how to do it. 

#### Setting up H/A masters {#hamasters}

Another thing which is currently not supported by the deployment templates is the deployment of multiple masters (at least this is not possible via the Portal UI). This has the effect that it is not possible to set up a clustered `etcd` environment using the templates, and that the master nodes will not be highly available.

As mentioned above, this may or may not be an issue for you (depending on your workload), and I suspect this will be addressed in the near future. It's not a real technical issue, Azure provides all necessary infrastructure to enable this, it's just a question of crafting suitable templates. This also applies to the question of clustered `etcd` deployments. It's not actually difficult to create an ARM template for such a deployment, it's just not done yet.

#### Upgrading Kubernetes (e.g. to 1.5.1) {#upgrading}

The Kubernetes cluster you get is currently a 1.4.6 cluster. This is not bad, it's a stable version, but currently you can't influence it in a convenient way. It's 1.4.6 you get, period. Kubernets on Azure being the standard version though, it's possible to do a manual upgrade of the Kubernetes version, as one of the [issues on Cole Mickens' `azure-kubernetes-status` repository](https://github.com/colemickens/azure-kubernetes-status/issues/15) suggests.

I raised an issue on the Azure Support asking for how this will be done once Kubernetes on Azure reaches GA (General Availability), and the answer I got for this was that it's a "reasonable expectation" that there either will be explicit support for automatically upgrading the Kubernetes components, **or** that there will be documentation on how to accomplish this manually, as part of the official documentation of the Azure Container Service. Both options are valid in my opinion.

#### Persistent Storage {#storage}

The last thing I investigated a bit more extensive was the topic of persistence with Kubernetes on Azure. There is explicit support for both Azure Disks and Azure Files baked into Kubernetes, so that looks like it's a no-brainer on Azure. But: Unfortunately, that's far from true.

The most compelling option is to use the [Kubernetes Storage Class "Azure Disk"](http://kubernetes.io/docs/user-guide/persistent-volumes/#azure-disk). This is supposed to automatically provision disks on demand for use within Pods. I never managed to get this to work; it gets stuck in a "Pending" state, and does not provision anything. It may very well be that I'm too stupid to make this work, but that's also a measurement (or that it only works on Kubernetes 1.5+). In principle, it should be possible to let Azure provision disks on the fly as soon as you need them (via the excellent [Persistent Volume (PV)/Persistent Volume Claim (PVC) mechanism](http://kubernetes.io/docs/user-guide/persistent-volumes/)).

The other two options can be used in a Pod definition to [mount either an Azure Disk Volume or Azure File Volume](http://kubernetes.io/docs/user-guide/volumes/#azurefilevolume) into a Pod. I tested mounting a VHD (Disk Volume) into a Pod, and this actually works. But there are several drawbacks:

* It takes around two minutes to mount the VHD into the Pod
* Upon destroying the Pod, it takes around ten minutes(!) to release the Azure Disk for re-use again
* Using the `azureDisk` volume ties a volume explicitly to a Pod, making it impossible to create provider independent configuration (like it would be possible using PVs and PVCs)

The other option is using a Azure File Volume (which leverages SMB 2.1 or 3.0), but that also has the following severe drawback: [All files are created (hardcoded) with permission 777](https://github.com/kubernetes/kubernetes/issues/37005), which e.g. makes it impossible to run PostgreSQL against such a share.

In the end, [setting up your own NFS server](https://help.ubuntu.com/community/SettingUpNFSHowTo) (Kubernetes plays very well with NFS) or using any of the provider independent solutions might currently be the only reasonable solution. Possibly using [`StatefulSet`](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) in Kubernetes 1.5.x with an Azure Disk may be a valid option as well (didn't try that out). Azure can in principle solve a lot of these hard problems, but the solutions aren't yet that well integrated into ACS. I do expect this to get a lot better over time.

### Future Announced Work {#futurework}

Microsoft is handling everything regarding the state of Azure Container Service very openly, and this also means that one of the developers has a meta Github repository for the state of Kubernetes on Azure: [`azure-kubernetes-status`](https://github.com/colemickens/azure-kubernetes-status). On his bucket list you can currently find the following things:

* Leveraging Application Gateway for use as Ingress Controller (as mentioned above)
* Auto-Scaling Backends
* Support for VMSS (Virtual Machine Scale Sets)
* ... and more.

### tl;dr {#tldr}

Kubernetes on Azure already looks very promising. There are some rough edges, but it looks as if the Azure team is on the right path: They leverage standard solutions which do not introduce a lot of Azure-specific components, except where that's actually designed by the Kubernetes team to be handled vendor-specificly.

I will continue tracking this project and come back in a couple of months with an updated status!

### Links {#links}

* [Status of Kubernetes on Azure](https://github.com/colemickens/azure-kubernetes-status)
* [Best practices for software updates on Microsoft Azure IaaS](https://docs.microsoft.com/en-us/azure/security/azure-security-best-practices-software-updates-iaas)
* [Example for mounting an Azure VHD into a Pod](https://github.com/kubernetes/kubernetes/blob/master/examples/volumes/azure_disk/azure.yaml)
* [Kubernetes Documentation on Azure Disk (possible only as of 1.5.1)](http://kubernetes.io/docs/user-guide/persistent-volumes/#azure-disk)
* [Kubernetes Issue regarding Azure Disk timing issues](https://github.com/kubernetes/kubernetes/issues/35180)
* [StatefulSets in Kubernetes 1.5+](http://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/)
* [Microsoft Azure Container Service Engine - Kubernetes Walkthrough (`az` CLI deployment)](https://docs.microsoft.com/en-us/azure/container-service/container-service-kubernetes-walkthrough)
