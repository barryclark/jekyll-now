---
layout: page
subheadline: Templates
title:  "The Post/Page Template"
teaser: "The default template for posts and pages aligns the page beautifully in the middle. <strong>But</strong> you can customize posts/pages easily via switches in the front matter to <em>get a sidebar</em> and/or to <em>turn off meta-information</em> at the end of the page like categories, tags and dates."
meta_teaser: "This is an example of a beautiful aligned post in the middle. There is no sidebar to distract the reader. The difference to the Page-Template is, that you find meta-information at the bottom of the post."
breadcrumb: true
categories:
    - design
tags:
    - blog
    - content
    - post
    - post format
image:
    title: gallery-example-1.jpg
    caption: Unsplash.com
    caption_url: http://unsplash.com
author: mo
---
*Feeling Responsive* shows metadata by default. The default behaviour can be changed via `config.yml`. To show metadata at the end of a page/post just add the following to front matter:
<!--more-->

~~~
show_meta: true
~~~

If you don't want to show metadata, it's simple again:

~~~
show_meta: false
~~~


## Other Post Formats
{: .t60 }
{% include list-posts tag='post format' %}

