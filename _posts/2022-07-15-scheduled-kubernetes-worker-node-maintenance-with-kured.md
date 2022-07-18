---
id: 555
title: 'Scheduled Kubernetes Worker Node Maintenance with Kured'
date: '2022-07-15T18:18:50+00:00'
author: Ryan
layout: post
guid: 'https://geekyryan.com/?p=555'
permalink: '/?p=555'
gd_system_blocks_used:
    - '{"core/paragraph":16,"core/separator":1,"core/code":4,"core/image":3}'
categories:
    - 'Azure Kubernetes Service'
    - Docker
    - kubernetes
tags:
    - aks
    - 'azure kubernetes service'
    - kubernetes
    - Linux
---

If you manage Linux nodes, you know how vital performing regular maintenance is. Installing software patches that modify Linux kernel headers requires a reboot. Normally, as in the past, we would cordon and drain the node and then manually reboot, wait for it to come back online, verify its health, and add it back to the cluster. That’s a lot of manual work! How can we automate this?

Weaveworks created a great tool for simplifying these steps: Kured (the ***Ku**bernetes **Re**boot **D**aemon*). Let’s start by deploying Kured to our cluster.

Kured can be deployed in one of several ways. In this article, we’ll focus on deploying it via Helm. This is the simplest and quickest way to get it running in our cluster.

Follow these steps to install the Helm chart:

```
<pre class="wp-block-code">```
# 1) Add the Kured Helm repository
helm repo add kured https://weaveworks.github.io/kured

# 2) Update your local Helm chart repository cache
helm repo update

# 3) Create a dedicated namespace where you would like to deploy kured
kubectl create namespace kured

# 4) Install kured in that namespace with Helm 3 (only on Linux nodes)
helm install kured kured/kured --namespace kured --set nodeSelector."kubernetes\.io/os"=linux
```
```

If all went well with the command above, that’s it, you’re done! Have a nice day! 🙂

- - - - - -

If you want to test Kured, login to one of your Linux nodes, and install some patches with your package manager of choice (any patch that requires a reboot, typically patches that modify kernel headers). Then, check for a file named ‘reboot-required’ in /var/run:

```
<pre class="wp-block-code">```
ls -lisa /var/run/reboot-required
```
```

If you installed patches, and this file does not exist, none of your patches require a reboot. We can still fake the system into thinking a reboot is required by manually creating the ‘reboot-required’ file:

```
<pre class="wp-block-code">```
sudo touch /var/run/reboot-required
```
```

<figure class="wp-block-image size-full">![](https://geekyryan.com/wp-content/uploads/2022/07/image-1.png)</figure>Then, we’ll use Kubetail to tail the logs of all our Kured pods:

```
<pre class="wp-block-code">```
kubetail -label kured --namespace kured
```
```

<figure class="wp-block-image size-large">![](https://geekyryan.com/wp-content/uploads/2022/07/image-1024x749.png)</figure>By default, Kured checks for the existence of the sentinel file every 60 minutes. However, this behavior can be changed. See the github repo for more info:

[weaveworks/kured: Kubernetes Reboot Daemon (github.com)](https://github.com/weaveworks/kured#reboot-sentinel-file--period)

Scheduling on the node should be disabled if you are within the Kured schedule

<figure class="wp-block-image size-full">![](https://geekyryan.com/wp-content/uploads/2022/07/image-2.png)</figure>Now that the node is cordoned off, running pods on the node are drained, and the node is rebooted.

That’s it for this article. Have a great day!