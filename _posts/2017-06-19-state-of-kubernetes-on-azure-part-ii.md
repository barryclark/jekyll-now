---
layout: post
title: State of Kubernetes on Azure - Part II
subtitle: Assessment of the Azure Container Service regarding Kubernetes support
category: dev
tags: [general, cloud, microservice, devops, docker]
author: Martin Danielsson
author_email: martin.danielsson@haufe-lexware.com
header-img: "images/new/Exportiert_43.jpg"
---

In the beginning of this year, Azure announced that its Azure Container Services for Kubernetes (ACS) is going Generally Available. I did a review of the [State of Kubernetes on Azure](/state-of-kubernetes-on-azure/) back then, and in the meantime, quite some things have happened with ACS, more possibilities have been opened up, and I thought it might be a good idea to     revisit the topic.

**Disclaimer**: By now, we are actually using ACS/Kubernetes for production scenarios, so any points of critique here are obviously to be seen relatively, it's definitely already production ready.

The main points of critique I had in my last post were the following:

* Getting the Service Principal right was quite difficult
* It was not yet possible to scale a cluster
* Dynamic provisioning of persistent volume claims did not work out of the box
* Slow connection of AzureDisk persistent volumes to Pods/persistent volumes
* Unclear status on who is really responsible for patching and updating the Kubernetes Nodes

In the following sections, I will assess the current state of these topics and try to shed some light on what has changed (or not).

### General Changes in the last half year

It's very apparent that Microsoft/Azure is committed to make Azure a great place to run containers with Kubernetes on. A lot of very interesting things are happening, especially within the team of Brendan Burns, one of the people who conceived Kubernetes at Google, and who is now working at Microsoft, heading both the Azure Resource Manager and Azure Container Services teams.

The vibrant GitHub project [acs-engine](https://github.com/Azure/acs-engine) is the base for enabling Kubernetes deployments on Azure (it creates ARM templates for different orchestrator types, Swarm, Mesos and Kubernetes) continuously develops and improves the templates, and are overall super supportive. Using acs-engine it's possible to select which version of Kubernetes you want to deploy (currently supported versions are 1.5.3, 1.5.7 and 1.6.2), and also tweak some other features (like multiple agent pools) which is not possible using the `az` command line.

### Service Principal woes no more

With the new command line interface (Azure CLI 2.0, `az`), it's now a lot easier to create a service principal which works with ACS; this feature might even have been available back then as well, but the documentation is now a lot better. In short: `az ad sp create-for-rbac` is your friend, with that command it's easy to create a service principal which works for the ACS Kubernetes (with the "Collaborator" role, e.g. For a resource group).

It's also possible to let the `az acs create` command create the service principal for you, but that requires you to be logged with an interactive session using a personal account owning  the subscription. Using a predefined service principal is a lot more robust, as it also allows for fully automating the provisioning process (e.g. Using Jenkins or some other automation tooling).

### Scaling the cluster

Scaling a cluster is by now implemented, both using the `az` command line, using the Azure Portal, and also when using templates which were create using the `acs-engine` tool. This was already in the making back then, and by now it's stable. It's possible both to scale up and down (the nodes, scaling containers/pods was always possible, that's core Kubernetes functionaliy).

I must admit I have not yet tried or looked for any autoscaling feature, as we have not needed it. Due to the quite calculatable workload we are currently running on Kubernetes in production, a static scaling (down in the night, up in the day) is enough for our use case.

### Dynamic Volume Provisioning

Another thing which now "just works" is the dynamic provisioning of persistent volumes via volume claims. By putting in a volume claim without any specific annotations, ACS will create a new VHD disk In one of the storage accounts which the provisioning step created (see blob `vhds`). Kubernetes has (upstream) incorporated changes which make this possible.

If you intend to have long running clusters, this is a really powerful concept; you don't have to care about the persistent storage, it's "magically" created and persisted for you. Beware: This does not mean that everything is backed up and can be restored automatically for you - it does not relieve you from those tasks, and leveraging the automatic features actually may even make this more difficult.

### Connecting AzureDisks is a lot faster - but still slow

The above mechanism uses the AzureDisk storage type (which is built in to Kubernetes), and when I tested this the last time (without the automatic provisioining), the time to mount these disks was at least 6 minutes. This has improved, but it's still nowhere near "instantaneous", e.g. as you may be used to when using NFS PVs. This in turn means that you cannot exactly rely on a really fast MTTR for pods when using AzureDisk as a backing storage; using this storage medium means your service landscape has to accept or bridge a 3-5 minute service outage.

All this means that AzureDisk is now a more valid storage type, but it does not cover all use cases. If you need ReadWriteMany access to a file type storage, there is only AzureFiles (SMB file storage) as an out of the box alternative - with the disadvantages which come with a `cifs` mount to Linux. All other means mean more effort, like setting up your own NFS, CephFS or GlusterFS storage. Other valid options may be to buy third party services, such as a NAS as a service (SoftNAS et al), if you do not want to roll your own storage implementation. These services obviously also come at a price though.

### Upgrading Kubernetes

The topic "how do I upgrade a KUbernetes cluster?" was also something which was not quite clear half a year ago, and which still is not yet available. Following the discussions and changes on the `acs-engine` project it is clear that a feature which is able to upgrade a running Kubernetes cluster to a newer version is in the making.

You may ask yourself how we can sleep well at night without knowing that such a feature is available. We gave this a thorough thinking, and we are currently not planning on using such a functionality anyway, even if it would be available. Instead we decided to, once a week, re-create the entire cluster, including all storage and application infrastructure, in order to be able to try out our application stack on different Kubernetes versions before we eventually also reprovision the production cluster with the newer Kubernetes version. This is also how we already have moved from 1.5.3 to 1.5.7, and this is also how we in due time will move to a 1.6.x Kubernetes version.

### Patching VMs

The last question where we had some issues in getting full clarity is "who patches the VMs?" In my opinion (or at least as to what I have understood), ACS still doesn't offer a full hands-off type of deployment of Kubernetes onto VMs, but it's quite good. All VMs (Masters and Agents) run a recent Ubuntu 16.04 version, with automatic updates activated. This means you will to a certain extent always have fully patched VMs which run your Kubernetes workload. It still means that you will have to restart your VMs after kernel patches ("System restart required!") once in a while, so automating this is a good idea. With these measures in effect, it should be fairly straightforward to have long running clusters on ACS. We do recommend using at least Kubernetes 1.5.7 though, the 1.5.3 distribution has the problem that it creates a lot of `wc` zombies on the agents, which after a while cause various weird issues.

Still, in order to circumvent all the issues you may run into when operating long running clusters, we recreate the cluster every week. It both makes sure we can create a production cluster from scratch, and also makes sure we get the latest kernel patches even without restarting the nodes (or get strange effects by zombie processes, for whatever reasons).

### Things we are still missing

This last section before the conclusion I would like to bring up two to three things we have been struggling a little with: `ReadOnlyMany` storage and the logging of container output.

For some legacy services we needed `ReadOnlyMany` storage, and for various reasons (read rights, symlinks, speed), we couldn't leverage AzureFiles storage. For now, we resorted to creating our own NFS server, with fast 1 TB Premium Storage managed disks backing it. With that setup, we could get 70-90 MB/s of transfer speed into the actual pods, which is just about enough for us. Being able to mount e.g. Managed Disks in `ReadOnlyMany` mode to a cluster, and being able to mount it fast, would be an awesome thing to have for us.

The other thing which turned out to be a lot more challenging than we had expected is the topic of log forwarding from the containers to a log system (Graylog in our case). After moving from `az` to `acs-engine` for provisioning clusters, we noticed that the log driver changed from `json-file` to `journald`. In principle, this is good and the more modern solution. The only problem with that is that our preferred log shippers (fluentd and fluent-bit) do not yet support `journald` as a log source, whilst JSON logs could just be tailed. Currently, we are running [our own fork of `acs-engine`](https://github.com/Haufe-Lexware/acs-engine) due to this; as soon as we can ship the `journald` logs directly again, either via `fluent-bit` or some other means, we will switch back to `master` of the main repository on GitHub.

**Update**: By now, `acs-engine` also uses `json-file` for logging again, [the issue we filed for this](https://github.com/Azure/acs-engine/issues/689) has been closed! This means we will be able to go back to the upstream implementation of `acs-engine`. Once more, this shows how much the Azure team listens to its customers.

The last thing which has been a little tedious when working with `acs-engine` is the lack of binary releases. `acs-engine` comes as source code only (until very recently), and using it requires you to compile it yourself; there are no downloadable binaries you can just use. To circumvent this, we created a small repository I described in a [previous blog post](/creating-an-acs-engine-runtime-image/) which generates a minimal docker image which can run `acs-engine`. The `acs-engine` team is aware of this drawback and has already established a release process draft and a release schedule, so I guess we can also expect precompiled and versioned binaries quite soon.

### Conclusion

We have moved first production workloads to Azure ACS, on Kubernetes. We can recommend it as a good solution for teams which do not have a large IT department willing or able (for whatever reason) to run a Kubernetes cluster for you. If your team needs to operate a cluster itself, ACS, with some caution, can be used to roll your own Kubernetes cluster. We think the support will get better and better, also just by ACS incorporating new releases of the very fast moving Kubernetes project. ACS still uses the completely vanilla Kubernetes distributions, which means that incorporating new releases into ACS will be very straightforward.

Over the course of the next couple of months, we will move even more workload to our Kubernetes cluster, and I have a good gut feeling about that, In November or December, I'll write Part III of the "State of Kubernetes on Azure", then perhaps with a final verdict ;-)
