---
layout: post
title: "Vagrant Environment for Symfony Projects"
date: September 14, 2014
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/symfony-love-vagrant.svg)

**Did you ever wonder how to work simultaneously on different Symfony projects locally on your computer?** When I first started to work with Symfony, it was important for me to create a smooth and quick way to set up a development environment every time I would like to start a new project.

[Ramon Kleiss](https://twitter.com/kleiram) already built a box, which turned out to fit all my needs at first. It provides a virtual environment for Symfony2 development using [Vagrant](https://www.vagrantup.com/). You can download it and read its full documentation [here](https://github.com/kleiram/vagrant-symfony).

But there was still something missing. How could I use this virtual box in different Symfony projects at the same time without having to use the built-in Symfony web server?

> I wanted to be able to check two different projects in my browser running locally, without getting too much into trouble.

- - -

#### Step-by-Step Guide

1. Download the Vagrant virtual box from [here](https://github.com/kleiram/vagrant-symfony) and save it under your documents (I save all important downloaded files under a common folder **_downloads_** under my **_Projects_** folder).
2. Add the **_vagrant-symfony-master_** folder that you just downloaded to your project root folder and rename it into **_vagrant_**.
2. Open the **_Vagrantfile_** to do the following changes:
    * Configure the network interfaces, by changing the IP and the ports for each project:

    ```
    config.vm.network :private_network, ip:    "192.168.33.10"
    config.vm.network :forwarded_port,  guest: 80,    host: 1234
    config.vm.network :forwarded_port,  guest: 8081,  host: 1234
    config.vm.network :forwarded_port,  guest: 3306,  host: 1234
    config.vm.network :forwarded_port,  guest: 27017, host: 1234
    ```

    * Configure VirtualBox environment, by changing the name of the VM accordingly,

    ```
    config.vm.provider :virtualbox do |v|
      **_v.name = "my-very-little-project"_**
      v.customize [ "modifyvm", :id, "--memory", 512 ]
    end
    ```

3. Go to your hosts file under /etc/hosts
  - Add the IP (same as in the Vagrantfile) and a domain name
4. Go to your project folder in the terminal and run:

    ```
    $ cd /vagrant
    $ vagrant up # it could take a while the first time, so you could grab a coffee
    ```

  After running these commands you can see that your new VM has been added into Virtual Box
5. You can access the new VM via ssh and visit your project under /var/www:
  $ vagrant ssh
  $ cd /var/www
5. Go to Sequel Pro and duplicate a connection