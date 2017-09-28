---
layout: post
title: Bootstrap basehtml on Pythonanywhere
category: general
---

This article goes over how to use bootstrap to make a nice homepage. We're going to use two different templates for each page. There will be a base.html the contains everything we want spread across all pages, such as a navigation bar. Then each page will have its own, unique, templates for the specific page, such as main_page.html. This post will focus on making a base.html file that can be extended to every subsequent page.

First, we'll need to specify the doctype. If it's not specified, web browsers will load your page in something called "Quirks mode". It has something to do with how IE used to render pages but now isn't common. To do this, enter:

``` html
<!DOCTYPE html>
```

Now you want to declare that this doc is html and set a default language:

``` html
<html lang="en">
```

In general, HTML pages have two sections: a head and a body. The head contains the title and other information about the webpage. The body contains the actual content of the page. Now we're going to make the head section. It's going to start with a title, which you create by surrounding with the title tags. In this case, StyleStudio is the title.

``` html
<head>
  <title>StyleStudio</title>
```

Then you want to define the character set used in the page. The default character set for HTML5 is UTF-8, so it isn't necesarry to specify it, but we'll do it just for clarity:

``` html
  <meta charset="utf-8">
```
Then we need a viewport element. The viewport tag tells the browser how the webpage should be rendered. It helps adjust the webpage to optimize for the user's device.

``` html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Then we'll add bootstrap. Bootstrap is a free and open source web framework for front-ends. It is equally fast and responsive to both mobile and desktop users.

``` html
  <link href="/static/bootstrap/css/bootstrap.min.css" rel="stylesheet">
```

Now we need to point to our css stylesheet. We'll make a stylesheet for each html layout and give them the same name for the sake of convenience (base.css in this case). After that we'll point it to jquery and bootstrap's javascript code.

    <link rel="stylesheet" href="/static/css/base.css">
    <link href="/static/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
    <script type="text/javascript" src="/static/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/static/bootstrap/js/bootstrap.min.js"></script>

At the top we'll want a navigation bar. Using navbar-inverse makes it dark, which looks nice. We'll use container-fluid to fill the screen.
```

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">StyleStudio</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
</nav>

```

After you add some closing markers to close the body and html document, you're base.html should look like this:
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>StyleStudio</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/static/css/base.css">
    <link href="/static/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
    <script type="text/javascript" src="/static/jquery/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/static/bootstrap/js/bootstrap.min.js"></script>
    {% block javascript %}{% endblock %}

</head>

<body>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12" id="navbar-container">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">StyleStudio</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="/">Home</a></li>
                        <li><a href="about">About</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

</body>
</html>
```

