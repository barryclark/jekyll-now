---
layout: post
title: "Musings about Remote Development with Visual Studio Code"
description: "Short snippets of notes on VSCode Remote Developent extensions from the perspective of a remote compute user"
excerpt: Keeping codes and configuration files in sync between client machine and remote server used to be a drawn-out exercise in personal responsibility via SFTP/SCP. VSCode Remote Development looks to change that - for the better.
---
---

When running computation codes on the remote HPC (high-performance computing) cluster, I need to ensure that I am running the correct version of the code with the intended configuration files which define the parameters of the job to be run. I run computational fluid dynamics (CFD) codes using OpenFOAM v5.0 (a C++ library for CFD), and need to keep track of the combination of constants + boundary and initial conditions + spatio-temporal discretization schemes + solvers + number of compute nodes that I was using for the CFD simulations in the form of configuration files. Often, I have to check these configurations using vim on the remote cluster environment before executing my codes on the cluster, which could sometimes lead to frustration as I would need to check across to ensure that changes to these files on the local desktop environment and the remote cluster environment are in sync with each other.

Amongst my scatter-brained angst of ensuring that the correct jobs are run on the HPC and the correct results are retrieved from the HPC back to my local desktop environment, I wonder - is there a more user-friendly way for me to work and make changes directly on the remote environment, without going through vim and (clumsily, since I do tend to make mistakes on vim) mess up my configuration files?

When I started my current role as a data engineer, 