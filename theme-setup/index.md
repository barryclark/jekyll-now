---
layout: page
title: Theme Setup
excerpt: "Instructions on how to install and customize the Jekyll theme So Simple."
modified: 2016-01-19
image:
  feature: so-simple-sample-image-6.jpg
  credit: WeGraphics
  creditlink: http://wegraphics.net/downloads/free-ultimate-blurred-background-pack/
---

General notes and suggestions for customizing **So Simple Theme**.

* Table of Contents
{:toc}

## Installation

So Simple now requires [Jekyll](http://jekyllrb.com/) 3.0. Make sure to run `bundle update` if you aren't on the latest version to update all gem dependencies.

If you are creating a new Jekyll site using So Simple follow these steps:

1. Fork the [So Simple repo](http://github.com/mmistakes/so-simple-theme/fork).
2. Clone the repo you just forked and rename it.
3. [Install Bundler](http://bundler.io) `gem install bundler` and Run `bundle install` to install all dependencies (Jekyll, [Jekyll-Sitemap](https://github.com/jekyll/jekyll-sitemap), [Octopress](https://github.com/octopress/octopress), etc)
4. Update `_config.yml`, add navigation, and replace demo posts and pages with your own. Full details below.

If you want to use So Simple with an existing Jekyll site follow these steps:

1. [Download So Simple](https://github.com/mmistakes/so-simple-theme/archive/master.zip) and unzip.
2. Rename `so-simple-theme-master` to something meaningful ie: `new-site`
3. Run `bundle install` to install all dependencies (Jekyll, [Jekyll-Sitemap](https://github.com/jekyll/jekyll-sitemap), [Octopress](https://github.com/octopress/octopress), etc)
4. Remove demo posts/pages and replace with your own posts, pages, and any other content you want to move over.
5. Update posts' and pages' YAML to match variables used by So Simple. Full details below.
6. Update `_config.yml` and add navigation links and additional author data if applicable. Full details below. 

**Pro-tip:** Delete the `gh-pages` branch after cloning and start fresh by branching off `master`. There is a bunch of garbage in `gh-pages` used for the theme's demo site that I'm guessing you won't want.
{: .notice}

---

## Running Jekyll

The preferred method for running Jekyll is with `bundle exec`, but if you're willing to deal gem conflicts feel free to go cowboy with a `jekyll build` or `jekyll serve`.

> In some cases, running executables without bundle exec may work, if the executable happens to be installed in your system and does not pull in any gems that conflict with your bundle.
>
>However, this is unreliable and is the source of considerable pain. Even if it looks like it works, it may not work in the future or on another machine.

{% highlight text %}
bundle exec jekyll build

bundle exec jekyll serve
{% endhighlight %}

---

## Scaffolding

How So Simple is organized and what the various files are. All posts, layouts, includes, stylesheets, assets, and whatever else is grouped nicely under the root folder. The compiled Jekyll site outputs to `_site/`.

{% highlight text %}
so-simple-theme/
├── _includes/
|    ├── browser-upgrade.html   # prompt to install a modern browser for < IE9
|    ├── disqus-comments.html   # Disqus comments script
|    ├── feed-footer.html       # post footers in feed
|    ├── footer.html            # site footer
|    ├── head.html              # site head
|    ├── navigation.html        # site top navigation
|    ├── open-graph.html        # meta data for Open Graph and Twitter cards
|    └── scripts.html           # site scripts
├── _layouts/
|    ├── page.html               # single column page layout
|    └── post.html               # main content with sidebar for author/post details
├── _posts/                      # MarkDown formatted posts
├── _sass/                       # Sass stylesheets
├── _templates/                  # used by Octopress to define YAML variables for new posts/pages
├── about/                       # sample about page
├── articles/                    # sample articles category page
├── assets/
|    ├── css/                    # compiled stylesheets
|    ├── fonts/                  # webfonts
|    └── js/
|        ├── _main.js            # main JavaScript file, plugin settings, etc
|        ├── plugins/            # scripts and jQuery plugins to combine with _main.js
|        ├── scripts.min.js      # concatenated and minified _main.js + plugin scripts
|        └── vendor/             # vendor scripts to leave alone and load as is
├── blog/                        # sample blog category page
├── images/                      # images for posts and pages
├── 404.md                       # 404 page
├── feed.xml                     # Atom feed template
├── index.md                     # sample homepage. lists 5 latest posts 
└── theme-setup/                 # theme setup page. safe to remove
{% endhighlight %}

---

## Site Setup

A quick checklist of the files you'll want to edit to get up and running.

### Site Wide Configuration

`_config.yml` is your friend. Open it up and personalize it. Most variables are self explanatory but here's an explanation of each if needed:

#### title

The title of your site... shocker!

Example `title: My Awesome Site`

#### logo

Your site's logo, appears in the header below the navigation bar and is used as a default image for Twitter Cards when a feature is not defined. Place in the `images` folder.

#### url

Used to generate absolute URLs for sitemaps, feeds and for generating canonical URLs in a page's `<head>`. When developing locally either comment this out or use something like `http://localhost:4000` so all assets load properly. *Don't include a trailing `/`*. [Protocol-relative URLs](http://www.paulirish.com/2010/the-protocol-relative-url/) are a nice option but there are a few caveats[^protocol].

Examples:

{% highlight yaml %}
url: http://mmistakes.github.io/so-simple-theme
url: http://localhost:4000
url: http://mademistakes.com
url: //mademistakes.com
url: 
{% endhighlight %}

[^protocol]: If you decide to use a protocol-relative URL know that it will most likely break sitemap.xml that the Jekyll-Sitemap gem creates. If a valid sitemap matters to you I'd suggest [creating your own sitemap.xml](http://davidensinger.com/2013/03/generating-a-sitemap-in-jekyll-without-a-plugin/) and apply some Liquid logic to prepend links to posts/pages with `https:`.

#### Google Analytics and Webmaster Tools

Google Analytics UA and Webmaster Tool verification tags can be entered under `owner` in `_config.yml`. For more information on obtaining these meta tags check [Google Webmaster Tools](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=35179) and [Bing Webmaster Tools](https://ssl.bing.com/webmaster/configure/verify/ownership) support.

### Navigation Links

To set what links appear in the top navigation edit `_data/navigation.yml`. Use the following format to set the URL and title for as many links as you'd like. *External links will open in a new window.*

{% highlight yaml %}
- title: Portfolio
  url: /portfolio/

- title: Made Mistakes
  url: http://mademistakes.com  
{% endhighlight %}

---

## Adding New Content with Octopress

While completely optional, I've included Octopress and some starter templates to automate the creation of new posts and pages. To take advantage of it start by installing the [Octopress](https://github.com/octopress/octopress) gem if it isn't already.

{% highlight bash %}
$ gem install octopress
{% endhighlight %}

### New Post

Default command for creating a new post.

{% highlight bash %}
$ octopress new post "Post Title"
{% endhighlight %}

Default works great if you want all your posts in one directory, but if you're like me and want to group them into subfolders like `/posts`, `/portfolio`, etc. Then this is the command for you. By specifying the DIR it will create a new post in that folder and populate the `categories:` YAML with the same value.

{% highlight bash %}
$ octopress new post "New Article Title" --dir articles
{% endhighlight %}

### New Page

To create a new page use the following command.

{% highlight bash %}
$ octopress new page new-page/
{% endhighlight %}

This will create a page at `/new-page/index.md`

---

## Layouts and Content

Explanations of the various `_layouts` included with the theme and when to use them.

### Post and Page

These two layouts are very similar. Both have an author sidebar, allow for large feature images at the top, and optional Disqus comments. The only real difference is the post layout includes related posts at the end of the page.

### Categories

In the sample posts folder you may have noticed `categories: articles` in the YAML front matter. Categories can be used to group posts into sub-folders. If you decide to rename or add categories you will need to create new category index pages.

For example. Say you want to group all your posts under blog/ instead of articles/. In your post add `categories: blog` to the YAML front matter, rename or duplicate articles/index.md to blog/index.md and update the *for loop* to limit posts to just the blog category.

{% highlight text %}
{% raw %}
{% for post in site.categories.blog %}
{% endraw %}
{% endhighlight %}

If done correctly /blog/ should be a page index of only posts with a category of `blog`.

### Feature Images

A good rule of thumb is to keep feature images nice and wide so you don't push the body text too far down. An image cropped around around 1024 x 256 pixels will keep file size down with an acceptable resolution for most devices. If you want to serve these images responsively I'd suggest looking at the [Jekyll Picture Tag](https://github.com/robwierzbowski/jekyll-picture-tag) plugin[^plugins].

[^plugins]: If you're using GitHub Pages to host your site be aware that plugins are disabled. You'll need to build your site locally and then manually deploy if you want to use this sweet plugin.

The post and page layouts make the assumption that the feature images live in the `images/` folder. To add a feature image to a post or page just include the filename in the front matter like so.

{% highlight yaml %}
image:
  feature: feature-image-filename.jpg
  thumb: thumbnail-image.jpg #keep it square 200x200 px is good
{% endhighlight %}

To add attribution to a feature image use the following YAML front matter on posts or pages. Image credits appear directly below the feature image with a link back to the original source if supplied.

{% highlight yaml %}
image:
  feature: feature-image-filename.jpg
  credit: Michael Rose #name of the person or site you want to credit
  creditlink: http://mademistakes.com #url to their site or licensing
{% endhighlight %}

### Videos

Video embeds are responsive and scale with the width of the main content block with the help of [FitVids](http://fitvidsjs.com/).

Not sure if this only effects Kramdown or if it's an issue with Markdown in general. But adding YouTube video embeds causes errors when building your Jekyll site. To fix add a space between the `<iframe>` tags and remove `allowfullscreen`. Example below:

{% highlight html %}
<iframe width="560" height="315" src="http://www.youtube.com/embed/PWf4WUoMXwg" frameborder="0"> </iframe>
{% endhighlight %}

### Link Post Type

So Simple Theme supports **link posts**, made famous by John Gruber. To activate just add `link: http://url-you-want-linked` to the post's YAML front matter and you're done. Here's an [example of a link post]({{ site.url }}/articles/sample-link-post) if you need a visual.

### Author Override

By making use of data files you can assign different authors for each post.

Start by modifying `authors.yml` file in the `_data` folder and add your authors using the following format.

{% highlight yaml %}
# Authors

billy_rick:
  name: Billy Rick
  web: http://thewhip.com
  email: billy@rick.com
  bio: "What do you want, jewels? I am a very extravagant man."
  avatar: bio-photo-2.jpg
  twitter: extravagantman
  google:
    plus: +BillyRick

cornelius_fiddlebone:
  name: Cornelius Fiddlebone
  email: cornelius@thewhip.com
  bio: "I ordered what?"
  avatar: bio-photo.jpg
  twitter: rhymeswithsackit
  google:
    plus: +CorneliusFiddlebone
{% endhighlight %}

To assign Billy Rick as an author for our post. We'd add the following YAML front matter to a post:

{% highlight yaml %}
author: billy_rick
{% endhighlight %}

---

## Social Share Links

To add Facebook, Twitter, and Google+ share links to a post add the following YAML front matter.

{% highlight yaml %}
share: true
{% endhighlight %}

Share links appear below author details in the sidebar.

---

## Disqus Comments

To enable comments [signup for a Disqus account](https://disqus.com/admin/signup/?utm_source=New-Site) and create a shortname for your site. Then add it to your `_config.yml` under the site owner section like so:

{% highlight yaml %}
site:
  owner:
    disqus-shortname: shortname
{% endhighlight %}

If you would like comments to appear on every post or page that uses the `post.html` layout simply add the following line to your `_config.yml` and you're done.

{% highlight yaml %}
comments: true
{% endhighlight %}

To be more selective and granualar with which posts and pages Disqus comments appear on, add `comments: true` to the YAML Front Matter of each post or page instead.

---

## Twitter Cards

Feature and thumbnail images are used by [Open Graph](https://developers.facebook.com/docs/opengraph/) and [Twitter Cards](https://dev.twitter.com/docs/cards) as well. If you don't assign a thumbnail the site logo is used.

Here's an example of a tweet with Twitter Cards enabled.

![Twitter Card summary large image screenshot]({{ site.url }}/images/twitter-card-summary-large-image.jpg)

**Pro-Tip**: You need to [apply for Twitter Cards](https://dev.twitter.com/docs/cards) before they will begin showing up when links to your site are shared.
{:.notice}

---

## Jekyll search

This is a very basic attempt at [indexing a Jekyll site](https://github.com/mathaywarduk/jekyll-search) and returning search results with JSON --- Google quality results this is not.

To exclude posts/pages from search results add `search_omit: true` to their YAML Front Matter.

---

## Further Customization

Jekyll 2.x added support for Sass files making it much easier to modify a theme's fonts and colors. By editing values found in `_sass/_variables.scss` you can fine tune the site's colors and typography.

For example if you wanted a red background instead of white you'd change `$body-color: #ebebeb;` to `$body-color: $cc0033;`.

To modify the site's JavaScript files I setup a Grunt build script to lint/concatenate/minify all scripts into `scripts.min.js`. [Install Node.js](http://nodejs.org/), then [install Grunt](http://gruntjs.com/getting-started), and then finally install the dependencies for the theme contained in `package.json`:

{% highlight bash %}
npm install
{% endhighlight %}

From the theme's root, run `grunt` to concatenate JavaScript files, and optimize all .jpg, .png, and .svg files in the `images/` folder. You can also use `grunt dev` in combination with `jekyll build --watch` to watch for updates JS files that Grunt will then automatically re-build as you write your code which will in turn auto-generate your Jekyll site when developing locally.

---

## Questions?

Found a bug or aren't quite sure how something works? By all means Ping me on Twitter [@mmistakes](http://twitter.com/mmistakes) or [file a GitHub Issue](https://github.com/mmistakes/so-simple-theme/issues/new). And if you make something cool with this theme feel free to let me know.

---

## License

This theme is free and open source software, distributed under the MIT License. So feel free to use this Jekyll theme on your site without linking back to me or including a disclaimer. 
