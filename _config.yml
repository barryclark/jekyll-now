# Config
# ========================================================================================

# Uncomment and set the URL of your site (with protocol, e.g. `https://`)
# NOTE: You don't need to provide this property when hosting on GitHub Pages or Netlify.
# url:                   https://username.github.io

# Uncomment and set the "base URL" of your site.
# When your site is in a subdirectory, set to `/<name of directory>`,
# with a leading `/` but no trailing `/`. Use the empty string '' otherwise.
# NOTE: You don't need to provide this property when hosting on GitHub Pages or Netlify.
# baseurl:               '/hydejack-starter-kit'


# General settings
# ---------------------------------------------------------------------------------------

# Language of your content in 2-letter code, e.g.: en, de.
# You may also provide a location, e.g.: en-us, de_AT.
lang:                  en

# The title of your blog. Used in the sidebar and the browser tab.
title:                 Starter Kit

# A short description (~150 chars) of the page used for the meta description tag.
# Can use markdown, but no more than one paragraph (enforced by `>`)
description:           >
  Hydejack is a boutique Jekyll theme for hackers, nerds, and academics,
  with a focus on personal sites that are meant to impress.

# A shorter description for the sidebar.
tagline:               Change `tagline` in `_config.yml`

# A list of keywords for your blog
keywords:              []

# A (square) logo for your site.
# If provided, it will be shown at the top of the sidebar.
# It also used by the `jekyll-seo-tag` plugin.
logo:                  /assets/img/logo.png

# This should be the same author as first entry in `_data/authors.yml`.
author:
  # Used by `jekyll-feed`:
  name:                <firstname> <lastname>
  email:               <mail@domain.tld>
  # # Used by `jekyll-seo-tag`:
  # twitter:             <username>

# Add links to the sidebar.
menu:
  - title:             Example
    url:               /example/
  - title:             Documentation
    url:               /docs/
  - title:             About
    url:               /about/

# Add links to the footer.
# Typically you'll want to link to your cookie- or privacy policy (if appliable), etc..
legal:
  - title:             LICENSE
    url:               /LICENSE/
  - title:             NOTICE
    url:               /NOTICE/
  - title:             CHANGELOG
    url:               /CHANGELOG/

# This text will appear in a `<small>` tag in the footer of every page.
copyright:             © 2021. All rights reserved.

# Format of the permalinks
permalink:             /:categories/:year-:month-:day-:title/

# Pagination configuration (used by the `blog` layout)
paginate:              10
paginate_path:         /:num/


# Theme
# ---------------------------------------------------------------------------------------

#theme: jekyll-theme-hydejack
remote_theme: hydecorp/hydejack@v9


# Customizaton
# ----------------------------------------------------------------------------------------
 
# Sidebar image and theme color of the site.
accent_image:          /assets/img/sidebar-bg.jpg
accent_color:          rgb(79,177,186)

# This is used for the `theme-color` meta tag,
# which changes the background color of the browser UI in certain browsers.
# Defaults to `accent_color`.
theme_color:           rgb(25,55,71)

# The string encoding which fonts to fetch from Google Fonts.
# See: <https://hydejack.com/docs/configuration/>
google_fonts:          Roboto+Slab:700|Noto+Sans:400,400i,700,700i

# The text font. Expects a string that is a valid CSS font-family value.
# To change font-weight, see _sass/variables.scss
font:                  Noto Sans, Helvetica, Arial, sans-serif

# The font used for headings. Expects a string that is a valid CSS font-family value.
# To change font-weight, see _sass/variables.scss
font_heading:          Roboto Slab, Helvetica, Arial, sans-serif

# The font used for code blocks. Expects a string that is a valid CSS font-family value.
font_code:             Fira Code, Menlo, Monaco, Consolas, monospace;

defaults:
  # You can use this to provide a default accent color and background for
  # all pages under a given path:
  - scope:
      path:            hyde/
    values:
      accent_color:    rgb(38,139,210)
      theme_color:     rgb(32,32,32)
      accent_image:
        background:    rgb(32,32,32)
        overlay:       false

  # Don't include documents in assets in the sitemap
  - scope:
      path:            assets/
    values:
      sitemap:         false

  - scope:
      path:            licenses/
    values:
      layout:          plain
      sitemap:         false

  # # You can use the following to enable comments on all posts.
  # - scope:
  #     type:            posts
  #   values:
  #     comments:        true

  # `jekyll-seo-tag` will mark collection outputs as `BlogPosting`,
  # but we want them to be `WebPage`s:
  - scope:
      type:            projects
    values:
      seo:
        type:          WebPage
  - scope:
      type:            featured_categories
    values:
      seo:
        type:          WebPage
  - scope:
      type:            featured_tags
    values:
      seo:
        type:          WebPage

kramdown:
  math_engine:         mathjax
  math_engine_opts:    {}
  footnote_backlink:   '&#x21a9;&#xfe0e;'


# 3rd Party Integrations
# ----------------------------------------------------------------------------------------

# Set your Google Analytics id to receive `pageview` events.
# To remove Google Anaylics from your page, remove the line below.
# google_analytics:      UA-XXXXXXXX-X

# Setting a disqus shortname will enable the comment section on
# pages with `comments: true` in the front matter.
# disqus:                <username>

# Setting a tinyletter username will enable the newsletter subscription box.
# PRO version only!
# tinyletter:            <username>


# Hydejack Settings
# ----------------------------------------------------------------------------------------
# These settings are specific to Hydejack.

hydejack:
  # Configure the order of complementary content on blog posts
  post_addons:         [about, newsletter, related, random, comments]

  # Configure the order of complementary content on project pages
  project_addons:      [about, newsletter, other, comments]

  # Set to `true` if you don't want to show an icon indicating external links
  no_mark_external:    false

  # Set to `true` if third party plugins fail to work with dynamically loaded pages
  no_push_state:       false

  # Set to `true` if you want to disable the drawer
  no_drawer:           false

  # Set to `true` if you don't to use the auto-hiding (JavaScript based) navbar.
  # Note that this will not hide the navbar completely, only replace it with a static one.
  # Use custom css to hide completely, e.g. `#_navbar { display: none }`.
  no_navbar:           false

  # Set to true to disable the built-in search functionality.
  # Note that search is disabled during local use to save on build time.
  # Run Jekyll with the `JEKYLL_ENV` environment variable set to `production` to enable.
  no_search:           false

  # Set to `true` if you do not want parts of the css inlined in <head/>
  # This will increase site build speed dramatically!
  no_inline_css:       false

  # Set to `true` if you don't intend on changing the accent color on a per-page basis. 
  # This will increase site build speed!
  no_page_style:       false

  # Code blocks and tables "break" the layout by spanning the full available width.
  # Set this to true if you want them to be the same width as other content.
  no_break_layout:     true

  # Set to `true` to disable the dynamic Table of Contents on large screens.
  no_toc:              false

  # When set to `true`, will not extend the content in the "third column" on large screens.
  # Instead, all content will remains within the center column.
  # Note that this will not affect the Table of Contents, use `no_toc` instead.
  no_third_column:     false

  # Set to `true` if you don't like oversized headlines on large screens.
  no_large_headings:   false

  # Set to `true` if you do not want to expose your resume and projects
  # in machine-readable formats.
  no_structured_data:  false

  # You can set this to `true` if you don't want to set the `theme-color` meta tag,
  # This only affects the meta tag, not the color specified in the app manifest.
  no_theme_color:      false

  # Disable the breadcrumbs above the title
  no_breadcrumbs:      false

  # Set to `true` when building with the `--lsi` option
  use_lsi:             true

  # When using Google Analytics, set to `true` to display a cookie notice banner.
  # When enabled, no user-related data will be stored until the user gives consent.
  cookies_banner:      false

  # Set to `true` if you would like to add a "Powered by Hydejack" link in the footer.
  # Note that this setting has no effect when using the free version.
  advertise:           false

  # Buyers of the PRO version can opt to hide all dates from the theme.
  # Frequent consumers of online content will know that nothing devalues a post like
  # seeing an old date. 
  hide_dates:          false

  # TODO
  hide_last_modified:  false

  # Note that dark mode only works in the PRO version of Hydejack.
  dark_mode:
    # Set to `true` to always use the dark theme.
    always:            false

    # Set to `true` to use the dark theme based on visitors' preference (OS setting).
    dynamic:           true

    # Set to `true` to allow visitors to switch between light and dark mode.
    icon:              true

  # ⚡️ DANGER ZONE ⚡️
  # ----------------
  # This is an _experimental_ feature.
  # Only use if you know what Service Workers are and how they can impact your site!
  offline:
    enabled:           false
    cache_version:     13
    precache_assets:
      - /assets/img/swipe.svg


# Collections
# ----------------------------------------------------------------------------------------

collections:
  featured_categories:
    permalink:         /:name/
    output:            true

  featured_tags:
    permalink:         /tag-:name/
    output:            true

  projects:
    permalink:         /projects/:path/
    output:            true


# File inclusion/exclusion
# ----------------------------------------------------------------------------------------

exclude:
  - .jekyll-cache
  - .sass-cache
  - '*.toml'
  - vendor
  - Gemfile
  - Gemfile.lock
include:
  - .well-known
  - LICENSE.md


# Plugins
# ----------------------------------------------------------------------------------------

plugins:
  - jekyll-default-layout
  - jekyll-feed
  - jekyll-optional-front-matter
  - jekyll-paginate
  - jekyll-readme-index
  - jekyll-redirect-from
  - jekyll-relative-links
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-titles-from-headings
  - jekyll-include-cache
  - jekyll-last-modified-at


# SEO Tag
# ---------------------------------------------------------------------------------------

# Where you proof that you own this site (used by jekyll-seo-tag)
# google_site_verification: <verification-id>
# -- or --
# webmaster_verifications:
#   google:              <verification-id>
#   bing:                <verification-id>
#   alexa:               <verification-id>
#   yandex:              <verification-id>

# Used for twitter cards
# twitter:
#   username:            <username>

# Used for facebook open graph
# facebook:
#   app_id:              <id>
#   publisher:           <id>
#   admins:              <id>

# Used on index and about sites
# social:
#   name:                <firstname> <lastname>
#   links:
#     - https://twitter.com/<username>
#     - https://github.com/<username>


# Plugin Configs
# ---------------------------------------------------------------------------------------
optional_front_matter:
  remove_originals:    true

readme_index:
  remove_originals:    true
  with_frontmatter:    true

relative_links:
  collections:         true

titles_from_headings:
  strip_title:         true
  collections:         true

compress_html:
  comments:            ["<!--", "-->"]
  clippings:           all
  endings:             all
  ignore:
    envs:              [development]

sass:
  style:               compressed

# Jekyll Compose Defaults
# ---------------------------------------------------------------------------------------

jekyll_compose:
  default_front_matter:
    drafts:
      layout: post
      description: > 
        A short ~160 character description of your post for search engines,
        social media previews, etc.
      image:
        path: /assets/img/sidebar-bg.jpg
    posts:
      layout: post
      description: > 
        A short ~160 character description of your post for search engines,
        social media previews, etc.
      image:
        path: /assets/img/sidebar-bg.jpg
    projects:
      layout: project
      description: > 
        A short ~160 character description of your post for search engines,
        social media previews, etc.
      image:
        path: /assets/img/sidebar-bg.jpg
      links:
        - title: Project Link
          url: https://example.com
