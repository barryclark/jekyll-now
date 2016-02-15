## Contributing

Pull Requests from our design, development and operations teams of [Haufe.Group](http://www.haufe-lexware.com) and its subsidiaries are greatly appreciated. If you've never contributed to an open source project before we are more than happy to walk you through how to create a pull request. 

The short version of it is to simply clone this repo into (a) a repo of your own account under (b) the name `[your_account_name].github.io`. Upon your first commit the blog should be published at `http://[your_account_name].github.io`. In this way you can add your changes and test them live. When you are finished create a pull request with your changes and submit it against our blog repo. 

Support for Categories and Tags were inspired by [this blog entry](http://www.minddust.com/post/tags-and-categories-on-github-pages/). A list of the defined categories and tags can be found at `_data/categories.yml` and `_data\tags.yml` respectively. If you want to add new categories or tags, you need to add them to the corresponding `.yml` file and add the matching template into the `meta/category` or `meta/tag` directories. Please do not go overboard with adding new categories and tags but try to stay within the ones we have. On the other hand - if you feel strongly about adding one, feel free to submit a pull request.

Author support was inspired by [this blog entry](https://blog.sorryapp.com/blogging-with-jekyll/2014/02/06/adding-authors-to-your-jekyll-site.html). In order to add information on a new author, edit the `_data/authors.yml` file, then use the new key as `author` link in the posts. If an author cannot be found in `authors.yml`, the content of the `author` tag will be used verbose. In that case, no links to any social media (Twitter, Github and LinkedIn are currently supported) will be included.

If you want to find out more about using `github-pages` for blogging or want to improve our blog the following links might be good starting points

* [Jekyll documentation, i.e. how to include images](http://jekyllrb.com/docs/posts/)
* [Github pages powered by Jekyll](https://github.com/jekyll/jekyll/wiki/sites)
* Liquid Documentation [here](https://docs.shopify.com/themes/liquid-documentation/basics) and [here](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)

Please note to set the proxy if you are working from within the Haufe Intranet

    set HTTP_PROXY=http://10.12.1.236:8083/
    set HTTPS_PROXY=http://10.12.1.236:8083/

If you find bugs or issues you can [open an issue](https://github.com/Haufe-Lexware/Haufe-Lexware.github.io/issues/new) describing the problem that you're looking to resolve and we'll go from there.

### Setting up jekyll on Mac OS X

If you happen to have Mac OS X device, it is a lot simpler to test your additions using the `jekyll` command line directly; you don't have to set up github pages, and you can still verify everything is fine.

To install `jekyll`, issue the following command in Terminal (I here assume you have the Mac OS X developer command line tools installed, which include ruby/gem):

```
$ sudo gem install jekyll
```

That will take a while. After that, `cd` into your `Haufe-Lexware.github.io` git clone (on your own fork obviously) and issue a 

```
$ jekyll build
```

This will throw a couple of errors due to missing gems; install them one after the other in the order they occur:

```
$ sudo gem install jekyll-paginate
$ ...
```

Eventually (and hopefully) your `jekyll build` will succeed. After the build has succeeded, you can do a `jekyll serve`, and after that, you can browse the site locally on [`http://127.0.0.1:4000`](http://127.0.0.1:4000).

**Note**: The `https_proxy` setting is also needed on Mac OS X if you're inside the Haufe intranet:

```
$ export http_proxy=http://10.12.1.236:8083
$ export https_proxy=https://10.12.1.236:8083
```

### Setting up jekyll on Windows

The short version of this is: It's complicated, and not actually advisable.

The most promising path to doing this is most probably to set up a Linux VM and do it from there; that involves setting up ruby correctly, which may also be challenging, but it's still a lot simpler (and more supported) than directly on Windows.