---
layout: projects
title: ChefSteps Concept
permalink: /projects/chefsteps/
---

{::options auto_ids="false" /}

# ChefSteps Concept

<figure>
  <a href="/images/chefsteps-cover.jpg" title="ChefSteps Cover Photo">
    <img src="/images/chefsteps-cover.jpg" alt="ChefSteps Cover Photo">
  </a>
</figure>

<span class="large-cap">C</span>hefSteps is fantastic. They're a food and technology company that aims to make people better cooks by cooking smarter. They don't tell you what to do, they show you via online classes and beautiful videos made available to the public. ChefSteps is also in the mobile apps business supporting both iOS and Android. I've tried the Android app for some time and noticed some usability issues. I decided to resolve those issues and propose a new direction for the app!

**The Problem:** The ChefSteps Android app has some issues in the user experience that need ironing out: specifically the navigation, the use of iOS-like UI elements, and the lack of general direction and purpose behind the app.

**The Solution:** Defining and understanding the purpose of the ChefSteps app will help guide all major UX and UI design decisions.

1. Discovery
2. Define
3. 10X Thinking (THINK BIG)
4. Prototype

This was the design process I used for this exercise. I first learned of this process from one of my favorite YouTubers: <a href="https://www.youtube.com/user/DevTipsForDesigners">Travis Neilson (DevTips)</a> – an interaction designer at Google. Seriously, watch him. He's awesome.

## Discovery
The first step in this design process was identifying the problems and pain points.

<figure class="full">
  <a href="/images/chefsteps-current-android.png"  title="ChefSteps Current Android App">
    <img src="/images/chefsteps-current-android.png" alt="ChefSteps Current Android App">
  </a>
</figure>

<p class="caption">
  Current ChefSteps Android app
</p>

This is what the current ChefSteps Android app looks like. Aesthetically, it's very clean. However, I can't help but feel like this app was designed for an iPhone. The search bar in the first two screens, the share button in the last three, and the center aligned screen titles all are reminiscent of iOS. The UI doesn't feel native.

<!-- <figure class="full">
  <video autoplay width="360" height="640">
    <source src="/images/chefsteps-menu-current.mp4" type="video/mp4">
    Your browser doesn't support HTML5 videos.
  </video>
</figure> -->

I thought the navigation could be improved. Currently the navigation is accessed by tapping the hamburger menu button in the top left corner. Once tapped, the small menu drawer will slide up from the bottom to cover roughly 1/3rd of the screen (visible in screen 2). This menu contains two links that don't really serve much of a purpose: **Recipes** and **About**. Tapping **Recipes** actually does nothing because it's actually the home page but there's no indication of that. **About** doesn't really give the user too much information. Users probably wouldn't download this app if they had no idea what or who ChefSteps was.

## Define
In the discovery phase I identified some UI flaws and a navigation that I felt could be improved. These changes are only surface level. When I asked myself, *"What does success look like?"* I found that my surface level modifications don't really make the app more successful. I started thinking about the fundamentals of the app.

*"Why are people using this app and who is using it?"* What makes ChefSteps awesome is the exciting innovative recipes, discoverability of new food, learning new techniques in the kitchen, and being able to apply knowledge into delicious and well composed dishes. Until the app does all of those things, I don't think success has been reached. _**Side Note:** If this app was designed to be an extension of the website and not an actual alternative, then success should be defined differently. But, in this mobile age, I really think ChefSteps would benefit from a full featured application._

## 10X Brainstorming
How far can I stretch my mind? 10X thinking is used to garner creativity. The point is to have wild and crazy ideas and not be limited by constraints. It's better to have ten bad ideas than one good one. Through brainstorming and some refinement I came up with a feasible list of ideas and features:

* Recipe "cards" feel more tangible
* A bookmarking (save for later) system
* Tell users how long the recipe takes before accessing
* Create an empty search state that gives users search ideas
* Add a sorting system (most favorited, relevant, most views, etc.)
* Frequently updated "featured" recipes on the home page
* Classes
* Logging into your account (see bookmarks, currently enrolled classes, leave reviews)

## Prototype
This is the final step of this creative process and it means exactly what it says. We've discovered the problems, defined them and what we need to make the product successful, considered every crazy idea under the sun, and now it's time to make them into reality. I first started with low fidelity sketches then translated those into higher fidelity visual layouts using Sketch.

<figure>
  <a href="/images/chefsteps-sketches.png"  title="ChefSteps Low-Fidelity Sketches">
    <img src="/images/chefsteps-sketches.png" alt="ChefSteps Low-Fidelity Sketches">
  </a>
</figure>

<p class="caption">
  Low-Fidelity Sketches
</p>

<figure>
  <a href="/images/chefsteps-redesigned-screens.png"  title="ChefSteps Redesigned Screens">
    <img src="/images/chefsteps-redesigned-screens.png" alt="ChefSteps Redesigned Screens">
  </a>
</figure>

<p class="caption">
  Redesigned Visual Layout
</p>

## Conclusion
This was the first project in which I have implemented this creative process of discovery, define, brainstorm, and prototype. Without this kind of framework or structure thinking I would've gone in circles only making UI tweaks and not identifying and solving actual problems. This was a fun week-long project that shows the progression of my skill and development as a user experience designer – especially when compared to my old work.

<!-- <section class="change-case clearfix">
<div id="prev">
  <div class="case-wrapper">
    <div class="prev-wrapper clearfix">
      <a href="/work/splitwise" title="Previous Project">
        <p>Splitwise Redesign</p>
        <p class="change-case-txt">Previous Project</p>
      </a>
    </div>
  </div>
</div>

<div id="push"></div>

<div id="next">
	<div class="case-wrapper">
		<div class="next-wrapper clearfix">
      <a href="/work/pavilion">
        <p>Pavilion</p>
				<p class="change-case-txt">Next Project</p>
			</a>
		</div>
	</div>
</div>
</section> -->

<!-- <div class="to-top-container elevator">
<div class="to-top-btn">
  <img src="/images/cd-top-arrow.svg" alt="" />
</div>
</div> -->
