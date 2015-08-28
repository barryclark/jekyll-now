---
layout: post
category: programming
title: Building a Rails API part 2. Unit Testing Models and Bottles.
tags: Programming
excerpt: In part 2 of this tutorial, we will be testing our models and building out our models and associations between them.
---

## Unit Testing with Minitest, Debugging, Using the Pry gem, ActiveRecord Validations

If you've never used pry or a debugger before... this is going to be a treat.

#### Instructions

The order of this tutorial:

1. setting-up-rails-api
2. **unit-testing-models-and-bottles.**
3. creating-api
4. testing-api
5. serialize-dat-suya

If you are unfamiliar with Rails, start at the beginning. If you are somewhat familiar with Rails, switch to the branch creating-api on Github and start there.

Simply switch to a branch and follow the README.

If you just starting here to learn about model testing, git clone [this branch](https://github.com/Jwan622/rails-api-practice/tree/2-unit-testing-models-and-bottles) and use that as your starting code base.

If you're stuck, ask StackOverFlow or skip to the next branch and take a look at that code base. The next branch's code should be this branch at its completed state.

## Let's Learn how to write Unit Tests

**What are Unit Tests?**

From Wikipedia:
> "Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation."

**How do we test our units in Rails?**  

From [Unit Tests from the Rails Guides](http://guides.rubyonrails.org/testing.html#unit-testing):
> "In Rails, models tests are what you write to test your models....The default test stub in test/models/article_test.rb looks like this:
>
> ```ruby
> require 'test_helper'
>
> class ArticleTest < ActiveSupport::TestCase
>  # test "the truth" do
>  #   assert true
>  # end
> end
> ```
> A line by line examination of this file will help get you oriented to Rails testing code and terminology.
>
> require 'test_helper'  
> As you know by now, test_helper.rb specifies the default configuration to run our tests. This is included with all the tests, > so any methods added to this file are available to all your tests.

> class ArticleTest < ActiveSupport::TestCase  
> The ArticleTest class defines a test case because it inherits from ActiveSupport::TestCase. ArticleTest thus has all the
> methods available from ActiveSupport::TestCase. You'll see those methods a little later in this guide.
>
> Any method defined within a class inherited from Minitest::Test (which is the superclass of ActiveSupport::TestCase) that
> begins with test_ (case sensitive) is simply called a test. So, test_password and test_valid_password are legal test names
> and are run automatically when the test case is run.

> Rails adds a test method that takes a test name and a block. It generates a normal Minitest::Unit test with method names
> prefixed with test_. So,
>
> ```ruby
> test "the truth" do
>  assert true
> end
> ```
> acts as if you had written

> ```ruby
> def test_the_truth
>   assert true
> end
> ```
> only the test macro allows a more readable test name. "

So, we're going to write some model tests because they are our unit tests that will test the models in our application.

#### Instructions

1. So remember when we generated our models, it also generated some model tests. Find the test files in our test/models folder and let's open the vendor_test.rb. Notice how Rails appends \_test to the model name.

2. So notice how the test classes inherit from ActiveSupport::TestCase which includes Minitest::Assertions, which allows
    us to use minitest assertions in our tests. Remember that:

    > Any method defined within a class inherited from Minitest::Test (which is the superclass of ActiveSupport::TestCase) that begins with test_ (case sensitive) is simply called a test. So, test_password and test_valid_password are legal test names and are run automatically when the test case is run.

    > Rails adds a test method that takes a test name and a block. It generates a normal Minitest::Unit test with method names prefixed with test_.

3. Let's write our first test:

    ````ruby
    test "A vendor is valid with a name" do
      vendor = Vendor.create(name: "Jeff")

      assert vendor.valid?
      refute vendor.invalid?
    end
    ````

    So what is all of this? Why do we test? What is the point of this?
    Well, in my opinion, testing serves two purposes:
    * it serves as documentation for your code. Tests make it very clear to your reader what your app is supposed to do and not do.
    * You have a way to verify your app still works even after you make massive changes. Sometimes, changes to your app may break your app and so you want to have tests to ensure that you didn't break your app unexpectedly.

    In this case, all that we're testing in this case is that a Vendor that we create with a name of "Jeff" is valid. You should have some questions right now like:  
    * What does the create method do?  
    * What does the valid? method do?
    * What is assert?

    create method:  
    [create](http://guides.rubyonrails.org/active_record_basics.html#create)

    valid? method:  
    [valid](http://api.rubyonrails.org/classes/ActiveRecord/Validations.html)
    The important thing is that an ActiveRecord object is valid if it has no errors. If there are no errors in the object, object.valid? returns true and object.errors.messages should be empty. If an object is valid, only then can it be saved to the database via object.save.

    assert? method (from Minitest):  
    [assert](http://ruby-doc.org/stdlib-2.0.0/libdoc/minitest/rdoc/MiniTest/Assertions.html#method-i-assert)

    After we finish writing the test, run this in terminal:

    ```Bash
    rake
    ```

    It passes and you will see this in terminal:

    ```Bash
    # Running:

    .

    Finished in 0.040551s, 24.6602 runs/s, 49.3205 assertions/s.
    ```

    The two dots you see (1 of them as after assertions) means that both your assert and refute passed. The tests pass because the vendor is valid and the vendor is not invalid.

    So in this test, we have a variable called vendor and we set it to a Vendor object which is created with the create method which both instantiates a new Ruby object with attributes that are determined from the model's table and then saves it to the database using some ActiveRecord ORM magic. Think of the "create" method as a combination of the "new" method and the save method in ActiveRecord. Here's a quote about the "new" method:

    > New objects can be instantiated as either empty (pass no construction parameter) or pre-set with attributes but not yet saved (pass a hash with key names matching the associated table column names). In both instances, valid attribute keys are determined by the column names of the associated table — hence you can‘t have attributes that aren‘t part of the table columns

    Since there are no validations, we successfully create a vendor (new + saved to database), and vendor is by definition valid (since it saved to the database, it had no errors. An object can only be saved to the database if it's valid/has no errors. So, since it saved successfully to the database as a result of the create method, it is valid.)

    Points to remember and takeaways:
    * You can save an object to the database only if it's valid.
    * An object is valid if it has no errors.
    * An object has no errors if object.errors.messages is empty.
    * an object has errors if it fails validations.
    * You can call Model.new to create a new object whose attribute names are the columns in its related table.
    * however, after object = Model.new, you cannot call object.save unless object.errors.messages is empty.

    Lastly,
    * tests that begin with assert only pass if the argument provided is truthy (anything but false or nil).
    * tests that begin with refute only pass if the argument provided is falsey (false or nil).

2. Let's write a second test. Let's test that a vendor is not valid without a name:  
    Here is the test:

    ```ruby
    test "a vendor is not valid without a name" do
      vendor = Vendor.create(name: "Jeff")
      vendor.name = nil
      vendor.save

      assert vendor.invalid?
      refute vendor.valid?
    end
    ```

    In terminal, run:
    ```Bash
    rake
    ```

    So this test fails right now. You'll see a failure on the line with the "assert" in it. Why? Well currently, vendor is valid even if we set the name to nil. Believe me? You shouldn't. Let's see for yourself using pry.

    In your Gemfile (at the parent level of your app, at the bottom), add:
    ```ruby
    gem 'pry'
    ```

    Let's debug like a boss.  
    After you add the pry gem, run this in your terminal:  
    ```Bash
    bundle
    ```

    Then, add this "require 'pry';binding.pry" line to your test:  
    ```ruby
    test "a vendor is not valid without a name" do
      vendor = Vendor.create(name: "Jeff")
      vendor.name = nil
      vendor.save
      require 'pry'; binding.pry
      assert vendor.invalid?
      refute vendor.valid?
    end
    ```

    Then, run this in your terminal:
    ```Bash
    rake
    ```

    You should stop at that binding.pry in your terminal. Your terminal should look like:

    > From: /Users/Jwan/Dropbox/programming/andela/api_rails_tutorial/test/models/vendor_test.rb @ line 14   VendorTest#test_a_vendor_is_not_valid_without_a_name:

    > 10: test "a vendor is not valid without a name" do  
      11:   vendor = Vendor.create(name: "Jeff")  
      12:   vendor.name = nil  
      13:   vendor.save  
    > 14:   require 'pry' ; binding.pry  
      15:   assert vendor.invalid?  
      16:   refute vendor.valid?  
      17: end  

    > [1] pry(#<VendorTest>)>

    Type in your terminal:

    > vendor

    then hit enter. What do you see? It looks like an object. Because of pry, you have access to all the variables in your current binding, which includes vendor. It evaluates the variable vendor in the context of the current binding.

    Type in your terminal:

    > vendor.errors

    What do you see?

    Type in:

    > vendor.errors.messages.empty?

    What does empty? do? Look it up.  
    This returns true so vendor is valid.

    Type in:

    > vendor.valid?

    What do you see? Since it's valid, our test testing that it is invalid will fail.

    It fails because:

    > vendor.save

    returns true because:

    > vendor.errors.empty?

    is true.

    Let's get our tests to pass. In terminal, type:
    ```Bash
    exit
    ```
    So how do we get test 2 to pass. We need to add some validations which are like restrictions on the model that have to be passed before an object can be saved to the databaes.  
    Open up your app/models/vendor.rb file and let's add some validations.

    Inside the Vendor class, type in:

    ```ruby
    validates :name, presence: true
    ```

    Read this:  
    [presence](http://guides.rubyonrails.org/active_record_validations.html#presence)

    [saving to database](http://guides.rubyonrails.org/active_record_validations.html#when-does-validation-happen-questionmark)
    > When you create a fresh object, for example using the new method, that object does not belong to the database yet. Once you call save upon that object it will be saved into the appropriate database table.

    [valid? or invalid?](http://guides.rubyonrails.org/active_record_validations.html#valid-questionmark-and-invalid-questionmark)
    > valid? triggers your validations and returns true if no errors were found in the object, and false otherwise.

    Remove the require 'pry';binding.pry line and run your tests again.

    In terminal now, type:
    ```Bash
    rake
    ```

    Now your tests should pass because:

    ```ruby
    assert vendor.invalid?
    ```

    in the second test now passes.

5. Make these tests pass, add them to your test/models/vendor_test.rb file:  

    ```ruby
    # this is your vendor_test.rb file
    require 'test_helper'

    class VendorTest < ActiveSupport::TestCase
      test "A vendor is valid with a name" do
        vendor = Vendor.create(name: "Jeff")
        assert vendor.valid?
        refute vendor.invalid?
      end

      test "a vendor is not valid without a name" do
        vendor = Vendor.create(name: "Jeff")
        vendor.name = nil
        vendor.save

        refute vendor.errors.empty?
        assert vendor.invalid?
        refute vendor.valid?
      end

      test "a vendor is not valid without name, using new method" do
        vendor = Vendor.new(name: nil)

        assert vendor.invalid?
        refute vendor.valid?
      end

      test "a vendor can have a name that is between 2 and 20 characters long" do
        vendor1 = Vendor.create(name: "a")
        vendor2 = Vendor.create(name: "four")
        vendor3 = Vendor.create(name: "ThisNameIsThirtyLength30303030")

        assert vendor1.invalid?
        assert vendor3.invalid?
        assert vendor2.valid?
      end

      test "vendors have to have unique names" do
        vendor1 = Vendor.create(name: "jeff")
        vendor2 = Vendor.new(name: "jeff")

        vendor1.valid?
        vendor2.invalid?
      end

      test "a vendor can have many suyas" do
        vendor = Vendor.create(name: "Jeff")
        beef_suya = Suya.create(meat: "beef", spicy: true)
        kidney_suya = Suya.create(meat: "kidney", spicy: false)

        vendor.suyas << beef_suya
        vendor.suyas << kidney_suya

        assert_equal 2, vendor.suyas.count
      end

      test "a vendor can have many suyas, another way with arrays" do
        vendor = Vendor.create(name: "Jeff")
        beef_suya = Suya.create(meat: "beef", spicy: true)
        kidney_suya = Suya.create(meat: "kidney", spicy: false)

        vendor.suyas = [beef_suya, kidney_suya]

        assert_equal 2, vendor.suyas.count
      end
    end

    ```

    So, the test "a vendor can have many suyas is a bit tricky".

    The relationship that we want to model is that a vendor has many suyas, but a suya belongs to a vendor. We are going to make the assumption that a suya cannot have many vendors... it belongs to only one vendor!

    How do we do this?

    I like doing it this way:

    In terminal, type:

    ```Bash
    rails g migration AddVendorsIdColumnToSuyas
    ```

    In the migration, type:

    ```ruby
    def change  
      add_column :suyas, :vendor_id, :integer  
      add_index :suyas, :vendor_id  
    end  
    ```

    Run:

    ```Bash
    rake db:migrate
    ```

    Now open up your schema. You now have a column in your suyas table that is called vendor_id. This allows you to specify a vendor for every suya which models the "belongs to" relationship for suyas while still allowing vendors to have many suyas. Imagine 10 rows in the suyas table which implies 10 different suyas. Each one of those rows has the number 1 in teh vendor_id column. This would imply that vendor number 1 has 10 suyas and each suya belongs to vendor number 1. Got it?

    Look up what indexing is on a rails column.
    [indexing][https://tomafro.net/2009/08/using-indexes-in-rails-index-your-associations]
    We add an index to this vendor_id column because we'll constantly be looking up suyas using this column and this increases the speed of the lookup.

    Open up your app/models/vendor.rb file and add this line:

    ```ruby
    class Vendor < ActiveRecord::Base  
      has_many :suyas  

      validates :name, presence: true  
    end  
    ```

    Now open up your suys.rb file and add this:

    ```ruby
    class Suya < ActiveRecord::Base  
      belongs_to :vendor  
    end  
    ```

    That's how we model this relationship in rails. This gives us the ability to call methods like

    ```ruby
    vendor.suyas
    ```

    to look up all the suyas for a specific vendor. and this code:

    ```ruby
    suya.vendor
    ```

    to look up the vendor associated with a suya.


    Lastly, if the test "a vendor can have many suyas" is still failing because kidney_suya isn't saving, look into the problem. Basically, false values are considered blank and so you may need to validate the spicy field with this code:

    ```ruby
    validates :spicy, :inclusion... (something goes here that I'm not going to tell you)
    ```


6.  Now add this to your suya_test.rb file.

    ```ruby
    require 'test_helper'

    class SuyaTest < ActiveSupport::TestCase
      test "suya is valid with a meat and spicy" do
        suya = Suya.new(meat: "beef", spicy: true)

        assert suya.valid?

        suya.save

        assert_equal 1, Suya.count
      end

      test "suya is not valid without a meat" do
        suya = Suya.new(meat: nil, spicy: true)

        assert suya.invalid?
        refute suya.valid?
      end

      test "suya is not valid without a spiciness level" do
        suya = Suya.new(meat: "beef", spicy: nil)

        assert suya.invalid?
      end

      test "suya belongs to a vendor" do
        vendor = Vendor.create(name: "jeff")
        suya = Suya.create(meat: "beef", spicy: true)

        suya.vendor = vendor

        refute suya.vendor.blank?
        assert_equal "jeff", suya.vendor.name
      end
    end

    ```

    So I changed the "type" column in the suyas table to "meat". "type" is a keyword in Rails and so you are unable to make a table whose column name is "type". Lets change our tables with a new migration file (again, a file that tells Rails how to incrementally change its database structure.)

    In terminal, type:

    ```Bash
    rails g migration ChangeTypeInSuyas
    ```

    Open up the migration file and make it look like this:
    ```ruby
    class ChangeColumnTypeInSuyas < ActiveRecord::Migration
      def change
        rename_column :suyas, :type, :meat
      end
    end
    ```

    Then migrate again in terminal:

    ```Bash
    rake db:migrate
    ```


    Now try making the following tests pass:

    ```Bash
    rake
    ```

    You'll now see that Rails is trying to insert data into the suyas table but it's trying to insert data with with a "type" still. Where is that coming from and why is that happening?

    The answer is that when you ran:

    ```Bash
    rails g model Model
    ```

    it created fixture files which are test objects that are created when the tests are run with the rake command. They are old and outdated and were not updated when we ran the migration that changed the suyas table. So, let's delete them.

    Delete the files in test/fixtures. They are called suyas.yml and vendors.yml.

    Now you can start making your suyas tests pass. Make them pass. Use pry often. Good luck. Check our my code if you need to. If you see errors, google them.
