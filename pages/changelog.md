---
layout: page
title: "Change is good!"
meta_title: "Feeling Responsive Theme Changelog"
subheadline: "Feeling Responsive Theme Changelog"
teaser: "History and changelog of Feeling Responsive Theme"
header:
   image_fullwidth: "header_unsplash_9.jpg"
permalink: "/changelog/"
---
2015-11-10 // Version 1.91
:   I added a nasty hack to highlight the homepage in the topbar navigation. To do it, you have to add `homepage: true` to your homepage. The pages *404* and *search* are now excluded from the sitemap.

2015-10-29 // Version 1.9
:   I needed a call for action button on the frontpage to get your awareness for the new and fresh [*Feeling Responsive*-Newsletter](https://tinyletter.com/feeling-responsive) which informs you about new features. Now you can use it, too. Just have a look into *pages/pages-root-folder/index.md* to delete or use it. Uh, there were some images missing and the video-template didn't show up correct. I use now `{% raw %}{{ layout.format }}{% endraw %}` to inject the class of a layout in `default.html` into `<body>` to make it work.

2015-10-27 // Version 1.8
:   *Feeling Responsive* works smoothly with [Jekyll 3.0](http://jekyllrb.com/news/2015/10/26/jekyll-3-0-released/). I added a Gemfile with the pagination gem *jekyll-paginate* so that paginate works. And now there is also a [bones-version](https://github.com/Phlow/feeling-responsive/tree/bare-bones-version) available to get a clean project started right from the beginning.

2015-10-18 // Version 1.7
:   Now with audio- and video-player [mediaelement.js]({{ site.url }}/design/mediaelement_js/). Added new gallery include. Changed names again... Sorry.

2015-08-07 // Version 1.5
:   Simplified includes syntax. The `.html`-ending is not needed anymore. Makes it simpler to read, write and use.

2015-08-07 // Version 1.4
:   Lots of improvements done by [Róbert Papp aka TWiStErRob](https://github.com/TWiStErRob). Now with Atom.xml, better Sitemap, improved and slicker code, and many more bugfixes... **Thank you, Róbert!**

2015-06-29 // Version 1.3
:   Added the possibility of using [tawk.to][8] via front matter switch `tawkto: true` in front matter. Thank you [Juan Jose Amor Iglesias][9] for the suggestion.

2015-05-04 // Version 1.2.1
:   Added `meta_title` to `<head>`. Use it in frontmatter for SEO purposes. 

2015-04-28 // Version 1.2
:   Put some nice Schema.org-Meta-Data into the video-template for better SEO. If you want to know how to use the data, have a look into the front matter of the [video]({{ site.url }}/design/video/).

2015-03-30 // Version 1.2
:   Added [alert-include]({{ site.url }}/documentation/#alert-embed-an-alert-in-your-content) and structured Sass-files.

2015-03-25  // Video
:   Made a new [video tutorial](https://www.youtube.com/embed/rLS-BEvlEyY)

<div class="flex-video"><iframe width="1280" height="720" src="https://www.youtube.com/embed/rLS-BEvlEyY" frameborder="0" allowfullscreen></iframe></div><!-- /.flex-video -->

2015-03-02 // Version 1.1
:   Added [Foundation Reveal](http://foundation.zurb.com/docs/components/reveal.html) to the mix to show videos and content in a popup window. <a href="#" data-reveal-id="videoModal">Try it out right know :)</a>

2015-02-26 // Version 1.0
:   OK. Let's try it. Here is *Feeling Responsive* Version 1.0, with a shiny video.

<div class="flex-video"><iframe width="1280" height="720" src="https://www.youtube.com/embed/3b5zCFSmVvU" frameborder="0" allowfullscreen></iframe></div><!-- /.flex-video -->


2015-02-25 // Version 0.99.1
:   Added support for Google Analtics. Added `_include/next-previous-post-in-category.html` to generate links from one post in a category to another post in that same category. Example at the bottom of [Grid & Colors]({{ site.url }}/design/grid/#bottom). Added `noindex`-variable for search engine optimization ([read more](https://support.google.com/webmasters/answer/93710?hl=en)). Changed code for breadcrumb. Added [Improve-Content-Include]({{ site.url }}/documentation/#improvecontenthtml).

2015-02-19 // Version 0.99
:   Yes! Now *Feeling Responsive* uses the built-in sass-support by Jekyll. Open `_sass` and dig deeper into customizing this theme using your colors, typography and so on...

2015-02-18 // Version 0.98
:   Now with author-support and [Schema.org microdata](http://schema.org). Edit author(s) in `authors.yml` and use it via front matter like `author: your_author_name`. Added [Disqus-comments]({{ site.url }}/design/comments/#comments) to the mix.

2015-02-17 // Version 0.97
:   Simplicity. Reduced templates. Now there is one page/post-template with two switches via front matter to turn on metadata at the end of the page/post via `show_meta: true/false` and to add a left or right sidebar via `sidebar: left/right`. The defaults are declared in `config.yml`. I also changed the variable `description` to `teaser` because it's more logigally.

2015-02-12 // Version 0.96
:   Added `frontpage`-layout with three widgets-areas. The layout simplifies the process to change content on the frontpage.

2015-02-09 // Version 0.95
:   Now with custom icon font using only entypo icons necessary. Eliminated one one request and reduced the font-file to 9kb. You can easily customize the font yourself using [Font Custom][7] and the included `fontcustom.yml` in `assets/fonts/`.

2015-01-12 // Version 0.94
:   Added Windows 8-Tile in `config.yml` and `header.html`. Added `_config_dev.yml` for easier local development. Use `jekyll serve --config _config.yml,_config_dev.yml` to overwrite `url`-settings of the main configuration. Added `_data/network.yml` to customize links in the footer-area. Now with 404-page and a google-powered search.

2014-12-22 // Version 0.93
:   Improved speed through the use of [webfontloader](https://github.com/typekit/webfontloader). Reduced Volkhov font and only embedded normal weight. Now fonts load asynchronous and the package is 53kb lighter.

2014-12-21 // Version 0.92
:   A new polished version, with a stronger and better color scheme. [Have a look ›]({{ site.url }}/design/grid/#color-scheme-and-colors-codes). Added foundation `.scss-files` to `assets/scss/` for savety.

2014-10-08 // Version 0.91
:   Moved images folder from `assets/img/` to `images` to fasten access to folder. Moved all pages to `pages/`-folder for better organization. Added language-functionality. *Feeling Responsive* is now translation ready.

2014-09-21 // Version 0.9
:   Optimized code, tweaked CSS, added images, deleted `header: "no"` from front matter (because it not necessary), added drafts to the new `_drafts`-folder to begin posts and pages faster and enhanced the documentation. Huh, 1.0 I am coming.

2014-09-16 // Version 0.8
:   Added [video post format][5] for that cinematic flavor. Added URL- and Credit-feature to images and revamped the homepage a little bit to give blog-content more exposure. Optimized some includes, especially the `_include/list-posts.html`-Include which support some nifty parameters.

2014-09-15 // Version 0.7
:   Added an [example of a gallery][4] to show how to use Clearing Lightbox. Meta information is used in posts via `/include/meta_information`. To optimize pages/posts for search engines you have now have an extra front matter-variable called `meta_description`. Also the theme supports facebook open graph information.

2014-09-12 // Version 0.6
:   Finally the [blogpage][1] has pagination and an [archive for all blog-posts][2] using the [foundation accordion][3].

2014-08-22 // Version 0.5
:   Better typograpyh, extended [documentation]({{ site.url }}/documentation/) and little subtle css-things to make *Feeling Responsive* a little better.

2014-08-17 // Version 0.4
:   First beta release of »Feeling Responsive« with the current jekyll templates.

2014-08-17 // Version 0.3
:   First release – only *HTML-Version* – of »Feeling Responsive« on Github-Pages with some hickups.

2014-07-26 // Version 0.2
:   Updated Navigation & Social Media-Configuration via custom data in `_data`

2014-07-07 // Version 0.1
:   Start of theme coding and development.

2014-06-23
:   First Ideas and scribbles at the beach in [Bergen/Netherlands][6].



<div id="videoModal" class="reveal-modal large" data-reveal="">
  <div class="flex-video widescreen vimeo" style="display: block;">
    <iframe width="1280" height="720" src="https://www.youtube.com/embed/3b5zCFSmVvU" frameborder="0" allowfullscreen></iframe>
  </div>
  <a class="close-reveal-modal">&#215;</a>
</div>


 [1]: {{ site.url }}/blog/
 [2]: {{ site.url }}/blog/archive/
 [3]: http://foundation.zurb.com/docs/components/accordion.html
 [4]: {{ site.url }}/design/gallery/
 [5]: {{ site.url }}/design/video/
 [6]: https://www.google.de/maps/place/Strandpaviljoen+Joep+B.V./@51.9960733,5.830135,6z/data=!4m2!3m1!1s0x47cf5918df69093b:0x7c11ab31102c1c8a
 [7]: fontcustom.com
 [8]: https://www.tawk.to
 [9]: https://github.com/jjamor
 [10]: #