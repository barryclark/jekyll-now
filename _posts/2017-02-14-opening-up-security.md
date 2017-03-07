---
layout: post
title: Opening up security
author: flock3
---

## Overview

There has been a cultural shift in recent years around who is reposible for implementing security.

Perhaps the most concrete example of this, is that of the ever increasing number of development teams, implementing 
their own secret management systems using tooling like Vault to store their business secrets, with their info-sec teams then moving
more towards of a role of supporing the implementation of secured by design principles; rather than being the driving force behind it.

I belive that this cultural shift is due to nothing more than their being software available now that simply wasn't five years ago
previously if you wanted to store your secrets, you might go and ask the IT procurement department for budget to buy a HSM, and then
spend three months integrating that into your workflow, but with the rise of containerisation, and with the more widespread adoption of
cloud services, there needed to be new software to solve problems that people were encountering.  The problems havent changed, we have
just started to see them faster, and think about them more as a result of that.

## Software with secrets in mind

To give a concrete example of this kind of realisation in mind, one of the teams I most recently worked with had replatformed their stack
from tin in their data centers to using cloud providers (Amazon in their case), and at the time of replatforming, they moved to containerising
their application.  One of the concerns they had, was that they were using a public cloud provider to store their docker images. So if they
did what they always had, and stored their secrets in the source code, and had that source code and config switched it into place, then their 
production database credentials would have been available in their image, if the cloud provider was then ever compromised, then they could 
have a much more serious breach on their hands, than that which access to the source would normally give an attacker.

The team chose to use Vault by Hashicorp initially just to store the key/value pair secrets that they needed. Vault solved the problem of 
how to store the secrets securely, and even partly solved the problem of how to get them onto the containers; but there was still some not small
work to truly integrate Vault into their workflow.

Now when the team is developing the software and they have a new secret to store, there is very little temptation just to store it in the source
or any other easy solution, because storing it in the Vault that lives in the environment, is not that much more complicated.

Implementing some security can seen exceptionally daunting, especially with a new piece of technology that is otherwise unknown, and it must be said
that Vault does not to much to ease people into the process of understanding what it does, but (in my opinion) much more importantly; how it does it.

## How they authenticate and authorize

One of the big problems with any system that manages any aspect of security, is authentication and authorization. Vault has a number of paradidms 
that they have implemented, that help you to solve these problems.

### EC2 Based authentication with Vault

Vault has a lovely authentication (and authorization) system called EC2-Auth. The system can be simply described as one that uses Amazon
as a source of truth for deciding if something can authenticate, and then what roles it has.  The workflow for an EC2 based authentication is fairly simple:

* EC2 instance calls the Amazon Metadata API 
* EC2 instance retrieves the PKCS signed metadata from the Amazon Metadata API
* * (That metadata takes the form of the servers instance id, any tags it has assigned to it, and various other pieces of information)
* EC2 instance sends that signed metadata to Vault server along with a NONCE (3)
* Vault validates the signing of that data against Amazon's public key 
* Vault calls Amazon's API to confirm the identity of the instance, and to find out what roles it can have
* Vault generates a cubbyhole token (4) and returns it to the EC2 instance

For an authentication and authorization system, the above is actually quite simple and (dare I say it) fairly elegant, but it wasn't a good solution for the 
team, because as you might have guessed (when it passed a nonce); it's only good for one authentication attempt.

Vault have (fairly) made the decision that an EC2 instance can only authenticate once, and on any subsequent authentication attempts it must _reuse the nonce_.
That re-use of the nonce makes it unsuitable for a container enviroment just on it's own, but it also makes it more difficult to use container level networking
only, as in that case (where a container can be on any host) it is difficult for all containers not to have the same level of authorization.

The solution for that team was to find another source of truth, and in that case they chose Rancher (their container management system) to be their source of truth.

### Rancher as a source of truth

Using Rancher as a source of truth required the team to write a custom intermediary API that handled the interaction between Rancher and Vault, this effectively meant
that they wrote software that lived within the security scope; so their solution was to make it as thin a layer as possible, to give it the minimum possible
attack surface.

The basic workflow of using Rancher as a source of truth can be broken down like this:

* Container starts up, fetches it's container ID from Rancher's Metadata service (or it's hostname - as it's faster)
* Container sends that container ID to their intermediary API
* Intermediary API queries Rancher's API with the container ID, and confirms that the container is running
* Intermediary API queries Rancher's API with the container ID, and retrieves a list of labels from Rancher
* Intermediary API calls Vault and requests a token with the roles specified by the container's labels

## Problems they came across

* The first and most obvious problem is that they had to write their own software, their software lives in scope, and has to be in an exceptionally privilved positiont
to be able to make vault authentication tokens that have many policies applied.  This means that a compromise of this intermediary layer, is a compromise of all 
environment secrets










## Reference

* (1) NID - Network Intrusion Detection
* (2) HID - Host Intrusion Detection

