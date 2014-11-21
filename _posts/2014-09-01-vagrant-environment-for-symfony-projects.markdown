---
layout: post
title: "Vagrant Environment for Symfony Projects"
date: September 1, 2014
tagline: "How to work simultaneously on different projects locally on your computer?"
tags : [symfony, vagrant]
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/symfony-love-vagrant.svg)

#### Introduction

When I first started to work with Symfony, it was important for me to create a smooth and quick way to set up a development environment every time I would like to start a new project.

[Ramon Kleiss](https://twitter.com/kleiram) already built a box, which turned out to fit all my needs at first. It provides a virtual environment for Symfony2 development using [Vagrant](https://www.vagrantup.com/). You can download it and read its full documentation [here](https://github.com/kleiram/vagrant-symfony).

But there was still something missing. How could I use this type of virtual box in different Symfony projects at the same time without having to use the built-in Symfony web server?

> I wanted to be able to check two different projects in my browser running locally, without getting too much into trouble.

#### Step-by-Step Guide

Download the Vagrant virtual box from [here](https://github.com/kleiram/vagrant-symfony) and save it under your documents (I save all important downloaded files under a common folder **downloads** under my **Projects** folder).

Add the **vagrant-symfony-master** folder that you just downloaded to your project root folder and rename it into **vagrant**.

Open the **Vagrantfile** and configure the network interfaces by changing the IP address (replace **192.168.56.101** in the following example) and the ports (replace **1234** in the following example).

> It is important to remark that you must use different ports for the different projects, otherwise you won't be able to run various projects at the same time.

The rest of the file you could leave as it is:

{% highlight ruby %}
# wonderful-project/vagrant/Vagrantfile

Vagrant.configure("2") do |config|
  # Configure the box to use
  config.vm.box       = 'precise64'
  config.vm.box_url   = 'http://files.vagrantup.com/precise64.box'

  # Configure the network interfaces
  config.vm.network :private_network, ip:    "192.168.56.101"
  config.vm.network :forwarded_port,  guest: 80,    host: 1234
  config.vm.network :forwarded_port,  guest: 8081,  host: 1234
  config.vm.network :forwarded_port,  guest: 3306,  host: 1234
  config.vm.network :forwarded_port,  guest: 27017, host: 1234

  # Configure shared folders
  config.vm.synced_folder ".",  "/vagrant", id: "vagrant-root", :nfs => true
  config.vm.synced_folder "..", "/var/www", id: "application",  :nfs => true

  # Configure VirtualBox environment
  config.vm.provider :virtualbox do |v|
      v.name = "wonderful-project"
      v.customize [ "modifyvm", :id, "--memory", 512 ]
  end

  # Provision the box
  config.vm.provision :ansible do |ansible|
      ansible.playbook = "ansible/site.yml"
  end
end
{% endhighlight %}

Go to your **hosts** file under the folder **~/etc** and add your project to the list:

{% highlight bash %}
# ~/etc/hosts
# ...
192.168.56.101     wonderful-project.dev
{% endhighlight %}

You can now go back to your project folder in the terminal and build up your new virtual box. It could take a while the first time you run this, so it could be a good moment to grab a coffee or tea ;-):

{% highlight bash %}
$ cd /wonderful-project/vagrant
$ vagrant up
{% endhighlight %}

You can now see that the new VM has been added into **Virtual Box**. In the terminal you can access it connecting via ssh. The project will be located under **/var/www**:

{% highlight bash %}
$ cd /wonderful-project/vagrant
$ vagrant ssh
# ssh connection successful
$ cd /var/www
{% endhighlight %}

You may also want to configure the connection to the database in a program such as **SequelPro**. The settings would look something like this:

  * **Name**: wonderful-project
  * **Host**: 192.168.56.101
  * **Username**: root
  * **Password**: null
  * **Database**: wonderful-project
  * **Port**: 3306 (default)

You may also want to configure the connection to the virtual machine via SFTP in a program such as **Transmit**. The settings would look something like this:

  * **Name**: wonderful-project
  * **Host**: 192.168.56.101
  * **Username**: vagrant
  * **Password**: vagrant

You are now ready to go back to your project and configure the **parameters.yml** file:

{% highlight bash %}
# wonderful-project/app/config/parameters.yml

parameters:
  database_driver: pdo_mysql
  database_host: 192.168.56.101
  database_port: null
  database_name: wonderful-project
  database_user: root
  database_password: null
  mailer_transport: smtp
  mailer_host: 192.168.56.101
  mailer_user: null
  mailer_password: null
  locale: en
  secret: ThisTokenIsNotSoSecretChangeIt
{% endhighlight %}

#### On a daily basis

I like to save all the different projects that I am working on in a table like this under my documents, specially to keep track of the ports that I am already using:

| **Project Name**     | **IP Address**  | **Ports** | **Host**                 | **Database Name**    |
| -------------------- | --------------- | --------- | ------------------------ | -------------------- |
| wonderful-project-1  | 192.168.56.101  | 1234      | wonderful-project-1.dev  | wonderful-project-1  |
| wonderful-project-2  | 192.168.56.102  | 4321      | wonderful-project-2.dev  | wonderful-project-2  |

Enjoy Symfonying!

