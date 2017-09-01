---
layout: post
title: Building An Asynchronous Web App.
---
![_config.yml]({{ site.baseurl }}/images/landingPage.png)

[ Thailand Explorer Live Site](https://mikehaslam-thinkful-projects.github.io/thailand-explorer/)


## Explore random destinations in Thailand.

In this Thinkful capstone project, I had many challenges and learned, quite a bit about reading documentation . 

[Github Repository](https://github.com/MikeHaslam-Thinkful-projects/thailand-explorer)


The requirements for this project, were to choose an API,  get data from API and display it to the user in the UI.
Also the app should be responsive and fully functional on tablets, mobile and desktop. And shound have good style.

I choose to get data from the WikiVoyage API witch is part of the  [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page) Some challenges, I had with this API is I found the documentation hard to understand at first, also the position of the data changes often.

Another API  I used in this project is the [Google Maps API](https://developers.google.com/maps/) I found the documentation for this API more easier to understand  than WikiMedia but still challenging . Also to help use Google Maps and my jQuery implementation  I choose to use
A jQuery plugin from [Maplace.js](http://maplacejs.com/)  Maplace was very helpful in working with Google Maps, but once again the documentation was challenging , but by searching issues on repository and by broad searching I was able to figure out what I need to do.

## Technology used

### Thailand Explorer was written with jQuery, ECMASCRIPT 6, HTML5, CSS3.

In this application I choose  to model the data. The application uses ajax get get the locations from a JSON file. Then another ajax call to get the images and description data from wikivoyage which is part of the Media Wiki API. the data is then processed and injected into the DOM dynamically with Javascript.

I tried to code in a style similar how a React application would be coded, looking forward to using redux to manage state.

Please let me know what you think I am always open to constructive criticism.

Thanks for checking out my project.

Mike Haslam 
Student of Web Development.
