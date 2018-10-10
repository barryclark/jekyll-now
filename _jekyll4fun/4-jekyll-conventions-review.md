---
title: Recap on Jekyll Conventions
slug: recap-jekyll-conventions
chapter: 4
---
Congratulations! You now have a blog up and running (or on your way)

Let's take a pause to take a look at Jekyll's conventions.

## Project Structure

+ Everything processed ends up in the _site directory
+ Copied Directly \\
    + Files without Front Matter
    + Directories without "_" underscore prefix
+ Transformed
    + Directories with "_" prefix
    + Files without Front Matter

__Quiz:__ Where can you tell Jekyll what to ignore explicitly? \\
*Hint:* We worked with this file in step 2...

## Working with Variables

+ YAML is the standard for declaring most variables.
+ There is a large collection of [Standard Variables]().
+ Template variables are resolved through Front Matter.
+ You can default many through _confg.yml.

### Template Variables Have Scopes

| site | + Everything from _config.yml |
| page | + Everything everything in a page files front matter |
| layout | + Layout front matter |
| include | + Include front matter, or passed in at point of include |
| data | optional data only files yml, json, or csv |

## File Types

| Pages | .html, .md | content, pages, collection items |
| Layouts | .html | _layouts | content containers, structural view |
| Includes | .html | _includes | reusable fragments across layouts or pages |
| Data | .yml, .csv, .json| Properties, Configuration, Lists |
| Styles | .sass  | source files for CSS |
| Assets | images, video, pdf ... | Jekyll happily serves any file type |
| Collections | .md | see these in action next lesson |

### References and further reading
* [Build A Blog With Jekyll And GitHub Pages](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)
* [Blogging Like a Hacker](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html)
