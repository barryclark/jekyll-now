---
layout: post
title: How the Aurora team manages their Kubernetes deployments
subtitle: Immutable Infrastructure and CI/CD with Jenkins, Docker and Kubernetes
category: general
tags: [cloud, microservice, devops, docker]
author: martin_danielsson
author_email: martin.danielsson@haufe-lexware.com
header-img: "images/bg-post-clover.jpg"
---

In this blog post, I would like to shed some light upon how we leverage Azure ACS, and more specifically the Kubernetes cluster deployments it offers, to run short-lived clusters for production use at the Aurora team at Haufe:

* Our five step approach to deploying Kubernetes, and our application to Kubernetes
* How we currently handle backups
* How this architecture enables production-identical deployments anytime for testing and development

When designing the build and deployment pipelines (we use Jenkins for that in our project) for our new product, we wanted full automation from the provisioning to the deployment of the services. What we also wanted was to be able to replace certain services within our cluster without having to redeploy the entire cluster (which is what you usually use Kubernetes for, right?), and this is how we came up with the following "layered" approach to deploying.

### Step 1 - Infrastructure provisioning

Our infrastructure currently consists of three main components: An NFS server for persistent storage, a Postgres VM for SQL storage, and our Kubernetes cluster. For now, we deliberately chose to not run the database inside Kubernetes (for reasons...). The storage of both the Postgres and NFS servers are taken from backups, so that we start from the latest backups. If we are provisioning a new Production deployment, we first back up the old production cluster, so that we have the latest data; in principle, this introduces a data loss of around an hour, but due to the nature of the data we persist currently, this is not very important; in the future, we may simply introduce a maintenance window for this, somewhen in the night. Our customers are country-based, and an hour a week in the dead of the night will mostly go unnoticed, as the customer data kept in the database is quite limited anyway.

All infrastructure goes into a dedicated, time stamped resource group; this resource group name is used throughout the provisioning pipelines to decide  which deployment is to be changed/created via the deployment pipeline. A typical production resource group could be called `prod1706130345` to show it was created June 13th 2017, at 03:45 AM.

For Kubernetes, we use `acs-engine` to provision the cluster; currently using our own fork (for reasons mentioned in [this blog post](/state-of-kubernetes-on-azure-part-ii/)). For the other two VMs, we use the plain `az` command line, and we make use of managed disks, for reasons explained a little later in this post (see backup strategy).

Further setting up of the VMs is done via Ansible, which has for us turned out to be an effective means of doing provisioning of virtual machines. Please note we are only using Ansible for the one time setup of the VMs. We are not using Ansible later on, e.g. to update the VMs or install additional things later on. We treat the VMs as "cattle", not as pets; all changes to the infrastructure needs to be done in code first, and then the cluster setup has to be reprovisioned for the changes to take effect ("infrastructure as code"). 

### Step 2 - Priming the cluster and setting up DNS entries

After the plain infrastructure bits have been done, we "prime" the Kubernetes cluster for use. For us, this means we prepare the cluster with the needed infrastructure all the services inside need, such as log shippers, our cluster Graylog system and foremost the NGINX ingress controller, so that we get a public IP address for the agent load balancer.

Using a dedicated DNS zone, we then create A records for the ingress end points we know will be inside the cluster; we are thinking about how we can move this step to the services themselves, but for various reasons, such as having just one place where we install TLS certificates (here), we chose to have that part centralized.

Please note that the A records are not the "real" customer facing, but instead intermediary DNS entries we will use later on (see Step 4) to point a traffic manager to them. An example DNS entry could be `graylog.prod1706130345.idesk.haufe.io`, pointing to the ingress controller's load balancer.

### Step 3 - Deploying all the `latest` services

Now we're set and done to deploy our actual services and applications on the cluster. For each service, we have dedicated deployment pipelines which we trigger from one "bracket" type pipeline which we use when provisioning entirely new clusters. These are now triggered in the right order (some services depend on others at first startup). All actual applications are obviously containerized and run inside Kubernetes, and here we just deploy all the `:latest` versions (see below, "Business as usual" for a description of why this is okay), and make sure they work together via automatic integration tests.

All application images reside on Haufe's private Docker registry; in the future we may move to the Azure Docker Registry (ACR, Azure Container Registry), simply because pulls from such a registry would be much faster than from our on premise Artifactory, but right now, it works fairly well even if all images are pulled from Freiburg instead of from a registry near the Kubernetes cluster.

An important bit here is that most deployment pipelines are built up in a way that we don't just deploy a service to the cluster, but also check that it actually works, before we decide our Jenkins pipeline is "green". If something goes wrong, the entire provisioning will be cancelled and left in the state it was, so that we are able to do debugging and error checking on the setup.

Those services which are customer facing deploy their own ingress resources which in turn are picked up by the ingress controller (VHOST routing).

### Step 4 - Final DNS setup using Traffic Managers, `kube-lego`

After all is set and done, we now have a new production identical cluster which is ready to take over operation from the old cluster. This is done by leveraging the Azure Traffic Manager service - it's a special kind of service which is able to quite fast switch DNS entries (and even load balance per DNS), and this is the last but one step of the provisioning process. We let the traffic manager point the real customer facing DNS entries to the A records we provisioned in Step 2, via CNAME indirection.

After a five minute wait we can be sure that the DNS entries have propagated, and now we also deploy `kube-lego`. We create backups of the TLS certificates `kube-lego` creates and use those in the priming step. This means that `kube-lego` normally doesn't have to do anything special until the certificates expire (which can happen in this generation of the cluster, or the next, or the one after that,...). Only if new ingress resources have been introduced in this provisioning, `kube-lego` will go ahead and get new certificates for that ingress. This is also why it's important to wait those five minutes until the Traffic Manager has really rerouted the traffic to the new cluster: Otherwise we might quite easily run into `429`s from Let's Encrypt, as the ingress VHOSTs are not yet reachable.

### Step 5 - Business as usual, CI/CD

Tada! We now have a new production cluster in place, and we may throw away the old one (which is very simple - we just delete the entire resource group).

Running through this process (which takes around an hour) each time we want to update a service inside the cluster is obviously not a really grand idea, and not what we want to have for a real CI/CD pipeline. The good thing with our approach though is that we have designed all the pipelines in Step 3 in a way that we can use them to re-deploy any service to any cluster anytime, with only the times it takes to deploy just that pipeline (ranging from under a minute for simple services, to around 15 minutes for the core service which is always integration tested at deployment, which also takes a while).

This makes it possible to - from our build pipelines - launch also the deployment pipelines, all the way from our test cluster to our production cluster. All steps are validated using automated testing steps, and if we go wrong somewhere (and deployed a bug we cannot easily roll forward on), we can always and very easily roll back to a previous container image version.

Ah, versions, I promised to lose a couple of words on that as well: When deploying a new version of a container image to a running production cluster, we always deploy an explicit tag of the image. Only at first deployment after a fresh provisioning we use the `latest` tags. The deployment pipelines then check whether a deployment to production was successful, and if it was, tags exactly that image as `latest`. This way we can be fairly sure that we always have "good" images tagged as `latest`, and not just the latest build - it's the latest good and working build which has at least once been successfully deployed to production.

## Handling backups

For backups of the production environment we leverage a fairly recent Azure feature, namely managed disks. Using managed disks, we can on the fly create snapshots of the production disks attached to NFS and Postgres. This is not (yet) possible with other types of disk images (VHDs in storage accounts, for example).

The same technique is what we use when we create new clusters - we use the Azure API to retrieve the latest managed disk backups which we then in turn clone into the new resource group. This works very well, and is also reasonably fast (30 seconds to a few minutes, depending on the mood of Azure, possibly the overall load on the region).

## Deploying dev and test cluster

The above backups also enables us to create other production-identical deployments of our application stack. This has several advantages:

* We can load test production identical deployments and test scaling without accidentally bringing the production cluster down; the results are valid, as the cluster is identical to the production cluster
* Risky infrastructure changes, such as changes in the Ansible scripts or refactoring in the infrastructure provisioning can very easily be tested before we apply the changes to a new production cluster
* We automatically have a production data copy in dev and test clusters, so that we don't have to be concerned about the test or dev data being different from the production data
* Dev and test clusters are only provisioned on an as-needed basis; all clusters except production can be shut off and thrown away in the night and on weekends - nobody would work on them anyway, and a new cluster can be provisioned on demand.

## Conclusion and outlook

Right now, we have much confidence in our deployment pipelines, which enables us to move a lot faster and concentrate on the actual application deployment again. It took us quite some time to (as we think) get this right, but we definitely feel it was worth the effort.

There are some things which we want to improve over the next couple of months, and the most pressing ones are:

* Moving to the Azure Container Registry to speed up deployments; open issue for this is the security scan of images we need to spend some time on to make it work right
* Speeding up the infrastructure provisioning (Step 1); currently all steps inside Step 1 are done more or less sequentially in a bash script even though quite some bits can be done in parallel

All in all, we're in a good working state already, and we can start to just improve on those things we need, and other than that, work on the application itself, leveraging our new CI/CD pipelines to gain more speed.

If you have any specific questions or if you want to know details on some or more of the steps, give me a shout on Twitter or as a comment on this blog post, and I'll see what I can do about that.
