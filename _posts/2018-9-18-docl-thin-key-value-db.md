---
layout: post
title: Docl, a thin key-value database 
---

I have been using Sqlite locally in my side-projects as it is very thin, light and very easy to create and delete. But recently, I have been working with DynamoDB where I am trying to apply and understand the benefits of using a non relational database (or a well designed and scalable key-value database on AWS?) Therefore, I decided to create something similar that adds more flexibility to my side projects when I deploy them in the cloud.

#### Library
Docl uses Sqlite3 but provides an interface that allows you to create/delete tables, and persist/fetch information in a key-value structure. It is very useful as you can use this interface in your side projects and implement the interface to the respective datasource you would like to use in the future, for instance: DynamoDB or MongoDB. Apart from that, you still have the advantages of Sqlite3 which is pretty much a one file database.

#### Implementation
Docl provides an Interface which must be implemented with your preferred datasource. In this version, the library provides an interface implementation of sqlite3. Additionally, the library includes a DoclObject which you should extend in your Pojos classes. Technically, the DoclObject contains a table name which tells the DoclImpl (sqlite3) in which table it should persist the current object. The reads and writes to the database are translate by DoclImpl which will execute SQL commands. In terms of writting into the database, the DoclImpl converts the DoclObject into a string (JSON format), uses the primary key as key and the json string as value in the key-value structure.

#### Examples
```java
public class DoclMain {
    public void main(){
        Car ford = new Car("Ford Fiesta", "Ford", 1998);
        String url = "file::memory:";
        DoclImpl docl = new DoclImpl(url, new Properties());
        docl.toPersist(ford);
    }
}
 ```
 
#### Repository
- Github: [https://github.com/alizard0/docl](https://github.com/alizard0/docl)
- Status: In development
- Version: 0.1
