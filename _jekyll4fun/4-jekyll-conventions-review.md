---
title: Recap on Jekyll Conventions
slug: recap-jekyll-conventions
chapter: 4
links:
  - https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/
  - http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html
---
Congratulations! You now have a blog up and running (or on your way)

Let's take a pause to take a look at Jekyll's conventions.

## Project Structure

+ Jekyll outputs into a  __site_ directory
+ Simply copied over
    + Files without Front Matter
    + Directories without "_" underscore prefix
+ Read / Processed by Jekyll
    + Directories with "_" prefix
    + Files with Front Matter

<details>
  <summary>
<strong>Quiz:</strong> Where can you tell Jekyll to ignore specific files?
<br/>
<em>Hint:* We worked with this file in step 2</em>
  </summary>
  <strong>_config.yml</strong>
</details>

## File Types

| Pages, Collections | .html, .md | *_posts* (e.g.)| content, pages, collection items |
| Layouts | .html | *_layouts* | content containers, structural view |
| Includes | .html | *_includes* | reusable fragments across layouts or pages |
| Data | .yml, .csv, .json|  *_data* | Properties, Configuration, Lists |
| Styles | .sass  | *_sass* | source files for CSS |
| Assets | images, video, pdf ... | _any_ | Jekyll happily serves any file type |

## Variables

+ YAML is the standard for declaring most variables.
+ There is a large collection of [Standard Variables]().

### Template Variables Have Scopes
| page | File's Front Matter |
| site | Everything in _config.yml |
| layout | Layout file's front matter |
| include | Include's front matter OR provided at point of include |
| data | _data collection files (yml, json, csv) |

<details>
<summary><strong>Puzzle:</strong> What is the priority of the scopes?
<br/> What if you have a property in both a layout AND a page?
</summary>
<strong>Page</strong> overrides <strong>Layout</strong> overrides <strong>Site</strong>
</details>
