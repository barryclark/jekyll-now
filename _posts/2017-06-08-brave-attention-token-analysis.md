---
id: 174
title: Will Basic Attention Token scale?
date: 2017-06-08T08:16:09+00:00
author: Scott Shapiro
layout: post
guid: http://www.scottshapiro.com/?p=174
permalink: /brave-attention-token-analysis/
instant_articles_submission_id:
  - "280391735765083"
dsq_thread_id:
  - "5891703331"
dpsp_networks_shares:
  - 'a:2:{s:9:"pinterest";i:0;s:8:"facebook";i:13;}'
dpsp_networks_shares_total:
  - "13"
dpsp_networks_shares_last_updated:
  - "1553829605"
categories:
  - Cryptocurrency
  - ICO
---
As someone who&#8217;s worked in digital advertising for over a decade and is very passionate about cryptocurrency and blockchains, I wanted to share some thoughts on one of the most notable ICO&#8217;s to date: [Basic Attention Token](https://basicattentiontoken.org/index.html). [Not about how the ICO went](https://hacked.com/controversy-surrounding-bat-ico/) which plenty has been written about, but instead about the business model and viability. (Disclosure: I work on ads at Facebook. I hold Ether, which underlies BAT. I have never held any BAT.)

## Why is it so notable?

BAT ICO&#8217;d (I think that&#8217;s a verb by now: it&#8217;s like IPO&#8217;d but &#8216;c&#8217; for coin) on June 1 and sold out in 30 seconds. This is a record. They only sold a fraction of their tokens and raised $30 million. It was also founded by the Brendan Eich who invented javascript and 3rd party cookies &#8211; technologies that touch billions of people everyday. Legend!

## What does BAT do?

BAT creates a market for online advertising between users, publishers, and advertisers. It values each ad impression a users sees based on how much of the ad was seen and for how long. Also known as: attention. The amount of attention generated determines how much value the advertiser should transfer to the publisher. Users are cut into the deal and receive tokens for allowing ads in their browser aka “providing basic attention”. Note, this does not mean they actually looked at the ads or were in front of their browser at the time.

### The premise makes sense on paper:

  * give users ultimate control over their digital ad experience
  * reward publishers based on how much business outcome they generate for advertisers
  * advertisers only pay for business outcomes

I agree with this approach (enable choice for users, enable advertisers to pay for outcomes and not proxies) because it&#8217;s exactly the same approach we take at Facebook. However, the details are much different.

  * The only advertiser **outcome** enabled in BAT is attention. In fact, the &#8216;A&#8217; stands for attention. This is certainly better than paying for an impression (whether it was seen or unseen) or a click (whether it was from a human or a bot). We&#8217;re aligned there. But the advertising world has already moved to a pricing model based on high value events like someone making a purchase or applying for a credit card. 
  * **Optimization** happens locally, in the browser. In other words, the system machine learns about which ads I like and don&#8217;t like based on my behavior, limited to me. This makes sense in a decentralized system. But optimization requires massive amounts of training data. That&#8217;s easiest with centralization but maybe BAT will find a way to aggregate data for machine learning yet still respect the promises they&#8217;ve made. 
  * Today, it only works when users are on a BAT enabled **browser**. That&#8217;s developed by Brave but in the future they want to embed their technology all over. This will be the critical path to success. iOS, for example, doesn&#8217;t allow for anything custom beyond the standard webkit renderer. Also, mobile app monetization is huge and growing quickly. BAT can work there in theory, but will require a different implementation than their website implementation. Related to the point above, would BAT know that I&#8217;m the same person in a mobile app and a desktop web browser? Perhaps if they create a way for oneself to identify as the same BAT user in both. But you&#8217;d think this is a critical v1 feature to make sure a user is not getting too much attention of the same ad on both (BAT should know better). 
  * Most importantly, the **incentives** are largely aligned with advertisers and users. There&#8217;s a bigger question on users and publishers, who generate the supply of inventory for BAT to be spent on. Will monetization teams at publishers be able to tell their CFO&#8217;s that this quarter they&#8217;re getting paid a bit of BAT, not all Euro? With Google&#8217;s ad network revenue declining (meaning the rest of the web getting paid less), will publishers take risks in trying something new and radical? Or just optimize what&#8217;s tried and true? 

I love that the Brave / BAT team is being bold and taking combining two of my passions. But I am skeptical about anyone building a new two-sided market of advertisers and publishers at this stage of online advertising, particularly when limited to a user base that has to be acquired one at a time. If they can efficiently integrate their tech in a way to quickly saturate a specific user base, then they&#8217;ll be able to use advertiser demand for this method of transaction to spur publisher adoption.