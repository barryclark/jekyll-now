---
layout: post
category: programming
title: Capybara testing with Rails. Part 2.
tags: Programming
excerpt: In part 2 of this tutorial, we'll do some more advanced Capybara Testing. Suya, again, is our muse.
---

## Advanced capybara testing.

Let's do some more testing and TDD with Capybara! Hurray!

Once again we'll be doing high-level integration/feature tests and dropping down to the unit/model level when needed. This will be shorter. We'll work on:

1. New Vendor forms
2. Creating a new Vendor.

Things you should do after this tutorial with a pair:
3. New Suya forms
4. Vendor Show page.
5. Vendor updating
6. Vendor and Suya deleting.

#### Let's begin.

1. Git clone [this repo](https://github.com/Jwan622/rails_testing_with_capybara/tree/2-capybara-advanced) since I made a few quick styling changes to the html/css and integrated bootstrap.

2. Let's write a high-level test for a new vendor form.

    Again, we haven't written any new forms yet, or a buttons for the new form, or any messages or any html. We're going to be writing a test first, which is sort of like our dream scenario of what we want our app to act like/be like. Our test will drive our development.

    Let's create another test file and separate this new vendor spec from our vendors_spec.rb. However, this new file will still be in the features folder.

    ```Bash
    rails g rspec:feature new_vendor
    ```

    Inside the **spec/features/new_vendors_spec.rb** file, lets' write our high level test. Let's think about what we want to happen. Here are our stories:
    * As a visitor, when I visit the vendors_path and click on a "Register New Vendor"
    * I can be redirected to a new vendors form that has a "New Vendor Form" heading, and an input box for a name, and a submit button.

    ```ruby
    scenario "a user can visit the vendors index page and click on a button to get to the new vendors form" do
      visit vendors_path
      click_button "Register New Vendor"

      expect(current_path).to eql(new_vendor_path)
      expect(page).to have_selector("h1.new_vendor_header", text: "New Vendor Form")
      expect(page).to have_field("name", value: "name")
      expect(page).to have_button("Submit")
    end
    ```

    Why am I using "scenario" instead of it:  
    [scenario vs it] (https://www.relishapp.com/rspec/rspec-rails/docs/feature-specs/feature-spec)

    >The feature and scenario DSL correspond to describe and it, respectively.
    These methods are simply aliases that allow feature specs to read more as
    customer and acceptance tests.

    Run our tests. Our error:

    ```Bash
    Failure/Error: click_button "Register New Vendor"
     Capybara::ElementNotFound:
       Unable to find button "Register New Vendor"
    ```

    So let's change the top of our app/views/vendors/index.html.erb to:

    ```html
    <h1> Vendors And Their Suyas</h1>

    <%= link_to "Register New Vendor", new_vendor_path %>

    <div class="vendors">
      <% @vendors.each do |vendor| %>
        <div class="vendor col-sm-4 col-sm-offset-4">
          <p>Vendor name: <%= vendor.name %></p>
          <% vendor.suyas.each do |suya| %>
            <li class="suyas"> I sell <%= suya.meat %> which costs <%= suya.price %>. Spicy: <%= suya.spicy %> %></li>
          <% end %>
        </div>
      <% end %>
    </div>
    ```

    Rerun tests. Our error:

    ```Bash
    Failure/Error: visit vendors_path
     ActionView::Template::Error:
       undefined local variable or method `new_vendor_path' for #<#<Class:0x007fc94d15da88>:0x007fc951a77ae8>
    ```

    Let's delete our old route and replace it with:

    ```ruby
    Rails.application.routes.draw do
      resources :vendors
    end
    ```

    Run __rake routes__ in your terminal and you should see:

    ```Bash
        Prefix Verb   URI Pattern                 Controller#Action
        vendors GET    /vendors(.:format)          vendors#index
                POST   /vendors(.:format)          vendors#create
     new_vendor GET    /vendors/new(.:format)      vendors#new
    edit_vendor GET    /vendors/:id/edit(.:format) vendors#edit
         vendor GET    /vendors/:id(.:format)      vendors#show
                PATCH  /vendors/:id(.:format)      vendors#update
                PUT    /vendors/:id(.:format)      vendors#update
                DELETE /vendors/:id(.:format)      vendors#destroy
    ```

    In the above routes for example, the new_vendor_path is a GET request that takes you to the /vendors/new url and hits the new action in the vendors controller (or the #new instance method in the vendors controller).

    Rerun tests. Our error:

    ```Bash
    Failure/Error: click_button "Register New Vendor"
     Capybara::ElementNotFound:
       Unable to find button "Register New Vendor"
    ```

    I accidentally made the test refer to a link instead of a button. It should be a link since link_to make GET requests by default and button_to makes a POST request by default.

    [Difference between link_to and button_to](http://stackoverflow.com/questions/12475299/ruby-on-rails-button-to-link-to)

    Let's change our test to a click_link:

    ```ruby
    scenario "a user can visit the vendors index page and click on a button to get to the new vendors form" do
      visit vendors_path
      click_link "Register New Vendor"

      expect(current_path).to eql(new_vendor_path)
      expect(page).to have_selector("h1.new_vendor_header", text: "New Vendor Form")
      expect(page).to have_field("name", value: "name")
      expect(page).to have_button("Submit")
    end
    ```

    Rerun tests. Our error:

    ```Bash
    Failure/Error: click_link "Register New Vendor"
     AbstractController::ActionNotFound:
       The action 'new' could not be found for VendorsController
    ```

    True dat. Let's fix this. In our VendorsController:

    ```ruby
    def new
      @vendor = Vendor.new
    end
    ```

    Rerun tests. I'll explain why I put @vendor in our action shortly. Our "new" error...GET IT?:

    ```Bash
    Failure/Error: click_link "Register New Vendor"
     ActionView::MissingTemplate:
       Missing template vendors/new...
    ```

    The error message is telling us that we're foolish and we're missing a template. We need a vendors/new template.

    Create a new.html.erb template inside app/views/vendors. Just create the file by hand in your text editor.

    Rerun tests. Our new error:

    ```Bash
    Failure/Error: expect(page).to have_selector("h1.new_vendor_header", text: "New Vendor Form")
       expected to find css "h1.new_vendor_header" with text "New Vendor Form" but there were no matches
    ```

    Let's build our new.html.erb form:

    ```html
    <h1 class=new_vendor_header>New Vendor Form</h1>

    <%= form_for(@vendor) do |f| %>
      <%= f.label :name %>
      <%= f.text_field :name, placeholder: "ex: Jeff" %>
      <%= f.submit "Submit" %>
    <% end %>
    ```

    In the form_for ([rails helper](http://api.ruby.org/classes/ActionView/Helpers/FormHelper.html#method-i-form_for)), Rails is smart enough to check the variable inside the form_for argument. It can take either a symbol or an instance variable. If we pass it an instance variable, it checks whether this instance variable has an ID or not. If it does not (like in this case), it knows that we are using a new form and will redirect to the create action of the vendorsController when we hit the submit button. If it does have an ID, it would redirect to the update action of the VendorsController. In this case, we will be redirected to the create action of the VendorsController after we hit submit.

    From this [link](http://apidock.com/rails/ActionView/Helpers/FormHelper/form_for):
    > In the examples just shown, although not indicated explicitly, we still need to use the :url option in order to specify where the form is going to be sent. However, further simplification is possible if the record passed to form_for is a resource, i.e. it corresponds to a set of RESTful routes, e.g. defined using the resources method in config/routes.rb. In this case Rails will simply infer the appropriate URL from the record itself.

    If we rerun tests, we get this error:

    ```Bash
    Failure/Error: expect(page).to have_field('name', with: 'ex: Jeff')
       expected to find field "name" with value "ex: Jeff" but there were no matches
    ```

    I have no idea why it doesn't work, so let's throw in a save_and_open_page. We have the launchy gem and capybara in the GemFile so we should be good to go. Let's put it before the expectation that is failing and take a look at the page.

    ```ruby
        expect(current_path).to eql(new_vendor_path)
        expect(page).to have_selector("h1.new_vendor_header", text: "New Vendor Form")
        save_and_open_page

        expect(page).to have_field('name', with: 'ex: Jeff')
        expect(page).to have_button("Submit")
      end
    end
    ```

    If I right click the page, choose inspect element, and look at the input box, it is an input field with a placeholder. So it seems like I totally butchered the failing line. It should be:

    ```ruby
    expect(page).to have_selector('input[placeholder="ex: Jeff"]')
    ```

    This is what our test looks like now:

    ```ruby
    scenario "a user can visit the vendors index page and click on a button to get to the new vendors form" do
      visit vendors_path
      click_link "Register New Vendor"

      expect(current_path).to eql(new_vendor_path)
      expect(page).to have_selector("h1.new_vendor_header", text: "New Vendor Form")

      expect(page).to have_selector('input[placeholder="ex: Jeff"]')
      expect(page).to have_button("Submit")
    end
    ```

    Rerun tests and they pass now.

3. Let's write another feature test that tests creation of a Vendor.

    ```ruby
    visit new_vendor_path
    fill_in "vendor[name]", with: "Jeff2"
    click_button "Submit"

    expect(current_path).to eql(vendors_path)
    expect(page).to have_content("Vendor Created")
    expect(page).to have_selector("div.vendor", text: "Vendor name: Jeff2")
    ```

    In summary, when we visit the new page, and fill in the form, and submit it, we should be redirected back to the vendors index page and see our new vendor in its own div tag.

    Run our tests. Our error:

    ```Bash
    Failure/Error: click_button "Submit"
     AbstractController::ActionNotFound:
       The action 'create' could not be found for VendorsController
    ```

    Let's fix that by adding the create action in our controller:

    ```ruby
    def create

    end
    ```

    Rerun tests. Our new error:

    ```Bash
    Failure/Error: click_button "Submit"
     ActionView::MissingTemplate:
       Missing template vendors/create, application/create with {:locale=>[:en], :formats=>[:html], :variants=>[], :handlers=>[:erb, :builder, :raw, :ruby, :coffee, :jbuilder]}. Searched in:
         * "/Users/Jwan/Dropbox/programming/andela/capybara_rails_tutorial/app/views"
    ```

    So this message is a bit misleading. We don't want to render a create template but Rails automatically assumes we want to render a template with the name of the Controller action when we don't explicitly specify a redirect. In this action, what we want ideally is to create a new Vendor and redirect back to the vendors/index or vendors_path with a flash message stating that our new Vendor was created. Cool right?

    Before we write our create action, let's first see what our params hash looks like from the rails form that was sent in.

    ```ruby
    def create
      require 'pry'; binding.pry
    end
    ```

    Rerun tests and we should hit our debugger. Type in "params" and hit enter.

    ```Bash
        def create
     => 11:   require 'pry'; binding.pry
        12: end

        [1] pry(#<VendorsController>)> params
        => {"utf8"=>"✓", "vendor"=>{"name"=>"Jeff2"}, "commit"=>"Submit", "controller"=>"vendors", "action"=>"create"}
    ```

    [params](http://guides.ruby.org/action_controller_overview.html#parameters)

    > The second type of parameter is usually referred to as POST data. This information usually comes from an HTML form which has been filled in by the user. It's called POST data because it can only be sent as part of an HTTP POST request. Rails does not make any distinction between query string parameters and POST parameters, and both are available in the params hash in your controller:

    Let's build [strong params] (http://edgeguides.ruby.org/action_controller_overview.html#strong-parameters).

    Create a private method in our vendorsController:

    ```ruby
    private

    def vendor_params
      params.require(:vendor).permit(:name)
    end
    ```

    This says that our params variable in our controller needs to have the :vendor symbol (it does... Even though it looks like our params hashes are all strings, params hashes are special in that you can access string variables with symbols.) and that the only fields it permits are the :name field. This prevents modification of sensitive attributes (imagine an Admin attribute that was modifiable to anyboyd... we wouldn't want that would we?)

    This will be our create action:

    ```ruby
    def create
      vendor = Vendor.new(vendor_params)
      if vendor.save
        redirect_to vendors_path, notice: "Vendor Created"
      else
        @vendor = Vendor.new
        flash.now[:alert] = vendor.errors.full_messages.join(", ")
        render :new
      end
    end
    ```

    This code might be confusing, especially the segments where we choose to use render over redirect_to. To explain, read this:

    [redirect_to and render](http://guides.ruby.org/layouts_and_rendering.html#using-redirect-to)

    On [render](http://guides.ruby.org/layouts_and_rendering.html#using-render):
    > Remember, a render :action doesn't run any code in the target action,

    Render just delivers an asset (often a view).

    and

    >As you've seen, render tells Rails which view (or other asset) to use in constructing a response. The redirect_to method does something completely different: it tells the browser to send a new request for a different URL.

    So redirect_to will again request a URL, hit the controller, and render a view.

    Let's go over this create action. We create a new Vendor (it builds the object but it does not save it to the database). If you were to insert a require "pry"; binding.pry after the first line and type in vendor and hit enter... you would see this:

    ```Bash
      10: def create
      11:   vendor = Vendor.new(vendor_params)
    =>12:   require 'pry' ; binding.pry
      13:   if vendor.save
      14:     redirect_to vendors_path, notice: "Vendor Created"
      15:   else
      16:     @vendor = Vendor.new
      17:     flash.now[:alert] = vendor.errors.full_messages.join(", ")
      18:     render :new
      19:   end
      20: end

    [1] pry(#<VendorsController>)> vendor
    => #<Vendor:0x007ff322a23e48 id: nil, name: "Jeff2", created_at: nil, updated_at: nil>
    ```

    Notice the vendor object doesn't have an "id:". It's nil meaning it has no primary key, meaning it is not saved to the database.

    The next line, if we can save the vendor, then we redirect_to the vendors_path which will first hit the index action of the controller. We can also pass redirect_to a flash notice. More on flashes and redirect_to here:

    [redirect_to](http://guides.ruby.org/layouts_and_rendering.html#using-redirect-to)  
    [flash](http://guides.ruby.org/action_controller_overview.html#the-flash)

    On flash:
    > The flash is a special part of the session which is cleared with each request. This means that values stored there will only be available in the next request, which is useful for passing error messages etc....Note that it is also possible to assign a flash message as part of the redirection. You can assign :notice, :alert or the general purpose :flash:

    > By default, adding values to the flash will make them available to the next request, but sometimes you may want to access those values in the same request. For example, if the create action fails to save a resource and you render the new template directly, that's not going to result in a new request, but you may still want to display a message using the flash. To do this, you can use flash.now in the same way you use the normal flash:

    Remember, a rendor is not a new request.

    Let's take our pry out and rerun our tests. So vendor.save worked and we got redirected_to vendors_path so this test passed:

    ```ruby
    expect(current_path).to eql(vendors_path)
    ```

    But this is our new error. Once again, follow the errors, fix them, profit!

    ```Bash
    Failure/Error: expect(page).to have_content("Vendor Created")
       expected to find text "Vendor Created" in "Vendors And Their Suyas Register New Vendor Vendor name: Jeff2"
    ```

    But, we have a flash message set in our controller but nothing in our HTML to display the actual flash message. Let's fix our error.

    Add this flash message div to our **/app/views/layouts/application.html.erb**. We'll use a content tag to create a div and a message.

    ```ruby
    <% flash.each do |name, msg| %>
      <%= content_tag :div, msg, :class => "flash-#{name}" %>
    <% end %>
    ```

    This code should be inserted right under the body tag and above the yield command. Rerun our tests and they should pass.


4. Style our content tag. We gave the flash message a class that dynamically changes based on what the flash name is. Let's create a flash.scss in our app/stylesheets folder.

    Add this code to **app/assets/stylesheets/flash.scss** (you need to create this file):

    ```ruby
    .flash-notice {
      color: #3CE230
    }

    .flash-alert {
      color: #E23083
    }
    ```

    Look up color codes here: [Color codes](http://www.rapidtables.com/web/color/RGB_Color.htm)

5. Great job! Finish up the other restful routes. Create a show page test, an update test, and a delete test yourself. Start with the feature tests!
