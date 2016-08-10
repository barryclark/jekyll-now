---
layout: projects
title: Global Thinking Site Redesign
permalink: /projects/globalthinking/
---

{::options auto_ids="false" /}

# Global Thinking Site Refresh

<span class="large-cap">D</span>uring the summer and fall semesters of 2014, I was employed as a co-op by Global Thinking, an awesome creative agency in Washington DC. My major project was to refresh the entire company site. I was the sole developer of this project working cooperatively with one of Global's designers and project managers. For comparison, the image below shows [globalthinking.com](http://globalthinking.com) before the refresh:

<figure>
  <img src="/images/gtsite_old.jpg" alt="Old Globalthinking Site">
</figure>

<p class="caption">Initial home page completion: </p>

<figure>
  <img src="/images/gtsite_new.jpg" alt="Old Globalthinking Site">
</figure>

Taken right from the fantastic [Smashing Magazine](http://www.smashingmagazine.com/2013/07/this-is-how-we-built-it-case-studies/), these “This is How We Built it” posts often span many categories:

1. <a href="#logo">Illustration, Graphics and Logo Design</a>
2. <a href="#typography">Typography</a>
3. <a href="#usability">Usability</a>
4. <span><a href="#advertising">Advertising, Promotion and E-Commerce</a></span>
5. <span><a href="#">Redesigning Elements and Features</a></span>
6. <span><a href="#">Complete Rebranding and Redesign</a></span>
7. <a href="#content-storytelling">Content and Storytelling</a>
8. <a href="#tech-challenges-solutions">Technical Challenges and Solutions</a>
9. <a href="#workflow-optimization">Workflow and Optimization</a>

I'm going to attempt to cover these topics as best I remember. I haven’t touched the site in several months!

<h2 id="logo">Illustration, Graphics and Logo Design</h2>

The first thing you notice on the old GT site which you can visit by going [here](http://web.archive.org/web/20140208233300/http://www.globalthinking.com/) is the illustrated logo and the sort of “in your face” images made possible by the skeuomorphism trend at the time. Global Thinking, a digital experience agency tends to stick with the current trends in design and development. Images on the new site are  still big and bold, but reserved at the same time. Images are now used to give each page a unique identifier. They give you insight as to what content follows. The GT box logo and all other illustration has been nixed to really give this site a modern and premium feel.

<figure>
  <img src="/images/gtlogo_old.jpg" alt="Old Global Thinking Logo">
</figure>

<h2 id="typography">Typography</h2>

Global Thinking wants visitors to actually read the content on the site. This starts with choosing fonts wisely. Without a graphical logo, the company name needs to be easily distinguished and identifiable. People remember images more than they do fonts. We decided to go with Oswald, a font not really meant for reading but rather looking cool. It almost looks stretched and elongated.

Headings need to be big, bold, attractive, and catchy. We decided to go with Montserrat. Not to digress too heavily but the inspiration for the creation of Montserrat is quite interesting. Julieta Ulanovsky was inspired by "the old posters and signs in the traditional neighborhood of Buenos Aires called Montserrat." She wanted to "design a typeface that rescues the beauty of urban typography from the first half of the twentieth century."

All content was written in Droid Serif. Sans fonts are technically more legible on the web and serif was created for print. Serif fonts however give you the feeling you’re reading print — we find that it really allows for content to be king.

<figure>
  <img src="/images/gt_vhc.jpg" alt="Old Global Thinking Logo">
</figure>

<h2 id="usability">Usability</h2>

Making sites usable is much easier said than done. Their are several things to look out for: people with different sized devices, old or new browsers, colorblindness, screen readers, orientation, responsiveness, speed, the list goes on.. Usability concerns were the reason this site took so long to refresh! It was imperative for our users to easily be able to find what they were looking for on our site. It was imperative for them to be able to contact us, locate us, and learn about us. That is why our site is backwards compatible up to IE8 (that was rough), responsive and adaptive, fairly quick in speed given the large images and amount of content per page, and looks good in any orientation you please.

Information architecture is fascinating. Wikipedia defines it as “the art and science of organizing and labelling websites, intranets, online communities and software to support usability and findability.” I never realized just how important this was until iterating over this site numerous times to get the best results from our testers. Your navigation bar should be easily accessible. Your next/previous buttons should give you an idea of where you’re going or what’s coming up. Your pages should also be as lean as possible, conveying only what is imperative. The old GT site suffered a bit from having too much trim. Personally when I initially applied for the job, I looked online like anyone would do to get more information and I couldn’t find much. I had a very rough idea of what they did, what they did for their clients, and who worked there.

<h2 id="content-storytelling">Content and Storytelling</h2>

Along with a fantastic font choices optimized for legibility Global Thinking took copywriting very seriously in an effort to make the site’s content more appealing to read. Case studies, typically long and bland were headlined by a catchy phrase. Following that is the type of work GT did for the client and a quick rundown of the challenges and solutions. Each challenge and solution section was carefully written to entice readers to read on. The “Story” section of the case study is the meat of it. However, brevity still mattered as each paragraph is broken up with beautiful high resolution images relating to the work done for the client. This keeps things short and sweet and gives readers a great idea of the type of work Global can really do.

<h2 id="tech-challenges-solutions">Technical Challenges and Solutions</h2>

**<span style="color:red;">INTERNET EXPLORER 8.</span>**

When this site was first created, it was done with basic HTML, CSS, and Javascript. Upon it’s completion my boss’s boss told me “Great job! Now put it on WordPress.” This frightened me as I had never once developed a WordPress site let alone use the Admin Panel. Through much research and question asking I finally got a fully functional version up.

<h2 id="workflow-optimization">Workflow and Optimization</h2>

I went into this project knowing it was going to be a lot of work, especially considering the fact that I was the sole developer and had less than two years experience in web development. I was thinking of how I could cut down on the lines of code and how I could easily pass this project along to people after myself. Since CSS is often the culprit for excessive lines I decided to experiment with Sass/SCSS; I had no preprocessor experience. When researching syntax I stumbled upon a fantastic Lynda.com tutorial, [Responsive CSS with Sass and Compass](http://www.lynda.com/CSS-tutorials/Responsive-CSS-Sass-Compass/140777-2.html), perfect! I learned how to use GruntJS to optimize my workflow by having it minify my javascript and css, watch for errors and perform live reloads. It’s a short list but it really trimmed off a lot of project time and allowed me to remain highly organized. In fact, I am sure I stayed on target with this project due to the organization. An optimized workflow is essential to the success of any project.
