---
layout:     post
title:      Carte Noire in Action
date:       2014-06-10 12:31:19
summary:    See what the different elements looks like.
categories: jekyll
thumbnail: cogs
tags:
 - demo
 - action
 - carte
 - noire
---

**Note** - This article is a derivative of ["See pixyll in action"][1], taken from the lovely jekyll theme [pixyll][4].

All links are easy to [locate and discern](#), yet don't detract from the harmony
of a paragraph. The _same_ goes for italics and __bold__ elements. Even the the strikeout
works if <del>for some reason you need to update your post</del>. For consistency's sake,
<ins>The same goes for insertions</ins>, of course.

### Code, with syntax highlighting

Code blocks use the [peppermint][2] theme.

{% highlight ruby %}
class Awesome < ActiveRecord::Base
  include EvenMoreAwesome

  validates_presence_of :something
  validates :email, email_format: true

  def initialize(email, name = nil)
    self.email = email
    self.name = name
  end
end
{% endhighlight %}

```html
<!DOCTYPE html>
<title>Title</title>

<style>body {width: 500px;}</style>

<script type="application/javascript">
  function $init() {return true;}
</script>

<body>
  <p checked class="title" id='title'>Title</p>
  <!-- here goes the rest of the page -->
</body>
```

# Headings!

They're responsive, and well-proportioned (in `padding`, `line-height`, `margin`, and `font-size`).

##### They draw the perfect amount of attention

This allows your content to have the proper informational and contextual hierarchy. Yay.

### There are lists, too

  * Apples
  * Oranges
  * Potatoes
  * Milk

  1. Mow the lawn
  2. Feed the dog
  3. Dance

### Images look great, too

![Thumper](https://i.imgur.com/DMCHDqF.jpg)


### Stylish blockquotes included

You can use the markdown quote syntax, `>` for simple quotes.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis porta mauris.

### LaTeX support

The default math delimiters are \$\$. Hence `$$ E = m \cdot c^2 $$` yields $$ E = m \cdot c^2 $$

And here's something more fancy:

$$ \zeta(s) = \frac{1}{\Gamma(s)} \int \limits_0^\infty x^{s-1} \sum_{n=1}^\infty e^{-nx} \mathrm{d}x = \frac{1}{\Gamma(s)} \int \limits_0^\infty \frac{x^{s-1}}{e^x - 1} \mathrm{d}x $$


### There's more being added all the time

Checkout the [Github repository][3] to request,
or add, features.

Happy writing.

[1]: http://pixyll.com/jekyll/pixyll/2014/06/10/see-pixyll-in-action/
[2]: https://noahfrederick.com/log/lion-terminal-theme-peppermint/
[3]: https://github.com/jacobtomlinson/carte-noire
[4]: http://pixyll.com/
