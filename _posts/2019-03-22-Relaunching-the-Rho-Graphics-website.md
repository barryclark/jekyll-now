---
layout: post
title: Relaunching the Rho Graphics Website
author: Jeremy Wildfire
---

<img src="https://user-images.githubusercontent.com/5428548/55579363-0baf1080-56e6-11e9-97f2-c9175696073d.png"/>

Our team is all about developing [open-source tools](https://rhoinc.github.io/blog/Open-Source-is-Good-Science/), so we do lots of our work in public. Yet we've been pretty bad about maintaining a decent public website in recent years. That ends today! We're happy to announce the launch of the [new Rho Graphics website](rhoinc.github.io/graphics). 

The site includes a [homepage](rhoinc.github.io/graphics) along with links to our [code on GitHub](github.com/rhoinc) and to stand-alone pages tracking our [publications](rhoinc.github.io/publication-library), [visualizations](rhoinc.github.io/viz-library), [data](rhoinc.github.io/data-library) and, of course, this [blog](rhoinc.github.io/blog). 

Our old website was pretty clunky, and required painful FTP file-swapping torture to update. We want to spend our time making great tools and writing about them on this blog, so our goal was to make a site that (1) leverages all of our existing open source work and (2) is easy to maintain. We made several design decisions with those goals in mind: 

- *Outsource hosting* - The site is built using the super simple [GitHub pages](https://pages.github.com/) framework. We'll redirect our old graphics.rhoworld.com URL and shut down the server as soon as we're done migrating content. 
- *Simple modular design* - Each page gets its own GitHub repo and build process, including the new [data-library](rhoinc.github.io/data-library) and [publication-library](rhoinc.github.io/publication-library) pages. 
- *Easy to use blog* - Write posts in markdown & automatically publish with [Jekyll-now](https://github.com/barryclark/jekyll-now).
- *No more stand-alone examples* - Instead we updated [viz-library](rhoinc.github.io/viz-library) to automatically [scrape examples](https://github.com/RhoInc/viz-library/blob/master/scripts/scrapeExamples.js) and [take snapshots](https://github.com/RhoInc/viz-library/blob/master/scripts/takeScreenshots.js) from the `\test-page` folders in our graphics repos. 
- *Automated Build* - Our new homepage and viz-library pages are fully automated with all content coming from GitHub repos. We just need a script to hit `npm run build` once a month and we're good to go. We've also documented simple process for [adding publications](https://github.com/RhoInc/publication-library#adding-a-publication) and [data files](https://github.com/RhoInc/data-library#adding-a-file) and [writing blog posts](https://github.com/RhoInc/blog#creating-a-post). 

With these changes, we'll be able to focus more energy than ever on creating great open-source tools while avoiding the painful overhead of manually maintaining a sprawling webpage. 
