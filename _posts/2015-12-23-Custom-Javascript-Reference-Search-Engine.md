---
layout: post
title: Javascript Reference Search - A Custom Google Search Engine
excerpt_separator: <!--more-->
img_file: google.png
---
As a Javascript Developer, I end up visiting <a href="https://developer.mozilla.org/en-US/" target="_blank">Mozilla Developer Network</a> (MDN) couple of times a day. I check methods, look at examples etc.

<!--more-->
The problem is that I am mostly interested in the "<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference" target="_blank">Javascript Reference</a>" section of the site. 

When I click on the search icon at the top right and make a search, I get results from the whole site and I lose time filtering out the results that are JS reference related.

Thanks to Google, it has a feature called "<a href="https://cse.google.com/cse/all" target="_blank">Custom Search</a>". 

### What is Google Custom Search ###
Google Custom Search lets you include a search engine on your website to help your visitors find the information they're looking for. Because Custom Search is based on Google's core search technology, you can be confident that your users are getting high quality, relevant results. You can customize a lot of your search engine, including:

* Apply your site's look and feel to the search box and results page
* Use search features such as refinements, autocomplete, and promotions to enhance your users' search experience
* Understand your users' behavior by linking your search engine with Google Analytics
* Make money from your search engine with Google AdSense


There are tons of stuff you can do with Google Custom Search, so <a href="https://support.google.com/customsearch/?hl=en#topic=4513742" target="_blank">read more here</a>...

### Here is my Javascript Reference Search Engine - Powered By Google ###

Go ahead and give it a try, let me know your comments. Thank you...
The public URL for it is: <a href="https://cse.google.com/cse/publicurl?cx=005973983541992794790:d6n8rqhbbrc" target="_blank">https://cse.google.com/cse/publicurl?cx=005973983541992794790:d6n8rqhbbrc</a>

<script>
  (function() {
    var cx = '005973983541992794790:d6n8rqhbbrc';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:search></gcse:search>