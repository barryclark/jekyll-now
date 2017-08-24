---
layout: post
title: HTML forms
---


Forms are used to collect user input. They all have an input> element. Type="text" is for single-line input, type="submit" is for buttons.

Here's a template for a basic input for first and last name:

<form>
  First name:<br>
  <input type="text" name="firstname"><br>
  Last name:<br>
  <input type="text" name="lastname">
</form>

Name attributes are required. The form won't submit any data without one.


If you want to define an action to do upon submission, assign the form an action:

<form action="action_page.php">
  First name:<br>
  <input type="text" name="firstname" value="Mickey"><br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse"><br><br>
  <input type="submit" value="Submit">
</form>

In many cases you'll want to specify the HTTP method to use. For a form it's usually method='post'.

<form action="action_page.php" method="post">


If you want to stay on the same page (or folder) you are on, you can use action='.'




You may see role attributes listed sometimes. It helps to identify the function of your html to parsing software.


There is no official order for html attributes. Any order will work just as well as far as computer understanding is involved. In terms of ease of user, here's a good order though:

type (so you can instantly see what it is)
id
class (keep 2 and 3 together as they are the most common js/jQuery selectors)
name
value (keep 4 and 5 next to each other so you can quickly reference what input it is and it's value).
All others (like checked, max-size, etc)
style
tabindex (7 and 8 to be at the end as it's "non-relevant", in terms of the actual functionality, they are more styling/usability stuff, keep 'em out of the way!