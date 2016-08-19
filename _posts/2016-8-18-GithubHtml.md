---
layout: post
title:  Show Html files in Github
---

In the last post, I want to show the html file hosted in github, but instead html source code is displayed. The solution is to create a `gh-pages` branch in your project:

```bash
git checkout -b gh-pages
git push origin gh-pages
```

To keep the `gh-pages` up to date with master, see [here](http://lea.verou.me/2011/10/easily-keep-gh-pages-in-sync-with-master/): 

```bash
git checkout gh-pages # go to the gh-pages branch
git rebase master # bring gh-pages up to date with master
git push origin gh-pages # commit the changes
git checkout master # return to the master branch
```





