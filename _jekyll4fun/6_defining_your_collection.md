---
title: Add a Custom Collection
slug: add-a-new-collection
chapter: 6
---

## Step 1: Create the collection's directory
Under your project root,  create a folder named "_connecttech2018"
and add an index file

```
> mkdir _connecttech2018
> touch index.md
```
<details>
<summary><strong>Quiz:</strong>the prefix underscore is important, why?</summary>
<p>Indicates to Jekyll this is a file it needs to process.</p>
</details>

<details>
<summary>Working Directly On Github?</summary>
<p>
Github will not let you create an empty directory, however if you add
the directory to the filename, it will be created.</p>
</details>


## Step 2: Tell Jekyll about your Collection
* Open up _config.yml
* Add a new object called "collections"
* Add a child to collections called "connecttech2018"
* Add a property "output: true" to your connecttech2018 collection.

```yaml
collections:
  connecttech2018:
    output: true
```

<details>
<summary>Working with Jekyll locally?</summary>
<p>Restart Jekyll Server.  _config.yml is the one file Jekyll doesn't watch for changes</p>
</details>

## Step 3: Add Some Content

*  create file "_connecttech2018/jekyll-4-fun.md"
* add an empty jekyll front matter
* Add text into the body.

```
---
---
Learning To Rock Jekyll at Connect Tech!
```
## Save and Commit your changes

## Step 4: Test your collection.

* https://<yoursite>.github.io/connecttech2018/
* https://<yoursite>.github.io/connecttech2018/jekyll-4-fun/

<strong>Explore! How does Jekyll handle...</strong>

<details>
<summary>The layout for your index & item page?</summary>
<p>There is none!  Why not?</p>
</details>

<details>
<summary>The title for the index and item page?</summary>
<p>Uses the filename.</p>
</details>

<details>
<summary>Where are files output?</summary>
<p>
_site/ <br/>
  &nbsp;&nbsp;connecttech2018.html <br/>
  &nbsp;&nbsp;connecttech2018/ <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;jekyll-4-fun.html <br/>
</p>
</details>
