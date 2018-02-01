---
layout: post
title: Cryptocurrency, Bitcoin, & AntMiner Hash Rates
tags: [money]
keywords: [antimer hash rates, bitcoin, cryptocurrency, antminer]
mathjax: true
image: /images/antminer-s3.jpg
---

Earlier this year I become interested in the cryptocurrency scene, particularly bitcoin. In addition to [buying some bitcoin on Coinbase](https://www.coinbase.com/join/5955857b9c87bc02147fbba4), I also bought [an AntMiner S3 on eBay](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5337996799&mpre=https://www.ebay.com/sch/i.html?_nkw=antminer+s3). I was using the AntMiner via the NiceHash service, but after the recent hack, I decided to move to an actual pool. After a very short amount of research, I decided to go with SlushPool, which is one of the older pools.

So how much do I make with my AntMiner? Not much, really. In fact, I probably spend more on electricity than I make. **To make things confusing, I get paid for mining with bitcoins, whereas the electric company bills me in US dollars.**

![My AntMiner S3](/images/antminer-s3.jpg)
*My AntMiner S3*

I'm not sure exactly how NiceHash worked. I only got paid twice via their service, and I was close to another payout before they got hacked. SlushPool seems to be more straightforward on how much they pay.

Miners get paid for every block the entire pool verifies by [the following equation](https://slushpool.com/help/manual/rewards):

$$miner-reward = block value×(1 − pool fee )×{miner-hash-rate \over pool-hash-rate}$$

The pool's fee is 2%, and the average block value is about 16 bitcoins (12.5 bitcoins for a block reward plus transaction fees). So the equation could be simplified to:

$$miner-reward = 16×(0.98)×{miner-hash-rate \over pool-hash-rate}$$

According to SlushPool, my miner has averaged about 450 gigahashes a second (Gh/s). The entire pool's hash rate has averaged an astonishing 1.3 exahashes a second (Eh/s).

We're all familiar with "giga" from "gigabyte." There's one billion - 1,000,000,000 or a one followed by nine zeroes - in a giga-something. Exa is basically a giga-giga. There are one billion giga-somethings in an exa-something. That's one billion gigabytes in an exabyte, or one billion gigahashes in an exahash.

Put it together and an exahash is 1,000,000,000,000,000,000 hashes. A one followed by **eighteen** zeroes. The word for this many zeroes is quintillion, or sometimes "billion billion."

I know the numbers million (six zeroes), billion (nine zeroes), trillion (twelve zeroes), quadrillion

Okay, back to how much I make. Let's continue to plug the numbers into the previous equation:

$$miner-reward = 16×(0.98)×{450,000,000,000 \over 1,300,000,000,000,000,000}$$

Although we can just plug that into a calculator, let's factor out the extra zeroes on the division (let's keep my hash rate at the hundred's place, though):

$$miner-reward = 16×(0.98)×{450 \over 1,300,000,000}$$

Just using [Google as a calculator](https://www.google.com/search?q=16*(0.98)*450%2F1%2C300%2C000%2C000) shows that my reward is about 0.00000542769 bitcoins.

How often do I get a reward? It varies greatly - as little as a minute and many as several hours. However, it averages to about once an hour.

This means in a 24-hour day I'll make 0.00013026456 bitcoins.

How much this is in US dollars is left as an exercise for the reader.

Finally, I was curious how much of the different AntMiner S-units would make, so I made the following table:

Version | Gh/s | reward / block | reward / day | watts | kWh / day | buy
--- | --- | --- | --- | --- | --- | ---
AntMiner S1 | 180 | 0.00000282 | 0.0000677 | 360 | 8.64 | on [Amazon](https://www.amazon.com/s/?field-keywords=antminer+s1&tag=hendrixjoseph-20) or [eBay](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5337996799&mpre=https://www.ebay.com/sch/i.html?_nkw=antminer+s1)
AntMiner S2 | 1,000 | 0.00001568 | 0.0003763 | 1100 | 26.4 | on [Amazon](https://www.amazon.com/s/?field-keywords=antminer+s2&tag=hendrixjoseph-20) or [eBay](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5337996799&mpre=https://www.ebay.com/sch/i.html?_nkw=antminer+s2)
AntMiner S3 | 441 | 0.00000691 | 0.0001660 | 340 | 8.16 | on [Amazon](https://www.amazon.com/s/?field-keywords=antminer+s3&tag=hendrixjoseph-20) or [eBay](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5337996799&mpre=https://www.ebay.com/sch/i.html?_nkw=antminer+s3)
AntMiner S4 | 2,000 | 0.00003136 | 0.0007526 | 1400 | 33.6 | on [Amazon](https://www.amazon.com/s/?field-keywords=antminer+s4&tag=hendrixjoseph-20) or [eBay](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5337996799&mpre=https://www.ebay.com/sch/i.html?_nkw=antminer+s4)
AntMiner S5 | 1,155 | 0.00001811 | 0.0004346 | 590 | 14.16 | on [Amazon](https://www.amazon.com/s/?field-keywords=antminer+s5&tag=hendrixjoseph-20) or [eBay](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5337996799&mpre=https://www.ebay.com/sch/i.html?_nkw=antminer+s5)
AntMiner S5+ | 7,722 | 0.00012108 | 0.0029059 | 3,436 | 82.464 | on [Amazon](https://www.amazon.com/s/?field-keywords=antminer+s5%2B&tag=hendrixjoseph-20) or [eBay](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5337996799&mpre=https://www.ebay.com/sch/i.html?_nkw=antminer+s5%2B)
AntMiner S7 | 4,860 | 0.00007620 | 0.0018289 | 1,210 | 29.04 | on [Amazon](https://www.amazon.com/s/?field-keywords=antminer+s7&tag=hendrixjoseph-20) or [eBay](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5337996799&mpre=https://www.ebay.com/sch/i.html?_nkw=antminer+s7)
AntMiner S9 | 14,000 | 0.00021952 | 0.0052685 | 1,375 | 33 | on [Amazon](https://www.amazon.com/s/?field-keywords=antminer+s9&tag=hendrixjoseph-20) or [eBay](https://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_id=114&ipn=icep&toolid=20004&campid=5337996799&mpre=https://www.ebay.com/sch/i.html?_nkw=antminer+s9)

{% include amazon/native-ad.html title="AntMiner S-Series" asin="B00HL4MEG6,B00NZDBWKG,B00NWHT18A,B00RCTIY4G,B014OGCP6W,B075MH4HSL" %}

Remember that Gh/s = Gigahashes / second and kWh = kilowatt-hour. The reward is in bitcoins. The source of the hash rate and watts is from [the bitcoin wiki](https://en.bitcoin.it/wiki/Mining_hardware_comparison).
