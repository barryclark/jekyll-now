---
layout: post
title: Git Simple Commands !
---

Here we will discuss few simple commands in Git as per git flow.

[comment]:![_config.yml]({{ site.baseurl }}/images/config.png)

#### Start with Basics
there are two ways you will get started on git repos. 
1. you will create a repo in git UI and then clone it - I prefer this
2. Run git init in a folder and then create a repo 

`git`
provides lists of commands available

`git <command> -h`
provides list of options for each command

`git init`
initialises a folder to start creating a repo. 

#### working with branches 
After cloning repo from git, you would like to create a branch to make your 
commits and then later on merge this branch into master branch. 
`git checout -b branch` <br>
creates a local branch and also switches you to the branch. 
make some changes in files. 

`git status` <br>
Gives you list of modified files 

`git diff <filename>` <br>
you can see what changes you have made to a file 

`git add <filename or . or -A>` <br>
Adds files to the list of files to be committed. 
-A adds all files recursively

`git commit -m "commit message"` <br>
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)

`git push origin mybranch1` <br>
this command pushes your changes to remote branch 

### Merging in GitHub
Mostly you will be merging the branch to master via pull request. In a pull
request you will expect other reviewers to review your changes prior to 
merging the changes. 
 
There are few options:  
1. Create a merge commit
2. Squash and merge
3. Rebase and merge

##### Create a merge Commit 
First, you need to switch to master using the git checkout command, as follows:

`git checkout master` <br>
You can now execute the git merge command to merge the new feature into the master branch:

`git merge remotes/origin/mybranch1` <br>
If this step is completed successfully, your feature_1_beta branch will be fully integrated with the master branch.

*Troubleshooting 1*<br>
There are git conflicts <br>
When Git encounters a conflict, it adds 
<<<<<<< and ======= to highlight the parts that caused the conflict 
and need to be resolved. 

*Troubleshooting 2*<br>
fatal: refusing to merge unrelated histories
git merge remotes/origin/mybranch1 --allow-unrelated-histories
using this option it is able to merge it. I still need to dig more into 
why getting this error.  

##### Squash and merge
It squashes all commits into a single commit in master. Good if you do not 
want to preserve history of commits in branch. 

![_config.yml]({{ site.baseurl }}/images/squash vs merge.png)


##### Rebase and merge
`git:(mybranch2)$ git rebase master`
when above command is issues from mybranch2
then in case master is ahead of mybranch2 then all changes
from master will come into mybranch2 
It resets the header to latest commits before merge (I need to check more on this
) but may be it helps in resolving conflicts.

#### delete a remote branch
`git push origin --delete mybranch1`
this cannot be done by git branch -d command 

##### lists all branches
`git branch -a` <br>
lists all remote and local branches 

##### git difftool 
git difftool --tool=vimdiff <filename>

##### Amending last git commit 
**amending message only** <br>
git commit --amend -m "new message"

**amending files only** <br>
git commit --amend --no-edit <file with changes>
git push -f origin <branch> 
*do not for push in master or public repos*


##### Git blame 
is there a way to find history of a file in git 
git history in UI of bitbucket


##### Moving from gitlab to github in simple way
[Follow this link](https://android.jlelse.eu/how-to-migrate-gitlab-bitbucket-to-github-in-a-simple-way-e38bc60b1547)
1. Inside your GitHub team page, create an empty private repo with the same name of Bitbucket/GitLab repo that you want to transfer.
2. Copy your newly created repo link, either in HTTPS or SSH. For example, git@github.com:team-name/repo-name.git (SSH type)
3. Inside your local project folder, change the remote URL under.git/config ‘s file to your copied GitHub's one. The content looks similar as follows. [remote "origin"]
url = git@github.com:team-name/repo-name.git
fetch = +refs/heads/*:refs/remotes/origin/*
4. Do a git push: git push --all . It will push all codes and commit history on your newly GitHub repository.
5. Done. After that, when we push new commits, it will push to GitHub only.
6. The Bitbucket/GitLab repo now can be archived to ‘Read-only’ mode.
