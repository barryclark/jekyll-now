---
layout: post
title: Automating our Examples Library
author: Jeremy Wildfire
---

# Overview

We think that making reproducible examples is one of the best ways to document our work. It's important because ...

# Background 

The way we've shared these examples has evoloved over the years. Back when we were first getting started with open source development, we made lots of [gists]() and shared the them through [bl.ocks.org](). That solution was super easy to use, but we wanted more control over the look and feel of the example pages so we moved towards hosting examples in our [viz-library]() repo. Now we had a nice looking page where people can play with our graphics. Our workflow was that we'd [update the examples](wiki process link) stored folder in `viz-library` folder after any vizualizion repos was updated, and it worked great ... for a while. 

We test our graphics after every update, and we've got various [custom](CAT) [resources](web-charts-tests) to streamline that process for our testers. Coders are not that sophisticated, we really just need to flip between our code editor and a simple web-page that we can refresh to see what we broke. `ctrl-s` -> `alt-tab` -> `ctrl-r` -> `alt-tab` -> etc. Although it's never been a requirement, we've tended to create `/test-page` folders for simple examples.

So now we've got our "public examples" in the `viz-library` repo and "test pages" in the individual graphics repositories - two different sets of examples governed by 2 different processes. It was confusing and inneficient - we needed to pick one. Since they're so central to the development process, the `/test-page` examples are almost always kept up to date. As a result, we decided to keep the test pages, and shut down the stand-alone examples. 

# Viz-library V2.0

After migrating the examples stored in `viz-library` to the individual graphics repositiories, we created a new automated page to host the `test-page` examples. 
