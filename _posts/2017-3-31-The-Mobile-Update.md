---
layout: post
title: The Mobile Update
---

The mobile version of this site has been very broken. It took me longer than I expected to fix it, partly because I'm learning as I go. I want to do it right; not patch it together like some other mobile sites.

The first thing I had to do was switch to a mobile-first style website. That way, I have one base stylesheet for mobile, then additional ones for larger devices. It looks something like this:
```html
<link ... href="main.css" /> <!-- always included -->
<link ... href="desktop.css" media="(min-width: 960px)"/> <!-- only included on devices with a screen width greater than 960px -->
```

Load time is much quicker on mobile because only the primary CSS is loaded before the page is rendered. The CSS for the other style rules will be loaded in the background as the user browses the page.

Since I switched to a mobile first site, I also had to rewrite the desktop version as well to put desktop-specific code in a separate stylesheet. So far, there isn't much difference, but expect to see more in the future.

To learn more about media queries, see the page on [MDN](http://bit.ly/m3d14qu3r13s).

Thanks for bearing with the continual design!  
