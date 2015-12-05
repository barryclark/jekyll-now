---
layout: post
title: Use Polymorphic Associations to organize your Rails models
---

Organizing the models is an essential part of application design, and will certainly have a serious impact on the way the application will evolve. A good model structure is the premise for a clean and readable application.

This one of the reasons why we will want to take a closer look to the Rails ActiveRecord Polymorphic Associations.

In order to try the Polymorphic Associations we will use a very basic shopping cart application, created for testing reasons. The initial state of the application can be found on this branch: https://github.com/iacobson/test-shop/tree/polymorphic-associations-initial

At this point the application has a Product model which stores all the products in the shop, with the following details:

```
+-----------------+
|  PRODUCT        |
+-----------------+
|  category       |
|  name           |
|  price          |
|  stock          |
+-----------------+
```
Let's assume our shop will sell computers and printers, and our goal is to add more details about both categories of products:
- computer:
  - cpu
  - memory
- printer:
  - type
  - pages_per_minute

The first thing we could do is to include all those details in the products table, and this can be just ok. But now imagine that in the future we will have one hundred product categories, each of them with a dozen of attributes. Our products table will end up with over one thousand columns, most of them unused for each individual row (<i>eg. we will not need pages_per_minute attribute for a computer</i>).

The next logical action would be then to give up the product table and build individual models for each category of products. But we will find out very soon that this is not an optimal solution. It will be quite difficult for example to display or sort all products, and common attributes, such as price or stock will need to be added for each model.

So, most probably some kind of combination between the above methods would be a potential solution.

### Enter Polymorphic Associations !
Using Polymorphic Associations one model can belong to more models. It is a way to share data between models, and in the same time a centralization of those models.

Before writing any code, let's think about the structure we want to build:

```
                +-----------------+
                |  PRODUCT        |
                +-----------------+
                |  category_id    |
                |  category_type  |
                |  name           |
                |  price          |
                |  stock          |
                +-----------------+
                         |
           +----------------------------+
           |                            |
  +-----------------+         +-----------------+
  |  COMPUTER       |         |  PRINTER        |
  +-----------------+         +-----------------+
  |  name           |         |  name           |
  |  cpu            |         |  type           |
  |  memory         |         |  ppm            |
  +-----------------+         +-----------------+
```
