---
layout: post
title: Week 3F - Fluid Typography and Font Icons
categories: cpnt260
---
## Homework
1. CSS math functions
    - Read: [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
    - Read: [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)
    - Skim: [`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/min)
    - Skim: [`max()`](https://developer.mozilla.org/en-US/docs/Web/CSS/max)
2. Fluid Typography
    - Skim: [Fluid Typography](https://css-tricks.com/simplified-fluid-typography/) on CSS Tricks
    - Watch: The first 16 minutes of [Beyond Media Queries](https://vimeo.com/235428198) by Michael Riethmuller (you can stop at _Solving Problems with calc()_)
3. Icon fonts and HTML Entities
    - Read: [HTML Entities](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started#Entity_references_Including_special_characters_in_HTML)
    - Reference: [List of XML and HTML character entity references](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references)
    - Read: [Font Awesome - Basic Use](https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use)
    - Advanced: Font Awesome using pseudo-elements
        - Read: The pseudo-elements section of [Pseudo-classes and pseudo-elements](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements)
        - Watch: [Before and After pseudo elements explained](https://youtu.be/zGiirUiWslI)
        - Watch: [Setting up Font Awesome icons as pseudo-elements](https://youtu.be/lMBa7gLWyO4)
4. Dev Life
    - Read: [Writing CSS Algorithms](https://notlaura.com/writing-css-algorithms/)
    - Optional Video: [CSS Algorithms](https://youtu.be/panKf9hzUfQ). This is a lecture Lara does that's based on the above article. She talks about how to write algorithms starting [@21:15](https://youtu.be/panKf9hzUfQ?t=1279).

## 1. Add a presentational icons and HTML entities
### Learning Objectives
- Include Font Awesome Icons into the `head` of an HTML document using a content delivery network (CDN)
- Add a header logo using pseudo-elements and Font Awesome.
- Add a copyright symbol to a footer using 

**Sample Code** 
- See Font Awesome in [Icon Font Sample Code]({{site.baseurl}}/sample-code/frontend/icon-fonts)
- HTML Entities

## 2. Introduction to CSS math functions
### Learning Objectives
- Use `clamp()` to implement fluid typography.
- Optional: Create a fluid typography fallback for `clamp` using `calc()`.

**Sample Code**: [Basic Fluid Typography]({{site.baseurl}}/sample-code/frontend/fluid-typography)

## 3. Open Lab Time
### Learning Objectives
- **Walk-through** your code from this week.
  - What code is not needed? Are there any declarations that serve no purpose, either from a failed solution or redundant functionality?
  - What needs to be optimized?
  - Is the project unfinished? If so, add reminder comments to your code that summarize these objectives for the next time you work on the project. Don't assume your next session will be tomorrow. Projects are often "left on the shelf" for long periods of time between sessions so be descriptive.
- **Optimize**
  - Are there better ways to refactor your CSS to be more efficient/effective based on new knowledge you've gained since you first solved the problem?
  - Find potentially reusable blocks of code that you can use for other projects. Refactor your type selectors into class selectors so that your declarations are more portable. 
  - Separate the re-usable portions of your code into separate files, such as:
    - reset.css - code that you will include in most projects to reset default browser styles;
    - fonts.css - typeface declarations and imports that might be useful for multiple projects;
    - main.css - project-specific code that you have optimized and cleaned-up.