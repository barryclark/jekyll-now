---
layout: post
title: Pythonanywhere and git
---

Here are the tools to get your info from pythonanywhere to your github account.

## Starting a new project

Go to Github (https://github.com/)

Click on "New repository" on the right

Give it a title and click "Create repository"

Find the URL for the remote repository by clicking on the green "Clone or download" button, the click the copy to clipboard button to copy the url. It should end with .git. Something like: https://github.com/jss367/pythonanywhere.git

Then go to your bash console on pythonanywhere inside the folder you want to connect to Github. This is possibly your mysite folder. Type: `git remote add origin <remote_repository_URL>`.

Then test out that the connection owrk. Type: `git remote -v`. You should get a response verifying the remote URL

Then, to push the changes, type: `git push origin master`. This is one of the most common commands you will use. It is of the format `git pull <remote> <branch>`.

You may have to enter your Github username and password if you haven't already.

It will fail if there's anything in the repo, even an insignificant README.md file. If it does you will need to pull first. Pull by: `git pull origin master`. This will probably force you to merge, which will then open up the evil that is vim. vim is awful so I recommend trying to exit it ASAP. Some combination of the escape key and q might do the trick. Before you freeze everything you should Google it.

# Other useful commands

## Send changes to the master branch of your remote repository:	

`git commit -m "my changes`

`git push origin master`

Hit "`q`" to exit the git log

then, to get them back to your pythonanywhere app, use `git pull origin master`


## If you make changes you want to delete (i.e. return to previous commit): 

`git checkout -- flask_app.py`

Or, if you want to revert everything: `git checkout .`



## If you add a new file:

`git add .`

`git commit -m "added xxx"`

`git push origin master`

Enter your username and password if required


<h2>Connecting to an existing repo</h2>

git clone https://github.com/jss367/pythonanywhere.git

To get your app working, we'll need to configure a WSGI file that imports your app, as a Python variable. That means you need to know two things:

The path to the Python file containing your web app's WSGI file.

The name of the application.

For Flask, the WSGI app is usually invoked as app = Flask(__name__) somewhere. Locate this file and variable


Here is what your final WSGI file should look like. jss367_pythonanywhere_com_wsgi.py:

```import sys
#
## The "/home/jss367" below specifies your home
## directory -- the rest should be the directory you uploaded your Flask
## code to underneath the home directory.  So if you just ran
## "git clone git@github.com/myusername/myproject.git"
## ...or uploaded files to the directory "myproject", then you should
## specify "/home/jss367/myproject"
path = '/home/jss367/pythonanywhere'
if path not in sys.path:
    sys.path.append(path)

from flask_app import app as application
```


Other useful commands:
`git log`

# git diff

`git diff`

There are different ways to use git diff.
1. Show changes you haven't commited yet: `git diff [filename]`
2. Show changes you already commited (but haven't sync'd): `git diff --cached [filename]`
3.


You can also add files and commit in one go: `git commit -am "Going for broke"`


If you want to sync your git with the remote one (like when you've added a branch): `git remote update`

Creating a new branch

You can create a new branch on your local machine. Let's say your new branch is called database

`git checkout database`

You can make changes, break stuff, then switch back to your main branch at any time:

`git checkout master`

To see all your git branches:

What branch are you on: `git branch`
What branches are there: `git branch -a`

When you want to merge a branch back into it's master:

`git checkout <master>
git pull origin <master>
git merge <branch>
git push origin <master>`

If you want, you can delete the branch you just merged: `git branch -d <mergedbranch>`