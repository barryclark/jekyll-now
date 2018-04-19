# Jekyll Now (v1.2_xN[s])

## About

**Jekyll** is a static site generator that's perfect for GitHub hosted blogs ([Jekyll Repository](https://github.com/jekyll/jekyll))

**Jekyll Now** makes it easier to create your Jekyll blog, by eliminating a lot of the up front setup.

**Jekyll Now-xN** help you to link such services(Amazon, Preview, Sub-Site, and more) by /js (JavaScript).

- You don't need to touch the command line
- You don't need to install/configure ruby, rvm/rbenv, ruby gems :relaxed:
- You don't need to install runtime dependencies like markdown processors, Pygments, etc
- If you're on Windows, this will make setting up Jekyll a lot easier
- It's easy to try out, you can just delete your forked repository if you don't like it

In a few minutes you'll be set up with a minimal, responsive blog like the one below giving you more time to spend on writing epic blog posts!

### Versioning Rule

- v1.2 : the main repository version of jekyll-now before fork.
- xN : xinolinx_version = N
- [s] : stabled / working

### Screen Shot

![Jekyll Now Xinolinx Theme Screenshot](/images/jekyll-now-xinolinx-theme-screenshot.jpg "Jekyll Now Xinolinx Theme Screenshot")

## Quick Start

### Step 1) Fork Jekyll Now to your User Repository

Fork this repo, then rename the repository to yourgithubusername.github.io.

Your Jekyll blog will often be viewable immediately at <https://yourgithubusername.github.io> (if it's not, you can often force it to build by completing step 2)

### Step 2) Delete all files in _post

Your Jekyll blog don't want xinolinx-posts, then please delete all files in _post directory.

### Step 3) Customize and view your site

Enter your site name, description, avatar and many other options by editing the _config.yml file. You can easily turn on Google Analytics tracking, Disqus commenting and social icons here too.

Making a change to _config.yml (or any file in your repository) will force GitHub Pages to rebuild your site with jekyll. Your rebuilt site will be viewable a few seconds later at <https://yourgithubusername.github.io> - if not, give it ten minutes as GitHub suggests and it'll appear soon

You must configure following atttributes.

- name ... site name
- description ... site description
- avatar ... icon in top of page
- footer-links ... to contact you via Mail and SNSes.
- url ... "http://yourgithubusername.github.io"
- baseurl ... "http://yourgithubusername.github.io"
- subsite ... if you have sub-site, site URL
- subsitename ... sub site name
- amazon_asid ... your amazon (JP) affiriate ID

### Step 4) Update about.md wiz your profile.

Edit `/amout.md` to publish your profile, that is linked in header nav-tag "About". This [Markdown Cheatsheet](http://www.jekyllnow.com/Markdown-Style-Guide/) might come in handy.

### Step 5) fix amazon locale in amazon_img.html for your country.

Edit `_include/amazon_img.html` and fix amazon address for your country(This repository has amazon.co.jp locale).
This work is helped by amazon affiriate link (the bar is in top of page) od your country amazon web site.
In Japan, these links are following values.

```
img-src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=__AMAZON_ASIN__&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag={{ site.amazon_asid }}"
a-href="https://www.amazon.co.jp/dp/__AMAZON_ASIN__/ref=as_li_ss_il?ie=UTF8&linkCode=li2&tag={{ site.amazon_asid }}"
```

### Step 6) Publish your first blog post

Edit `/_posts/YYYY-MM-DD-Hello-World.md` to publish your first blog post. This [Markdown Cheatsheet](http://www.jekyllnow.com/Markdown-Style-Guide/) might come in handy.

#### `/_posts` directory naming rule hints

> You can add additional posts in the browser on GitHub.com too! Just hit the + icon in `/_posts/` to create new content. Just make sure to include the [front-matter](http://jekyllrb.com/docs/frontmatter/) block at the top of each new blog post and make sure the post's filename is in this format: year-month-day-title.md

## Jekyll Now Xinolinx Features

### Supported features

#### by Jekyll Now

- Command-line free _fork-first workflow_, using GitHub.com to create, customize and post to your blog  
- Fully responsive and mobile optimized base theme (**[Theme Demo](http://xinolinx.github.io)**)  
- Sass/Coffeescript support using Jekyll 2.0  
- Free hosting on your GitHub Pages user site  
- Markdown blogging  
- Syntax highlighting  
- Disqus commenting  
- Google Analytics integration  
- SVG social icons for your footer  
- 3 http requests, including your avatar  

#### + Xinolinx Features

- Generate Amazon (JP) link
- Kaomoji Highlight
- Preview each Web-Links by wimg.ca
- Markdown for Network-Topologies (jquery-jNetPreview-0.0.1.js)
- Validation for HTML5 in each page
- Validation for RSS in about page

#### not supported.

- No installing dependencies
- No need to set up local development  
- No configuring plugins  
- No need to spend time on theming  
- More time to code other things ... wait ?!  

## Questions?

- Sorry, please wait :P ! I'm not ready yet.

## Credits

- [Jekyll](https://github.com/jekyll/jekyll) - Thanks to its creators, contributors and maintainers.
- [Jekyll-now](https://github.com/barryclark/jekyll-now) - Thanks to its creators, contributors and maintainers.
- [SVG icons](https://github.com/neilorangepeel/Free-Social-Icons) - Thanks, Neil Orange Peel. They're beautiful.
- [Solarized Light Pygments](https://gist.github.com/edwardhotchkiss/2005058) - Thanks, Edward.
- [Joel Glovier](http://joelglovier.com/writing/) - Great Jekyll articles. I used Joel's feed.xml in this repository.
- [David Furnes](https://github.com/dfurnes), [Jon Uy](https://github.com/jonuy), [Luke Patton](https://github.com/lkpttn) - Thanks for the design/code reviews.
- [Bart Kiers](https://github.com/bkiers), [Florian Simon](https://github.com/vermluh), [Henry Stanley](https://github.com/henryaj), [Hun Jae Lee](https://github.com/hunjaelee), [Javier Cejudo](https://github.com/javiercejudo), [Peter Etelej](https://github.com/etelej), [Ben Abbott](https://github.com/jaminscript), [Ray Nicholus](https://github.com/rnicholus), [Erin Grand](https://github.com/eringrand), [Leo Colombaro](https://github.com/LeoColomb), [Dean Attali](https://github.com/daattali), [Clayton Errington](https://github.com/cjerrington), [Colton Fitzgerald](https://github.com/coltonfitzgerald), [Trace Mayer](https://github.com/sunnankar) - Thanks for your [fantastic contributions](https://github.com/barryclark/jekyll-now/commits/master) to the project!

## Contributing

I want to keep Jekyll Now_xN as minimal as possible for my site(xinolinx.net). Every line of code should be one that's useful to 90% of the people using it. Please bear that in mind when submitting feature requests. If it's not something that most people will use, it probably won't get merged. 

:xinolinx:

