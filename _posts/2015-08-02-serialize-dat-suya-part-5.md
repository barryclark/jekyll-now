---
layout: post
category: programming
title: Building a Rails API part 5. ActiveModelSerializers and much more!
tags: Programming
excerpt: In part 5 of this tutorial, we will be customizing the JSON response, looking into adding onto the JSON response with meta nodes, using ActiveModelSerializers.
---

## ActiveModel Serializers. Let's fixup our API.

#### Instructions:
Once again, the order of this tutorial is:

1. setting-up-rails-api
2. unit-testing-models-and-bottles
3. creating-api
4. testing-api
5. **serialize-dat-suya**

This is the last section of this tutorial. Git clone [this branch](https://github.com/Jwan622/rails-api-practice/tree/5-serialize-dat-suya) to start.

#### Intro:

We will be using the active-model serializer gem to customize our API structure.

This is the gem:  
[Active Model Serializer Gem](https://github.com/rails-api/active_model_serializers)

This is a useful resource:  
[Blog Post on Active Model Serializer](https://blog.engineyard.com/2015/active-model-serializers)  

Quote from the above link:
> These days, there are so many different choices when it comes to serving data from an API. You can build it in Node with ExpressJS, in Go with Martini, Clojure with Compojure, and many more. But in many cases, you just want to bring something to market as fast as you can. For those times, I still reach for Ruby on Rails.

>With Rails, you can spin up a function API server in a very short period of time. Rails is large. Perhaps you object that there's "too much magic". Have you ever checked out the rails-api gem? It lets you enjoy all the benefits of Rails without including unnecessary view-layer and asset-related code.

On the active-model-serializers:

> Rails-api is maintained by Carlos Antonio Da Silva, Santiago Pastorino, Rails Core team members, and all-around great Rubyist Steve Klabnik. While not busy working on Rails or the Rails API Gem, they found the time to put together the active_model_serializers gem to make it easier to format JSON responses when using Rails as an API server... ActiveModel::Serializers (AMS) is a powerful alternative to jbuilder, rabl, and other Ruby templating solutions.

#### Let's Begin

So, currently our API response is mad ugly (I believe this is the technical term?).  
http://mediadb.kicker.de/2015/fussball/spieler/xl/39686_14_2014812112123295.jpg

It would be nice if we could remove the timestamps and IDs in our API response.  
This is where AMS comes in.

1. Add the active-model-serializers gem to the Gemfile.

    In our Gemfile, type:

    ```ruby
    gem 'active_model_serializers'
    ```

2. In terminal, type:

    ```Bash
    rails g serializer vendor
    ```

    That should create a app/serializers/vendor_serializer.rb file. In it, type:

    ```ruby
    class VendorSerializer < ActiveModel::Serializer
      attributes :id, :name
    end
    ```

    In our vendors_controller, in the index action, type:

    ```ruby
    def index
      render json: Vendor.all, each_serializer: VendorSerializer
    end
    ```

    In our show action, type:

    ```ruby
    render json: Vendor.find(params[:id]), serialiezr: VendorSerializer
    ```

    However, see this issue:  
    [Incompatibility between AMS ~> 0.9.0 and rails-api gem](https://github.com/rails-api/active_model_serializers/issues/600)

    In order to fix this error with the AMS gem of ~> 0.9.0, we need to include this in our ApplicationController:

    ```ruby
    class ApplicationController < ActionController::API
      include ActionController::Serialization
    end
    ```

    Now when we visit /vendors or /vendors/1, we get a slightly cleaner API output without the created_at or updated_at.

3. We can also do other cool things with AMS.

    Imagine we obtained this suya and vendor data from the national association of suya vendors (abbreviated as NASV from here on out). Say the NASV has a public API interface where you can obtain all the data related to vendors and their respective suyas. Say this information was incomplete. Say our seed data file is a replica of that real data and that's how sparse the NASV's API is. So we see an opportunity. We want to create an API with even more data and we may want to perform some calculations on the original API data. So let's add some fields.

    Let's say we want to give each vendor a score based on how many suyas they own.

    First, let's add this score method to our vendor model:

    ```ruby
    def suyas_count
      suyas.count
    end
    ```

    And in our vendors_serializer:

    ```ruby
    attributes :id, :name, :score

    def score
      object.suyas_count
    end
    ```

    The above could have been "simplified" by simply typing this in the vendors_serializer:

    ```ruby
    attributes :id, :name, :score

    def score
      object.suyas.count
    end
    ```

    But I wanted to show the connection between the model and the serializer, and the object method that is available inside the serializer.

4. Right now, our API response looks like this after these changes:

    > {  
        "vendors": [  
          {  
          "id": 1,  
          "name": "Jeffe",  
          "score": 2  
          },  
          {  
          "id": 2,  
          "name": "Jeffe1",  
          "score": 2  
          },  
          {  
          "id": 3,  
          "name": "Jeffe2",  
          "score": 1  
          },  
          {  
          "id": 4,  
          "name": "Jeffe3",  
          "score": 0  
          },  
      ...  

    Say we wanted to include another tag at the top level with say with the average suyas owned per vendor. We can do that with AMS.

    In the index action of the vendors_controller.rb:

    ```ruby
    def index
      render json: Vendor.all, each_serializer: VendorSerializer,
        meta: Vendor.average_suya_per_vendor,
        meta_key: "average_suya"
    end
    ```

    In our vendor_model:

    ```ruby
    def self.average_suya_per_vendor
      total = 0
      total_vendors = all.count
      all.each do |vendor|
        total += vendor.suyas.count
      end
      total/total_vendors.to_f
    end

    ```

    Lastly, our Gemfile needs to change to use a different compatible version of AMS with rails-api so that you can add root nodes like meta.

    ```ruby
    gem 'active_model_serializers', '~> 0.8.0'
    ```

    And now when you visit /vendors, you should see the extra root node which contains your own calculated data.

5. Hope that was clear! If you have any questions, feel free to reach out to Jeffrey Wan on Github.
