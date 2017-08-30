---
layout: post
title: DMARC reporting with Postfix DMARC
---

After implementing DMARC for my domain a few weeks ago, I've been trying to find the best way to report on this (essentially, showing who is trying to send email on behalf of *georgesale.co.uk*)

DMARC compliance reports are returned by most recipient email servers in XML every 24 hours. They look a bit like this:

![part of a DMARC XML report]({{site.baseurl}}/images/2017-04-23 dmarc reporting/1.png)

![another part of a DMARC XML report]({{site.baseurl}}/images/2017-04-23 dmarc reporting/2.png)

*(images courtesy of [Return Path](https://returnpath.com))*

Although it's possible to look through these manually, I wanted something that would provide cleaner and more useful information, working at scale.

After experimenting with a few services, I found the excellent (and free!) [Postmark DMARC tool](http://dmarc.postmarkapp.com). It's super easy to set up - you put in the email address where reports should be sent, and the domain you want to monitor. Then, you add a unique Postmark-generated address to your DMARC record in your DNS. After the service verifies this record, you're all set!

Report digests will be sent to you weekly, like so:

![part of a Postmarc DMARC report digest]({{site.baseurl}}/images/2017-04-23 dmarc reporting/report1.jpeg)

![sending sources which failed SPF and DKIM]({{site.baseurl}}/images/2017-04-23 dmarc reporting/fail.jpeg)

*(Note - there's no compliant sources as I didn't send any email from my georgesale.co.uk address for this week)*

Look at all these sources trying to send on behalf of me - not ideal! Perhaps people are trying to spoof my domain to run a phishing campaign involving clothes at ASDA?!?

![Google search results for 'George Sale']({{site.baseurl}}/images/2017-04-23 dmarc reporting/asda.jpeg)
*Damnit - I might be out-competed for my name on Google!*

Luckily, all these attempts weren't even delivered to recipients as I've set my DMARC policy to '*p=block*'. Without DMARC, they'd be delivered!

So - in short - if you still haven't implemented it, get DMARC up and running - and use the excellent [Postmark DMARC tool](http://dmarc.postmarkapp.com).
