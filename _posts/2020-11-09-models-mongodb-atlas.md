---
layout: post
title: Week 10M - Models and MongoDB Atlas
categories: cpnt262
---

## Housekeeping
- 260 Final Project marks are published
- 262 Assignment updates
  - [Assignment 4](https://github.com/sait-wbdv/assessments/tree/master/cpnt262/assignment-4) officially announced
  - New [CPNT 262 Assignment Schedule](https://github.com/sait-wbdv/assessments/tree/master/cpnt262)
    - Assignment 4: Due Friday, Nov 13 
    - Assignment 5: Due Monday, Nov 16
      - addignment details will be announced tomorrow
    - Final Project: Due Friday, Nov 20
      - groups and assignment details will be  announced tomorrow 

## Homework
1. Review
    - [Create, read, update and delete](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) on Wikipedia
    - [What Is a REST API?](https://www.sitepoint.com/developers-rest-api/) on SitePoint
    - [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) definition on MDN
    - [Model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
2. dotevn and Environment Variables
    - [Using dotenv package to create environment variables](https://medium.com/@thejasonfile/using-dotenv-package-to-create-environment-variables-33da4ac4ea8f)
3. Introduction to CRUD and Mongoose
    - Read: [NoSQL vs SQL Databases](https://www.mongodb.com/nosql-explained/nosql-vs-sql)
    - [Mongoose Getting Started](https://mongoosejs.com/docs/)
    - Read: [Mongoose CRUD](https://coursework.vschool.io/mongoose-crud/) (Create, Read, Update, Delete)
4. MongoDB Atlas
    - [How to host a RESTful Node.js server with MongoDB Atlas database on Heroku](https://dev.to/cpclark360/how-to-host-a-restful-node-js-server-with-mongodb-atlas-database-on-heroku-1opl)

---

## Terminology
<dl>
  <dt>Document</dt>
  <dd>MongoDB stores data in the form of JSON Documents (technicaly BSON documents). Each document is analagous to a row in relational databases.</dd>
  <dt>Collection</dt>
  <dd>A collection of documents. Collections are analogous to tables in relational databases.</dd>
  <dt>Database</dt>
  <dd>Holds one or more collections.</dd>
</dl>

---

## 1. Create and setup a MongoDB Atlas Account

See: [Creating and configuring a MongoDB Atlas account](https://github.com/sait-wbdv/sample-code/tree/master/backend/mongoose/mongodb-atlas)

---

## 2. Connect to your new Atlas cluster

**Code Walkthrough**: [hello-mongoose](https://github.com/sait-wbdv/sample-code/tree/master/backend/mongoose/hello-mongoose)

---

## 3. Hello Kitty Live Code Session

**Tutorial Walkthrough**: [Mongoose Getting Started](https://github.com/sait-wbdv/sample-code/tree/master/backend/mongoose/kitten-schema)

---

## Clean-up Time!