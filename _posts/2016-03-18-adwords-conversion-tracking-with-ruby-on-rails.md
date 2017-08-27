---
layout: post
title: Adwords conversion tracking with Ruby on Rails
date: '2016-03-18T14:59:51-05:00'
tags:
- ruby on rails
- google adwords
- metrics
- saas
- marketing
- analytics
tumblr_url: http://blog.abdullahi.org/post/141272256510/adwords-conversion-tracking-with-ruby-on-rails
---
I recently implemented tracking of successful conversions from Adwords for a client. I thought it might be useful to share with others what’s involved in doing the same with their Rails site.

The end goal is to have Google Adwords identify successful conversions from ad buys on your Ruby on Rails application. This assumes you have an existing Adwords campaign and that you’re using Devise for authentication with a Rails 4+ webapp (although this should also work for Rails 3 and perhaps earlier). This also assumes you have confirmable turned off, so users are signed in right after signing up to your site instead of having to activate their account via email.

Google provides a bit of client-side Javascript code that you’ll need. You can find the instructions for how to get this conversion tracking tag from the Adwords site.

Next, you’ll need to create a new view that will serve as the landing page upon signing up for users. For consistency’s sake, I recommend having the same view logic as the normal root path presented upon sign in to end users. We’ll call this view convert.html.erb

To not clutter things up in our view, we’ll make a quick partial to drop the  conversion tracking tag Javascript from Adwords called `_adconvert.html.erb`

```html
# app/views/users/_adconvert.html.erb

<!-- Google Code for Conversion Page -->
<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 99999999999;
var google_conversion_language = "en";
var google_conversion_label = "xyz-NY";
var google_remarketing_only = false;
/* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/99999999999/?label=xyz-NY&amp;guid=ON&amp;script=0"/>
</div>
</noscript>
<!-- Google Code for Conversion Page -->
```

```html
# app/views/users/convert.html.erb

<div class="content">

  <%= render partial: ''users/adconvert'' %>
  <!-- view logic goes here -->

</div>
```

Then, in our Registrations controller, we’ll make a call to a Devise method to handle action after sign up.

```ruby
# app/controllers/users/registrations_controller.rb

def after_sign_up_path_for(resource)
  conversion_path
end
```

Our routes.rb will need to be updated as well. We’ll create a conversion_path for the controller to use above. It’s important to have the new routing rule above the root path rule, otherwise your application will miss and route to the root path instead of the conversion path.

```ruby
# config/routes.rb

match ''users/convert'' => ''users#convert'', :as => :conversion, via: [:get, :post]
```

You’ll notice we made a call to the users controller’s convert method above. So let’s go ahead and create it. This is also a good point to include any actions from your index method that’s called on by the original view we’re copying from. For example, if you have search filters and pagination setup.

```ruby
# app/controllers/users_controller.rb

def convert
  if filter.present?
    @users = @users.filter_search('student', filter).paginate(:page => params[:page], :per_page => 20)
  else
      @users = @users.where(role: 'student').order("LOWER(users.#{sort_column}) #{sort_direction}").paginate(:page => params[:page], :per_page => 20)
  end
end
```
