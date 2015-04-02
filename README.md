# Tinker Ideas

This is the repo where all Tinkerbox folks can easily create posts to share their knowdedge and stories.

## What It Does

It is a static site generator for Github hosted blogs.

## How It works

You fork/clone this repo, create a blog using any text editer you like, then send a push request back to master branch. That's it, your post will appears at our [offical blog site](https://tinkerbox.github.io).

## Requirements

Some `git` and `markdown` knowledge is needed.

## Quick Start

### Step 0) Some tools you need.

[Homebrew](http://brew.sh) A easy way to install other command line tools on Mac OS.

```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

[Jekyll](http://jekyllrb.com) is the blog engine to tranform .md text into static websites

```
$ gem install jekyll
```

[Git](http://git-scm.com/)

```
$ brew install git
```

### Step 1) Fork the reop to your User Repository and start to write blog

```
$ git clone https://github.com/tinkerbox/tinkerbox.github.io.git
```

Now you will have a local repo folder named `tinkerbox.github.io`, and the `_posts/` is the folder where all the company blogs will live. To create a new post, all you need to do is create a new file in the `_posts/` directory, and the blog MUST be in the following format:

```
YYYY-MM-DD-title.MARKUP
```

`MARKUP` is the file extension representing the format used in the file. For example, the following are examples of valid post filenames:

```
2011-12-31-new-years-eve-is-awesome.md
2012-09-12-how-to-write-a-blog.textile
```

### Step 3) Commit and Publish your blog post

Create a new git branch for your post.

Edit `/_posts/2014-3-3-Hello-World.md` to publish your blog post. This [Markdown Cheatsheet](http://www.jekyllnow.com/Markdown-Style-Guide/) might come in handy.

Once you finish editing, try to run `jekyll serve` to see how it looks in your local environment at `127.0.0.1:4000`

Then you can push the branch to github and create a pull request.


```
git push origin your-branch-name:your-branch-name
```

You can discuss with people under the pull request until you think it's ready to go public, now you merge the PR into `master` and the world will see your work immediately. Cheers!


You can add additional posts in the browser on GitHub.com too! Just hit the + icon in `/_posts/` to create new content. Just make sure to include the [front-matter](http://jekyllrb.com/docs/frontmatter/) block at the top of each new blog post and make sure the post's filename is in this format: year-month-day-title.md
