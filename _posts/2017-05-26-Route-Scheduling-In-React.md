---
layout: post
title: Route Scheduling in React!
---

A couple of weeks ago, I was working on building a route-planner for the Singapore MRT.
The application was to be built in **React.JS**. Since it was a small application, using *Flux* or *Redux* would have been an overkill.

The application takes the starting source and the destination from a given user. It then suggests to the user all possible routes the user can take on the MRT to reach from the source to destination. The data for stations and the lines can be found at [this](https://gist.github.com/mannanali413/faaef1c59db1afe30a84d31b1b32b198) gist.

## Solution
We use *Google Maps API's Autocomplete* for suggesting the possible places of travel. The Autocomplete is restricted to suggesting places from Singapore only. Once a user selects a starting location, the application computes the distance to the nearest MRT station from this location. After the user selects the destination and presses the search button, the algorithm identifies the possible routes on the MRT. 

Each suggested route initially highlights the stations on which the user has to switch lines. On clicking a route, the detailed view is displayed for the clicked route. The detailed view displays a breakdown of the lines a user would have to travel for covering a given route.

<p data-height="713" data-theme-id="dark" data-slug-hash="BRVwNv" data-default-tab="result" data-user="ali008" data-embed-version="2" data-pen-title="BRVwNv" class="codepen"> See the Pen <a href="https://codepen.io/ali008/pen/BRVwNv/"> BRVwNv </a> by MIR ALI (<a href="https://codepen.io/ali008">@ali008</a>) on <a href="https://codepen.io"> CodePen </a> . </p>
<script src="https://production-assets.codepen.io/assets/embed/ei.js"> </script> 
