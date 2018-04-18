---
layout: post
title: Microservices at AJUG
categories: ajug,java,meetups,patterns
---
[Daniel Glauser](https://github.com/danielglauser) gave us much to think about when choosing to apply microservices pattern to any particular problem

## Part I - How we got here... an overview of patterns past and present
* the challenges of monoliths
* SOA anyone?
* the challenges microservices
  * transactions
  * dependencies & versioning
  * security
* data modeling
  * where do you see the data model?
  * is nosql really the answer
  
## Part II - Loosely Coupled
* One Feature --> Many Requests???? < Your product team will *love* you!
* No solution for the problem of one little part missing in the middle
* why rollback...  time series database would let you recover by rolling forward?
* monolith not looking so uncool now eh?
* Any forethought to help you quickly find the root cause for any runtime failures -> worth it!
* What transactions should be idempotent?
  * maybe even post?
  * only one transaction mutates the system,  others are handled quietly
* Retries  vs request caching vs best attempt answer

## Summary > learn about orchestration if you want distributed

## Part III - Real World
### Problem A -> safely deploying a change across 6 services
* Additive only changes, does your model support?
* or multi-versioned services  (consumer contracts?)
* or go old school and use a maintenence window  (good-bye sleep schedule!)

### Problem B -> small isolated code islands
* and sometimes teams did not conflict in code changes!
* Competetion for shared services across features
* Performance is a feature: (where 4-5 second transactions,  so did we make the user wait?)
* Does a docker-compose with 30+ services easier than a monolith?

### CAP Theorem
* @see rabbitmq cluster to learn theory in practice

### SPA to the rescue
* Brower stateful,  async data transactions with backend
* pre-fetching to optimize slower domains
* Queues simply out-grew expectations under load

### The case for libraries over services?
* or is this a sign you're going back to the '90s monolith?
* but do you want to update 5 services to ingest the emergency security fix in your mail library?
* do you feel comfortable forking libraries as clients diverge in needs?

###  The radical idea
* Align services to features!
* Customer focus not engineering focus
* Align teams around feature > full-stack teams not technology teams.
* Functional Bounded Context  (Domain Driven Design)
* Conway's law < always consider the organization will drive design

### Drawbacks
* Potential missed optimizations > think Google's Big Table as a service... or product?
* are we really just slicing the old problem that SOA and EJB promised to solve?
* why do we think microservices will really be better?
  * well opensource e.g.
* 


## Questions and Comments
* "A single point of failure is a Single point of agility"
* Tap Stream pattern to feed reporting ... Event Streams can do *anything*
* Every touch point ... is a security vulnerability
* How do you test... with a big ball of mutable state?


