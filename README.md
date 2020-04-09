# Massively
> This is Massively, a text-heavy, article-oriented design built around a huge background
image.

See a preview of the Massively Jekyll Theme here: [https://iwiedenm.github.io/jekyll-theme-massively/](https://iwiedenm.github.io/jekyll-theme-massively/). <br>
Massively was originally designed by HTML5UP and Jekyll was integrated by [JekyllUp: Jekyll Themes](https://jekyllup.com)

## How to Use This Theme
Jekyll consumes themes in two flavors; gem-based or spread across multiple folders
in the site source. This port is of the second type. Concretely, it means that you
can simply grab the [zip][zip] or clone this repository, run `bundle install`
in the new directory and finally `bundle exec jekyll serve`.
You can now access your brand-new Jekyll site on [http://127.0.0.1:4000/][local].
Enjoy!

If you're completely new to Jekyll, check out it's [documentation][jekyll] first.
It's not too hard, we promise!

[zip]: https://github.com/iwiedenm/jekyll-theme-massively-src/archive/master.zip
[local]: http://127.0.0.1:4000/
[jekyll]: https://jekyllrb.com/

## Features

### Slapform.com Integration
[Slapform](https://slapform.com) is supported out of the box! Just add your email to ```_config.yml``` and test the form.
Every time one of your visitors submits the form, you'll get an email straight to your inbox containing the submission so you can get back to them right away. Slapform is very extendable, including AJAX submissions, webhooks, and more.

### Auto-Generating Sitemap
The sitemap is auto generated! Just simply change the sitemap variable in front matter of each page. It looks like so...
```
sitemap:
  priority: 0.7
  lastmod: 2017-11-02
  changefreq: weekly
```

## Credits
### Original README from HTML5 UP
```
Massively by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)


This is Massively, a text-heavy, article-oriented design built around a huge background
image (with a new parallax implementation I'm testing) and scroll effects (powered by
Scrollex). A *slight* departure from all the one-pagers I've been doing lately, but one
that fulfills a few user requests and makes use of some new techniques I've been wanting
to try out. Enjoy it :)

Demo images* courtesy of Unsplash, a radtastic collection of CC0 (public domain) images
you can use for pretty much whatever.

(* = not included)

AJ
aj@lkn.io | @ajlkn


Credits:

	Demo Images:
		Unsplash (unsplash.com)

	Icons:
		Font Awesome (fortawesome.github.com/Font-Awesome)

	Other:
		jQuery (jquery.com)
		Misc. Sass functions (@HugoGiraudel)
		Skel (skel.io)
		Scrollex (github.com/ajlkn/jquery.scrollex)
```
