I quite often have friends and colleagues come to me when they come across issues in git where they are trying to get master changes into their feature branch or where they try to get their work into the master branch. This is usually presented in the form of merge conflicts that they are struggling to get their heads around or with a terrible history trail that they cannot get their heads around when trying to work out what has happened somewhere along the line.

I notice that this tends to happen when
* The developer has created a feature branch from master and they are the only person working on it.
* As time has moved on, the developer has made several commits of work into their branch.
* The master branch has had new commits added and is now ahead of the developers feature branch.
* The developer is now ready to merge his feature into the master branch.

At this point, the developer uses the knowledge of what they know, or a UI to handle this for them, but essentially tries 1 of the 2 following approaches to merging.

1. Tries to merge the feature branch directly into master. 

   The developer first checks out the local master branch and does a pull from the remote repository to make sure they are up to date and then performs a `git merge feature/branch` to attempt to merge their changes into master. They may be lucky and have no merge conflicts, but more often than not, especially with large teams, there will be merge conflicts to resolve. The developer then tries to fix up these merge conflicts at the merge commit in their local master branch and then push the changes to the remote repository.

   To most people this appears to be the easiest and most logical route to take. It's a single command to merge the changes and just fix up any conflicts to commit/push.

   There are several problems with this approach.
   
   * You are making changes directly in the master branch that cannot be pushed to the remote repository and tested by a Continuous Integration Process, therefore master can end up in an unstable state.
   * When you try to look back at this merge in the future, perhaps you need to revert this commit, it becomes very hard to find out what actually happened, when it happened and how it happened. There is no distinguish between the work you did for your feature and the work you had to do to get other developers changes which resulted in the mergec conflict.

2. Tries to merge the master changes into their feature branch to make sure their feature is up to date before merging back into master.

   The developer first checks out the local master branch and does a pull from the remote repository to make sure they are up to date and then performs a `git checkout feature/branch` followed by a `git merge master` to merge the master changes into their feature branch and fix the conflicts here, so that when they then `git checkout master` and `git merge feature/branch` the conflicts will already have been correctly resolved.

   This is at least a better option than option 1, as this allows you to get all the changes and try to merge them in your own branch first, to which you can then push to the remote repository and allow CI to build and test before you now merge, **hopefully without further merge conflicts**, your feature branch back into develop. This **should** work without an issue as technically master and feature now both contain the same commits plus your extra commits for your feature.
   
   Great?

   Well not quite. The problem is, that when you do a merge, git will take the changes from the merging branch and create a new commit on the base branch ontop of the HEAD (Where your work is) that contains changes from other people. Now when you merge back to the master branch, you end up with another commit on the top of the HEAD which now contains the common ancestor of master and the feature branch, and then adds the new commits from the feature branch ontop of the HEAD of the master branch, plus the new merge commit from when you pulled changes over from master, which likely results in more merge conflicts as git has already tracked these changes and now doesn't know what you want to do with them.
   
   Also, in the event that this does work, the history again becomes very difficult to read. Perhaps as a developer you might not need to care about the history now. But what about when you have introduced a terrible bug and it's going to take a while to fix, so you want to pull this commit out, how can you look through and find the commit(s) quickly to pull out? Or what about when someone on your DEVOPS team wants to gather up some Release Notes of recent changes by looking at the history? You end up with so many backward and forward commits that it is hard, if not impossible, to see what has happened.

## Introducing a Rebase

When I mention a rebase to most people I get a very blank/confused stare back as I find not many people understand what this is and how to use it. Or they have a rough understanding but are far too scared to use it.

A rebase is a command you can use instead of a merge to get changes from a shared branch such as master, into your own feature branch. The difference is how the process works compared to a merge.

When you perform a rebase what happens is a set of logical steps that gets the work that you have committed on your feature branch ontop of the HEAD of the latest changes from master, almost as if you had just done all the work ontop of the latest changes, making your branch ahead of the master rather than behind.



I frequently get asked the same question and hear the same statement from developers when it comes to Merging and Rebasing.
* *What is the difference between a git merge and a git rebase?*
* *I am scared of or have been told to never rewrite my git history!*


Then I am presented with an issue that a fellow colleague has gotten themselves into when they merge changes from master into their feature branch and then merge their feature branch back into master
