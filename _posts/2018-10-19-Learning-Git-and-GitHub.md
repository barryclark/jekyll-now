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
