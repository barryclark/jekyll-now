---
layout: post
title: Understand SSL certificates (root, intermediate, semi-intermediate, partial, ....)
---

#### Problem 
How to ensure trusted traffic between two computers. I googled it, so you (or I later) don't have to.


#### What is SSL 

Today, the only way to ensure secure traffic between two computers is via the TLS (also known as SSL, and I'll use this name) protocol.  
What it is and how it works, well, you'll find it on the internet. I'll describe how I use it in a corporate environment. 

So, an obvious situation it the one in which one computer talks with another one  

![alt text](https://vladcozma.github.io/blog/images/ssl/ssl-01.jpg "connection 1")  

This architecture is vulnerable to two threats:  
1. The **data** might be intercepted by somebody else and read (like a man in the middle).
2. The **computer 2**, for example, migth be in fact **computer 3** (like an identity thief).

SSL protocol covers both aspects by encrypting the data, and validating the participants.

What I need to do to ensure the trust is to go to the computer that is mine, let's say **computer 1**, and add a certificate there.

But who gives certificates? The certificate must be created by someone who you trust, to make sure that those things are valid. In the internet world, there are a bunch of companies that issue these certificates, and some of them are trusted by the browsers. Here's a snapshot from my Chrome.

![alt text](https://vladcozma.github.io/blog/images/ssl/ssl-03.jpg "Chrome certificates")  

But now the mistery deepens, as you'll see that these certificates are personal, intermediate or trusted root.


