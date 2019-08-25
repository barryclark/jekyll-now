---
layout: page
title: Migration
description: >
  This documents shows how to upgrade Hydejack from previous versions (v5) in a step-by-step manner.
---

Unfortunately, upgrading form v5 and earlier is not straightforward. A lot of patterns and names have changed,
motivated by a variety of reasons, including better integration with the rest of the Jekyll ecosystem and
simplified workflows enabled by Jekyll Collections.

## Table of Contents
{:.no_toc}
0. this unordered seed list will be replaced by toc as unordered list
{:toc}

## From v5
### Updating the folder structure
Copy the the following folders and files from Hydejack v6 into your existing repository.
Make sure you merge the folder contents.

* `_data/`
* `_includes/`
* `_layouts/`
* `_sass/`
* `assets/`
* `index.html` (`index.md`\*)
* `Gemfile`
* `Gemfile.lock`

Note that the `public` folder has been renamed to `assets`.
You'll want to move your static assets there.

### Updating the configuration
`_config.yml` has changed considerably. Open it and make the following changes.

1.  Rename the following keys

    * `font_accent` => `font_heading`
    * `load_google_fonts` => `google_fonts`
    * `google_analytics_id` => `google_analytics`

2.  Enable Jekyll Collections for categories and tags by adding

    ~~~yml
    collections:
      featured_categories:
        permalink: /category/:name/
        output:    true
      featured_tags:
        permalink: /tag/:name/
        output:    true
    ~~~

3.  Delete `photo` and `photo2x` form the author key and add a `picture` hash instead that looks like

    ~~~yml
    picture:
      path: <photo>
      srcset:
        1x: <photo>
        2x: <photo2x>
    ~~~

    If you have only one photo, you can just provide the URL directly, e.g. `picture: <url>`.

    For more information, see [Adding an author](config.md#adding-an-author).

4.  Rename `gems` to `plugins` and make sure the list contains `jekyll-seo-tag`.

    ~~~yml
    plugins:
      - jekyll-seo-tag
    ~~~


**NOTE**: When making changes to `_config.yml`, it is necessary to restart the Jekyll process for the changes to take effect.
{:.message}


### Restoring the tags
1.  Delete the `tag` folder.
2.  Create a top-level folder called `_featured_tags`.
3.  For each entry in `_data/tags.yml`, create a markdown file in `_features_tags` with the name of the tag as filename,
    e.g. `hyde.md` for tag "hyde".
4.  For each tag, copy its contents from `_data/tags.yml` into the new file's front matter, e.g.

    ~~~yml
    ---
    layout: list
    name: Hyde
    description: >
      Hyde is a brazen two-column Jekyll theme...
    accent_image: /hydejack/public/img/hyde.jpg
    accent_color: '#949667'
    ---
    ~~~

    Be aware that `image` has been renamed to `accent_image` and `color` has been renamed to `accent_color`.

5. Add `layout: list` to the front matter.
6. Once you've copied all tags into their own files, delete `_data/tags.yml`.

### Restoring the sidebar entries
Hydejack can now link to any kind of page in the sidebar.

1. Delete `sidebar_tags` in `_config.yml`.
2. Open a file who's page you would like to add to the sidebar. If you want to add a tag, open `_featured_tags/<tagname>.md`.
3. Add `menu: true` to its front matter.
4. (Optional) Set `order: <number>`, where `<number>` is the number at which you would like the link to appear.

### Restoring the RSS feed
The feed is now provided by the `jekyll-feed` plugin instead of a custom solution.

1.  Delete `atom.xml`
2.  Add `- jekyll-feed` to `gems` in `_config.yml`, e.g.

    ~~~yml
    gems:
      - jekyll-seo-tag
      - jekyll-feed
    ~~~

3.  (Optional) Add the following to `_config.yml` to make the feed appear at the same URL as the old `atom.xml`.

    ~~~yml
    feed:
      path: atom.xml
    ~~~

### Restoring the comments
The way comments are enabled has changed slightly.
You now have to enable them per page by adding `comments: true` to the front matter
(this is what the [Disqus integration guide](https://disqus.com/admin/install/platforms/jekyll/) suggests).
To enable them for all posts, add to the config file

```yml
defaults:
  - scope:
      type: posts
    values:
      comments: true
```

### Restoring the about page
Hydejack now has a dedicated layout for about pages.
To use it, open `about.md` and change the `layout` in the front matter to `about`
and delete `{\% include about-short.html author=site.author %\}`.
