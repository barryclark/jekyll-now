---
layout: post
title: "What About Ruby?"
date: February 4, 2015
tagline: "Diving into a new language"
tags : [ruby, learning]
---

![What About Ruby](http://miriamtocino.github.io/images/posts/what-about-ruby.svg)

For the past few weeks I have been playing around with Ruby, a totally new language for me. I thought that it would be a good idea to list the most important aspects and useful information that I am learning about it and share it with you:

1. [Interpreted language](http://en.wikipedia.org/wiki/Interpreted_language). A program doesn't need to be compiled previously into machine-language instructions.

2. [Object-oriented language](http://en.wikipedia.org/wiki/Object-oriented_programming). Everything is an [object](http://www.ruby-doc.org/core-2.2.0/Object.html) and every operation is a method call on some object. It is class-based, meaning that objects are instances of classes, which determines their type.

3. [Dynamic language](http://en.wikipedia.org/wiki/Dynamic_programming_language). It executes at _runtime_ common programming behaviours that static programming languages perform during _compilation_. These behaviours could include extension of the program, by adding new code, by extending objects and definitions, or by modifying the type system ([metaprogramming](http://en.wikipedia.org/wiki/Metaprogramming)). It also can ask objects about themselves ([reflection](http://en.wikipedia.org/wiki/Reflection_(computer_programming))).

4. [Dynamically typed](http://rubylearning.com/satishtalim/duck_typing.html) aka _duck typing_, objects have types but variables don't.


#### Naming Conventions

ClassNames use **UpperCamelCase**:

{% highlight ruby %}
class TodoList
  ...
end
{% endhighlight %}

Methods and variables use **snake_case**:

{% highlight ruby %}
def add_todo_item ... end
def mark_item_complete! ... end   # => changes object's state
def complete? ... end             # => returns a boolean
{% endhighlight %}

Types of variables:

{% highlight ruby %}
TEST_MODE = true    # => CONSTANTS (scoped)
$TEST_MODE = true   # => $GLOBALS (not scoped)
number = 0          # => local variables
@number = 0         # => instance variables
{% endhighlight %}

[Symbols](http://www.ruby-doc.org/core-2.2.0/Symbol.html) are like immutable strings whose value is itself. When a symbol is used it denotes specialness. In terms of memory, a symbol will be just saved once, while a string will be saved everytime.

{% highlight ruby %}
favorite_framework = :rails
:rails.to_s() == "rails"
"rails".to_sym() == :rails
:rails == "rails" # => false
{% endhighlight %}


#### Variables, Arrays, Hashes

There are **no declarations**:

- local variables must be assigned before use
- instance & classes variables == nil until assigned

**Variables** in Ruby can contain different values and different types of values over time:

{% highlight ruby %}
x = 10; x = 'foo'; x = [1, 2, 3]
{% endhighlight %}

[Arrays](http://www.ruby-doc.org/core-2.2.0/Array.html) can have different types of objects inside. Find below a list of the most useful methods:
{% highlight ruby %}
array = [1, 'two', :three]
grocery_list = ["milk", "eggs", "bread"]

# Accessing items in arrays
grocery_list[0]
grocery_list.at(1)
grocery_list.first
grocery_list.last
grocery_list[-1] # last item of the array

# Adding items to arrays
grocery_list << "carrots"
grocery_list.push("potatoes") # adds item at the end
grocery_list.unshift ("celery") # adds item at the beginning
grocery_list += ["ice-cream", "pie"]
grocery_list.insert(2, "oatmeal") # insert at the index of 2

# Removing items from arrays
grocery_list.shift # drops first item in array
grocery_list.drop(2) # drops 2 last items in the array
grocery_list.slice(0,3)
grocery_list.pop # drops the last item in the array

# Common arrays methods
grocery_list.length # => 3
grocery_list.count("eggs") # how many occurrences
grocery_list.include?("eggs") # => true or false
{% endhighlight %}

[Hashes](http://www.ruby-doc.org/core-2.2.0/Hash.html) are also a very important part of the language, called _associative arrays_ in other languages such as PHP, from where I come from now. Find below a list of the most useful methods:

{% highlight ruby %}
x = { 'a' => 1, :b => [2, 3] }
hash = { "item" => "Bread", "quantity" => 1 }

# Accessing items in hashes
x[:b][0] == 2
hash.fetch("quantity") # => 1
hash["quantity"] # => 1
hash.values_at("item", "quantity") # => ["Bread", 1]

# Adding items to hashes
hash.store("calories", 100) # (new key, new value)
hash.merge({"calories" => 100})

# Working with hash keys
hash.keys # => ["item", "quantity"]
hash.has_key?("item") # => true
hash.key?("item") # => true
hash.member?("brand") # => false

# Working with hash values
hash.values # => ["Bread", 1]
hash.has_value?("brand") # => false
hash.value?(1) # => true

# Common arrays methods
hash.length # returns the number of key-value pairs
hash.invert # inverts keys and values
{% endhighlight %}


#### Methods

When using [methods](http://www.ruby-doc.org/core-2.2.0/Method.html) it is important to remember that everything (except [fixnums](http://www.ruby-doc.org/core-2.2.0/Fixnum.html)) is [pass-by-reference](http://stackoverflow.com/questions/373419/whats-the-difference-between-passing-by-reference-vs-passing-by-value):

{% highlight ruby %}
def foo(x, y)
  return [x, y+1]
end

def foo(x, y=0)   # y is optional, 0 if omitted
  [x, y+1]        # implicit return, last exp returned as result
end

def foo(x, y=0) ; [x, y+1] ; end

# Calling a method
a, b = foo(x, y)
a, b = foo(x)        # when optional arg used
{% endhighlight %}


#### Strings & Regular Expressions

[Strings](http://www.ruby-doc.org/core-2.2.0/String.html) could be expressed in different ways:

{% highlight ruby %}
"string", %Q{string}, 'string', %q{string}

# using double-quotes when writing a string
# will cause variables to be interpolated.
a = 41 ; "The asnwer is #{a+1}."

# Common string methods
name = "Miriam"
name.upcase
name.downcase
name.reverse # => "mairiM"
name.chars # => ["M", "i", "r", "i", "a", "m"]
{% endhighlight %}

Here it comes a very useful site when working with [regular expressions](http://www.ruby-doc.org/core-2.2.0/Regexp.html) in ruby [www.rubular.com](http://rubular.com/). Now let's match a string against a regexp:

{% highlight ruby %}
# Creating regular expressions
/(.*)$/i
%r{(.*)$}i # i means ignore case
Regexp.new('(.*)$', Regexp::IGNORECASE)

# Example
"miriam.tocino@gmail.com" =~ /(.*)@(.*)\.COM$/i
/(.*)@(.*)\.COM$/i =~ "miriam.tocino@gmail.com"
# If not match, value is false
# If match, value is non-false,
# and $1...$n capture parenthesized groups
# ($1 == 'miriam', $2 == 'gmail')

{% endhighlight %}




Am I missing something that you think I should be mentioning in this introduction? Please take the time to add a comment and I will get back to you ☺
