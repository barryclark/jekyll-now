---
layout: post
title: Git Simple Commands !
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

[comment]:![_config.yml]({{ site.baseurl }}/images/config.png)

Here are simple commands to work with git. I will improve upon it as i keep learning. 

#### Start with Basics
`git chec out -b branch` <br>
switches you to a branch 

`git checkout -b mybranch1` <br>
`vi a.txt`  <br>
`git status` <br>
`git add a.txt` <br>
`git commit -m "change 1: mybranch1: added a line to a.txt"` <br>
`git push origin mybranch1` <br>

Now changes needs to be merged to master.

### Merging in GitHub
Before Creating pull request, you will merge your branch to master. 
After that pull request will be created.
There are few options:  
- Create a merge commit
- Squash and merge
- Rebase and merge

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