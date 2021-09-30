---
layout: post
title: "Cheryl Hung chats with Mo Haghighi, IBM on Multi-cloud: The Why and How"
description: "Cheryl Hung chats with Mo on why multi-cloud is important, who can benefit and how to overcome resistance to change"
image: /images/2021-09-30-multi-cloud-the-why-and-how-with-mo-haghighi.png
video: https://www.youtube.com/embed/WrKeLUTVYno
published: false
tags:
  - Video
  - "2021"
---

I chat with Mo on why multi-cloud is important, which workloads can benefit and how to overcome resistance to change from development teams.

>**Cheryl**: Hey everyone, this is Cheryl Hung, and thank you for joining me. Today I'm really lucky to have as my guest Mo Haghighi, Mo and I are going to chat a little bit about multi-cloud deployments. Mo, would you like to introduce yourself?
>
>**Mo**: Hi Cheryl, thanks for having me. I'm a technologist, I love technology. I'm Head of Developer Ecosystems and Hybrid Cloud Build Team for IBM in Europe, Middle East and Africa. Just to tell you a little bit about what I do, I'm fortunate to lead an amazing team of over 100 developer advocates, architects and data scientists across EMEA, from London to Paris, Milan, Madrid, Berlin, Prague, Istanbul and Dubai, across 7 countries.
>
>Hybrid Cloud Build Team basically enables partners, clients and developers to develop the skills they need to build solutions with IBM's open Hybrid Cloud technology. Developers, architects and data scientists within hybrid build team will engage partners through architectural whiteboard sessions, hands on workshops and they co-create MVPs to help partners accelerate their time to market. So that's basically what I do and what the team does in a nutshell.
>
>**Cheryl**: Fantastic, you just reminded me of all these great places we can't visit at the moment, but one day soon hopefully we'll be able to go there! So you have a talk coming up about multi-cloud, I wanted to chat with you about why you think multi-cloud is important. What do you think multi-cloud is good for, and what workloads do you think it's not good for?
>
>**Mo**: It comes down to one important concept - portability - that's for DevOps engineers basically. Many companies, especially large enterprises, use multiple clouds to run their business critical workloads. Multiple cloud platforms enable them to shift their application workloads and services across several platforms to avoid downtime and also boost scalability. In addition, compute needs to run where the data resides, and for legal, security and governance reasons, data often must not leave companies' own data centers. That's basically why we need to have multiple cloud platforms to match the right workload to the right cloud environment.
>
>Again when we talk about the workload, as you mentioned in the second part of your question, it really depends on the workload. But again as I said it's all about matching the right workload to the right cloud environment. Some public cloud providers offer wider availability zones, some have faster provisioning time, some shorter downtime and some have specific features that make them unique for the type of application services and the workloads that a company might have that actually is suitable for them. So for those reasons, multi-cloud and hybrid cloud solutions are quite popular these days, and again it really depends on the workload.
>
>**Cheryl**: Talking about these workloads, often if you are moving to multi-cloud, that entails quite a large rewrite and some architectural rethinking of applications, and sometimes you get resistance from developer teams. They'll ask why should I spend this time investing into multi-cloud. How do you help those developer teams overcome that resistance?
>
>**Mo**: You know on the one hand companies want to avoid vendor lock-in, and also avoid having multiple teams with cloud platform specific skills. On the other hand developers are looking for ways to expedite their journey from development, testing, staging and production. Developers want to get started on coding as quickly as possible rather than spending time learning about different platforms, tools and services and basically learning how to refactor their services based on those platforms.
>
>So Kubernetes for the past decade or so has been the defacto platform for orchestrating microservices and cloud native applications which are basically good for hybrid and multi-cloud models. But it takes many commands and learning, learning Kubernetes takes a long time because it is based on a command line interface, it has features which makes it a little bit complex for developers to get started on it quickly. But then if you're talking about the right solution, it's all about having that platform agnostic or brand agnostic platform that you just have to write your application once and deploy anywhere. And that's where OpenShift comes in.
>
>OpenShift is built on top of Kubernetes and brings along all the brilliant features of Kubernetes. But it bundles Kubernetes with some essential features that ultimately provide the best experience to both developers and operations engineers. That's through a number of automated workflows which are not available in Kubernetes and those automated workflows are the result of the components that are included in the OpenShift platform, like an enterprise grade Linux operating system, networking, monitoring, registry, authentication, authorization services. So that's why OpenShift has become quite popular with developers because they can easily get it up and running, build and deploy their applications. I can actually give you more details about the productivity features of OpenShift for developers.
>
>**Cheryl**: Yeah, sure, I'd love to hear a little bit more.
>
>**Mo**: So basically Kubernetes offerings differ from one platform to another. Kubernetes on IBM Cloud platform, on AWS, GCP and Azure are all different. You have different plugins, different add-ons, and that basically makes it a little bit complex. If you want to move your application from one cloud platform to another on top of Kubernetes, you need to rewrite your application, you can't really move your application as is. Whereas with OpenShift Container Platform, your experience, the way you interact with the platform through the OpenShift console, stays the same. So building, deploying and managing your applications with OpenShift Container Platform is truly build it once and deploy it anywhere.
>
>And then the other important distinctive feature of OpenShift is the amazing web console that allows developers and operations engineers to implement almost all tasks from a simple graphical user interface. They can build, deploy, expose, update, almost implement anything in two separate perspectives of developers and administrators.
>
>Finally, if I want to tell the last feature which is actually the most important one for enterprise, Kubernetes is an open source project whereas OpenShift is a product based on an open source project. That basically makes Kubernetes quite important but at the same time makes OpenShift quite unique. It's like that classic example of comparing an engine with a car. Kubernetes is like an engine and OpenShift is like a car. You can't do much with an engine, you need to assemble it with other components to get it from A to B and for developers to become productive. With OpenShift it includes enterprise support, ecosystem certifications and regular releases and security updates at every level of the container stack and application lifecycle. So it's a platform that has everything ready for developers to start developing their applications, remotely contribute to the code and then deploy it immediately, and everything is taken care of by OpenShift. All developers need to do is commit and push and that's all.
>
>**Cheryl**: I'm definitely a fan of anything that makes Kubernetes easier to onboard onto, to learn and to operate. So things like having the components that you need bundled in, having enterprise support, having UI dashboards, all of these things do go a long way to making Kubernetes and cloud native more accessible and usable. Just again, do you see any workloads where you wouldn't recommend multi-cloud?
>
>**Mo**: It's a good question, but when I talk to our clients and partners, most of them are thinking about hybrid and multi-cloud solutions. It's actually good for any enterprise application because at the end of the day all these big companies, amazing companies out there, they want to have these abilities and reach, and also having flexibility for their developers and to provide them the productivity features.
>
>Hybrid and multi-cloud solutions are really good in many many aspects, and if you're interested to learn more about the details of what hybrid and multi-cloud solutions provide, I really encourage the audience to attend my talk at Think UKI to learn about those features. But I think hybrid and multi-cloud solutions are great for any workload, for any application, and for any services. If clients and partners out there want to create an application and package it and make it available on the OperatorHub which is within the OpenShift cluster, it enables any other user out there on an OpenShift cluster to install that solution with one click from the OperatorHub. That's a massive and powerful feature that OpenShift provides. As you know, at Think, which is the highlight of the year and brings together the best thinkers, the most exciting technologies to help developers and execs to build smarter, I'm very excited to be delivering this talk on the importance of hybrid and multi-cloud.
>
>**Cheryl**: Fantastic, sounds like a brilliant event and I look forward to seeing your talk Mo. That's it from us, we'll keep it short so Mo, once again thank you so much, and we'll see you again next time.
>
>**Mo**: Thank you Cheryl, all the best.
