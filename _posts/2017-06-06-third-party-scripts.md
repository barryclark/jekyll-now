---
layout: post
title: Third Party Scripts (v6.3)
description: >
  Hydejack v6.3 makes including third party plugins easier.
tags: [hydejack]
---

This release makes including third party plugins easier.
Until now, the push state approach to loading new pages has been interfering with embedded `script` tags.
This version changes this by simulating the sequential loading of script tags on a fresh page load.

This approach should work in a majority of cases, but can still cause problems with scripts that can't be added more than once per page.
If an issue can't be resolved, there's now the option to disable push state by setting `disable_push_state: true` in `config.yml`.

## What's happening?
The problem is as follows:
When the browser encounters a `script` tag while parsing a HTML page it will stop (possibly to make a request to fetch
an external script) and then execute the code before continuing parsing the page
(it's easy to how this can make your page really slow, but that's a different topic).

In any case, due of this behavior you can do things like include jQuery,
then run code that depends on jQuery in the next script tag:

~~~html
<script src=".../jquery.js"></script>
<script>
  $('#tabs').someJQueryFunction(); // works
</script>
~~~

I'd consider this an anti-pattern for the reason mentioned above,
but it remains common and has the advantage of being easy to understand.

However, things break when Hydejack dynamically inserts new content into the page.
It works fine for standard markdown content like `p` tags,
but when inserting `script` tags the browser will execute them immediately and in parallel,
because in most cases this is what you'd want.
However, this means that `$('#tabs').someJQueryFunction();` will run while the HTTP request for jQuery is still
in progress --- and we get an error that `$` isn't defined, or similar.

From this description the solution should be obvious: Insert the `script` tags one-by-one,
to simulate how they would get executed if it was a fresh page request.
In fact this is how Hydejack is now handling things (and thanks to rxjs' `concatMap` it was easy to implement),
but unfortunately this is not a magic solution that can fix all problems:

* Some scripts may throw when running on the same page twice
* Some scripts rely on the document's `load` event, which has fired long before the script was inserted
* unkown-unkowns

But what will "magically" solve all third party script problems, is disabling dynamic page loading altogether,
for which there's now an option.
To make this a slightly less bitter pill to swallow,
there's now a CSS-only "intro" animation that looks similar to the dynamic one.
Maybe you won't even notice the difference.

## Patch Notes
### Minor
* Support embedding `script` tags in markdown content
* Add `disable_push_state` option to `_config.yml`
* Add `disable_drawer` option to `_config.yml`
* Rename syntax highlighting file to `syntax.scss`
* Added [chapter on third party scripts][scripts] to documentation

### Design
* Add subtle intro animation
* Rename "Check out X for more" to "See X for more" on welcome\* page
* Replace "»" with "→" in "read more"-type of links

### Fixes
* Fix default color in gem-based theme

[scripts]: ../docs/7.5.2/scripts.md
