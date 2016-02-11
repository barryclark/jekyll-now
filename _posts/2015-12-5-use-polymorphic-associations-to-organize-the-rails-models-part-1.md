---
layout: post
title: Use Polymorphic Associations to organize the Rails models
tags: rails
excerpt: "A good model structure is the premise for a clean and readable application, and polymorphic associations can be a great help."
---
# Part 1: Migrations and Models

Organizing the models is an essential part of application design, and will certainly have a serious impact on the way the application will evolve. A good model structure is the premise for a clean and readable application.

This one of the reasons why we will want to take a closer look to the Rails ActiveRecord Polymorphic Associations.

In order to try the Polymorphic Associations we will use a very basic shopping cart application, created for testing reasons. The initial state of the application can be found on this Github branch: [polymorphic-associations-initial][6ef755a1]

At this point the application has a Product model which stores all the products in the shop, with the following details:

```html
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
  - pages per minute

The first thing we could do is to include all those details in the products table, and this can be just ok. But now imagine that in the future we will have one hundred product categories, each of them with a dozen of attributes. Our products table will end up with over one thousand columns, most of them unused for each individual row (*eg. we will not need `pages_per_minute` attribute for a computer*).

The next logical action would be then to give up the product table and build individual models for each category of products. But we will find out very soon that this is not an optimal solution. It will be quite difficult for example to display or sort all products, and common attributes, such as price or stock will need to be added for each model.

So, most probably some kind of combination between the above methods would be a potential solution.

### Enter Polymorphic Associations !
Using Polymorphic Associations one model can belong to more models. It is a way to share data between models, and in the same time a centralization of those models.

Before writing any code, let's think about the structure we want to build:

```html
                +-----------------+
                |  PRODUCT        |
                +-----------------+
                |  category_id    |
                |  category_type  |
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

We chose the **category** to represent the polymorphic relations, and we need to define a foreign key: `category_id` and a `category_type` that will link with the Computer or Printer models.

> In our example below we will detail just the Computer model, the Printer one being quite similar. However you can see the full code on this Github branch: [polymorphic-associations-final][2cc9496e]

## The Migrations
First we will need to adapt the existing Product to accept polymorphic relations:

- Generate a new migration:

<div class="file_path">Terminal</div>
```bash
rails g migration AddPolymorphicRelationsToProduct
```

- Edit the migration file:

<div class="file_path">./db/migrate/20151206110341_add_polymorphic_relations_to_product.rb</div>
```ruby
class AddPolymorphicRelationsToProduct < ActiveRecord::Migration
  def up
    remove_column :products, :category
    remove_column :products, :name
    add_column :products, :category_type, :string
    add_column :products, :category_id, :integer
    add_index :products, [:category_type, :category_id]
  end

  def down
    remove_index :products, column: [:category_type, :category_id]
    remove_column :products, :category_id, :integer
    remove_column :products, :category_type, :string
    add_coumn :products, :category, :string
    add_coumn :products, :name, :string
  end
end
```

- Generate the Computer model and migration:

<div class="file_path">Terminal</div>
```bash
rails g model Computer name:string cpu:string memory:string
```

- Before running the migration, just delete any unneeded information, such as timestamps, as we will use the Product `created_at` and `updated_at`.

<div class="file_path">./db/migrate/20151206120959_create_computers.rb</div>
```ruby
class CreateComputers < ActiveRecord::Migration
  def change
    create_table :computers do |t|
      t.string :name
      t.string :cpu
      t.string :memory
    end
  end
end
```

- Migrate:

<div class="file_path">Terminal</div>
```bash
rake db:migrate
```

## The Models
Add the polymorphism information in the Product model.

<div class="file_path">./app/models/product.rb</div>
```ruby
#...
belongs_to :category, polymorphic: true, dependent: :destroy
#...
```

As a computer will be registered as a product, the association will be a one-to-one.

<div class="file_path">./app/models/computer.rb</div>
```ruby
class Computer < ActiveRecord::Base
  has_one :product, as: :category, dependent: :destroy
end
```

We use `dependent: :destroy` as it makes no sense to have a computer without a product, or the other way around.

## Console Tests
At this point our models should be fully functional, so we can test them in the rails console.

<div class="file_path">Terminal</div>
```
computer = Computer.new(name: "comp1", cpu: "i5", memory: "16 GB")
=> #<Computer id: nil, name: "comp1", cpu: "i5", memory: "16 GB">
```

We pass `computer` as argument for the product category.

<div class="file_path">Terminal</div>
```
product = Product.new(category: computer, user_id: 1,
        price: 2000, stock: 50)
=> #<Product id: nil, user_id: 1, price: 2000, stock: 50,
    created_at: nil, updated_at: nil,
    category_type: "Computer", category_id: nil>
```

This way we will save both the product and computer in the same time.

<div class="file_path">Terminal</div>
```
product.save
   (0.3ms)  BEGIN
  SQL (0.6ms)  INSERT INTO "computers" ("name", "cpu", "memory") VALUES ($1, $2, $3) RETURNING "id"  [["name", "comp1"], ["cpu", "i5"], ["memory", "16 GB"]]
  SQL (0.4ms)  INSERT INTO "products" ("category_type", "user_id", "price", "stock", "category_id", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id"  [["category_type", "Computer"], ["user_id", 1], ["price", 2000], ["stock", 50], ["category_id", 6], ["created_at", "2015-12-06 15:51:32.398415"], ["updated_at", "2015-12-06 15:51:32.398415"]]
   (9.9ms)  COMMIT
=> true
```

Now we can find the product category.

<div class="file_path">Terminal</div>
```
prod = Product.last
  Product Load (10.4ms)  SELECT  "products".* FROM "products"  ORDER BY "products"."id" DESC LIMIT 1
=> #<Product id: 8, user_id: 1, price: 2000, stock: 50, created_at: "2015-12-06 15:51:32", updated_at: "2015-12-06 15:51:32", category_type: "Computer", category_id: 6>
```

<div class="file_path">Terminal</div>
```
prod.category
  Computer Load (0.3ms)  SELECT  "computers".* FROM "computers" WHERE "computers"."id" = $1 LIMIT 1  [["id", 6]]
=> #<Computer id: 6, name: "comp1", cpu: "i5", memory: "16 GB">
```

And the other way around, the computer product.

<div class="file_path">Terminal</div>
```
comp = Computer.last
  Computer Load (7.8ms)  SELECT  "computers".* FROM "computers"  ORDER BY "computers"."id" DESC LIMIT 1
=> #<Computer id: 6, name: "comp1", cpu: "i5", memory: "16 GB">
```

<div class="file_path">Terminal</div>
```
comp.product
  Product Load (0.2ms)  SELECT  "products".* FROM "products" WHERE "products"."category_id" = $1 AND "products"."category_type" = $2 LIMIT 1  [["category_id", 6], ["category_type", "Computer"]]
=> #<Product id: 8, user_id: 1, price: 2000, stock: 50, created_at: "2015-12-06 15:51:32", updated_at: "2015-12-06 15:51:32", category_type: "Computer", category_id: 6>
```

In the [second part]({% post_url 2016-01-10-use-polymorphic-associations-to-organize-rails-models-part-2 %}) of the article we will explore the Routes, Views and Controllers in the context of polymorphic associations.

[6ef755a1]: https://github.com/iacobson/test-shop/tree/polymorphic-associations-initial "polymorphic-associations-initial"
[2cc9496e]: https://github.com/iacobson/test-shop/tree/polymorphic-associations-final "polymorphic-associations-final"
