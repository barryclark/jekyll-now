---
layout: post
title: Bootstrap basehtml on Pythonanywhere
---

This article goes over how to use bootstrap to make a nice homepage. This will be a two part post. The first part will focus on making a base.html file that can be extended

First, you need to specify your doctype. If you don't specify this, web browsers will load your page in something called "Quirks mode". It has something to do with how IE used to render pages but now isn't common. To do this, enter:

```

<!DOCTYPE html>
```

Now you want to declare that this doc is html and set a default language:

``` html

<html lang="en">
```


We're going to use two different templates for each page. There will be a base.html and a main_page.html for each page. The base will contain everything we want spread across all pages, such as a navigation bar.

Now we're going to make the head section. HTML documents often contain both a head and a body.

First thing you want in the head is the title:

``` html

<head>
  <title>StyleStudio</title>

```

The default character set for HTML5 is UTF-8, so it isn't necesarry to specify it, but we'll do it just for clarity:

``` html
  <meta charset="utf-8">
```
Then we need a viewport element. The viewport tag tells the browser how the webpage should be rendered. It helps adjust the webpage to optimize for the user's device.

```
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Then we'll add bootstrap. Bootstrap is a free (and open source) web framework for front-ends. It is equally fast and responsive to both mobile and desktop users.

```

  <link href="/static/bootstrap/css/bootstrap.min.css" rel="stylesheet">

```

Now we need to point to our css stylesheet. We'll make a stylesheet for each html layout and give them the same name for the sake of convenience. After that we'll point it to jquery and bootstraps javascript code.





We will need a navigation bar. Using navbar-inverse makes it dark, which looks nice. Again, we'll use container-fluid to fill the screen.
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

```

<!DOCTYPE html>
<html>
<head>
  <title>StyleStudio</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">

</head>

<body>
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

<!-- <div class="container">
  Enter the block content and endblock here
</div> -->

</body>


</html>

```

The next thing you want to do with your base.html file is include a place for the templates you extend from here. Just create a container and specify that you want any additional content (such as page.html) to go there. We want to put everything in a container. I don't think you can include the black content, endblock part as code. Github doesn't seem to like that. After the nav section, you'll need some curly braces around: % block content %
  
And then some around: % endblock %