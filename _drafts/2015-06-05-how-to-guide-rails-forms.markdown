---
layout: post
title: "How-To Guide: Rails Forms"
date: June 5, 2015
tagline: "Comparing Rails Forms and SimpleForm Gem"
---

![SimpleForm](http://miriamtocino.github.io/images/posts/simple-form.svg)

Forms in web applications are an essential interface for user input. However, they can become tedious to write and maintain because of the need to handle form control naming and its numerous attributes.

In this article I will show you how to build a form in Rails. First of all I will use the different [built-in form helpers](http://guides.rubyonrails.org/form_helpers.html) that are included in Rails. In the very last part of the article I will include the [SimpleForm](https://github.com/plataformatec/simple_form) gem built by [Plataformatec](http://plataformatec.com.br/) and transform the form accordingly step-by-step.

#### What We Are Building

The form that I will be building is a model-centric form for creating and editing and specific database record. I choose a COMPANY (representing architecture offices) as the model. The form includes the following fields for a company:

- **Text field** for its _name_.
- **Text area** for its _description_.
- **Selec box** for its _size_.
- **Checkboxes collection** for its _categories_.

TO-DO: Image of the form (use wireframes from Mike)

#### Generate Scaffolds

First of all I will be generating two scaffolds for **company** and **category**.

{% highlight bash %}
$ rails generate scaffold Company name:string description:text size:string
$ rails generate scaffold Category name:string
{% endhighlight %}

Don't forget to create the corresponding tables in the database by running:

{% highlight bash %}
$ rake db:migrate
{% endhighlight %}

#### Many to Many Relationship

We will also need a **Characterization** join model that will connect companies to categories. Any particular row in the _characterizations_ table will effectively join a row in the _companies_ table and a row in the _categories_ table. In this case we don't need a controller, so we'll use the model generator to generate a join model and migration file.

{% highlight bash %}
$ rails g model characterization company:references category:references
{% endhighlight %}

Again don't forget to create the corresponding tables in the database by running:

{% highlight bash %}
$ rake db:migrate
{% endhighlight %}

TO-DO: Models and Relationships Diagram

Finally we end up having the following three models:

{% highlight ruby %}
# company.rb

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
# category.rb

class Category < ActiveRecord::Base
  has_many :characterizations, dependent: :destroy
  has_many :companies, through: :characterizations

  validates :name, presence: true, uniqueness: true
end
{% endhighlight %}

{% highlight ruby %}
# characterization.rb

class Characterization < ActiveRecord::Base
  belongs_to :company
  belongs_to :category
end
{% endhighlight %}



I hope that now you have a better understanding of how to build forms in Rails and which approach to choose when.
