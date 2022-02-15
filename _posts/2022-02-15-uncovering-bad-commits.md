---
layout: post
title: Uncovering Bad Commits
author_avatar: https://avatars.githubusercontent.com/u/16843?v=4
author_name: Steven Chau
author_github_username: whereisciao
---
Coming back from the holiday, I found myself tracking down a UI bug that I personally had no context of when the bug was introduced. I was stuck. Determined to find the root cause of the issue, I turned to an essential tool in my tool box, [git bisect](https://git-scm.com/docs/git-bisect).

Git bisect is a command that uses a binary search algorithm for finding a commit of interest in your project's history. Two commits are required for the command to start: a "bad" commit that contains the bug, and a "good" commit that does not have the bug. Next, the command will traverse the commits between those two commits, each time prompting you if the commit is "good" or "bad". After a series of prompts, it should provide you the commit that introduced the bug.

Identifying a good commit could be difficult. I tend to select a commit in history a few weeks or months at a time. For this particular scenario, a commit a few weeks ago sufficed.

```
$> git bisect start
$> git bisect bad c0fdabe  # A bad commit hash
$> git bisect good 38ccb50 # A good commit hash
```

After a few iterations, the problematic commit was discovered. I was able to notify the author of the bug, thus the the issue resolve promptly.
