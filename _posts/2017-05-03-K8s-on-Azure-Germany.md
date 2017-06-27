---
layout: post
title: Installing Kubernetes using ACS Engine in Azure Germany
subtitle:
category: dev
tags: [howto, cloud, Kubernetes]
author: Raul Firu
author_email: raul.firu@haufe-lexware.com
header-img: "images/new/Exportiert_13.jpg"
---
Last month I visited KubeCon Europe - or the Cloud Native Con as it is properly named. Checked out some great talks (in some way too small rooms) and met with cool people. Out of those were the guys from Microsoft (I know - MS at a k8s conf - wow).

My issue for some time was the fact that ACS (Azure Container Service) was not available for Azure Germany, or Azure.de as we call it for simplicity.

Some of our projects can't use AWS or Azure because of customer data concerns, but we can use a German IaaS provider and Azure.de fits.

Now, we can always use [k8s the hard way](https://github.com/kelseyhightower/kubernetes-the-hard-way) but ACS would make our life much easier - and eventually this is not something we would like to learn to operate anyway. But nevertheless ACS is not available.

What to do?

We learned that [ACS engine](https://github.com/Azure/acs-engine) should work and that we should create the Azure.de templates we need to start, but after giving it a try it didn't look like it.

Now, back to KubeCon, I met with [Cole Mickens](https://twitter.com/colemickens) and we went though my problems with ACS and azure.de.

We found a workaround, and here it is:

1. Follow the steps from [here](https://github.com/Azure/acs-engine/blob/master/docs/kubernetes.md)

Make sure you add `germanycentral` for example as location at step 4

And make sure you edit the `azuredeploy.parameters.json` after step 5 and before 6 and change the Ubuntu image number to: **16.04.201701130** (for some reason Azure uses different images of Ubuntu 16.04 for different clouds)
2. ssh to the master node with the generated key from step 2 above (you will need to do this manually or you from pipelines unfortunately)
3. run all `kubectl` commands like this

```
kubectl -s http://localhost:8080
```

Since then I am happy to say that all those issues have been solved (by a now pending pull request from @wangtt03) and here is how you can use it:

1. get the pull request somewhere
```
git remote add ccg git@github.com:/ChinaCloudGroup/acs-engine.git
git remote update
git checkout sovereign_cloud
git reset --hard ccg/sovereign_cloud
```
2. follow the steps from [here](https://github.com/Azure/acs-engine/blob/master/docs/kubernetes.md)

Until it's merged to master you'll need to copy the contents of the branch to `$GOPATH/src/github.com/Azure/acs-engine` before you build.

3. ssh to master node and run commands properly

4. alternatively you can install `kubectl` locally, get the config file from the matser node, `~/.kube` and copy it locally in your home `.kube`

Enjoy!

I'm sure in a few days everything will be merged to master and I'll have to update this blogpost with a much simpler version, AKA: just follow the how-to. But if you want o try until then, here is why.

Also, I am happy to have met Cole and the guys from MS - that made KubeCon even more worthwhile.
