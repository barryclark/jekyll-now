---
title: Add a Custom Collection
slug: add-a-new-collection
chapter: 6
---
Goal:  Rather than flood your new blog site with individual entries for all
the talks you attend at Connect.tech.  Use a collection to hold individual entries
and provide your readers with a succinct listing of events you attended.

## Step 1: Create the collection's directory
Under your project root,  create a folder named "_connecttech2018",  the prefix
underscore is important, why?
Hint: How does Jekyll know what to copy to _site?


## Step 2: Tell Jekyll about your Collection
* Open up _config.yml
* Add a new object called "collections"
* Add a child to collections called "connecttech2018"
* Add a property "output: true" to your connecttech2018 collection.
* Restart jekyll
Note: we'll talk more about defining collections in a bit


## Step 3: Add a new file as first item

*  create file "note1.md"
* add an empty jekyll front matter
* use md or html for the content body

## Test your collection:

* Browse to yoursite/connecttech2018
* What does Jekyll use when no properties define layout, title or permalink?
* How does the note one look?
