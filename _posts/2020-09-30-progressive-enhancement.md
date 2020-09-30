---
layout: post
title: Week 4W - Progressive Enhancement
categories: cpnt260
---
## Housekeeping
- HTML Images and Web forms links
- Exam time for tomorrow
- Exam will cover:
  - Any readings given for homework
  - FireFox Dev Tools
  - [Can I Use?](https://caniuse.com/)
- Lecture for tomorrow?
- Prep for [Friday]({% link _posts/2020-10-02-raster-image-optimization.md %}): Images!
- [Final Project]({{site.baseurl}}/assessments/cpnt260/final)

## Homework
1. Pre-requisites
    - Read: [CSS Cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade) on MDN
    - Read: [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) on MDN
    - Optional: [Specifics on CSS Specificity](https://css-tricks.com/specifics-on-css-specificity/) on CSS Tricks
2. Progressive Enhancement
    - Read: A definition of [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) on MDN
    - Watch: [7-Part Series - Resilient CSS](https://www.youtube.com/playlist?list=PLbSquHt1VCf1kpv9WRGMCA9_Nn4vCLZ9Y) by Jenn Simmons
3. Feature detection
    - Read: The `@supports` section of [Feature Detection](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection#supports)
4. Reference:
    - [Specificity Calculator](https://specificity.keegan.st/)

## 1. CSS Overrides
Objective: To understand the concept of CSS overides, and be able to progressively enhance a hero section for browsers that don't support viewport units.

**Sample Code and Activities**: [Progressive Enhancement Examples]({{site.baseurl}}/sample-code/frontend/progressive-enhancement/)

## 2. Feature Detection
Objective: To understand what the concept of feature detection is, and be able to implement suitable solutions in CSS.

This will be a live code session with Progressive Enhancement Example 4, above.

## Activity: The future, future, future...
1. Find a new(ish) CSS property (not covered in class today) that interests you. Examples:
    - Search: "[new css properties 2020](https://www.google.com/search?q=new+css+properties+2020)"
    - [CSS blend modes](https://css-tricks.com/basics-css-blend-modes/)
    - [`filter` property](https://css-tricks.com/almanac/properties/f/filter/)
    - [masking with text](https://css-tricks.com/how-to-do-knockout-text/)
    - [`initial-letter`](https://css-tricks.com/almanac/properties/i/initial-letter/)
2. Investigate its current browser support.
3. Create a demo of this property.
4. Using what you've learned about CSS overrides and feature detection, can you refactor this project to be at least useable in non-supported browsers?

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-01-review-final-exam.md %})