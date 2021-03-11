---
layout: post
title: What You Should Know About Disaster Recovery
excerpt: |
   Disaster recovery is very often underestimated when building a project. Here is what you should know: we will talk
   about RTO, RPO, backup and restore etc...
img_url: /images/2021-03-11-disaster.png
---


Shit Happens
============

A recent news reminded a lot of people that a disaster can occur in any datacenter: 3.6 millions websites went down after
a fire blew up a datacenter of the the french company OVH. Octave Klaba, the CEO of OVH, quickly asked his customers to execute their disaster recovery plans.

{% twitter https://twitter.com/sdis67/status/1369597903535304705 %}

It's not my job to design, build and manage datacenters, so I won't lecture OVH here (also because Octave and I attended the same university). The rule is the same for everyone: sometimes, something will break and you have to prepare for it.

So let's take this event as an opportunity to learn new things and explain how we can prepare for this. I will also explain how and in what measure, we are prepared for such event at Nuxeo.

High Availability
=================

The first thing you usually plan is to have a cluster of servers: if one server fails, then the other can take the requests. It usually works well if both server are placed not too far and have a low latency with the load balancer. This is the case for instance in AWS if you place you servers in different availability zones. Availability zones are not supposed to fall at the same time and are supposed to have separate source of power and network.

In the case of the OVH disaster though, it seems that the 4 datacenters located in Strasbourg shared some infrastructure. For safety reasons, they cut the power on all datacenter when the firemen were trying to estinguish the fire. So in that case, even if you have spread your server across DCs, they are still all shutdown. That also means that you have to know the location of you servers.

At Nuxeo, we run on AWS and the Nuxeo clusters are spread across several AZs. As we use an autoscaling group, if an AZ is falling then the ASG is supposed to schedule a new EC2 instance in another AZ. Moreover, the asynchronous work are backed by Kafka that is also deployed on several AZs which gives us strong HA capabilities: if a work like an indexation or the computation of a thumbnail does not finish on a node, it will be rescheduled by Kafka on another node.

As always, it's good to plan for high availability but you only know if it works by testing it. This is done by using chaos engineering, by removing parts of the infrastructure, for instance: a node, a network, a firewall rule, or slowing things down. Running in a fully managed cloud infrastructure where you can manipulate those objects really helps here.


Backup And Restore
==================

Then, of course, the thing that comes to mind when running an application is to plan for backup and restores. This may look easy, but in various scenarios, you have several source of data to backup and all data have to stay consistent. In a Nuxeo application for instance you have the Database and the Index which are source of data. If you backup both source at a different time, then restoring them will end up in an inconsistent state: some data may have been indexed but not present in the DB backup for instance.

Some data can also be rebuilt. For instance the Nuxeo repository can be reindexed in order to rebuild the index data that then don't need to be backup. This comes with a drawback though: indexing takes time.

At Nuxeo, the default backup period for our customer is 24h and we run a full reindex after the restore. The time it takes is then depending on the size of the repository. As we store our binaries in S3, we use S3 replication to replicate the blob of our document in real time in another bucket, in another region.

RTO And RPO
===========

Recovery Time Objective (RTO), and Recovery Point Objective (RPO) are the two metrics that are measured in a DR scenario:

 * RTO: this is the time needed to get the service back once the decision to activate the DR plan has been taken. With a single restore, this is basically the time to reinstall the infrastructure somewhere else and run the restore.
 * RPO: this is the maximum amount of data that you may have lost during a disaster. This is usually the period between your backups.


 ![RTO/RPO](/images/2021-03-11-rto-rpo.png)

The idea is to try to lower as much as possible those two metrics. To lower the RTO, the idea is to plan the DR procedure and automate everything so that when it's needed, it's just a matter of minutes to execute. The restore time depends on the size of the data that you are restoring. If you need to lower that time, you may want to shard your data to have several smaller databases that are quicker to restore in parallel. Again, in this situation, there is no place for manual restore: everything must be automated.

To lower the RPO, the idea is to do more frequent backups with a combination of full and incremental backups.


This Is Not Enough
==================

In a backup/restore DR plan, the RTO/RPO is often in the magnitude of a couple of hours. In critical situations, you cannot afford this and you need to be back up in a few minutes. In order to do that, there are differents possibilities:

 * **Active / Passive replication**: there is an active application in a region A and a passive instance in a region B. Usually the passive instance is not started and only the DB are up. A mechanism then streams the change of data from region A to region B and those changes are replicated onto the DB of region B. In case of distaster, we just need to really start the application on region B and switch the DNS route. Most databases provide that kind of replications. At Nuxeo, we developped a streaming replication mechanism that allows to stream the changes from the DB, the index, the work and the binaries to a distant region. This is not part of the cloud offering.

  ![Nuxeo replication](/images/2021-03-11-nuxeo-replication.png)

 * **Active / Active replication**: in that kind of setup, we have two active regions that are kept in sync. If a region fails, then the other can serve the requests of the two region. This is very complex to achieve as some coherence problem usualy arise between the two regions. In AWS, DynamoDB offers natively some streaming replication that allows to execute that kind of active/active replication. In that particular scenario, you also have to size each environment being capable of handling the load of the two environment. If one node fails, all the load will be

Of course having a secondary active or passive site brings of course some additional costs but also some additional complexity and maintenance. For instance, in the first scenario, you have to insure that the replication process is constantly working and doesn't lag too much, or your RPO will increase accordingly. That additional maintenance adds to the price of having 2 environment running at the same time.


Rehearsal
=========

It's really great to plan for DR, but if planning is a nice idea, you need to verify that your plan is working well. That means that you need to rehearse your plan on a regular basis, not just once. In a few months, a lots of things can change: the tooling evolves, the libraries that you rely on can change, some of them may not work anymore etc... You don't want to fix some library compatibility issue the day you need to run it for real.

At Nuxeo we run some DR drill every 6 months to be sure that our automation can still run it.



Conclusion
==========
To sum up:

> Everything fails all the time, Werner Vogels

and that means everything, even the datacenters. OVH ran into a big industrial disaster this week and I'm sure Octave Klaba will make everything to learn from that event. Yes, the blast radius was too big and not limited to only one DC, yes using water was probably not the best technical solution to protect servers from fire... but it happened. OVH has some responsibility and they are accountable for it, but they are not 100% responsible of the 3.6 millions sites down.

As developpers, as ops, we are also responsible to put in place all the DR processes and the infrastructure that needs to mitigate that kind of event. I often refer to a very interesting talk by Neal Ford that I attended called "Abstraction Distractions". When developping the last streaming solution capable of handling millions of event per second, we can quickly forget that this all runs in datacenters with electricity. Some people were reminded of that this week: nobody can guarantee you that their datacenter is 100% safe.

Depending on your activity, targetting a RTO/RPO in the design phase of a solution will help you choose what kind of backup you need. The SLA that you are targetting is a good indicator of the type of DR solution that you want. But it is also a good indicator of the price that you'll have to pay. Usually, adding [one nine](https://en.wikipedia.org/wiki/High_availability#Percentage_calculation) will increase your yearly bill a lot, but not doing it can cost you a lot too!


References
==========

 * [Millions of websites offline after fire at French cloud services firm](https://www.saltwire.com/news/world/fire-breaks-out-in-ovh-building-in-strasbourg-france-561618/)
 * [Abstraction Distraction by Neal Ford](https://www.youtube.com/watch?v=cT-m8tZF6CU)
 * [High Availability on Wikipedia](https://en.wikipedia.org/wiki/High_availability)
