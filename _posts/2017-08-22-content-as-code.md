---
layout: post
title: Treating our Content as Code
subtitle: What DevOps and CI/CD can teach us about content publishing.
category: dev
tags: [content, concept]
author: Holger Reinhardt
author_email: holger.reinhardt@haufe-lexware.com 
header-img: "images/new/Exportiert_11.jpg"
---

In my blog post about [Taking back control of your content - Developer style](https://hlgr360.github.io/blog/blog/running-ghp-jekyll/) I write about my motivation and my initial  attempts in treating [Docs Like Code](http://www.docslikecode.com). And I pose the question what would happen if we treated not just docs, but content in general as code.

My life as a developer changed when I first started using [git](https://en.wikipedia.org/wiki/Git). And my view of working collaboratively  changed even more when I started using git together with [github](http://github.com) and [Pull Requests](https://en.wikipedia.org/wiki/Distributed_version_control#Pull_requests). 

Yet there was always the disconnect between me writing code in a very collaborative yet highly controlled manner and me publishing content like blog articles as Developer Evangelist at Layer7. And I never quite could put those things together until I listened to a talk [Pull requests, not just for code anymore](https://media.ccc.de/v/froscon2015-1525-pull_requests_not_just_for_code_anymore) at [OSCON 2015](https://hlgr360.github.io/blog/blog/notes-oscon/). This talk really started to make me think that there must be a different way to work with content. 

Given my background from the API space, there were a lot of puzzle pieces I had collected over the years. Concepts like [Create Once Publish Everywhere](https://www.slideshare.net/zachbrand/npr-api-create-once-publish-everywhere) from [npr.org](https://npr.codes) and [Content-as-a-Service](https://www.contentful.com/r/knowledgebase/content-as-a-service/) from the folks at [contentful.com](https://www.contentful.com). 

And then there were early signals that others in the community had similar thoughs: folks like Paul Hammant's post's on [Github as a CMS to end all CMS's](https://paulhammant.com/blog/github-as-a-cms-to-end-cmses.html) and [Why all CMS Technologies suck](https://paulhammant.com/2014/08/29/nearly-all-cms-technologies-suck/), published in 2013 and 2014 respectively. And then there was the afore mentioned [talk](https://media.ccc.de/v/froscon2015-1525-pull_requests_not_just_for_code_anymore) by Tim Krajcar at OSCON 2015, and more recently [Docs-as-Code](http://www.writethedocs.org/guide/docs-as-code/) and [Docs Like Code](http://www.docslikecode.com) by the folks from [WriteTheDocs](http://www.writethedocs.org) and [Ann Gentle](https://justwriteclick.com). Ann even published a book called [Docs Like Code](https://justwriteclick.com/books/docs-like-code/) recently. You might also want to read Anne's thoughts on [Why to use Github as CMS](https://justwriteclick.com/2015/12/17/why-use-github-as-a-content-management-system/) and a recently published article by Fastcompany on [How GitHub Employees Use GitHub For Projects Beyond Coding](https://www.fastcompany.com/40430104/how-github-employees-use-github-for-projects-beyond-coding):

```text
... managing not only code but any collaborative projects, such as legal documents or HR policies. “We’re going to treat legal issues like bugs in the code...”
```

If you put those pieces together a pretty consistent picture starts emerging. It is one were we ought to treat our valuable content as code, with the same rigeour and disciplin and tooling. Anne summarized it beautifully 

```text
Write, Review, Test, Merge, Build, Deploy, Repeat. 
Let's Treat Docs Like Code.
When you want to write more content, create accurate technical docs, iterate with collaborators, test drafts, merge, build, and deploy docs.
```

Like today we have DevOps and CI/CD for our code, I strongly feel that  ContentOps and CI/CD are just around the corner for our content. And given that we as [Haufe.Group](https://www.haufe-lexware.com/en/about-us/) have our roots in publishing, this is an exciting propostion to think about.