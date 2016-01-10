---
layout: post
title: Use Polymorphic Associations to organize the Rails models
---
# Part 2: Views and Controllers

We will continue our Polymorphic Associations example by adapting the views and controllers to the new models.

> This example is using Slim for views templates

One of the first things we will observe is that the old `render @products` will not work, and is normal. Both the computers and printers have now different set of fields, so the index view requires some modifications:

```slim
.row
  = @products.each do |product|
    = render product.category
```



> As in the first part of this article, we will handle the Computer case, as the Printer si similar. You can see the full code on this Github branch: [polymorphic-associations-final][c054b877]





  [c054b877]: https://github.com/iacobson/test-shop/tree/polymorphic-associations-final "polymorphic-associations-final"
