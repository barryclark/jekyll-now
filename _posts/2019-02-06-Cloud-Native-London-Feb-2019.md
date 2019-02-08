---
layout: post
title: "Cloud Native London February 2019 Roundup"
tags:
  - Video
  - Meetup
  - "2019"
---


![Cloud Native London February](https://pbs.twimg.com/media/Dyvrp3KWsAAAzl2.jpg)

The room was buzzing as we kicked off our February Cloud Native London meetup, featuring three great speakers. 

![Asfand Qazi, me, Ecaterina Gamanji and Jakub Borys](https://pbs.twimg.com/media/DywACEaX0AM4I_L.jpg)
(From left to right: Asfand Qazi, me, Ecaterina Gamanji and Jakub Borys)

Thanks to our sponsors [StorageOS](https://storageos.com/), [Tecknuovo](https://www.tecknuovo.com/), [Contino](https://www.contino.io/), [Pusher](https://pusher.com/), [Humio](https://humio.com/) and [Upcloud](https://upcloud.com/).

First up was a talk on Horizontal pod autoscaler (HPA) and vertical pod autoscaler (VPA), followed by developing in the cloud, and finally getting more out of the modern cloud by letting someone else look after your servers.

![Ecaterina Gamanji](https://pbs.twimg.com/media/DyvsA42X0AI88XC.jpg)

Ecaterina Gamanji from Condé Nast International explained about ["HPA and VPA: scale your K8s cluster on any metrics"](https://skillsmatter.com/skillscasts/13439-hpa-and-vpa-scale-your-k8s-cluster-on-any-metrics-ecaterina-gamanji-conde-nast-international), focusing on the following topics:

* In the last years Kubernetes has been the nucleus of container orchestration frameworks. With the growing number of microservices in a cluster, scalability is one of the core pillars for a fault-tolerant application. Horizontal pod autoscaler (HPA) and vertical pod autoscaler (VPA) are resources that are addressing scalability concerns in a Kubernetes cluster. In this talk, will focus on how a cluster can be scaled on any metrics, well as how resource requests are set and adjusted for an application based on historical usage.

* Horizontal pod autoscaler is responsible to provide a mechanism that will automatically adjust the amount of replicas required for an application base on a specific metric or resource. Since Kubernetes v1.10, external metrics are supported by the HPA object, which exposes any outside-cluster metrics to the autoscaler. Hence, at this point in time, HPA in a combination with cluster autoscaler can expand the size of the cluster on any metrics provided by the metrics APIs provide (e.g. Datadog cluster agent).

* Quality of service(QoS) are classes used by the scheduler to place or evict a pod form a node. These classes are computed using the resource requests and limits set for a application within the cluster. From all 3 type of QoS (guaranteed, burstable and best-effort), an application will benefit the most from a guaranteed classification, which will ensure the pods are scheduled with a higher priority. A best-effort QoS, will not ensure the lifetime of a pod and the scheduler will decide to evict these pods in case of a resource starvation situation. 

* Vertical pod autoscaler is a mechanism that automatically computes the resource requests for an application. It is a easy install CRD, that recently moved to a beta version (v0.3.0), and is composed of 3 part: 
- recommender - interacts with the metrics provider and calculates a threshold for CPU and memory
- updater - decides whenever a pod has the right resource requests sets
- admission controller - intercepts the pod creation request and makes sure the recommended thresholds for CPU and memory are set


![Jakub Borys](https://pbs.twimg.com/media/DyvyGDnXgAE7Hgh.jpg)

Following that, Jakub Borys from Student.com discussed ["Development in the Cloud"](https://skillsmatter.com/skillscasts/13441-development-in-the-cloud-jakub-borys-student-com), mentioning that:

* Developers should have an easy and standardised way of creating isolated preview environments where changes can be pushed continuously after every code commit. Use tools like [Brigade from Azure](https://github.com/Azure/brigade) to automate this process.

* With large and complex Microservices deployments running integration services locally is at some point not feasible. Use [Telepresence proxy](https://www.telepresence.io) to expose Kubernetes services to your local environment. 

* Early experimentation is crucial to maintain high velocity during development. With [Ksync](https://github.com/vapor-ware/ksync) you can continuously make your local changes available in running container without time consuming image build/upload steps.

Other resources mentioned in the talk: 
[Article](https://medium.com/@JakubBorys/development-in-the-cloud-4aa2cabd3880)
[GitHub repo](https://github.com/kooba/ditc-config)



![Asfand Qazi](https://pbs.twimg.com/media/Dyv-Y5WWkAMwdn_.jpg)

Finally Asfand Qazi from Cloudership talked about ["How you can get more out of the modern cloud by letting someone else look after your servers"](https://skillsmatter.com/skillscasts/13440-how-you-can-get-more-out-of-the-modern-cloud-by-letting-someone-else-look-after-your-servers-asfand-qazi-cloudership). His takeaways were that:

* We should try to use services as much as we can - running our own infrastructure is a pain. Modern cloud services allow us to not have to ever run a single traditional server.

* Serverless computing just is not ready for the kind of rapid application development that traditional web frameworks offer us. It can be very beneficial for certain tasks but for now, using Rails, Django, Express.js, etc. will get quicker results when developing web apps.

* Jumping on the bandwagon of the latest hot thing is not often wise - it takes more than just going through the tutorial on the front page to determine if a tool or tech is worth using. What help, support, and existing knowledge is available already is a very important consideration when choosing what to build your apps and platforms with.


We also have a promo offer from Upcloud: 
UpCloud's cloud (infrastructure as service) is specifically designed for developers, with performance on their agenda! Anyone signing up with the EU50 Promo code gets $50 free and depositing $10 gives them $250 for 30 days! Take us for test drive and experience the difference for yourself.

## Cloud Native London March

The next meetup is on Wednesday 6th March, and our speakers include folks from Contino, Controlplane, and Sardina Systems. [RSVP and save the date now!](https://www.meetup.com/Cloud-Native-London/events/257404494/) Don’t forget you’ll need to sign up with the venue as we get closer to the date.

See you there!

Cheryl (@oicheryl)
