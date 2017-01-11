---
layout: post
title: "Chalk sample post with all elements"
description: "Have a look at all the predesigned elements you can use in Chalk."
og_image: "documentation/sample-image.jpg"
tags: [design, jekyll]
---

Chalk uses the default Jekyll syntax highlighting gem Rouge. It has a customized style for both light and dark theme.
Use the `highlight` tag to use the following code highlighting your preferred language:

{% highlight html %}
<!-- This is a comment -->
<div class="grid">
  <h1>This is a heading</h1>
  <p>
    This is a paragraph text.
  </p>
</div>
{% endhighlight %}

## Headings

Chalk includes 3 headings by default:

## Heading first level
### Heading second level
#### Heading third level

{% highlight markdown %}
## Heading first level
### Heading second level
#### Heading third level
{% endhighlight %}

## Lists

Unordered list example:
* Unordered list item 1
* Unordered list item 2
* Unordered list item 3
* Unordered list item 4

Ordered list example:
1. Ordered list item 1
2. Ordered list item 1
3. Ordered list item 1
4. Ordered list item 1

{% highlight markdown %}
* Unordered list item 1
* Unordered list item 2

1. Order list item 1
2. Order list item 1
{% endhighlight %}

## Emoji support :star:

Emoji's can be used everywhere in :cat2: your markdown!

## Quotes

A quote looks like this:

> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna.

{% highlight markdown %}
> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna.
{% endhighlight %}

## Media

Images can be added with a default `<img>` tag.
If you wish that an image can be enlarged on click use the image include tag. You can pass 3 variables:
- `path`: Image to show in the blog post.
- `path-detail`: Image to show when enlarging.
- `alt`: Alt text for image in blog post.

{% include image.html path="documentation/sample-image.jpg" path-detail="documentation/sample-image@2x.jpg" alt="Sample image" %}

{% highlight html %}
{% include image.html path="documentation/sample-image.jpg" path-detail="documentation/sample-image@2x.jpg" alt="Sample image" %}
{% endhighlight %}

Videos can be added and are responsive by default (4x3 by default, 16x9 with extra class).

<div class="embed-responsive embed-responsive-16by9">
<iframe src="https://www.youtube.com/embed/vO7m8Hre72E?modestbranding=1&autohide=1&showinfo=0&controls=0" frameborder="0" allowfullscreen></iframe>
</div>

{% highlight html %}
<div class="embed-responsive embed-responsive-16by9">
<iframe src="url-to-video" frameborder="0" allowfullscreen></iframe>
</div>
{% endhighlight %}
