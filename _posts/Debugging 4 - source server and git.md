---
layout: post
title: How to configure Source Server with Git
published: False
excerpt_separator: <!--end-of-excerpt-->
---

# How to configure Source Server with Git

Git doesn't have the same facilities as other version control systems - there is no handy equivalent of `sd print`, etc. How can we make Source Server work with Git?

(Part 4 of a series on Windows debugging.)

<!--end-of-excerpt-->

Let's face it: DVCS is different. There isn't a One True Server. It's _distributed_. There are probably many repos, and as far as Git is concerned they're all peers. The notion of a "central" repo just doesn't exist in Git. By convention, you may treat one repo as "central" (e.g. the one in your GitHub organization) but that's a convention, not a feature of Git. An official build happens against a local-to-the-build-machine cloned repo, which probably necessarily visible to you when you try to debug the official binaries. If the build is in GitHub Actions or similar, the build agent was probably recycled minutes later. The repo is gone!

I'm aware of several possible approaches in Git, each of which has some unfortunate limitations.

# wget/curl

You could fetch the file directly from the central repo with HTTP(S), e.g.:

```
wget https://raw.githubusercontent.com/JayBazuzi/jaybazuzi.github.io/a3124c74199a06d21cdb29fb8eb88d46813f3ac4/README.md
```

This assumes you have permissions to access these files via HTTP(S). That wasn't true at one company the developer's machines were on a separate network, and could access the repo via SSH but not the GitHub web UI.

Also, Windows doesn't have a built-in `wget` or `curl` command. In your enterprise maybe you can guarantee that one is installed and on the path?

PowerShell has `Invoke-WebRequest` which looks handy. Hints: You should probably use `-OutFile` not redirection (`>`). If you do use redirection, be sure to also pass `-UseBasicParsing` to avoid the Internet Explorer dependency. Also, PowerShell might be disabled per your enterprise's security policy. Ok, let's not use PowerShell.

Another option is `bitsadmin`:

```
bitsadmin /transfer "source sever is fun!" https://raw.githubusercontent.com/JayBazuzi/jaybazuzi.github.io/a3124c74199a06d21cdb29fb8eb88d46813f3ac4/README.md C:\path\to\foo.cpp
```

Hint: bitsadmin requires the output path is fully qualified.

Uggh, that was quite a tangent. I thought were were talking about debugging?

# SSH

Depending on where your central repo is hosted, perhaps you can SSH to the server to access the file:

```
ssh me@otherhost "cd repo && git show ..."
```

This won't work on GitHub, though - it doesn't allow interactive SSH access.

I learned this approach from [this StackOverflow question](https://stackoverflow.com/questions/1178389/browse-and-display-files-in-a-git-repo-without-cloning).

# Clone

The source server command could use `git clone {URI} {SOMEWHERE} && cd {SOMEWHERE} && git show {REVISION}:path/to/file.cpp`. 

This depends on cloning permissions - if you are set up with an SSH key but the source server command uses HTTPS (or vice versa), you might be out of luck.

It also assumes a small enough repo that `git clone` is quick. You can speed things up by replacing `git clone` with `git init & git fetch`, and maybe by only fetching the revision you're looking for.

Where will this repo live? Will you end up with multiple clones this way? How will you clean them up? All of this gets more complicated as the number of machines, developers, and years grow. Will the approach you implement today still be managable in the future?

# Use an existing clone

People doing the debugging are probably developers, and developers have probably already cloned the repo on their computer already. Can we use that?

Yes, but we need to find the repo somehow. Maybe you already a well-known location for the repo, but I prefer a well-known environment variable. If the source server command is something like `cd %MYPROGRAM_REPO_LOCATION_FOR_SOURCE_SERVER% & git fetch & git show ...`, then you can tell developers to run `setx MYPROGRAM_REPO_LOCATION_FOR_SOURCE_SERVER C:\path\to\repo` before launching Visual Studio. 

Note the `git fetch` to ensure that the new revisions are available, in case the developer hasn't done a `fetch` in this repo for a while.

# A final rant

I sure wish Git would add a command for this purpose, like `show-remote` or something. It could be used like this:

```
git show-remote git@github.com:JayBazuzi/jaybazuzi.github.io.git a3124c74199a06d21cdb29fb8eb88d46813f3ac4:README.md
```

That would make this problem a lot easier to solve.


