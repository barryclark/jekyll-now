---
layout: post
title: DMARC, baby!
---

Last weekend, I decided to have a go at implementing [DMARC](https:www.dmarc.org) for my own *georgesale.co.uk* email address.

DMARC is a system that tells email providers what to do with forged email supposely from you. SPF, DKIM, and DMARC work together to do this. There's a nice explanation of what these are, from the UK's new [National Cyber Security Centre](https://www.ncsc.gov.uk) (NCSC), on their blog post '[Making email mean something again](https://www.ncsc.gov.uk/blog-post/making-email-mean-something-again)':

![SPF, DKIM, and DMARC explanation from the NCSC]({{site.baseurl}}/images/2017-2-18 dmarc baby/dmarc explanation.jpg)

So, I decided that since I have my own @georgesale.co.uk email address, I should have a go at implementing these.

First off - find a good guide -  I used the one from the [Global Cyber Alliance](https://dmarcguide.globalcyberalliance.org/#/). This contained almost everything I needed - including links to the config guides for Office 365 and Google Apps. After that, I just needed time - and to make a few 'rookie errors'! (For interest, this was mainly setting up DNS entries with the right formatting..)

After a morning of exploration, I was done! I'd managed to get all 3 policies - SPF, DKIM, and DMARC - working on my georgesale.co.uk email address. 

Now, I'm not too sure that anyone will be very interested in trying to spoof my email address - but it was fun and rewarding getting this working. I'll see how it goes, and if I get any reports of spoofing prevented by these policies. I'm also trying out a DMARC reporting service, which will collate reporting from all the domains I own into one central dashboard. I'll update you on how it works out...

In the meantime, if you have you own custom email address (or if you're a business too!) have a go at getting DMARC working - and let me know me know how you get on! 

