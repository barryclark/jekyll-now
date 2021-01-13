---
layout: post
title: Week 5W - Vector Editors
categories: cpnt201
---
## Homework
1. Prep
    1. Go to Tony's [Band Name Generator](https://acidtone.github.io/namor/) and click for a new combination of words until you find a new product that a startup (either yours or a potential client) might think is the "next big thing".
    2. Based on the phrase you've chosen, find one or more [Font Awesome](https://fontawesome.com/) icons (or similar) that you can use to create a quick company/product logo for your startup.
        - Example: [Tony's Browser Therapy Logo](https://sait-wbdv.github.io/sample-code/assets/images/logos/browser-therapy.svg)
    3. Download the SVG versions of your icons so you can import them into Figma for the lesson.
2. Figma
    - Reference: [Figma Tutorial Video Playlist](https://www.youtube.com/playlist?list=PLXDU_eVOJTx7QHLShNqIXL1Cgbxj7HlN4)
        - Watch: [Setup account, teams, projects, and files](https://youtu.be/hrHL2VLMl7g)
            - Create a free account and set up a Team.
        - Watch: [Get a tour of the Editor](https://youtu.be/DSrbwCrEIII)
        - Watch: Any other videos in this playlist that interest you.
    - Watch: [Figma Drawing Tools Overview](https://webdesign.tutsplus.com/courses/using-figma-for-svg-design/lessons/drawing-tools-overview)
    - [https://medium.com/@saintasia/5-of-your-favorite-illustrator-tools-in-figma-a7c2aaa45d59](https://medium.com/@saintasia/5-of-your-favorite-illustrator-tools-in-figma-a7c2aaa45d59)

## Terminology

> The shortest distance between two points...

<dl>
  <dt>Vector Graphics</dt>
  <dd>Instead of being defined in pixels like raster images, vector graphics are defined with math like fonts (and icon fonts). This means that vector images always look sharp because the browser can re-draw it at any size and they are usually a much smaller file size than images defined with pixels.</dd>
  <dt>Anchor Point</dt>
  <dd>A single point located on a page/artboard/viewport that a path can pass through.</dd>
  <dt>Path</dt>
  <dd>A straight or curved line that connects two anchor points.</dd>
  <dt>Closed Shape</dt>
  <dd>A shape that is enclosed from all sides, end-to-end, forming a figure with no openings. Examples: circle, triangle, square, polygon, etc.</dd>
  <dt>Fill</dt>
  <dd>The SVG version of <code>background-color</code>.</dd>
  <dt>Stroke</dt>
  <dd>The SVG version of <code>border</code>.</dd>
</dl> 

---

## Scenarios
### 1. Project/Company Logo
You have a startup company (either yours or a client) that needs a quick and dirty SVG logo for a weekend hackathon. No one on the team is a graphic designer so you decide to create a logo using open source icons and Figma.

### 2. Paired web development contract
You and a classmate/friend/colleague pair up on a web development project. 
- One of you will:
  - handle the client; 
  - manage the assets;
  - create graphics and mockups; 
- The other will:
  - convert the client-approved mockups to HTML/CSS/JS
  - setup and manage Git/GH and deployment to GH Pages

---

## Vector basics
1. A quick(ish) tour of the basic tools you'd find in any vector editor.
    - File menu
    - Artboards/Frames
    - Tools pallette
      - Selection
      - Shapes
      - Pen
      - Text
      - Move
      - Fill/Stroke
    - Masks
    - Pathfinder
2. Demo: Trace an image
3. Demo: Pathfinder

## Quality of Life Tips
- Hotkeys!
  - See Activites below for finding a hotkey cheat sheet for Figma.
    - [Tony's current fave cheat sheet](https://usethekeyboard.com/figma/)
  - Tony's Top 5 vector editor shortcuts:
    1. `space` + _drag_: Pan the screen
    2. `command`/`control?`: Toggle selection tool
    3. `shift` + _drag_: Proportional re-sizing and equal `x`/`y` dimensions when creating shapes
    4. `alt`/`option` + _drag_: Re-size from the object's centre (instead of default from top-left)
    5. `alt`/`option` when in Pen mode: Toggles from pen to anchor tool. Very handy!

## Sample files
- [Logos Tony has made](https://github.com/sait-wbdv/sample-code/tree/master/assets/images/logos)
- [Tony's pinball diagrams](https://github.com/sait-wbdv/sample-code/tree/master/assets/images/pinball)

---

## Activity 1: Build a library of personal Figma resources
- References
  - Search: "[figma tools cheat sheet](https://www.google.com/search?q=figma+tools+cheat+sheet)"
- Learning
  - Search: "[figma tools tutorial](https://www.google.com/search?q=figma+tools+tutorial)"
  - Search: "[figma exercises](https://www.google.com/search?q=figma+tools+exercises)"
- Cheating
  - Search: "[figma components](https://www.google.com/search?q=figma+components)"
  - Search: "[figma templates](https://www.google.com/search?q=figma+templates)"
  - Explore: [Best design resources websites every developer should bookmark](https://dev.to/theme_selection/best-design-resources-websites-every-developer-should-bookmark-1p5d) by ThemeSelection
    - [Video version](https://youtu.be/fAK9NxsR3es) by Adrian Twarog

---

## Activity 2: Pen Tool Pracice
1. Place an image in a new Frame/Artboard.
2. Lock the image in place. 
    - Possible to lighten/fade the image?
3. Using the Pen Tool, trace a closed path around an object.
    - Don't forget Tony's #5 shortcut!
4. Unlock the image and try masking it with your new path.

---

## Activity 3: Build webpage components
- Try following these [Morioh Design Exercises](https://morioh.com/p/a96eb2ef43be).
- [Add Font Awesome icons to text](https://help.figma.com/hc/en-us/articles/360040449513-Add-icons-to-text-layers-with-icon-fonts)

---

## Activity 4: Team card
Try re-building the Assignment 2 Team Card in Figma. Oooooor try building a new card, hero section, navigation, etc.

---

## Activity 5: Paired collaboration in Figma
The free plan on Figma (apparently) allows two people to edit the same document. 
- Try completing any of the above activities in pairs.
- Further explore the collaboration tools in Figma.

---

## Clean-up Time!
- [Tomorrow]({% link _posts/2020-10-08-svg-fundamentals.md %})