---
layout: post
title: "[Photos] [Videos] [Dec 2018] Cloud Native London December 2018 Roundup"
---

![Cloud Native London December](https://pbs.twimg.com/media/DuPOblYXgAIDUDp.jpg)

The room was packed out for Cloud Native London's December meetup, ably hosted by Dominique Top and featuring three brilliant, fascinating talks.

As always, thanks to our sponsors [StorageOS](https://storageos.com/), [Tecknuovo](https://www.tecknuovo.com/), [Contino](https://www.contino.io/) and [Pusher](https://pusher.com/)

First up was using Spinnaker and Kubernetes for continuous delivery in the cloud with Spinnaker and Kubernetes, followed by a modern approach to writing microservices called gRPC, and wrapping up with implementing secure GitOps in production. See the full video [here](https://youtu.be/_adkJbf1bRU)

![Ana Calin](https://pbs.twimg.com/media/DuPWoRaWsAQnoix.jpg)

Ana Calin from Paybase gave a talk on ["Continuous Delivery in the Cloud with Spinnaker and Kubernetes"](https://youtu.be/_adkJbf1bRU?t=240), explaining that:

* Spinnaker is the first complete continuous delivery platform that supports multi-cloud out of the box and has been designed around microservices where various components talk to each other. Spinnaker was created to easily achieve highly-available, multi-account, multi-cloud artifact deployment.
* Although Kubernetes has a Deployment API it is not very advanced and it isn’t near enough for organisations looking for fully automated deployment pipelines. This is where Spinnaker comes and fills the gap by allowing organisations to define their own deployment pipelines whilst monitoring each stage as well as the health of a K8s cluster.
* Spinnaker has not been designed to replace Jenkins or any other CI tool and running Spinnaker requires plugging in a CI server. Although Jenkins has extensive plugin support, it can fall short as a complete deployment tool especially since it wasn’t built with the cloud in mind.
See her slides [here](https://docs.google.com/presentation/d/1nl0kG-jQ2M2BZvySbYwbUOrF9bd2EokNoA1r2XywTfM/edit)

![Dheeraj Bhadani](https://pbs.twimg.com/media/DuPZyDRW0AAoqJR.jpg)

Following that, Dheeraj Bhadani from DNEG (formerly known as Double Negative) described ["gRPC: Modern approach to write microservices"](https://youtu.be/_adkJbf1bRU?t=1975), and left us with the takeaway that:

* Writing microservices with defined contract, advantage of http2 and bidirectional streaming of data, server and client stub in 10 different languages are a few key capabilities of gRPC.

![Luke Bond](https://pbs.twimg.com/media/DuPmsEyWsAEY9Og.jpg)

Finally Luke Bond from Control Plane told us about ["Secure GitOps in Production"](https://youtu.be/_adkJbf1bRU?t=4345). In his takeaways he told mentioned that:

* GitOps changes the attack surface of their Kubernetes deployments; he discussed why they feel it's an improvement.
* Threat modelling is simple tool for assessing the threats of a system; he gave an introduction.
* He talked through how they went about threat modelling their GitOps deployment, and how to make it even more secure.
Read his slides [here](https://docs.google.com/presentation/d/1B-LtFa2766jbFFPwg5QgcQKwS2q8G_Jc4VK259fLA_o/edit?usp=sharing)

## Cloud Native London January

The next meetup is on Tuesday 8 January, and I will be be back hosting for the first meetup of 2019! Joining us are speakers from HashiCorp, Elastic and Contino. [RSVP and save the date now!](https://www.meetup.com/Cloud-Native-London/events/254553430/)

See you then!

Cheryl (@oicheryl)
