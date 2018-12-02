---
layout: post
title: Learning Git and GitHub
---

# Commands
* `git init` - to initialize a repository
* `git status` - 
	* to check what files are on/not-on stage 
	* to check if there have been any uncommitted changes
	* to check for untracked files
* `git add` - to stage files/directories
	* `git add --all`
* `git commit -m "Your message here"`
* `git log` - to see all the commits locally 
* `git push origin master` to push all the local comits on your remote, master branch (default branch)
* `git remote add origin git@github.com:Daksh/test-git-session.git`
* `git remote -v`
* `git clone`

## Gitignore
This is a special type of file, called `.gitignore`. It should be placed inside the main folder of your repository (top-most folder). What this file does, is indicate to git that there are some files (or some files with particular extensions) that I wish to ignore. They will be there in my local instance but don't ask/tell me each time that they are untracked. Ignore them!
There is an awesome website [gitignore.io](https://www.gitignore.io/) which helps you to create such files. Suppose you do not want any extra files that show up with python(eg. `*.pyc`)/mac (eg `.DS_Store`), you can just enter `python` and `macOS` on the website to generate the `.gitignore` file [gitignore.io/api/macos,python](https://www.gitignore.io/api/macos,python)
You can simply do `subl .gitignore` to open a new file and copy paste the contents from the website. As soon as you add that to git tracking (`git add .gitignore`), you will see that all the other extension files which you wanted to get rid of and were being shown in untracked section, vanish! :D

# Few Extras :)
* `git diff --color-words` to see the changes in words instead of sentences
* `git checkout commitHash` to temporarily switch to a branch at that particular commit, helps in testing
* `git stash` and `git stash apply` to undo/redo the uncommitted changes
* `git diff HEAD~2` to see the changes done since `HEAD~2` (two commit before HEAD). Refer to [this post](https://stackoverflow.com/a/9903611/2806163) for more options
* `git branch` and `git checkout branch-name` to list and change to a particular branch
* `git commit --amend --reset-author --no-edit`
* `git checkout <sha-1 of that commit>`
* `git diff --color-words --no-index publications.py publications\ \(1\).py`

## Useful Links
* [Atlassian]()
* [CheatSheets](https://epir.at/2017/08/26/gsoc-2017-vlc-for-macos-interface-redesign/)
