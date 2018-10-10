---
title: Site Level Config
slug: site-level-config
chapter: 2
---
Now that you have a site installed, your first task is to update the _config.yml
properties that cover your Jekyll "site".

The _config.yml file serves a couple of purposes:
* Tell Jekyll how to build the site
* Holds global properties (more on accessing these later)

A note if you're not familiar with *.yml
> Do not use tabs in configuration files
> This will either lead to parsing errors, or Jekyll will revert to the default settings. Use spaces instead.

[Jekyll Now Reference](https://github.com/barryclark/jekyll-now)
Change the site name, description and your personal information and links.

[Jekyll Docs](https://jekyllrb.com/docs/configuration/) for many more options
than we'll talk about today.

Another note about _config.yml.  It is the one file that the the jekyll server
doesn't pick up changes to.  You will need to restart a local server to see changes
github pages however, does pick up the changes.
