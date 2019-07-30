---
layout: post
title: Jekyll Front Matter
categories: [Jekyll]
datetime: 30-06-2019
---

Jekyll is using something so-called Front matter which is used to set variables or page's metadata on a page and use them on runtime. YAML front matter must always be at the top of the document:

```js
---
layout: post
title: MySQL Scheduled Backup
---
```

So the front matter is a right place for defining tags for pages. All we need to do is set a `tags` variables just like this:

```js
---
layout: post
title: MySQL Scheduled Backup
categories: [MySQL, Database, Backup, Scheduled Task, Windows]
---
```

The we can use it all over the project this way:

{% raw  %}

```js
{% for category in page.categories %}
<li>
  <i class="fa fa-tags"></i>
  <span>
  	{{ category }}
  </span>
</li>
{% endfor %}
```

{% endraw %}

For example, we can encapsulate this piece of code as a file called `_tags` and put it inside `_includes` directory. Then we can include it wherever we want:

{% raw  %}

```js
---
layout: default
---

<article class="post">
  <h1>{{ page.title }}</h1>

  <div class="entry">
    {{ content }}
  </div>
  {% include tags.html %}
</article>
```

{% endraw %}
