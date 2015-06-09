---
layout: post
name: Less-Painful-Merges
title: A less painful way to handle merge conflicts
date: 2015-05-18 18:31:00 +00:00
author: Toby Retallick
---

Merge conflicts. 

Been there right? 

Despite your best intentions and following the recommended advice out there (small pull requests and merging your feature branch into master often), you are bound to come across this issue more often than you’d like.

That being the case, I'd like to share with you a quick 4 step process for handling merge conflicts that was passed onto to me at a time when I had stupidly (yet unintentionally) not heeded the recommended advice.

Over a period of a week I had been diligently working on a feature branch, resulting in what was to be a rather large pull request. In the meantime, my colleagues had been doing the right thing - merging their small pull requests with the master branch at regular intervals.

Once I had finished my ticket, I realised my feature branch was way behind. Doing a git merge would be guaranteed to result in a lot of conflicts. I needed the latest changes from the master branch in my feature branch before I could merge back to master.

So, without further adieu, here is a quick 4 step process for handling conflicts.

###Step 1 - Use the right tool for the job
If you want to merge a feature branch back into the master branch and your code is up to date with master, go for a <strong>git merge</strong>. 

If you are working on a feature branch and it's behind master you will need to bring it up to date using <strong>git rebase</strong>. Because rebase merges every commit individually, conflicts will be served in smaller chunks making them easier to fix and understand.

###Step 2 - Start the rebasing process
From your feature branch type:

```git rebase master```

### Step 3 - Keep it slow and steady, my friend
Now type:

```./gradlew build && git add -A && git rebase --continue```

The above command rebuilds the current project (in this example I am using grade). If everything passes (tests, compiling etc), the project completes its build. If the tests fail, you need to do some fixing.

Once the project is successfully built, your changes are added then the rebase continues to the next conflict.

###Step 4 - Rejoice
Repeat step 3 until all your conflicts have been resolved. You can now push your changes. Note the use of the ‘force' flag.

```git push -f```

Finally, raise your pull request and pretend that this nightmare never happened.

