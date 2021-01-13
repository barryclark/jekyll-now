---
title: Command Line Cheatsheet
layout: page
---
<dl>
  <dt>Command Line Interface (CLI)</dt>
  <dd>An alternative to Graphical User Interfaces (GUI) that are based on mouse clicks. Terminal apps come in a few flavours; in this course you can use a unix terminal of your choice.</dd>
  <dt>The Terminal</dt>
  <dd>A nickname for an application that understands one or more Command Line Interfaces (CLIs).</dd>
  <dt>Workspace</dt>
  <dd>A dedicated folder(s) on your system for the projects you'll be working on.</dd>
</dl>

Most of the command line tools we will be using in this course (like Git, [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)) will depend greatly on which folder you are in. We will cover the three system commands that help up us navigate the file system.

**Warning**: There are two flavours of "command line": Windows and Unix. We will be using the latter: Git Bash (installed along with Git) on Windows and Terminal on Mac (Mac is unix-based so almost any terminal app will do; Tony uses iTerm). Here is a [Windows command cheatsheet](https://www.thomas-krenn.com/en/wiki/Cmd_commands_under_Windows)
{: .notice--warning}

- `pwd`
  - displays your 'present working directory'. This will usually default to your home folder when you first open your terminal.
- `ls`
  - Lists the contents of your current directory. 
  - The `-l` flag lists extra information and `-a` lists hidden files. `-la` will list extra information and also all hidden files. Examples:
    - `$ ls` (lists file and directory name of the current folder)
    - `$ ls -l` (lists full directory information)
    - `$ ls -a` (lists hidden files)
    - `$ ls -la` (lists full information plus hidden files)
- `cd`: changes your directory based on the path you provide after the command (separated by a space). Examples:
  - `$ cd Documents/sait`
  - `$ cd /` (moves to the top root folder)
  - `$ cd` (moves to user home folder)
  - `$ cd ..` (moves up one directory level)
  - `$ cd ../../new-directory` (moves up two directories and into "new-directory")

**CLI Quality of Life Tip #1**: The tab key auto-completes file names and directories.
{: .notice--info}

**CLI Quality of Life Tip #2**: Use the Up Arrow to browse through the history of last used commands.
{: .notice--info}

### Questions to Consider
- What is the starting directory when you open a terminal on your system?
- What files and directories are in this initial directory?
- What file did you last open? Try to find it using only the terminal.
- What's at the top of your directory structure? How do you get there?
- Using the terminal, find the directory you've chosen to store your projects.