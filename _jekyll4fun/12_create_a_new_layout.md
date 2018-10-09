---
layout: lesson
title: Add A Layout for Collection
slug: working-with-layouts
chapter: 12
---
Open up the *_layouts* directory .

__Step 1.__ Copy the posts layouts to create a new layout.
```sh
cp post.html collection-post.html
```
__Step 2.__  Maintain the default wrapper for your page
```ruby
layout: default
```
__Step 3.__ Tell Jekyll to use the layout with collection items
This time, we'll use the Jekyll defaults to configure the layout for all items
in the same collection.  Saves us typing later!

  + Open _config.yml file
  + Add a defaults object.
  + Add a section for the connecttech2018 collection

  ```ruby
  defaults:
    - scope:
        path: ""
        type: "connecttech2018"
      values:
        layout: "conference-post"
  ```

__Step 4.__ Restart Jekyll

__Explore__
* What's up with the "written on" section in the page?
* Does the _posts convention for dates work here?

__Step 5.__ Design a new layout
A key reason I had you do the _config.yml before working on the layout itself,
When you are working locally the layout changes will be continuously built
but the config changes need a restart.

_Things to Try_
<details>
<summary>Add an aside with details about the conference</summary>
<div class="highlight">
<pre class="highlight">
 <code>
   {% raw %}
   &lt;aside&gt;
     {% assign current_collection = site.collections | where: "label", page.collection | first %}
     &lt;h4&gt; {{ current_collection.title }} &lt;/h4&gt;
     {{ current_collection.description }}
    &lt;/aside&gt;
   {% endraw %}
</code>
</pre>
</div>
<h4>Quiz</h4>
<ul>
<li>How does this code change if you use Jekyll defaults to set title & description properties?</li>
</ul>
</details>

<details>
<summary>Replace the "written on" with a list of tags</summary>
 <div class="highlight">
 <pre class="highlight">
  <code>
    {% raw %}
    {% for t in page.tags %}
      &lt;span&gt; {{ t }} &lt;/span&gt;
    {% endfor %}
    {% endraw %}
</code>
</pre>
</div>
<h4>Quiz</h4>
<ul>
<li>Where are the page tags defined?</li>
<li>How do you specify an array of tags in yaml?</li>
</ul>
</details>
