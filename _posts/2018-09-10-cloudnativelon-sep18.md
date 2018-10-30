---
layout: post
title: "[Photos] [Videos] [Sep 2018] Cloud Native London September 2018 Roundup"
---

![Cloud Native London September](https://pbs.twimg.com/media/DmRan-WX4AITHT7.jpg)

The room was packed out for Cloud Native London's September meetup, ably hosted by Dominique Top and featuring three brilliant talks and a prize draw.

As always, thanks to our sponsors [StorageOS](https://storageos.com/), [Tecknuovo](https://www.tecknuovo.com/), [Contino](https://www.contino.io/), [Pusher](https://pusher.com/), and [Armakuni](https://www.armakuni.com/).

First up were the challenges of migrating microservices to Kubernetes, followed by finding value in Cloud Native, and wrapping up with Cloud Native and runtime security.

![Sarah Wells](https://pbs.twimg.com/media/DmROTfLXgAMBcYa.jpg)

Sarah Wells from the Financial Times gave a talk on ["Switching Horses Midstream: The Challenges of Migrating 150+ Microservices to Kubernetes"](https://skillsmatter.com/skillscasts/12487-cloud-native), explaining:

* There's a limit to how much new and innovative stuff you can do at any time. Make sure you spend your 'innovation tokens' on the stuff that is critical to your business. For the rest, use 'boring' technology - the stuff that works, and that lots of other people are using so you can learn from others.
* There may be a good reason to adopt a leading-edge technology that requires a bit of work from your team - in our case, running containers before there was good cluster orchestrator available. But you need to take the time to do the migration when things catch up. The FT is not a cluster orchestrator. We should be using kubernetes not our home grown equivalent. As soon as kubernetes matured, we migrated.
* Migrating a live system, particularly one with 150+ microservices is not a simple task. Expect to run in parallel for a while - but consider how much you can swarm on to the work because the quicker you migrate, the less overhead of doing things twice. We did 2000 releases while running in parallel. If it takes 10 minutes extra to deploy to both systems, that's 47 working days!

![Billie Thompson](https://pbs.twimg.com/media/DmRYG33XsAMCIRi.jpg)

Following that, Zenon Hannick and Billie Thompson from Armakuni asked ["Where's the value in Cloud Native? High value cloud native practices, and how to sell them to your boss"](https://skillsmatter.com/skillscasts/12838-where-s-the-value-in-cloud-native):

* The key to making lasting change in an organisation is to use metrics, and tacking problems that those metrics show.
* Value stream mapping is one tool that can allow you to gather those metrics and that you can do it from any position in a organisation (with or without power).
* Solutions to the problems you find using value stream mapping are frequently cloud native technologies.

![Michael Ducy](https://pbs.twimg.com/media/DmRibYXX4AE7u9e.jpg)

Finally Michael Ducy from Sysdig told us about ["Runtime Security for Cloud Native Platforms"](https://skillsmatter.com/skillscasts/12839-runtime-security-for-cloud-native-platform). His takeaways were:

* Cloud Native platforms provide lots of options for securing workloads running on them. The wide range of configurable security options can be overwhelming.
* Tools such as Host Intrusion/Abnormality detection can provide an additional layer of security for Cloud Native platforms. These tools can help:
  - Define what normal behavior.
  - Provide a mechanism for generating an audit trail 
  - Provide data that can be correlated with other events
* Container image scanning provides a "point in time" method for verifying that you're not shipping known vulnerabilities. You still need some form of protection at the Runtime level, which Falco can provide.

Finally, congratulations to the winner of a free ticket to the Skills Matter CloudNative London 2018 conference: Peter Bell! 

## Cloud Native London October

The next meetup is on Tuesday 9 October, and joining us are speakers from Jetstack, WSO2 and Exelerys. Note that we're relocating to Bermondsay this month. [RSVP and save the date now!](https://www.meetup.com/Cloud-Native-London/events/253873072/)

See you soon!

Cheryl (@oicheryl)
