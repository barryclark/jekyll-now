---
layout: post
title: Jekyll Server Error - 'gems' to 'plugins'
---

On running `jekyll serve` I was getting this error:

<pre><code>
jekyll serve
Configuration file: /Users/ben/git/benhamilton.github.io/_config.yml
       Deprecation: The 'gems' configuration option has been renamed to 'plugins'. Please update your config file accordingly.
</code></pre>

To fix it, the `_config.yml` file needed the following:

<pre><code>
gems:
  - jekyll-sitemap # Create a sitemap using the official Jekyll sitemap gem
  - jekyll-feed # Create an Atom feed using the official Jekyll feed gem
</code></pre>

changes to:

<pre><code>
plugins:
  - jekyll-sitemap # Create a sitemap using the official Jekyll sitemap gem
  - jekyll-feed # Create an Atom feed using the official Jekyll feed gem
</code></pre>

Now when running `jekyll serve` I no longer get the error.
