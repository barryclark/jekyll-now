---
title: Define Collection Defaults
slug: define-collection-defaults
chapter: 7
links:
- https://jekyllrb.com/docs/permalinks/
- https://jekyllrb.com/docs/configuration/front-matter-defaults/
---
We can save some effort in managing our collection by defining
front matter defaults.  This saves having to copy and paste
common properties in every item's front matter.

## Step 1: Define a _Default Layout_ for your collection
* In the _config.yml add a new "defaults" object
* under defaults add an array item (-)
* in the array item, define properties:

```
defaults:
  - scope:
      path: ""
      type: "connecttech2018"
    values:
      layout: "default"
      title: Connect Tech 2018
      permalink: /:collection/:title
```  
### Save and Commit your changes.
<details>
   <summary>Working Locally?</summary>
<p>
Don't forget to restart to pick up _config.yml changes.</p>
</details>

# While We Wait   

<details>
  <summary>What are Permalinks?</summary>
<p>
<a href="https://jekyllrb.com/docs/permalinks/" target="_blank"><strong>permalink</strong></a>
is a built-in variable that Jekyll will use to create paths for your content.  
It has a placeholder syntax and helps with SEO to make your URIs easy to navigate.
</p>
</details>

<details>
<summary><em>Explore:</em> How has your collection's URL changed?</summary>
<p>
Navigate to /connecttech2018  or /connecttech2018/ are you redirected?
</p>
</details>
