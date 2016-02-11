---
layout: post
title: Use Polymorphic Associations to organize the Rails models
tags: rails
excerpt: "To be modified."
---
# Part 2: Views and Controllers

At the end of the [first part]({% post_url 2015-12-5-use-polymorphic-associations-to-organize-the-rails-models-part-1 %}) of this article we could already test the Polymorphic Associations in the Rails console. This means our job is practically done. It is however a good exercise to continue our example by adapting the Views and Controller to the new Polymorphic setup.

> This example is using Slim for views templates

## Products Index

One of the first things we will observe is that the old `render @products` will not work, and is normal. Both the computers and printers have now different set of fields, so the `_product` partial requires some modifications to render the product correctly. The details available in the product table (*such as price and quantity*) will be displayed in this partial, and the specific computer or printer details will be rendered through their own partials (eg. `render product.category`).

<div class="file_path">./app/views/products/_product.html.slim</div>
```haml
...
.panel-heading.small
  = product.stock
  |  available in stock  
.panel-body
  = render product.category
  p
    | price:  
    = product.price
...
```

Now we will need to create a partial for each category type:

> As in the first part of this article, we will handle the Computer case, as the Printer si similar. You can see the full code on this Github branch: [polymorphic-associations-final][c054b877]

<div class="file_path">.app/views/computers/_computer.html.slim</div>
```haml
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

> Rails server must be restarted at this point to include the newly created file.

And finally, our controller index action will be slim and pretty:

<div class="file_path">.app/controllers/products_controller.rb</div>
```ruby
#...
def index
  @shopping_cart = ShoppingCart.new(user: current_user, params: params)
end
#...
```

## Create and Edit Products  
Now it's time to make sure that we can actually add and edit products.

### The **Add New** Button  
We will want to be able to add specific products by categories. In order to do this is an automatic manner, we may need to utilize the old `link_to` way (must be some better and cleaner way to do it, but that's another discussion). And not to fill the view with too much logic, we can make use of our helpers:

<div class="file_path">.app/helpers/products_helper.rb</div>
```ruby
#...
def new_product_button(products)
  if current_user.admin
    link_to "ADD NEW #{product_category(products.first).upcase}",
            { controller: product_category(products.first).pluralize, action: "new" },
            class: "btn btn-primary"
  end
end

private

def product_category(product)
  product.category_type.downcase
end
#...
```
Then we can use the `new_product_button(products)` directly into the view.

### New routes  
Practically each new product category will require its own controller and routes.

<div class="file_path">.config/routes.rb</div>
```ruby
#...
resources :computers, only: [:new, :create, :edit, :update]
resources :printers, only: [:new, :create, :edit, :update]
#...
```

### Computers View  
The views will need to be adapted accordingly, moving the **form**, **new** and **edit** templates from the products, into the computer folder. We are going to use nested forms to pass also the params for the product:

<div class="file_path">.app/views/computers/_form.html.slim</div>
```haml
...
= simple_form_for @computer do |f|
  = f.error_notification
  = f.simple_fields_for :product do |prod|
    = prod.input :price, required: true, label: false, placeholder: "unit price", input_html: {class: "form-control", value: @product.price}
    = prod.input :stock, required: true, label: false, placeholder: "available units in stock", input_html: {class: "form-control", value: @product.stock}
  = f.input :name, required: true, label: false, placeholder: "name", input_html: {class: "form-control"}
  = f.input :cpu, required: true, label: false, placeholder: "cpu", input_html: {class: "form-control"}
  = f.input :memory, required: true, label: false, placeholder: "memory", input_html: {class: "form-control"}
  = f.button :submit, class: "btn btn-primary btn-block"
...
```

For the `edit` action, the product fields will use the `value:` to get the existing data.
The parameters passed on submit will have the following structure:

```bash
{"name"=>"Test Computer", "cpu"=>"Core i5", "memory"=>"16GB", "product"=>{"price"=>"1300", "stock"=>"20"}}
```

### Computers Controller  
All the actions related to creating and updating a category, will be moved to the computers controller. Just take into consideration that we will need to create both a product and a computer.

- separation of params



  [c054b877]: https://github.com/iacobson/test-shop/tree/polymorphic-associations-final "polymorphic-associations-final"
