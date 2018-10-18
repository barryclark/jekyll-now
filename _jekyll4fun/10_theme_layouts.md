---
title: Defining Your Layouts
slug: looking-at-layouts
chapter: 10
---
Now to take a longer look at working with Jekyll Theme features.

#### Theme and Style Concepts

| *Layouts* | .html | *_layouts* | content containers, structural view |
| Includes | .html | *_includes* | reusable fragments across layouts or pages |
| Styles | .sass  | *_sass* | source files for CSS |
| Assets | images, video, pdf ... | _any_ | Jekyll happily serves any file type |

Layouts work pretty much same as any CMS,  they provide a frame for the content
allowing for consistent styles, navigation and branding elements.

<details>
<summary>Each page, post or rendered collection item declares what layout to use in?</summary>
<p>
<strong>layout variable</strong>
</p>

<details>
<summary>layout variables get defined in?</summary>
<p>
<strong>Front Matter</strong>
<div> Front Matter Defaults in _config.yml</div>
</p>
</details>

</details>



Open up the *_layouts* directory and examine these files.

## default.html
Most themes have a default layout to handle the html boilerplate.  Note the following about default layout:

#### No Front Matter

#### How HTML title is generated per page.

{% raw %}
```liquid
<title>{% if page.title %}{{ page.title }} – {% endif %}{{ site.name }} – {{ site.description }}</title>
```
{% endraw %}

*QUIZ*
+ where is the value used in page.title come from?  
+ What about site.name?
<details>
  <summary>Answers</summary>
  <ul>
     <ol> Page's Front Matter or File name </ol>
     <ol> _config.yml </ol>
  </ul>
</details>  


#### The stylesheet reference
Jekyll uses sass to generate your stylesheets.  
The layout references the final output file location.

```html
<link rel="stylesheet" type="text/css" href="{{ site.baseurl }}/style.css" />
```

## page.html and post.html

#### Layouts can have Layouts
With a little design you only need one boilerplate layout,  and then you can
use other layouts to handle content structures.  Both posts  and pages
are wrapped by default via front matter .

```ruby
layout: default
```

And then vary in how they mix includes, navigation with the entry contents.
The important trick here is

{% raw %}
```jekyll
{{ content }}
```
{% endraw %}
This jekyll built-in jekyll variable yeilds rendering to the next level down.
for example:  mypost.md <-- posts.html <-- default.html

Content is always a file's rendered content,  with front matter variables replaced.
