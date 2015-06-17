---
layout: post
title: Ruby Modules
---

Today we learned a little about using Ruby modules. It was a brief introduction, but I gathered at least three ways we are able to use modules with Ruby.

1. Class Wrapper
2. Method Wrapper
3. Mixin

## Class Wrapper
You can use modules as a namespace in Ruby. An example of namespacing that should be familiar to most Rubyists can be found with the use of testing suites such as RSpec and MiniTest.

```ruby
require 'minitest'

class MyTest < MiniTest::Test
  def test_it_passes
    assert true
  end
end
```

In the above code, MiniTest is a namespace and Test is a class within that namespace. A namespace provides a way to distinguish classes with the same name. "Test" is a common name. If your program had a class named Test, Ruby would be unable to distinguish your program's Test class from MiniTest's Test class without the MiniTest namespace. Here is a simplified view of how the MiniTest namespace is set up using a module.

```ruby
module MiniTest
  class Test
    # Do some test stuff
  end
end
```

As you can see above, the module MiniTest is the namespace that contains MiniTest's Test class. This is accessed using `MiniTest::Test`.

## Method Wrapper
Using modules to wrap methods is one way to enforce some functional programming principles using Ruby. Let's take a look at an example.

```ruby
module MyFunction
  def self.evaluate_this(input)
    # Take some input, perform some function, and return a value
  end
end
```

Unlike classes, modules cannot be instantiated in Ruby. If you were to call `MyFunction.new` you would receive an error. Therefore, you are forced to call a class method; in this case `MyFunction.evaluate_this(input)`. Using modules in this way makes Ruby operate less like an object oriented language and more like a functional one.

## Mixin
Mixins are a way to share common methods and attributes among classes in Ruby. (You can also do this through inheritance.) Take the following example.

```ruby
module TwoWheeled
  def number_of_wheels
    2
  end
end

module GasDriven
  def fill
    # fill the gas tank
  end
end

class Transport
  def operator
    # return info about the driver
  end
end

class Moped < Transport
  include TwoWheeled
  include GasDriven

  def some_moped_attribute
    # return some info about the moped
  end
end

class Bicycle < Transport
  include TwoWheeled

  def some_bicycle_attribute
    # return some info about the bicycle
  end
end
```

In this example, `include TwoWheeled` in the Moped and Bicycle classes allow them access to `number_of_wheels`. Only the Moped class, however, has access to `fill`. The following are all valid calls.

```ruby
moped = Moped.new
moped.number_of_wheels
moped.fill
moped.operator
moped.some_moped_attribute

bicycle = Bicycle.new
bicycle.number_of_wheels
bicycle.operator
bicycle.some_bicycle_attribute
```

Mixins are generally used with descriptors/adjectives such as `TwoWheeled` and `GasDriven`. Classes/superclasses are generally used with nouns such as `Transport`, `Moped`, and `Bicycle`. Note that Ruby allows inheritance from only one superclass, but allows classes to have multiple mixins.
