---
layout: page
title: "Responsive Fundamentals"
---

See: [The building blocks of responsive design](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/responsive_design_building_blocks)

## Readable Text
Readable text is a balance of the following fundamental characteristics of typography:
- [Font size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) 
  - The base font size is often declared in `px` units on the parent `body` element. 
  - Derivative font sizes (such as for headings, navigation, etc) are usually declared on their respective elements (`h1`, `nav`, etc) in either `em` or `rem` units.
  - The default font size in most browsers is `16px`.
- [Line height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)
  - Line height greatly depends on a lot of factors such as:
    - The font family being used;
    - Font size and line length;
    - The contrast ratio of the text to its background.
  - The default is usually 1.2. 
- Line length
  - Max line length for print: 95 [characters](https://css-tricks.com/the-lengths-of-css/#ch)
  - Max line length for web: 75-85 characters
  - Min (multi)line length for web: ~20 characters

