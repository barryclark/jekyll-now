---
layout: post
title: Learning Git and GitHub
---

<img align="right" src="{{ site.baseurl }}/images/git/git_github.png" width="400"/>

Disclaimer: This tutorial is meant for absolute beginners. I have used terminology in a way that eases understandings, and hence certain words might have a (little) different, deeper meaning associated to it.

# [YouTube Video Tutorial](https://youtu.be/MUQfKFzIOeU)

<iframe width="560" height="315" src="https://www.youtube.com/embed/MUQfKFzIOeU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Steps
0. What is Git and GitHub
1. [Install Git](https://git-scm.com/)
2. Create [GitHub](https://github.com/) Account
3. [Connect to GitHub with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/) (Optional)
4. Create a Repository locally
5. Make Commits 
6. Explore its other capabilities
7. Upload your Repository to GitHub (remote)
8. Use and Understand the web Interface for your remote
9. Learn more and Collaborate

## 0. What is git
<img align="right" src="{{ site.baseurl }}/images/git/what-is-git.png"/>

## What is GitHub
<img align="right" src="{{ site.baseurl }}/images/git/what-is-GitHub.png"/>

## 1. Install Git
Download the latest package from the [official git website](https://git-scm.com/)

In case you prefer simple commands for the terminal
1. Linux
	1. sudo apt-get install git (Ubuntu)
	2. sudo yum install git (Fedora)
2. MacOS
	1. Install [Brew](https://brew.sh): `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
	2. brew install git 

Post installation, you can configure your name, email, and default text editor (for commit messages and some other use-cases)
> `git config --global user.name “Your Name”`
> `git config --global user.email “Your Email”`
> `git config --global core.editor “nano”`


## 2. Sign-Up on [GitHub](https://github.com/)

## 3. [Connect to GitHub with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/) (Optional)

## 4. Create a Repository locally
You can create a repository in a folder. It can be empty or you can even have your pre-existing files that you wish to add in that project/repository. To initialize git tracking use command:
> `git init`

*Do note that while executing the above command, your terminal should be inside the appropriate project directory*

## 5. Make Commits

<img src="{{ site.baseurl }}/images/git/lifecycle.png"/>

> `git add filename` OR `git add --all`

to stage files/directories

> `git commit -m "Your message here"`

## 6. Some useful commands

> `git status`

* to check what files are on/not-on stage 
* to check if there have been any uncommitted changes
* to check for untracked files

> `git log`

to see all the commits locally 

## 7. Hosting your repository (GitHub)

> `git remote add origin git@github.com:Daksh/test-git-session.git`

to add the address for your remote

> `git remote -v`

to list all the remote addresses associated with a local repository

> `git push origin master` 

to push all the local comits on your remote, master branch (default branch)

> `git pull origin master`

pulls the new changes which are present in the github repository but aren’t present locally.

> `git clone url`

alternatively, in case you want to download a remote repository (to make a local instance of it)

# Extras :)
* `git diff --color-words` to see the changes in words instead of sentences
* `git checkout commitHash` to temporarily switch to a branch at that particular commit, helps in testing
* `git stash` and `git stash apply` to undo/redo the uncommitted changes
* `git diff HEAD~2` to see the changes done since `HEAD~2` (two commit before HEAD). Refer to [this post](https://stackoverflow.com/a/9903611/2806163) for more options
* `git branch` and `git checkout branch-name` to list and change to a particular branch
* `git commit --amend --reset-author --no-edit`
* `git checkout <sha-1 of that commit>`
* `git diff --color-words --no-index publications.py publications\ \(1\).py`

## .gitignore
This is a special type of file, called `.gitignore`. It should be placed inside the main folder of your repository (top-most folder). What this file does, is indicate to git that there are some files (or some files with particular extensions) that I wish to ignore. They will be there in my local instance but don't ask/tell me each time that they are untracked. Ignore them!
There is an awesome website [gitignore.io](https://www.gitignore.io/) which helps you to create such files. Suppose you do not want any extra files that show up with python(eg. `*.pyc`)/mac (eg `.DS_Store`), you can just enter `python` and `macOS` on the website to generate the `.gitignore` file [gitignore.io/api/macos,python](https://www.gitignore.io/api/macos,python)
You can simply do `subl .gitignore` to open a new file and copy paste the contents from the website. As soon as you add that to git tracking (`git add .gitignore`), you will see that all the other extension files which you wanted to get rid of and were being shown in untracked section, vanish! :D

### Ignore certain extension files
Adding the line `*.ext` in the `.gitignore` file will work. But, there is a small catch, if you already have commited a file with the same extension, then git will still continue to track it. In this scenario, if you want to remove that file and stop git from tracking it, run the command `git rm --cached <FileName>`

# Useful Links/Resources
* [GitHub Students Pack](https://education.github.com/pack)
* [Atlassian](https://www.atlassian.com/git) - Comes in handy when you have a new command at hand, but no way to comprehend it
* [CheatSheets](https://epir.at/2017/08/26/gsoc-2017-vlc-for-macos-interface-redesign/)
* [ProGit](https://git-scm.com/book/en/v2) - High Quality, book authored by Co-Founder of GitHub. Available for free
* [git - the simple guide](http://rogerdudler.github.io/git-guide/)
