---
layout: post
title: How do I test sessions in ExUnit?
comments: true
---

This is the small recipe I want to share with community. I had a troubles with testing sessions in `ExUnit`. I started to google for answer. Only big piece of hard to understand code in [Testing Phoenix controllers](http://alexmarandon.com/articles/testing_phoenix_controllers/#testing-with-the-default-plug-pipeline) article by Alex Marandon. But actually, this piece of code didn't worked, at least to me.

I also found [github issue](https://github.com/phoenixframework/phoenix/issues/1008) in phoenix repo. Chris McCord said there are two ways to test sessions:

 * Use private assigns (I haven't got it), and
 * Make a request to authentication controller to have a `conn` with request on response. Let's do it!

Actually code is simple, firstly, I wrote a module in test support. It's about returning `conn()` with a session assigned:

``` elixir
# test/support/signed_conn.ex
defmodule MyApp.SignedConn do
  @endpoint MyApp.Endpoint

  import Phoenix.ConnTest

  def signed_user_conn do
    user = MyApp.Factory.create(:user)

    conn()
    |> post("/your/new_session_path", %{
      "session" => %{
        "email"    => user.email,
        "password" => user.password
      }
    })
  end
end
```

As you can notice, I created a user via `ex_machina` and then made a post request to my sessions controller.

Now, let's `import MyApp.SignedConn` to `MyApp.ConnCase` and

Volia! We can use `conn()` without any session assigned, but `signed_user_conn()` for connections with already assigned user session!
