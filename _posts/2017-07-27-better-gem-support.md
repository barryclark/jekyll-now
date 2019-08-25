---
layout: post
title: Better Gem Support (v6.5)
description: >
  Hydejack v6.5 includes various quality-of-life improvements, especially when using the gem-based version of the theme.
tags: [hydejack]
---

This maintenance release includes various quality-of-life improvements,
especially when using the gem-based version of the theme.
These changes come in handy when using Hydejack for a quick (project-) page:
The `home` layout, which is used when using `jekyll new`,
is now a proper layout that displays a few posts/pages below the regular content,
and it is again possible to define an author in `_config.yml`
without setting up a `_data` directory (for more, see blow).

Version 6.5 also includes smaller design adjustments.
Most notably, the default font is now Noto Sans.
With the benefit of hindsight,
using a serif font in combination with the slab headings feels more like a bug in the design than anything else.
However, should you be happy with Noto Serif (the previous default font), there is no need to worry
--- this only effects the default setting.

For the full patch notes, read on.

## Patch Notes
### Added
* Hydejack now uses additional Jekyll plugins by default, which make working with GitHub more convenient.
  They have been added to the `Gemfile` and `_config.yml`.
  Note that existing users need to update their `_config.yml`:

  ~~~yml
  gems:
    - jekyll-default-layout # new
    - jekyll-feed
    - jekyll-optional-front-matter # new
    - jekyll-paginate
    - jekyll-redirect-from
    - jekyll-relative-links # new
    - jekyll-sitemap
  ~~~

* Added `licenses` folder that includes the full license texts of licenses mentioned in `NOTICE.md`.
* You can, once again, define the author in `_config.yml`.
  Using `_data/authors.yml` is still recommended (and takes precedence),
  but this option is more convenient when setting up a quick (project-) page using the gem-based theme.
  Also, a mini-version of `_data/social.yml` can be provided as part `_config.yml`, e.g.:

  ~~~yml
  author:
    social:
      github: https://github.com/qwtel/hydejack
      npm: https://www.npmjs.com/package/hydejack
      download: https://github.com/qwtel/hydejack/archive/v7.5.2.zip

  data_social:
    github:
      name: GitHub
      icon: icon-github
    npm:
      name: npm
      icon: icon-npm
    download:
      name: Download
      icon: icon-box-add
  ~~~

* A download icon has been added to the default icon font and `_data/social.yml` has been updated.
* Added `_includes/my-scripts.html`, `_sass/my-inline.scss` and `_sass/my-style.scss` to make it easier to add custom scripts and styles without modifying the source. This is especially handy when using the gem-based version of the theme.

### Changed
* Loading web fonts now starts earlier and content download no longer blocks
  swapping out the fallback font for the new font.
  Previously, a page containing lots of images could have delayed displaying the web fonts significantly.
* The `home` layout no longer contains a message suggesting that you don't use it.
* The `home` layout now shows up to 5 blog posts and up to 5 pages blow the regular content.
* The version history has been moved from `docs/<version>/versions.md` to `CHANGELOG.md`.
* The license notices have been moved from `docs/<version>/licenses.md` to `NOTICE.md`.
* Updated gem and npm dependencies

### Design
* The default font has been changed from "Noto Serif" to "Noto Sans".
  If you have a `font` entry in `_config.yml`, this will have no effect.
* `nap.jpg` is no longer used as default background image in the gem-based theme.
* The sidebar content width is now limited to the width of the sidebar (this only effects large screens).
* Project cards and pagination buttons now have slightly rounded borders for a less "rigid" look.

#### How to restore the old styles
If you would like to use the old font, add the following to `_config.yml`:

~~~yml
font_heading: "'Roboto Slab', Helvetica, Arial, sans-serif"
font:         "'Noto Serif', Georgia, serif"
google_fonts: "Roboto+Slab:700|Noto+Serif:400,400i,700,700i"
~~~

If you were relying on the default setting for the background image, add the following to `_config.yml`:

~~~yml
image: /hydejack/assets/img/nap.jpg
~~~

Note that you have to replace `/hydejack` with your `baseurl`.

To restore the old sidebar, open (or create) `_sass/my-inline.scss` and add the following:

~~~css
@media screen { .sidebar-sticky { left: 2rem; max-width: none; } }
~~~

To remove the border radius, open (or create) `_sass/my-inline.scss` and add the following:

~~~css
.card, .pagination-item { border-radius: 0!important; }
~~~
