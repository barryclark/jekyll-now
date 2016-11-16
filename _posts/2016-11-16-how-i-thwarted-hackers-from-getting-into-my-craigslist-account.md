---
layout: post
title: How I Thwarted Hackers from Getting into my Craigslist Account
tags: [culture]
keywords: [craigslist, social engineering, phishing, hacking, crime]
image: /images/covers/craigslist-cover.png
---

Hackers are at it again, this time trying to get access to my Craigslist account. Unlike last time where [I fell for it and my AOL email was compromised](http://hendrixjoseph.github.io/how_my_aol_email_got_hacked/), I realized it was a [phishing](https://en.wikipedia.org/wiki/Phishing) attempt.

So what happened? Well, recently I've been [reselling items mostly on eBay](http://hendrixjoseph.github.io/six_essential_items_for_reselling_on_ebay_and_amazon/), but also Craigslist. On Craigslist people contact me via text, phone call, or email.

This morning I received the following text message:

> You have a new Craigslist message, to view it please use:
>
> [http://notcraigslist.org]()

The link was a little different, but it did have the word "craigslist" in the URL. "craigslist" was in the part you'd normally see the "www" - an obvious red flag.

I'm a curious fellow, and I did one thing I shouldn't have: I clicked the link. I highly suggest if you ever get a phishing text or email with a link - don't click it! This allows the phisher to track that they sent the text or email to a valid phone number or email.

Anyway, as I expected, it brought me to what appeared to be the Craigslist login page:

![Fake Craiglist login page](/images/craigslist1.png)

I was still curious, but not so stupid as to put my actual login information. I wanted to see what happened when I put in a username and password, so I tried a fake username and password:

![Fake Craiglist login page with dummy data](/images/craigslist2.png)

Nothing happened when I clicked "Log in." I'm sure the data got sent somewhere, but nothing happened with the UI. The real Craiglist page would've said:

> Your email address, handle or password is incorrect. Please try again.

That's that. Nothing too exciting, except that I shouldn't have clicked on the link. I just wanted to let people know what it looked like!
