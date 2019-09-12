---
layout: post
title: Vault Journey
category: Vault
tags: [vault, devops, terraform, ansible]
---

Being a good SysAdmin requires some sense of laziness. In the spirit of that approach, I've spent some time looking into Hashicorp's Terraform and Red Hat's Ansible tools in my organization's route to Google Cloud Platform. I wanted a method to create reproducable Copute Engine VMs that would allow us to easily create multiple hosts with minor changes quickly and easily. 

I decided that with the use of Terraform, Vault (also from Hashicorp) would allow me to templatize the configs, as well as, create secrets/passwords that would be randomized, able to be called at will, and even automatically rolled with a configured frequency.

To-Do
[x] - Install Vault
[x] - Configure infrastructure
[] - Update Terraform and Ansible configs
