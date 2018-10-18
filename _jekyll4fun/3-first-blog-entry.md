---
title: Your First Blog Post
slug: your-first-blog-post
chapter: 3
---


__posts_ directory is a built-in feature for all Jekyll sites.
Files you add under here are part of the "site.posts" collection.
Jekyll uses a file name convention to provide date metadata and sorting.

# Create your first post, dated for today.

## Open the __posts_ directory, rename the file for today's date

```
> cd _posts
> mv 2014-3-3-Hello-World.md 2018-10-18-Hello-World.md
```  
<details>
   <summary>Quiz: What file standardizes the look and feel of this post?</summary>
   <p><strong>_layouts/post.html</strong></p>
</details>



## Edit the File

### Change your post's title in the _front matter_

_front matter_ is the top section of the file between the two dash lines.
It defines a section of the file that contains variables and variable overrides
for this piece of content, the "page" scope.
```jekyll
---
layout: post
title: I'm up and running!
---
```

###  Create your own post body
Everything under the front matter becomes the _content_ of your blog post.
Since this is an _.md_ file, you can do some simple formatting
with [Markdown](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf){:target="_blank"}

<details>
  <summary>If you are new to markdown</summary>
<ul>
  <li># Is a Top, level 1 heading &lt;h1&gt;</li>
  <li>## takes the heading down one notch</li>
  <li>* indicates a list item</li>
  <li>_italics here_</li>
</ul>
</details>  

```markdown
Blogging like a hacker at Connect Tech 2018!
```
## Save and commit your changes

# While We Wait
Jekyll is now re-rendering your site, and will show your new post shortly.
While that happens,  let's take another look at templating and rendering.

## File name into Date variables
Jekyll parses the page.date variable from the file name.  The post layout
uses a liquid filter to control date format output.

{% raw %}
```
  Written on {{ page.date | date: "%B %e, %Y" }}
```
{% endraw %}

[Filters](https://jekyllrb.com/docs/liquid/filters/){:target="_blank"}
are the mechanism to do logic based formatting in Liquid Templates.

_(Don't worry, you'll try some out in the next section.)_

## Rendered content ends up in __site_ directory
If you are working with a local build, Jekyll outputs all rendered pages
to the __site_ directory.  Since we're dealing with static pages Jekyll
relies on the *permalink* property for the final output file name.  You can
move a source file anywhere, Jekyll writes the output to folders and files based
on permalink pattern defined.

| permalink | output under site | url |
| /:title | _site/page-title | /page-title |
| /:title/ | _site/page-title/index.html | /page-title/ |
| /:collection/:title | _site/folder/page-title | /folder/page-title |
| /:collection/:title/ | _site/folder/page-title/index.html | /folder/page-title/ |
