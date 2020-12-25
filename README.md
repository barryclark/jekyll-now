This is an example one-pager site that prospective job-seekers can use to quickly
highlight their accomplishments and make an introduction. It can be hosted for free using
GitHub Pages (as a Jekyll page).

This is based on a heavily pared-down version Jerome Lachaud's [Freelancer Jekyll theme](https://github.com/jeromelachaud/freelancer-theme).
Jerome's original theme is well-suited for designers to easily assemble a portfolio site of their visual work; this
is a prose-centric version tailored to software developers. [formspree](http://formspree.io/) is used for the contact form.

## Demo

View an example one-pager [here](http://chuckgroom.com/onepage-bio/)

## Installation

On your command line do:
```sh
git clone https://github.com/chuckgroom/onepage-bio.git
cd onepage-bio

# As mentioned in the main page of http://jekyllrb.com/
gem install bundler jekyll

# You may not need the following command
bundle update --bundler

# Following command builds the code and runs the local server
bundle exec jekyll serve
```
See [Jekyll below for details.](#Jekyll)

## How to use

 - Place your photo in `/img/profile.png`
 - (Optional) Update the favicon `/img/icon.png`
 - Edit `_config.yml` to give your name, email address, social media contacts, etc. You can also update the color scheme.
 - Edit content in `/_includes/about_me.html` and `/_includes/interests.html`

## Screenshot

![screenshot](https://raw.githubusercontent.com/chuckgroom/onepage-bio/master/screenshot.png)

## Jekyll

For more details on Jekyll, read the [documentation](http://jekyllrb.com/).
