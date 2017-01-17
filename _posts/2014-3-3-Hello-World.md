---
layout: post
title: You're up and running!
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.

Hello
Here are the tools to get your info from pythonanywhere to your github account.

Create a new, empty project on github
Find the URL for the remote repository by clicking on the green "Clone or download" button, the click the copy to clipboard button to copy the url. It should end with .git. Something like: https://github.com/jss367/pythonanywhere.git

Then go to your bash console on pythonanywhere and type: git remote add origin remote repository URL

Then type: git remote -v
You should get a response verifying the remote URL

Then, to push the changes, type: git push origin master

This will probably fail because it'll say you have something in your repo and that you need to pull first. If that's the case, pull by doing: git pull origin master

This will probably force you to merge, which will then open up the evil that is  vim. vim is awful so I recommend trying to exit it ASAP. Some combination of the escape key and q might do the trick. Before you freeze everything you should Google it.

Send changes to the master branch of your remote repository:	
git push origin master

git pull <remote> <branch>

Hit "q" to exit the git log

then, to get them back to your pythonanywhere app, use git pull origin master



