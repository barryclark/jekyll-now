---
title: "Git and GitHub"
layout: page
kramdown: 
  parse_block_html: true
---
## Prerequisites 
- Git installed
- VS Code installed
- Github Account created
- [Command Line Cheatsheet]({{site.basurl}}/cheatsheets/command-line)
- [Naming Conventions Cheatsheet]({{site.basurl}}/cheatsheets/naming-conventions)

## Terminology
<dl>
  <dt>Version Control</dt>
  <dd>A category of software tools that help a software team manage changes to source code over time.</dd>
  <dt>Repository (aka repo)</dt>
  <dd>Technically, a collection of commits, and branches and tags to identify commits. You can think of a repo as a directory of code that is tracked using Git.</dd>
  <dt>Local Repository</dt>
  <dd>A repo that is located on your local machine.</dd>
  <dt>Remote Repository</dt>
  <dd>A repo that is located on another machine or server. For the purposes of this course, all of your remote repos will be located on GitHub.</dd>
  <dt>Initialize a Repository</dt>
  <dd>A method of creating a new repo in the current directory using the `git init` command.</dd>
  <dt>Linking a Repository</dt>
  <dd>To associate a local repo on your system to a remote repo (i.e. on GitHub). This is done automatically when you clone a repo. Otherwise, a link can be created using the `git remote` command.</dd>
  <dt>Clone a Repository</dt>
  <dd>A method of copying a remote repo to your local system using the `git clone` command.</dd>
  <dt>Fork a Repository</dt>
  <dd>A GitHub feature that allows you to copy a third-party GH repo into your GH account. Note: this is <em>not</em> a native Git feature.</dd>
  <dt>Commit Changes to a Repository</dt>
  <dd>A saved "snapshot" of the repo at any given time using the `git commit` command.</dd>
  <dt>Stage a File(s) to be Committed</dt>
  <dd>Git is an "opt-in" environment. Changes to a file need to be "staged" before they can be committed to a repo. You do this using the `git add` command.</dd>
  <dt>Pull Changes <em>from</em> a Remote Repository</dt>
  <dd>To update a local repo with the commits from a remote repo using the `git pull` command. This needs to be done **before you can push changes** (assuming the local and remote repos are out of sync).</dd>
  <dt>Push Changes <em>to</em> a Remote Repository</dt>
  <dd>To synchronize a remote repo with the commits from a local repo using the `git push` command.</dd>
</dl>

- [First Time Setup]({{site.baseurl}}/cheatsheets/git-gh/setup)
- [Creating Git (and GitHub) Repositories]({{site.baseurl}}/cheatsheets/git-gh/creating-repos)
- [The add/commit/push lifecycle]({{site.baseurl}}/cheatsheets/git-gh/add-commit-push)