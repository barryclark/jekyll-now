---
layout: post
title: My TrueNas Scale 🖥 gets a RAM 🐏 upgrade 🚀
---

I was always running 32 GB RAM ECC RAM so far (check out my [post]({% post_url 2022-03-27-truenas-hardware %}) that describes the system hardware).
However, with more and more services being added through Docker 🐳 (my [dockerfiles](https://github.com/patzm/dockerfiles)), the RAM was running low sometimes.
In particular, when the ZFS file system got hungry too during intense disk IO.

Sooo... 🥁, I decided to upgrade.
On [eBay Kleinanzeigen](https://www.ebay-kleinanzeigen.de/), I found a fairly priced set of 64 GB RAM.
Specifically, 8 modules with 8 GB 2Rx8 PC4 DDR4 of 2133 MHz.
Because I have 8 modules in total, I thought nice!
That will work 👍.
I paid € 105 in total including shipping, which deemed a fair price.

Just now I installed it.
The system boots fine (thank you seller, no crappy modules 😉) ✅.
However, I **only see 32 GB RAM** 😳!

After some digging 🕵️‍♂️, I found

> Total Slots : 8 (4-channel per CPU, 4 DIMM per CPU)

on the motherboards specification page.
Great... I bought the wrong number of modules / module capacity configuration.
Four modules of 16 GB RAM each would have been the better choice.

Now I have two options moving forward:
1. Sell the RAM again and get the right set.
2. Buy a CPU 🎉 (or 🤦‍♂️)

It is likely that I won't get such a budget offer for the RAM again.
So probably, a new kit of 4x 16GB RAM would cost me around € 150.
The CPU on the other hand is _really_ cheap: I found one on eBay for € 34,90 (and € 3,95 for shipping 🚢📦).
On Arctic's eBay shop, I found the bigger brother of my current CPU cooler, the [Freezer 34 CO](https://www.arctic.de/freezer34co) 🧊.
It is listed for € 21,02 (including shipping).
Grand total **€ 59,87**.

A quick calculation: spend € 60 on a CPU + cooler and *have* a 2nd CPU, or expect to buy and sell RAM with losses of ~ € 50.
Ok, let's buy 💰 the CPU + cooler ☺️🤑.

Second thought 🤔💭: energy consumption ⚡️ will increase 📈.
By how much?
I think the fan will probably use 1-2 W.
The CPU in idle (which basically it will most of the time) shouldn't be more than 3 W.
So let's say 5 W more.
That is 43,8 kWh in a year.
We roughly pay € 0,32 / kWh right now, so that would roughly € 14 per year.
That is ok.

Third thought 🤔💭: will the CPU cooler fit?
This wouldn't be my first endeavor where the CPU cooler didn't fit the case 🙈.
But this also checks out.
I should have about 3 cm extra space.