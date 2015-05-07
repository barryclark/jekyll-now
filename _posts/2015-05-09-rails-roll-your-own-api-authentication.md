---
layout: post
title: Rails Roll-Your-Own API Authentication
tags:
  - rails
  - api
  - authentication
  - development
author: Daniel Smith
published: true
---

I've seen a lot of blog posts about implementing Rails authentication, but precious few of them specifically talk about implementing it for an API. Most of them assume you are using normal Rails views, so I wanted to go over how I've implemented this for token-based authentication that does not use a normal session. We will use bcrypt and skip using Devise since it is more geared toward view-based authentication.

First, as in most tutorials, you need to set up a User model with a field called `authentication_token`.

```
rails g model User email:string password_digest:string authentication_token:string
```

Then in the User model, create a before\_create callback called `ensure_authentication_token` to create the token. Then create a method called `authenticate` which will be used to authenticate the user.

```ruby
class User < ActiveRecord::Base
  has_secure_password
  before_create :ensure_authentication_token
  validates :email, uniqueness: true, presence: true

  def ensure_authentication_token
    if authentication_token.blank?
      self.authentication_token = generate_authentication_token
    end
  end

  def self.authenticate(email, password)
    user = User.find_by_email(email)
    unless user && user.authenticate(password)
      return "Email or password invalid"
    end
    user
  end

  private

    def generate_authentication_token
      loop do
        token = SecureRandom.hex
        break token unless User.where(authentication_token: token).first
      end
    end
end
```

Now we need a way to actually get the token out of the API using our email and password. So create a sessions controller:

```
rails g controller Sessions create
```

Then fill it in:

```ruby
class SessionsController < ApplicationController
  skip_before_filter :restrict_access, only: :create
  def create
    ap params
    user = User.authenticate(params[:user][:email], params[:user][:password])
    data = {
      token: user.authentication_token,
      email: user.email
    }
    render json: data, status: 201 and return
  end
end
```

Don't forget to add the POST route to the routes.rb file.

```ruby
Rails.application.routes.draw do
  post '/users/sign_in' => 'sessions#create'
  ...
end
```

Note several of these things are named the way they are simply because the client-side authentication I am using is based on Devise, so I made my endpoints look like Devise but without using the entire library.

Now that our client can get the token, we move to the Application controller where we will create the authentication method based on the token.

```ruby
class Api::V1::ApplicationController < ApplicationController
  include ActionController::HttpAuthentication::Token::ControllerMethods
  before_filter :restrict_access

  private
    def restrict_access
      authenticate_or_request_with_http_token do |token, options|
        User.find_by(email: options[:email], authentication_token: token)
      end
    end
end
```

Another note here, I am using the [rails-api](https://github.com/rails-api/rails-api) gem, which is a trimmed-down version of full rails. Hence the `include ActionController::HttpAuthentication::Token::ControllerMethods` at the top of the controller.

And I believe that is it. Rather simple now looking at it, but it was tough to get all these pieces in place.

One final note, this type of authentication should only be done over SSL since the authentication token, which functions like a password, is being transmitted.