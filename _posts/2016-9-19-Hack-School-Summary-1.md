---
layout: post
title: Setting up your Development Environment - Intro to Hack School
---

Welcome to Hack School

*Learn to build the future*

Hack School is a quarter-long "bootcamp" designed to introduce full-stack JavaScript development to everyone. It is a “zero to hero” program, meant for students of all backgrounds, including those who have never programmed before. We’re emphasizing friendship, practical skills, and actively working to build a more diverse tech community. 

By the end of the quarter, you’ll have built a personal website and an *<APP_NAME>* of your own. The skills you’ll gain are in high demand across the country and you’ll have a ton of fun. We hope that this will be just the beginning of your journey into the tech world.

*TODO: Update with name of app to be built*

### The End Goal

*TODO: Demo links to personal website and web app*

### Our Journey Together

Hack School consists of four major parts: 

* Weekly classes

    * We’ll show you the ropes

    * Expect a demo followed by a workshop. Bring your passion and laptops!

* Family hang-outs

    * You’ll learn alongside your new friends. Bring your friendship and laptops!

* Office hours

    * Hack School staff will be in the Clubhouse to help out. Bring your curiosity and questions (and laptops)!

* Individual training

You may be worried about falling behind. You need not worry! Besides all of the help we’ll make available to you, it’ll be natural for everyone to progress at different rates depending on their background. There is no shame in being the slowest, but there is much shame in being the fastest and being a jerk about it. Even if you’re behind the scheduled work for that week, we encourage you to come out to the classes and get help to catch up. Finally, written tutorials and examples will always be on our website for all to enjoy.

The key factors to success within Hack School: 

* Making new friends to learn alongside

* Pushing forward to make consistent progress every week

* Perseverance!

#### Diversity and Inclusion

Let’s be honest: tech at UCLA and in the world is a space dominated by heterosexual white/Asian men. The world is missing out on everyone else’s wonderful ideas and impact. We want to change that. To do so: 

* We are actively recruiting to achieve 50/50 gender parity

    * In partnership with ACM-W, WATT, and SWE

* We are actively recruiting other underrepresented minorities

* We will maintain a culture of mutual respect and kindness

    * To encourage listening openly and honestly, assuming good faith, and speaking kindly

* We are always open to your feedback

    * To help us do more to help you

## Picking Up Our Wands

To build all these wonderful things, you’ll need tools. The first of these tools is a great text editor.

Our default recommendation for Mac or Windows: Sublime Text

Other options for Mac: Atom, MacVim

Other options for Windows: Atom, Notepad++

## Introduction to HTML

HTML stands for Hyper Text Markup Language, which is essentially a document constructed of many tags that have different functions. Tags are keywords that let the web browser know what type of content is inside. Tags generally come in pairs, with a start tag <h1> and an end tag </h1>, denoted with or without the "/". 

The basic structure of an HTML Document looks like this: 

```html
<!DOCTYPE html>					Declares the document as HTML5.
<html>							The open tag describing an HTML document
    <head>						Text that lies in <head> provides info about the document
        <meta charset="UTF-8">	You’ll learn later, but this is where you include css and js.
        <title>title</title>	Title for the document
    </head>					
    <body>						All the stuff you see in an HTML doc lives here
        [Stuff goes here]		Well, between the <body></body> tags
    </body>
</html>							And that’s the end of our HTML doc!
```

And that’s the end of our HTML doc!

As you can see, all elements of an HTML document are enclosed within tags. 

You can think of tags like Matryoshka Dolls, which are essentially these: 

![_config.yml]({{ site.baseurl }}/images/Matryoshka-Dolls.jpg){: .center-image }

There’s a top half of the doll, and a bottom half, and can contain smaller dolls within them. And you can’t just leave the top half of a doll hanging; you’ll generally need to close tags. 

Okay, away from dolls. Back to HTML. When we create a website, we don’t want everything to be plain and boring. The plain, same-sized, black text over and over again makes for quite a boring website with little functionality. We want to make it look awesome. We want headers, we want paragraphs, we want images, we want input fields. And that’s what we use our tags for.

I’m going to go through a few basic HTML elements that will essentially be a toolkit that we can use to build a website. These are the most important ones that you’ll likely be using to create your website.

The most important ones are those that display text, that we’ll need to use to show all our viewers our content. In general, we’ll be using header tags, paragraph tags, anchor/link tags, and image tags. There’s also other ordered and unordered lists, as well as navigation tags. We’ll also dive into structure/organization and styling later, like divs and spans/

Header tags are used to denote section headings, with h1 being the largest, and h6 being the smallest. These have closing tags, and can be used for stuff like an overall page header, a section header, or a paragraph header.

Example:	<h1>How to make a Bruin Café Sandwich</h1>

Now, before we introduce how to make an actual bcaf sandwich, we’ll want to describe what sandwich we want to make, and why we should choose this sandwich over others. Our first header was a <h1> tag, representing the most important header. Since we want to divide our document into section, we can use other header tags, like <h2> .

Example: 	<h2>Why Bcaf, and why a Turkey Provolone</h2>

Great, now we have an additional section. Now we want to say all these great things about both Bcaf and a Turkey Provolone (or whatever your favorite sandwich is). We use the paragraph tag, <p>content goes here</p> to encapsulate our text. While they are called <p> (paragraph) tags, they can be used for a single sentence or a line. It’s bad practice to have text that isn’t enclosed by a tag.

Example:	<p>Bruin Café, also known as Bcaf, serves some of the best sandwiches ever. They're quick, they're big, and they're delicious. Even better, you can take your food to go. That means more time for studying, more time for Netflix!</p>

For example, let’s say we want to make a website to teach all of our new friends at UCLA how to make ramen in our college dorms.

We could write a big paragraph of text detailing what we need, how to gather our ingredients/tools, how to avoid getting caught and detained by our RAs, and then how to cook the ramen. But then again, that’s probably a hard read. We want sections, we want pictures, we want clear and succinct instructions. 

First off, let’s plan ahead. It’s always a good idea to at least have an idea of how we want things to be structured.

## Seeking out Help

* Codecademy

* Stack Overflow

* Googling tips

* Documentation

* Good video tutorials

* Come to the ACM Clubhouse when we have office hours

* Message, call, text, Snapchat, knock, and/or do whatever you can to get the attention of someone to help you. Within reason.

* HTML/CSS/JS Resouce : MDN 

* Go to hackathons!

## Previewing the Future

Here’s what you can look forward to over this quarter (we fully encourage you to Google these keywords in advance whenever you’re curious): 

* Week 2: The Face of the Web: HTML + CSS

* Week 3: The Language of the Web: JavaScript

* Week 4: Powering the Web: Node.js

* Week 5: Serving Up the Web: Express + Handlebars

* Week 6: Storing the Web: MongoDB + Mongoose

* Week 7: Polishing the Web: Bootstrap

* Week 8: Building Your Own Web: Heroku + Imagination

## Individual Training

There is only so much we can do during our Hack School sessions. So, every week, you’ll leave with a quest to conquer on your own time during the week. But don’t worry; you’ll have all of the help listed above and we fully encourage you to work together with your families. Plus, we hope to get you so excited that you can’t wait to do more!

That’s it for the first week. Welcome to Hack School!


