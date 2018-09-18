---
layout: post
title: Docl: Sqlite version of DynamoDB 
---

I have been using Sqlite locally in my side-projects as it is very thin, light and very easy to create and delete. But recently, I have been working with DynamoDB where I am trying to apply and understand the benefits of using a non relational database (or a well designed and scalable key-value database on AWS?) Therefore, I decided to create something similar that adds more flexibility to my side projects when I deploy them in the cloud.

#### Library
Docl uses Sqlite3 but provides an interface that allows you to create/delete tables, and persist/fetch information in a key-value structure. It is very useful as you can use this interface in your side projects and implement the interface to the respective datasource you would like to use in the future, for instance: DynamoDB or MongoDB. Apart from that, you still have the advantages of Sqlite3 which is pretty much a one file database.

#### Examples

