---
layout: post
title: Use Polymorphic Associations to organize the Rails models
---
# Part 2: Views and Controllers

We will continue our Polymorphic Associations example by adapting the views and controllers to the new models.

> This example is using Slim for views templates

## Products Index

One of the first things we will observe is that the old `render @products` will not work, and is normal. Both the computers and printers have now different set of fields, so the `_product` partial requires some modifications to render the product correctly. The details available in the product table (*such as price and quantity*) will be displayed in this partial, and the specific computer or printer details will be rendered through their own partials.

<div class="file_path">./app/views/products/_product.html.slim</div>_
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
.h3 = computer.name
p
  | CPU : #{computer.cpu}
p
  | Memory : #{computer.memory}
```

Before we proceed to editing or creating products, it would be a good idea to refactor the index action of the products controller.

### Refactoring the Products Controller Index Action

The main idea would be to move away the logic that does not belong to the controller in a separate class. For example, our index action doesn't need to know how we find the products by categories, or, even more obvious, how we determine the status of an order.

Inside our **app** folder we will create a new one called **services** (*there are many ongoing discussions about the proper naming of such folder*). Inside we will create a new file **shopping_cart.rb** where we will host some logic related to the products and orders.

<div class="file_path">.app/services/shopping_cart.rb</div>
```ruby
class ShoppingCart
  attr_reader :user, :params

  def initialize(user:, params:)
    @user = user
    @params = params
  end

  def product_categories
    @categories ||= Product.pluck(:category_type).uniq.sort
  end

  def products_by_category
    if params[:category] && product_categories.include?(params[:category])
      product_find(params[:category])
    else
      product_find(product_categories.first)
    end
  end

  # find or create the user order
  def current_order
    @order ||= user.orders.where(status: "active").first_or_create
  end

  private

  def product_find(category)
    Product.where(category_type: category).includes(:category)
  end
end
```

## Create and Edit Products



  [c054b877]: https://github.com/iacobson/test-shop/tree/polymorphic-associations-final "polymorphic-associations-final"
