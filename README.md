Hi there, source peeker!

Here is where you can find the code belonging to my little space of the internet [miriamtocino.com](http://www.miriamtocino.com/).

Below you find a list of important information and details that I use on a daily basis, or I will need in the future if I haven't worked on the project for a long time ☺

On A Daily Basis
=======

## Folder Structure

Find below the project structure so people can find its way...

```bash
.
| + _cache/               # it needs to be one
| + _drafts/              # posts in-progress
| + _includes/            # html files to be included in layouts
  |   |-- head.html
  |   |-- main-sidebar.html
  |   |-- footer.html
  |   | ...

| + _layouts/             # page layouts to be used as templates
  |   |-- blank.html
  |   |-- gallery.html
  |   |-- post.html
  |   |-- related-writings.html
  |   | ...

| + _plugins/             # third-party plugins
| + _posts/               # posts published on the site
| + _sass/                # styles
  |
  | + base/                     # reset, typography, site-wide
  |   |-- _index.scss           # imports for all base styles
  |   |-- _base.scss            # base styles
  |   |-- _normalize.scss       # normalize v3.0.1
  |   |-- _susy-setup.scss      # global layouts definitions
  |   |-- _breakpoints.scss     # media queries for different devices
  |
  | + layout/                   # major components, e.g., header, footer etc.
  |   |-- _index.scss           # imports for all layout styles
  |   | ...
  |
  | + modules/                  # minor components, e.g., buttons, widgets etc.
  |   |-- _index.scss           # imports for all modules
  |   | ...
  |
  | + utilities/                # non-CSS outputs (i.e. mixins, variables) & non-modules
  |   |-- _index.scss           # imports for all mixins + global project variables
  |   |-- _fonts.scss           # @font-face mixins
  |   |-- _functions.scss       # ems to rems conversion, etc.
  |   |-- _global.scss          # global variables
  |   |-- _helpers.scss         # placeholder helper classes
  |   |-- _mixins.scss          # media queries, CSS3, etc.
  |   |-- _vendor-prefixes.scss # mixins for all vendor prefixes
  |
  |-- styles.scss               # primary Sass file

| + _site/                # auto-generated folder (build)
| + css/                  # auto-processed styles
| + images/               # images included in the site
| + js/                   # scripts included in the site
| + projects/             # small personal projects hosted under miriamtocino.com
  |
  | + sketches/           # playing with parallax
  | ...

|-- _config.yml           # jekyll configuration
|-- about.html            # published about page
|-- archive.html          # published archive page
|-- bookshelf.html        # published bookshelf page
|-- CNAME                 # re-directing to GitHub Pages site
|-- elearning.html        # published elearning page
|-- fedd.html             # for RSS
|-- impressum.html        # published impressum page
|-- index.html            # published homepage
|-- projects.html         # published projects page
|-- README.md             # you'll never regret being organized ☺

```

## jekyll

The site is built with [jekyll](http://jekyllrb.com/).
List of commands related to jekyll and ready to use!

```bash
jekyll serve
# => A development server will run at http://localhost:4000/
# Auto-regeneration: enabled. Use `--no-watch` to disable.

jekyll serve --drafts
# process and render draft posts
```