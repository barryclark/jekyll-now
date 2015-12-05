---
layout: post
title: Polymorphic associations to test your Rails models
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
