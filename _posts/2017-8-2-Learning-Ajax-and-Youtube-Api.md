---
layout: post
title: Learning Ajax and Youtube Api
---

![_config.yml]({{ site.baseurl }}/images/tube.png)



[Thinkful Tube App live here](https://mikehaslam-thinkful-projects.github.io/thinkful-tube/)

Thinkful Tube
In this Thankful challenge what first appears to
be something you could just do on youTube.
As it turns out it was  great learning experience,
about how to use jQuery & AJAX  and get Data from
an API. 

The requirements of the challenge are:

Accept a user search term 
Get JSON from the YouTube API based user search term
Display the thumbnail image of the returned videos

Optional Advanced functionality Requirements 

Make the images clickable, leading the user to the YouTube video, on YouTube.
Make the images clickable, playing them in a lightbox.
Show a link for more from the channel that each video came from
Show buttons to get more results (using the previous and next page links from the JSON)

So to first get started on this project I first made a quick sketch of what the application would look like to get the input and display the data returned that would meet the requirements of the challenge.

Next I created the directory structure for the project And initialized a git repository, then I started on the HTML to get the input from user and a place to display the data returned. At his point I wanted to practice using Flex Box so I used it for the positioning  of what I had so far, also used some basic css styles.
Now it was time to start writing some javascript.  Using a combination of ES6  and jQuery and trying to write small reusable functions to avoid spaghetti code.  
In app.js I got my document ready by creating jQuery object  for my function searchBtnListener

In searchBtnListener I used event delegation to get the query requested clear the input and call the getDataRequested function passing in the query from the input from user and a callback function Named displayDataFound.

In getDataRequested function  witch takes the parameters (searchTerm, callback) this is where the Ajax call is made passing in the configuration object with all the parameters  to get the data requested. and then the data returned is passed to the callback function named displayDataFound.

In displayDataFound we save the results from the api call to a variable  and then call .map on results to get  each item object from the call to api then pass the items to the renderResults function. Also we pass the results into the DOM by creating a jQuery object from the class of the div in html where we want to display the results and call .html with the results as an argument. Also we capture the nextPageToken and pass to getMorePages function. 
Also call getVideoSelected function and closeLightBox function.

In renderResults function we remove thee hidden class on more buttons so they will display in the UI now. Then we save a template string containing the url and video id of each individual video returned from the api call to a variable. Then return a template string that contains a div that has an image thumbnail of video and is wrapped in a anchor tag with url to video also another anchor link the title of channel and url to got to that channel when clicked.
What has been accomplished up to this point is meeting the basic requirements of challenge and 1 optional functionality  :
1) Accept a user search term. 
2) Get JSON from the YouTube API based user search term.
3) Display the thumbnail image of the returned videos.
4) Show a link for more from the channel that each video came from

For the Optional Advanced functionality Requirements. 

I must admit I struggled a bit on these at first. The way I got through this is first I read Youtube api documentation,
And also looked at other peoples examples. And I reached out to my mentor at Thinkful. He did not give me all the answers but led me in the right direction so I could understand better myself. I think what confused me the most was trying to read code from documentation and other examples witch was a bit old and write in my own style using more ES6  and smaller functions, and  only using jQuery that is needed for Dom manipulation, in an effort to avoid spaghetti code. Side note very much looking forward to React and Redux in the future!




