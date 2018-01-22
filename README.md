> March, 2016: If you're on an old version of Jekyll Now and run into a) build warnings or b) syntax highlighting issues caused by [Jekyll 3 and GitHub Pages updates](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0), just :sparkles:[update your _config.yml](https://github.com/barryclark/jekyll-now/pull/445/files):sparkles: and you'll be set!

# Jekyll Now
## Local Development

1. Install Jekyll and plug-ins in one fell swoop. `sudo gem install github-pages` This mirrors the plug-ins used by GitHub Pages on your local machine including Jekyll, Sass, etc.
2. Clone down your fork `git clone https://github.com/yourusername/yourusername.github.io.git`
3. This blog use 'jekyll-theme-cayman' theme, so execute `sudo gem install jekyll-theme-cayman` to install cayman theme.
4. Serve the site and watch for markup/sass changes `jekyll serve`
5. View your website at http://127.0.0.1:4000/
6. Commit any changes and push everything to the master branch of your GitHub user repository. GitHub Pages will then rebuild and serve your website.

Note: If you encounter error as the following:

![Ruby Error](/images/ruby-error.png "Ruby Error")

Please run the command line to fix it:
```bash
$ sudo apt-get update
$ sudo apt-get install ruby-dev
```


## Write your post
1. Fork this repo to your local repo
2. Clone the local repo, and make a local development enviroment as in the section `Local Development`.
3. Make your post in the `_posts` folder. All files must to write according to [kramdown](https://kramdown.gettalong.org/documentation.html) syntax. You can use latex in your file see https://github.com/ChappiebotAI/chappiebotai.github.io/blob/master/_posts/2018-1-7-reinforce-and-neural-network.md for a example.
4. Commit your changes and create a pull request
5. To write a post as draft please follow this guide [https://jekyllrb.com/docs/drafts/](https://jekyllrb.com/docs/drafts/)
