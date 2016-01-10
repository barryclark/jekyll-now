---
layout: post
title: Use Polymorphic Associations to organize the Rails models
---
# Part 2: Views and Controllers

We will continue our Polymorphic Associations example by adapting the views and controllers to the new models.

> This example is using Slim for views templates

## Products Index

One of the first things we will observe is that the old `render @products` will not work, and is normal. Both the computers and printers have now different set of fields, so the `_product` partial requires some modifications to render the product correctly. The details available in the product table (*such as price and quantity*) will be displayed in this partial, and the specific computer or printer details will be rendered through their own partial.

<div class="file_path">./app/views/products/_product.html.slim</div>
```slim
//...
.panel-heading.small
  = product.stock
  |  available in stock  
.panel-body
  = render product.category
  p
    | price:  
    = product.price
//...
```

Now we will need to create a partial for each category type:

> As in the first part of this article, we will handle the Computer case, as the Printer si similar. You can see the full code on this Github branch: [polymorphic-associations-final][c054b877]

<div class="file_path">.app/views/computers/_computer.html.slim</div>
```slim
//...
.h3 = computer.name
p
  | CPU : #{computer.cpu}
p
  | Memory : #{computer.memory}
//...
```
Before we proceed to editing or creating products, it would be a good idea to refactor the index action of the products controller

### Refactoring the products controller index action





## Create and edit products



  [c054b877]: https://github.com/iacobson/test-shop/tree/polymorphic-associations-final "polymorphic-associations-final"
