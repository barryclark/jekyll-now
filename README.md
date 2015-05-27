# tufte-jekyll theme

The *Tufte-Jekyll* theme is a natural extension of the work done by [Dave Leipmann](https://github.com/daveliepmann/tufte-css) on Github that created a CSS file that allows web writers to use the simple and elegant style employed by Edward Tufte in his published materials.

To incorporate these styles into a Jekyll theme, I have made some very slight modifications that attempt to maintain the feel of the CSS styles in this repo.

## Demo

A sample site with self-documenting content is available [here](http://clayh53.github.io/tufte-jekyll/) on github pages.

## Installation

I'm not going to go into great detail here. I am just going to assume that anyone interested in either Jekyll, Edward Tufte's work or Github has some basic skills. I created this with Ruby 2.2.0 and Jekyll 2.5.3. There is absolutely nothing exotic going on here, so you can probably make any recent version of Jekyll work with this setup.

So copy, pull, download a zipfile or whatever and fire it up. 

```
%> cd ~/thatPlaceYouPutIt/tufte-jekyll
%> jekyll build
%> jekyll serve -w
```

And then point your browser at localhost:4000

## Some things about the things

I needed to create several custom Liquid tags to wrap content in the right kind of tags. You will create your posts in the normal way in the ```_posts``` directory, and then edit them with Github-Flavored Markdown. To all that GFM goodness, you can use the following custom Liquid tags in your content area.

### Sidenote

This tag inserts a *sidenote* in the content, which is like a footnote, only its in the spacious right-hand column. It is numbered. Just put it in the content like you would insert a footnote like so:

```
blah lorem blah{% sidenote 1 'This is a random sidenote'%} blah blah
```
And it will add the spans and superscripts. You are responsible for keeping track of the numbering!

### Margin note

This tag is essentially the same as a sidenote, but heh, no number. Like this:

```
lorem nobeer toasty critters{% marginnote 'Random thought when drinking'%} continue train of thought
```
### Full width image

This tag inserts an image that spans both the main content column and the side column. Full-width IOW:

```
blah blah {% fullwidth /url/to/image 'A caption for the image'}
```

### Main column image

This tag inserts an image that is confined to the main content column:

```
blah blah{% maincolumn /path/to/image 'This is the caption' %} blah
```

### Margin figure

This tag inserts and image in the side column area:

```
blah blah {% marginfigure /path/to/image 'This is the caption' %} blah
```
### New thought

This tag will render its contents in small caps. Useful at the beginning of new sections:

```
{% newthought 'This will be rendered in small caps %} blah blah
```
### Mathjax

Totally used this functionality from a [gist by Jessy Cowan-Sharpe](https://gist.github.com/jessykate/834610) to make working with Mathjax expressions a little easier. Short version, wrap inline math in a tag pair thusly: ```{% m %}mathjax expressino{% em %}``` and wrap bigger block level stuff with ```{% math %}mathjax expression{% endmath %}```

As a side note - if you do not need the math ability, navigate to the ```_data/options.yml``` file and change the mathjax to 'false' and it will not load the mathjax javascript.

## Other stuff, Problems and Programming Sorrow

### SASS

I made a half-hearted effort to use Sass to create the css file used by this theme. If you would like to change things like fonts, colors and so forth, edit the ```_scss/_settings.scss``` file. I really didn't do any heavy lifting with SASS on this project since the CSS is relatively straightforward.

### Social icons

You can edit the ```_data/social.yml``` file and put in your own information for the footer links

### Silly-ass badge in the upper left

In the ```/assets/img``` directory is a file called ```badge_1.png```. This file's parent is ```badge_1.psd``` and is an editable photoshop file with layers for the letters comprising the initials. Change them to suit your fancy. Or just substitute another badge in its place. You can edit the ```/_includes/header.html``` file and change the file that it points too. Find your favorite Tufte emoji and fly your freak flag proudly.

### Which brings me to sorrow and shame

Getting this thing to display properly on *Github Pages* revealed an issue with path names. So here is the deal: In the ```/_config.yml``` file is a setting called *baseurl*. This is used by the Jekyll engine to construct all the proper links in the static site. This is all well and good for the bones of the site. Right now it is set to '*tufte-jekyll*' and all the links are created assuming that is the root path. On your local installation, if you tire of typing in ```localhost:4000/tufte-jekyll``` all you need to do is change that baseurl parameter to '/'.

However... When writing content that includes images that are inside the custom Liquid tags, you must hard-code the *entire* path for your intended site configuration. Normally, one could enter an image path something like ```{{site.baseurl}}/assets/img/someimage.png``` and it would be properly fleshed out. But my Liquid tags are pretty dumb, and they do not recursively call the Liquid engine to properly build the url. At the present, my N00b status in the Ruby language has prevented me from fixing this problem. 

Here are some discussions about the reason behind the baseurl business:

* [Jekyll docs](http://jekyllrb.com/docs/configuration/)
* [Parker Moore](http://blog.parkermoore.de/2014/04/27/clearing-up-confusion-around-baseurl/)
* [Andrew Shell](http://blog.andrewshell.org/understanding-baseurl/)

### Rakefile

I have added a boilerplate Rakefile directly from the [jekyll-rake-boilerplate repo](https://github.com/gummesson/jekyll-rake-boilerplate). This saves you a small amount of time by prepending the date on a post name and populated the bare minimum of YAML front matter in the file. Please visit the link to the repo to find out how it runs. One thing to note is that there should be *no* space between the task and the opening bracket of your file name. ```rake post["Title"]``` will work while ```rake post ["Title"]``` will not. 

There is another rakefile (UploadtoGithub.Rakefile) included that only has one task in it - an automated upload to a *Github Pages* location of the site. This is necessary because of the plugins used by this theme. It does scary stuff like move your ```_site``` somewhere safe, delete everything, move the ```_site``` back and then do a commit to the ```gh-pages``` branch of your repository. You can read about it [here](http://blog.nitrous.io/2013/08/30/using-jekyll-plugins-on-github-pages.html). You would only need to use this if you are using Github project pages to host your site. Integration with the existing Rakefile is left as an exercise for the reader.

### To-do list

It would be nice to have the sidenotes tag do all the counting for you. I have a feeling it is going to involve some ```@@rubyVariables``` to keep track of things. I'll probably get around to digging into this sooner or later, but if any of you Ruby gods out there want to take a whack at it, please fork this repo and go for it.

This is not a professional shiny "works-out-of-the-box theme". But bang on it a little and I am sure you can make it work for you.



