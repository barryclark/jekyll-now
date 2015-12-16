---
layout: page
title:  "Header Image With Background Color"
subheadline:  "Headers With Style"
teaser: "Feeling Responsive allows you to use all kinds of headers. This example shows a header image with a defined background color via front matter."
categories:
    - design
tags:
    - design
    - background color
    - header
header:
    image: header_unsplash_2-970x.jpg
    background-color:  "#304558"
    caption: This is a caption for the header image with link
    caption_url: https://unsplash.com/
---
It's so easy to do. Just define in front matter an image and a background color. Instead of a color you can also use a pattern image. Have a look at the [example with a background pattern]({{ site.url }}/design/header-image-pattern/).
<!--more-->


## Front Matter Code

{% include alert alert="WARNING: To make this work the value of `background-color` must be inbetween quotes." %}

~~~
header:
    image: "header_unsplash_2-970x.jpg"
    background-color: "#fabb00"
    caption: This is a caption for the header image with link
    caption_url: https://unsplash.com/
~~~


### All Header-Styles 
{: .t60 }

{% include list-posts tag='header' %}