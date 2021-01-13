---
title: "The add/commit/push lifecycle"
layout: page
---
## Prerequisites 
- Git installed
- VS Code installed
- Github Account created
- Remote GitHub repo linked to a local Git repo
- [Command Line Cheatsheet]({{site.basurl}}/cheatsheets/command-line)
- [File Naming Conventions Cheatsheet]({{site.basurl}}/cheatsheets/naming-conventions)
- [Git Cheatsheet]({{site.basurl}}/cheatsheets/git-gh)

## Dev Life
In the course of an average professional project, a developer should be regularly:
- pushing committed code to a remote repository (preferably daily), and
- pulling new code recently contributed by team members (which you need to do before Git will allow you to push).

### "Pulling" recent commits from a remote repo
In team projects (or if you work on multiple machines), you will need to `pull` recent updates from the remote repo before Git will allow you to push.

```
$ git pull
```

You will then be free to push contributions from your local repo.

### "Committing" changes to a remote repo
An example routine most developers will follow in a given work-day:
1. Navigate to the project directory using a unix shell terminal.
2. Type `git status` to see an overview of the state of your repo. 
    - If you haven't made any changes since your last commit, you should see the message "_nothing to commit, working tree clean_";
    - If no repo exists, you should see the message "fatal: not a git repository". See: [Creating local Git Repositories]({{site.baseurl}}/cheatsheets/git-gh/creating-repos/);
    - Otherwise, you should see a list of staged/unstaged/untracked changes.
3. `git add <relative file path>` to stage your files to commit.
4. `git status` to double-check your staged changes before you commit (probably listed in green).
5. `git commit -m "concise description of your changes"` to commit your changes. If you forget to add the `-m "<message>"`, Git will probably open your default command line file editor (probably Vim) so you can add your change manually (not fun for beginners).
6. `git status` again to confirm that you have a clean "working tree".
7. Make some changes to your code and start again at Step 2. You should be committing your changes to your local repo at least at the end of a work day/session.
8. When you are ready, you can push your changes from your local repo to a remote repo using (assuming these repos are already linked) with the following command:

```
$ git push
```
