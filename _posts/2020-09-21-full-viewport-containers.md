---
layout: post
title: Week 3M - Full Viewport Containers
categories: cpnt260
---
## Homework
- Read: [Document and Website Structure](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- Read: [Backgrounds and Borders](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders)
- Skim: [Linear Gradients](https://css-tricks.com/css3-gradients/)
- Watch: [Introduction to Viewport Units](https://youtu.be/_sgF8I-Q1Gs)
- Read: [Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- Play: [Flexbox Froggy](https://flexboxfroggy.com/)
- Play: [Flexbox Zombies](https://geddski.teachable.com/p/flexbox-zombies)

## 1. Centering elements in the viewport
### Learning Objectives
- Wrap web page content in a semantic container.
- Create a full viewport container using viewport units.
- Center an element in the viewport using flexbox.

### Terminology
- See: 
  - [Flexbox Basics and Terminology](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-basics) in the Complete Guide to Flexbox
  - [What are Viewport Units](https://css-tricks.com/fun-viewport-units/#what-are-viewport-units)

See Objective 1 in the [Tissue Illusion Coding Challenge](http://browsertherapy.com/challenges/tissue-contrast/)

### Activity: Center a Puppy in the Viewport
Using this [Puppy Card starter code](https://codepen.io/browsertherapy/pen/mdPWXZb):
1. Fork this Pen into your account or copy the code into your own HTML page.
2. _Wrap_ a `main` element around the `figure` element of the card.
3. Create a full viewport container by setting the height of the `main` element to `100vh`.
4. Centre the `figure` inside the container using Flexbox, `justify-content` and `align-items`.
5. Is there another way to centre this card in the viewport?

## 2. Hero Sections
### Learning Objectives
- Create a full viewport hero section using `header` and CSS images.
- Overlap a readable heading over a hero image using Flexbox, `background-position` and `linear-gradient()`.

See Objective 2 in the [Tissue Illusion Coding Challenge](http://browsertherapy.com/challenges/tissue-contrast/)

### Activity: Create a readable hero heading
Locate the long-form content you marked up last class (if you don't have any, you can use [this sample content](https://codepen.io/browsertherapy/pen/vYGQKqv)). Let's add a hero section to it.
1. _Wrap_ the long-form content in a `main` element.
2. Add a `header` element above the `main` container.
3. Add a `h1` heading inside the `header` containing body text of you choice.
4. Create a full viewport container by setting the `min-height` of the `header` element to `100vh`.
5. Use the following properties (and [Lorem Picsum](https://picsum.photos/)) to add a background image to your `header` section:
    - `background-image`
    - `background-size`
    - `background-position`
6. Using Flexbox, position (with `color` and/or `linear-gradient()`) your text on the background image so that the text is readable.

### Stretch Activity
Try to reproduce one or more of the hero sections showcased in this article: [The power of hero image design: 35 striking case studies to inspire your own](https://www.canva.com/learn/hero-images/).

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-09-22-navigation-colour.md %})