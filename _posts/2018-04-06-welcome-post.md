---
layout: post
title: "Welcome to Seltox"
date: 2018-04-06 10:53:00 +1000
---

Hi there.  So this really is just a personal project for learning (as you can read in <a href="/about">about</a>).  There may at some point there may be some interesting or useful content here - but there are no guarantees.

The initial project I'm intending to document is the setup of a home FreeNAS system.  At this point I've already done it once (in what I called my 'dodgyNAS') and it functioned quite well until I had an unrecoverable corruption incident.  For sure I made a lot of mistakes but I learnt along the way.  I am the furthest thing you could get from an expert in this field and anything I say should be taken with a grain of salt. 

## DodgyNAS

###### So what was the DodgyNAS?

My whole life I've been somewhat of a data-hoarder thanks to growing up with very slow, very expensive Internet with a very small (4GB) monthly data limit.  Download once, keep forever!  I've always liked the _idea_ of a NAS but never had the money or justification of actually building/buying one.  Recently I decided to just go ahead and build one from spare components - not as a production-like redundant system, but just as a learning exercise.  I wanted to know how disk redundancy worked, how to automate using certain tools, allow remote management through the Internet but most importantly I wanted to know if I would actually use a home server/NAS if I had one.  These are the components that went into it:

* Case -> Corsair 650D
* Power Supply -> Thermaltake Toughpower 850W
* Motherboard -> Asus Sabertooth Z77
* Memory -> 16GB DDR3 Corsair Vengeance (2x 8GB)
* CPU -> Intel 2500K (stock speeds for this)
* GPU -> MSI Radeon HD6950 
* Boot drive -> Samsung Evo 840 120GB SSD
* HDD 1 -> 1TB Samsung 7200rpm drive 
* HDD 2 -> 3TB WD Green 5400rpm drive

Since this was just a test to play around with I made one big mistake.  I decided to just stripe the two drives to give me a total 4TB of storage.  Fast forward two weeks and I finally had things set up in a way I was happy.  I had a tool exposed to the Internet (under this domain, which forwarded to an Nginx reverse proxy to send the request to the correct IP address) and HTTPS enforced with a LetsEncrypt certificate.  I was pretty happy.  Then one day I was out and went to log into the box from my phone to check on it - and got an error.  When I got home FreeNAS was flashing red with a 'CRITICAL' status - plus an error stating that there had been unrecoverable corruption (or something along those lines at least).  Since it was striped, I lost _everything_ on the NAS.  Thankfully I had only used it as backups at this point so I didn't actually lose anything as there's still a copy on my main desktop.

But the moral of the story is clear - disk redundancy is important!

## Next Steps

I am now convinced that I should build a real FreeNAS machine with decent hardware.  ECC memory, NAS-purpose hard disks, low power components, etc.  Unfortunately that's expensive and will take quite some time in planning and I still want a FreeNAS to play with until that happens.  The plan this time is to use basically the same hardware but do things in a more 'proper' way - to have a setup & installation roadmap ready for when I build the real thing.  That is what the intention of the 'blog' is - my own personal diary of what I've done to set up this SlightlyLessDodgyNAS so that I can use it later on.

If anyone else finds something of use in here, then even better.
