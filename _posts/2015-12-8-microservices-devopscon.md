---
layout: post
title: DevOpsCon 2015 - Is it really about the tools?
subtitle: My opinionated findings from DevOpsCon 2015 in Munich
category: dev
tags: [conference, devops, microservice, development]
author: Elias Weingaertner
author_email: elias.weingaertner@haufe-lexware.com
header-img: "images/new/Exportiert_18.jpg"
---

Two weeks ago, I attended the DevOp Conference (DevOpsCon) in Munich. As expected, it turned out to be the Mecca for Docker fans and Microservice enthusiasts. While I really enjoyed the conference, I drew two somehow controversial conclusions that are open for debate:

1. *Microservices are dinosaurs:* When people spoke about Microservices at the conference, they often were very convinced that Microservices are a new and bleeding edge concept. I disagree. In my opinion, Microservices are a new name for concepts that are partially known for fourty years.

2. *DevOps is not about technology:* Listening to many talks, I got the impression DevOps is all about containers. People somehow suggested that one just needed to get Docker + Docker-Compose + Consul up and running to transform you into a DevOps shop. Or CoreOs+Rocket. Or Whizzwatz plus Watzwitz. I disagree. Introducing DevOps concepts to your organization is mainly about getting your organizational structure right.

### What is new about Microservices?

To be honest, I really like the design principles of Microservices. A microservices does one particular job (*separations of concerns*). It is cleanly separated from other services (*isolation*), up to a degree where a microservice is responsible for its data persistence and hence is integrated with a dedicated database.

The rest of the microservice story is told quickly. Divide your system into individual functional units that are available via REST APIs. Label them microservices. Build applications by composing functionalities from different microservices. As of 2015, wrapping individual microservices into containers using a Docker-based toolchain makes it super easy to run your microservice-based empowered ecosystem at almost any infrastructure provider, no matter if it is Amazon, Azure, Rackspace, DigitalOcean or your personal hosting company that has installed Docker on their machines. I totally agree that Docker and related technologies help a lot making Microservices actually work. I also think that wrapping functional units into containers is an exciting pattern for building service landscapes these days. But is it a novel concept? Not at all.

In fact, many concepts that are nicely blended in todays microservices cocktail are more like dinosaurs that have escaped from the Jurassic Parc of computer science - not necessarily a bad thing, remembering that dinosaurs are still one of the most powerful and interesting creatures that have ever lived on earth. But what concepts am I thinking of?

First of all, Micro Kernels! The basic idea of micro kernels was to design a modular operating systems, in which basic functionalities like device drivers, file system implementations and applications are are implemented as services that operate on top of a thin operating system kernel that provides basic primitives like scheduling, inter-process communication, device isolation and hardware I/O. In essence, the micro kernel is a general execution context, and not more. All high level operating system functionality, no matter if it is a VFAT driver or a window manager, would operate on top of the micro kernel. And guess what: The operating system is working simply because all services on top of the microkernel are cleverly interacting with each other, using an API delivered by the microkernel. The idea of micro kernels was first introduced in 1970 by Hansen[1], with a lot of research having been carried in this domain since then. Replace the micro kernel with a Container run-time of choice (CoreOS, Docker, Docker plus Docker Compose) - and it becomes clear that Docker can be seen as a microkernel infrastructure for distributed applications, of course at higher abstraction levels. 

Another fundamental cornerstones of Microservices as they are considered today are REST APIs. Computer scientists also have discussed APIs ever since. For example, modern operating systems (OS) like Windows or Linux do a great job in maintaining long-standing APIs that enable loose coupling between software and the OS. While we even don't notice that anymore, this is the reason why we can download pre-compiled software binaries or "Apps" to a computer or a smartphone, install them, and run them. One of the reasons this works like a charm are standardization efforts like POSIX[2] that have been carried out long before people even thought about Linux Containers. 
In the distributed systems domain, we had a lot of discussions about how to do evolvable interface design over the past 20 years, mostly connected to technologies like Corba, Java RMI, XML-RPC or newer stuff like Apache Thrift, Protocol Buffers and now REST. In its core, the discussions have always been tackling the same questions: How can we version interfaces the best? Should we version at all? Or simply keep the old interfaces? In the OS domain, Microsoft is a good example: Windows still allows unmodified Win32 software from the mid nineties to be executed on today's versions of Windows - in the year of 2015.

At DevOpsCon, I voiced this opinion during the Microservice Lifecycle workshop given by Viktor Farcic. Many people agreed and also said that we're constantly re-inventing the wheel and struggle with the same questions. We had a nice discussion how modern's REST and MicroService world is related to SOAP. And this was in fact the motivation to write this article.

### DevOps is not about technology###

First of all, I am not the first person to make this claim. In fact, at the conference there've been a number of people that reported that they needed to adapt their organization's structure to effectively work with MicroServices and DevOps concepts.

Many speakers at the conference quoted the famous quote by Melvin Conway from 1967 that is commonly referred to as Conway's Law.

> Organizations which design systems ... are constrained to produce designs which are copies of the communication structures of these organizations
> <hr> 
> <small>Martin Conway, 1967</small>

Similar to as mentioned by Rainer Zehnle, this led to my assumption that effectively doing Microservices and DevOps somehow doesn't work well in matrix-based organizations. Effectively, matrix-based organizations are often monoliths in which a lot of projects are tightly coupled, due to shared responsibilities of project teams and individuals.

As already mentioned by Rainer in his blog post, I was really impressed how the folks at Spreadshirt - thank you Samuel for sharing this! - restructured their once matrix-based organization that produced a huge monolith into a company that is able to effectively develop a microservice-based enterprise architecture. I hope that success stories like that are not only shared among software architects and developers in the future, as a faster time to market for software artifacts does not only make a developer happy, but also the manager that carries the wallet.

### Conclusion ###

I took a lot from the conference - and I have constantly asked myself the question afterwards if we're ready yet for DevOps and MicroServices as a organization. Are we? Probably not yet, although we're certainly on the right track. And we're in good company: From many talks at the coffee table I got the feeling that many companies in the German IT industry are in the same phase of transition as we are. How do we get more agile? How do we do microservices? Should we have a central release engineering team? Or leave that to DevOps? I am excited which answers we will find at Haufe. We'll keep you updated. Promised.

[1] Per Brinch Hansen. 1970. The nucleus of a multiprogramming system. Commun. ACM 13, 4 (April 1970), 238-241. DOI=[http://dx.doi.org/10.1145/362258.362278](http://dx.doi.org/10.1145/362258.362278)

[2] [http://www.opengroup.org/austin/papers/posix_faq.html]([http://www.opengroup.org/austin/papers/posix_faq.html)