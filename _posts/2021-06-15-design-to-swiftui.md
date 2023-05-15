---
layout: post
title: Design to SwiftUI
titledesc: SwiftUI to Design
author: dactrtr
feature: https://i.giphy.com/media/jkSvCVEXWlOla/source.gif
lang: eng
---

# Design to SwiftUI

---

**disclaimer:** _this is a work in progress, soon I'll move each one of this to their own "project" and keep them in different repos_ or never do it.

---

## The Idea

With the release of **SwiftUI**, and after tinkering with _Storyboards_ and _UIKit_, the Apple interface development seemed to get to a point where it's easy enough to **grasp for a designer** and "code enough" to be embraced as a valid workflow for design-developing (I'm learning _Swift_ now to be even more into the develop side).

This blog post it's a little **showroom** of a few projects I've been _replicating from Dribbble into SwiftUI_. The oldest projects are actually broken, those were coded into _playgrounds for iPad_ and in a update they broke somehow, and the error handling at the moment in playgrounds is very basic.

## The projects

---

### Fintech

Original design: [Fintech Dark Theme](https://dribbble.com/shots/15668611-Fintech-Dark-Theme)

<video width="320" height="auto" controls>
    <source src="https://cdn.dribbble.com/users/332219/screenshots/15668611/media/8ce3dbec9f3cf51e82974e23c9fc4833.mp4">
</video>

SwiftUI: [Github repo](https://github.com/dactrtr/Fintech)

<video width="320" height="auto" controls>
    <source src="https://i.imgur.com/3zyQkGM.mp4">
</video>

The main goal of this view, and this front, was managing the "_view inside of a view_" for achieving this I took some design choices, mainly cuz I did want to _bloat_ the project with images, even the icons and some images aren't the same, you _get the idea_ and flow of the view.

---

### Finance App

Original design: [Finance App](https://dribbble.com/shots/15162092-Finance-App-Visual-Exploration)

<figure class="figimg">
   <img src="https://cdn.dribbble.com/users/1212733/screenshots/15162092/media/0af4dfcdfeeb2fcc7bdf3f90fc5be192.png" alt="Finance app UI design">
</figure>

SwiftUI: [Github repo](https://github.com/dactrtr/financeApp)

<figure class="figimg">
   <img src="https://i.imgur.com/2wTzdUJ.jpg" alt="Finance app UI design">
<figcaption>
Yes, that's actually my wallpaper
</figcaption>
</figure>

This time the challenge was **catch up with new modifiers and views**, also came back to SwiftUI, cuz I was a little busy at work, so more than a nice interaction it's just a nice UI.

---

### Team Management

Original design: [Team Management](https://dribbble.com/shots/13623650-Team-Management-App-Interaction)

<video width="320" height="auto" controls>
    <source src="https://cdn.dribbble.com/users/345970/screenshots/13623650/media/bf2782d9ef9a9130c8c3179cf9691a9a.mp4">
</video>

SwiftUI: [Github repo](https://github.com/dactrtr/TeamManagement)

<video width="320" height="auto" controls>
    <source src="https://i.imgur.com/G4vr9oI.mp4">
</video>

The main goal of this view, was to achieve a complex _full size view_, and manage a little _data model_.

---

### Clean Bank UI [BROKEN]

Original design: [Clean Bank UI](https://dribbble.com/shots/12310592-Clean-Bank-UI)

<video width="320" height="auto" controls>
    <source src="https://cdn.dribbble.com/users/32512/screenshots/12310592/media/2bc9ff5d134acf75fe6378093f3e2b47.mp4">
</video>

SwiftUI: [Github repo](https://github.com/dactrtr/Design-to-Swift)

<video width="320" height="auto" controls>
    <source src="https://i.imgur.com/350e0BG.mp4">
</video>

In this project I manage to recreate a **complex UI in Playgrounds for iPad**, you will have to believe it worked, cuz the code broke in a update from playgrounds for mac, since the error catching isn't so good, _I have no idea what's broken_.

---

### Lekan Menu[BROKEN]

Original design: [Lekan Menu](https://twitter.com/lalaekan/status/1285923482195419136)

<video width="320" height="auto" controls>
    <source src="https://i.imgur.com/g1I0FS7.mp4">
</video>

SwiftUI: [Github repo](https://github.com/dactrtr/Design-to-Swift)

<video width="320" height="auto" controls>
    <source src="https://i.imgur.com/wbX9tFG.mp4">
</video>

_The first one in the series_, the idea was to manage a **delay animation**, did it with some weird boolean management, then realized the proper way was using the **animation modifier**.

---
