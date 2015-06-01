---
layout: post
title: "How-To Guide: Rails Forms"
date: June 5, 2015
tagline: "Comparing Rails Forms and SimpleForm Gem"
---

![SimpleForm](http://miriamtocino.github.io/images/posts/simple-form.svg)

This is the first article of a series that I will be writing about gems and external libraries for Rails. The purpose of each of them is to build a small project for each of them to study their possibilities and why they are so much used. Today I will be writing about forms, so take a comfortable seat and enjoy the ride!

You might have heard that forms in web applications are an essential interface for user input. However, they can become tedious to write and maintain because of the need to handle form control naming and its numerous attributes.

In this project I will first use the different [built-in form helpers](http://guides.rubyonrails.org/form_helpers.html) that are included in Rails. In the very last part of the article I will include the [SimpleForm](https://github.com/plataformatec/simple_form) gem built by [Plataformatec](http://plataformatec.com.br/) and transform the form accordingly step-by-step.

#### What We Are Building

We will be building a model-centric form for creating and editing companies with the following fields:

- **Text Field** for its name.
- **Text Area** for its description.
- **Select Box** for its size.
- **Checkboxes collection** for its categories.

![Diagram 1](http://miriamtocino.github.io/images/posts/rails-forms-diagram-1.svg)

#### Generating Scaffolds

First let's generate the scaffolds for **COMPANY** and **CATEGORY**.

{% highlight bash %}
$ rails generate scaffold Company name:string description:text size:string
$ rails generate scaffold Category name:string
{% endhighlight %}

Don't forget to create the corresponding tables in the database by running:

{% highlight bash %}
$ rake db:migrate
{% endhighlight %}

#### Many to Many Relationship

Now let's create a **CHARACTERIZATION** join model that will connect companies to categories. Any particular row in the **characterizations** table will effectively join a row in the **companies** table and a row in the **categories** table.

![Diagram 2](http://miriamtocino.github.io/images/posts/rails-forms-diagram-2.svg)

In this case we don't need a controller, so we'll use the model generator to generate a join model and migration file.

{% highlight bash %}
$ rails g model characterization company:references category:references
{% endhighlight %}

Again don't forget to create the corresponding tables in the database by running:

{% highlight bash %}
$ rake db:migrate
{% endhighlight %}

We will end up having the following 3 model files:

{% highlight ruby %}
# app/models/company.rb

class Company < ActiveRecord::Base
  has_many :characterizations, dependent: :destroy
  has_many :categories, through: :characterizations

  SIZES = ["0-10", "11-30", "31-50", "More than 50"]

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :size, inclusion: { in: SIZES }
end
{% endhighlight %}

{% highlight ruby %}
# app/models/category.rb

class Category < ActiveRecord::Base
  has_many :characterizations, dependent: :destroy
  has_many :companies, through: :characterizations

  validates :name, presence: true, uniqueness: true
end
{% endhighlight %}

{% highlight ruby %}
# app/models/characterization.rb

class Characterization < ActiveRecord::Base
  belongs_to :company
  belongs_to :category
end
{% endhighlight %}

#### Building up the Form

The following helpers are used on a form builder scoped to the `@company` object.

##### Text Field & Text Area

The only argument that needs to be passed in for the **text field** and the **text area** is the name of the attribute to be called on the **Company** object, _name_ and _description_ in these cases.

{% highlight erb %}
<%= f.text_field :name %>
<%= f.text_area :description %>
{% endhighlight %}
















##### Select Box

TO-DO:
http://guides.rubyonrails.org/form_helpers.html#select-boxes-for-dealing-with-models

{% highlight erb %}
<%= f.label :size %>
<%= f.select :size, Company::SIZES %>
{% endhighlight %}

##### Checkboxes collection

{% highlight erb %}
<%= f.label :categories %><br>
<%= f.collection_check_boxes(:category_ids, Category.all, :id, :name) %>
{% endhighlight %}

The complete form file ends up looking like this:

{% highlight erb %}
<%= form_for(@company) do |f| %>
  <% if @company.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@company.errors.count, "error") %> prohibited this company from being saved:</h2>

      <ul>
      <% @company.errors.full_messages.each do |message| %>
        <li><%= message %></li>
      <% end %>
      </ul>
    </div>
  <% end %>

  <div class="field">
    <%= f.label :name %><br>
    <%= f.text_field :name %>
  </div>

  <div class="field">
    <%= f.label :description %><br>
    <%= f.text_area :description %>
  </div>

  <div class="field">
    <%= f.label :size %>
    <%= f.select :size, Company::SIZES %>
  </div>

  <div class="field">
    <%= f.label :categories %><br>
    <%= f.collection_check_boxes(:category_ids, Category.all, :id, :name) %>
  </div>

  <div class="actions">
    <%= f.submit %>
  </div>
<% end %>
{% endhighlight %}

#### Wrapping-up




I hope that now you have a better understanding of how to build forms in Rails and which approach to choose when.
