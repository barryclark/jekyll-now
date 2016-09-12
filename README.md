# accent

#### [Demo & Documentation](http://ankitsultana.me/accent)

### Installation

I'd strongly recommend you to fork [accent](http://github.com/bk2dcradle/accent) and use the "upstream" strategy described on [this page](https://help.github.com/articles/fork-a-repo/) to
keep accent up to date.

If you don't want to do that, just clone [accent](http://github.com/bk2dcradle/accent) and use

```bash
bundle exec jekyll serve
```
in the root of the accent directory, or, simply [download](https://github.com/bk2dcradle/accent/archive/gh-pages.zip) accent.

### Customization

You can edit the variables in `_config.yml` as per your needs. Edit only the variables under the section marked *User Settings*.

Most of the variables are self explanatory. Notes about few of the non obvious ones:

1. You can change the **hex value** of the variable `$accent-color` in `_sass/_style.scss` to any color value that you want. This will change the accent of the theme.

2. Set `intro` to `true` to reveal a short bio section on the index page.

3. Setting `about_footer` to *true* or *false* will turn the `about` section at the bottom of every post to *on* or *off* respectively.

4. `description` is the summary that will show up in places like facebook thumbnails,
twitter cards and google search results.


*Note:* Don't change any variable under *Build Settings*.

---

### Usage

* To create a new post, simply save the `.markdown` file in the `_posts` directory in the format.

```
year-month-day-name-of-the-file.markdown
```

* For Syntax highlighting, accent uses *Rouge* which is the default highlighter in Jekyll 3 and above. If you don't know how to highlight a code block, [refer](http://jekyllrb.com/docs/templates/).

* To set up Google Analytics tracking id, just set the `tracking_id` variable in `_config.yml`.

---

### License

[MIT](https://github.com/bk2dcradle/accent/blob/gh-pages/LICENSE). Copyright &copy; [Ankit Sultana](http://twitter.com/AnkitSultana)
