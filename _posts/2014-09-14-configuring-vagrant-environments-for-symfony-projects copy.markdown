---
layout: post
title: "Configuring Vagrant Environments for Symfony Projects"
date: September 14, 2014
---

![Symfony Love Vagrant](http://miriamtocino.github.io/images/symfony-love-vagrant.svg)

**Did you ever wonder how to work simultaneously on different symfony projects locally on your computer?** When I first started to work with Symfony, it was very important to create a smooth and quick way to set up a new development environment every time I would like to start a new project.

I had already worked with the vagrant version of this guy ----- , which turned out to be the best one I found in the internet so far for symfont projects.

In my case I decided to configure one **Vagrant Virtual Machine** per project. Below you find the steps to follow every time you would like to set up a new project.

1.
2.
3.
4.
5.


I personally have a list of the projects and their corresponding details stored under my documents. It would look something like this:

---

## Small Projects

Some cases I just want to check quickly one new feature out. For that I created a common virtual machine under the folder **symfony-pocket-guides** where I store all the databases and then run the built-in symfony server under the corresponding folder that I want to check out. Below you find the configuration of the database, which turns out to be the same for all projects.