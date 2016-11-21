---
title: Load testing MongoDB with sysbench-mongodb and Ansible
author: kgorman
comments: true
layout: post
categories:
- mongodb
- ansible
---

In the last few months I have spent a lot of time load testing MongoDB for various reasons. From testing compression ratios in TokuMX and hardware platforms for ObjectRocket/Rackspace to various storage engines in the new MongoDB 3.0 release. My new role has me making lots of opinions about various things, and I like to be data and fact driven about them.

I needed a simple framework to automate the testing. I needed a way to ensure that I could run some tests, change some configurations or systems, and re-run the tests in a simple way.

Ansible + sysbench-mongodb to the rescue

## sysbench-mongodb

sysbench-mongodb is a java program created by [tmcallaghan](https://github.com/tmcallaghan) when he worked at Tokutek. He still maintains the [repo](https://github.com/tmcallaghan/sysbench-mongodb). It's a simple yet powerful load testing harness, also it has a lot of things I wanted in a load test framework:

- Uses one of the best in class MongoDB drivers. In this case java.
- Written in a language I know. In this case java.
- Simple to configure using a config file.
- Able to crush the target w/o using many VM's or servers. The built in threading is up to the task.
- I can contribute to it's source.

## Ansible

[Ansible](http://www.ansible.com) is a python based systems automation framework.  It's easy and fun to use. We use it at ObjectRocket for a variety of things, and it's a perfect fit for load testing automation. A few months ago I created Ansible roles on Ansible Galaxy for installing [MongoDB](https://galaxy.ansible.com/list#/roles/1955) and [TokuMX](https://galaxy.ansible.com/list#/roles/1890). I also created a role for various Rackspace hardware platforms as well as [sysbench-mongodb](https://github.com/kgorman/ansible-roles_sysbench-mongodb).  By combining these roles, it provides a super simple, automated way to install MongoDB and run tests.

The steps are pretty simple:

- Install the playbook and roles that controls everything.
- Configure the environment
- Run the playbook to install the environment
- Run the test, and capture results

I generally run this from my local workstation. Direct ssh access to whatever hosts being tested is required. If the hosts are behind a proxy or something, Ansible can be run from a remote system as well.

## Installing the playbook and roles

I created a Github repository that holds a simple configuration for Ansible that can be hacked up to match whatever environment being tested. It's called [mongodb-hurtmachine](https://github.com/kgorman/mongodb-hurtmachine). The [README](https://github.com/kgorman/mongodb-hurtmachine/blob/master/README.md) covers installation.

## Configuring the environment

The load tests have a bunch of configuration variables. I typically override the defaults for the role in the hosts file to allow for various configurations at run time. Customization is done by changing the hosts.txt file to match the type of workload desired. The values in hosts.txt override the Ansible roles defaults/main.yml file.

### Configuring MongoDB/TokuMX

To configure MongoDB (TokuMX is similar) change the configuration parameters as desired. Perhaps it's the data directory, or maybe a specific storage engine or compression algorithm. All of these changes can be made, simply specify the values in the hosts.txt file. A list of all the configuration variables is in the [Github repo](https://github.com/kgorman/ansible-roles_mongodb-install/blob/master/defaults/main.yml). The common ones are:

```yaml
# The version of MongoDB
mongodb_version: 2.6.4

# The directory prefix where the database files would be stored
mongodb_datadir_prefix: /data/mongodb/

# storage engine to use (2.8+)
mongodb_storage_engine: mmapv1
```

The configuration parameters set in the hosts.txt file override the defaults. For instance:

```yaml
[mongodbservers]
192.168.0.1 mongodb_storage_engine=wiredTiger mongodb_version=3.0.0-rc8
```

It should be noted that the MongoDB/TokuMX configuration is a simple single server mongod installation. No replica sets or sharding at this time.

### Configuring sysbench-mongodb

To configure sysbench-mongodb change the parameters to whatever type of test desired. Perhaps a massively concurrent workload, or maybe generating more data than RAM is present on the machine. A list of all of the configuration variables is listed in the [Github repo](https://github.com/kgorman/ansible-roles_sysbench-mongodb/blob/master/defaults/main.yml). The common ones are:

```yaml
# size of documents per collection (1m documents ~= 7GB)
sysbench_mongodb_number_of_docs_per_collection: 100000

# number of collections
sysbench_mongodb_number_of_collections: 16

# number of threads for loader
sysbench_num_loader_threads: 8

# number of threads for execute
sysbench_num_writer_threads: 64
```

Again, the configuration parameters set in the hosts.txt file override the defaults. For instance:

```yaml
[loadservers]
192.168.0.1 sysbench_mongodb_port=9005 sysbench_mongodb_number_of_docs_per_collection=5000000 sysbench_mongodb_host=192.168.0.2
```

## Run the playbook to install the environment

Then install via Ansible.

```bash
ansible-playbook -i hosts.txt site.yml
```

A loadserver is now installed and configured as well as a single mongod to direct the load at. Each configured as specified.

## Let's run some load!

Running load is done by launching the load test on the loadserver configured in hosts.txt. The classpath must be set to include the jar that was installed. For example:

```bash
ssh root@192.168.0.1
cd sysbench
export CLASSPATH=./mongo-java-driver-2.13.0-rc2.jar
./run.simple.bash
```

The test throws the output into log and csv files for later analysis.  Once everything is installed, different configurations can be done by changing hosts.txt and running Ansible to reinstall the environment.

## Conclusion

Using sysbench-mongodb and Ansible together is very very powerful. It saves a ton of time and makes testing repeatable and simple. Next time someone asks me a question about performance, I simply set my configuration, install the environment and rock some tests!

In the future it would be great to expand the role(s) to have replica sets and sharding as well as more contributions to sysbench-mongodb to keep making it better.
