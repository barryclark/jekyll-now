---
layout: post
title: SCS - Self-Contained Systems
subtitle: Thoughts about Self-Contained Systems architecture pattern  
category: api
tags: [cto, microservice, devops]
author: rainer_zehnle
author_email: rainer.zehnle@haufe-lexware.com 
header-img: "images/bg-post-clover.jpg"
---

In September 2016 I attended the [Software Architecture Summit 2016](http://software-architecture-summit.de/) in Berlin.

I listened to a talk from [Eberhard Wolff](https://www.innoq.com/de/staff/eberhard-wolff/) about "**Self-contained Systems: Ein anderer Ansatz für Microservices**".
The idea behind the [SCS](http://scs-architecture.org/) approach is really convincing. It's like a recipe with valuable ingredients.

Use the mindset of microservices as basis, add your web application know-how, season it with asynchronous communication and finally decorate it with an own UI per SCS. 
The result is a concept to split a monolithic application in many smaller web applications collaborating with another.

The website [scs-architecture.org](http://scs-architecture.org/) describes the architecture pattern and contains a self-explanatory [slidedeck](https://speakerdeck.com/player/e74a068d06a949cdb358a55ca17d2dc5#).  
It's not possible to give a better introduction. Please read the website [scs-architecture.org](http://scs-architecture.org/). 

Nevertheless I copied the main characteristics:

### SCS Characteristics

1. Each SCS is an autonomous web application
2. Each SCS is owned by one team
3. Communication with other SCSs or 3rd party systems is asynchronous wherever possible
4. An SCS can have an optional service API
5. Each SCS must include data and logic
6. An SCS should make its features usable to end-users by its own UI
7. To avoid tight coupling an SCS should share no business code with other SCSs

{:.center}
![SCS parts]({{ site.url }}/images/scs-parts.png){:style="margin:auto"}

### Akademie and SCS

The more I heard about Self-contained Systems the more I was convinced that the pattern describes the way the Akademie Domain is reorganized.

Quote from [Frequently Asked Questions page](http://scs-architecture.org/faq.html)

> Each SCS is responsible for a part of the domain. Dividing the domain into bounded contexts and understanding their relationships is what we refer to as domain architecture. Ideally, there is one SCS per bounded context.

This is the example of SCS systems from Eberhard Wolff.  

{:.center}
![SCS modules example]({{ site.url }}/images/scs-modules.png){:style="margin:auto"}

Looks a lot like the Akademie domain strategy.   
Isn't it cool to refactor a whole domain and finally find a named pattern for it?

### Start with a small amount of systems

What attracts me most on SCS is the approach to divide an existing monolith in a small amount of separate web applications.
You divide in e.g. 2-5 SCS. I'm sure that you learn a lot even while splitting a monolith in two parts.
I believe it's easier to define a clear boundary for a few systems than to divide in ten or even fifty microservices.  
After you learned your lessons I'm sure you can savely increase the number of microservices.

### Admin versus end user

Some of our systems have two explicit user roles. An admin role and an end user role (Learning Management System, Content Management System, API Management, Travel Expenses etc.).

* The functionality for the end user is often only a small subset of the admin functionality.   
* The requirements for a cool and easy to use UI are different from those for a functional driven admin UI.   
* Mobile support for end users might be a Must but not for the admin functionality.  
* The number of admins is often a fraction of the end users.  
* System availability during normal office hours for admins might be ok but a no go for end users.        

Therefore it is a reasonable first step to divide the system in an end user and an admin system.
I'm sure you will encounter a lot of obstacles to solve.  

* divide the data storage and rethink the storage approach for each system  
* do not share the business code  
* establish devops chain for two (now) independent systems  
* introduce asynchronous communication  
* and much more  

### Corporate application mashups

Goal of the SCS pattern is to help splitting monolithic applications.
But I think it is also a pattern how to compose existing applications to a combined offer.
And that's exactly what we strive for when we talk about our **corporate strategy**.

The [Frequently Asked Questions page](http://scs-architecture.org/faq.html) of scs-architecture.org contains some explanations that fit to our strategy.

> “Self-Contained System” describes best what’s at the core of the concept: Each system should work by itself. Together they form a “System of Systems”.

{:.center}
![SCS modules example]({{ site.url }}/images/scs-realsystems.png){:style="margin:auto"}

SCS divides micro and macro architecture

> ### SCSs are very isolated — how can they still form one system?
>
> The goal of the SCS approach is to localize decisions. However, to make a system of SCSs work together, some decisions affecting all of them need to be made. We can distinguish:  
>
> * Local decisions in one SCS are called micro architecture. This includes almost all technical decisions e.g. the programming language or the frameworks.  
> * Decisions that can only be made on the global level are called macro architecture. Actually, only very few things fall into this category, most importantly the protocol SCSs can use to communicate with each other, the approach used for UI integration, and possibly a way to do data replication.  

SCS also includes statements about UIs.

> We believe [ROCA](http://roca-style.org/) is a good approach for web front ends for SCS because that approach makes it easy to combine UIs from several SCSs to one. 

The article [Transclusion in self-contained systems](https://www.innoq.com/en/blog/transclusion/) contains a good discussion about different possible UI approaches.

### Conclusion

I like the SCS approach. It describes how a migration can happen in small, manageable steps with minimized risk of failure.
It leads to an evolutionary modernization of big and complex systems.

I think we should give it a try!





