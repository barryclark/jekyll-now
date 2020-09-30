---
layout: post
title: FRR OSPF/BGP vagrant lab (1/2)
tags: frr ospf bgp vagrant ansible
---
Some days ago I was working on a project where some virtual machines implemented in AWS would announce services/IP public addresses to the Internet. While AWS has a nice service (Bring your own IP) for this purpose, this time we need to route this traffic to a local pop where the client has a physical facility full of racks, cables, routers, switches and firewalls. You know, the kind of toys that network guys used to love ;)

I would not give you too much detail on the whole picture, but some parts of the project involved the deployment of some virtual routers in AWS, which should exchange routing info via OSPF with routers sited in the local POP, and then they would redistribute that information to some other BGP peers running in AWS.

For this task, virtual routers in AWS, we chose [Free Range Rrouter](https://frrouting.org/) which is based on the old Zebra/Quagga implementations. FRR is an Open Source project backed by a strong community where people of Cumulus/NVIDIA are one of the main contributors. So if you ever need to deploy an IP router, FRR is a pretty solid option.

Why this OSPF <-> BGP redistribution?. Well, in this case we did face two constraints:
- in AWS only BGP is an option as there is no L2/multicast support for routing protocols like OSPF
- customer physical equipment could only run OSPF

So, with all this background, the idea was simple:
- routers in AWS would receive BGP info from *service publishers*
- This BGP info would be redistributed into OSPF
- Router in local POP would receive this OSPF info

Let me try to draw this idea in a network diagram:
![net diagram]({{ site.baseurl }}/images/vagrant_frr_lab_ospf2bgp.jpeg)

## Lab idea

With all this idea in mind, I tried to setup a [Vagrant](https://www.vagrantup.com/) lab with all these components:
- 2 x routers to publish information via BGP (PE0, PE1)
- 2 x routers to receive BGP info and redistribute into BGP (ASBR0, ASBR1)
- 1 x router to receive all OSPF info (CORE)

### Vagrant setup

The Vagrantfile is pretty simple: it will create 5 centos7 instances. For every instance, we will execute an Ansible playbook:

```
Vagrant.configure("2") do |config|
  config.vm.box_check_update = "false"
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end
  
  config.vm.define "core" do |subconfig|
    subconfig.vm.box = "centos/7"
    subconfig.vm.hostname = "core"
    subconfig.vm.network :private_network, ip: "10.0.0.9"
    subconfig.vm.provision "ansible" do |ansible| 
      ansible.playbook="core.yml" 
    end
  end

  config.vm.define "asbr0" do |subconfig|
    subconfig.vm.box = "centos/7"
    subconfig.vm.hostname = "asbr0"
    subconfig.vm.network :private_network, ip: "10.0.0.10"
    subconfig.vm.network :private_network, ip: "10.0.1.10"
    subconfig.vm.provision "ansible" do |ansible| 
      ansible.playbook="asbr0.yml" 
    end
  end
  config.vm.define "asbr1" do |subconfig|
    subconfig.vm.box = "centos/7"
    subconfig.vm.hostname = "asbr1"
    subconfig.vm.network :private_network, ip: "10.0.0.11"
    subconfig.vm.network :private_network, ip: "10.0.1.11"
    subconfig.vm.provision "ansible" do |ansible| 
      ansible.playbook="asbr1.yml" 
    end
  end
  config.vm.define "pe0" do |subconfig|
    subconfig.vm.box = "centos/7"
    subconfig.vm.hostname = "pe0"
    subconfig.vm.network :private_network, ip: "10.0.1.20"
    subconfig.vm.provision "ansible" do |ansible| 
      ansible.playbook="pe0.yml" 
    end
  end
  config.vm.define "pe1" do |subconfig|
    subconfig.vm.box = "centos/7"
    subconfig.vm.hostname = "pe1"
    subconfig.vm.network :private_network, ip: "10.0.1.21"
    subconfig.vm.provision "ansible" do |ansible| 
      ansible.playbook="pe1.yml" 
    end
  end
end
```

#### Starting vagrant lab and checking status
```
vagrant up
```

After firing up this vagrant environment, you will have 5 vm instances running under VirtualBox, and you could inspect them with these commands:

```
vagrant status
```

If you want to inspect any specific machine, it's quite easy to ssh to it with this command:
```
vagarnt ssh core
```


## Summary

In this first part, we've just described the problem and how to emulate the environment with a simple Vagrant Lab.
In the second part of this post, we will inspect the Ansible playbooks and we will enter into specific FRR/OSPF/BGP configurations.

Stay tuned.


This will log you in core instance, for example.

