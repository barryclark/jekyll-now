---
layout: post
title: Hello world!
description: My first blog post where I talk about the process of creating and using a Jekyll based website.
tags: jekyll, markdown, github, optimization, sitebeam, speed, cookies, github, ruby, gem
---

### Customizing the blog using Jekyll and testing its speed.

Setting the website up was a relatively straightforward process, more so once I found out about the [Jekyll Now](https://github.com/barryclark/jekyll-now) project. I first built up the site using Jekyll, a **Ruby** gem, but later found out about this project. For me, the greatest advantage to this approach is the fact that I don't have to deal with any hosting issues, as **GitHub** will reliably host the website from my repo. Combine this with the relative simplicity and swiftness of the website and you can come to understand why I chose this method for deploying the project. You can read more about the website and its purpose at the [_*About*_](https://victormarcu.github.io/about/) section.    


Now that I've got the site up and running the next step is customizing it. Jekyll takes my content written in Markdown and creates completely static HTML pages. I am already familiar with the _**Markdown**_ markup language so editing my blog posts will be an efortless thing to do.  

Adding images is starightforward...
![example image]({{ site.baseurl }}/images/ocV1u5R.jpg "portable TV from the '50s")  
Or.. 


```javascript
/*Demonstrating a piece of javascript code*/  
var message = "hello world";  
alert(message);
```

### Advantages of static pages

As you probably have guessed by now, the greatest advantage I have by running this site is _**simplicity**_. My Jekyll website is minimal and fast, making only 3 HTTP requests (including my profile picture) and no calls to any sort of database. Besides that, the design is simple and mobile-friendly.



### _later edit:_ Optimizing the website:

I have decided to further optimize the project and to do this, I first need to get a quick analysis of my website.  
Using [SiteBeam](http://sitebeam.net/) (I recommend the [free trial](http://trial.sitebeam.net/)). I can analyse my website and easily find and solve some of its minor problems. The report generated helps me understand where my website is lacking and what I can do for SEO (search engine optimization)


Running the test..
![Scan results]({{ site.baseurl }}/images/websiteTest.JPG "The result of my first, full website scan")  

As you can see from the results, besides failing to meet some W3C compliance standards due to some minor HTML errors, my website is ranking very high in terms of speed, mobile/tablet optimization, good use of analytics and some other less important factors.  

![website speed]({{ site.baseurl }}/images/responseTime.JPG "Output for the speed test")  
<sub>_As you can see the website takes **less than** 0.2 seconds to load due to its lightweight build._</sub>

The biggest problem my website faces is its low social interest and user engagement. I hope I can solve this problem in time, by continuing to add more blog entries or some tutorials/news about topics that interest me.

### Cookies
Although unrelated to optimization, I have decided to add a message notifying users of my use of cookies. European laws require that digital publishers give visitors to their sites and apps information about their use of cookies and other forms of local storage.

### All in all..

I feel satisfied with the end result and I will keep updating the blog as frequently as possible.



****
