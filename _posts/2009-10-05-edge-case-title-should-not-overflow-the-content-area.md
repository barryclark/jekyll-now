---
layout: post
title: "Antidisestablishmentarianism"
categories:
  - Edge Case
tags:
  - content
  - css
  - edge case
  - html
  - layout
  - title
last_modified_at: 2017-03-09T14:10:02-05:00
---

This post title has a long word that could potentially overflow the content area.

A few things to check for:

  * Non-breaking text in the title should have no adverse effects on layout or functionality.
  * Check the browser window / tab title.

The following CSS property will help you support non-breaking text.

```css
word-wrap: break-word;
```