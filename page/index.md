---
layout: post
title: page
---
{% newthought 'In this first iteration'%} of the *Tufte-Jekyll* theme, a post and a page have exactly the same layout. That means that all the typographic and structural details are identical between the two.

## Pages and Posts

Jekyll provides for both pages and posts in its default configuration. I have left this as-is. 

### Posts

Conceptually, posts are for recurring pieces of similar content such as might be found in a typical blog entry. Post content all sits in a folder named ```_posts``` and files are created in this folder{% sidenote 1 'Yes, a page has essentially the same old shit as a post'%} that are names with a date pre-pended to the title of the post. For instance ```2105-02-20-this-is-a-post.md``` is a perfectly valid post filename.

Posts will always have a section above the content itself consisting of YAML front matter, which is meta-data information about the post. Minimally, a post title must always be present for it to be processed properly.

```
---
Title: Some Title
---
## Content

Markdown formatted content *here*.
```


### Pages

Pages are any HTML documents *or* Markdown documents with YAML front matter that are then converted to content. Page material is more suited to static, non-recurring types of content. Like this

I am not going to re-write the Jekyll documentation. Read it and you will figure out how the site is structured.

