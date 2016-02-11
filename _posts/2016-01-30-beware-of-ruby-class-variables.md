---
layout: post
title: Beware of ruby @@class_variable
tags: [ruby, veg]
excerpt: "Sometimes they may not be exactly what you think they are."
---

Ruby class variables (represended with `@@variable`) may seem a good solution to store class related data, and a natural companion to some class methods. However, they may be far more "dangerous" than anticipated, and behave in unexpected ways if not used properly. Let's see one of those cases.

To exemplify, we will take care of a small shop selling fruits and vegetables. We want a class method named `categories` which will keep track of the number of types of fruits and types of vegetables in our store's stock.

To make sure the requirements remain the same, we will start our exercise with a very small test:

<div class="file_path">./spec/shop_spec.rb</div>
```ruby
describe 'Shop' do
  before(:all) do
    Fruit.new('oranges')
    Vegetable.new('carrots')
    Fruit.new('bananas')
    Vegetable.new('cucumbers')
    Fruit.new('oranges')
  end
  it 'returns the number of fruit categories' do
    expect(Fruit.categories).to eq(3)
  end
  it 'returns the number of vegetable categories' do
    expect(Vegetable.categories).to eq(2)
  end
end
```
We add 3 types of fruits and 2 types of vegetables and expect the `categories` class methods to keep track of those numbers.

## Class Variables

The easy way to make the test pass is to use the class variable `@@categories` to count the types of fruits and vegetables added to the stock:

<div class="file_path">./shop.rb</div>
```ruby
class Fruit
  @@categories = 0

  def self.categories
    @@categories
  end

  def initialize(category)
    @category = category
    @@categories += 1
  end
end
```
and the same for the Vegetable class.

Incrementing the `@@categories` in the class initializer will ensure we update the number of categories, each time we instantiate the Fruit or Vegetable class (*of course we assume a certain category is created only once. The goal of this exercise is just to demonstrate how the @@class_variable works*).

At this point, the test will pass:
<div class="file_path">Terminal</div>
```html
Finished in 0.00155 seconds (files took 0.21525 seconds to load)
2 examples, 0 failures
```

We are so happy with our shop system and we want to make it even better. So we will add a Shop class, from which Fruit and Vegetable will inherit, which holds some useful methods in the future, not relevant for our exercise.

<div class="file_path">./shop.rb</div>
```ruby
class Shop
  # some useful methods
end

class Fruit < Shop
# .....
end

class Vegetable < Shop
# .....
end
```
No problem until now, the test still passing.

The real problems start when we decide that the Shop will have its own `@@categories` class variable which will store the number of  types of products (*e.g. fruits and vegetables*). As we don't want to change the structure of the test for the whole exercise, we will not instantiate the Shop class, but as you are about to see, that doesn't matter too much.

<div class="file_path">./shop.rb</div>
```ruby
class Shop
  @@categories = 0

  def self.categories
    @@categories
  end

  def initialize(category)
    @category = category
    @@categories += 1
  end
end
end
```

After this small change everything breaks apart. Let's have a look at the test results:

<div class="file_path">Terminal</div>
```html
FF
Failures:
  1) Shop returns the number of fruit categories
     Failure/Error: expect(Fruit.categories).to eq(3)
       expected: 3
            got: 5

  2) Shop returns the number of vegetable categories
     Failure/Error: expect(Vegetable.categories).to eq(2)
       expected: 2
            got: 5
```

It looks like our `@@class_variable` does not belong only to it's class, but to all the classes that have a common superclass.

What happens in our example, is that as soon as our classes get connected in the inheritance tree, the `@@categories` will become more of a shared variable between those classes, and any of them can update the variable's value.

Practically, as we call Fruit.new('oranges'), `@@categories` will be set to 1, but the change is perpetuated across all classes, and so on, until `@@categories` will become 5 for all three classes.
Remember, we said we will not instantiate the Shop class at all? Well, inserting this piece of code in our test `puts "Shop product categories: #{Shop.categories}"` we are expecting to return 0. Well, surprise! Looks like we have 5 shop categories...

You can find the full code with the failing test on this [branch](https://github.com/iacobson/ruby_class_variables/tree/class-variable).

So, what's to be done?

## Introducing the Class Instance Variables

Looks like in the Ruby world, the class variables issues are very well known, this is why it is recommended to be used with prudence. Even the static code analyzer [Rubocop](https://github.com/bbatsov/rubocop) will imediatly "advise" you to replace the class variable with a class instance variable.

At first, the class instance variable may seem confusing, as it looks exactly like a normal `@instance_variable`, and in a way it is just that. The only "trick" is that this variable is set in a class method, so the variable will be available at class level, not at instance level.

Let's refactor the previous code, using the class instance variable:

<div class="file_path">./shop.rb</div>
```ruby
class Vegetable < Shop
  @categories = 0

  def self.categories
    @categories
  end

  def self.count
    @categories += 1
  end

  def initialize(category)
    @category = category
    Vegetable.count
  end
end
```
`@categories` will be our new class instance variable. `categories` is a class method, so we can call `Vegetable.categories`. Also, each time we instantiate an object we call the class method `count` and our `@categories` will be updated.

If we change all our 3 classes following this pattern, our tests will pass. Each class will have its own distinct `Class.categories` available.

We can go one step further with the refactoring and eliminate completely the class methods, and make everything more clear and concise:

<div class="file_path">./shop.rb</div>
```ruby
class Vegetable < Shop
  @categories = 0

  class << self
    attr_accessor :categories
  end

  def initialize(category)
    @category = category
    Vegetable.categories += 1
  end
end
```
This way we make the `categories` available at class level directly with the `attr_accessor`.

The final code is available on this [branch](https://github.com/iacobson/ruby_class_variables/tree/class-instance-variable).

## Conclusion

Used with caution, the class variables may be a quick and easy way to solve some class related problems, especially on simple, individual projects, where you have full control over the development process.  
As your code base or team is growing, so is the complexity of the project. In such case it may be wiser to follow the safe way and use the class instance variables wherever you will need to declare class related variables.
