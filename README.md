# Skinny Bones Jekyll Starter

Just a little something I'm using to jump start a site refresh. Super alpha and super incomplete, use and abuse at your own risk.

Keep in mind, this is **not a theme** and will need styling and additional markup to really sing.

Requires Jekyll 2+. Doesn't currently work with GitHub Pages because they only support Jekyll 1.5.0

Full documentation coming eventually, in the meantime the import parts are below. I used this starter with some minor CSS changes to build my website [mademistakes.com](http://mademistakes.com), so check that out if you want to see what can be done and how I did it.

---

## To Do

Needs work:

- [ ] Post pagination --- needs styling. Disabled for now.
- [ ] Year filter for archive `_layout`

Documentation needed:

- [x] How files and folders are organized
- [ ] Quick start checklist
- [x] Creating new posts/pages with [Octopress gem](https://github.com/octopress/octopress)
- [ ] Bug fixes and contributing to the project

Other:

- [ ] Investigate turning Skinny Bones into an [Octopress Ink](https://github.com/octopress/ink) theme

---

## Installation

1. Install Jekyll
2. Install theme

---

## Scaffolding

This is how I like to set my Jekyll sites up. All of your posts, layouts, includes, stylesheets, assets, and whatever else is grouped nicely under `_source/`. The compiled Jekyll site outputs to `_site/`.

``` bash
skinny-bones-jekyll
├── _site                                   # compiled site ready to deploy
├── _source                                 # all source files
|   ├── _images                             # unoptimized images
|   ├── _includes                           # reusable blocks for _layouts
|   ├── _layouts
|   |    ├── archive.html                   # archive listing of a group of posts or collection
|   |    ├── article.html                   # articles, blog posts, text heavy material layout
|   |    ├── default.html                   # base
|   |    └── media.html                     # portfolio, work, media layout
|   ├── _posts                              # posts grouped by category for sanity
|   ├── _sass
|   |   ├── vendor                          
|   |   |   ├── bourbon                     # Bourbon mixin library   
|   |   |   └── neat                        # Neat grid library
|   |   ├── _animations.scss                # CSS3 animations
|   |   ├── _badges.scss                    # small badges
|   |   ├── _bullets.scss                   # visual bullets
|   |   ├── _buttons.scss                   # buttons
|   |   ├── _grid-settings.scss             # Neat settings         
|   |   ├── _helpers.scss                   # site wide helper classes
|   |   ├── _layout.scss                    # structure and placement, the bulk of the design
|   |   ├── _mixins.scss                    # custom mixins
|   |   ├── _notices.scss                   # notice blocks
|   |   ├── _pygments.scss                  # Pygments.rb syntax highlighting
|   |   ├── _reset.scss                     # normalize and reset elements
|   |   ├── _sliding-menu.scss              # sliding menu overlay
|   |   ├── _variables.scss                 # global colors and fonts
|   ├── css
|   |   └── main.scss                       # loads all Sass partials
|   ├── fonts                               # webfonts
|   ├── images                              # images
|   ├── js
|   |   ├── plugins                         # jQuery plugins
|   |   ├── vendor                          # vendor scripts that don't get combined with the rest
|   |   ├── _main.js                        # site scripts and plugin settings go here
|   |   └── main.min.js                     # concatenated and minified site scripts
|   ├── apple-touch-icon-precomposed.png    # 152x152 px for iOS
|   ├── atom.xml                            # posts feed
|   ├── favicon.ico                         # 32x32 px for browsers
|   ├── index.md                            # homepage content
|   └── sitemap.xml                         # sitemap for search engines
└── _config.yml                             # Jekyll settings
```

---

## Quick Start

A quick checklist of the files you'll want to edit to get up and running.

### Site Wide Variables

`_config.yml` is your friend. Open it up and personalize it. 

Describe what everything does:

- [ ] Site name, description
- [ ] Site logo
- [ ] Site teaser image
- [ ] Setting site.url and absolute link jazz
- [ ] Site owner

### Navigation Links

To set what links appear in the top navigation edit `_data/navigation.yml`. Use the following format to set the URL, title, teaser image/description (used in sliding menu) of each link:

``` yaml
- title: Portfolio
  url: /portfolio/
  excerpt: "Things I’ve designed, illustrated, developed, coded, and whatever."
  image: 300x200.gif

- title: Made Mistakes
  url: http://mademistakes.com  
```

To set what links appear in the footer edit `_data/footer.yml`. Use the following format for each link:

``` yaml
- title: Subscribe
  url: /subscribe/

- title: External Page
  url: http://mademistakes.com  
```

### Posts

#### Organizing Posts

Create new .md files in `_posts`. If you aren't using categories to organize your posts then don't worry about this next bit. I like to organize all my posts by a single category and file them under sub-directories beneath `_posts`. For example if I have post named `2014-06-01-new-post.md` and it has a category of `foo` it will have the following path:

`_posts/foo/2014-06-01-new-post.md`

Which when process by jekyll would have a URL of `domain.com/foo/new-post/`.

#### Post YAML

The only YAML required is `title` and `layout`. It's a good idea to add a custom excerpt otherwise Jekyll will just take the content from the first sentence. Images are a good idea as well to add visual interest to a page.

1. Add `categories: ` and assign a single category name for added organization
2. image YAML for featured images, teasers, and square thumbnails
3. Table of Contents conditional
4. Ads conditional (Google Responsive Ads `_includes/advertising.html`)
5. Disqus comments conditional 

### Pages

#### Organizing Pages

Pages can be handled in two ways if you want to maintain pretty URLs for your site.

Place `.md` files in root and add the appropriate permalink YAML. For example if you want your **About** page to live at `domain.com/about/` create a file named `_source/about.md` and add `permalink: /about/` to its YAML.

Or you can create `_source/about/index.md` and omit the YAML permalink. The choice is yours.

### Archives

Create an archive page for each category or section of your site that you want to list a collection of posts. On these pages you'll want to use the `archive` layout and use a variation of the following for the page's content changing `foo` to the appropriate category you want to list posts from.

``` yaml
<div class="tiles">
{% for post in site.categories.foo %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->
```

If you'd prefer a less visual list of posts use `{% include post-list.html %}` instead of the `post-grid.html` _include.

---

## Adding New Content

Install the [Octopress](https://github.com/octopress/octopress) gem if it isn't already.

``` bash
$ gem install octopress --pre
```

### New Post

Default command

``` bash
$ octopress new post "Post Title"
```

Default works great if you want all your posts in one directory, but if you're like me and want to group them into subfolders like `/articles`, `/portfolio`, etc. Then this is the command for you. By specifying the DIR it will create a new post in that folder and populate the `categories:` YAML with the same value.

``` bash
$ octopress new post "Article Post Title" --dir articles
```

The default `_layout` used for new posts is `articles`. If you want to use the media layout or something else specify it like so

``` bash
$ octopress new post "Portfolio Post Title" --dir portfolio --template media
```

### New Page

To create a new page use the following command.

``` bash
$ octopress new page about/
```

This will create a page at `_source/about/index.md`

---

## Contributing