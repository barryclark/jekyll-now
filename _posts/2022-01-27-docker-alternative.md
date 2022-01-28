---
layout: post
title: Docker Desktop alternative
---

## Docker subscription is changing

According to following [info](https://www.docker.com/blog/the-grace-period-for-the-docker-subscription-service-agreement-ends-soon-heres-what-you-need-to-know/?utm_campaign=2022-01-24-reminder-grace-period&utm_medium=email&utm_source=mailgun) Docker Desktop subscription will be / is changed on 31.01.2022. I would advise companies to switch to team or enterprise subscription (no i'm not affiliated to Mirantis :) ), because any replacement will come not for free and SDLC will be heavily affected. Also price model is comparable to other services and looks fair. 

In some cases, organization must follow concern rules or because of any other reason take the decision to get rid of Docker Desktop. This update affects Mac and Windows users. Happy Linux users can enjoy development process further :). So it will be the main question: how to replace Docker Desktop in SDLC for Mac and Windows?

## how SDLC looks like (very simplified)

Software Development Lifecycle or SDLC can be formalized differently, but usually comprises following steps:

- planning phase
- development phase, main update will be done here, comprises code, test, build. 
- releasing phase, usually Docker images are built in Linux environment, so not this phase is not affected if Docker file will be preserved, or should be updated otherwise.
- operation phase, also not affected.

## how to work without Docker Desktop?

Goal of this phase is to develop change, test it locally and pull it into source code management system.

Despite of the fact, that there are different tools, which are addressing building containerized applications, all of them (what i'm aware of) are for Linux or using Docker under the hood:

- [containers](https://github.com/containers/) by Redhat, common use case, currently can be used under Linux only.
- [jib](https://github.com/GoogleContainerTools/jib) unofficially by Google, Java ecosystem centric, so only JVM is needed.
- [kaniko](https://github.com/GoogleContainerTools/kaniko) another unofficial tool by Google, main focus eliminate docker in docker privilege escalation and build image on k8s pods.
- [buildpacks](https://www.cncf.io/projects/buildpacks/) OS agnostic framework by CNCF, turns source code into optimized image, supports Ruby, Go, Python, Java. But installed Docker is needed.
- Linux VM based solutions like pure VirtualBox VM or any VM plus Vagrant. 

This last option looks most viable for me and main reason, why i did not work much with Vagrant by HC was Docker. Also another one tool by HC looks pretty interesting here: Packer, it can be used for VM image preparation to enable unification of development environment.

## summary

Switch to paid plan or to Vagrant by HC.

## links

- [containers](https://github.com/containers/)
- [jib](https://github.com/GoogleContainerTools/jib)
- [kaniko](https://github.com/GoogleContainerTools/kaniko)
- [buildpacks](https://www.cncf.io/projects/buildpacks/)
- [vagrant](https://www.vagrantup.com/)
- [vagrant learning](https://learn.hashicorp.com/collections/vagrant/getting-started)
- [packer](https://www.packer.io/)