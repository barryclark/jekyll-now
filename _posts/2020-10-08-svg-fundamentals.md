---
layout: post
title: Week 5R - SVG Fundamentals
categories: cpnt201
---
## Housekeeping
- Prep for Javasript
  - New Library entries
  - Tuesday: Node installed
- Figma bounties!
  - 5 bonus points to be applied to CPNT 201 Assignment 3. Congratulations to the weiners:
    - Mike
    - Nana
    - Lynn

## Homework
1. Review
    - [Anchor element: Linking to an element on the same page](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page)
2. Scalable Vector Graphics
    - Watch: [A beginners guide to SVG: Part 1](https://youtu.be/ZJSCl6XEdP8) by Kevin Powell. You can skip Part 2 but watch [Part 3](https://youtu.be/TBYJ2V1jAlA) if you're interested.
3. Optimizing SVG
    - Tool: [SVG OMG](https://jakearchibald.github.io/svgomg/)
    - Watch: [How to Optimize SVGs from your editor](https://youtu.be/cWh0de8IhX4?t=1184) by Kevin Powell (about 19 minutes into a longer video)
    - Advanced: [Understanding and Manually Improving SVG Optimization](https://css-tricks.com/understanding-and-manually-improving-svg-optimization/)
3. SVG in HTML Documents
    - Read: [Using SVG](https://css-tricks.com/using-svg/) on CSS-Tricks
    - Read: [How to Scale SVG](https://css-tricks.com/scale-svg/)
    - [How to Work with SVGs in Figma, HTML, and CSS](https://youtu.be/R0oz8DsxeYU) by Build UX
    - Optional (but fun): [SVG Can Do That?!](https://youtu.be/ADXX4fmWHbo) by Sarah Drasner   

---

See [SVG Terminology](https://sait-wbdv.github.io/sample-code/frontend/svg/#terminology)

---

## Key Takeaways
- `xmlns` is needed if you want to support non-HTML5 browsers (we probably do) or XML parsers (we probably don't).
- `viewBox` is the key to a properly responsive SVG. While the values are often pixel-based, the values of this attribute really set the aspect ratio and provide a reference grid for the rest of the `svg` objects to map to.
  - _Note_: none of the graphics contained inside an `svg` will be viewable outside the `viewBox`.
- `preserveAspectRatio` can be set to `none` if you don't want the browser to respect the aspect ratio set by the `viewBox`. Otherwise, the browser will try its best to not violate the aspect ratio. 
- `width` and `height` attributes set an optional default size for the `svg` that can be overridden with CSS.
- `svg` is its own specification with its own style properties. Although you can style them with CSS, you need to use the proper `svg` properties. For example, use `fill` instead of `background-color`.
- A lower precision will result in a smaller file size but very low values might affect the detail of your designs.

---

## 1. Anatomy of an optimized SVG
See [Activity 1](https://sait-wbdv.github.io/sample-code/frontend/svg/#activity-1-svg-anatomy)

---

## 2. Placing SVGs into an HTML page
See [Activity 2](https://sait-wbdv.github.io/sample-code/frontend/svg/#activity-2-svg-in-html)

---

## 3. Styling inline SVGs around a colour theme
See [Activity 3](https://sait-wbdv.github.io/sample-code/frontend/svg/#activity-3-themed-svgs)

---

## Open Lab Time

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-09-hello-dobby.md %})