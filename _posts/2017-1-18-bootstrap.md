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
```    
That's a pretty good header. Now let's focus on the body:

We want to put everything in a container. One way to do this is:

<div class="container">

But if we want a full width container, be sure to use:

<div class="container-fluid">


```
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

Font:

Bootstrap's global default font-size is 14px, with a line-height of 1.428.

This is applied to the &lt;body&gt; and all paragraphs.

In addition, all &lt;p&gt; elements have a bottom margin that equals half their computed line-height (10px by default).

It uses the default HTML headings: &lt;h1&gt; to &lt;h6&gt; where &lt;h1&gt; is the largest and &lt;h6&gt; is the smallest.


Lightlighting:

We will be doing a lot of text highlighting on this page. To do so:

<p>Use the mark element to <mark>highlight</mark> text.</p>

Bootstrap also has a coloring feature:

<div class="container">
  <h2>Contextual Colors</h2>
  <p>Use the contextual classes to provide "meaning through colors":</p>
  <p class="text-muted">This text is muted.</p>
  <p class="text-primary">This text is important.</p>
  <p class="text-success">This text indicates success.</p>
  <p class="text-info">This text represents some information.</p>
  <p class="text-warning">This text represents a warning.</p>
  <p class="text-danger">This text represents danger.</p>
</div>

You can do the same thing with backgrounds:

<div class="container">
  <h2>Contextual Backgrounds</h2>
  <p>Use the contextual background classes to provide "meaning through colors":</p>
  <p class="bg-primary">This text is important.</p>
  <p class="bg-success">This text indicates success.</p>
  <p class="bg-info">This text represents some information.</p>
  <p class="bg-warning">This text represents a warning.</p>
  <p class="bg-danger">This text represents danger.</p>
</div>


To get an image with rounded corners:

<img src="cinqueterre.jpg" class="img-rounded" alt="Cinque Terre" width="304" height="236">

If you want your image to be responsive to the screen size, add an .img-responsive class to the &lt;img&gt; tag:

<img class="img-responsive" src="img_chania.jpg" alt="Chania">


A page header is like a section divider:

<div class="page-header">
  <h1>Example Page Header</h1>
</div>

Alerts are really useful too. We want to create an alert when the user does something:

<div class="alert alert-success">
  <strong>Success!</strong> Indicates a successful or positive action.
</div>

<div class="alert alert-info">
  <strong>Info!</strong> Indicates a neutral informative change or action.
</div>

<div class="alert alert-warning">
  <strong>Warning!</strong> Indicates a warning that might need attention.
</div>

<div class="alert alert-danger">
  <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
</div>


You might also want to make the alert closable:

<div class="alert alert-success alert-dismissable">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>Success!</strong> Indicates a successful or positive action.
</div>


Buttons have the same patterns as alerts:

<button type="button" class="btn btn-default">Default</button>
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-link">Link</button>

The button classes can be used on an &lt;a&gt;, &lt;button&gt;, or &lt;input&gt; element:

<div class="container">
  <h2>Button Tags</h2>
  <a href="#" class="btn btn-info" role="button">Link Button</a>
  <button type="button" class="btn btn-info">Button</button>
  <input type="button" class="btn btn-info" value="Input Button">
  <input type="submit" class="btn btn-info" value="Submit Button">
</div>

Why do we put a # in the href attribute of the link?

Since we do not have any page to link it to, and we do not want to get a "404" message, we put # as the link. In real life it should of course been a real URL to the "Search" page.


<button type="button" class="btn btn-primary btn-lg">Large</button>
<button type="button" class="btn btn-primary btn-md">Medium</button>
<button type="button" class="btn btn-primary btn-sm">Small</button>
<button type="button" class="btn btn-primary btn-xs">XSmall</button>


A button can be set to an active (appear pressed) or a disabled (unclickable) state:

<button type="button" class="btn btn-primary active">Active Primary</button>
<button type="button" class="btn btn-primary disabled">Disabled Primary</button>


Bootstrap provides 260 glyphicons from the Glyphicons Halflings set.

  <p>Search icon on a styled button:
    <button type="button" class="btn btn-info">
      <span class="glyphicon glyphicon-search"></span> Search
    </button>
  </p>
  
  
  
