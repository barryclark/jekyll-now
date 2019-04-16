---
layout: post
title: Relaunching the Rho Graphics Website
author: Jeremy Wildfire
---

Our team is all about developing [open-source tools](https://rhoinc.github.io/blog/Open-Source-is-Good-Science/), so we do lots of our work in public. Yet we've been pretty bad about maintaining a decent public website in recent years.
That ends today! We're happy to announce the launch of the [new Rho Graphics website](https://rhoinc.github.io/graphics).

The site includes a [homepage](https://rhoinc.github.io/graphics) along with links to our [code on GitHub](https://github.com/RhoInc) and to stand-alone pages tracking our [publications](https://rhoinc.github.io/publication-library), [visualizations](https://rhoinc.github.io/viz-library) (shown below), [data](https://rhoinc.github.io/data-library) and, of course, this [blog](https://rhoinc.github.io/blog).

<img style="border:2px solid #999" src="{{ site.baseurl }}/images/relaunching-the-rho-graphics-website.png" align="center" />

Our old website was pretty clunky, and required painful FTP file-swapping torture to update.
We want to spend our time making great tools and writing about them on this blog, so our goal was to make a site that (1) leverages all of our existing open source work and (2) is easy to maintain.
We made several design decisions with those goals in mind:

- __Outsource hosting__ - The site is built using the super simple [GitHub pages](https://pages.github.com/) framework. We'll redirect our old graphics.rhoworld.com URL and shut down the server as soon as we're done migrating content.
- __Simple modular design__ - Each page gets its own GitHub repo and build process, including the new [data-library](https://rhoinc.github.io/data-library) and [publication-library](https://rhoinc.github.io/publication-library) pages.
- __Easy to use blog__ - Write posts in markdown & automatically publish with [Jekyll-now](https://github.com/barryclark/jekyll-now).
- __No more stand-alone examples__ - Instead we updated [viz-library](https://rhoinc.github.io/viz-library) to automatically [scrape examples](https://github.com/RhoInc/viz-library/blob/master/scripts/scrapeExamples.js) and [take snapshots](https://github.com/RhoInc/viz-library/blob/master/scripts/takeScreenshots.js) from the `\test-page` folders in our graphics repos.
- __Easy Updates__ - We've documented a simple processes for [adding publications](https://github.com/RhoInc/publication-library#adding-a-publication) and [data files](https://github.com/RhoInc/data-library#adding-a-file) and [writing blog posts](https://github.com/RhoInc/blog#creating-a-post).
- __Automated Builds__ - Our new homepage and viz-library pages are fully automated, with all content coming from GitHub repos. We've [set up automated builds with TravisCI](https://docs.travis-ci.com/user/deployment/pages/) so that the pages update nightly - no human intervention needed!

With these changes, we'll be able to focus more energy than ever on creating great open-source tools while avoiding the painful overhead of manually maintaining a sprawling webpage.
