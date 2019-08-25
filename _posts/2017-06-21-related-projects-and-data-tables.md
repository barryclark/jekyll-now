---
layout: post
title: Related Projects and Data Tables (v6.4)
description: >
  In Hydejack v6.4 I've added a "Other Projects" section to the bottom of each project page,
  making it easier for users to navigate through your collection and discover other projects.
tags: [hydejack]
---

In this release I've added a "Other Projects" section to the bottom of each project page,
making it easier for users to navigate through your collection and discover other projects.
Also, it's now possible to display larger (data-) tables that were previously cut off (especially on mobile devices).

For more on how to add tables, see the new section in [docs/writing][writing].

Smaller changes include a reduced usage of horizontal lines and a more "semantic" use of `hr` elements.
Specifically, the semantics of the resume layout have been improved.
This is best visualized when viewing the page with a text browser like `w3m`.
For example, before 6.4 the skills section looked like

~~~
Skills

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Web Development | Level: Master

Keywords:

  • HTML
  • CSS
  • Javascript

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Compression | Level: Master

Keywords:

  • Mpeg
  • MP4
  • GIF
~~~

(lots of `hr`s, skill level as part of the headline 😕)

Now it looks like

~~~
Skills

Web Development
    Level: Master
    Keywords:
      □ HTML
      □ CSS
      □ Javascript
Compression
    Level: Master
    Keywords:
      □ Mpeg
      □ MP4
      □ GIF
~~~

(using a `dl`, so that `Level -> "Master"`, `Keywords -> ul`, ...)

There's many more minor changes and fixes that you can read below.

## Patch Notes
### Minor
* Added "Other Projects" section to the bottom of the project layout (similar to "Related Posts")
* Added CSS classes that make viewing larger (data-) tables possible
* Added section on tables to [docs/writing][writing]
* Reduced use of `<hr/>` elements, using CSS borders instead.
* Improved semantic HTML of resume
* Follow favicon best practices and include example icons
* Added `no_google_fonts` option

### Design
* Reduced number of horizontal lines, making many layouts feel less "cluttered" (esp. `blog` layout)
* Made link hover styles consistent across the board
* Visually separated `thead` and `tbody` and `tfoot` within tables.
* Changed RSS and email icons
* Removed top margin for consecutive headings, e.g. when using `h3` immediately after `h2`.

### Fixes
* Fixed bug that caused inline math to be moved to the end of a paragraph when dynamically loading a page.
* Fixed bug that caused layout to break in IE11.
* Fixed bug that caused the project animation to "jump" when using long project titles.
* No more empty attributes on `img` tags.

[writing]: ../docs/7.5.2/writing.md
