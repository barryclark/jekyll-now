---
layout: post
category: programming
title: Building a Rails API part 4. Testing an API.
tags: Programming
excerpt: In part 4 of this tutorial, we will be testing our Rails API by writing controller tests.
---

## Testing APIs

#### Instructions

If you are starting at this point in the tutorial, clone down the repo, run rake db:seed in terminal, and follow the instructions in the **Let's Begin** section.

Again, the order of this tutorial is:

1. setting-up-rails-api
2. unit-testing-models-and-bottles.
3. creating-api
4. **testing-api**
5. serialize-dat-suya

If you are unfamiliar with Rails, start at part 1, setting-up-rails-api. If you are somewhat familiar with Rails and want to learn how to test your API, switch to [this branch](https://github.com/Jwan622/rails-api-practice/edit/4-testing-api/README.md) on Github, clone it, and start there.

#### Let's Begin

In your test/controllers/api/v1 folder, open up the vendors_controller_test.rb.  
We're first going to test our index endpoint that returns back all of the vendors.

```ruby
test "the index action returns back json of all vendors" do
  jeff = Vendor.create(name: "Jeff")
  obie = Vendor.create(name: "Obie")
  jeremy = Vendor.create(name: "Jeremy")

  get :index
  vendors = JSON.parse(response.body)

  assert_equal 3, vendors.count
  assert_equal "Jeff", vendors[0]
  assert_equal "Obie", vendors[1]
  assert_equal "Jeremy", vendors[2]
end
```

FYI, I like separating my tests into 3 sections:

1. the setup (this is where I create test fixtures)
2. the actions of the test
3. the tests themselves

I separate each section of the test which makes my tests more readable.

A few points I want to first go over about this test:

1. the "get" action is explained well in the edgeguides:

    > Rails simulates a request on the action called index, making sure the request was successful and also ensuring that the right response body has been generated.

    > The get method kicks off the web request and populates the results into the response. It accepts 4 arguments:

    > The action of the controller you are requesting. This can be in the form of a string or a symbol.

    > params: option with a hash of request parameters to pass into the action (e.g. query string parameters or article variables).

    > session: option with a hash of session variables to pass along with the request.

    > flash: option with a hash of flash values.

    > All the keyword arguments are optional.

    [controller tests](http://edgeguides.rubyonrails.org/testing.html#functional-tests-for-your-controllers)  

    The get method simulates an HTTP request.


2. The controller that we're testing is automatically inferred. When we created the controller, a controller test was created   for us and it inherits from ActionController::TestCase.

    > ActionController::TestCase will automatically infer the controller under test from the test class name. If the controller cannot be inferred from the test class name, you can explicitly set it with tests.

    > class SpecialEdgeCaseWidgetsControllerTest < ActionController::TestCase
      tests WidgetController
    end

    [more on controller tests](http://api.rubyonrails.org/classes/ActionController/TestCase.html)

3. The response object represents the response of the last HTTP response. In the above example, @response (or "response") becomes valid after calling "get". If the various assert methods are not sufficient, then you may use this object to inspect the HTTP response in detail.

The response variable will be set following our request (:get, :post, :show, etc). We can then parse the body of the response using JSON.parse(response.body) From there, we have access to whatever may come back in the body, such as the names of our vendors or the meat of our suyas.

4. Let's try writing a test for the create action of our controller. Here is the test:

    ```ruby
    test "create can create a suya" do
      assert_difference("Suya.count", 1) do
        create_params = { suya: { meat: "beefy", spicy: true }, format: :json }

        post :create, create_params
        suya = JSON.parse(response.body)

        assert_equal "beefy", suya["meat"]
        assert_equal true, suya["spicy"]
      end
    end
    ```

    Note the usage of assert_difference here which verifies that the result of evaluating its first argument (a String which can be passed to be evaluated which is "Suya.count") changes by a certain amount (in this case, 1) after calling the block it was passed.

    Also note that the "format: :json" of the params hash is unnecessary since our controller action only responds to one kind of request right now.

5. To get this test to pass, I wrote this in the controller:

    ```ruby
    def create
      render json: Suya.create(suyas_params)
    end
    ```

    [render](http://apidock.com/rails/ActionController/Base/render)

6. Let's try this now for the show action for suyas.

    This is my test:

    ```ruby
    test "can show a suya" do
      suya = Suya.create(meat: "kidneys", spicy: true)
      get :show, { id: suya.id }

      suya = JSON.parse(response.body)

      assert_equal 1, Suya.count
      assert_equal "kidneys", suya["meat"]
      assert_equal true, suya["spicy"]
    end
    ```

    I wrote my controller code as this with a pry:

    ```ruby
    7: def show
 =>  8:   require 'pry' ; binding.pry
     9:   render json: Suya.find(params[:id])
    10: end
    ```

    in the stopped pry session, if I type "params" and hit enter, I will see:

    ```ruby
    [1] pry(#<Api::V1::SuyasController>)> params
    => {"id"=>"1", "controller"=>"api/v1/suyas", "action"=>"show"}
    ```

    that's the params format that the get :show action will send to the controller's show action.

    Note that in my test, if I change the parameters hash of the get request to this:

    ```ruby
    get :show, { id: suya.id, format: :json }
    ```

    Then the params hash in the controller will look like:

    ```Bash
    => {"id"=>"1", "format"=>"json", "controller"=>"api/v1/suyas", "action"=>"show"}
    [2] pry(#<Api::V1::SuyasController>)>
    ```

7. Finish the tests and code for the remaining suya controller actions and for the vendor_controller.rb. Good luck! Be sure to use assert_difference to test the create and destroy actions!

8. For more info, perhaps follow [this tutorial](http://commandercoriander.net/blog/2014/01/04/test-driving-a-json-api-in-rails/) which also prefers the usage of render over the respond\_to/respond\_with pattern.
