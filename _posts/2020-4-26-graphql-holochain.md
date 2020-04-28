---
layout: post
title: How to build a GraphQl - Holochain middleware
tags: [graphql, frontend]
author: Tatsuya Sato, Guillem Córdoba 
---
Welcome to the blog post on How to build a GraphQl - Holochain middleware! In a sense, the primitives and building blocks that holochain offers to us inherently makes data stored in a DHT behave like a graph. In this graph we have nodes (entries) that can be related to one another through links (either [implicit or explicit](/implicit-explicit-links)).

[Graphql](https://graphql.org/) allows us to retrieve these entries from DHT(and source chain) in a much more natural way. Graphql also allows us to retrieve only the necessary fields we need, and create queries that retrieve entries that are implicitly or expliciltly linked to an entry with few lines of code! Many of Happs (Holochain application) currently in development use Graphql (Particularly [Apollo Graphql](https://www.apollographql.com/)) as a middleware that acts as a pipeline from holochain to the frontend.

In this guide, we will be walking you through on how to build a simple graphql queries and mutation with corresponding CRUD functions on holochain side. Lastly, we will connect the two and test if the graphql queries and mutations we made work as intended! We will be using Apollo Graphql for this walkthrough!

We assume that the readers have a basic understanding of Graphql, Apollo Graphql, and Holochain. If not, you can always check the corresponding documentation to learn more about it and then dive into this post! Below are some of the useful documentation available for graphql and holochain! Make sure as well that you have [installed holochain](https://developer.holochain.org/docs/install/) locally before we get started!

* [Holochain](https://developer.holochain.org/docs/tutorials/coreconcepts/)
* [Graphql](https://graphql.org/learn/)
* [Apollo Graphql](https://www.apollographql.com/docs/)

## Required GraphQl concepts

When developing integration layers between Apollo Client and holochain there are two main components of interest:

* **GraphQl schemas** define the graph of entities available for us to query. They can be thought of like contracts or interfaces between our frontend components and our backend services. Example: 

``` gql
type Post {
    id: ID!
    content: String!
    author: Author!
}

type Author {
    id: ID!
    posts: [Post!]!
}
```

* **GraphQl resolvers** define how the data for each type in our schema (or relationship between them) should be fetched. Example: 

``` js
const resolvers = {
    Query: {
        async allPosts() {
            return callZome('test-instance', 'blog', 'get_all_posts')({});
        }
    },
    Author: {
        async posts(authorId) {
            return callZome('test-instance', 'blog', 'get_post_for_agent')({
                agent_address: authorId
            });
        }
    }
}
```

You can read more about schemas [here](https://graphql.org/learn/schema/) and about resolvers [here](https://www.apollographql.com/docs/graphql-tools/resolvers/).

## Approach

The approach we are going to take here to integrate Apollo Client and holochain **is the main one used by the holochain community and projects**. But, we should warn beforehand that it is **not how the apollo infrastructure is designed to work**. Luckily, all its components and building blocks are very flexible and interoperable, enough for us to benefit from them in the right approach.

Briefly, the approach that the apollo infrastructure (and most GraphQl libraries) take by default is to declare schemas both on the backend and on the frontend, but only write the resolvers in the backend. This makes it possible for the frontend to only do one network request per query, querying all the data available in the graph that the component is interested in. Also, it makes the JS bundle lighter.

The approach we are going to take is a different one: **we'll only write our graphql schemas and resolvers on the frontend side**. From the point of view of the components, the queries will look the same. But those queries will actually get resolved on the browser itself, and our resolvers will be calling holochain zome functions to fetch the appropriate data.

These are some downsides and some upsides with this approach:

### Cons
- Our JS bundle size is going to increase: see [this](https://bundlephobia.com/result?p=graphql@15.0.0) and [this](https://bundlephobia.com/result?p=graphql-tools@5.0.0).
- A little bit of a performance hit: the use of `makeExecutableSchema`, which is normally done on the server is a little bit expensive on app load.

### Pros:
- Increase in flexibility, modularity, and reusability: it's much easier to dynamically stitch things together in the frontend side.
- Our holochain app is going to include no graphql code, so it can be integrated with other frontend stacks.
- We don't care that much about doing less network requests, since our backend is going to be run in localhost! (Not on holo though).

This approach can be though of as somewhat as an experiment (as almost anything done on hololand). When holo comes, it may need some tweaking to do less network requests. But, in any case, in the long-term future you should be able to reuse most of your functionality, at least as far as your schemas and data types go.

## Let's code!

We are going to code a toy example, so that you are able to understand the basic dynamic and then adapt this for your use case. If possible, it's best to always have a cleary defined user stories to work from:

- A user should be able to create a post
- A user should be able to query all posts
- A user should be able to query posts for an specific agent

### Defining your schema

In general, **defining your schema first can be a very good starting point**: it gives a clear contract between the frontend and the backend layers, and the returning data can be easily mocked. This way, different teams can work parallely on the different parts of your app and still be compatible afterwards.

Here is our schema:

```gql
type Post {
    id: ID!
    content: String!
    author: Author!
}

type Author {
    id: ID!
    posts: [Post!]!
}

type Query {
    allPosts: [Post!]!
}

type Mutation {
    createPost(content: String!): ID!
}
```

As you can see, the example we have is very simple: we have **two basic types: `Post` and `Author`** (which represents agents). Here, the most important thing is that these two types are **related in a one-to-many relationship**: one post has one author, while one author has many posts. 

This relationship is very clearly expressed on the schema and **matches exactly what we are going to have in the DHT in form of links**. Given one post, we can navigate to its author, and given an author, we can navigate to all their posts. 

It's important to note that the relationships expressed as requirements in the schema **will affect our holochain data structure**, and how many links we declare in it. In this example, the schema forces the holochain layer to add a link from the author's `agent_id` to every one of their posts: otherwise there would be no way of navigating the graph from one author to all their posts. This also applies to all queries available on the `Query` type. 

### Write the corresponding zome calls on Holochain

Now that we have written the schema and resolver on graphql, let's write the corresponding zome calls we need in order for the the queries and mutation on graphql to work! In the root directory of the project, let's first init a holochain project! Enter the holochain development environment with the command below.

``` nix
nix-shell https://holochain.love
```

Next, initialize your holochain app on the root directory and enter the app directory:

``` nix
hc init dna
cd dna
```

Now that we have the holochain project, add a zome that we will be working on!

``` nix
hc generate zomes/gql rust-proc
```

Now, get inside the zomes/gql/src/code directory and open it in your preferred source-code editor and open the lib.rs file.

we're not gonna change much of the already generated code in order to focus on this blog's topic. The generated code already has a create and read zome call, so let's add the update and delete zome call.

``` rust
    #[zome_fn("hc_public")]
    fn get_my_entry(address: Address) -> ZomeApiResult<Option<Entry>> {
        hdk::get_entry(&address)
    }

*   #[zome_fn("hc_public")]
*   fn udpate_my_entry(
*       entry_address: Address,
*       content: String,
*   ) -> ZomeApiResult<Address> {
*       let mut my_entry: MyEntry = hdk::utils::get_as_type(address.clone())?;
*       my_entry.content = content;
*       hdk::update_entry(my_entry.entry(), &address)
*   }

+

*   #[zome_fn("hc_public")]
*   fn delete_my_entry(entry_address: Address) -> ZomeApiResult<Address> {
*       hdk::remove_entry(&content_address)
*   }

```

Now that we have added the corresponding zome calls to our zome, let's compile the dna!

``` nix
hc package
```

Now that we built the holochain side, let's now connect it to the Graphql!

### Writing your resolvers

### Making queries
