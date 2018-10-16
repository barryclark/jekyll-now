---
title: Index your Collection
slug: build-a-collection-index
chapter: 8
---
Now to tackle [Liquid](https://shopify.github.io/liquid/){:target="_blank"}
to create that index listing.

## Step 1: Iterate your collection pages with a for loop
* Edit your _connecttech2018/index.md  file
* Add a for loop to create a link for each item in the collection.
{% raw %}
```liquid
<ol>
  {% for item in site.connecttech2018 %}
    <li><a href="{{item.url}}">{{item.title}}</a></li>
  {% endfor %}
</ol>
```
{% endraw %}

### Save and Commit.

## *Dang!*
<details>
<summary>Anybody see the problem?</summary>
Yes, the collection iterates *all* files as items, including the index.
There are a few ways to solve this problem.  Today I'm going to use it as an
opportunity to teach a few more Liquid tricks.
</details>

## Step 3: Use more Liquid to exclude the index page from iteration

#### 1. Assign the collection to a liquid variable
{% raw %}
```liquid
{% assign sessions = site.connecttech2018  %}
<ol>
  {% for item in sessions %}
    <li><a href="{{item.url}}">{{item.title}}</a></li>
  {% endfor %}
</ol>
{% endraw %}
```

#### 2. Apply a *where_exp* filter for a specific variable
[where](https://www.siteleaf.com/blog/advanced-liquid-where/)  and [
where_exp](https://distresssignal.org/jekyll-where-expression-filter) are
jekyll specific liquid *filters* to match elements based on front matter variables.

{% raw %}
```liquid
{% assign sessions = site.connecttech2018 | where_exp: "item", "item.exclude != true "%}
```
{% endraw %}

*Warning*  I always seem to get this syntax wrong at first...  If it didn't work
check your server output for help.

#### 3. Add exclude: true to your index.md front matter

### Extra Credit
* What's truthy for the where_exp?  
* Start your own Liquid cheatsheet from examples in the docs.
