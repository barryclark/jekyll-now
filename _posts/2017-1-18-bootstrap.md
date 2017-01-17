---
layout: post
title: Bootstrap on Pythonanywhere
---

This article goes over how to use bootstrap with Pythonanywhere (or anywhere else).

First, you need to specify your doctype. If you don't specify this, web browsers will load your page in something called "Quirks mode". It has something to do with how IE used to render pages but now isn't common. To do this, enter:

<!DOCTYPE html>

Now you want to declare that this doc is html and set a default language:

<html lang="en">

Now you can start your post. Let's focus on the header.

```

    <head>
        <title>Sappho</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
        
    </head>
    
That's a pretty good header. Now let's focus on the body:

   <body>
        <nav class="navbar navbar-inverse">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Sappho</a>
            </div>
          </div>
        </nav>

        <div class="container">

           {% for comment in comments %}
    <div class="row">
        {{ comment.content }}
    </div>
{% endfor %}

            <div class="row">
                <form action="." method="POST">
                    <textarea class="form-control" name="contents" placeholder="Enter a comment"></textarea>
                    <input type="submit" value="Post comment">
                </form>
            </div>

            <div class="row">
                <form action="." method="POST">
                    <textarea class="form-control" name="contents" placeholder="Enter your feature requests here!"></textarea>
                    <input type="submit" value="Send request">
                </form>
            </div>
        </div>

    </body>
```
