---
layout: post
title: Testing validations with RSpec 3+
---

There are many ways of testing a Rails Model validations. Let's explore a few of them.

We will test a very simple `Books` Model, that requires to have a title:

{% highlight ruby linenos %}
class Book < ActiveRecord::Base
  validates :title, presence: true
end
{% endhighlight %}
