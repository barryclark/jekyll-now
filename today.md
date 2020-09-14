---
layout: page
title: Today - Creating Git and GitHub Repositories
---

## Housekeeping
- Cheatsheet walk-throughs

## 1. Navigate your file system using the "command line"
### Learning Objectives
- Find your current location using the `pwd` command.
- List the contents of your current directory using the `ls` command.
- Change your current directory using the `cd` command.

See: 
- [File and Directory Cheatsheet]({{site.basurl}}/cheatsheets/naming-conventions)
- [Command Line Cheatsheet]({{site.basurl}}/cheatsheets/command-line)

### Terminology
<dl>
  <dt>Command Line Interface (CLI)</dt>
  <dd>An alternative to Graphical User Interfaces (GUI) that are based on mouse clicks. Terminal apps come in a few flavours; in this course you can use a unix terminal of your choice.</dd>
  <dt>The Terminal</dt>
  <dd>A nickname for an application that understands one or more Command Line Interfaces (CLIs).</dd>
  <dt>Workspace</dt>
  <dd>A dedicated folder(s) on your system for the projects you'll be working on.</dd>
</dl>

## Activity 1: Setting up your workspace
You will be working in groups of 3 or 4. For the purposes of this course, it is recommended you store your repos in a dedicated folder for SAIT projects.
- Create a workspace folder on your file system (you may use your OS file explorer) and navigate to it using the command line. This will be needed for the next session.
- Try navigating to various directories on your system to get accustomed to the command line.

## 2. Cloning a Read-only Repo
### Learning Objectives
- Navigate to your workspace using the Unix command line.
- Clone a read-only repo into your workspace using the `git clone` command.
- Refresh a local read-only repo using the `git pull` command.

See: [Git Cheatsheet]({{site.basurl}}/cheatsheets/git-gh)

## Activity 2: Cloning the program repo
You will be working in groups of 3 or 4.
1. Navigate to the workspace directory you created earlier.
2. Confirm that you've set your name and email using `git config`. See: [First Time Setup Cheatsheet]({{site.basurl}}/cheatsheets/git-gh/creating-repos)
3. Clone a copy of one or more the the WBDV program repos. Follow Scenario 1 in the [Creating Repos Cheatsheet]({{site.basurl}}/cheatsheets/git-gh/creating-repos).

When you return to the main room, you will refresh your local repo with fresh changes made by your instructor.

_[lunch]_

## 3. Lab Time
Let's practice different scenarios.

You will be working in groups of 3 or 4.
1. Find and download a static html template from [HTML5 Up](https://html5up.net/) (for example).
2. Deploy the template on GH Pages. See: Scenario 4 in the [Creating Repos Cheatsheet]({{site.basurl}}/cheatsheets/git-gh/creating-repos).
3. Change the title of the home page (`title` tag in the `head`) and deploy the change using the [add/commit/push lifecycle]({{site.baseurl}}/cheatsheets/git-gh/add-commit-push).

Elect a representative from your group to show the class your favourite template.

### Use cases
- Deploy an open-source template to publish a potential portfolio or personal site. (Tony used [HTML5 Up](https://html5up.net/) for his crappy [corporate site](http://sitesol.ca/)).
- Create a dedicated repo for [Font Awesome](https://fontawesome.com/) icons or some other useful library.
- Any others?

## Clean up time!