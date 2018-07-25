---
layout: page
title: Blog Statistics
permalink: /statistics/
---

* {{ site.posts | size }} total posts.
* {{ site.pages | size }} pages of posts.
* {{ site.tags | size }} different tags.
* The most recent post was on {{ site.posts.first.date | date: "%B %e, %Y" }}.
* The first post was on {{ site.posts.last.date | date: "%B %e, %Y" }}.
