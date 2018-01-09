I quite often have friends and colleagues come to me when they come across issues in git where they are trying to get master changes into their feature branch or where they try to get their work into the master branch. This is usually presented in the form of merge conflicts that they are struggling to get their heads around or with a terrible history trail that they cannot get their heads around when trying to work out what has happened somewhere along the line.

I notice that this tends to happen when
* The developer has created a feature branch from master and they are the only person working on it.
* As time has moved on, the developer has made several commits of work into their branch.
* The master branch has had new commits added and is now ahead of the developers feature branch.
* The developer is now ready to merge his feature into the master branch.

![Feature Branch](https://www.atlassian.com/dam/jcr:01b0b04e-64f3-4659-af21-c4d86bc7cb0b/01.svg)

## Merging

At this point, the developer uses the knowledge of what they know, or a UI to handle this for them, but essentially tries 1 of the 2 following approaches to merging.

1. Try to merge the feature branch directly into master. 

   The developer first checks out the local master branch and does a pull from the remote repository to make sure they are up to date and then performs a `git merge feature/branch` to attempt to merge their changes into master. They may be lucky and have no merge conflicts, but more often than not, especially with large teams, there will be merge conflicts to resolve. The developer then tries to fix up these merge conflicts at the merge commit in their local master branch and then push the changes to the remote repository.

   To most people this appears to be the easiest and most logical route to take. It's a single command to merge the changes and just fix up any conflicts to commit/push.

   There are several problems with this approach.
   
   * You are making changes directly in the master branch that cannot be pushed to the remote repository and tested by a Continuous Integration Process, therefore master can end up in an unstable state.
   * When you try to look back at this merge in the future, perhaps you need to revert this commit, it becomes very hard to find out what actually happened, when it happened and how it happened. There is no distinguish between the work you did for your feature and the work you had to do to get other developers changes which resulted in the mergec conflict.

2. Try to merge the master changes into their feature branch to make sure their feature is up to date before merging back into master.

   The developer first checks out the local master branch and does a pull from the remote repository to make sure they are up to date and then performs a `git checkout feature/branch` followed by a `git merge master` to merge the master changes into their feature branch and fix the conflicts here, so that when they then `git checkout master` and `git merge feature/branch` the conflicts will already have been correctly resolved.

   This is at least a better option than option 1, as this allows you to get all the changes and try to merge them in your own branch first, to which you can then push to the remote repository and allow CI to build and test before you now merge, **hopefully without further merge conflicts**, your feature branch back into develop. This **should** work without an issue as technically master and feature now both contain the same commits plus your extra commits for your feature.
   
   Great?

   Well not quite. The problem is, that when you do a merge, git will take the changes from the merging branch and create a new commit on the base branch ontop of the HEAD (Where your work is) that contains changes from other people. Now when you merge back to the master branch, you end up with another commit on the top of the HEAD which now contains the common ancestor of master and the feature branch, and then adds the new commits from the feature branch ontop of the HEAD of the master branch, plus the new merge commit from when you pulled changes over from master, which likely results in more merge conflicts as git has already tracked these changes and now doesn't know what you want to do with them.
   
   Also, in the event that this does work, the history again becomes very difficult to read. Perhaps as a developer you might not need to care about the history now. But what about when you have introduced a terrible bug and it's going to take a while to fix, so you want to pull this commit out, how can you look through and find the commit(s) quickly to pull out? Or what about when someone on your DEVOPS team wants to gather up some Release Notes of recent changes by looking at the history? You end up with so many backward and forward commits that it is hard, if not impossible, to see what has happened.

![Merge](https://www.atlassian.com/dam/jcr:e229fef6-2c2f-4a4f-b270-e1e1baa94055/02.svg)

## Introducing a Rebase

```git
git rebase master
```

![Rebase](https://www.atlassian.com/dam/jcr:5b153a22-38be-40d0-aec8-5f2fffc771e5/03.svg)

When I mention a rebase to most people I get a very blank/confused stare back as I find not many people understand what this is and how to use it. Or they have a rough understanding but are far too scared to use it.

A rebase is a command you can use instead of a merge to get changes from a shared branch such as master, into your own feature branch. The difference is how the process works compared to a merge.

When you perform a rebase what happens is a set of logical steps that gets the work that you have committed on your feature branch ontop of the HEAD of the latest changes from master, almost as if you had just done all the work ontop of the latest changes, making your branch ahead of the master rather than behind.



### What is happening under the hood
1. The common ancestor commit between the 2 branches is located.
2. Git will then rewind the HEAD of the branch back to this common commit and will stash all the commits that you have made since this point.
3. New changes from the master branch are pulled over to the feature branch so that now the feature branch and master branch are identical.
4. Git will then replay each commit that you made on the branch, one at a time on top of the new HEAD with all the latest changes.
5. When git applies these commits, one at a time, if there is a merge conflict when applying the commit, the process is paused and you are then asked how to fix the merge conflicts. You can then fix these as you would normally and as soon as you have fixed up all the conflicts, you tell git to continue with the rebase `git rebase --continue`
6. This process keeps happening until all of your commits have been replayed on top of the master branch changes, almost as if you had just done all your work now on the latest changes.
7. Finally your local branch and your remote branch are now completely out of sync and git will tell you there are changes from the remote to pull and changes to push. This is perfectly normal because what you have done is updated your branch's history compared to the remote. What you need to do now is to force push your changes to the remote which will overwrite the history and trust your local branch. `git push --force`.

After a rebase your branch is now x commits ahead of master and ready to be easily merged into master.
```git
git checkout master
git merge feature/branch
```

## When NOT to use a rebase

For those people that have heard about rebase, this is usually the part that scares them the most.

Because you are overwriting/changing the history of the branch and force pushing changes to the remote repository, you should **NEVER** do this on a public/shared branch. Only ever perform this if you are the only person working on the branch because if you are sharing this with another developer, and they try to pull changes from the remote repository, you will break their local copy.

Generally speaking this is a safe and very useful command to know, and as soon as you understand what is happening under the covers, it makes the most sense out of all the options.

## Workflow

I recommend following this simple workflow in a team when working with feature branches and master.

* Always rebase master when trying to get other changes.
* Always merge feature branch back into master.

1. Create a new feature branch
2. Make changes/commits
3. When ready to merge, checkout master and pull the latest changes
4. Switch back to yor feature branch and rebase master
5. Fix any conflicts
6. Force Push Changes to the Remote Repository
7. Create a Pull Request for someone to Review and Merge into master OR merge your feature branch into master and push the changes.

Example

```git
git checkout master
git pull
git checkout -b feature/mybranch
# Make some changes to the files
git add -A
git commit -m "Committing my changes with a useful message."
# Make some changes to the files
git add -A
git commit -m "Committing my changes with a useful message."
git checkout master # Switch back to the master branch
git pull
git checkout feature/mybranch
git rebase master
git push --force
# Either use your git web UI to make a Pull Request to merge your feature branch into the master branch, having another Team Member review your changes.
# OR merge and push locally...
git checkout master
git merge feature/mybranch
git push
```

## References

Images are from Atlassian's Tutorials and you can find further information on Rebase vs Merging at their page [here](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)
