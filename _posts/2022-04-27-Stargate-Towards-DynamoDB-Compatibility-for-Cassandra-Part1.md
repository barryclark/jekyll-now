---
layout: post
title: Stargate - Towards DynamoDB Compatibility for Cassandra (Part 1)
---

To fulfill my capstone project requirement for the Carnegie Mellon University (CMU) [Master of Computational Data Science](https://mcds.cs.cmu.edu/) (MCDS) program, I and two of my classmates, Ziyan Zhang and Xiang Yue, collaborated with [DataStax](https://datastax.com/) to develop a new module in the [Stargate](http://stargate.io/) system to bring Amazon [DynamoDB](https://aws.amazon.com/dynamodb/) compatibility to [Apache Cassandra](https://cassandra.apache.org/_/index.html). I will introduce our journey in two blog posts. Here in Part 1, I will provide some background on the project and describe the overall design of our system. In Part 2, I will discuss some interesting challenges we encountered and how we solved them.

![]({{ site.baseurl }}/images/2022-04-27-Stargate-Towards-DynamoDB-Compatibility-for-Cassandra-Part1/image3.png)

## Cassandra vs. DynamoDB

Cassandra and DynamoDB are two popular NoSQL databases inspired by Google’s [BigTable](https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf) and Amazon’s [Dynamo](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) papers. They have many similarities but I think it is more useful to look at some of their biggest differences:

1. Cassandra is completely free, while DynamoDB is commercial. As a free product, Cassandra can be deployed either on-premise or in the cloud (private, public, or hybrid). For enterprise users, companies like DataStax have cloud offerings and enterprise support for Cassandra. In contrast, despite having a free-tier service, DynamoDB is a commercial and proprietary product, meaning that you have a vendor lock-in problem once you decide to use it. That is, you can only use DynamoDB in AWS but not in your private cloud or any other public cloud. You don’t have much choice if you begin to feel unsatisfied with the pricing or service because the migration cost would be too high.

2. Apache Cassandra is open-source, while Amazon DynamoDB is closed-source. The advantages of open-source products have been widely discussed so I’ll save you some time here. From my personal experience, the biggest advantage of open-source is the ability to make tailor-made changes, and the biggest disadvantage of closed-source is the black-box nature of system behavior — there are always things that are not documented.

3. Cassandra enforces schema while DynamoDB is schemaless. Schemaless might be convenient and flexible for developers, but developers often still need to have some sort of schema on the application side for software engineering reasons.

4. Both databases have their own query languages. Cassandra uses [Cassandra Query Language](https://cassandra.apache.org/doc/latest/cassandra/cql/) (CQL), which is a variant of SQL, while DynamoDB (low-level API) uses JSON as a request payload.

There are many more differences, but the first two illustrate why it might be a good idea to use Cassandra instead of DynamoDB, and the last two point to the potential difficulties in switching to Cassandra if you decide to use DynamoDB and later regret that choice. For users that are already using DynamoDB or already have expertise in using DynamoDB, switching from DynamoDB to Cassandra might be too costly.

## How Stargate provides DynamoDB compatibility

It is difficult for users that are already using and/or are familiar with DynamoDB to switch to Cassandra, so why don’t we make Cassandra compatible with DynamoDB? Wouldn’t it be nice for users to be able to switch from DynamoDB to Cassandra without having to change a single line of their existing codebase if they want to? Bingo! That’s what our project is for. Basically, we leverage a third framework called “Stargate” to build a middleware for Cassandra that is compatible with DynamoDB.

[Stargate](https://stargate.io/) is an open source data gateway that sits between your app and your databases.
Stargate is an open-source middleware that sits on top of a database, e.g. Apache Cassandra. It abstracts Cassandra-specific concepts entirely from app developers and supports different API options, removing barriers of entry for new software developers. Right now, Stargate supports [REST API](https://stargate.io/docs/stargate/1.0/quickstart/quick_start-rest.html), [Document API](https://stargate.io/docs/stargate/1.0/quickstart/quick_start-document.html), [gRPC API](https://stargate.io/docs/stargate/1.0/developers-guide/gRPC.html), and [GraphQL API](https://stargate.io/docs/stargate/1.0/quickstart/quick_start-graphql.html). These different API options are pluggable and can be installed when needed.

## Stargate Architecture

The figure below shows the Stargate (v2) architecture. As described in [this](https://stargate.io/2021/11/02/introducing-the-design-for-stargate-v2.html) blog post, Stargate (v2) is highly modular. There are already many services that provide different kinds of APIs. Our goal was to create a new service that provides a DynamoDB API. We wanted this API to be able to understand DynamoDB queries and transform them into Cassandra queries and for users to be able to continue using their existing DynamoDB client code to interact seamlessly with Cassandra.

![Stargate Architecture]({{ site.baseurl }}/images/2022-04-27-Stargate-Towards-DynamoDB-Compatibility-for-Cassandra-Part1/image1.png)

## What does a query workflow look like
We didn’t want users to have to change a single line of code when switching to Cassandra. But wait a minute…how is that ever possible given Cassandra and DynamoDB have different client libraries? The answer is simple: DynamoDB clients talk to DynamoDB servers in HTTP protocol. 

By implementing a web service on top of Cassandra that behaves in the same way as the DynamoDB server, DynamoDB clients could continue to work without knowing it is actually talking to Cassandra. We implemented such a service as a new module in Stargate - the Dynamo API Service. A typical workflow is shown in the following diagram.

![Query Workflow]({{ site.baseurl }}/images/2022-04-27-Stargate-Towards-DynamoDB-Compatibility-for-Cassandra-Part1/image2.png)

## Sequence diagram for PutItem API

The sequence diagram above shows the workflow for DynamoDB [PutItem API](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html). Let’s ignore the first component `AuthResource` for now — all we need to know is that it helps with authentication. By using the DynamoDB client to put an item into the database, the client would send an HTTP request to the configured DynamoDB server endpoint. To use our system, users just need to change their endpoint from AWS to our service. It’s just one line of configuration change! Then everything is handled by our service and Cassandra.

Let’s get back to the sequence diagram. After receiving an HTTP request, `DynamoResource`, our REST API controller, will recognize the type of request, deserialize the parameters, and then dispatch them to an appropriate Proxy class, in this case, `ItemProxy`. The `ItemProxy` component takes the main responsibility of handling the request. Specifically, it needs to parse the request and transform it into a Stargate intermediate representation. You may ask, why an intermediate representation and not a Cassandra query directly? As we said earlier, Stargate is a middleware that sits on top of your database. Although the database we are using is Cassandra, it could be any other database as long as Stargate supports it. 

By transforming DynamoDB request into Stargate intermediate representation, we leverage the Cassandra adapter that is already implemented by Stargate. After transforming the request to Stargate intermediate representation, `ItemProxy` sends it to the Stargate coordinator via `StargateBridgeClient` which is essentially a gRPC client. The Stargate coordinator then talks to Cassandra nodes and returns the results back.

Note that some requests are straightforward and only need one round-trip between Proxy — Stargate Coordinator — Cassandra cluster. Other requests are more complicated and may need multiple roundtrips. In the PutItem example shown in the sequence diagram, three round trips, at most, are needed. How come we need three round trips for a single write operation? That’s due to the schema difference between Cassandra and DynamoDB. Remember that in the beginning, we said DynamoDB is schemaless while Cassandra is not? That means you could insert an item to DynamoDB with new columns without pre-defining the schema (actually you cannot define a schema in DynamoDB), while you couldn’t do the same for Cassandra. 

In Cassandra, if a write operation contains columns that are unknown, the request fails. Therefore, `ItemProxy` needs to first check whether the schema needs to be updated and if so, it must update the schema first before actually persisting the data. This sounds very slow, isn’t it? Luckily, Stargate has a caching mechanism, and most of the time, the schema will be cached and the overhead is small unless new columns appear frequently.

Now that you understand our motivation and the basic design for our service, stay tuned for our next blog in which I will talk about some interesting challenges we encountered and how we solved them.

_Special thanks to all the members of the Stargate community who supported this effort including Prabhat Jha, Sebastian Estevez, Tatu Saloranta, and Jeff Carpenter._