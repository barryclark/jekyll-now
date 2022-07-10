---
layout: post
title: Stargate - Towards DynamoDB Compatibility for Cassandra (Part 2)
---

In my previous blog post, I introduced the Dynamo API Service, which is our project to make Apache Cassandra compatible with Amazon DynamoDB by building a middleware. In this blog post, I will share a few interesting challenges we encountered and how we tackled them.

## How to authenticate?

This is the first problem we encountered. InDynamoDB (and many other AWS products), there are multiple ways to authenticate, among which a common way is to set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environmental variables.

Usually, you don’t need to worry about authentication after you have your Dynamo DB credentials set up. Stargate, on the other hand, requires you to provide a [token](https://stargate.io/docs/stargate/1.0/developers-guide/authnz.html) in every request you make. We could let users follow the authentication guide and fetch their token either manually or programmatically, but the problem was how to make the DynamoDB client aware of this token and carry the token every time it makes an HTTP request. Of course, we could rewrite the DynamoDB client by ourselves, but we would like to avoid that if possible so that users don’t need to change their client library.

Luckily, we found a trick to tackle this problem. We found out that the DynamoDB client always puts an authorization header that contains an unencrypted `AWS_ACCESS_KEY_ID` in every HTTP request it makes. This makes sense because a DynamoDB client has to use the HTTP protocol to authenticate itself with the DynamoDB server. Now, in the Dynamo API Service for Stargate, we can easily read the token from this `AWS_ACCESS_KEY_ID` field. Problem solved. All the user needs to do is to put the Stargate token into their `AWS_ACCESS_KEY_ID` environment variable, and then they don’t need to worry about authentication while making requests!

## The discrepancy in data types

Cassandra and DynamoDB have similar data models but they are not exactly the same. There is one-to-one mapping for basic types but not for the map, list, and set data types in DynamoDB. In DynamoDB, maps, lists, and sets can be deeply nested, meaning that you can have a list of maps of sets or even more complicated data structures. For example, you could insert an item whose `goods` attribute contains:

```
[
 {
   "name": "apple",
   "price": 4,
   "images": [
     "apple1.jpg",
     "apple2.jpg"
   ]
 },
 {
   "name": "orange",
   "price": 1.45,
   "images": "orange.jpg"
 }
]
```

As we can see, the above data structure is a list of maps. Furthermore, the first map in the list contains `images` as a list, while the second map in the list contains `images` as a string. This heterogeneity might not be common in the real world but it is undoubtedly allowed as DynamoDB is schemaless. Cassandra, despite its support for nested collections, enforces a schema. For example, if you create a column `goods` with:

`goods list<frozen<map<text,text>>`

Then everything in the inner map must be of `text` datatype. The Cassandra native support fails this use case.

We don’t really know how nested collections are stored in DynamoDB (recall it’s not open-sourced!). But one (good) thing we know is that you can only create indices for top-level attributes with basic data types. In the previous example, you cannot index the `name` field because it’s a nested attribute under `goods` which is a top-level attribute. What does this mean for us? This means we can treat the whole nested collection as a BLOB (binary format) without sacrificing the ability to index.

In all, what we do is quite simple: whenever the user writes a collection data entry, we serialize it into a sequence of bytes and store it in Cassandra. Whenever the user needs to read it, we deserialize the collection from the sequence of bytes stored in Cassandra. And it works just fine! Right now we are using the [Kryo](https://github.com/EsotericSoftware/kryo) library for serialization and deserialization, but we might write our own methods for better performance in the future.

## Parser is all you need

If you are building a database, then you almost certainly need to write parsers to parse the queries. DynamoDB, at the first glance, seemed to be an exception because it uses JSON as a request payload — there are so many JSON libraries that can help us with the parsing (deserialization). This seems to suggest we don’t need to worry about writing parsers. Unfortunately, this is not actually the case. DynamoDB queries have fields like [`FilterExpression`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html#DDB-Query-request-FilterExpression) that allow users to define certain conditions in plain text format. For example, in a query, you can have a filter expression like the following:

`(Debt = :debt OR Deposit <> :deposit) AND Sex = :s`

In this example, the results are filtered out if they don’t satisfy the above expression. This `FilterExpression` supports different comparison operators and can be nested. You might think about using a regular expression to match the above text, but it is not feasible because [REGEX generally cannot handle nested expressions](https://stackoverflow.com/questions/133601/can-regular-expressions-be-used-to-match-nested-patterns). We actually tried writing regular expressions for simpler cases, but the code quickly turned obscure and we had to give up.

This is where [ANTLR](https://www.antlr.org/) comes into play. ANTLR is a popular and powerful parser generator. By simply defining grammars, ANTLR helps us generate Java code that can parse the expressions into abstract parse trees. We then write code that visits the abstract parse tree and evaluates the expression. With the help of ANTLR, we keep our code concise and easy to maintain. It might be a bit challenging at the beginning to write clean grammar if you are not familiar with compiler knowledge, but it pays off!

## Conclusion

This concludes our journey toward completion of our capstone project for our Spring semester in the [Master of Computational Data Science](https://mcds.cs.cmu.edu/) (MCDS) program at Carnegie Mellon University (CMU). I would like to thank DataStax for the help and guidance throughout this journey. We will continue working on the project in the Fall semester to complete the rest of the APIs and do a thorough performance benchmark. Our hope is to deliver a complete product in the end!

_Special thanks to all the members of the Stargate community who supported this effort including Prabhat Jha, Sebastian Estevez, Tatu Saloranta, and Jeff Carpenter._

