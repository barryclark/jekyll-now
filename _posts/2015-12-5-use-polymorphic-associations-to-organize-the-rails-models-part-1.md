---
layout: post
title: Use Polymorphic Associations to organize the Rails models
---
# Part 1: Migrations and Models

Organizing the models is an essential part of application design, and will certainly have a serious impact on the way the application will evolve. A good model structure is the premise for a clean and readable application.

This one of the reasons why we will want to take a closer look to the Rails ActiveRecord Polymorphic Associations.

In order to try the Polymorphic Associations we will use a very basic shopping cart application, created for testing reasons. The initial state of the application can be found on this Github branch: https://github.com/iacobson/test-shop/tree/polymorphic-associations-initial

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
We chose the **category** to represent the polymorphic relations, and we need to define a foreign key: **category_id** and a **category_type** that will link with the Computer or Printer models.

> In our example below we will use detail the Computer model, the Printer one being quite similar. However you can see the full code on this Github branch:
> https://github.com/iacobson/test-shop/tree/polymorphic-associations-final

## The Migrations
First we will need to adapt the existing Product to accept polymorphic relations:
- Generate a new migration:
```bash
rails g migration AddPolymorphicRelationsToProduct
```
- Edit the migration file:
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
```bash
rails g model Computer name:string cpu:string memory:string
```
- Before running the migration, just delete any unneeded information, such as timestamps, as we will use the Product created_at and updated_at
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
```bash
rake db:migrate
```
## The Models
Add the polymorphism information in the Product model.

<u>app/models/product.rb</u>
```ruby
...
belongs_to :category, polymorphic: true
...
```
