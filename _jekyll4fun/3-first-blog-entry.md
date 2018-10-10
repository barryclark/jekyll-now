---
title: Your First Blog Post
slug: your-first-blog-post
chapter: 3
---
_posts directory is built-in feature for all Jekyll sites.
Files you add under here are part of the "posts" collection.
The file name convention provides date based sorting

Let's create your first post and discuss Jekyll source file structure

## Rename the existing post

```
> cd _posts
> mv 2014-3-3-Hello-World.md 2018-10-7-Hello-World.md
```  

The date in the file name becomes the date of the post.

## Open the renamed file
Jekyll transforms files that contain the front matter header

```jekyll
---
layout: post
title: I'm up and running!
---
```

Front matter declares properties for the 'page' scope. Templates and includes
have access to the page scope during processing.

The content under the front matter becomes the main body of the page.

## Quiz: What does Jekyll do with this new _posts file?

<details>
<summary>Answer</summary>
  <ul>
    <li>Rendered files are placed under _site directory</li>
    <li>A new file shows up under the site root</li>
    <li>It is a complete, static html file</li>
  </ul>
</details>
