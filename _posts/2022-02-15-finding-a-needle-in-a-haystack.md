---
layout: post
title: Finding a needle in a haystack with git bisect
author_avatar: https://avatars.githubusercontent.com/u/16843?v=4
author_name: Steven Chau
author_github_username: whereisciao
excerpt: Finding a bad commit in an unfamiliar code base is like finding a needle in a haystack. Determined to find the root cause of the issue, I turned to an essential tool in my tool box, git bisect.
---

![Haystack](/images/posts/2022-02-15-finding-a-needle-in-a-haystack/haystack.jpg)
Photo by <a href="https://unsplash.com/@lucasgallone?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Lucas Gallone</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Coming back from the holiday, I found myself tracking down a UI bug that I personally had no context of when the bug was introduced. I was stuck. Finding the bad commit was like finding a needle in a haystack. Determined to find the root cause of the issue, I turned to an essential tool in my tool box, [git bisect](https://git-scm.com/docs/git-bisect).

Git bisect is a command that uses a binary search algorithm for finding a commit of interest in your project's history. Two commits are required for the command to start: a "bad" commit that contains the bug, and a "good" commit that does not have the bug. Next, the command will traverse the commits between those two commits, each time prompting you if the commit is "good" or "bad". After a series of prompts, it should provide you the commit that introduced the bug.

Identifying a good commit could be difficult. I tend to select a commit in history a few weeks or months at a time. For this particular scenario, a commit a few weeks ago sufficed.

```
$> git bisect start
$> git bisect bad c0fdabe  # A bad commit hash
$> git bisect good 38ccb50 # A good commit hash
```

The command will now checkout a commit between the two commits provided. The output would look something like this:

```
Bisecting: 9 revisions left to test after this (roughly 3 steps)
```

This is time for test whether the bug is present. If the commit is good, type:
```
git bisect good
```

If the commit is bad, type:

```
git bisect bad
```

After a few more iterations, the problematic commit was discovered. I was able to notify the author of the bug, thus the issue resolve promptly.
