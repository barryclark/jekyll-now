---
title: Defining Your Includes
slug: looking-at-includes
chapter: 11
---
Now to take a longer look at working with Jekyll Theme features.

#### Theme and Style Concepts

| Layouts | .html | *_layouts* | content containers, structural view |
| *Includes* | .html | *_includes* | reusable fragments across layouts or pages |
| Styles | .sass  | *_sass* | source files for CSS |
| Assets | images, video, pdf ... | _any_ | Jekyll happily serves any file type |

Includes can process any fragment, html, markdown or liquid.
The following Liquid brings in the include:

```
{% include meta.html %}
```

And this Liquid passes variables into the _include_ scope.

```
{% include meta.html myvar="12345" myitem=assignedvar %}
```
*Note:* includes you specify file _with_ extension.

Open up the *_includes* directory and examine these files.

## meta.html

* what is this doing?
* what variable scopes does it reference?
* what layout references this?

## analytics.html

* A common use of includes: declaring javascript.

## Notes on using includes

* source must be placed in _includes directory.
* No Front Matter
