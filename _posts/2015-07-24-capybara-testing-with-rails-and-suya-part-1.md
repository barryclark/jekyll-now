---
layout: post
category: programming
title: Capybara testing with Rails. Part 1.
tags: Programming
excerpt: In part 1 of this tutorial, we will go over the multiple ways we can test in Rails. The focus will be on Capybara testing with some more complex unit testing. Once again, Suya and Vendors will be our focus.
---

## Testing In Rails with Capybara

In this tutorial, we will go over the multiple ways we can test in Rails. The focus will be on Capybara testing with some more complex unit testing.

As always, Suya and Vendors will be our focus.

#### Instructions.

This branch is on capybara testing, and TDD. We will start with some high-level user stories and drop down to the models when necessary. We will see how our tests will drive our development in action.

Good luck! If you have any questions, feel free to contact me.

This tutorial is written by:
[Jeffrey Wan](https://www.linkedin.com/pub/jeffrey-wan/18/23/a1b)

#### Some terminology and explanations of tools we'll be using

Feature tests:  

    > Feature specs, a kind of acceptance test, are high-level tests that walk through your entire application
    ensuring that each of the components work together. They’re written from the perspective of a user clicking around
    the application and filling in forms. We use RSpec and Capybara, which allow you to write tests that can interact
    with the web page in this manner.

From the thoughtbot guide:  

[Thoughtbot on Integration Testing](https://robots.thoughtbot.com/rspec-integration-tests-with-capybara)  

> When writing integration tests, try to model the test around an actor (user of the system) and the
action they are performing.

Here is an example RSpec feature test:

```ruby
 # spec/features/user_creates_a_foobar_spec.rb

  feature 'User creates a foobar' do
    scenario 'they see the foobar on the page' do
      visit new_foobar_path

      fill_in 'Name', with: 'My foobar'
      click_button 'Create Foobar'

      expect(page).to have_css '.foobar-name', 'My foobar'
    end
  end
```

What is this test doing? Well read it slowly and you'll realize it makes sense. The test emulates a user visiting the new foobar form, filling it in, and clicking “Create Foorbar”. The test then asserts that the page has the text of the created foobar where it expects it to be.

We'll be using Capybara to create our integration/feature tests. Read about it here:

[Capybara Gem](https://github.com/jnicklas/capybara)  
> Capybara helps you test web applications by simulating how a real user would interact with your app.

[Capybara docs](https://www.relishapp.com/rspec/rspec-rails/docs/feature-specs/feature-spec)  
> Feature specs are high-level tests meant to exercise slices of functionality
through an application. They should drive the application only via its external
interface, usually web pages.Feature specs are marked by :type => :feature or if you have set
config.infer_spec_type_from_file_location! by placing them in spec/features. Feature specs require the Capybara gem...

[Capybara Rspec matchers](https://gist.github.com/them0nk/2166525)  
These are methods you'll be using in your rspec feature tests w/ Capybara.

#### Let's begin.

1. Do not clone this branch. Just follow the instructions below.

2. **Create a new app:**  
    ```ruby
    rails new capybara_rails_tutorial -T # The -T option tells rails not to include Test::Unit
    ```

    We will be using Rspec.

    **Include this in the Gemfile:**

    ```ruby
    gem 'rspec-rails'
    ```

    **At the command line:**
    ```ruby
    bundle install
    rails g rspec:install
    ```

    The above command adds the following files:  
    > .rspec  
    spec/spec_helper.rb  
    spec/rails_helper.rb  

3. Let's make an integration test. When a user visits the vendors_path, the user will see vendors and their suya on the main page of this app. Let's make a test for this.

    First thing's first, let's install capybara and rspec in our app. Add this line to our Gemfile:

    ```ruby
    gem 'capybara'
    ```

    Run this in terminal:

    ```Bash
    bundle install
    ```

    Now let's generate a Rspec feature test for our main vendors page using a rails generator:

    ```ruby
    rails g rspec:feature vendors
    ```

    This command creates an rspec test in our spec/features folder. Take a look at it and notice the type: :feature at the top. This test is our first high-level test that will guide our user-interactions on this app. As we will see, these high-level tests sometimes will require a lot time to get through since it will likely require us to drop down to a lower-level and develop models, all of which will need their own tests.

    Let's write our test. Write this test in spec/features/vendor_spec.rb

    ```ruby
    require 'rails_helper'

    RSpec.feature "Vendors", type: :feature do
      scenario "the vendors index page can show all of the vendors" do
        Vendor.create(name: "jeff")
        Vendor.create(name: "ikem")
        Vendor.create(name: "nad")

        visit vendors_path

        expect(page).to have_selector("h1", text: "Vendors And Their Suyas")
        expect(page).to have_content("jeff")
        expect(page).to have_content("ikem")
        expect(page).to have_content("nad")
        expect(page).to have_selector("div.vendor", count: 3)
      end
    end
    ```

    To sum up our test in English... if there are 3 vendors in our test database and a user visits the vendors_path or vendors/index page, the page will have content "jeff", it will have content "ikem", and it will have content "nad", and it will also have 3 p tags with the class vendor. It will also have an h1 tag with the text: "Vendors And Their Suyas". I like using have_selector when I want to be more specific where certain text lies on the page or if I want to simply count the number of selectors present.

3. Let's run our tests and get them to pass: (From here on our, "running our tests" or "rerun our tests" means to type the following in terminal.)

    ```Bash
    bundle exec rspec
    ```

    This should be our error:

    ```Bash
    1) Vendors the vendors index page can show all of the vendors
     Failure/Error: Vendor.create(name: "jeff")
     NameError:
       uninitialized constant Vendor
     # ./spec/features/vendors_spec.rb:5:in `block (2 levels) in <top (required)>'
    ```

    Our test is telling us that we do not have a class Vendor. The class is our constant. So, we need to create a Vendor class. Let's also create a name attribute for our Vendor class. But first, in the true spirit of BDD and TDD, let's create a test for this model that we're about to create.

    ```Bash
    rails g rspec:model Vendor
    ```

    And now in our spec/models/vendor_spec.rb file, write this simple test:

    ```ruby
    it "exists and has a name" do
      jeff = Vendor.create(name: "jeff")

      assert jeff
      assert_equal "jeff", jeff.name
    end
    ```

    Run the test and it should fail. We don't have a Vendor model. Let's correct the error by creating a model.

    ```Bash
    rails g model Vendor name:string
    ```

    Do not overwrite the test! We created the test first as per TDD patterns. Just hit "n" when asked to overwrite the test.

    Then migrate our database (since that generator creates a migration. From here on out, migrating means to run this command:)

    ```Bash
    rake db:migrate
    ```

    Rerun our tests and we should see this error:

    ```Bash
    Vendors the vendors index page can show all of the vendors
      Failure/Error: visit vendors_path
      NameError:
        undefined local variable or method `vendors_path' for #<RSpec::ExampleGroups::Vendors:0x007fabddbbcb60>
     # ./spec/features/vendors_spec.rb:9:in `block (2 levels) in <top (required)>'
    ```

    So now let's follow our error message and create the path variable vendors_path in our config/routes.rb file. All of our routes should be defined here.

    ```ruby
    Rails.application.routes.draw do
      get '/vendors', to: 'vendors#index', as: 'vendors'
    end
    ```

    This above code means that anytime we visit the /vendors url, the controller action that will be hit will be vendors#index and the name of this path is vendors_path. The as: option tells us we can refer to this path internally with vendors_path which when called, will hit vendors#index in the controller.

    Read more about the as: option here:
    [:as option in routes](http://guides.ruby.org/routing.html#naming-routes)

    If you want to see your routes, type this in terminal:

    ```Bash
    rake routes
    ```
    Read your terminal output.

    The prefix column is what you prepend to \_path to obtain your path variable.
    Rerun the tests and this should be your next error:

    ```Bash
    Vendors the vendors index page can show all of the vendors
     Failure/Error: visit vendors_path
     ActionController::RoutingError:
       uninitialized constant VendorsController
    ```

    The above states that the failure/error occurs on visit vendors_path. There's an error. No Vendors controller huh? Let's fix by typing this in terminal:

    ```Bash
    rails g controller Vendors index
    ```

    The above code uses a Rails generator to create a Vendors controller with an index action.

    Rerun our tests and this should be your next error:

    ```Bash
    Vendors the vendors index page can show all of the vendors
     Failure/Error: expect(page).to have_content("jeff")
       expected to find text "jeff" in "Vendors#index Find me in app/views/vendors/index.html.erb"
    ```

    So, if we strictly followed TDD, we could just make our app/views/vendors/index.html.erb read just this:

    ```html
    <p>
      jeff
    </p>
    ```

    But let's make a more dynamic template:

    First, let's send over to our template a collection of vendors. In our controller, let's write:

    ```ruby
    class VendorsController < ApplicationController
      def index
        @vendors = Vendor.all
      end
    end
    ```

    The code inside the index method gets all the vendors and assigns them to @vendors which the view will have access to. How does the html.erb view have access to the controller's instance variable? What magic is that? Google that question but here's the best response I found:
    > The explanation is that @title is an instance variable and title is a local variable and rails makes instance variables from controllers available to views. This happens because the template code (erb, haml, etc) is executed within the scope of the current controller instance.

    If you want to better understand what views Rails renders after a controller action, read this:  
    [Layouts and Rendering](http://guides.ruby.org/layouts_and_rendering.html)  
    [Instance variables are made available in views](http://stackoverflow.com/questions/8528411/how-are-instance-variables-in-controllers-made-available-to-views-in-rails)  

    In our index.html.erb view, we can type this:

    ```html
      <h1> Vendors And Their Suyas</h1>

      <div class="vendors">
        <% @vendors.each do |vendor| %>
          <div class="vendor"><%= vendor.name %></div>
        <% end %>
      </div>
    ```
    Rerun your tests and now all tests should now pass. Hurray!

    #### Read your RSpec error messages practice.
    If you want to see Rspec error messages, change your first expectation in the feature test and singularize "Vendors" to create a failure:

    ```ruby
    expect(page).to have_selector("h1", text: "Vendors And Their Suyas")
    ```

    Rerun your tests and you should see:

    ```Bash
    Failure/Error: expect(page).to have_selector("h1", text: "Vendor And Their Suyas")
       expected to find css "h1" with text "Vendor And Their Suyas" but there were no matches. Also found "Vendors And Their Suyas", which matched the selector but not all filters.
    ```

    which is a very descriptive error message!  

    If you have any pending view or helper tests, feel free to delete that code.

4. Let's write another feature test with capybara inside your spec/features/vendors_spec.rb

    ```ruby
    scenario "the vendors index page can show the vendors' suyas" do
      jeff = Vendor.create(name: "jeff")
      ikem = Vendor.create(name: "ikem")
      jeff.suyas << Suya.create(meat: "beef", spicy: false, price: 400)
      jeff.suyas << Suya.create(meat: "ram", spicy: true, price: 410)
      ikem.suyas << Suya.create(meat: "beef", spicy: true, price: 200)
      ikem.suyas << Suya.create(meat: "liver", spicy: true, price: 210)
      ikem.suyas << Suya.create(meat: "ram", spicy: false, price: 220)

      visit vendors_path

      within("div.vendor", text: "jeff") do
        expect(page).to have_selector("li.suyas", count:2)
      end
      within("div.vendor", text: "ikem") do
        expect(page).to have_selector("li.suyas", count:3)
      end
      expect(page).to have_selector("li.suyas", count: 5)
    end
    ```

    So writing this test first in the spirit of TDD does a lot of interesting things for us. First, it's the first time that we define a Suya model. We still do not have a Suya model or Vendor-to-Suya association. But this test is where we decide that we should have an association between Vendors and suyas. I like calling TDD dream-testing. It allows you to write what your dream version or ideal version of this app should be. Since the tests are often more abstract and high level, we can do a lot of our app-planning while writing the test.

    The setup of this feature/integration test requires us to create an association (vendor has many suyas). This will require us to drop down and write a lower level unit/model test for Suya and Vendors.

    In addition to driving our development in our models and association, this test also further drives our main index.html.erb view. We also decide in our test that there should be some kind of breakdown of our view that separates the different vendors into different segments of the page. In our test, we also decide that the suyas should be listed as list items with a class of "suyas".

5. Let's start getting these tests to pass.

    Run our tests and our first message should now be:

    ```Bash
    Failure/Error: jeff.suyas << Suya.create(meat: "beef", spicy: false, price: 400)
     NoMethodError:
       undefined method `suyas' for #<Vendor:0x007fd7562f25d0>
    ```

    So, let's create a Suya model where a suya belongs to a Vendor and a Vendor has_many suyas.

    Before we create the model, let's drop down a level and create a unit test for Suya.

    ```Bash
    rails g rspec:model Suya
    ```

    And in that file, type:

    ```ruby
    it "exists" do
      suya = Suya.create

      assert suya
    end
    ```

    Run our tests, we should get:

    ```Bash
    suya_spec.rb:3:in `<top (required)>': uninitialized constant Suya (NameError)
    ```

    To fix that, let's generate a Suya model:

    ```Bash
    rails g model Suya
    ```

    Run our tests, we should now pass.

    Our next test in suya_spec.rb:

    ```ruby
    it "is invalid without meat" do
      suya = Suya.create(meat: nil)

      refute suya.valid?
    end
    ```

    Run our tests, we should still have 3 errors, two of which are still our high-level feature test and one of them is:

    ```Bash
    Suya is invalid without meat
    Failure/Error: suya = Suya.create(meat: nil)
    ActiveRecord::UnknownAttributeError:
      unknown attribute 'meat' for Suya.
    ```

    So our test fails because we cannot create a Suya with a "meat" attribute. We need to create a meat attribute using a migration. So let's create a migration with a special kind of helper migration that automatically adds the add_column command in the migration.

    ```Bash
    rails g migration AddMeatToSuyas meat:string
    ```

    Our last migration inside db/migrate should look like:

    ```ruby
    class AddMeatToSuyas < ActiveRecord::Migration
      def change
        add_column :suyas, :meat, :string
      end
    end
    ```

    Migrate your database with:

    ```Bash
    rake db:migrate
    ```

    And rerun your tests. Our new error should be:

    ```Bash
    Suya is invalid without meat
     Failure/Error: refute suya.valid?
     Minitest::Assertion:
       Failed refutation, no message given
    ```

    Add this to our suya.rb file:

    ```ruby
    validates :meat, presence: true
    ```

    Rerun our tests. And we should now only have 2 failing tests.

    Let's now create unit/model tests that require our suya to have a spicy attribute and a price attribute.

    Our extra tests:

    ```ruby
    it "is invalid without spicy which is a boolean" do
      suya1 = Suya.create(meat: "beef", spicy: nil)
      suya3 = Suya.create(meat: "beef", spicy: false)
      suya4 = Suya.create(meat: "beef", spicy: true)

      expect(suya1.invalid?).to be_invalid?
      expect(suya3).to be_valid
      expect(suya3).to be_valid
    end

    it "is invalid without a price which is an integer" do
      suya1 = Suya.create(meat: "beef", spicy: true, price: "a")
      suya2 = Suya.create(meat: "beef", spicy: true, price: 10.24)
      suya3 = Suya.create(meat: "beef", spicy: true, price: 10)
      suya4 = Suya.create(meat: "beef", spicy: true, price: nil)

      assert suya1.invalid?
      assert suya2.invalid?
      assert suya3.valid?
    end
    ```

    Rerun our tests, we should see this error:

    ```ruby
    Suya is invalid without spicy which is a boolean
     Failure/Error: suya1 = Suya.create(meat: "beef", spicy: nil)
     ActiveRecord::UnknownAttributeError:
       unknown attribute 'spicy' for Suya.
    ```

    Let's fix that error with a migration

    ```Bash
    rails g migration AddSpicyToSuyas spicy:boolean
    ```

    Then re-migrate with

    ```Bash
    rake db:migrate
    ```

    Rerun your tests and you should see this error:

    ```Bash
    Failure/Error: suya1 = Suya.create(meat: "beef", spicy: true, price: "a")
     ActiveRecord::UnknownAttributeError:
       unknown attribute 'price' for Suya.
    ```

    Fix that error by creating a price column for Suyas. Let's make the price column an integer column and just assume for now that we're dealing with prices that do not have cents.

    ```Bash
    rails g migration AddPriceToSuyas price:integer
    ```

    Re-migrate. You know how.

    Rerun your tests. You should now have an error from our feature/integration test and two errors from suya_spec.rb. Let's fix the suya_spec errors first. This is one of the errors from suya_spec.rb

    ```Bash
    Suya is invalid without spicy which is a boolean
     Failure/Error: expect(suya1).to be_invalid
       expected `#<Suya id: 1, created_at: "2015-07-21 09:38:14", updated_at: "2015-07-21 09:38:14", meat: "beef", spicy: nil, price: nil>.invalid?` to return true, got false
    ```

    So in our test, suya1 is not invalid since we did not say that a nil value in the spicy column was not allowed. Therefore, the suya1 object is valid still and therefore the test fails since we're testing for invalidness. We can fix that by adding a validation to our Suya model. Let's add this line:

    ```ruby
    validates :spicy, inclusion: [true, false]
    ```

    Rerun our tests and one failure should be fixed.

    This is our remaining spec error:

    ```Bash
    Suya is invalid without a price which is an integer
     Failure/Error: assert suya1.invalid?
     Minitest::Assertion:
       Failed assertion, no message given.
    ```

    It fails because suya1 has a price which is the string "a", but it is still valid and so the test which asserts invalidity fails.

    Let's fix that failure by adding this line to suya.rb:

    ```ruby
    validates :price, numericality: true
    ```

    But now we have two errors again in suya_spec.rb! This is because our other tests which tested the spicy column did not include prices that were numbers. We need to fix those later. For now let's focus on the test which tests the price column.

    Rerun our tests and this should be our error:

    ```ruby
    Suya is invalid without a price which is an integer
     Failure/Error: assert suya2.invalid?
     Minitest::Assertion:
       Failed assertion, no message given.
    ```

    suya2 has a price which is a float. Our validation still allows for floats which we do not want. We can fix that by changing our model validation to this:

    ```ruby
    validates :price, numericality: { only_integer: true }
    ```

    This should fix our tests and now suya2 is invalid which passes our test. Rerun our tests and you should see that test of the price column now passes. Even suya4 which has price as nil should pass and be invalid since nil is not an integer number.

    We can fix our other tests for the spicy column easily by just changing the suya objects to include a valid price.

    ```ruby
    it "is invalid without spicy which is a boolean" do
      suya1 = Suya.create(meat: "beef", spicy: nil, price: 20)
      suya3 = Suya.create(meat: "beef", spicy: false, price: 40)
      suya4 = Suya.create(meat: "beef", spicy: true, price: 30)

      expect(suya1).to be_invalid
      expect(suya3).to be_valid
      expect(suya3).to be_valid
    end
    ```

    Rerun our tests and we should be good now except the high level tests.

6. Once again, our high-level test failures are this:

    ```Bash
    Vendors the vendors index page can show the vendors' suyas
     Failure/Error: jeff.suyas << Suya.create(meat: "beef", spicy: false, price: 400)
     NoMethodError:
       undefined method `suyas' for #<Vendor:0x007fc7c40ea900>
    ```

    This means that suyas isn't a method on the Vendor object. So let's fix this but first let's add a model test for vendor_spec.rb.

    In our spec/models/vendor_spec.rb, add:

    ```ruby
    it "can have many suyas" do
      jeff = Vendor.create(name: "jeff")
      jeff.suyas << Suya.create(meat: "beef", spicy: false, price: 300)
      jeff.suyas << Suya.create(meat: "beef", spicy: false, price: 320)

      assert_equal 2, jeff.suyas.count
    end
    ```

    Let's try to fix this by adding this line to app/models/vendor.rb:

    ```ruby
    class Vendor < ActiveRecord::Base
      has_many :suyas
    end
    ```

    Rerun our tests and our error should be:

    ```Bash
    Failure/Error: jeff.suyas << Suya.create(meat: "beef", spicy: false, price: 300)
     ActiveModel::MissingAttributeError:
       can't write unknown attribute `vendor_id`
    ```

    In order to setup an association between Suya and Vendor (We want a Vendor to have many suyas and a Suya to belong to a vendor, we need to setup a column in the suyas table that is a vendor_id column. This way, we can denote that a Suya can belong to a Vendor with an id of 1 for example. By adding a vendor_id column to the suyas table, each suya can have a vendor_id which suggests that a suya belongs to a vendor. This does not rule out the possibility that a vendor can have many suyas.)

    Let's add a migration:

    ```Bash
    rails g migration AddVendorIdToSuyas vendor:references
    ```

    In db/migrate, the last file with a bunch of numbers (a timestamp id) should read:

    ```ruby
    class AddVendorIdToSuyas < ActiveRecord::Migration
      def change
        add_reference :suyas, :vendor, index: true, foreign_key: true
      end
    end
    ```

    Re-migrate your files to change your schema.rb and database structure. Remember, just because you created a migration doesn't mean you changed your database. Run this in terminal:

    ```Bash
    rake db:migrate
    ```

    If we rerun our tests, the vendor_spec.rb test should now pass and we should now only have 1 error. However, let's add this line to suya.rb before we move on:

    ```ruby
    class Suya < ActiveRecord::Base
      belongs_to :vendor

      validates :meat, presence: true
      validates :spicy, inclusion: [true, false]
      validates :price, numericality: { only_integer: true }
    end
    ```

    The belongs_to method allows us to call suya.vendor on a suya object which will be helpful in the future and is generally good practice when you set up a has_many and belongs_to association.

7. Now let's focus on this high-level test that we wrote.

    So now our error in our high level test is merely this:

    ```Bash
    Vendors the vendors index page can show the vendors' suyas
     Failure/Error: expect(page).to have_selector("li.suyas", count:2)
       expected to find css "li.suyas" 2 times but there were no matches
    ```

    So if you were paying attention, the setup of our feature test where we setup associations seemed to have advanced on its own. Why? Well, it's because we now are passing through the setup of our feature test without problem. This is the setup of our feature test:

    ```ruby
    jeff = Vendor.create(name: "jeff")
    ikem = Vendor.create(name: "ikem")
    jeff.suyas << Suya.create(meat: "beef", spicy: false, price: 400)
    jeff.suyas << Suya.create(meat: "ram", spicy: true, price: 410)
    ikem.suyas << Suya.create(meat: "beef", spicy: true, price: 200)
    ikem.suyas << Suya.create(meat: "liver", spicy: true, price: 210)
    ikem.suyas << Suya.create(meat: "ram", spicy: false, price: 220)
    ```

    This is now not a problem because we took care of that when fixing our model tests. Remember, we encountered this association problem in our high level test, which caused us to drop down to our models which we wrote model/unit tests for and by passing them... we created associations between our vendor and suya models.

    Now we just have to create html list items. No problem.

    This is my new app/views/vendors/index.html.erb file:

    ```ruby
    <h1> Vendors And Their Suyas</h1>

    <div class="vendors">
      <% @vendors.each do |vendor| %>
        <div class="vendor">
          <%= vendor.name %>
          <% vendor.suyas.each do |suya| %>
            <li class="suyas"> I sell <%= suya.meat %> which costs <%= suya.price %>. Spicy: <%= suya.spicy %> %></li>
          <% end %>
        </div>
      <% end %>
    </div>

    ```

    Run our tests. Our tests now pass. That's how you TDD with Capybara.


#### Exploring Launchy Gem

Let's take a quick look at our app during our tests. We can do that by adding the launchy gem. This helps if you ever have bugs while running integration tests and you want to see what your DOM actually looks like during your tests.

>it will launch an unstyled instance of the specific page. It can be especially useful when debugging errors in integration tests.

Add this gem to your Gemfile:

    ```Bash
    gem 'launchy'
    ```

    Our Gemfile development/test section now looks like:

    ```Bash
    group :development, :test do
      gem 'pry'
      gem 'web-console', '~> 2.0'
      gem 'spring'
      gem 'rspec-rails'
      gem 'capybara'
      gem 'launchy'
    end
    ```

    In our spec/features/vendors_spec file, add a save_and_open_page (A capybara method that relies on launchy) line. to this test:

    ```ruby
    scenario "the vendors index page can show the vendors' suyas" do
      jeff = Vendor.create(name: "jeff")
      ikem = Vendor.create(name: "ikem")
      jeff.suyas << Suya.create(meat: "beef", spicy: false, price: 400)
      jeff.suyas << Suya.create(meat: "ram", spicy: true, price: 410)
      ikem.suyas << Suya.create(meat: "beef", spicy: true, price: 200)
      ikem.suyas << Suya.create(meat: "liver", spicy: true, price: 210)
      ikem.suyas << Suya.create(meat: "ram", spicy: false, price: 220)

      visit vendors_path

      save_and_open_page

      within("div.vendor", text: "jeff") do
        expect(page).to have_selector("li.suyas", count:2)
      end
      within("div.vendor", text: "ikem") do
        expect(page).to have_selector("li.suyas", count:3)
      end
      expect(page).to have_selector("li.suyas", count: 5)
    end
    ```

    Be sure to add save_and_open_page after the visit method otherwise there will be no page to open.

    Run your tests and a page should open and you should be able to see your page at that point in the test (you should see 2 vendors and 5 suya list items.)

#### Recap

We learned how to:

1. Start with a Capybara feature/integration test to drive our development.
2. Drop down to lower level tests when we encounter small problems in our high-level test. In this instance, we needed to create models and associations, both of which required their own tests before we could continue our high-level test.
3. Create models using generators, and validations.
4. Use RSpec.
5. Use Launchy and save\_and\_open\_page.

If there are any bugs to this tutorial, feel free to contact:
[Jeffrey Wan](https://www.linkedin.com/pub/jeffrey-wan/18/23/a1b)

You can make a PR here:
[Capybara Repo](https://github.com/Jwan622/rails_testing_with_capybara)
