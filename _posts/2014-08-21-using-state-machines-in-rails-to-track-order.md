---
layout: post
title: Using state machines in Rails to track order status with USA2Kenya
date: '2014-08-21T13:34:00-05:00'
tags:
- rails
- ruby on rails
- state machines
- projects
- usa2kenya
- shipping
- rails 4
tumblr_url: http://blog.abdullahi.org/post/95392344545/using-state-machines-in-rails-to-track-order
---
This summer I started [an international freight-forwarding company](https://www.usa2kenya.com) for Kenyan shoppers who want to order from online retailers. Many online retailers do not ship to African addresses, but do to US addresses. We provide customers with a US shipping address they can use while shopping online, and handle getting their packages to Kenya. USA2Kenya also acts as a general shipping service for sending packages to Kenya. This is a pain-point that exists for many shoppers in Kenya as well as diaspora who would like to send gifts to friends and family in Kenya. [Current methods of sending packages to Kenya are slow and expensive, full of bureaucracy and inefficiencies](http://alaninkenya.org/2014/05/20/if-you-hate-someone-in-kenya-send-them-a-package).

While building USA2Kenya, I had to have a way to track the state of a package as it moved from state to state, from the start to the package landing in the customer's hands. An event-driven [state machine](http://en.wikipedia.org/wiki/Finite-state_machine) is the perfect tool for tracking this. Handily, there's a bunch of great gems out there for using state machines in your Ruby Rails application including the popular [state_machine](https://github.com/pluginaweek/state_machine), [transitions](https://github.com/troessner/transitions) (which [used to be part of Rails](https://github.com/rails/rails/commit/db49c706b62e7ea2ab93f05399dbfddf5087ee0c)' ActiveModel), and [several more](https://www.ruby-toolbox.com/categories/state_machines). I decided to use [AASM](https://github.com/aasm/aasm). Note: I use the words state and status interchangeably in this post.

Using AASM to track an order's state is pretty simple. First, let's add a column to track order state with a migration.

$ rails g migration AddStatusToOrder status:string
$ rake db:migrate

Then, make sure to add aasm to your Gemfile.

```ruby
# Gemfile

gem 'aasm'
 ```

Afterwards, `include` aasm in any models you want to track the state of.

```ruby
# app/models/order.rb

class Order < ActiveRecord::Base
  include AASM
  # ...
end
```

To model order state, first we have to define what the different states our order can be in are. When a customer is using our service at [USA2Kenya](https://www.usa2kenya.com), they are given an automatically-generated address that they can use as a shipping address during the checkout process of any online retailer. After purchasing a product, the customer receives a tracking number. 

To create a new order for a package shipment at USA2Kenya, the minimum we require is this tracking number, the value of the item(s) being shipped and a description of what they are. Upon the creation of an order at USA2Kenya, the initial state is set at `pending`. After the product has arrived at the USA2Kenya address, it's transitioned to the `processing` state. After going through processing at our USA facility, it's sent off to our Kenyan locations and moved to the `en_route` state. Upon arrival at one of our [two locations](https://www.usa2kenya.com/contact) in Nairobi, the state changes to `ready`. When the entire process is finished (the customer has payed for and picked up their order), the state becomes `picked_up`. 

We can model all these states and their transitions with a state machine using AASM's DSL. Since our state machine only transitions from state to state when triggered, we have to define `events` for these transitions.

The three events for handling the change in state of our five states are `receive`, `ship`, `deliver`, and `finish`.

* receive transitions state from the starting state of `pending` to `processing`
* ship transitions state from `processing` to `en_route`
* deliver transitions state from `en_route` to `ready`
* finish transitions the state from `ready` to `picked_up`

To wrap it up, here's what our model looks like now with a simple state machine to track order state. Note, the colors after state are comments for me to remember how each state button appears to the user. I've also left the comments that show how emails are to be sent after events trigger transition in state.


```ruby
# app/models/order.rb

class Order < ActiveRecord::Base
  include AASM


  aasm column: 'status' do # set the column in the db for tracking state
    state :pending, initial: true # we have tracking # from customer, enroute to USA address, "danger orange"
    state :processing # arrived at USA2Kenya address, being processed, "warning purple"
    state :en_route # on the way to Kenya offices of USA2Kenya, "info blue"
    state :ready # it's delivered to the U2K location in Kenya, awaiting pickup "success green"
    state :picked_up # order completed, customer picked up their package

    event :receive do # -- email upon order creation
                      # -- email upon receiving order in USA
      transitions from: :pending, to: :processing
    end

    event :ship do
      transitions from: :processing, to: :en_route
    end

    event :deliver do # -- email upon order ready for pickup
      transitions from: :en_route, to: :ready
    end

    event :finish do # -- email upon (@sales.state == "finished")
      transitions from: :ready, to: :picked_up
    end
  end
end
```

Here's a quick snap of the key for status codes that the customer sees:


![](https://31.media.tumblr.com/d78c03251b5c2bd17da4f9bd81d584f8/tumblr_inline_nao56zYGtd1r54r4c.png)

Here's how an actual order with a state would look to a customer on their dashboard at [USA2Kenya](https://www.usa2kenya.com).

![](https://31.media.tumblr.com/c0ce69204ef668f03f9e2baff372ac42/tumblr_inline_nao5b0LDrC1r54r4c.png)

On the backend, managing the state of an order is easy with a tool like [ActiveAdmin](http://activeadmin.info/). Just make sure you index the column holding state and add it to `permit_params` in the model's class for active_admin. 

```ruby
# app/admin/order.rb

ActiveAdmin.register Order do
  permit_params :tracking, :description, :status, :value, ...

  index do
    column :tracking
    column :description
    column :value
    column :status # field holding state
    ...
    actions
  end
end
```
