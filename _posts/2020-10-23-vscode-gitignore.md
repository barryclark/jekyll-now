---
layout: post
title: Week 7F - VS Code Extensions and .gitignore
categories: cpnt201
---

## Homework
1. `.gitignore`
    - [Ignoring Files](https://docs.github.com/en/free-pro-team@latest/github/using-git/ignoring-files) on GitHub Docs

Note: `npm` has been moved to [Friday, October 30]({% link _posts/2020-10-30-npm-package-json.md %}).

---

## 1. Tooltime: VS Code Extensions
Although we'll eventually need npm for CPNT 262, it is no longer needed for CPNT 201. VS Code to the rescue!
1. Live Sass Compiler:
    - Watch: [How to start using Sass without having to worry about the command line](https://youtu.be/Yan2eurSNGg) by Kevin "Friday" Powell
    - Install: [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)
2. [JS & CSS Minifier (Minify)](https://marketplace.visualstudio.com/items?itemName=olback.es6-css-minify)

---

## 2. Ignoring files globally in Git
There are certain files created by particular editors, IDEs, operating systems, etc., that do not belong in a repository. But adding system-specific files to the repo's `.gitignore` is considered a poor practice. This file should only exclude files and directories that are a part of the package that should not be versioned (such as the node_modules directory) as well as files that are generated (and regenerated) as artifacts of a build process.

Sources:
- [subfuzion .gitgnore](https://gist.github.com/subfuzion/db7f57fff2fb6998a16c)
- [Octocat .gitignore](https://gist.github.com/octocat/9257657)

### Instructions
1. Confirm if you have already set up a global `.gitignore` by entering the following command in your Git Bash terminal:

    ```shell
    $ git config --global core.excludesFile    
    ```

2. If not, create a file called `.gitignore` in your home directory (this is your user directory where core directories such as `Desktop` and `Documents` live).
3. Add any system specific files that shouldn't be included in any repos. Examples:

    ```shell
    # Mac
    .DS_Store
    .DS_Store?
    ._*
    .Spotlight-V100
    .Trashes

    # Windows
    ehthumbs.db
    Thumbs.db
    desktop.ini

    # Logs
    log/
    logs
    *.log
    npm-debug.log*
    *.bak

    # Runtime data
    pids
    *.pid
    *.seed

    # Compressed data
    *.7z
    *.dmg
    *.gz
    *.iso
    *.jar
    *.rar
    *.tar
    *.zip

    # vi
    *~

    # etc...
    ```

4. Set the location of your global `.gitignore` file by entering the following command in Git Bash:

    ```shell
    $ git config --global core.excludesFile '~/.gitignore'
    ```

5. For future reference: Create a project specific `.gitignore` file that you will include in all of your node/npm projects. Include the following:

    ```
    # dotenv environment variables file
    .env
    .env.test

    # npm dependency directory
    node_modules
    ```

---

## Activities
- Prep for Monday: [Find some beginner tutorials](https://www.google.com/search?q=sass+introduction) on Sass to get familiar with the major features of CSS pre-processors.

---

## Clean-up Time!
- Early dismissal at 11:30am.