# Onefootball blog, notes to conributors

The website is accessible at https://onefootball.github.io/. It uses the GitHub Pages system to publish static pages generated with Jekyll. The installation and configuration has been done with that tutorial http://www.smashingmagazine.com/2014/08/01/build-blog-jekyll-github-pages/.


## General structure of the project

  * All blog posts are in the `_posts/` directory. The naming pattern should be `YYYY-MM-DD-$title.md`.
  * If you want to tweek the theme, checkout the markup in `_layouts/` and the CSS/SASS in `_sass`
  * Images should be stored in `images/` and grouped by date (YYYY-MM).
  * Linking to images from a post is done with the `site.baseurl` variable: `![_config.yml]({{ site.baseurl }}/images/2015-07/hacker.jpg)`


## Jekyll (needed to test locally)


### Installing

See https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll for a full documentation.

Quick start (on Debian):

```
  $ cd $project_dir
  $ rvm install 2.1.5 # needs >2
  $ ruby --version # if necessary `$ rvm use 2.1.5`
  $ gem install bundler
```

### Running

```
  $ git checkout master
  $ bundle exec jekyll serve
```

Then open your browser on `http://localhost:4000`.

