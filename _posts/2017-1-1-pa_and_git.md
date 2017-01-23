---
layout: post
title: Pythonanywhere and git
---

Here are the tools to get your info from pythonanywhere to your github account.

Go to Github (https://github.com/)

Click on "New repository" on the right

Give it a title and click "Create repository"

Find the URL for the remote repository by clicking on the green "Clone or download" button, the click the copy to clipboard button to copy the url. It should end with .git. Something like: https://github.com/jss367/pythonanywhere.git

Then go to your bash console on pythonanywhere and type: `git remote add origin <remote_repository_URL>`.

Then test out that the connection owrk. Type: `git remote -v`. You should get a response verifying the remote URL

Then, to push the changes, type: `git push origin master`. This is one of the most common commands you will use. It is of the format `git pull <remote> <branch>`. 

It will fail if there's anything in the repo, even an insignificant README.md file. If it does you will need to pull first. Pull by: `git pull origin master`. This will probably force you to merge, which will then open up the evil that is vim. vim is awful so I recommend trying to exit it ASAP. Some combination of the escape key and q might do the trick. Before you freeze everything you should Google it.

Send changes to the master branch of your remote repository:	
`git push origin master`

Hit "`q`" to exit the git log

then, to get them back to your pythonanywhere app, use `git pull origin master`



If you add a new file:

git add .

git commit -m "added xxx"

git push origin master

Enter your username and password if required