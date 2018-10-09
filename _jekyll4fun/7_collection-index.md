---
layout: lesson
title: Index your Collection
slug: create-collection-index
chapter: 7
---
For our first template,  let's create a custom index page for our new collection.
Something more impressive than a default html folder listing.  

## Step 1: Add an index.md in your collection folder
* Add the front matter, this time specify:
    * layout: default
    * title: My Connect Tech 2018
    * permalink: :collection

* Test your new index page at "/connecttech2018"

[Permalink](https://jekyllrb.com/docs/permalinks/) is a built-in variable
that Jekyll will use to create paths for your content.  It has a placeholder
syntax and helps with SEO to make your URIs easy to navigate.

*Experiment:*  What happens when you navigate to /connecttech2018  vs /connecttech2018/ ?

## Step 2: Liquid Iteration to create collection links.
Jekyll uses [Liquid](https://shopify.github.io/liquid/) to provide templates.
The following snippet will iterate on all file under your collection folder

{% raw %}
```liquid
<ol>
  {% for item in site.connecttech2018 %}
    <li><a href="{{item.url}}">{{item.title}}</a></li>
  {% endfor %}
</ol>
```
{% endraw %}

*Dang!*  All files also includes this index page
Yes, the collection iterates *all* files as items, including the index.
There are a few ways to solve this problem.  Today I'm going to use it as an
opportunity to teach a few more Liquid tricks.

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
