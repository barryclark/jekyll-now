---
layout: page
title: Kafka steward
permalink: /projects/contributions/kafka-steward
---

----
[https://github.com/sysco-middleware/kafka-steward](https://github.com/sysco-middleware/kafka-steward)  
 
****

#### Tech stack
Apache kafka, scala, sbt, akka, akka-streams, prometheus, opencensus, protobuf

#### Project description
There are many events happening on a Kafka Cluster, as Topics updated, Brokers added to the Cluster, and so on. 
`Kafka steward` is designed to expose those events in a Kafka Topics so it can be consumed by other parties.