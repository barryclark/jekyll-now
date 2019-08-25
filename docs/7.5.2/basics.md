---
layout: page
title: Basics
description: >
  Where it is explained how to add basic content types to your Hydejack blog: Blog posts, categories and tags,
  as well as 'special' layouts included in Hydejack PRO.
---

## Table of Contents
{:.no_toc}
0. this unordered seed list will be replaced by toc as unordered list
{:toc}

## Adding a page
You can add generic pages that support markdown content but aren't blog posts.
For example, this documentation is written in markdown, consisting of several generic pages.

To add a page, create a new markdown file and put `layout: page` in a front matter

~~~yml
---
layout: page
title:  Documentation
---
~~~

Now you can add content as you would in a blog post.

## Adding an entry to the sidebar
Hydejack's sidebar can add links to any page within the site. In order for a page to appear in the sidebar, it needs to have a truthy `menu` value defined in its front matter. The page also needs to have a `title`, otherwise the entry in the sidebar will be blank.

If you want the link to appear at a particular position, you can set a numeric value to the `order` key.
However, the page is not guaranteed to appear in the 5th position when you set a value of `5`,
since it will only use that number to sort the pages.
The position of a page also depends on the `order` of all other pages in the sidebar.

If you don't want to spread the sidebar definitions across multiple markdown files,
you can manage them centrally in your config file using front matter defaults, e.g.:

```yml
# file: _config.yml
defaults:
  - scope:
      path: blog.md
    values:
      menu: true
      order: 1
  - scope:
      path: projects.md
    values:
      menu: true
      order: 2
  - scope:
      path: resume.md
    values:
      menu: true
      order: 3
  - scope:
      path: about.md
    values:
      menu: true
      order: 4
```

### Adding a link to an external page to the sidebar
You can add links to external pages to the sidebar by creating a new markdown file for each entry and adding to the front matter:

```yml
---
title: External
redirect_to: https://example.com/
menu: true
order: 5
---
```

You may combine this with the [`jekyll-redirect-from`](https://github.com/jekyll/jekyll-redirect-from) plugin
to generate a redirect page at the `permalink` of the file, but this is optional.

## Adding a category or tag
Hydejack allows you to use the `list` layout to show all posts of a particular tag or category.

Before you start, make sure your config files contains the `featured_tags` and `features_categories` collections:

~~~yml
# file: _config.yml
collections:
  featured_categories:
    permalink:         /category/:name/
    output:            true
  featured_tags:
    permalink:         /tag/:name/
    output:            true
~~~

### Recap: Tags and categories in Jekyll
Posts in Jekyll can belong to one or more categories, as well as one or more tags. They are defined in a post's front matter:

~~~yml
---
layout:     post
title:      Welcome to Jekyll
categories: [jekyll, update]
tags:       [jekyll, update]
---
~~~

Posts can also be assigned to a category based on their position within the folder structure, e.g.

~~~
├── jekyll
│   └── update
│       └── _posts
│           └── 2017-04-07-welcome-to-jekyll.markdown
~~~

would place "Welcome to Jekyll" in the categories `jekyll` and `update`.
Whether you use this method or not, categories will always be part of a posts URL, while tags will not.

Type       | URL
-----------|----
Categories | `/jekyll/update/2017/04/07/welcome-to-jekyll/`
Tags       | `/2017/04/07/welcome-to-jekyll/`
{:.scroll-table-small}

As far as Jekyll is concerned, these are the only differences.

### Tags and categories in Hydejack
Categories and tags are displayed by Hydejack below the title, after the date. Categories are displayed with the preposition "in", while tags are displayed with the preposition "on", e.g.

Type       | Title
-----------|------
Categories | Welcome to Jekyll¬ 07 Apr 2017 **in** Jekyll / Update
Tags       | Welcome to Jekyll¬ 07 Apr 2017 **on** Jekyll, Update
Both       | Welcome to Jekyll¬ 07 Apr 2017 **in** Jekyll / Update **on** Jekyll, Update
{:.scroll-table-small}

### Creating a new category or tag
Be default, categories and tags are rendered as plain text. Further steps are necessary if you want them to link to a page that contains a list of all posts that belong to that category or tag.

For each "featured" category or tag, a file called `<categoryname>.md` or `<tagname>.md` has to be created in `_featured_tags` or `_featured_categories`, respectively.
Each file in these folders is part of a [Jekyll Collection](https://jekyllrb.com/docs/collections/).

The the data of a category or tag is set in the files front matter, e.g.

~~~yml
# file: _featured_tags/hyde.md
---
layout: list
title:  Hyde
slug:   hyde
description: >
  Hyde is a brazen two-column Jekyll](http://jekyllrb.com) theme
  that pairs a prominent sidebar with uncomplicated content.
  It's based on [Poole](http://getpoole.com), the Jekyll butler.
---
~~~

`layout`
: Must be `list`

`title`
: Used as title of the page, as well as name of the category or tag as part of the line below a blog post's title.
  Can be different from the name of the tag or category, as long as `slug` is identical to the name.

`slug`
: Must be identical to the key used in the blog's front matter, i.e. if you use `categories: [jekyll]` or `tags: [jekyll]`
  the `slug` must be `jekyll`. Normally the slug is derived from the title, but it is recommended that you set it explicitly.

`description`
: A medium-length description, used on the tag or category's detail page as meta description and shown in a message box below the title.

`accent_image`
: URL. Will be used as fallback for all pages that belong to that category or tag.

`accent_color`
: Color code. Will be used as fallback for all pages that belong to that category or tag.

`menu`
: Set to to `true` if you want the category or tag to appear in the sidebar. For more information, see
  [Adding an entry to the sidebar](#adding-an-entry-to-the-sidebar).

Once the file is created, the page can be found at `/category/<categoryname>/` or `/tag/<tagname>/`.

## Adding an about page
About pages are a frequent use case, so Hydejack has a special layout for it, which is a slight modification of the `page` layout.
[Demo][about].
The main difference is that it will display an author's `about` text and `picture` above the regular content.

To create an about page, make sure `layout` is set to `about`, and that the `author` key is set to an author defined in `_data/authors.yml`. For more on authors, see [Adding an author](config.md#adding-an-author).

~~~yml
# file: about.md
---
layout: about
title:  About
author: qwtel
---
~~~

## Adding a welcome page*
If you bought the PRO version of Hydejack you have access to the `welcome` layout.
It is intended to showcase your projects and blog posts in a compact way.
Technically, it is a modified version of the `about` layout, so it will also show author information at the top.
[Demo][welcome].

For reference, the layout/order of content on the welcome page looks like:
* Title
* Author's about text
* Content (before `content_separator`)
* Latest/Selected Projects
* Latest/Selected Posts
* Content after `content_separator` (if any)

You can create a welcome page by creating a new markdown file and setting the layout to `welcome` in the front matter.

~~~yml
# file: index.md
---
layout: welcome
title:  Welcome
author: qwtel
---
~~~

Without further configuration, the welcome page will show the two most recent projects and five most recent blog posts.
However, the welcome layout supports selecting specific projects and posts, by adding to the front matter, e.g.:

~~~yml
# file: index.md
---
layout:            welcome
title:             Welcome
selected_projects:
  - _projects/hydejack-v6.md
  - _projects/hyde-v2.md
selected_posts:
  - _posts/2017-05-03-javascripten.md
  - _posts/2012-02-07-example-content.md
more_projects:     projects.md
more_posts:        posts.md
big_project:       false
content_separator: <!--more-->
---
~~~

`layout`
: Must be `welcome`.

`selected_projects`
: A list of paths to project files that should be displayed below the main content of the page.
  The paths are relative to the main directory with no leading `./`.
  If no paths are provided, the two most recent projects will be used.

`selected_projects`
: A list of paths to blog posts that should be featured on the welcome page.
  The paths are relative to the main directory with no leading `./`.
  If no paths are provided, the five most recent posts will be used.

`more_projects`
: The path to the main projects page.
  The path is relative to the main directory with no leading `./`.

`more_posts`
: The path to the main posts page.
  The path is relative to the main directory with no leading `./`.

`big_project`
: Optional. When `true`, project thumbnails will span the full width instead of half.
  This setting takes precedence over the `big_project` value of individual projects,
  i.e. it will apply to the entire page.

`content_separator`
: Optional. Defines a marker that will be used to split the content in two parts.
  The first part will go before the "Selected/Latest Projects" and "Selected/Latest Posts" section,
  the second part will go below it.

## Adding a projects page*
The projects page will show all projects in a particular collection.
First, you need to make sure that you have the `projects` collection defined in `_config.yml`:

~~~yml
# file: _config.yml
collections:
  projects:
    permalink: /projects/:path/
    output:    true
~~~

Next, add a `projects.md` to in the root (you can adjust the name/location to match the the `permalink` of the
collection).
This file has the `projects` layout (mind the "s" at the end) and should have a `show_collection` key,
with the name of the collection as a value, e.g.:

~~~yml
# file: projects.md
---
layout:          projects
title:           Projects*
show_collection: projects
big_project:     true
---
~~~

`layout`
: Must be `projects`.

`title`
: The title of the page. Note that this name is reused as part of each individual project page
  (for the link that directs back to the projects page).

`show_collection`
: The name of the collection you want display on this page. Defaults to `projects`.

`big_project`
: Optional. When `true`, project thumbnails will span the full width, instead of only half.
  This setting takes precedence over the `big_project` value of individual projects,
  i.e. it will apply to the entire page.

## Adding a project*
Projects are organized using [Jekyll Collections](https://jekyllrb.com/docs/collections/).
Each project generates an entry on the projects layout ([Demo][projects]) as well as its own detail page ([Demo][project]).

Each project is defined by a file in the `_projects` directory.
The project's meta information is defined in the file's front matter. You can also add markdown content.
A project's front matter may look like:

~~~yml
# file: _projects/hyde-v2.md
---
layout:      project
title:       Hyde v2*
date:        2 Jan 2014
screenshot:
  src:       /assets/img/projects/hyde-v2@0,25x.jpg
  srcset:
    1920w:   /assets/img/projects/hyde-v2.jpg
    960w:    /assets/img/projects/hyde-v2@0,5x.jpg
    480w:    /assets/img/projects/hyde-v2@0,25x.jpg
caption:     Hyde is a brazen two-column Jekyll theme.
description: >
  Hyde is a brazen two-column [Jekyll](http://jekyllrb.com) theme that pairs a prominent sidebar with uncomplicated content.
  It's based on [Poole](http://getpoole.com), the Jekyll butler.
links:
  - title:   Demo
    url:     http://hyde.getpoole.com
  - title:   Source
    url:     https://github.com/poole/hyde
author:      mdo
big_project: true
---
~~~

`layout`
: Must be set to `project`

`date`
: Providing a year is the minimum requirement. Used to sort the projects.

`screenshot`
: A 16:9 screenshot of the project. You can pass a URL to an image, but it is recommended that you provide an entire `srcset` (see above). Hydejack will show the screenshot in various sizes, depending on the screen width, so that no specific size will fit all. Instead it is recommended that you use a [mipmap]-like approach, providing the image in multiple sizes, each image half the width of the previous one. The `src` key is a fallback image for browsers that don't support the `srcset` attribute. The keys of the `srcset` hash will be used as descriptors.
For more information on `srcset`, see the [documentation at MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset), or [this article from CSS-Tricks](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/).

`caption`
: A short description, shown as part of each "project card" in the `projects` layout.

`description`
: A medium-length description, used on the project's detail page as meta description and shown as message box below he screenshot.

`links`
: A list of `title`-`url` pairs that link to external resources related to this project.

`author`
: Optional. Shown below the project, similar to posts.

`big_project`
: Optional. When `true`, the project preview will span the full content width. You can use this for projects that you want to direct additional attention to. You can set/override this for an entire page, by setting `big_project` in the front matter (applies to the `projects` and `welcome` layout).

## Adding a resume*
Hydejack's PRO version features a generalized resume layout.
[Demo][resume].

It generates the resume page from a valid [JSON Resume](https://jsonresume.org/), which is good news if you already have a JSON resume. Otherwise, there are various ways of obtaining one:

* You can use the visual [JSON Resume Editor](http://registry.jsonresume.org/).
* If you have a LinkedIn profile, you can try [LinkedIn to Json Résumé](https://jmperezperez.com/linkedin-to-json-resume/).
* You can edit the [example `resume.json`](https://github.com/qwtel/hydejack/blob/master/_data/resume.json) in the `_data` directly. It contains example entries for each type of entry.

Once you have a JSON Resume, place it into `_data`.

If you prefer editing YAML files, there is an [example `_resume.yml`](https://github.com/qwtel/hydejack/blob/master/_data/_resume.yml) file in `_data`.
In order to use it, rename it to `resume.yml` and delete `resume.json`.

To render the resume page, create a new markdown file and set the layout to `resume` in the front matter:

~~~yml
# file: resume.md
---
layout: resume
title:  Resume
description: >
  A short description of the page for search engines (~150 characters long).
---
~~~

**NOTE**: You can download the final `resume.json` (minified) from the assets folder. When running locally, you can find it at `_site/assets/resume.json`.
{:.message}

Continue with [Writing](writing.md){:.heading.flip-title}
{:.read-more}

[about]: https://qwtel.com/hydejack/about/
[welcome]: https://qwtel.com/hydejack/
[resume]: https://qwtel.com/hydejack/resume/
[projects]: https://qwtel.com/hydejack/projects/
[project]: https://qwtel.com/hydejack/projects/hydejack-v6/

[mipmap]: https://en.wikipedia.org/wiki/Mipmap
