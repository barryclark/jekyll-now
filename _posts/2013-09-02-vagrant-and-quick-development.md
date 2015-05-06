---
layout: post
title: Vagrant and a quick development environment
date: '2013-09-02T22:34:00.000-04:00'
author: Daniel Smith
tags:
- bundler
- berkshelf
- Ruby on Rails
- rails
- vagrant
- postgres
- Postgresql
modified_time: '2013-09-02T22:41:35.831-04:00'
blogger_id: tag:blogger.com,1999:blog-358950712929443967.post-1427649930104729954
blogger_orig_url: http://www.getabetterpic.com/2013/09/vagrant-and-quick-development.html
---

I have been intrigued with the possibility of Vagrant Up, a program designed to start up a development environment in a fraction of the time a fresh install normally takes. For instance, suppose you have a project you are working on and it relies on several different programs to run. It requires a Postgresql server, Ruby installed, the Bundler gem, and perhaps a few other things. Wouldn't it be nice to checkout the repository and run one command that created an environment ready to run the console and development server?<br /><br />That in essence is what Vagrant aims to do. It has been a journey trying to get it up and running like I want, but I am getting closer.<br /><br />My first approach was to use Berkshelf, which is a cookbook manager that integrates with Vagrant, allowing you to download cookbooks and recipes to be used with Vagrant. The downside for me was it requires Ruby to be up and running for it to work. And since I'm trying to set up an Ruby on Rails dev environment in Windows, this is difficult to do.<br /><br />So instead I am taking the simple bash script mode to bootstrap a Vagrant machine up (put 'config.vm.provision :shell, :path =&gt; "bootstrap.sh"' in the Vagrantfile, where bootstrap.sh contains the code and is in the same directory as Vagrantfile). The way this basically works is when I first run vagrant up, it creates the virtual machine then runs the commands in the bash script file to install the various components I need. I haven't perfected it yet, but I can now install Postgresql, RVM, Ruby, the Bundler gem, and kick off my bundle install with just vagrant up.<br /><br />From an individual developer perspective, perhaps this is overkill. Yet I have created enough environments from scratch to feel I could really use something like this.<br /><br />Here is what is working so far:

```bash
#!/usr/bin/env bash

# This file is used by Vagrant to install base packages for running a dev environment.

echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" | tee /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | \
  apt-key add -
apt-get update
apt-get install -y postgresql-9.2 postgresql-server-dev-9.2 postgresql-contrib-9.2
apt-get install -y curl git
curl -L https://get.rvm.io | bash
bash -l
useradd -G rvm vagrant
source /etc/profile.d/rvm.sh
rvm install 2.0
gem install bundler
cd /vagrant
bundle install
```

The only thing that might not work is the bundle install. I am also working on getting the development database user created in the same file. The idea would be to do a 'vagrant up' from a fresh install, then be able to 'vagrant ssh' in and 'rails c' and get a working console. So I need to include the rake tasks to create the database as well as run migrations. I'm 80% of the way there with it, and for a development environment it should work for me.<br /><br /><a href="http://www.vagrantup.com/" target="_blank">www.vagrantup.com</a><br /><a href="http://berkshelf.com/" target="_blank">berkshelf.com</a>