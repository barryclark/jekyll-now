---
title: Working with Custom Collections
slug: working-with-custom-collections
chapter: 5
links:
  - https://ben.balter.com/2015/02/20/jekyll-collections/
---
> "Everything that’s not a post or a page can be represented as a collection".
>                                                - Ben Balter

Collections are a powerful way to manage your content in Jekyll. They can be:
* sorted
* iterated
* filtered

_posts is a collection, So is this tutorial.

Collections become a namespace at the site level "site.xxxx".  They are organized
by folder "_xxxx".

In this next section, we're going to add a custom collection for holding all the
notes your going to capture at Connect Tech.  Then we will build an index page
that lists all your notes for easy reference.

Goal:  Rather than flood your new blog site with individual entries for all
the talks you attend at Connect.tech.  Use a collection to hold individual entries
and provide your readers with a succinct listing of events you attended.

Features of Jekyll Covered:

* How to define a collection
* How to set variable defaults
* Liquid Template Syntax
    * Iteration
    * Filters
