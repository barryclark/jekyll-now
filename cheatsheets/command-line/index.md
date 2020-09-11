---
title: Command Line Cheatsheet
layout: page
---
Most of the command line tools we will be using in this course (like Git, [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)) will depend greatly on which folder you are in. We will cover the three system commands that help up us navigate the file system.

Warning: There are two flavours of "command line": Windows and Unix. We will be using the latter: Git Bash (installed along with Git) on Windows and Terminal on Mac (Mac is unix-based so almost any terminal app will do; Tony uses iTerm). 
{: .notice--warning}

- `pwd`
  - displays your 'present working directory'. This will usually default to your home folder when you first open your terminal.
- `ls`
  - Lists the contents of your current directory. 
  - The `-l` flag lists extra information and `-a` lists hidden files. `-la` will list extra information and also all hidden files. Examples:
    - `$ ls -l`
    - `$ ls -a`
    - `$ ls -la`
- `cd`: changes your directory based on the path you provide after the command (separated by a space). Examples:
  - `$ cd Documents/cprg210`
  - `$ cd /h/sait/cprg210`
  - `$ cd ..` (moves up one directory)

Quality of life cli tips
- tab: auto-completes file names and directories
- up arrow: browse through command history

### Live-code objectives
- What is the starting directory when you open a terminal on your system?
- What files and directories are in this initial directory?
- What file did you last open? Try to find it using only the terminal.
- What's at the top of your directory structure? How do you get there?
- Using the terminal, find the directory you've chosen to store your cprg 210 projects.

### Activity 1: Navigating the file system
You will be working in teams. Make sure you have installed Git on your system. We will be using Git Bash for this exercise.

Try navigating to various directories on your system to get accustomed to the command line.