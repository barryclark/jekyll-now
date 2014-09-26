---
title: Getting Started with GitHub
date: 2014-09-25 22:57:39
author: Jason Heppler
layout: post
---

There are various ways that you can access GitHub for posting to the course 
blog: the command line; GitHub for Desktop; and GitHub on the web. Perhaps the 
simplest is simply using GitHub's web interface. Here is how you would go 
about adding posts:

*  Ensure that your post has a unique title. For reading discussions, 
   something along the lines of `YEAR-MM-DD-LASTNAME-week-#-readings.md` will 
   work just fine, as well as keep file names unique. For discussion 
   questions, similarly you might use `YEAR-MM-DD-LASTNAME-week-#-discussion.md`.

*  You should have access to the stanford-history.github.io repository. It 
   should appear like this on your repository page:

![Repository home](/images/repository_name.png)

*  Clicking on the repository's name will take you into the repository, which 
   is structured to allow GitHub to automatically generate web pages for us out 
   of our properly-formatted posts. The structure looks something like this:

![Repository structure](/images/repository_directories.png)

*  For writing posts, the only directory you'll need access to is the `_posts` 
   directory. All of our reading reflections and discussion questions will go 
   here. Once you click through to the `_posts` directory, you will be able to 
   use the web interface to add new files. You'll notice along the top-left 
   side of the repository a `+` symbol. Clicking this will give you the option 
   to add a new file. I have added a `_template.md` file to help get you 
   started with a properly-formatted blog post with the correct YAML header 
   information.

![Adding files](/images/adding_files.png)

*  GitHub will give you a text editor in which to name your file (named 
   according to the instructions above) and write. I would recommend not doing 
   all of your writing here -- there's no automatic saving, and I would hate 
   to see you lose any work by accident. Instead, you should do your writing 
   in a text editor of your choice (take a look at [Sublime 
   Text](http://www.sublimetext.com/), [Atom](https://atom.io/), 
   or [TextWrangler](http://www.barebones.com/products/textwrangler/), or 
   specific Markdown text editors like [Ulysses](http://www.ulyssesapp.com/), 
   [Byword](http://bywordapp.com/), and [iA 
   Writer](http://www.iawriter.com/mac/). If you're really feeling adventurous, check 
   out [vim](http://en.wikipedia.org/wiki/Vim_(text_editor)) or 
   [Emacs](http://en.wikipedia.org/wiki/Emacs).). Once you've written your 
   post, you can copy/paste the text into the GitHub editor. 

*  Once you've finished your post, you can commit the file by going to the 
   bottom of the page, filling out the one-line description (which can be as 
   simple as "Adding reading discussion questions") and clicking "Commit 
   changes."

![Commit changes](/images/commit_file.png)

*  Once you commit the file, GitHub will update the site after a few moments. 
   If you need to do any additional editing, you'll notice on the file's page 
   a series of options in the upper-right side. The pencil icon allows you to 
   edit the file; you can also see the history of edits to the file, view the 
   raw text of the file, clone the file with GitHub for Desktop, or delete the 
   file.

![File options](/images/file_options.png)

How you add files to the repository is up to you. If you want to learn how to 
access GitHub from the command line, then don't be afraid to experiment! You 
won't break anything -- everything is under version control and can always be 
backed up and reverted to a previous state. I would encourage you to work with 
GitHub through the command line or through GitHub's desktop client, but using 
the web interface allows you to get up and running quickly and easily.
