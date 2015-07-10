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

### Installing Jekyll

If you don't have Jekyll already installed, you will need to go ahead and do that.

```
$ gem install jekyll
```

#### Verify your Jekyll version

It's important to also check your version of Jekyll since this project uses Native Sass which
is [only supported by 2.0+](http://jekyllrb.com/news/2014/05/06/jekyll-turns-2-0-0/).

```
$ jekyll -v
# This should be jekyll 2.0.0 or later
```

### Fork, then clone

Fork the repo, and then clone it so you've got the code locally.

### Modify the _config.yml

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

If you'd like to keep the contact form, which uses <http://formspree.io>, you will need to update the email address.

Currently, the `contact.html` has the following:

```html
<form action="http://formspree.io/johnotander@icloud.com" method="POST" class="form-stacked form-light">
```

Where it says `johnotander@icloud.com`, you will need to change that to the email that you wish to have the form data sent to. It will require you to fill the form out when you push it live for the first time so that you can confirm your email.

More setup instructions and advanced options can be found at [http://formspree.io](http://formspree.io/)

### Customizing the CSS

All variables can be found in the `_sass/_variables.scss` file, toggle these as you'd like to change the look and feel of Pixyll.

### Page Animation

If you would like to add a [fade-in-down effect](http://daneden.github.io/animate.css/), you can add `animated: true` to your `_config.yml`.

### Put in a Pixyll Plug

If you want to give credit to the Pixyll theme with a link to <http://pixyll.com> or my personal website <http://johnotander.com> somewhere, that'd be awesome. No worries if you don't.

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

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Thanks to the following:

* [BASSCSS](http://basscss.com)
* [Jekyll](http://jekyllrb.com)
* [Refills](http://refills.bourbon.io/)
* [Solarized](http://ethanschoonover.com/solarized)
* [Animate.css](http://daneden.github.io/animate.css/)
