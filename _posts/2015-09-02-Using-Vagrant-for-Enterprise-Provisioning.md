---
layout: post
title: Using Vagrant for Enterprise Provisioning (A practical example)
excerpt_separator: <!--more-->
tags: [vagrant, virtualbox, tutorials]
---

Vagrant is a great abstraction layer over your stack.
If you are not using it yet, I suggest that you [give it a try][1].

As a colleague recently wrote 

> I cannot imagine life without Vagrant right now.
> It would be a dark, lonely place

:-)

Spinning up your own VMs locally or remotely is great, but how could you generalize its use across an enterprise for day-to-day development?

One routinely comes across long and complicated Vagrantfiles, definining all sorts of provisioning steps.
These may have grown organically, but they usually end up being copied from project to project.

How can you provide the benefits of environment-as-code, while avoiding copy-paste hell?  

Hopefully this post will provide an answer.
<!--more-->

## Some requirements

Having a "realistic" and "stable" DEV environment for integration testing is a regular pain point in big organisations.

**Realistic**
There are usually some overarching principles across the organisation (e.g. "we deploy on RHEL 6.5, with patches XYZ, which runs a Geneos deamon process, has service user Z,...")
In addition to that, each delivery team has its own tech stack and its own provisioning methods (e.g. monolithic multi-WAR JBoss here, Chef provisioned micro-services there,...) 
So doing any serious trouble-shooting or testing requires that you have all of the above in context.

**Stable**
In big organisations, where cloud computing is not in full swing, it is usually hard to have a stable *realistic* environment at your disposal. 
Developers in busy delivery teams tend to share the same boxes with other team members, increasing the entropy.
Did the test fail because of a bug or because someone else was fiddling with the HAProxy settings?   

We know that Vagrant can provide an isolated environment. 
But can it cater to the different provisioning needs of the enterprise AND the team at the same time? 
 
Well, it appears it can...

## Some Vagrant internals

A very useful (yet often overlooked) feature of Vagrant is [load order and merging][2].

In particular, when launched, Vagrant merges the settings from 

1. the Vagrantfile packaged with the box that is to be used for a given machine (remember that the box is nothing more than a [compressed TAR file][3])
2. the Vagrantfile in your Vagrant home directory 
3. the Vagrantfile from the project directory 

Settings override each other in reverse order, i.e. project Vagrantfile values override those in the home directory etc. 

## What we need

I hope it becomes clear how this feature can help.

* The Vagrantfile inside the box contains enterprise-wide provisioning 
* The home directory Vagrantfile can contain team-level provisioning. 
* This will allow the project Vagrantfile to be very light-weight, containing only the bare minimum for the particular module 
(e.g. port mappings)

So we need 2 things 

* understand how to build the base "enterprise" box
* find a way to efficiently share a team-level Vagrantfile

> The rest of this post (and the example code with it) will focus on using the [VirtualBox provider][4] to achieve our goals.
> This is the easiest way to get started, if you are new to these concepts.
> If you are using a different provider (VMWare, AWS,...), things vary only slightly.

## Building the "enterprise box"

### 1. Prepare the "build server"

We will need one machine where we will have an installation of Vagrant and VirtualBox.
This will be used to build the Vagrant box(es) everyone will be using.

The machine will need to have [virtualization enabled][9], to support box re-packaging.

### 2. Get a clean base image

We need to start from a clean slate.

Select and download your target distro from the [VirtualBox site][5].
[Import it in the VirtualBox][10] running on your build server.

Let's assume you give this VM the name **Base_CentOS** (it can be anything, really).

> Alternatively you have the option of downloading a ready package from [Vagrant Cloud][11], recently re-incarnated as Atlas.
> If you choose this option, then 
> 1. Select your desired box (e.g. [Centos 6.x][12])  
> 2. Execute the commands for the Virtualbox provider 
> 3. Use the name of the VM imported in VBox
  
### 3. Prepare the enterprise box
  
The base distro will probably not be up-to-date in terms of patching, plus it comes pre-configured with some well-known users.
That is not the best place to be in terms of security!

You may be tempted to login to the machine and start fixing and installing things.
**Do not!!** 

The point is that you do things in a repeatable way, so that next time you re-create the box (e.g. when moving from CentOS 5.1 to 5.2), 
you do not have to do everything all over again.
  
You have a growing number of ways to provision a machine: shell scripting, [Chef][7], [Puppet][8], [Ansible][8],... the list goes on.
Since the focus of this article is on Vagrant rather than provisioning, I will just provide the equivalent of a hello-world example in Bash.
You can then take it from there. 

#### Description of the Vagrantfile

Let's see the example enterprise-level Vagrantfile in more detail.

* We can define a [global box name][13].
  This way we can consistently update it across all machines. 
* This is a good place to enforce consistent [host][14] and [VM names][15].
* We can refer to [resources packaged in the box][16], define [some sensible defaults][17], add [VirtualBox GuestAdditions][18] and more

#### Packaging script 

Once we have tested the enterprise Vagrantfile locally and are happy with the result, we are ready to package it in the [box format][3].

This simple [example script][19] demonstrates how we could have the script as e.g. part of an automatic build process.  

## Team-level provisioning

### 1. Common provisioning logic

Now that the "basics" have been covered by the Infrastructure team, the delivery teams can focus on their own specific provisioning. 

Use Puppet or Ansible?
Provision a Tomcat or JBoss?
Install an AppDynamics agent?
Mount a remote folder?
Deploy your artifacts from Artifactory or Nexus? 

Anything that is specific to your team's needs and is common across all your projects, goes in [the team-level file][20].

This is where we consume the box, created and published by the packaging script. 
We can choose to supplement or override the defaults defined at the previous level. 

### 2. Updating local Vagrant 

Each team member checks out the team-level provisioning project and keeps it up-to-date.
 
After check out, she will need to let Vagrant know which is the common file to use.
This is done using a simple [command line][21] (or the [Unix equivalent][22]) which creates symbolic links to the `$VAGRANT_HOME` folder.

Now that the Vagrantfile is linked, it will be used each time we run Vagrant on this machine. 

## Bringing it all together 

### Projects

Now that the onus of provisioning has been taken care of, the [project Vagrantfile][23] is really lean, almost spartan!

There really is not much to describe at this level.
No need to copy-paste provisioning and definitions across projects. 
Only define what is needed for the project in question. 

Which is where we aimed to be! 

### What if there are updates?

These are easy to take care of.

* Team-level: If team members have checked out the project, then simply pulling the latest version will update their local symlinks.
* Enterprise-level: Vagrant caches boxes to save time and bandwidth. 
  If there is a new version of the box, then all users should run `vagrant box remove ENTERPRISE_BOX_NAME -f`. 

In both cases, with the next `vagrant up`, the new provisioning will take effect.  

## Parting thoughts

With this approach we can hide the complexity of provisioning by allowing flexibility at different levels.

We have been successfully using it for some time now to enable integration testing across different teams.  

Happy Vagrant-ing!


   [1]: https://www.vagrantup.com/
   [2]: http://docs.vagrantup.com/v2/vagrantfile/index.html
   [3]: http://docs.vagrantup.com/v2/boxes/format.html
   [4]: http://docs.vagrantup.com/v2/virtualbox 
   [5]: http://virtualboxes.org/images/
   [6]: https://www.chef.io/chef/
   [7]: https://puppetlabs.com/
   [8]: http://www.ansible.com/home
   [9]: https://www.google.co.uk/search?q=check+virtualization+enabled
   [10]: http://docs.oracle.com/cd/E26217_01/E26796/html/qs-import-vm.html
   [11]: https://atlas.hashicorp.com/boxes/search?utm_source=vagrantcloud.com&vagrantcloud=1
   [12]: https://atlas.hashicorp.com/puphpet/boxes/centos65-x64
   [13]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/enteprise-level/Vagrantfile#L10
   [14]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/enteprise-level/Vagrantfile#L17
   [15]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/enteprise-level/Vagrantfile#L27
   [16]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/enteprise-level/Vagrantfile#L34
   [17]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/enteprise-level/Vagrantfile#L42
   [18]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/enteprise-level/Vagrantfile#L49
   [19]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/enteprise-level/build_enterprise_box.sh
   [20]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/team-level/Vagrantfile
   [21]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/team-level/link_files.bat
   [22]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/team-level/link_files.sh
   [23]: https://github.com/sgerogia/enterprise-vagrant-example/blob/master/project-level/Vagrantfile
   
    
   
