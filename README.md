# Materi for jekyll

Materi for jekyll forked from [hikari-for-Jekyll](https://github.com/m3xm/hikari-for-Jekyll)  
Modified theme and Added some features:)

* Apply theme like a Material Design Color
* Apply font of Google Noto Sans and Ubuntu
* Generate tag page and list of articles of each tag (without a plugin)
* Generate file not found page for 404
* Generate sitemap.xml with robots.txt
* Supports metadata in article header for Open Graph Protocol and Twitter Cards
* Prepared a favicon by default

[View demo](http://ogaclejapan.github.io/materi-for-jekyll)

![preview](https://raw.githubusercontent.com/ogaclejapan/materi-for-jekyll/master/art/materi_device_art.png)


### hikari for jekyll

>Hikari is an open-source [Jekyll](http://jekyllrb.com) theme perfect for dev-savvy bloggers who wants to get started with Jekyll in a very minimal way.

- SCSS!
- Responsive
- Lightweight (no JS library has been abused here)


### How to install

1. Clone this repo
2. Customize \_config.yml and replace all dummy posts by yours
3. Change your profile picture in `~/assets/img/avatar.jpg`
4. Publish (I recommend [GitHub Pages](https://help.github.com/articles/using-jekyll-with-pages), it's free)

### Development

- `master` for development and pull requests.
- `gh-pages` for the demo page; don't bother.


#### Running locally

1. Clone this repo
2. Install required dependencies with [Bundler](http://bundler.io/)

        bundle install
3. Run the site with Jekyll

        bundle exec jekyll serve --watch
4. Visit the site at [http://localhost:4000](http://localhost:4000)

_NOTE: If the `bundle install` fails with the following message, please try `xcode-select --install` _

```
An error occurred while installing nokogiri (1.6.6.2), and Bundler cannot continue.
Make sure that `gem install nokogiri -v '1.6.6.2'` succeeds before bundling.

```

### How to generate tag page

1. Tagging to post
2. Define the added tag in the `data/tags.yml`
3. Create tag layout file in the `tags/(tag name).md`

#### Tagging to post

Add a tag to your post entry front-matter block.

```
---
layout: post
title:  "Welcome to Hikari for Jekyll!"
date:   2014-01-28 16:57:51
tags: [jekyll, material]
---

```

#### Define the added tag in the `data/tags.yml`

```

# To generate the tag page will need to be defined here

jekyll:
  name: Jekyll
material:
  name: Material Design

```

#### Create tag layout file in the `tags/(tag name).md`

```
---
layout: tag
title: 'Tags: Jekyll'
tag: jekyll
permalink: tags/jekyll/
---

```

### How to customize font family

Change the two files.

* `_includes/link_your_font.html`
* `_sass/base/_your_font_family.scss`


### License

The MIT License (MIT)

Copyright (c) 2015 ogaclejapan  
Copyright (c) 2015 Mathieu Mayer-Mazzoli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
