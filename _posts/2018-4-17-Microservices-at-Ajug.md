---
layout: post
title: Microservices at AJUG
---
[Daniel Glauser](https://github.com/danielglauser) 

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
* One Feature --> Many Requests????
* No solution for the problem of one little part missing in the middle
* why rollback...  time series database would let you recover by rolling forward?
* monolith not looking so uncool now eh?
* Any forethought to help you quickly find the root cause for any runtime failures -> worth it!
* What transactions should be idempotent?
  * maybe even post?
  * only one transaction mutates the system,  others are handled quietly
* Retries  vs request caching vs best attempt answer



