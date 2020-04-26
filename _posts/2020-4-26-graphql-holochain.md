---
layout: post
title: How to build a GraphQl - Holochain middleware
tags: graphql frontend
---
## Introduction

Welcome to the blog post on How to build a GraphQl - Holochain middleware! In a sense, the primitives and building blocks that holochain offers to us inherently makes data stored in a DHT behave like a graph. In this graph we have nodes (entries) that can be related to one another through links (either [implicit or explicit](/implicit-explicit-links)). <br/><br/>
[Graphql](https://graphql.org/) allows us to retrieve these entries from DHT(and source chain) in a much more natural way. Graphql also allows us to retrieve only the necessary fields we need, and create queries that retrieve entries that are implicitly or expliciltly linked to an entry with few lines of code! Many of Happs (Holochain application) currently in development use Graphql (Particularly [Apollo Graphql](https://www.apollographql.com/)) as a middleware that acts as a pipeline from holochain to the frontend.<br/><br/>
In this guide, we will be walking you through on how to build a simple graphql queries and mutation with corresponding CRUD functions on holochain side. Lastly, we will connect the two and test if the graphql queries and mutations we made work as intended! We will be using Apollo Graphql for this walkthrough! <br/><br/>
We assume that the readers have a basic understanding of Graphql, Apollo Graphql, and Holochain. If not, you can always check the corresponding documentation to learn more about it and then dive into this post! Below are some of the useful documentation available for graphql and holochain! Make sure as well that you have [installed holochain](https://developer.holochain.org/docs/install/) locally before we get started!

* [Holochain](https://developer.holochain.org/docs/tutorials/coreconcepts/)
* [Graphql](https://graphql.org/learn/)
* [Apollo Graphql](https://www.apollographql.com/docs/)

## Approach

## Let's code!

### Defining your schema

### Writing your resolvers

### Write the corresponding zome calls on Holochain

### Making queries