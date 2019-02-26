---
layout: post
title: Revert An Older Commit Without Discarding Any Later Commits
tags: [meta, github]
keywords: [git, revert commit, git revert, revert an older commit, commit]
---

After making a few changes to this blog in an attempt to [appease Amazon and failing](https://hendrixjoseph.github.io/amazon-shut-down-my-associate-account/), I wanted to undo those changes. Thankfully, since this blog is hosted on GitHub pages, it's versioned controlled via Git. Meaning I should easily be able to find the changes and undo them fairly easily.

In Git technical terms, I wanted to revert an older commit without discarding any later commits.

Some people might say you're undoing a commit, which I guess is technically correct, but there's also a reset command that brings a repository back to that commit.

First things first, I needed to find the individual commits I wanted to revert. This is where good commit messages would have come in handy - except I can be lazy when it comes to repos only I use.

Eventually, I found two commits I wanted to revert:
* [https://github.com/hendrixjoseph/hendrixjoseph.github.io/commit/7dc5ab44d430e6bd9e6ba02ee246fd764454186b](https://github.com/hendrixjoseph/hendrixjoseph.github.io/commit/7dc5ab44d430e6bd9e6ba02ee246fd764454186b)
* [https://github.com/hendrixjoseph/hendrixjoseph.github.io/commit/461914ecb7a057013c0a486b0f445c44bef4bdb9](https://github.com/hendrixjoseph/hendrixjoseph.github.io/commit/461914ecb7a057013c0a486b0f445c44bef4bdb9)

The nice thing about having two commits I wanted to revert is that I could do one via the [TortoiseGit](https://tortoisegit.org/) GUI and one via the command line.

## Revert an Older Commit Via the TortioseGit GUI

1. Make a backup of the directory - i.e. just make a copy in the same directory:

![Make a backup of the directory.](/images/git-revert/make-a-backup.png)

2. Open the Git Log by right-clicking on the Git directory and selecting **TortoiseGit &rarr; Show log**:

![Open the Git Log](/images/git-revert/open-log.png)

3. Scroll through and find the commit to revert (and double check that its hash is the same), right-click on it and select **Revert change by this commit**:

![Revert change by this commit](/images/git-revert/revert-changes.png)

At this point, most people would have successfully reverted their commit. I, however, got a "Failed Revert" dialog that said "error: could not revert":

![Error: Success](/images/git-revert/error-success.png)

It wasn't all bad, though. For the most part, my revert *did* happen, it just wasn't able to auto-commit after the revert due to a conflict with a later commit. I simply navigated through the Git directory in my file system and solved the conflict.

## Revert an Older Commit Via the Git Bash Command Line

Now for the next commit undo, which I wanted to do via the command line.

To reach the Git command line, I just right-clicked on the Git directory and selected **Git Bash Here** (look at the image on step two above to see where it's located). The Git command to revert a specific command is straightforward:

    git revert <commit hash>

The commit hash is that last bit of numbers and letters in the GitHub commit url. So the command I typed was:

    git revert 461914ecb7a057013c0a486b0f445c44bef4bdb9

The revert was successful, and it did autocommit successfully as well (there were no conflicts). Being Git, I did have to push manually.

If I didn't want to auto-commit, I would simply have to supply the `--no-commit` or `-n` flags:

    git revert --no-commit <commit hash>
    git revert -n <commit hash>

Here are the links to the revert commits on GitHub if you're wondering what they look like (spoiler: nothing special):

* [https://github.com/hendrixjoseph/hendrixjoseph.github.io/commit/a9315e6d67ac3f67dac717f5e0ba6196fa434f13](https://github.com/hendrixjoseph/hendrixjoseph.github.io/commit/a9315e6d67ac3f67dac717f5e0ba6196fa434f13)
* [https://github.com/hendrixjoseph/hendrixjoseph.github.io/commit/edf52d6d85a64d0011b6fd5d54f361d533b94d68](https://github.com/hendrixjoseph/hendrixjoseph.github.io/commit/edf52d6d85a64d0011b6fd5d54f361d533b94d68)

## Sources

* [How can I undo an older commit?](https://www.git-tower.com/learn/git/faq/undo-revert-old-commit)
* [Stackoverflow: Undo a particular commit in Git that's been pushed to remote repos](https://stackoverflow.com/questions/2318777/undo-a-particular-commit-in-git-thats-been-pushed-to-remote-repos)
