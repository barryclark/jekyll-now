---
title: "Files and Directories - Naming Conventions"
layout: page
---
## Prerequisites
- [Dealing with files](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files)
- [Absolute vs Relative file paths](https://www.coffeecup.com/help/articles/absolute-vs-relative-pathslinks/)

<dl>
  <dt>Directory</dt>
  <dd>Equivalent to a folder on a file system. "Directory" sounds more nerdy.</dd>
  <dt>Root Directory</dt>
  <dd>The top folder of any given server "context". On your local file system, the root directory is the top directory on your hard drive. For a website, it's the top directory under a domain name.</dd>
  <dt>Current Working Directory</dt>
  <dd>Your current location in a command line application. a.k.a. Present Working Directory</dd>
  <dt>Relative File Path</dt>
  <dd>A partial path (there is no leading slash) that is relative to the current working directory. Example: `images/pic1.png`</dd>
  <dt>Absolute File Path</dt>
  <dd>A full path (starts with a leading slash) that points to the same location in a file system, regardless of the current working directory. The leading slash make the path relative to the root directory. Example: `/Users/tony/Documents`</dd>
</dl>

**Warning**: Absolute and relative paths have a slightly different definition in the context of HTML links. Absolute paths are full URLs with protocol and domain information. Relative paths are all others, including links that start with a leading slash.
{: .notice--warning}

## File naming conventions/guidelines
- Files should be named consistently
- Filenames should be short but descriptive (<25 characters)
- Use alpha numeric characters when possible
- Use underscores or hyphens instead of spaces
- In general, use lower case characters. Note: exceptions include README files, DOCTYPEs, function constructors (not covered deeply in this course) and a few others.

## Directory structure conventions
### Static websites

    ```
    /index.html
    /css
      /reset.css
      /main.css (or styles.css)
    /js
      /app.js (or index.js)
    /images
      /logo.png
    /README.md
    ```

### Project workspaces
A Git "repo" is really just a fancy folder. It's important that you don't create a repo inside another repo.

In this program, it's recommended you create a dedicated "workspace" folder that will contain a flat list of repos (a.k.a. fancy folders) that you will be creating for lessons and assignments.

Example structure:

    ```
    /repo-1
      /index.html
      /css
        /reset.css
        /main.css (or styles.css)
      /js
        /app.js (or index.js)
      /README.md
    /repo-2
    /repo-3
    /etc
    ```

