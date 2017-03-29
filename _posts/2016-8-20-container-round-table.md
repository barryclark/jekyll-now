---
layout: post
title: Container Round Table
---

Over the last few years, Linux containers and associated technology (Docker, container registries, container orchestration tools) have been widely adopted, with our consultants using them in a number of scenarios, from simplifying the creation of local and shared test environments to running large scale production systems on premises and in the cloud.

At Infinity Works, we hold regular roundtable meetings to give us the chance to share experience and knowledge with each other. Participants pose questions and we timebox discussion using the lean coffee format.

Here’s the transcript from the latest event.

# What are containers anyway? #

EM: Fundamentally, a container is a process, or a collection of processes wrapped up so that they don’t change, which you can then put into any environment.

The idea is that you can wrap something up (something like Apache), shift it into any environment and it will be identical. So you run exactly the same container image on your laptop, in a datacentre, or somewhere else.

Within the container, all the libraries, everything is self-contained, all the container needs to run is Docker and a recent kernel version. The idea is that it makes your code more shippable, sort-of like the EAR file or WAR file concept in packing something up and making it less dependent on the host system, but it’s far more universal than that.

AH: When you say it’s got the libraries, what it’s actually got is a full operating system disk image, hasn’t it?

EM: That was true, but people have started to trim that down now, so when you install a full operating system, it installs all sorts of libraries, background processes and tools. When when you deploy your own application to a container, you start to think, I don’t need all of that, I just need the libraries that Tomcat is dependent on.

You might have some python libraries, and an app server, that’s it. People are talking about getting their operating system images down to megabytes. We have a few images at that are around a megabyte, or a couple of megabytes in size. You can keep these things really small.

## It’s like a VM but it isn’t? ##

EM: Whereas a virtual machine is a virtualised server, a container is more like a virtualised process. In terms of what it tries to encapsulate, it’s the same.

If you were to run Apache as a container, then you’d expect to see inside that container that the Apache process is there. If you were to stop the Apache process, then that container would cease to exist. It’s possible to run multiple services in a container, which you sometimes need to do, but in those cases you’d be talking about running something like supervisord and then the process, or a script running. You’re not going to find the same quantity of running processes in a container as when looking at a normal system.

## How do you use them? ##

EM: Good practice is that a CI system will build these images and upload them up to what Docker calls a registry, and people can consume those images across all of your environments. The idea being that you build once, ship, and then pull it down from anywhere.

If you have a problem with one of these things in production you can pull it down, run it and it should work the same way. There’s exceptions, but the idea is that the application, as much as possible, is contained, it’s a single entity you can share around.

I’ve seen people misuse containers where they use git as their source control,and then for every single environment, they have CI doing builds of the images and storing them in a registry local to that environment. You’d never be sure that each image was built with the same version of all of the packages as the other environment.

AH: Docker is definitely replacing tools like Vagrant on the desktop environment

EM: As a use case, within minutes you can try things out. You used to spend ages reading the docs on how to install software, now you just run the container on a port and have a look at how a piece of software works.

AH: To build a container, we're often really talking about creating a Dockerfile.

EM: Yeah, Dockerfiles are where it starts. People might be familiar with them, they tend to be quite simple. The first line is probably the most important, it will say “from”, then it will say an image, and that basically says “where do you want to start?”, most people will say “from” something like CentOS, or Ubuntu.

Ubuntu maintain an image inside Dockerhub, which is a container friendly version of Ubuntu. Some images are more optimised than most, groups like Ubuntu are really involved with this and work closely with Docker, others are just plain bad.

AH: My mental model of what a containers comes from a talk I saw at Leeds DevOps by John Leach, in that a container is a process that’s been presented with a filesystem, a bit like chrooting the process. It’s like you’re saying to the process, this is your file system, you can't access the rest of the files on the disk and you can’t access all of the network interfaces on this box, but you can see this network interface.

IL: To summarise, you’ve got your main box, and these things sit on there like little virtual machines, but they’re really cut down so you can run multiple of them. The container handles the links back to what the container needs from the operating system and only shares what the container actually needs.

AH: Good summary, and that’s why it’s got a little bit of operating system in there. The container might not have a bash shell environment, it might have a cut down thing instead. It might not have the Top command, so you might not be able to see how much CPU is being used inside the container and that kind of thing, just to keep the container small.

In your Dockerfile, when you import an image, and set “from” something, Docker will pull down the image from the internet, each “layer” of that image has a cryptographic hash associated with it. When you add more lines to that Dockerfile, like a line to copy your Python app into your container, when you build it, you’re mutating the state of the container’s file system, so it will essentially create a new layer on top of the previous layer and calculate a new hash for it. So you end up with this onion of changes.

When you push your changes back to the registry, it just pushes the delta between whatever you’ve based your container on and your changes you’ve added on top.

If you’re used to working with VM’s, you end up with these 4GB images to move around the network. Containers are network-optimised, there’s less to download and upload and if you change versions, Docker may only have to peel a few layers off the filesystem to come forward again.

# What are Container Orchestration platforms? #

EM: Orchestration platforms like Docker Swarm, Rancher or Amazon’s ECS are tools which help to schedule where containers run, in what situations and what happens when hosts fail and things. There is a fair amount of confusion around overlapping of tools, some sit on top of others and that kind of thing.

AH: The reason you might need something like an orchestration platform is that you’re likely to have built your app out of multiple things. You might have a Postgres container running a database, you might have a node.js application that’s presenting some information, you might have a Go background processing agent. And maybe you need to run a few of one thing in production for load balancing, but only one background processing agent.

You could just run them yourself, by starting up your own containers, but orchestration tools give you a bit more.

EM: Yeah, in essence, running things yourself with shell script is fine at the lower end. Orchestration comes in when you want to be able to guarantee the uptime of those services, you want to be able to easily scale them without messing about binding ports to individual machines. The orchestration tools are there to help you configure services rather than containers.

Docker is great for devs working locally, all of the command line tooling is built with that in mind - orchestration takes it to the next layer. Where you’ve built a container and you need 20 of them and, if half of them are above 50% CPU, we need the system to create another 10, that kind of thing. It’s for all the kind of logic that traditionally might have been handled by VMWare VSphere, OpenStack, that kind of thing.

IC: As well as the scaling out, it’s also handling things like load balancing, and rolling upgrades.

EM: Yes, it's a new emerging market, where companies are looking to offer value-add around the core service, allowing you define autoconfigured load balancers, define all of the networking for you so that stuff magically works, automatic address resolution and that kind of thing. All of that is stuff that these systems will provide bits of.

Some of the orchestration tools have quite a large offering, so you can pretty much just feed it a YAML file with the services you want to run and it will do everything else. Some of them are a lot more manual where they'll take care of host failures, but perhaps without load balancing, it's up to you to build a load balancer image and deploy yourself.

There are loads of products which overlap in different ways, some are better at some things, some are better at others, and it's a very split market at the moment. I wouldn't say that people are hedging their bets, because it's an easy component to take out and replace, but a lot of people are waiting to see where the market will go.

AH: The Dockercon 2016 keynote is definitely worth seeing, they demonstrated setting up a Docker swarm cluster - a 3-node set of machines than can run containers. They demonstrated some neat load balancing tricks in there, and it was slick to see the cluster self-healing. It has a cluster of management nodes, within the overall cluster, they communicate with each other like a mongodb cluster might do, but using a gossip protocol, so the system can tolerate a loss of nodes.

## Using Container Orchestration at Scale ##

GB: Certainly compared to the VM implementation at XX, Rancher is a million times better.

AH: What's the things you're doing with VMs that are better with Rancher?

GB: It's the deployment time where we really see the benefit. In the VM implementation, it takes a few hours, where Rancher takes a few minutes.

AH: Why is that? Is that because of the size?

GB: It's rebuilding machines, replacing the containers is much faster.

EM: We decided at XX to destroy and rebuild VMs rather than upgrading machines, but it comes at huge hardware cost at large scale to maintain service.

AH: Also, when it takes a long time to recreate something, then you start to think, well, I'll just keep it around a bit longer, maybe I'll adopt something like Ansible, Chef or Puppet to maintain that machine.

EM: Then there's the flip side of that, I daren't run Ansible because I've done some manual changes.

GB: We have a host at the moment, every time it's rebuilt it comes up with a problem, so we've just taken it out of the rebuild list. So now it just sits there and gets older and older, and more of a pet [see pets vs cattle - ed].

AH: They're all trying to solve the problem of networking between instances, you've got these containers working, but how do they talk to each other, when they're shifting around between physical location. how does DNS function in this environment, where does a load balancer sit? That's what Docker Swarm is trying to answer, in that you can just connect to a port on any physical machine, and it will be routed internally to the node that's running the container.

What we haven't answered, is where Windows goes. How do you run Windows as a container? You can't right now, but you can run Linux containers on Windows, by using a virtual machine.

# How do you manage databases or persistent storage? #

AH: A lot of the demos show ephemeral things, like Web servers where you can start and stop them, and you think that's great, then you think actually, a lot of the databases I'm using have specialist storage components, maybe a FusionIO card, or a RAID array that's been configured for high performance. What are we doing there? How do you save stuff?

IC: Docker has a concept of volumes which you present to a container, the question then is "what's behind that volume", and there's lots of options for that. So it can just be a directory on your host, or file on your host, or it can be lots of other things like GlusterFS, something like that.

EM: Amazon has things it can present, one of our consultants is using Prometheus as a monitoring tool, and he's backing off the time series database to the new Amazon EFS service. The container is aware that it has a folder it can write data to, that data is then backed up and is persistent. Fundamentally, data shouldn't live in a container.

??: What about performance, for a database, you have to store indexes. How does Docker solve these kind of things?

EM: People say, that Docker doesn't help with storage, but they had this problem with VMs and probably spent £1M on a SAN, stuck in the corner and created a 400GB VM. You can still map through storage from a massive SAN array if you have one, but in my mind, people who are asking that question now are people without that,people with server-based architecture. People without this huge SAN fibre connected to all of the servers.

AH: Aren’t we really talking about writing apps for horizontal scalability and trying not to have a specialised database, using a distributed database instead?

EM: Yeah, there's Riak, used by XX or Gluster, used in XX, a software-based replicated filesystem. It's great for backing things up, but it's not what you'd want if you had a high-performance database writing to it, it's simply not fast enough.

If you're in a private data centre, and you want to write to a lot of fast disks, how can you do it? I think you've gotta tackle that regardless of whether you're in a container or a VM. Or on a physical server, it's the same challenge, it's not a new challenge in my mind.

GB: Is it worth having a database container? I'm not convinced it is.

EM: Probably not. It depends what the driving force is, if it’s replacing a Hyper-V installation, and your driver is faster deployments, then do the stuff you deploy to, your application tiers and things, that's where it makes a lot of sense.

AH: A few years ago, an IT team virtualised a database server my team was using and the IO performance just wasn't good enough. There was no real benefit to the virtualisation anyway, we were using the replication features built into the database platform, and we needed the power of a full machine, so why not just use the whole box? In the end, that's what we did, consolidated the databases to a few physical machines.

GB: I've moved a few machines from virtual to physical hosts at XX.

EM: Yeah, you might have a few machines running containers, a few running VMs and still have some standalone servers.

IL: Does this help where you've got someone in QA comes along, and wants to be able to pull everything down, all the latest code, and be able to create a test environment, use it and trash it? How do you persist test data?

EM: Docker makes is easy to do that in a simple scenario of a web app and a database, something like that. Really easy, very good. When you start to have a 50 application system, you might not have enough grunt in your laptop to do it, and you start making compromises to make it all work.

Virtualisation's performance got better over time as features were added to CPU chipsets, to the point where virtualisation offers near-native speed for file system operations, but at first, all that stuff was emulated. I’d expect some performance gains in containers over the next few years.

SI: Storage isn't Docker's problem, it's your problem. Whatever solutions are available to you inside Docker, are the same solutions available to you outside Docker. You shouldn't wait for Docker to reinvent everything.

EM: People are getting used to how easy it is to run things on Amazon Web Services, but sometimes you have to build this stuff yourself, and rediscover that doing so, is actually hard.

# How do containers fit with Chef / Puppet / Ansible? #

EM: I've spent a lot of time in my work dealing with configuration management tools like Chef, Ansible and things, configuring whole environments of the back of them. Docker almost closes that gap, in that if you're deploying to Amazon or something like that, and you've got a YAML file that says I've got a webserver that listens on this port and a database server here, you don't actually need a configuration management tool.

Your environment is there using something like CloudFormation or Terraform to stand some servers up then you can do the rest with Docker-Compose, unless you have a specific use case, which I have seen.

AH: As an industry, we’re moving away from SSH-ing onto a box. We used to allow that so that Ansible configuration could take place, we're now saying that we're not going to do that, because the box or container is totally disposable.

EM: Yeah, it's the kind of thing you hear now, as people remove SSH access from boxes. People still do SSH in, but removing it enforces best practice for log management, making sure that logs are being written to and monitored. If all of that is working, then you don't need to SSH into a box.

AH: It's all based on the 12 factor app concept.

# Problems #

AH: A lot of the problems I see are less on the technical side, but on the change side. When a new technology comes out, you have the opportunity or need to rethink existing IT processes and some teams will adapt faster than others.

For example, Infosec might need to catch up. They might never have heard of containers. An organisation might have hardened build guides for operating systems, but now we're saying that we want to use a 20MB Linux distro to run containers on, which uses a different base operating system to run as a container, which is a totally different model.

Your CI process totally changes, you now need a container registry, and your build outputs are different, you're now producing a container, where your team used to produce a .war file.

People have just managed to get comfortable with virtualisation to the point where it's the normal thing, when the cost of virtualisation is just accepted.

A lot of organisations that target linux servers still give their developers Windows laptops, the Docker console output is garbled in colour mode, Docker for Windows requires Windows 10 and organisations are still using Windows 7, otherwise you're getting a lower quality solution in Boot2Docker.

Suddenly, developers are transferring a lot more data around the network. It’s a lot of change to bring on board.

GB: It's easy to think that it's possible to lift and shift everything into a container, but it's not always the case. I've seen a case where a certificate has expired inside a container.

EM: Yeah, there are things you just don't want to include in a container, like an SSL certificate. There are lots of ways to deal with that kind of thing, like Vault for secret management. The future is likely that container orchestration tools will present some way for containers to gain access to things like certificates.

??: Troubleshooting containers via SSH is hard, but it's often because you're missing the commands you're used to.

# How can we secure containers? #

AH: Part of this is how can we be confident that there are no vulnerabilities or malicious code in our base images?

I was discussing this with a client recently, my view is that when we build software, we use dependencies from other locations, and we bundle those dependencies into our application and run it. I’m not aware of any application library repositories (maven, nuget, npm) that are curated like the Apple store, Google Play store or a Linux Distribution, so it's exactly the same problem as application dependencies, but at a lower level, the operating system itself.

EM: There's a few software companies offering software to check your Docker file and image against known vulnerabilities. The software will document it and even fail your build. A lot of these solutions now work with your registry or repository and can notify you of new vulnerabilities which affect your applications, and importantly, where are those deployed. We can then see if we have a vulnerability in production.

AH: There's a great opportunity for pulling images from the repository and carrying out fuzzing, or other security analysis techniques.

EM: With a VM you can't guarantee the state of it, that someone hasn't changed it, but with containers you can check that the version that's in production has passed security tests.

It's worth making sure that you are using a private docker registry, to protect images that you've published from 3rd party download.

IC: Containers can also be signed, can’t they?

EM: Yes, the idea being that the publisher signs their image at build time, and you can validate against the public key. You can also configure Docker to only run signed images. Code signing is not a new thing, but it's not something that I've seen a lot of companies doing.

# Summary #

Containers change the modern IT landscape considerably, changing strategies across the board. Software development, configuration management, system deployment, information security and other processes are affected, the container ecosystem is diverting spend away from virtualisation.

There are benefits to be gained by adopting container technology, particularly for new application builds but established organisations need to be prepared for widespread changes across multiple teams.

# Participants #

AH: Adrian Hesketh
EM: Edward Marshall
GB: Gordon Brown
IC: Ivor Caldwell
IL: Ian Lister
SI: Steve Iveson
