---
layout: post
title: Bootstrap base.html on Pythonanywhere
---

This article goes over how to use bootstrap with Pythonanywhere (or anywhere else). For some reason Github is having a problem building this page.

Now you can start on page.html. We've already got a good header, so let's focus on the body. Let's look at the code:


```
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

  <div class="row">
    <form action="." method="POST">
      <textarea class="form-control" name="contents" placeholder="Enter your feature requests here!"></textarea>
      <input type="submit" value="Send request">
    </form>
  </div>
</div>

</body>
```
