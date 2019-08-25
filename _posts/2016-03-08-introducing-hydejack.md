---
layout: post
title: Introducing Hydejack (v3)
description: >
  Hydejack is a pretentious two-column [Jekyll](http://jekyllrb.com) theme,
  stolen by [@qwtel](https://twitter.com/qwtel) from [Hyde](http://hyde.getpoole.com).
  You could say it was.. [hydejacked](http://media3.giphy.com/media/makedRIckZBW8/giphy.gif).
tags: [hydejack]
excerpt_separator: <!--more-->
---

## Features
Unlike Hyde, it's very opinionated about how you are going to use it.

Features include:

* Touch-enabled sidebar / drawer for mobile, including fallback when JS is disabled.
* Github Pages compatible tag support based on [this post][tag].
* Customizable link color and sidebar image, per-site, per-tag and per-post.
* Optional author section at the bottom of each post.
* Optional comment section powered by Disqus.
* Layout for posts grouped by year
* Wide array of social media icons on sidebar.
* Math blocks via [KaTeX](https://khan.github.io/KaTeX/).

<!--more-->

**NOTE**: This post is outdated and only included for legacy reasons.
See the [Documentation][docs]{:.heading.flip-title} for up-to-date instructions.
{:.message}

## Download
Hydejack is developed on and hosted with GitHub. Head to the [GitHub repository](https://github.com/qwtel/hydejack)
for downloads, bug reports, and feature requests.

## Sidebar
I love the original Hyde theme, but unfortunately the layout isn't as great on small screens.
Since the sidebar moves to the top, the user has to scroll down just to read the title of a blog post.

By using a drawer component I was able to retain the original two column layout.
It's possible to move the drawer via touch input (with the help of a little JavaScript).

Since the background image contributes to the feel of the page I'm letting it peek over the edge a bit.
This also provides a hint to the user that an interaction is possible.

## Manual

### Configuration
You can configure important aspects of the theme via
[`_config.yml`](https://github.com/qwtel/hydejack/blob/v3/_config.yml).
This includes:

* the blog description in the sidebar
* the (optional) author description and photo
* default image and link color of the blog
* the github and twitter usernames

### How to Change the Image and Color of a Post
In the manifest of a blog post, simply add an url as `image` and a CSS color as `color`:

~~~yml
layout: post
title: Introducing Hydejack
image: https://qwtel.com/hydejack/assets/img/hyde.jpg
color: '#949667'
~~~

### How to Add a New Tag
Tags are not meant to be used #instagram #style: #food #goodfood #happy #happylife #didimentionfood #yougetthepoint,
as each tag requires some setup work. I tend to think of it as categories that can be combined.

1.  Add an entry to `_data/tags.yml`, where the key represents a slug and provide at least a `name` value and
    optionally `image`, `color` and `description`.

    Example `/_data/tags.yml`:

    ~~~yml
    mytag:
      name: My Tag
    ~~~

2.  Make a new file in the `tag` folder, using the same name you've used as the key / slug and
    change the `tag` and `permalink` entries.

    Example `/tag/mytag.md`:

    ~~~yml
    layout: blog-by-tag
    tag: mytag
    permalink: /tag/mytag/
    ~~~

3.  Tag your blog posts using the `tags` key (color and image will only depend on the first tag).

    ~~~yml
    layout: post
    title: Introducing My New Tag
    tags: [mytag, othertag]
    ~~~

4. (optional) Add the tag to the sidebar, by adding it to `sidebar_tags` in `_config.yml`.
   They will appear in the listed order.

   ~~~yml
   sidebar_tags: [mytag, othertag]
   ~~~


[docs]: ../docs/7.5.2/index.md
[tag]: http://www.minddust.com/post/tags-and-categories-on-github-pages/
