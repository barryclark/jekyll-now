---
title: Working with Custom Collections
slug: working-with-custom-collections
chapter: 5
---
Collections allow you to create new content types. [Ben Balter](https://ben.balter.com/2015/02/20/jekyll-collections/)
describes it like this: "Everything that’s not a post or a page can be represented as a collection".
This tutorial is an example. _posts is a collection, so is this tutorial.

Collections become a small site dataset "site.xxxx".  They can be sorted, search, iterated
with liquid filters.  They can save you time by accepting default property values.

In this section, we'll do another vertical slice of functionality, this time
building a custom page template.  This will introduce you to the many of the
file types we introduced in the last section.

* Define a custom collection
* Default page Variables
* Liquid Template Syntax
** Using Includes
** Iteration
** Filters
