---
layout: post
title: An opinionated guide to making videos for MDN
---

There are several reasons why videos are a terrible way to present technical documentation.

* video is linear. People don't read online documentation in a linear fashion, starting at the start and reading through to the end. [They scan](http://www.sensible.com/chapter.html). Video is really hard to scan - it forces the user to consume the content start-to-finish.

* video is less information-dense than text. It takes longer to watch a video of someone telling you something, than it does to read the thing.

* video is big, often slow to load, and sometimes uses dodgy plugins.

* video has accessibility problems: it's harder to localize, or zoom, or use with screen readers.

It's worth keeping these problems in mind, even when you are making videos, so you can try to alleviate some of them.

<!--more-->

Video is most useful when you are describing some piece of workflow. It's especially appropriate when the workflow is multi-step: *"do this, then do that, then this will happen"*, crosses over multiple applications or windows, and includes GUI interaction: *"now click on the button near the top-left, that looks a bit like a duck"*.

This kind of thing can be painful to describe in words, and hard for a reader to translate the words into the GUI interactions, but a video can provide a direct and concise guide:

<iframe width="560" height="315" src="https://www.youtube.com/embed/HMozipAjrYA" frameborder="0" allowfullscreen></iframe>

Videos for MDN should be:

* **short**: try to keep videos under 30 seconds, usually under 20 seconds. This is short enough not to make big demands on peoples' attention spans.

* **simple**: try to make the workflow simple, 2-4 distinct pieces. This makes them easier to follow.

* **silent**: audio makes videos much more engaging, but they are much more time-consuming to make. Also, having to explain what you're doing makes the videos much longer.

To explain something more complex, use a blend of short videos and screenshots, interspersed with text. The text can help reinforce the points made in the video, and the user can rely on the text or the video as they choose, like this: [Working with the Animation Inspector](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Work_with_animations#Animation_inspector).

## Technical requirements

You'll need some screen recording software. [Screenflow](http://www.telestream.net/screenflow/overview.htm) is Mac OS X-only and proprietary, but intuitive to use and has all the features you might want.

## Preparation

First, plan the flow you want to capture: consider the best points to start and end.

Make sure the desktop background and your browser profile are clean. Plan the size and positioning of browser windows, especially if you will be using multiple windows.

Plan zoom levels for the parts of the UI that you're going to show. Not everyone will be able to view your video in high definition. You will be able to zoom particular parts in post-production, but it's a good idea to zoom the app beforehand as well. However, don't zoom so far that the app's responsive design makes its UI looks unfamiliar.

## Recording

In the recording, go through the flow smoothly and steadily. Pause for a second or two when you are at key moments - for example, about to click on a button. Make sure the mouse pointer doesn't obscure the button's icon.

Remember to pause for a second or two at the end, to show the result of the flow.

## Post-production

You'll be able to highlight key moments in post-production. A highlight can consist of a couple of things, which you'll often combine:

* zoom in on parts of the screen
* fade the background.

Highlight key moments of the workflow, especially where the detail is hard to see: clicking on a particular icon or entering a particular URL, for example. Aim for the highlight to last for 1-2 seconds. It's a good idea to add a short transition (200-300 milliseconds) at the starts and ends of the highlights.

[Here's a tutorial on adding highlights in Screenflow](https://photography.tutsplus.com/tutorials/how-to-add-custom-callouts-to-screencast-videos-in-screenflow--cms-27122).

Use some restraint here: don't make the video a constant procession of zooming in and out, people will get seasick.

You'll also be able to crop the video to the desired aspect.

## Upload

Log into the [mozhacks](https://www.youtube.com/user/mozhacks/videos) Youtube channel to upload the video. Mark the video as "unlisted" if it doesn't make sense out of the context of the page (if it's a short video, then it probably doesn't).

## Embed

Finally, embed the video in the page using the [EmbedYouTube](https://github.com/mozilla/kumascript/blob/master/macros/EmbedYouTube.ejs) macro.

## What about GIFs?

![](../images/mummy-crow.gif)
