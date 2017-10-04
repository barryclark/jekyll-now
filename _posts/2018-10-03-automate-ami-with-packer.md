---
layout: post
title: Automate Amazon Machine Images(AMI’s) with Packer
subtitle: 
category: dev
tags: [cloud, devops, development]
author: Daniel Tiron
author_email: mihai.tiron@haufe-lexware.com 
header-img: "images/new/Exportiert_16.jpg" - POZA
---

In this article, I will explain how to create an AMI from scratch starting from an .iso you want, using your favorite OS.

All the process is very simple and straight forward, and the single tool needed is Packer.

The reason Packer is used to create our instances, instead of already existing AMI’s tools, provided by Amazon, is that we want to have the full control for our images creation, choosing how we want to install only the packages we need.
Having full control on your AMI’s creation, will be more secure.

For this we use:
+	Packer – last version (1.1.0 when I wrote the article)
+	CentOS 7 – as OS

### What is an [AMI](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)?

An Amazon Machine Image (AMI) provides the information required to launch an instance, which is a virtual server in the cloud. You specify an AMI when you launch an instance, and you can launch as many instances from the AMI as you need. You can also launch instances from as many different AMIs as you need.

### Let’s see what [Packer](https://www.packer.io/docs/index.html) is:

Packer is an open source tool for creating identical machine images for multiple platforms from a single source configuration. 
A machine image is a single static unit that contains a pre-configured operating system and installed software which is used to quickly create new running machines. Machine image format changes for each platform like: AMIs for EC2, VMDK/VMX files for VMware, OVF exports for VirtualBox, etc.”

### Installing Packer:

It’s very easy, you have to download and install it from [here](https://www.packer.io/downloads.html) depending on your OS you use.

### Now let’s create an image:

For this we need to create a template. The format of a template is simple JSON file, like below:

packer_template.json
```json
{
  "variables": {
    "iso_file": "http://linuxsoft.cern.ch/centos/7.3.1611/isos/x86_64/CentOS-7-x86_64-Minimal-1611.iso",
    "iso_checksum": "27bd866242ee058b7a5754e83d8ee8403e216b93d130d800852a96f41c34d86a",
    "type": "sha256",
    "non_gui": "true"
  },
  "builders": [{
      "type": "virtualbox-iso",
      "iso_url": "{{ user `iso_file` }}",
      "iso_checksum": "{{ user `iso_checksum` }}",
      "iso_checksum_type": "{{ user `type` }}",
      "headless": "{{ user `non_gui` }}",
      "output_directory": "builds",
      "vm_name": "Minimal-CentOS7",
      "guest_os_type": "RedHat_64",
      "disk_size": "81920",
      "boot_wait": "5s",
      "http_directory": "src",
      "boot_command": [
        "<tab> text ks=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ks.cfg<enter><wait>"
      ],
      "ssh_username": "packer",
      "ssh_password": "packer",
      "ssh_wait_timeout": "1000s",
      "shutdown_command": "sudo shutdown -h 0",
      "format": "ova"
    }]
}
```

With this template, we will create a CentOS 7 image without GUI, named Minimal-CentOS7 with 80GB disk space and built in “builds” folder from our project as OVA file.

Another option we used is Boot command. This is very important, specifies the keys to type when the virtual machine is first booted in order to start the OS installer. This command is typed after boot_wait, which gives the virtual machine some time to actually load the ISO.

Of course there are a lot of other options for this builder,  you can find on their website [documentation](https://www.packer.io/docs/builders/index.html) on Builders -> VirtualBox

To automate CentOS 7 installation, we use in boot_command a kickstart file. Kickstart files contain answers to all questions normally asked by the installation program, such as what time zone you want the system to use, how the drives should be partitioned, creating users (here we create the user packer) or which packages should be installed. Providing a prepared Kickstart file when the installation begins therefore allows you to perform the installation automatically, without need for any intervention from the user.  

Before boot_command in “http_command”:”src” we set the folder where ks.cfg file can be found and used: 

For more details, in how to create your own kickstart file adapted for your needs, you can find the entire documentation [here](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Installation_Guide/chap-kickstart-installations.html)

*To automate installation for Debian/Ubuntu you can use [preseed](https://wiki.debian.org/DebianInstaller/Preseed) or for Alpine you can use [answers](https://wiki.alpinelinux.org/wiki/Alpine_setup_scripts)

In this moment if we run this template like it is, we will have a .ova file in builds folder named: Minimal-CentoOS7.

To create images with packer just type this command: 
```shell
packer build your_template.json
```
Packer allows you to create already provisioned images, because it supports various provisioners like: shell, Ansible, Chef,Puppet etc. You can find more about provisioner on their [documentation](https://www.packer.io/docs/provisioners/index.html). 

### Create AMI from packer image

First of all, to create an AMI, the image is mandatory to be a .ova file. AWS knows only this type of image. This is why we added “format”:”ova” in our template

To do that, you have to use a post-processor block. This will be added in the same json file, after “builders” block. 

Post-processors run after the image is built by the builder and provisioned by the provisioner(s). Post-processors are optional, and they can be used to upload artifacts, re-package, or more.

The post-processor we use for our scope is: “Amazon import” and it looks like this:

```json
"post-processors": [
    {
        "type": "amazon-import",
        "access_key": "aws_access_key",
        "secret_key": "aws_secret_key",
        "region": "aws_region",
        "s3_bucket_name": "bucket_name",
        "license_type": "BYOL",
        "tags": {
            "Description": "packer amazon import {{timestamp}}"
        }
    }
  ]
```
“access_key”, “secret_key” and “aws_region” can be found in your AWS account. 
Also, you have to create an S3 bucket in AWS.

**How this works:** this will take the OVA generated by the builder and upload it to S3. The key name of the copy will be a default name generated by packer.
Once uploaded, the import process will start, creating an AMI in your region with a "Description" tag applied to both the AMI and the snapshots associated with it. Note: the import process does not allow you to name the AMI, the name is automatically generated by AWS.
After tagging is completed, the OVA uploaded to S3 will be removed.
This process will last several minutes, so you have to be patient.

In the end after we build this template we will have a new AMI in our AWS account, containing the OS we want and packages we need, prepared to create new instances. 



