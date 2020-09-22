---
layout: post
title: Week 3T - Navigation and Colour
categories: cpnt260
---
## Homework
1. CSS Selectors
    - Skim: [Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators)
    - Skim: [Pseudo-classes and pseudo-elements](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements)
2. Values and Units
    - [em and rem units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#Relative_length_units)
    - [Why you shouldn't set font-sizes using em](https://youtu.be/pautqDqa54I) by Kevin Powell
3. Lists and Links
    - Skim: [Styling lists](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists)
    - Skim: [Styling links](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_links)
4. Colour
    - Watch: [Read color hex codes](https://youtu.be/eqZqx6lRPe0)
    - Read: [On Switching from HEX & RGB to HSL ](https://www.sarasoueidan.com/blog/hex-rgb-to-hsl/) by Sara Soueidan
    - Read: [Color contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast)
5. Flexbox
    - Reference: [`flex` property](https://css-tricks.com/almanac/properties/f/flex/)

## 1. Horizontal Navigation
### Learning Objectives
- Use a combination selector to target elements inside a `nav` element. 
- Remove the default styles of an unordered list.
- Modify links to look like navigation buttons.
- Create a horizontal navigation bar using Flexbox.
- Inspect a Flexbox using Developer Tools (currently Firefox-only?).

Sample Code: [Basic Horizontal Navigation]({{site.baseurl}}/sample-code/frontend/navigation/basic-horizontal)

### Activity: Copy cat nav
You will be working in pairs for this activity.

Search for [hero section examples](https://www.google.com/search?q=hero+section+examples). Find a favourite horizontal navigation design and try to emulate it. You may build off your code from yesterday.

## 2. Pseudo-selectors and HSL
### Learning Objectives
- Change the presentation of a navigation link when the user hovers over it.
- Change the presentation of a navigation link when the user clicks on it.
- Use HSL to ensure navigation text is readable for the above link states.
- Determine contrast ratio of hover and active states using Developer Tools.

Sample Code: [Horizontal Navigation with hover/active/current states]({{site.baseurl}}/sample-code/frontend/navigation/hover-active) 

### Activity: Adding hover/active/current states to your design from this morning
You will be working in pairs for this activity.

Did hero section example you used this morning come with a live demo? 
- If so, try to emulate the hover/active/current states in your copy of the design. 
- If not, come up with your own and integrate them with your design.


## Clean-up Time!
- Submit a link to today's code in Brightspace.
- [Tomorrow]({% link _posts/2020-09-23-cards-typography.md %})