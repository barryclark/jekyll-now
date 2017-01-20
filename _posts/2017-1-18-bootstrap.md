---
layout: post
title: Bootstrap basehtml on Pythonanywhere
---

This article goes over how to use bootstrap with Pythonanywhere (or anywhere else). For some reason Github is having a problem building this page.


First, you need to specify your doctype. If you don't specify this, web browsers will load your page in something called "Quirks mode". It has something to do with how IE used to render pages but now isn't common. To do this, enter:

&lt;!DOCTYPE html>

Now you want to declare that this doc is html and set a default language:

&lt;html lang="en">


We're going to use two different templates for each page. There will be a base.html and a page.html for each page. The base will contain everything we want spread across all pages, such as a navigation bar.

We will need a navigation bar. Using navbar-inverse makes it dark, which looks nice. Again, we'll use container-fluid to fill the screen.

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Sappho</a>
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






After you add some closing markers to close the body and html document, you're base.html should look like this:

&lt;!DOCTYPE html>
&lt;html>
&lt;head>
  &lt;title>Sappho</title>
  &lt;meta charset="utf-8">
  &lt;meta name="viewport" content="width=device-width, initial-scale=1">
  &lt;link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">

&lt;/head>

&lt;body>
  &lt;nav class="navbar navbar-inverse">
    &lt;div class="container-fluid">
      &lt;div class="navbar-header">
        <a class="navbar-brand" href="#">Sappho</a>
      &lt;/div>
      &lt;ul class="nav navbar-nav">
        &lt;li class="active"><a href="#">Home</a></li>
        &lt;li><a href="#">About</a></li>
      &lt;/ul>
      &lt;ul class="nav navbar-nav navbar-right">
        &lt;li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        &lt;li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      &lt;/ul>
    &lt;/div>
  &lt;/nav>
  &lt;div class="container">
    {% block content %}
    {% endblock %}
  &lt;/div>

&lt;/body>


&lt;/html>



I don't think you can include the black content, endblock part as code. Github doesn't seem to like that.