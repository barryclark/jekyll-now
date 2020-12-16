---
layout: page
title: "CSS Variables"
---

## Step-by-Step: Generating a random colour with JS and CSS Variables
1. CSS: Create a CSS Variable with a default value:

    ```css
    :root {
      --hue: 180;
    }
    ```

2. Use `--hue` to add colour with `hsl()`:

    ```css
    body {
      background-color: hsl(var(--hue), 100%, 50%);
    }
    ```

3. JS: Generate a random number from 0-360 (your new hue angle):

    ```js
    const randHue = Math.floor(Math.random() * Math.floor(360));
    ```

4. Set the value of your CSS variable to this random hue angle:

    ```js
    document.documentElement.style.setProperty('--hue', randHue);
    ```

    Note: `document.documentElement` is a shortcut to using `document.querySelector(':root')`.

5. Level Up: Try using this same hue angle to rotate an element!

## Resources
- Documentation
  - MDN: [Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
    - [CSS Variables and Javascript](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#Values_in_JavaScript)
- [Tony's experiements and projects](https://acidtone.github.io/css-variables/)
- [Secrets of CSS Variables](https://youtu.be/kZOJCVvyF-4) by Lea Verou
  - [Takeaway #1: CSS variables work like normal CSS properties](https://youtu.be/kZOJCVvyF-4?t=60)
  - [Takeaway #2: CSS variables are inherited properties (but you can change that)](https://youtu.be/kZOJCVvyF-4?t=351)
  - [Takeaway #3: CSS variables + url() = poop](https://youtu.be/kZOJCVvyF-4?t=437)
  - [Takeaway #4: Invalid at computed-value time = initial](https://youtu.be/kZOJCVvyF-4?t=685)
  - [Takeaway #5: Cycles make variables invalid at computed-value time](https://youtu.be/kZOJCVvyF-4?t=923)
  - [Takeaway #6: Use variables for pure data, not CSS values](https://youtu.be/kZOJCVvyF-4?t=1035)
  - [Takeaway #7: CSS variables + animations = poop](https://youtu.be/kZOJCVvyF-4?t=1532)
  - [Takeaway #8: CSS variables enable theming independent of CSS structure](https://youtu.be/kZOJCVvyF-4?t=1855)
  - [Takeaway #9: Default default values are possible](https://youtu.be/kZOJCVvyF-4?t=2079)
  - [Takeaway #10: CSS variables make responsive design easier](https://youtu.be/kZOJCVvyF-4?t=2200)
  - [Takeaway #11: CSS variables enable you to set multiple properties at once](https://youtu.be/kZOJCVvyF-4?t=2259)
  - [Takeaway #12: CSS variables let you create single property mixins (like function carrying, in programmerese)](https://youtu.be/kZOJCVvyF-4?t=2366)
  - [Takeaway #13: CSS variables enable you to define your own longhand properties](https://youtu.be/kZOJCVvyF-4?t=2539)
  - [Takeaway #14: CSS variables + SVG = love](https://youtu.be/kZOJCVvyF-4?t=2607)
  - [Takeaway #15: CSS variables are a revolution for separation of style and behaviour](https://youtu.be/kZOJCVvyF-4?t=2690)
- Advanced CSS with Kevin Powell
  - [An Introduction to CSS Variables](https://youtu.be/PHO6TBq_auI)
  - [Using CSS Variables in the real world and a cool trick](https://youtu.be/V9yP0QG0NWI)
  - [CSS vs Sass - variables inside media queries](https://youtu.be/19e7_3UmQrI)
  - [CSS Variables and Browser Fallbacks](https://youtu.be/kCmL-O2T7DY)
  - [Sass to the rescue for fallbacks](https://youtu.be/wI80oS3KLxY)
  - [Manipulating CSS Variables with JavaScript](https://youtu.be/cZ0yt67A7OM)
