---
title: "Day 5: Git and GitHub"
layout: page
---

## Prerequisites 
- Git installed
- VS Code installed
- Github Account created

But FIRST! We need to learn some command line...

## Lecture: Your first git repository (maybe)
Let's go back to that page of instructions we received after creating our **GitHub** repo. Remember, we'll be starting with the top option: "…or create a new repository on the command line".

### Top Git commands
- `$ git status`: Show the current status of your repository (repo)
- `$ git add`: Add file contents to be committed
- `$ git commit`: Record changes to the repository
- `$ git push`: Update remote refs along with associated objects
- `$ git pull`: Fetch from and integrate with another repository or a local branch

### Live-code objectives
- How will you organize your projects?
- If you've just installed Git, [set your name and email](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) using the `git config` command described in the Prep. 
- Create a git repository for the project you've been working on in the HTML/CSS portion of this course.
  1. Navigate to your project directory on the command line.
  2. `git status` to make sure you are not already in a repo.
  3. `git init` to initialize a new repo. This is usually done only once (if that) per project.
  4. `git status` to see what files are modified/deleted/untracked.
  5. `git add .` to add all your files for an initial commit
  6. `git status` to double-check before you commit.
  7. `git commit -m "concise description of your changes"` to commit your changes.
  8. `git status` again to confirm that your "working directory is clean".
  9. Make some changes to your code and start again at Step 4. You should be committing your changes multiple times a day.

When you are ready, enter the last two lines of the GitHub instructions to attach and sync your local and remote repos.

```shell
$ git remote add origin https://github.com/acidtone/hello-world.git
$ git push -u origin master
```

There are two ways to connect your system to GitHub: HTTPS and SSH. It's widely recommended that beginners use the HTTPS option. You will be asked for your login credentials the first time but your terminal should remember this for future connections.
{: .notice}

### Activity: Project work
You will be working in teams. Work on your projects as you normally would, but try committing your changes as you go. Get used to the status/add/commit lifecycle of a professional developer.

When you like what you see, push your changes to GH.

## Activity: Publish your website to GH Pages
You will be working in teams. Go to [pages.github.com](https://pages.github.com/) to get a summary of what GH Pages is and how to use it. Work together to publish each of your projects to a GH Pages website.
