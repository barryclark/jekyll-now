---
layout: post
title: "Musings about Remote Development with Visual Studio Code"
description: "Short snippets of notes on VSCode Remote Developent extensions from the perspective of a remote compute user"
excerpt: Keeping codes and configuration files in sync between client machine and remote server used to be a drawn-out exercise in personal responsibility via SFTP/SCP. VSCode Remote Development looks to change that - for the better.
---
---

When running computation codes on the remote HPC (high-performance computing) cluster, I need to ensure that I am running the correct version of the code with the intended configuration files which define the parameters of the job to be run. I was running computational fluid dynamics (CFD) codes using OpenFOAM v5.0 (a C++ library for CFD), and needed to keep track of the combination of spatio-temporal discretization schemes + solvers + number of compute nodes that I was using for the CFD simulations in the form of configuration files. 


