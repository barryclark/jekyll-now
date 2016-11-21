---
title: Ansible for Database Management
author: Kenny Gorman
comments: true
layout: post
categories:
    - database management
    - tokumx
    - mongodb
    - postgresql
---

![v8]({{ site.baseurl }}images/v8.jpg)

If you aren't already familiar with [Ansible](http://www.ansible.com), then I suggest you add it to your list of things to explore. Simply put, Ansible is an IT automation framework. But in my opinion, that description doesn't really elaborate properly on it's true power. Sure, there have been other automation platforms in the past, but they always seemed so crufty. I didn't love using them.

Where Ansible really shines is the design of it's core construct; the playbook. A playbook is just that, an idempotent list of ordered tasks in a human readable format. Ansible makes it easy, and even fun to develop plays, roles and modules to automate your infrastructure.

It's key to note, that a playbook is more than just automation, the playbook concept makes it easy to share the play with colleges and have meaningful discussions about the tasks. You can discuss the play, iterate, and ensure that the action being taken is the correct one.

## Github ##

Ansible playbooks match very nicely with Git and Github. In fact, thats the defacto way to share playbooks and the only way to add roles to Ansible Galaxy. Github is essential for using Ansible. The benefit to this arrangement is that each play can go under strict revision control, changes can be discussed, submitted and finally merged via the constructs that Git and Github provide.

## Database Management ##

So what about using Ansible for Database Management is so appealing? Well if you currently use a DBaaS provider (like [ObjectRocket](http://www.objectrocket.com)) for your database back end, then not much. The provider may use Ansible, but that fact would be hidden from you. Rather, Ansible is for the folks that want to Do it Yourself on their own or cloud infrastructure.

DBA's, DevOps, Developers and others can use Ansible playbooks to aid them in dealing with sometimes complex data backends. Indeed they can use Ansible playbooks to perform not just installation, but also upgrades, HA configurations, performance testing and benchmarking, maintenance windows, routine tasks, and scaling chores. In my mind, Ansible is the new Swiss Army Knife for automating complex clusters.

## Building playbooks ##

Step 1 is to start building playbooks. Playbooks are constructed from one or more roles. Roles can use modules. [See here](http://www.ansible.com/how-ansible-works) for a primer on Ansible and playbooks. I have created a couple of simple roles to help folks get started with either [MongoDB](https://galaxy.ansible.com/list#/roles/1955) or [TokuMX](https://galaxy.ansible.com/list#/roles/1890). You can use these to help bootstrap your playbooks. These roles are listed on Ansible Galaxy to help you get them installed into your playbooks properly. Here is a [short primer](https://galaxy.ansible.com/intro) on Ansible Galaxy. Use these components (along with modules) to create playbooks that match your business needs.

[Roles](https://galaxy.ansible.com/list#/roles) exist for many database platforms including mySQL, PostgreSQL, MongoDB, TokuMX, Cassandra, and more. There are also a number of [modules](http://docs.ansible.com/list_of_database_modules.html) already developed for use.

## A play ##

For example, here is a sample playbook that ensures the DB is running, ensures the DBA user is present, and installs a DBA management tool written in javascript to a known directory.

~~~ yaml
---
- hosts: mongodbservers
  vars:
    admin_user: dba
    admin_pwd: xxxxx
    port: 27017
  remote_user: root
  tasks:
  - service: name=mongodb state=started
  - mongodb_user: database=admin name={{ admin_user }} password={{ admin_pwd }} state=present login_port={{ port }}
  - name: Copy DBA script out to each server
    template: src=dba.js.j2 dest=/dba/scripts/dba.js
~~~

## Going Further ##

More needs to be done. Roles and modules are sparse for specific database management tasks. More work needs to be done to create best practice components that perform every day work. For instance, a backup module that allows you to specify cloud files or S3 for your dump. Or perhaps a MongoDB module that allows you to simply and predictably rebuild a slave, then make it master. Plays built with these components would be simple and powerful.

## The future ##
In the near future, I expect Ansible to become very popular with DBA and DevOps types as they struggle to wrangle cloud sprawl and deal with ever more complex environments. Ansible makes is easy to bundle work tasks into playbooks that are easy for people to understand and modify. This simplicty is the key, after all we need to focus on the task at hand, not the tools to perform the task.
