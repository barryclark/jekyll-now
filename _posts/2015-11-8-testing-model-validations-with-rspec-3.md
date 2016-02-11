---
layout: post
title: Testing model validations with RSpec 3+
excerpt: "There are certainly many ways that Rails model validations can be tested. You can find three of them in this article."
---

There are many ways of testing a Rails model validations. Let's explore a few of them. We will test a very simple `Books` model, that requires to have a title:

```ruby
class Book < ActiveRecord::Base
  validates :title, presence: true
end
```
Before we start testing, plese consider that the RSpec version used for the following tests is 3.1.0.

Ok, now let's begin the tests. First you'll want to make sure that we can create the a book, and we have no errors in our code, so in our `book_spec.rb` we can test with:

```ruby
describe "book" do
    it 'creates a new book with valid info' do
      Book.create(title: "Test Book")
      expect(Book.last.title).to eq("Test Book")
    end
  end
```

Now we can think about a few methods to test our `title` validation:

### The `invalid` method

```ruby
describe "title" do
  it "is required" do
    book = Book.new(title: "")
    expect(book).to be_invalid
    # also working with:
    # expect(book).not_to be_valid
  end
end
```

While this will pass, verifying that our title is indeed needed in order to create a book, the test itself. For example, if we have more validators for the Book, we are not sure that our `book` is invalid because of the `title`.

### The `error_on` method

The `error_on` will solve the above issue:

```ruby
describe "title" do
  it "is required" do
    book = Book.new(title: "")
    expect(book).to have(1).error_on(:title)
  end
end
```

This way we are targeting the attribute `title` as well as the number of errors generated. Please mind that this test uses the `collection_matchers` module that is now separated of RSpec core. You will need to add the `gem 'rspec-collection_matchers'` in the **Gemfile** and `require 'rspec/collection_matchers'` in the **spec_helper.rb**.

### The `shoulda` gem
Add `gem 'shoulda'` in the **Gemfile**, `require 'shoulda'` in the **spec_helper.rb**, and then write your shoulda test:

```ruby
describe "title" do
  it { should validate_presence_of(:title) }
end
```
And that's it. The test will pass.

Personally I like the shoulda gem, but considering it was created for Rails 3 and not updated in years, maybe the 2nd option is safer.
