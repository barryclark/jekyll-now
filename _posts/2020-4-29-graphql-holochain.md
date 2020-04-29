---
layout: post
title: How to build a GraphQl - Holochain middleware
tags: [graphql, frontend]
author: Tatsuya Sato and Guillem Córdoba 
---
Welcome to the blog post on How to build a GraphQl - Holochain middleware! In a sense, the primitives and building blocks that holochain offers to us inherently makes data stored in a DHT behave like a graph. In this graph we have nodes (entries) that can be related to one another through links (either [implicit or explicit](/blog/implicit-explicit-links)).

[Graphql](https://graphql.org/) allows us to retrieve these entries from the DHT in a much more natural way. Graphql also allows us to retrieve only the necessary fields we need, and create queries that retrieve entries that are implicitly or expliciltly linked to an entry with few lines of code! Many of Happs (Holochain application) currently in development use Graphql (particularly the [Apollo Graphql](https://www.apollographql.com/) infrastructure) as a middleware that acts as a pipeline from holochain to the frontend.

In this guide, we will be walking you through on how to build simple graphql queries and mutations with corresponding zome functions on tge holochain side. Lastly, we will connect the two and test if the graphql queries and mutations we made work as intended! We will be using `ApolloClient` for this walkthrough!

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

* Our JS bundle size is going to increase: see [this](https://bundlephobia.com/result?p=graphql@15.0.0) and [this](https://bundlephobia.com/result?p=graphql-tools@5.0.0).
* A little bit of a performance hit: the use of `makeExecutableSchema` , which is normally done on the server is a little bit expensive on app load.

### Pros:

* Increase in flexibility, modularity, and reusability: it's much easier to dynamically stitch things together in the frontend side.
* Our holochain app is going to include no graphql code, so it can be integrated with other frontend stacks.
* We don't care that much about doing less network requests, since our backend is going to be run in localhost! (Not on holo though).

This approach can be though of as somewhat as an experiment (as almost anything done on hololand). When holo comes, it may need some tweaking to do less network requests. But, in any case, in the long-term future you should be able to reuse most of your functionality, at least as far as your schemas and data types go.

## Let's code!

We are going to code a toy example, so that you are able to understand the basic dynamic and then adapt this for your use case. If possible, it's best to always have a cleary defined user stories to work from:

* A user should be able to create a post
* A user should be able to query all posts
* A user should be able to query posts for an specific agent

Before beginning, we should install all the apollo necessary dependencies that make all this work:

`npm install apollo-boost graphql graphql-tool` 

### Defining your schema

In general, **defining your schema first can be a very good starting point**: it gives a clear contract between the frontend and the backend layers, and the returning data can be easily mocked. This way, different teams can work parallely on the different parts of your app and still be compatible afterwards.

Here is our schema:

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
type Query {
    allPosts: [Post!]!
    post(id: ID!): Post!
}
type Mutation {
    createPost(content: String!): ID!
}
```

As you can see, the example we have is very simple: we have **two basic types: `Post` and `Author` ** (which represents agents). Here, the most important thing is that these two types are **related in a one-to-many relationship**: one post has one author, while one author has many posts. 

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
To check the code in its entirety, you can click [here](https://github.com/guillemcordoba/holochain-graphql-demo/blob/master/dna/zomes/blog/code/src/lib.rs) and follow this article together with the already written code!
```nix
hc generate zomes/blog rust-proc
```

Let's update the generated code and add a `Post` entry and its corresponding zome calls!
First, let's add some necessary modules into our zome.
```rust
  use hdk_proc_macros::zome;
+ use hdk::api::AGENT_ADDRESS;
+ use holochain_anchors::anchor;
```
As you probably already know, `AGENT_ADDRESS` is the address of the agent running the conductor and we will use this to link all posts authored by the agent as well as in the author_address field in `Post` struct. We will also use the `holochain_anchors` module to link all posts to an anchor we will create. For more information about how to use the `holochain_anchor` pattern, click [here](https://github.com/holochain/holochain-anchors).

Oh, and let's not forget to add the github repository of `holochain_anchors` in our `cargo.toml` file!
Open the `cargo.toml` file located in the zomes/blog/code folder and add the holochain_anchor module like this under the `[dependencies]`.
```toml
[dependencies]
+ holochain_anchors = {git="https://github.com/holochain/holochain_anchors",branch = "master" }
```
Now, let's change the name of the struct from `MyEntry` to `Post`. Let's also add the `author_address` field and `timestamp` to avoid hash collisions!
```rust
- pub struct MyEntry {
-     content: String,
- }
+ pub struct Post {
+     content: String,
+     author_address: Address,
+     timestamp: u64,
+ }
```
Next, we will implement some functionality to this `Post` struct to make our life easier!
We will add a `new()` and `entry()` function. `new()` will return us a new `Post` struct and the
`entry()` function will return as the `Entry` type which we can commit to the source chain and DHT.
```rust
+ impl Post {
+     pub fn new(content: String, author_address: Address, timestamp: u64) -> Self {
+         Post {
+             content,
+             author_address,
+             timestamp,
+         }
+     }
+     pub fn entry(self) -> Entry {
+         Entry::App("post".into(), self.into())
+     }
+ }
```
Let's also change the name of the zome module.
```rust
- mod my_zome 
+ mod courses
```
Next up, let's delete the auto-generated entry definitions and add our own post entry definition and anchor definition to our zome! For anchor definition, we are just following the guide in the holochain-anchor repository so be sure to check them out! Our `Post` entry will have 2 links. One link is `agent->posts` so that we can get all the posts created by a certain agent. Another link is `anchor->posts` and this will allow us to get all the posts created and linked to the anchor we defined!
```rust
-    #[entry_def]
-    fn my_entry_def() -> ValidatingEntryType {
-        entry!(
-            name: "my_entry",
-            description: "this is a same entry defintion",
-            sharing: Sharing::Public,
-            validation_package: || {
-                hdk::ValidationPackageDefinition::Entry
-            },
-            validation: | _validation_data: hdk::EntryValidationData<MyEntry>| {
-                Ok(())
-            }
-        )
-    }
+    #[entry_def]
+    fn post_entry_definition() -> ValidatingEntryType {
+        entry!(
+            name: "post",
+            description: "this is the post entry defintion",
+            sharing: Sharing::Public,
+            validation_package: || {
+                hdk::ValidationPackageDefinition::Entry
+            },
+            validation: | _validation_data: hdk::EntryValidationData<Post>| {
+                Ok(())
+            },
+            links: [
+                from!(
+                    holochain_anchors::ANCHOR_TYPE,
+                    link_type: "anchor->posts",
+                    validation_package: || {
+                        hdk::ValidationPackageDefinition::Entry
+                    },
+                    validation: | _validation_data: hdk::LinkValidationData | {
+                        Ok(())
+                    }
+                ),
+                from!(
+                    "%agent_id",
+                    link_type: "author->posts",
+                    validation_package: || {
+                        hdk::ValidationPackageDefinition::Entry
+                    },
+                    validation: | _validation_data: hdk::LinkValidationData | {
+                        Ok(())
+                    }
+                )
+            ]
+        )
+    }
+    #[entry_def]
+    fn anchor_definition() -> ValidatingEntryType {
+        holochain_anchors::anchor_definition()
+    }
```
As you can see, we are linking the post from the anchor(the link definition of anchor is patterned from [here](https://github.com/holochain/holochain-anchors)) and from the agent address.

Next, let's remove the auto generated zome calls and add our own necessary zome calls!
```rust
-    #[zome_fn("hc_public")]
-    fn create_my_entry(entry: MyEntry) -> ZomeApiResult<Address> {
-        let entry = Entry::App("my_entry".into(), entry.into());
-        let address = hdk::commit_entry(&entry)?;
-        Ok(address)
-    }
-
-    #[zome_fn("hc_public")]
-    fn get_my_entry(address: Address) -> ZomeApiResult<Option<Entry>> {
-        hdk::get_entry(&address)
-    }
```
After removing the auto generated zome calls, let's first add a `create_post` zome call.
```rust
+    #[zome_fn("hc_public")]
+    fn create_post(content: String, timestamp: u64) -> ZomeApiResult<Address> {
+        let new_post_entry = Post::new(content, AGENT_ADDRESS.to_string().into(), timestamp).entry();
+        let new_post_address = hdk::commit_entry(&new_post_entry)?;
+        let anchor_address = anchor("post_anchor".into(), "posts".into())?;
+        hdk::link_entries(&anchor_address, &new_post_address, "anchor->posts", "")?;
+        hdk::link_entries(&AGENT_ADDRESS, &new_post_address, "author->posts", "")?;
+        Ok(new_post_address)
+    }
```
First, we are creating a new post entry by using the two functions we implmented for the `Post` struct.
After we commit the newly created `Post` entry, we are linking the newly committed post to the anchor and to the agent address of the agent who created this new post.

Now that we have created a zome call for creating post, let's next create the necessary get calls for our post! We are creating 3 zome calls here. One for getting individual post entry, which takes the address of the post as its argument, another for getting all the posts linked to the anchor, and last a zome call for getting all the posts linked to the agent, which ofcourse will take the address of the agent as its argument!
```rust
+    #[zome_fn("hc_public")]
+    fn get_post(post_address: Address) -> ZomeApiResult<Post> {
+        hdk::utils::get_as_type(post_address)
+    }
+
+    #[zome_fn("hc_public")]
+    fn get_all_posts() -> ZomeApiResult<Vec<Address>> {
+        let addresses = hdk::get_links(
+            &anchor("post_anchor".into(), "posts".into())?, 
+            LinkMatch::Exactly("anchor->posts"),
+            LinkMatch::Any
+        )?.addresses();
+        Ok(addresses)
+    }
+
+    #[zome_fn("hc_public")]
+    fn get_author_posts(agent_id: Address) -> ZomeApiResult<Vec<Address>> {
+        let addresses = hdk::get_links(
+            &agent_id, 
+            LinkMatch::Exactly("author->posts"),
+            LinkMatch::Any
+        )?.addresses();
+        Ok(addresses)
+    }
```
As you can see, we are calling `get_links()` on both `get_all_posts` and `get_author_posts` with the base address being the anchor we created in `create_post` zome call and the agent address supplied in the argument of `get_author_posts` respectively.

Lastly, let's add a zome call for getting the agent address of the agent so that our graphql side can use it whenever needed!
```rust
+    #[zome_fn("hc_public")]
+    fn get_agent_id() -> ZomeApiResult<Address> {
+        Ok(hdk::AGENT_ADDRESS.clone())
+    }
```

Now that we have added the corresponding zome calls to our zome, let's compile the dna!

``` nix
hc package
```

If you see the hash of the dna in your terminal, that means we have successfully compiled the dna!
Now that we built the holochain side, let's now write the corresponding resolvers in Graphql!

### Writing your resolvers

As we briefly said, resolvers are little functions that define how a type is resolved in graphql. They are very flexible and can call anything really, even return mocked data. In general, they have these properties:

1. You can define a **resolver for any field of any type** in your schema. 
2. The return data of each resolver **should match the shape of result type** defined in your schema.
3. If there is no resolver defined for a field of a type, **graphql will try to get the field with the same name** from the JS object representing said type.
4. The parameters received by any resolver are: `(parentObject, arguments, context, info)` . The `parentObject` represents the object of the type in which your field is defined.

In our case, in general every resolver we write is going to **make a call to the holochain zome**. Then, it's going to **parse the data in the way that the apollo client expects it** to be, and return it. 

But, "how many resolvers should I write? And in which fields?", you may be asking. The answer is "depends", but as a general rule of thumb you don't have to write resolvers for those fields that match exactly the name of the same property your entry in holochain has. You essentially do have to write resolvers for everything else.

Let's write three resolvers as an example: 

* `allPosts` inside the `Query` type:

``` js

/**
 * Gets the post with the given id and returns it in an apollo client friendly shape 
 */
async function getPost(callZome, postId) {
  const post = await callZome(INSTANCE_NAME, ZOME_NAME, 'get_post')({
    post_address: postId
  });
  // Really important: prepare the object shape that ApolloClient expects
  return {
    id: postId,
    ...post
  };
}

const allPostsResolver = {
    Query: {
        async allPosts(parent, args, context) {
            // Get the callZome function from the context
            const callZome = context.callZome;
            // Get all posts addresses
            const postAddresses = await callZome(
                INSTANCE_NAME,
                ZOME_NAME,
                'get_all_posts'
            )({});

            // Parallely iterate through the list of addresses to call `get_post` for each address
            const promises = postAddresses.map(async address => getPost(callZome, address));
            return Promise.all(promises);
        }
    }
}
```

Pretty straightforward, right? The strategy that we used is not necessarily the best one: we could think about adding pagination, filtering, or other stuff. 

The `post` field resolver inside the `Query` type is very similar to this one. In that case, we should get the requested post id from the `args` object and do a single `get_post` call to the holochain zome.

* `posts` inside the `Author` type:

This resolver is specifying how to get all the posts for an author.

``` js
const authorPosts = {
    Author: {
        id(parent) {
            return parent;
        },
        async posts(parent, args, {
            callZome
        }) {
            // Get the list of post addresses 
            const postAddresses = await callZome(
                INSTANCE_NAME,
                ZOME_NAME,
                'get_author_posts'
            )({
                agent_id: parent
            });

            // Parallely iterate through the list of addresses to call `get_post` for each address
            const promises = postAddresses.map(async address => getPost(callZome, address));
            return Promise.all(promises);
        }
    }
};
```

Note the `id` field resolver: when we are querying the author type, we are going to have the `agent_id` hash, nothing else. So, by returning the parent inside the id resolver, we are telling our `ApolloClient` that an author type can be derived from a single string to an object with fields `id` (which is equal to the parent object) and `posts` which has its own complex resolver.

* `author` inside the `Post` type: 

This resolver is the simplest of all. Our backend posts already have an `author_address` field, but we need to tell apollo that our `author` field has to be resolved from that `author_address` . We don't have to return all the `Author` type here, since the `Author` type resolvers will take care of getting the `agent_id` of the author and querying the right data with it.

``` js
const postsResolvers = {
    Post: {
        author(parent) {
            return parent.author_address;
        }
    }
}
```

These have been three basic examples of different patterns you'll most certainly need to use. From this, we recommend practicing with resolvers and how to write them to learn how to integrate your unique use case.

You can see the full list of resolvers for the current example [here](https://github.com/guillemcordoba/holochain-graphql-demo/blob/master/ui/src/graphql/resolvers.js).

### Putting it all together

Our last step to complete the setup is to pull everything together and initialize the `ApolloClient` instance.

1. Create the connection to the holochain backend:

``` js
import { connect } from '@holochain/hc-web-client';

let connection = undefined;
const HOST_URL = 'ws://localhost:8888';

export async function getConnection() {
    // return connection if already established
    if (connection) return connection;

    // establish a new websocket connection and expose callZome
    const {
        callZome
    } = await connect({
        url: HOST_URL
    });

    // define connection and execute callZome function
    connection = (instance, zome, fnName) => async params => {
        console.log(
            `Calling zome function: ${instance}/${zome}/${fnName} ` ,
            params
        );

        // https://developer.holochain.org/docs/guide/conductor_json_rpc_api/
        const result = await callZome(instance, zome, fnName)(params);

        console.log(
            `Zome function ${instance}/${zome}/${fnName} returned` ,
            result
        );

        const parsed = JSON.parse(result);

        if (result.Err) throw new Error(JSON.stringify(result.Err));
        if (result.SerializationError) {
            throw new Error(JSON.stringify(result.SerializationError));
        }

        return parsed.Ok !== undefined ? parsed.Ok : parsed
    };

    return connection;
}
```

As you can see, we are parsing the response just before returning the result, and we are **throwing a JS error from the possible holochain errors** that can be returned. This will give us seamless integration with what `ApolloClient` expects.

2. Create the final `ApolloLink` from our resolvers and schema:

``` js
import { makeExecutableSchema } from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';

export async function createSchemaLink() {
    // Get the callZome connection
    const connection = await getConnection();

    // Create an executable schema from the schema and resolvers
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    // Return a final link with our executable schema and the callZome inside the context
    return new SchemaLink({
        schema,
        context: {
            callZome: connection
        }
    });
}
```

3. Initialize the `ApolloClient` instance:

``` js
import { ApolloClient, InMemoryCache } from 'apollo-boost';

let client = undefined;

export async function getClient() {
    if (client) return client;

    // Create our schema link
    const link = await createSchemaLink();

    // Initialize the apollo client
    client = new ApolloClient({
        cache: new InMemoryCache(),
        connectToDevTools: true,
        link
    });
    return client;
}
```

This function can now be called from any different places in your app, and the `client` instance can be stored anywhere too.

### Making queries

All right! Finally, we get to use all this infrastructure to develop components much faster. This is a simple example of how to query data from the `ApolloClient` instance:

``` js
import { gql } from 'apollo-boost';

const client = await getClient();

const result = await client.query({
    query: gql `
    {
        allPosts {
            id
            content
            timestamp
            author {
                id
            }
        }
    }`
})

console.log(result.data);
```

As you can see, in our UI components we have a lot of flexibility to fetch any data available in our entity graph. If suddenly your requirements change and there is new data to be fetched from this component, it just has to expand the query.

Now, how do we create a new post? **State changes are called `Mutations`** in the apollo world. They are very similar to the queries, but most likely will include variable arguments:

``` js
import { gql } from 'apollo-boost';

const client = await getClient();

const content = 'New post content';

const result = await client.mutate({
    mutate: gql `
    {
        createPost(content: $content) {
            id
            content
            timestamp
        }
    }`,
    variables: {
        content
    }
})

console.log(result.data);
```

It is a good practice to group the most commonly used queries into their own file, to prevent massive duplication of otherwise exact queries:

- In `queries.js`:

```js
export const GET_ALL_POSTS = gql` 
  query GetAllPosts {
    allPosts {
      id
      content
      timestamp
      author {
        id
      }
    }
  }
`
```

- In the querying component: 

```js
import { GET_ALL_POSTS } from './import';

const result = await client.query({
    query: GET_ALL_POSTS
});
```

To learn more about making queryies and mutations to `ApolloClient` , read [this](https://www.apollographql.com/docs/react/data/queries/).

## Conclusion

This is all! You can find the **code for this guide [here](https://github.com/guillemcordoba/holochain-graphql-demo)**. For a production ready application using this patterns, see the UI side of [Learning Pathways](https://github.com/holochain-devcamp/learning-pathways/tree/master/ui), developed during the holochain devcamp #6.

In a future post, we are going to explore how to deal with **entity updates in our graphql middleware**. Stay tuned!

You can use any JS framework you want on top of `ApolloClient`, which has different integrations with them. In further guides we are going to be looking at how to integrate this with `LitElement`, a powerful but lightweight native web-components library that fits very well with holochain because of the reusability of their components.

If you find some gap/bug in this guide, or want to expand some more ground on similar issues, please contact us in the forum or in the github repo.