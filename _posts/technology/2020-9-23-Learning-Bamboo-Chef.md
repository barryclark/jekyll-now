---
layout: post
title: Bamboo Build 
---

![_config.yml]({{ site.baseurl }}/images/bamboo.png) 

![_config.yml]({{ site.baseurl }}/images/bamboo-plan-stages-tasks.png)

![_config.yml]({{ site.baseurl }}/images/bamboo-tasks.png) 

Bamboo: Tool for build and automated deployement. 
At schoology: used for build mostly. 

##### Plan, Stages and Tasks 
Plan: Sequence of Stages done in sequence 
Stages: Jobs. Run in their own container. 
Tasks: Run in parallel within a stage.

##### Bamboo Variables  


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