---
layout: post
title: My second post
---

08:41 Yangon  
Welcome to my second post

Today, I will be adding more social icons in the footer. 
### Social icons 
* Get the sites' logos in their press kit. 
  * Use this [converter](https://image.online-convert.com/convert-to-svg) or [this](https://convertio.co/png-svg/) or [this](https://www.pngtosvg.com/)(need a facebook account though) to convert it to SVG. 
  * Then in the SVG file, adjust width, height, and color. 
  * Change SVG to base64 [here](https://www.base64-image.de/). 
  * So there are three files in which you need to change. 
    1. _svg-icons.scss 
      * Put your base64 string here.
    2. svg-icons.html 
      * Add the function in Ruby and HTML
    3. _config.yml 
      * Enter your username of the social account here
  * Now, restart the server if you are running the site in local (jekyll server). You should see the social icons below in the footer. 😎