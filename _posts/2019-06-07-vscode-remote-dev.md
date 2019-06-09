---
layout: post
title: "Musings about Remote Development with Visual Studio Code"
description: "Short snippets of notes on VSCode Remote Developent extensions from the perspective of a remote compute user"
excerpt: Keeping codes and configuration files in sync between client machine and remote server used to be a drawn-out exercise in personal responsibility via SFTP/SCP. VSCode Remote Development looks to change that - for the better.
---
---

When running computation codes on the remote HPC (high-performance computing) cluster, I need to ensure that I am running the correct version of the code with the intended configuration files which define the parameters of the job to be run. I was running computational fluid dynamics codes using the OpenFOAM v5.0 library, and needed to keep track of the optimization and discretization schemes that I was using for the simulations in the form of configuration files.