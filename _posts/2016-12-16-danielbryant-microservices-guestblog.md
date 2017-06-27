---
layout: post
title: Lessons Learned from the Haufe Dev Microservices Architecture Day
subtitle:
category: dev
tags: [conference, culture, microservice, api]
author: Daniel Bryant
author_email: daniel.bryant@opencredo.com
header-img: "images/new/Exportiert_18.jpg"
---

Two weeks ago we (Lorenzo Nicora and Daniel Bryant from OpenCredo) had the pleasure of visiting the Haufe Group architect and development teams in Freiburg, Germany, to contribute to the ‘Microservices Architecture Day’ conference. Topics covered by the Haufe and OpenCredo teams included microservice development and antipatterns, reactive principles, actor-based systems, event sourcing, and API management. We’ve summarised our key learnings below, and we are always keen to receive feedback and questions

### Looking at the ‘Big’ Picture of Microservices

Daniel kicked off the conference by presenting [“Building a Microservices Ecosystem”](http://www.slideshare.net/opencredo/haufe-msaday-building-a-microservice-ecosystem-by-daniel-bryant), and examined what it takes to build and integrate microservices, from development through to production. [Local development](https://opencredo.com/working-locally-with-microservices/) of more than a few services can be challenging (and is a big change in comparison with coding against a single monolith), and as such Daniel recommended using tooling like [HashiCorp’s Vagrant](https://www.vagrantup.com/about.html), [Docker](https://github.com/docker/docker), mocking and stubbing, and service virtualisation applications like [Hoverfly](http://hoverfly.io/). Creating and utilising a build pipeline suitable for the build, test and deployment of microservices is also vital, and must be done as early as possible within a microservices project.

Next, Lorenzo discussed the design and operation of systems following principles presented within the [Reactive Manifesto](http://www.reactivemanifesto.org/) in a talk entitled [“Reactive Microservices”](http://www.slideshare.net/opencredo/reactive-microservices-by-lorenzo-nicora). ‘Reactive’ can be thought of as a set of architectural patterns and principles that can be applied both at the microservice system (macro) and individual service (micro) level. Key concepts discussed included the need for non-blocking processing, message-based communication, asynchronous delegation, resilience, isolation and replication, elasticity, and location transparency. Lorenzo shared lots of anecdotes and lessons learned with working with this type of technology ‘at the coal face’, and was keen to stress that the audience can still apply and benefit from reactive principles without using an explicit ‘reactive’ technology.

### To Infinity and the Cloud

After a quick break [Andreas Plaul](https://www.linkedin.com/in/andreasplaul) and [Thomas Schuering](https://twitter.com/thomsch98) from the Haufe team presented a deep dive into the Haufe cloud strategy, and also presented an approach to providing tooling (and a platform) for unified logging across the organisation. The focus on using containers was clear, as were the benefits of providing centralised support for a specific toolset without the need to ‘enforce’ its use.

Lorenzo was then back on stage presenting a short talk about the [Actor Model](http://www.slideshare.net/opencredo/haufe-msaday-the-actor-model-an-alternative-approach-to-concurrency-by-lorenzo-nicora), an alternative approach to concurrency. Alan Kay’s original idea with object-oriented Programming (OOP) centered around little computers passing message between themselves, and Lorenzo explained the similarities with the actor paradigm - actors interact only by messaging, and actors ‘react’ to messages. An actor handles one message at a time (never concurrently) and has internal state. Therefore, an actor is inherently thread-safe. Using the actor pattern does require the learning of a new paradigm, but there is the benefit of easily managed asynchronous communication and thread-safety.

### The Deadly Sins of Microservices, and the Heavenly Virtues of API Management

After lunch Daniel stepped back onto the stage and talked about some of the [“deadly sins” antipatterns](http://www.slideshare.net/HaufeDev/haufe-seven-deadly-sins-final) that the OpenCredo team have seen when working on microservice projects. Some of the key takeaways included: the need to evaluate the latest and greatest technologies before their use; standardising on communication approaches; realising that implementing microservices is as much about people (and organisation design) as it is the technology; be wary of creating a ‘distributed monolith’; implement fault-tolerance within your services and system; don’t create a canonical data model (and look instead at bounded contexts); and make sure you adapt your testing practices when working with a distributed system.

[Martin Danielsson](https://twitter.com/donmartin76) from Haufe was next to present a new approach to [API management within Haufe](https://www.youtube.com/watch?v=2lyADLYnXc0), using the Wicked API gateway framework. [Wicked](http://wicked.haufe.io/) is available as open source software, and is built upon the open source Mashape [Kong API Gateway](https://github.com/Mashape/kong) (which in turn is built upon nginx). Martin began the talk by examining the role of an API: providing access to APIs, providing usage insights, implementing cross-cutting security (authentication), traffic control, and decoupling the inside systems from the outside allowing external interfaces to be some degree shielded from changes. Wicked also uses Docker, Node.js and Swagger and the code can be found in the [‘wicked.haufe.io’](https://github.com/Mashape/kong) repo with the Haufe-Lexware GitHub account.

### Closing the ‘Event’ with ES and CQRS...

The final talk of the day was presented by Lorenzo, and focused on [‘A Visual Introduction to Event Sourcing and CQRS’](http://www.slideshare.net/opencredo/a-visual-introduction-to-event-sourcing-and-cqrs-by-lorenzo-nicora). After a brief introduction to the concept of an ‘aggregate’ from Domain-driven Design (DDD), Lorenzo walked the audience through various models of data storage and access, from synchronous access using a RDBMS to event sourcing and CQRS (via asynchronous message-driven command sourcing). Benefits of event sourcing include easy eventual business consistency (via corrective events), being robust to data corruption, providing the ability to store history (“for free”) that allows state to be rebuilt at a point in time, and scalability (e.g. utilising distributed k/v stores and asynchronous processing). Lorenzo cautioned that there are also drawbacks, for example no ACID transactions, no “one-size-fits-all”, and the additional complexity (and developer skill required).

### Wrapping up a Great Day!

The day concluded with the Haufe Group running a public meetup in the same venue, with Daniel presenting his updated “Seven (More) Deadly Sins of Microservices” talk, Martin reprising his presentation on Wicked.io, and the Haufe Akademie team talking about their journey with DevOps processes, infrastructure as code and dockerising an existing suite of applications.

There was lots to think about after watching all of the talks and chatting to attendees, and we concluded that there are many challenges with implementing changes like moving to a microservices architecture or migrating to the cloud within a company that has the successful history and size of Haufe. The primary issue for a leadership team is defining the role that IT will play within any transformation, and being very clear what the organisation is optimising for - the drive to minimise costs and maximise innovation are typically mutually exclusive. 

From the technical perspective of transformation, the most difficult challenges are: knowing what questions to ask, and when. 

To ask the right question at the right time, developers must accept that constraints - centralised solutions, “guide rails” and platforms - are necessary to deliver and conduct maintenance at a sustainable pace. They must also  focus on fundamentals - agile processes, correctly applied architectural principles. And finally, they must additionally constrain themselves to bounded experimentation and learning - rather than being distracted by the shiny new technology. 

We are confident that the Haufe leadership is well aware of these challenges and we could see the effects of plans put in place to mitigate the risks, but it’s always beneficial to remind ourselves of them from time to time!

As far as we saw everyone left the event with lots to think about, and there were many great conversations had throughout the day. Here’s to next year’s event!

