---
layout: post
title: Docker-Machine vs Firewall
subtitle: A short diary of our investigation of a docker-machine issue.
category: dev
tags: [howto, docker, security]
author: Doru Mihai
author_email: doru.mihai@haufe-lexware.com
header-img: "images/new/Exportiert_51.jpg"
---


Docker-Machine has helped us a lot with automated provisioning of infrastructure in the cloud and automated Docker Engine installation.
Naturally, we had grown to rely on it and to take it for granted.

So when it starts failing out of the blue....it's bad.

## The Problem
All of our automated deployments to Azure started failing out of the blue one day last week. 
And the error was baffling us all. As you can see below, after all the necessary resources were created and the machine was up and running, we got the following error.

``` bash
15:33:38.920 Creating machine...
15:33:38.920 (dev-kvstore) Querying existing resource group.  name="dev-haufe"
15:33:39.044 (dev-kvstore) Creating resource group.  name="dev-haufe" location="germanycentral"
15:33:39.127 (dev-kvstore) Configuring availability set.  name="dev-haufe"
15:33:39.352 (dev-kvstore) Configuring network security group.  name="dev-kvstore-firewall" location="germanycentral"
15:33:59.702 (dev-kvstore) Querying if virtual network already exists.  name="FoundationalServices-vNet" rg="FoundationalServicesInfra-P-RG" location="germanycentral"
15:33:59.790 (dev-kvstore) Virtual network already exists.  name="FoundationalServices-vNet" rg="FoundationalServicesInfra-P-RG" location="germanycentral"
15:33:59.790 (dev-kvstore) Configuring subnet.  name="FoundationalServices-Prod-Subnet1" vnet="FoundationalServices-vNet" cidr="10.80.7.0/26"
15:33:59.877 (dev-kvstore) Not creating a public IP address.
15:33:59.877 (dev-kvstore) Creating network interface.  name="dev-kvstore-nic"
15:34:00.111 (dev-kvstore) Creating storage account.  name="vhdsavld8n1d3qfej111b9go" location="germanycentral" sku=Standard_LRS
15:34:51.278 (dev-kvstore) Creating virtual machine.  name="dev-kvstore" location="germanycentral" size="Standard_DS1_V2" username="ubuntu" osImage="canonical:UbuntuServer:16.04.0-LTS:16.04.201604203"
15:36:21.934 Waiting for machine to be running, this may take a few minutes...
15:36:22.191 Detecting operating system of created instance...
15:36:22.191 Waiting for SSH to be available...
15:36:22.955 Detecting the provisioner...
15:36:23.267 Provisioning with ubuntu(systemd)...
15:36:25.965 Error creating machine: Error running provisioning: ssh command error:
15:36:25.965 command : 
15:36:25.965 		if ! grep -xq '.*\sdev-kvstore' /etc/hosts; then
15:36:25.965 			if grep -xq '127.0.1.1\s.*' /etc/hosts; then
15:36:25.966 				sudo sed -i 's/^127.0.1.1\s.*/127.0.1.1 dev-kvstore/g' /etc/hosts;
15:36:25.966 			else 
15:36:25.966 				echo '127.0.1.1 dev-kvstore' | sudo tee -a /etc/hosts; 
15:36:25.966 			fi
15:36:25.966 		fi
15:36:25.966 err     : exit status 255
15:36:25.966 output  : 

```

## The Struggle
First thing we did was to check what docker-machine managed to create even though the error had occured, and indeed it had created a VM, nic, Storage account etc.

Weirder still, even though it was an error blaiming a potential connection problem while using ssh, the port rule was created on azure, and doing a simple `docker-machine ssh <name>` worked as expected.

To push things even further, manually running that ssh command in a terminal connected using docker-machine itself....worked.

So we started experimenting with different scenarios to try to isolate the problem and I looked into the code to see exactly what is docker-machine trying to do. My assumption was that the command blamed in the log was just one in a larger batch of commands and perhaps it was not to blame but one of the commands above it.

Looking into the source code and following the log statements I concluded that it had passed through the code specific to the azure driver since the last statement there was the [creation of the machine](https://github.com/docker/machine/blob/7118884f7804f726e7429e89b8d64a3a4947a2f1/drivers/azure/azure.go#L393).

After that followed the detection of the OS and thus selection of the dedicated provisioning script and then execution of that script. Again, the log output helped in determining that it was the ubuntu systemd provisioning script and that's when I had the surprise of discovering that the first thing done is [setting the hostname](https://github.com/docker/machine/blob/7118884f7804f726e7429e89b8d64a3a4947a2f1/libmachine/provision/ubuntu_systemd.go#L113).

Only a little more digging later and I discovered the exact script we had seen in the log output:

```go
func (provisioner *GenericProvisioner) SetHostname(hostname string) error {
	if _, err := provisioner.SSHCommand(fmt.Sprintf(
		"sudo hostname %s && echo %q | sudo tee /etc/hostname",
		hostname,
		hostname,
	)); err != nil {
		return err
	}

	// ubuntu/debian use 127.0.1.1 for non "localhost" loopback hostnames: https://www.debian.org/doc/manuals/debian-reference/ch05.en.html#_the_hostname_resolution
	if _, err := provisioner.SSHCommand(fmt.Sprintf(`
		if ! grep -xq '.*\s%s' /etc/hosts; then
			if grep -xq '127.0.1.1\s.*' /etc/hosts; then
				sudo sed -i 's/^127.0.1.1\s.*/127.0.1.1 %s/g' /etc/hosts;
			else 
				echo '127.0.1.1 %s' | sudo tee -a /etc/hosts; 
			fi
		fi`,
		hostname,
		hostname,
		hostname,
	)); err != nil {
		return err
	}
	return nil
}
```

You can find it in the [generic provision](https://github.com/docker/machine/blob/e1a03348ad83d8e8adb19d696bc7bcfb18ccd770/libmachine/provision/generic.go#L39) script. And as far as I could tell there was nothing wrong with it. 


So we were back to square 1. And after speculating that since nothing changed on our side then maybe the ubuntu image on azure had been updated and something was not backwards compatible, we changed to an older image and that still didn't fix anything.

And so, after exhausting all ideas, we cried for help to our colleagues that manage Azure and the network to perhaps open a ticket to Microsoft and try to investigate this one level deeper and they came through for us.

## The Source
The problem in the end was that our firewall rules were updated/patched and an IPS Pattern matched our automated deployment attempts with an SSH Brute Force Login and that was reported by docker-machine as an error while executing that small shell script.

![Firewall Rule](/images/docker-machine-firewall/firewall-ssh.png)

So, I hope that this might help others that will face this or other simmilar issues and also give a bit more insight into how all those gophers behind docker-machine work.
