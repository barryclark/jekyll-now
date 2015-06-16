---
layout: post
title: "Exploring the Simple Form Gem"
date: June 16, 2015
tagline: "Building Forms in a Simple Way"
---

![][simple-form-logo]

During my first months at [Springest][springest-homepage], as a fast-learning junior developer, I will be diving into the workings and usage of popular gems and posting here my experiences with each of them once in a while. [Simple Form][simple-form-gem-homepage] is the gem of this week!

Forms are essential for user input in web applications. However, they can become tedious to write and maintain because of the need to handle form control naming and its numerous attributes.

That's where the [Simple Form][simple-form-gem-homepage] gem comes in handy. It aims to be as flexible as possible while helping you with powerful components to create your forms. And don't worry, because you will still be able to define your layout the way you do now.

#### What We Are Building

In this article we will be building a model-centric form for creating and editing companies including the following fields: a `text field` for its name, a `text area` for its description, a `select box` for its size (number of employees) and a `checkboxes collection` for its different categories.

![][form-diagram]

#### Defining Relationships Between Models

To be able to build this form we will first need a `company` and a `category` models. Beside these two models we will also have a `characterization` join model, which will be in charge of connecting the `company` and the `category` models. Any particular row in the `characterizations` table will effectively join a row in the `companies` table and a row in the `categories` table.

Check out the following diagram showing the models associations:

![][associations-diagram]

The following code shows the corresponding validations and how the structure would look like:

{% highlight ruby %}
class Company < ActiveRecord::Base
  has_many :characterizations, dependent: :destroy
  has_many :categories, through: :characterizations

  SIZES = ["0-10", "11-30", "31-50", "More than 50"]

  validates :name, presence: true, uniqueness: true
  validates :description, presence: true
  validates :size, presence: true, inclusion: { in: SIZES }
end

class Category < ActiveRecord::Base
  has_many :characterizations, dependent: :destroy
  has_many :companies, through: :characterizations

  validates :name, presence: true, uniqueness: true
end

class Characterization < ActiveRecord::Base
  belongs_to :company
  belongs_to :category
end
{% endhighlight %}

#### Let's Build the Form

I will be guiding you through the different form helpers in [Simple Form][simple-form-gem-homepage] and how to use them compared to the built-in [Rails Form Builder][rails-form-builder].

The form will be scoped to the `company` model and to start using Simple Form you just have to add the helper it provides:

{% highlight erb %}
<%= simple_form_for @company do |f| %>
{% endhighlight %}

##### Adding a Text Field and a Text Area

When using the [Rails Form Builder][rails-form-builder-text-field] you need to specify one by one the type for each of the different form helpers and add a corresponding label to them. For the `text` and the `text area` fields you then have to pass in the name of the attribute to be called on the `company` object (_name_ and _description_ in this case).

{% highlight erb %}
<%= f.label :name %>
<%= f.text_field :name %>

<%= f.label :description %>
<%= f.text_area :description %>
{% endhighlight %}

One of the nicest things about [Simple Form][simple-form-text-field] is that you don't need to specify the type of the different form elements, but it will figure that out by itself looking at the column type in the database and use an appropriate input for the column. For example, a column created with type `:text` in the database (like the company's description in our case) will use a `textarea` input by default. You can check [here][available-input-types] a complete list of the available input types and defaults for each column type.

A label element will also be added by default to each of the fields, transforming the above code into this:

{% highlight erb %}
<%= f.input :name %>
<%= f.input :description %>
{% endhighlight %}

##### Adding a Select Box

In the case of a select box, [Rails Form Builder][rails-form-builder-select-box] will also need the options array to be passed in as a second parameter.

{% highlight erb %}
<%= f.label :size %>
<%= f.select :size, Company::SIZES %>
{% endhighlight %}

With [Simple Form][simple-form-select-box] if you want to create a select containing the different sizes of a company you can do it overriding the `:collection` option. Collections can be arrays or ranges, and when a `:collection` is given the `:select` input will be rendered by default, so no need to pass the `as: :select` option:

{% highlight erb %}
<%= f.input :size, collection: Company::SIZES, prompt: "- Select number of employees" %>
{% endhighlight %}

##### Adding a Checkboxes Collection

To generate a collection of checkboxes with [Rails Form Builder][rails-form-builder-checkboxes-collection] we will need to pass in the following parameters to the form helper:

* Name of the attribute or method to be called on the `company` object (as in the previous form elements)
* Options array or collection to be shown
* Name of the attribute to be used as the checkbox value
* Name of the attribute to be used as the checkbox label text

{% highlight erb %}
<%= f.label :categories %><br>
<%= f.collection_check_boxes(:category_ids, Category.all, :id, :name) %>
{% endhighlight %}

To deal with these type of associations, [Simple Form][simple-form-checkboxes-collection] can generate either select inputs or a series of radios buttons or checkboxes. We will only need to pass in the `categories` collection as a parameter. The association helper would render a `:select` input by default, which can be changed into radio buttons or checkboxes like we did in this case:

{% highlight erb %}
<%= f.association :categories, as: :check_boxes %>
{% endhighlight %}

#### What We Got

Our form will end up looking very short and simple indeed ☺ :

{% highlight erb %}
<%= simple_form_for @company do |f| %>
  <%= f.input :name %>
  <%= f.input :description %>
  <%= f.input :size, collection: Company::SIZES, prompt: "- Select number of employees" %>
  <%= f.association :categories, as: :check_boxes %>
  <%= f.button :submit %>
<% end %>
{% endhighlight %}

#### What's Next

If you didn't have enough and you are actually interested in doing more complicated things with [Simple Form][simple-form-gem-homepage], you will be happy to hear that:

* [You can create your own custom inputs][simple-form-custom-inputs]
* [You can also add some extra helpers][simple-form-extra-helpers]
* [And it works nicely with the country_select gem][simple-form-country-select]

> This post was first published on the [Springest Devblog](http://devblog.springest.com/).


[springest-homepage]: https://www.springest.com/
[rails-form-builder-text-field]: http://guides.rubyonrails.org/form_helpers.html#binding-a-form-to-an-object
[simple-form-text-field]: https://github.com/plataformatec/simple_form#usage
[simple-form-checkboxes-collection]: https://github.com/plataformatec/simple_form#associations
[simple-form-select-box]: https://github.com/plataformatec/simple_form#collections
[rails-form-builder-checkboxes-collection]: http://edgeapi.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-collection_check_boxes
[rails-form-builder-select-box]:http://guides.rubyonrails.org/form_helpers.html#select-boxes-for-dealing-with-models
[available-input-types]: https://github.com/plataformatec/simple_form#available-input-types-and-defaults-for-each-column-type
[simple-form-country-select]: https://github.com/plataformatec/simple_form#user-content-country-select
[simple-form-custom-inputs]: https://github.com/plataformatec/simple_form#user-content-custom-inputs
[simple-form-extra-helpers]: https://github.com/plataformatec/simple_form#user-content-extra-helpers
[simple-form-gem-homepage]: http://simple-form.plataformatec.com.br/
[simple-form-logo]: http://miriamtocino.github.io/images/posts/simple-form.svg
[form-diagram]: http://miriamtocino.github.io/images/posts/rails-forms-diagram-1.svg
[associations-diagram]: http://miriamtocino.github.io/images/posts/rails-forms-diagram-2.svg
[rails-form-builder]: http://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html
[simple-form-priority]: https://github.com/plataformatec/simple_form#user-content-priority
