---
layout: post
title: Exploring GraphQL 
---
Taking a look at how GraphQL can improve upon the REST paradigm.

![GraphQL](https://raw.githubusercontent.com/rohan-varma/rohan-blog/gh-pages/images/graphql.png "GraphQL")

In this post, we'll take a look at [GraphQL]( https://facebook.github.io/graphql/), a querying langauge created by Facebook which was open-sourced in July 2015. We'll learn about the querying powers that come with it, the benefits of using it, and compare it to traditional methods of querying RESTful APIs. 

### What is GraphQL? 
GraphQL is a data querying langauge that's designed with the data needs of the client-side in mind. It presents an alternative paradigm to REST, and we'll look at the differences between GraphQL and the REST paradigm throughout this post. GraphQL, at its core, consists of a type system that describes what data is available on the server-side, as well as a query language for the client to ask for the data it needs. 

### Exploring GraphQL 
The best way to learn about GraphQL is to get our hands dirty with it. In this post, we'll implement a basic GraphQL Schema for Pokemon Go, consisting of two types: Pokemon and Moves. We'll simply store our data in JSON files to simulate our database (normally, the data being queried for would lie in a database, a layer in your backend, or in another service of your application). At the end, we should be able to query for some Pokemon and their moves. In addition, we'll have learned how to define GraphQL types, queries, and schemas, as well as its advantages over a traditional REST approach. 

### Why should you use GraphQL? A quick overview
- GraphQL is *client-centric*: With GraphQL, the client can ask the server for exactly the data it needs. It's driven by the requirements of the front-end, rather than the server defining the data returned.
- *Strong-typing and introspection*: With GraphQL, it's really easy to make sure a query is syntactically correct. Better yet, you can query the GraphQL type system itself, meaning that GraphQL is self-documenting: no need to write pages and pages of documentation for your API endpoints. We'll see this in action with the schema we are about to create. 

### Getting Started
Note: The full code for this tutorial is available as a [github repository](https://github.com/rohan-varma/pokemongo-graphQL). If you want to be able to create and execute queries to see them in action, I recommend you to take a moment and set it up. Alternatively, you could use [this link]( https://pokemongo-graphql-senopusxhk.now.sh/graphql) to view the code running live (hosted by [now.sh](http://now.sh), which by the way, is excellent for deploying your Node.js projects). 

First, let's create our types. Using GraphQL's type system, we can describe the types of objects that can be returned by our server. Our first type will be a `moveType`, and it will be responsible for resolving all of our queries for moves. We'll use the [JS implementation](https://github.com/graphql/graphql-js) of GraphQL to describe our types: 

<script src="https://gist.github.com/rohan-varma/fbe7eae88afff97f5a7dd266974431bb.js"></script>

Next, let's also create a basic `pokemonType` to represent some data about Pokemon: namely, their id, name, and thumbnail (which for now will just be a dummy string). 

<script src="https://gist.github.com/rohan-varma/74d0aa483d6cf24fa432070daae10de3.js"></script>

Now, we can define a `Query`, which is another GraphQL object type. Our Query type will be responsible for communicating to the client what data is available on the server, and what arguments can be passed in to retrieve certain data (in our case, the `id` of a move or a pokemon). Moreover, it will also be responsible for implementing a `resolve` function. This function will be responsible for fullfilling requests from our client. In our case, it'll be pretty simple: simply use the `id` argument passed in as a key to get the pokemon or move from our JSON files. 

<script src="https://gist.github.com/rohan-varma/1f897987fa4d965513cd8a2e5024b4e4.js"></script>

We've now got a `Query` that defines the two fields available on the server, and tells the client what arguments can be passed in to query for the data the client may need. Moreover, we've implemented `resolve` methods to fulfill these requests. To finish up our schema, all that's left is to actually define our Schema object and export it:

<script src="https://gist.github.com/rohan-varma/656eb511797902e59a6c8d022722ea61.js"></script>

That's it! A basic schema is now set up that describes the data available on the server, how to query for it, and how these queries are fulfilled. Let's take it a bit further, and explore some of the advantages of GraphQL. 

### Comparison to the RESTful Paradigm

The `pokemonType` on our server is defined to have an `id`, a `name`, and a `thumbnail`. If you were a developer who needed this data on your front-end, you could make this example `GET` request using the REST paradigm: 
`GET http://website.com/api/v1/pokemon/1`. 

Alternatively, if you had implemented a GraphQL Scehma for your server data, you could make a GraphQL request, in the form of a query, to your backend. A query is just a string sent to the server, and the returned JSON mirrors the shape of the query, making it easy to predict the shape of the data returned. Here's an example query to get some pokemon data:

```javascript
{
  pokemon(id: "1") {
      name
      thumbnail
      id
  }
} 
```
Both requests would give you back the name of the pokemon, its id, and its thumbnail. In our case, the thumbnail is just a string that actually represents the thumbnail URL, but what if the thumbnail was an image that had to be created on the server, which is a typically expensive, CPU-bound process? If we don't actually need the thumbnail on our front-end for a certain view, we certainly shouldn't take time to ask our server for it. In our RESTful paradigm, we'd have to define another API endpoint to send a request to, something like: `GET http://website.com/api/v1/pokemonlightweight/1`. You can see how in a large application with a lot of (potentially expensive to ask for) data available on the server, we could end up creating a bunch of different API endpoints, which we would need to maintain, version, and write documentation for. 

Fortunately, the GraphQL solution is much simpler: simply change your query:

```javascript
{
  pokemon(id: "1") {
      name
      id
  }
} 
```

There. Now we're not asking for the thumbnail, so our server doesn't have to spend time creating it. This is the beauty of GraphQL: the client can define exactly what data it needs, and receive exactly that from a single point of access to your data.

### "Graph" Query Language

Let's take a look at another advantage GraphQL offers: graph-based querying. As an example, let's define our `pokemonType` to also have a field called `bestFriend`, which is another pokemon. In other words, we want a connection to exist from one pokemon to another. In addition, let's add some information about our pokemon's favorite move to our server - a connection from a `pokemonType` to a `moveType`. To do this, we can modify our `pokemonType` object created earlier to have a `favoriteMove` and `bestFriend` field: 

<script src="https://gist.github.com/rohan-varma/48bbe9ca6ab23f9049263506595d0d87.js"></script>

Now that we've added connections from one pokemon to another and from a pokemon to a move, we can easily query for these data from our front end. Here's an example query that our schema supports:

```javascript
{
  pokemon(id:"1") {
    name
    favoriteMove {
      name
    }
    bestFriend {
      name
    }
  }
}
```

And a response to the above query:

```javascript
{
  "data": {
    "pokemon": {
      "name": "Pikachu",
      "favoriteMove": {
        "name": "Thunderbolt"
      },
      "bestFriend": {
        "name": "Charmander"
      }
    }
  }
}
```

So, we've asked our server for the name of a certain pokemon, the name of its favorite move, and the name of its best friend, and got back exactly that data. No need to create different API endpoints to get a particular set of data (just add or remove parameters to the query!), and no need to use a request's response to trigger another GET request. For reference, this is what a RESTful solution may have looked like: 

<script src="https://gist.github.com/rohan-varma/4b5ec89548cf1f849bc4669cd9f526ca.js"></script>

As you can see, such parsing can get pretty complicated very quickly if your connections are layered deep - imagine how ugly the above code would get if we asked for the favorite move of a friend of a friend of a friend of a certain pokemon, for example. Obviously, this is not the only solution using the RESTful paradigm - for example, an alternative solution could be to create different API endpoints on your backend that gets this particular set of data from the server. But with GraphQL, you only have **one endpoint to access your data**, and can easily query for connections defined on your server. 

Essentially, GraphQL enhances the **seperation of concerns** between the front-end and backend. Developers on the front-end no longer need to worry about parsing server responses to get the specific set of data they need, and developers on the back-end no longer need to worry about creating different API endpoints for their application that retrieve very similar data. 

### One last cool thing: Type Introspection

Using GraphQL's query syntax, we can ask our server what queries it supports. For example, to see what types are defined on our server, we can use the following query: 

```javascript 
{
  __schema {
    types {
      name
    }
  }
}
```

From this result, we can see one of the types is named `pokemon`. We can use another query to get additional documentation about the pokemon type: 

```javascript
{
  __type(name:"pokemon") {
    fields {
      name
    }
  }
}
```

A response would contain the fields this type has:

```javascript
{
  "data": {
    "__type": {
      "fields": [
        {
          "name": "id"
        },
        {
          "name": "name"
        },
        {
          "name": "thumbnail"
        },
        {
          "name": "favoriteMove"
        },
        {
          "name": "bestFriend"
        }
      ]
    }
  }
}
```

The introspection system also allows you to query for additional information such as description of fields and deprecation status. This allows your endpoint for accessing data to be self-documenting - you can ask your schema itself all about its queries, types, and fields. Additionally, tools such as `GraphiQL` and the Chrome extenstion `ChromeiQL` have features such as auto-completion and a documentation tab, providing an environment for you to test your schema.

And that's it! There's definitely a lot more to learn about GraphQL (such as posting new data via a [mutation](https://medium.com/@HurricaneJames/graphql-mutations-fb3ad5ae73c4#.5378parnj)), but hopefully this post has covered the basics. The [GraphQL specification](https://facebook.github.io/graphql/) is an excellent place to learn more, and so is the [reference JS implementation](https://github.com/graphql/graphql-js).  

### Sources: 
- [GraphQL docs](http://graphql.org/docs/getting-started/)
- [JS implementation of GraphQL](https://github.com/graphql/graphql-js)
- [GraphQL Spec](https://facebook.github.io/graphql/)
- [Learning GraphQL for Mobile, by John Shelley](https://speakerdeck.com/jpshelley/learning-graphql-for-mobile)
- [An Introduction to GraphQL, by Guido Schmitz](https://medium.freecodecamp.com/introduction-to-graphql-1d8011b80159#.guh55srwp)








