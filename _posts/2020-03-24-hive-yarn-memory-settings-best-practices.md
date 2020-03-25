---
layout: post
title: Hive YARN Memory Settings Best Practices
tags: hive, tez, apache, big data
last_updated: 2020-03-16
---
Setting memory usage is simple but very important. If configured incorrectly, jobs fail or run inefficiently.

## Memory settings for YARN
YARN takes into account all of the available computing resources on each machine in the cluster. Based on the available resources, YARN negotiates resource requests from applications running in the cluster, such as MapReduce. YARN then provides processing capacity to each application by allocating containers. A container is the basic unit of processing capacity in YARN and is an encapsulation of resource elements(for example, memory CPU, and so on)

In a Hadoop cluster, it is essential to balance the memory (RAM) usage, processors (CPU cores), and disks. So that processing is not constrained by any of these cluster resources. Generally, allow for two containers per disk and per cor for the best balance of cluster utilization.

## Selecting YARN memory
It is essential to leave enough memory for system tasks to run. Then divide the remaining memory into containers and see what makes sense. In yarn-site.xml set yarn.nodemanager.resource.memory.mb to the memory that YARN uses. For systems with more than 16GB  of RAM, allocate one-eight of the total memory for system use, and to YARN.

Tez Memory Settings
Tez must use the majority of the YARN container to run query fragments, but it must also leave some space for system tasks to run.
Use: `tezconfiguraiton.tez_contaienr_max_java_heap_fraciton=.8`.
