---
layout: page
title: Build
description: >
  On how to prepare your Hydejack site for a production build and deployment.
---

## Table of Contents
{:.no_toc}
0. this unordered seed list will be replaced by toc as unordered list
{:toc}

## Preparation

Before building, make sure the following is part of your config file:

```yml
# file: _config.yml
compress_html:
  comments:  ["<!-- ", " -->"]
  clippings: all
  endings:   all

sass:
  style:     compressed
```

You can check out [jekyll-compress-html](https://github.com/penibelst/jekyll-compress-html) and
<https://jekyllrb.com/docs/assets/#sassscss> for details.

## Building locally
When building Hydejack it is important to set the environment variable `JEKYLL_ENV` to `production`.
Otherwise the output will not be minified. Building itself happens via Jekyll's `build` command.

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build
~~~

This will generate the finished static files in `_site`,
which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].


## Building locally with latent semantic analysis
By default, related posts are simply the most recent posts.
Hydejack modifies this a bit, by showing the most recent posts of the same category or tag.
However, the results are still pretty "unrelated".
To provide better results, Jekyll supports [latent semantic analysis][lsa] via [`classifier-reborn`][crb]'s
[Latent Semantic Indexer][lsi]

To use the LSI, you first have to disable Hydejack's default behavior,
by setting `use_lsi: true` under the `hydejack` key in your config file.

~~~yml
# file: _config.yml
hydejack:
  use_lsi: true
~~~

Then, you have to run `jekyll build` with the `--lsi` flag:

~~~bash
$ JEKYLL_ENV=production bundle exec jekyll build --lsi
~~~


Note that this may take a long time.
Once it is finished, the generated static files will be located in the `_site` directory,
which can be deployed using the methods outlined in the [Jekyll Documentation][deploy].


## GitHub Pages
To deploy to GitHub Pages, the steps are:

~~~bash
$ cd _site
$ git init # you only need to do this once
$ git remote add origin <github_remote_url> # you only need to do this once
$ git add .
$ git commit -m "Build"
$ git push origin master:<remote_branch>
$ cd ..
~~~

`github_remote_url`
: Find this on your repository's GitHub page.

`remote_branch`
: Either `master` for "user or organization pages", or `gh-pages` for "project pages"

More on [user, organization, and project pages](https://help.github.com/articles/user-organization-and-project-pages/).


Continue with [Advanced](advanced.md){:.heading.flip-title}
{:.read-more}

[deploy]: https://jekyllrb.com/docs/deployment-methods/
[lsa]: https://en.wikipedia.org/wiki/Latent_semantic_analysis
[crb]: http://www.classifier-reborn.com/
[lsi]: http://www.classifier-reborn.com/lsi

*[LSI]: Latent Semantic Indexer
