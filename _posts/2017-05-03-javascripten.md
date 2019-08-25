---
layout: post
title: JavaScripten (v6)
description: >
  Hydejack v6 adds a layer of JavaScript, effectively turning the whole site into a single page app.
tags: [hydejack]
---

Hydejack has always featured a JavaScript-heavy sidebar, but other than that, JS has been used sparingly.
This changes with this release, which adds a ton of (optional) code that changes the feel of the theme dramatically.

## Major
Pages are now loaded and swapped through JavaScript. This has a number of effects.
First of all, it looks cool, but the animations aren't just about aesthetics:
They also help to hide the network time of fetching the next page, making the entire site feel faster.
At the same time, the FOUC introduced in the last release will no longer occur (except on the initial page load).

* Most JS is now unified in the `_js` directory and written in ES2016.
* The `blog-by-tag` layout has been renamed to `list`.
* `public` folder has been renamed to `assets` to make the theme compatible with Jekyll's gem-based themes.
* Tags are now supported via Jekyll Collections instead of `_data`.
* The sidebar can now add links to all kinds of pages.
* Categories are now supported.
* Author information moved to `_data/authors.yml`
* Added support for multiple authors.
* Using `jekyll-feed` plugin (supported on GitHub Pages) instead of custom solution.
* Added `about` layout.
* Added `not-found` layout.
* Added `redirect` layout

See the [the migration guide][upgrade] for instructions on how to upgrade.

## Minor
* The "accent" font (heading font) is now used for all headings.
  This gives the theme a "bolder" look and was necessary for the animation: link => heading.
* Changed default text font from "PT Serif" to "Noto Serif".
* Added [CSS classes][writing] for styling markdown content.
* Links have a new style.
  They now always display an underline to make the choice of the link color less critical (darker colors were hard to
  distinguish from regular text).
* Made social media icons larger and easier to tap.
* Social media icons are now also part of the "about" sections of a post.
* Added support for a copyright notice at the bottom. Can be set via the config variable `copyright`.
* Changed responsive breakpoints and added support for very large displays.
* The site is now printable.
* The `blog` layout now only shows the excerpt instead of the full post.
* Links to external pages are now marked with a symbol.
* Added margin above social media icons to prevent accidental tapping
* Added gem files so that `bundle install` and `bundle exec jekyll serve` work
* Disabled HTML minification when running via `jekyll serve`
* Added dingbat to signal end of post

## Fixes
* Related posts is no longer blank for posts that do not belong to a category.
* Footnotes now use the text version of "leftwards arrow with hook" instead of the emoji on iOS.
* Text is no longer invisible while waiting for Google Fonts to load.
* Always show scrollbar to prevent layout "jumps"

***

[Get *JavaScripten* on GitHub](https://github.com/qwtel/hydejack/releases/tag/v7.5.2)

[upgrade]: ../docs/7.5.2/upgrade.md
[writing]: ../docs/7.5.2/writing.md

*[FOUC]: Flash of Unstyled Content
