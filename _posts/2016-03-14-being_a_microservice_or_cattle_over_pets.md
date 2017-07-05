---
layout: post
title: Being a Microservice or Cattle over pets
subtitle: A personal recap on QCon 2016
category: dev
tags: [conference, qcon, microservices, devops]
author: Axel Schulz
author_email: axel.schulz@semigator.de
header-img: "images/new/Exportiert_18.jpg"
---

# Being a Microservice or Cattle over pets

First thing I did after receiving the invitation for QCon 2016 was of course to take a look at the schedule.

And to be honest: I was kinda disappointed by the seemingly missing link between all the tracks and sessions. Though it offered you a variety of interesting areas to dive into, I was missing the glue that should keep a conference and its attendees together.

Turned out - the glue were the mysterious microservices or at least they were suposed to be. I attended seemingly endless talks in which people were almost desperately trying to find some connection between microservices and their actual topic:

* Chaos testing a microservice infrastructure? _Well, to be honest: we don't test microservices, we test instances - but we do have > 700 microservices_
* Test-driven microservices? _Nice topic, but I'd rather speak about how important and awesome microservices can be_
* Modern Agile Developmen? _Yea, we'll just present you some lean management stuff and btw, we do microservices as well!_

But when there is shadow, there has to be light that casts the shadow and I stumbled upon some talks and lessons that I will really carry with me back to my team.

## "Treat your machines as cattle - not as pets!
At [Semigator](http://www.semigator.de) we're still doing the hosting of our production environment in a pretty conservative way. We have a bunch of virtual ressources (CPU, RAM, HDD etc.) that we combined into virtual machines and we take care of everything on these machines - starting from the OS updates to fine tuning application configuration on every machine. We're really pampering them like pets, because that's how system administration works, right? But why would we want to spend time on doing this that have actually nothing to do with our business? We are a webshop for further education and our business is to provide our customers with a lots of training offers - not to do server management!

Today's technology stacks enables you to ship your application either as a (almost) full working instance (Axel Fontaine of Boxfuse demonstrated in his talk "Rise of the machine images" how easily an application including a complete OS image can be created with only 15MB and deployed to AWS including propagating the new IP to the DNS) or at least as a container that bundles all dependencies and leaves it to the host to provide them. So if you need to deploy a new version of your application - or your microservice - you just create a new image, deploy it and delete the old one. So no more pampering of Linux or Windows machines! Just deploy what you need and where you need it! Of course this requires some preparations: you'll need to get rid of everything that you don't need on your machines, like:

* **Package Managers** - we're not going to install anything on this instance, so just get rid of it
* **Compilers** - This instance is supposed to run our application and not serve as a developer machine and we don't plan to update it either - so beat it gcc, javac and the rest!
* **Logging / Monitoring** - all logging (system and application side) should be centralized using fluentd, logstash or whatever anyways  
* **User Management** - we don't want anybody to work on these machines, why would we need user management?
* **Man pages** - if no ones working on it, no one will have to look things up
* **SSH** - if nobody is to connect to these machines, we don't need SSH

and you could continue this list until it fits for your use case, as long as you only take as much with you as need.

Right now, we're wasting lots of time on monitoring available system updates, root logins or passwd changes. Our servers are overloaded with editors, drivers and other things that are absolutely superfluous for their actual job.

So, it's not like we'll be switching to this kind of slimline image deployment by snipping out fingers - I tried it - but it's no rocket science either. We see the obstacles in our way, some are minor - like routing the rest of our logs to our logging instance - and some are bigger, like figuring out, how to built our images for indivdual fit: what do we need and what's just an impediment for us.

We will not start with an automatic deployment on our hypervisor, but we fell like doing this, will give us the ultimate control of our application and the environment its running in and it's a crucial part of our tech strategy @Semigator.

## Talk by Aviran Mordo on his microservices and DevOps Journey
The reason why I liked this talk by Aviran Mordo from WIX.com is simple: he had the answer - it's that simple! He had the answer to my utter question: How...? How the heck do you go from your fat, ugly, scary monolith to microservices? His answer is: be pragmatic - if you split your monolith into two services, 50% of your application will still be available if the one services dies!

Aviran described how WIX.com started to work on their microservice architecture: by splitting its monolith in two, drawing a firm border between these two and go down further from there, which helped them building up experience steady on the way. The team drew the cutting line for the services on the data access level - one service focused more on reading data while the other focused on writing data. To get the data from the writing service to the reading service, they just copied them. Well, you might like this particular solution or not (I don't), but the point is: find this one - and only one - border that goes through your system and separates it. The other important part of his talk was the ubiquitous question on which technology to use for orchestrating the microservices, event messaging system, API versioning and distributed logging - and it's:

**YAGNI, you ain't gonna need it! - Default to the stack you know how to operate!**

So that was like an oasis among the zillions of sandcorns of todays kafka, akka, amqp, fluentd, logstash, graylog, zookeeper, consul etc. What he meant was: if you didn't need it before with 1 monolith - you still won't need it with 2 services. Or with 3 or 4 or 5... Now, that they've got up to 200 microservices, they think about adding some of these stacks - but why adding further complexity in the beginning when you've got your hands and minds full with other things?
Why would I start thinking about, e.g. how to implement Service Discovery or which API Management System to choose, if I only have 2 services running and I know exactly where they run and how to access them?
When you're splitting your monolith in two, you have other problem to take care of like how to make sure the two new services still get to communicate with existing other components. How do they get their data, since they were probably doing cross-domain data access before. Where to deploy the services? Same site as before? That might require re-configuration your web server. So solve these problems first and play around with the rest later.

For WIX.com already this first step of splitting the monolith brought significant benefits:

* seperation by product lifecycle brought deployment independence and gave developers the assurance that one change could bring down the whole system (but only half of it)
* separation by service level made it possible to scale independently and optimize the data to their respective use cases (read vs write)  

What I particulary liked about this talk was that he showed a real practical methodology, that everybody could follow - literally and practically - and that alignes with the hands-on mentality that you need to have if you're taking on a problem like this.

This not often heard pragmatic approach wrapped up with the ubiquitous remark that each services must be owned by one team and this team has to take on the reponsibility for it (_You build it – you run it!_) frankly did not contain any new insights at all but it served so well as a real life experience that I would really love to try it out myself - watch out Semigator-monolith!
