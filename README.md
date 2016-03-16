# Pixyll

[pixyll.com](http://www.pixyll.com)

![Pixyll screenshot](https://cloud.githubusercontent.com/assets/1424573/3847467/134aa236-1e66-11e4-8421-4e8c122118dc.png)

Pixyll is a simple, beautiful theme for Jekyll that emphasizes content rather than aesthetic fluff. It's mobile _first_, fluidly responsive, and delightfully lightweight.

It's pretty minimal, but leverages large type and drastic contrast to make a statement, on all devices.

This Jekyll theme was crafted with <3 by [John Otander](http://johnotander.com)
([@4lpine](https://twitter.com/4lpine)).

中文版 <https://github.com/ee0703/pixyll-zh-cn>.

## Getting Started

If you're completely new to Jekyll, I recommend checking out the documentation at <http://jekyllrb.com> or there's a tutorial by [Smashing Magazine](http://www.smashingmagazine.com/2014/08/01/build-blog-jekyll-github-pages/).

```
$ git clone git@github.com:johnotander/pixyll.git
$ cd pixyll
$ gem install bundler # If you don't have bundler installed
$ bundle install
```

#### Verify your Jekyll version

It's important to also check your version of Jekyll since this project uses Native Sass which
is [only supported by 2.0+](http://jekyllrb.com/news/2014/05/06/jekyll-turns-2-0-0/).

### Fork, then clone

Fork the repo, and then clone it so you've got the code locally.

### Modify the `_config.yml`

The `_config.yml` located in the root of the Pixyll directory contains all of the configuration details
for the Jekyll site. The defaults are:

```yml
# Site settings
title: Pixyll
email: your_email@example.com
author: John Otander
description: "A simple, beautiful theme for Jekyll that emphasizes content rather than aesthetic fluff."
baseurl: ""
url: "http://pixyll.com"

# Build settings
markdown: kramdown
permalink: pretty
paginate: 3
```

### Jekyll Serve

Then, start the Jekyll Server. I always like to give the `--watch` option so it updates the generated HTML when I make changes.

```
$ jekyll serve --watch
```

Now you can navigate to `localhost:4000` in your browser to see the site.

### Using Github Pages

You can host your Jekyll site for free with Github Pages. [Click here](https://pages.github.com/) for more information.

#### A configuration tweak if you're using a gh-pages sub-folder

In addition to your github-username.github.io repo that maps to the root url, you can serve up sites by using a gh-pages branch for other repos so they're available at github-username.github.io/repo-name.

This will require you to modify the `_config.yml` like so:

```yml
# Site settings
title: Repo Name
email: your_email@example.com
author: John Otander
description: "Repo description"
baseurl: "/repo-name"
url: "http://github-username.github.io"

# Build settings
markdown: kramdown
permalink: pretty
paginate: 3
```

This will ensure that the the correct relative path is constructed for your assets and posts. Also, in order to run the project locally, you will need to specify the blank string for the baseurl: `$ jekyll serve --baseurl ''`.

##### If you don't want the header to link back to the root url

You will also need to tweak the header include `/{{ site.baseurl }}`:

```html
<header class="site-header px2 px-responsive">
  <div class="mt2 wrap">
    <div class="measure">
      <a href="{{ site.url }}/{{ site.baseurl }}">{{ site.title }}</a>
      <nav class="site-nav right">
        {% include navigation.html %}
      </nav>
    </div>
  </div>
</header>
```

A relevant Jekyll Github Issue: <https://github.com/jekyll/jekyll/issues/332>

### Contact Form

The contact form uses <http://formspree.io>. It will require you to fill the form out and submit it once, before going live, to confirm your email.

More setup instructions and advanced options can be found at [http://formspree.io](http://formspree.io/)

### Disqus

To configure Disqus, set up a [Disqus site](https://disqus.com/admin/create/) with the same name as your site. Then, in `_config.yml`, edit the `disqus_shortname` value to enable Disqus.

### Customizing the CSS

All variables can be found in the `_sass/_variables.scss` file, toggle these as you'd like to change the look and feel of Pixyll.

### Page Animation

If you would like to add a [fade-in-down effect](http://daneden.github.io/animate.css/), you can add `animated: true` to your `_config.yml`.

### Put in a Pixyll Plug

If you want to give credit to the Pixyll theme with a link to <http://pixyll.com> or my personal website <http://johnotander.com> somewhere, that'd be awesome. No worries if you don't.

### Web analytics and search engines

You can measure visits to your website either by using [Google Analytics](https://www.google.com/analytics/) tracking embed or the more advanced [Google Tag Manager](https://www.google.com/analytics/tag-manager/) container.
* For Google Analytics set up the value for `google_analytics`, it should be something like `google_analytics: UA-XXXXXXXX-X`.
* For Google Tag Manager set up the value for `google_tag_manager`, it should be something like: `google_tag_manager: GTM-XXXXX`.
* _Do not_ set both of above methods because this will cause conflicts and skew your reporting data.
* Remember that you need to properly configure the GTM container in its admin panel if you want it to work. More info is available in [GTM's docs](https://www.google.com/analytics/tag-manager/resources/).

Your website is, by default, set to be allowed for crawling and indexing by search engines. (Unless you made yourself a custom robots.txt file). You can use front matter settings on each page to control how search engines will it. Sometimes you may want to exclude a particular page from indexing or forbid Google to store a copy of your page in its cache. It is up to you. Use the `meta_robots` frontmatter key and assign values based on [this table](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag?hl=en#valid-indexing--serving-directives). Some examples:

```yaml
# exclude page from index
meta_robots: noindex

# allow indexing, disallow caching
meta_robots: noarchive

# allow indexing, disallow crawling links
meta_robots: nofollow

# disallow indexing, follow links
meta_robots: noindex,follow
```

In order to get more information about your website's status in search engines, you can register it in [Google Search Console](https://www.google.com/webmasters/tools/home) and/or [Bing Webmaster Tools](http://www.bing.com/toolbox/webmaster). Both these tools will ask you to authorize your website with them and there are couple of ways to do that. Pixyll supports verification via meta tags - just fill in values for `google_verification` and/or `bing_verification` in `_config.yml`, the verification strings and meta tags will then be added automatically.

If search engine optimization is your thing, you can also set up `meta_description` values for each page/post. By default Pixyll uses `summary` to populate the `<meta name="description" content="...">` tag and falls back to `description` from `_config.yml` if `summary` is not present in page/post's front matter. The `summary` is also used for generating Open Graph tags. Why would you want to use a dedicated variable for meta description? Because character limit to properly display this description in search results (as a snippet) is way smaller than in Open Graph. It is recommended to keep it at 155-160 characters, for more in-depth info read [this article](https://moz.com/blog/i-cant-drive-155-meta-descriptions-in-2015).

And lastly - if you happen to write in language other than English be sure to change `og_locale` in `_config.yml` to reflect it.

### Enjoy

I hope you enjoy using Pixyll. If you encounter any issues, please feel free to let me know by creating an [issue](https://github.com/johnotander/pixyll/issues). I'd love to help.

## Upgrading Pixyll

Pixyll is always being improved by its users, so sometimes one may need to upgrade.

#### Ensure there's an upstream remote

If `git remote -v` doesn't have an upstream listed, you can do the following to add it:

```
git remote add upstream https://github.com/johnotander/pixyll.git
```

#### Pull in the latest changes

```
git pull upstream master
```

There may be merge conflicts, so be sure to fix the files that git lists if they occur. That's it!

## Thanks to the following

* [BASSCSS](http://basscss.com)
* [Jekyll](http://jekyllrb.com)
* [Refills](http://refills.bourbon.io/)
* [Solarized](http://ethanschoonover.com/solarized)
* [Animate.css](http://daneden.github.io/animate.css/)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
