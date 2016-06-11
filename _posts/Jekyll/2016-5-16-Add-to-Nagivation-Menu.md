---
layout: post
title: How to Add to Nagivation Menu
tags:
- Jekyll
- Navigation menu
- YAML
categories:
- Jekyll
---

Previously, I have added [Tags page](http://www.maggie98choy.com/tags/) in my blog which is powered by Jekyll in GitHub. You 
can find how I added Tags page in this [blog](http://www.maggie98choy.com/Add-Tags-in-Jekyll/). Next thing I wanted to do was to put it on navigation menu.

Before adding the new item, my blog had two items in navigation menu:
  -Blog-About


I want to add one more item to navigation menu. This is what I want:
  -Blog-About-Tag

Examining files in *_layout* folder, I found *default.html* contains of `<nav>` section which has been assigned with the following code:

```
{% raw %}
  <nav>
    <a href="{{ site.baseurl }}/">Blog</a>
    <a href="{{ site.baseurl }}/about">About</a>
  </nav>
{% endraw %}
```

*default.html* page can be included inside *YAML front matter* section in every site. So figured this out, adding a new item in navigation menu is 
as simple as adding an extra line in `<navi>` section in *default.html*.

```
    <a href="{{ site.baseurl }}/tags">Tags</a>
```

After recompiling, you can see *Tags* is put on navigation menu.




