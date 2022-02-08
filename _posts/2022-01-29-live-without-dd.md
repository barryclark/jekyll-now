---
layout: post
title: How to work without Docker Desktop
---

## Docker Desktop subscription is changing

According to following [info](https://www.docker.com/blog/the-grace-period-for-the-docker-subscription-service-agreement-ends-soon-heres-what-you-need-to-know/?utm_campaign=2022-01-24-reminder-grace-period&utm_medium=email&utm_source=mailgun) Docker Desktop subscription will be / is changed on 31.01.2022. I would advise companies to switch to team or enterprise subscription (no i'm not affiliated to Mirantis :) ), because any replacement will come not for free and SDLC will be heavily affected. Also price model is comparable to other services and looks fair. 

In some cases, organization must follow concern rules or because of any other reason take the decision to get rid of Docker Desktop. This update affects Mac and Windows users. Happy Linux users can enjoy development process further :). So it will be the main question: how to replace Docker Desktop in SDLC for Mac and Windows?

## how SDLC looks like (very simplified)

Software Development Lifecycle or SDLC can be formalized differently, but usually comprises following steps:

- planning phase
- development phase (code, test, build steps), main update will be done here.
- releasing phase, usually Docker images are built in Linux environment, so this phase is not affected if Docker file will be preserved, or should be updated otherwise.
- operation phase, also potentially not affected.

## how to work without Docker Desktop?

Goal of development phase is to develop change, test it locally and pull it into source code management system.

Despite of the fact, that there are different tools, which are addressing building containerized applications, near all of them (what i'm aware of) are for Linux, Linux VM or using Docker under the hood:

- [Rancher Desktop](https://rancherdesktop.io/) by Rancher Labs looks very promising, supports Mac and Win, provides nerdctl as cli for containerd. 
- [containers](https://github.com/containers/) by Redhat, common use case, currently can be used under Linux only. Podman can be used on Mac or Windows as remote client. And for Windows there is connection to WSL2 (Windows Subsystem for Linux).
- [jib](https://github.com/GoogleContainerTools/jib) unofficially by Google, Java ecosystem centric, so only JVM is needed.
- [kaniko](https://github.com/GoogleContainerTools/kaniko) another unofficial tool by Google, main focus eliminate docker in docker privilege escalation and build image on k8s pods.
- [buildpacks](https://www.cncf.io/projects/buildpacks/) OS agnostic framework by CNCF, turns source code into optimized image, supports Ruby, Go, Python, Java. But installed Docker is needed.
- Plethora of Linux VM based solutions like pure VirtualBox VM with GUI, Linux VM plus podman as remote client where Linux VM is started manually or under the hood on Mac or Windows developer's host. 
  This last option looks viable for me and and was first choise before i was told, that there is Rancher Desktop project. Also another one tool by HC looks pretty interesting here: Packer, it can be used for VM image preparation to enable unification of development environment.

## Linux VM

For some developers this is a good known way to work inside Linux VM on host OS, for others, who are new, concept looks pretty simple: There is a Linux Vm with Docker engine, where changes are verified, on host OS. There can be variants:

* where develop source code itself and how to connect to VM
  Opening VM GUI in full screen and working with editors there sometimes leads to performance lost, but is the easiest way, because code is developed where it is built and tested, also nowadays VM engines support native virtualization on some platforms (Windows 10 and 11 + Hyper-V)and performance can be better as before. In comparison to developing source code in host OS and mounting somehow folders to VM, e.g. with sshfs or folder mapping. It also depends from editor capabilities, VS code has remote explorer also JetBrains provides similar ways, and GitHub Codespaces also solves this problem because of virtualized remote development environment.
* how to prebake and distribute VM for development environment unification
  If you want to enable unified development environment to speed up onboarding and change distribution, you can try to introduce on org, domain or team level prebuilt VM image or disc sharing, that is reconfigured for development. One of the possible implementations could looks like HC Packer configuration that builds VirtualBox disk and saves it on S3 bucket. What can be easily wrapped in CI/CD process.

## Rancher Desktop

Looks very promising despite of current beta status as an OSS Docker Desktop substitution. Both Win (also WSL2 integration is provided if corresponding check box is activated) and Mac are supported. For image and container management, there is `nerdctl` tool with Docker comparable syntax, what makes learning curve smoother.

## summary

Switch to (list is ordered):
1. Rancher Desktop
2. paid plan
3. Linux VM based solution

## links

- [containers](https://github.com/containers/)
- [podman and WSL2](https://www.redhat.com/sysadmin/podman-windows-wsl2)
- [jib](https://github.com/GoogleContainerTools/jib)
- [kaniko](https://github.com/GoogleContainerTools/kaniko)
- [buildpacks](https://www.cncf.io/projects/buildpacks/)
- [vagrant](https://www.vagrantup.com/)
- [vagrant learning](https://learn.hashicorp.com/collections/vagrant/getting-started)
- [packer](https://www.packer.io/)
- [GitHub codespaces](https://github.com/features/codespaces)
- [Rancher Desktop](https://rancherdesktop.io/)