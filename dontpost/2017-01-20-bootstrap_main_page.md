---
layout: post
title: Bootstrap main_page.html on Pythonanywhere
---

This post is going to start where the [previous post](https://jss367.github.io/bootstrap/) left off. We've created base.html but now we need to create a main_page.html to replicate https://sappho.pythonanywhere.com/. We've already got a good header, so let's focus on the body. Let's look at the code:


``` html
<body>
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


</div>

</body>
```

There are other ways to input user data, such as the ` <input> ` or `<input>` or &lt;input> tag. This is usually for smaller inputs. For multi-line inputs, we're going to use &lt;textarea>




<div class="container">

  <div class="row">
    <form role="form" method='POST' action='#'>
      <textarea class="form-control" id="user-text" name="contents" placeholder="Enter your text here"></textarea>
      <button type="button" id="analyze-button" class="btn btn-default">Go!</button>
    </form>
  </div>

  <script src="/static/js/index.js"></script>

  <div class="container">




By convention, HTML commands are from the browser's point of view. Thus a GET command is the browser getting data from the webpage and a POST command is the browser (i.e. the Internet user) posting data. If it were from the website's point of view it might be called PROVIDE and RECEIVE.


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




When we have a button, we want to make sure to use type="button" and not type="submit", because we want our text to remain on the site after we click the button. However, it will not longer submit the form :( . To do that we need some JavaScript on top.

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

You also might want a progress bar:

<div class="progress">
  <div class="progress-bar" role="progressbar" aria-valuenow="70"
  aria-valuemin="0" aria-valuemax="100" style="width:70%">
  70%
</div>
</div>


You need a panel to display your results in:

<div class="panel panel-default">
  <div class="panel-heading">Panel Heading</div>
  <div class="panel-body">Panel Content</div>
  <div class="panel-footer">Panel Footer</div>
</div>


Here's the dropdown menu to choose which type of writing we're doing:

<div class="dropdown">
  <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Tutorials
    <span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
      <li role="presentation"><a role="menuitem" href="#">General writing</a></li>
      <li role="presentation" class="active"><a role="menuitem" href="#">Newspaper articles</a></li>
      <li role="presentation"><a role="menuitem" href="#">JavaScript</a></li>
      <li role="presentation" class="divider"></li>
      <li role="presentation"><a role="menuitem" href="#">About Us</a></li>
    </ul>
  </div>




  We're going to need a large text area where people can put their writing. Here's how you do that:

  <div class="form-group">
    <label for="comment">Text:</label>
    <textarea class="form-control" rows="5" id="comment" placeholder="Enter your text here"></textarea>
  </div>







We used Bootstrap to add a bit of style so our page isn’t completely hideous. Then we added a form with a text input box for users to enter a URL into. Additionally, we utilized a Jinja for loop to iterate through a list of errors, displaying each one.



#######

Note that if you use:

<div class="col-md-8 column-left">

it means 