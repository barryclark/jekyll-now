---
layout: lesson
title: Recap Working with Collections
slug: recap-working-with-collections
chapter: 9
---
Collections are helpful in a couple of ways:

1. You can set defaults for front matter variables the collection in the _config.yml  
For example, you can define the layout used to render the collection once.

2. You don't have to publish a collection, you can instead keep it as an internal
source file used when processing other views.

Collections can get you into trouble with regard to performance. Iterating,
Filtering, etc. are happening on files not a database.  Too much processing
and searching will increase your total time to render the site.

# More References and Guides
[Jekyll Collections](https://jekyllrb.com/docs/collections/)
[Ben Balter's Guide](https://ben.balter.com/2015/02/20/jekyll-collections/)
