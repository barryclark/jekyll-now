---
layout: post
title: Easily Check if a Link is DoFollow or NoFollow with CSS
tags: [meta, github]
keywords: [dofollow, nofollow, link, css, javascript, stylesheet]
image: /images/reddit-marked-up.png
---

Whenever I find a link to my site on another website, I wonder if that link is a dofollow or nofollow link. One way, of course, is to view the source of the page and see if that link has a nofollow attribute.

However, this can be tedious. I wanted a way I could quickly identify whether or not a link is a nofollow without looking through the source.

## What is a NoFollow / DoFollow?

First, a bit of background on the two types of links.

At the most basic level, a link is a "nofollow" link if it is marked as such. There are two ways to mark links as "nofollow"  - the first is to mark every link on a page as nofollow with a meta tag:

```html
<meta name="robots" content="nofollow" />
```

The second, and more common way, is to mark individual links as nofollow by specifying the rel attribute in a link tag:

```html
<a href="http://www.example.com" rel="nofollow">Example dot Com</a>
```

Any link that is not marked nofollow is a dofollow, although the following meta tag does exist:

```html
<meta name="robots" content="follow" />
```

Most users are not directly affected by the type of link - instead, these links are a signal to search engine bots how to include the following link in the bot's ranking system.

A dofollow link tells a search engine bot to improve the linked site in its search engine results.

A nofollow link tells a search engine bot not to consider the link in its search engine results.

A nofollow link is not necessarily bad. In fact, many SEO experts believe having a mix of nofollow and dofollow links to your site is important.

For more discussion on nofollow and dofollow links, check out the following articles:

* [SEO: What Are NoFollow and DoFollow Links?](https://www.bloggingbasics101.com/nofollow-vs-dofollow/)
* [Understand DoFollow & Nofollow Link: SEO Basics](https://www.shoutmeloud.com/understand-dofollow-nofollow-link-seo-basics.html)
* [Use rel="nofollow" for specific links](https://support.google.com/webmasters/answer/96569)

## Enter CSS Attribute Selectors

Cascading Style Sheets (CSS) define how webpages are presented - including layout, colors, and fonts. With CSS, various HTML tags can be styled differently depending on the tag's attributes.

Most CSS styling depends on standard HTML attributes - particularly class and id. rel is nonstandard, but CSS can select using nonstandard attributes as well using [attribute selectors](https://css-tricks.com/almanac/selectors/a/attribute/).

If I wanted to select all tags with a rel attribute, I would use the CSS selector `[rel]`. 

However, sometimes people might use a value for the rel attribute that is not nofollow. Therefore, if I want to select all tags with a rel attribute with a value of nofollow, I would use the CSS selector `[rel="nofollow"]`.

It doesn't end there. Just as people might use a value other than nofollow, they might also have multiple values in the rel attribute. So, finally, if I want to select all tags with a rel attribute that has a value of nofollow, I would use the CSS selector `[rel~="nofollow"]` - note the tilde.

Now, I want to mark follow links with a yellow background, and a nofollow link with a blue background. 

Put it together, and my CSS looks as follows:
<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="joehx" data-slug-hash="aMWvqQ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="aMWvqQ">
  <span>See the Pen <a href="https://codepen.io/joehx/pen/aMWvqQ/">
  aMWvqQ</a> by Joseph Hendrix (<a href="https://codepen.io/joehx">@joehx</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Since CSS is cascading, the second rule overwrites the first.

Here's a screenshot of my reddit home page, sorted by controversial, with the added rules:

![Reddit Marked Up](/images/reddit-marked-up.png)
*Reddit Marked Up*

In order to not affect the look of a webpage, I further modified my custom CSS based on Chris Bracco's [A Simple CSS Tooltip](https://chrisbracco.com/a-simple-css-tooltip/):

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="joehx" data-slug-hash="eXWpMr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="NoFollow / DoFollow Link Tooltip">
  <span>See the Pen <a href="https://codepen.io/joehx/pen/eXWpMr/">
  NoFollow / DoFollow Link Tooltip</a> by Joseph Hendrix (<a href="https://codepen.io/joehx">@joehx</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Creating a Tampermonkey Script

The next thing I wanted was to load the CSS automatically. For that purpose, I turned to the userscript manager [Tampermonkey](https://tampermonkey.net/) (which is a fork of [Greasemonkey](https://www.greasespot.net/), I believe).

The only issue here is that Tampermonkey loads custom JavaScripts, not CSS. Therefore I needed to load the CSS via a JavaScript function.

Thankfully it is possible to edit stylesheets with JavaScript, and  I came across a blog post on how to [add rules to stylesheets with JavaScript](https://davidwalsh.name/add-rules-stylesheets).

Unfortunately, it doesn't seem to be possible to arbitrarily add a rule to the entire document easily - you either have to add a rule to a preexisting stylesheet or create a new one.

Getting the stylesheets in JavaScript is pretty easy, though. The stylesheets exist in a (pseudo?) array held by the global document object:

```javascript
document.styleSheets
```

To get the first stylesheet, just ask for the zeroth element just as you would any array:

```javascript
document.styleSheets[0]
```

Inserting a rule is a simple as calling the insertRule method and passing the rule as a string:

```javascript
document.styleSheets[0].insertRule("a { background: yellow; color: black; }");
```

This worked great... So long as the stylesheet I was accessing was on the same domain as the page. Some sites, such as reddit, keep their stylesheets on a different domain than the main site (reddit keeps theirs on www.redditstatic.com/).

In those cases, I would get the following error:

    SecurityError: The operation is insecure.

So I needed to create a new stylesheet instead of just accessing a preexisting one.

Here's the final script:

<script src="https://gist.github.com/hendrixjoseph/44606404cac66e2d163dfdb9f0fc89d7.js"></script>