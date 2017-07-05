---
layout: post
title: Creating an acs-engine runtime docker image
subtitle: How to enable using acs-engine in build pipelines
category: dev
tags: [howto, open-source, devops, automation, cloud]
author: Martin Danielsson
author_email: martin.danielsson@haufe-lexware.com 
header-img: "images/new/Exportiert_56.jpg"
---

A while ago I wrote a post on [the state of Kubernetes on Azure](/state-of-kubernetes-on-azure/), and I promised an update after a while. Oh well, this post is not going to be that update, but it has still to do with Kubernetes, and Azure's commitment to making it a great developer experience to use.

Meanwhile, we're live with first applications on Kubernetes, running on Azure. The experience has been very good, and we have have been able to proceed at a good speed, automating our way through our code base, knowing that we now can provision everything from the Kubernetes cluster itself, DNS entries, SSL certificates (using `kube-lego` and Let's Encrypt) and the applications, completely via Jenkins pipelines.

### Automating Kubernetes Cluster creation

One of the crucial parts in our journey was that we wanted to be able to automate the creation of production-identical clusters using our Jenkins server. This of course also includes actually provisioning Kubernetes clusters. Until now, we actually just used the Azure CLI 2.0 (`az acs create`) command, but it does not give much flexibility, and that's why we decided to go directly for the core of that functionality, the `acs-engine`.

### Problem description

The thing with `acs-engine` is that it does not provide any kind of pre-built binary (and I think this is on purpose) you can just drop in your build pipelines, but only the source code to build `acs-engine` yourself. This is fine if you just want to store your ARM templates in your source code repository to make everything reproducible, but if you actually want to be able to tweak the parameters at provision time (and yes, we wanted that), you will need to take out the binary and make it usable without the source code repository.

### A solution to this problem

To enable this, we ended up doing the following:

1. Automatically check out the source code repository
2. Compile the `acs-engine` binary using the excellent pre-existing `devenv.sh` script
3. Take out the binary from the build
4. Create a minimalistic `busybox` based docker image, which can be used as a drop-in replacement for the `acs-engine` binary.
5. Optionally push to our own docker registry.

This image can be pushed to either docker hub (if you have an account), or preferably to your own docker registry; this enables you to actually keep track of the version of `acs-engine` you used for deploying at a specific point of time, or you can try out new versions of `acs-engine`, but still revert to an older version, which works for you.

### Using the image in pipelines

With a little docker magic in your build pipeline, you may now use the docker image you created as a replacement for `acs-engine`; no need to build `acs-engine` everytime, and you have a versioned and known version of `acs-engine`.

Obviously, this post does not contain much details, and I want to refer to the [GitHub repository](https://github.com/Haufe-Lexware/acs-engine-runtime) for those. Feel free to file issues if you find something which does not work, and in the meantime I'll ask the Microsoft people if they'd not like to incorporate this, or something similar. I think it's useful, and enables full automation of `acs-engine`.

The repository: [https://github.com/Haufe-Lexware/acs-engine-runtime](https://github.com/Haufe-Lexware/acs-engine-runtime)
