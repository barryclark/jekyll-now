---
layout: post
title: Bamboo Build 
---

Bamboo: Tool for build and automated deployement. 
At schoology: used for build mostly. 

##### Plan, Stages, Tasks, Variables  
Plan: Sequence of Stages done in sequence 
Stages: Jobs. Run in their own container. 
Tasks: Run in parallel within a stage.

##### Chef: Used for configuration management. 
Managing the Nodes. Chef Server, Chef Nodes, Knife, Recipe, Resources
, Cookbooks 
[Chef Tutorial](https://www.tutorialspoint.com/chef/chef_overview.htm)

cookbooks, environments, and data_bags
[sgy chef repo](https://bitbucket.schoologize.com/projects/SYS/repos/chef-repo/browse)

##### Serverless
Framework for creating serverless resources like API Gateway, Lambda Functions, 
S3 and cloud front using a template.

##### React 


##### Redux 

##### Sumologic

##### Kinesis 
Kinesis Data Streams. Capture, process, and store data streams. 
Amazon Kinesis Data Streams is a scalable and durable real-time data 
streaming service that can continuously capture gigabytes of data per 
second from hundreds of thousands of sources. 

[key concepts](https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html)
Kinesis Data Stream : set of shards 
Data Record : unit of data stored in kinesis stream 
Retention Period : period for which data is available in stream after added 
Producer: puts data in stream
Data Stream Application: Region,
Shard: Partition within a stream 
Partition Key: Used to partition shards
Sequence Number: Each data record has a sequence number
Application Name: Unique
Server side encryption: AWS KMS for encrypting


##### Datadog and Metrics 
works based on events. for many of the aws services there are plugins. 
for serverless there are plugins to monitor. 


##### Links 
[chef Policy](https://bitbucket.schoologize.com/projects/SYS/repos/chef-policies/browse)
[A policy file for bamboo docker agent](https://bitbucket.schoologize.com/projects/SYS/repos/chef-policies/browse/bamboo-docker-agent/Policyfile.rb)
it has a list of recipes and attributes
[recipes are present in cookbooks](https://bitbucket.schoologize.com/projects/SYS/repos/chef-repo/browse/cookbooks)
```
default['bamboo']['agent_capabilities']['isolated_build'] = true
default['bamboo']['agent_capabilities']['system.builder.command.jq'] = '/usr/bin/jq'
default['bamboo']['agent_capabilities']['system.builder.command.aws'] = '/usr/local/bin/aws'
default['bamboo']['agent_capabilities']['system.builder.command.python'] = '/usr/bin/python'
```

We are using docker image schoology-docker.jfrog.io/node-build:10.15
[docker repo](https://bitbucket.schoologize.com/projects/DKR/repos/node-build/browse)

[makefile](https://bitbucket.schoologize.com/projects/APP/repos/msft-teams/browse/Makefile#22)

##### Consul
Consul is a networking tool that provides a fully featured 
service-mesh control plane and service discovery. 
Consul also includes a key-value store for service configuration. 
Learn how to perform common Consul operations locally.