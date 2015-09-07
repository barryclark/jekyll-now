---
layout: post
category: programming
title: Building a Rails API part 1. Setting Up a Rails API.
tags: Programming
excerpt: In part 1 of this tutorial, we will be setting up the models that we will use for this Suya-based API tutorial.
---

## Building and exposing an api built in Ruby on Rails

#### Introduction and topics
This tutorial will build an API that exposes data pertaining to vendors and suya. You heard me... I will teach you Rails using suya.

In this tutorial/walkthrough, we will cover the following topics:

* Setting up a rails api application
* Rails generators
* Creating models and their associated tables in a database.
* Validating model columns.
* Creating columns for these tables in the database with different types
* Setting up associations between two tables (has_many and belongs_to associations)
* Unit Testing and Controller Testing. We will test validations and controller endpoints.
* ActiveModel Serializers for manipulating the delivered JSON.
* Rails routes, gemfile
* We will explore how to use the pry gem which is a kind of Ruby debugger.
* We will read some documentation and try to figure out how to solve our own bugs.

By the end of this long multi-part tutorial, you will have a basic understanding of how to build a simple rails api without views, javasript files, and controllers that can deliver HTML views. This API can then be consumed by a separate client-side Angular application by hitting this api's endpoint and getting back JSON data. Bear with me... it'll be worth it.

#### Instructions
This tutorial will simply setup the models that we will use the API. If you don't want to know how to do this or if this is too basic, skip ahead to the next part of this tutorial.

The order of this tutorial is this:

1. 1-setting-up-rails-api
2. 2-unit-testing-models-and-bottles.
3. 3-creating-an-api
4. 4-testing-api
5. 5-serialize-dat-suya

If you are unfamiliar with Rails, start at the beginning of this tutorial by switching to the 1-setting-up-rails-api branch on Github and following the directions. If you are somewhat familiar with Rails, switch to the branch creating-api on Github and start there.

Simply switch to a branch and follow the README

#### Let's Begin.

1. Install the Rails-api gem on your machine by typing this in terminal.
2.
    ```Bash
    gem install rails-api
    ```

2. After that, change into the directory where you want your project to live and type:

    ```Bash
    rails-api new dat_suya_lyfe
    ```

    You should see a bunch of files being created. However, you will notice that there are no app/views created or app/assets/js created or app/assets/images. You will just be creating an api and so none of these front-end files are created as a result of the rails-api gem.

3. CD into this new project folder.

4. Let's start by creating some models, migration files, and tables in your database.
    Let's start with the models and migration files.
    Here are some useful links:
    [Active Record Basics](http://guides.rubyonrails.org/active_record_basics.html)
    [Hartl Tutorial chapter on models and AR](https://www.railstutorial.org/book/modeling_users)

    I recommend reading both before continuing. If you need to read the Hartl Tutorial's earlier chapters to gain an understanding of Ruby or Rails concepts, please feel free to do so. Ruby/Rails takes time so do not mind if this is a long process.

    If you want to move on, here are some important quotes.

    From the Hartl Tutorial, an explanation of Rails Models, the M in MVC:
    > In Rails, the default data structure for a data model is called, naturally enough, a model (the M in MVC from Section 1.3.3). The default Rails solution to the problem of persistence is to use a database for long-term data storage, and the default library for interacting with the database is called Active Record.1 Active Record comes with a host of methods for creating, saving, and finding data objects, all without having to use the structured query language (SQL)2 used by relational databases. Moreover, Rails has a feature called migrations to allow data definitions to be written in pure Ruby, without having to learn an SQL data definition language (DDL). The effect is that Rails insulates you almost entirely from the details of the data store.

    From the Hartl Tutorial, an explanation of migrations and how they are created:
    > Migrations provide a way to alter the structure of the database incrementally, so that our data model can adapt to changing requirements. In the case of the User model, the migration is created automatically by the model generation script;
    > Note that the name of the migration file is prefixed by a timestamp based on when the migration was generated.
    > The migration itself consists of a change method that determines the change to be made to the database. In the case of Listing 6.2, change uses a Rails method called create_table to create a table in the database for storing users.

    Naming Conventions:
    > Active Record uses some naming conventions to find out how the mapping between models and database tables should be created. Rails will pluralize your class names to find the respective database table. So, for a class Book, you should have a database table called books.


    Anyway, once you have a basic understanding of models and migrations, let's move on.

    5. In the parent directory of your project, type:


    6. Let's do the same thing with the Suya Model. Let's first generate the model:

    ```Bash
    rails g model Suya type:string spicy:boolean
    ```

    In this model, we are creating a Suya model, and a Suyas table where there is a type column with a string data-type. We're also creating a spicy column with a data-type of boolean.

    Let's try to migrate and see what happens:

    ```Bash
    rake db:migrate
    ```

    Unfortunately, that column named "type" will cause us problems later on since "type" is a reserved word in migrations. We will fix that later with another Rails generator.

    Right now, our schema.rb should look like this:

    > ActiveRecord::Schema.define(version: 20150710101513) do

    > create_table "suyas", force: :cascade do |t|
        t.string   "type"
        t.boolean  "spicy"
        t.datetime "created_at", null: false
        t.datetime "updated_at", null: false
      end

    > create_table "vendors", force: :cascade do |t|
        t.string   "name"
        t.datetime "created_at", null: false
        t.datetime "updated_at", null: false
      end

    > end



7. So we created some models without TDD. Let's try from here on out to abide by TDD standards. We will cover testing in the branch called testing-models-and-bottles.

#### Recap
* We created a rails api app with the rails-api gem and the rails-api command.
* We explored models, migrations, and the schema (the representation of the database).
* We used the generator command for models which was

```Bash
rails g model ModelName column_name:data_type
```

By the way, if you left out the data_type in the generator command, it defaults to string so:

```Bash
rails g model Vendor name email
```

creates a table called "vendors" with columns called name and email whose data types are strings.

[Model Generators](http://railsguides.net/advanced-rails-model-generators/)
