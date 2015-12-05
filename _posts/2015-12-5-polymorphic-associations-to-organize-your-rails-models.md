---
layout: post
title: Use polymorphic associations to organize your Rails models
---

Organizing the models is an essential part of application design, and will certainly have a serious impact on the way the application will evolve. A good model structure is the premise for a clean and readable application.

This one of the reasons why we will want to take a closer look to the Rails ActiveRecord Polymorphic Associations.

In order to try the polymorphic associations we will use a very basic shopping cart application, created for testing reasons.

At this point the application has a Product model which stores all the products in the shop, with the following details:

```
+-----------------+
|  PRODUCT        |
+-----------------+
|  Category       |
|  Name           |
|  Price          |
|  Stock          |
+-----------------+
```
Let's assume our shop will sell computers and printers, and our goal is to add more details about both categories of products:
- computer:
  - cpu
  - memory
- printer:
  - type
  - pages_per_minute

The first thing we could do is to include all those details in the products table, and we will get something like this:

 Category | Name    | Price | Stock | Cpu | Memory | Type  | Ppm
 ---------|---------|-------|-------|-----|--------|-------|----
 computer | comPTR  | 1400  | 20    | i5  | 8GB    | nil   | nil
 printer  | iPrint  | 130   | 50    | nil | nil    | laser | 15  
