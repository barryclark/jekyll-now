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

##### Serverless
Framework for creating serverless resources like API Gateway, Lambda Functions, 
S3 and cloud front using a template.

##### React 


##### Redux 

##### Sumologic


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