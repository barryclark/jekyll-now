---
title: Define Collection Defaults
slug: define-collection-defaults
chapter: 7
---
Now that Jekyll knows about your collection, we're ready to create
that collection content listing I promised.

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
Don't forget to restart to pick up _config.yml changes.
</details>

# While We Wait   
<details>
  <summary>Jekyll Defaults</summary>
  Use these defaults to DRY your common collection properties.
  (Instead of repeating in every item's front matter)
</details>

<details>
  <summary>Permalinks</summary>
<a href="https://jekyllrb.com/docs/permalinks/" target="_blank"><strong>permalink</strong></a>
is a built-in variable that Jekyll will use to create paths for your content.  
It has a placeholder syntax and helps with SEO to make your URIs easy to navigate.
</details>

<details>
<summary>*Explore:* How has your collection's URL changed?</summary>
Navigate to /connecttech2018  or /connecttech2018/ are you redirected?
</details>
