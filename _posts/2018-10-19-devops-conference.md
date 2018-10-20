---
layout: post
title: DevOps Conference Learnings
author: jake_hall
---

I recently attended the National DevOps Conference. I sometimes find it useful to make notes during these kinds of events, and rather than them being buried, unloved, somewhere hidden. I've written them up, so here they are for the world to see, and hopefully you'll find them useful.

# What is it?

The National DevOps Conference is a 2 day conference, hosted at the Millennium Gloucester Hotel in Kensington. It has 3 tracks of talks on at any given time, bookended by keynote speakers.

# What did I learn?

## Kotter's Model/Cycle

If you want to implement change in an organisation, something we regularly do as consultants, you'll probably need this in your back pocket. The most important part of starting a change is to **create urgency** or a need for the change, otherwise it will be less likely to happen.

1. Create: A need for change and urgency
2. Build: An internal team to manage the change
3. Form: Make a strategy which aligns with business vision
4. Enlist: Encourage volunteers and engage them in meaningful activities to support the change
5. Enable: Reduce the ineffective and unnecessary processes from the system
6. Generate: Set short-term goals leading towards the long-term change
7. Sustain: Moreover manage planning, finances and processes with change leadership
8. Institute: Lastly, communicating the importance of keeping up with change to all employees and show transparency in the processes.

Thanks to Keith Watson from ADP for this one!

## Intra-cluster security

We all know that securing our services from the internet, or North/South traffic is absolutely paramount. Whether this is locking down firewalls, or security groups, to using internal only IPs. There are many, many options whether you're on-premise or in cloud.

What is becoming apparent is the need to protect our East/West traffic, that is our intra-cluster traffic. The traffic when each of our services talks to another one of our services.

One of the ways to protect and secure our East/West traffic is to use a Service Mesh. [Istio](https://istio.io/) was recommended by David Luke as an excellent option.

## Intra-team communication

Thanks to Elizabeth O'Neill, I learnt about a tool for a non-judgemental way of evaluating different personalities.

DISC profiles, that is Dominant, Influential, Steady, Conscientious. There are some [really good slides on discProfile.com](https://www.discprofile.com/what-is-disc/overview/). It also explains the behaviours of these traits, and how to communicate when people are exhibiting these different styles.

## Agile Governance

Sometimes larger companies want more structure around Agile, and want to see it "compliant". Iwona Winiarska argues we're already most of the way there, we just need to reframe the question.

Through ceremonies, our Definitions of Ready and Done, and defined Roles & Responsibilities, we're usually covering most of the process governance some places want to see.

She also recommends against Continuous Improvement, but instead we should do "Dynamic organic continuous incremental improvement" or just don’t change for the sake of it. Continuous Improvement implies that we're on a treadmill that never stops turning, but actually we should only make a change when it's may add value and happens naturally.

## We are all blue team

Blue team, colloquially means an internal security team. On any project, we should all take responsibility for security. Aubrey Stearn gave us some really handy ideas and tools to help automate some of this burden. All of these also help us ever present goal of Shifting Left, trying to pull as much forward to the start as possible so we derisk everything.

* [Snyk](https://snyk.io/) will automatically check your dependencies for vulnerabilities
* [Greenkeeper](https://greenkeeper.io/) for NPM projects - can auto upgrade your dependencies (after testing them of course!)
* Using containers? [Clair](https://coreos.com/clair/docs/latest/) can check for vulnerabilities in them for you.
* Running a website? [Detectify](https://detectify.com) can automate pen-testing.
* If you're running Kubernetes, you probably don't need all of the [default permissions](https://kubesec.io/basics/containers-securitycontext-capabilities-drop-index-all). Use `drop all` then only add back what you need.
* Multi stage docker builds can limit the blast radius of build tool vulnerabilities, run the minimum possible in the container that ends up in production.

## Wrap up

As with all conferences, a huge effort goes in behind the scenes from what we see as delegates. A massive thank you goes out to all the speakers, and organisers!
