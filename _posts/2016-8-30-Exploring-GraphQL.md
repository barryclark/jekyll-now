---
layout: post
title: Exploring GraphQL by creating a schema for Pokemon Go
---
In this post, we'll take a look at GraphQL, a querying langauge created by Facebook that was open-sourced in 2015. We'll learn about the querying powers that come with it, the benefits of using it, and compare it to traditional methods of querying RESTful APIs. 

## What is GraphQL? 
GraphQL is a data querying langauge that contains a type system, static validation, and type introspection. It's designed to provide the client side of an application with the data it needs to render its views to a user. GraphQL lets the client tell the server exactly what data it needs to render a view, and the server responds with exactly that. It presents an alternative paradigm to REST, and we'll look at the differences between GraphQL and the REST paradigm throughout this post. 

## Why should you use GraphQL? A quick overview
- GraphQL is client-centric: GraphQL queries are created on the client and sent to the server, whereas the majority of RESTful applications has the server determine the data returned by its endpoints.
- Strong-typing and introspection: With GraphQL, it's really easy to make sure a query is syntactically correct. Better yet, you can query the GraphQL type system itself, meaning that GraphQL is self-documenting: no need to write pages and pages of documentation for your API endpoints. 

## Exploring GraphQL
