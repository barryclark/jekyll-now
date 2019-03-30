---
id: 288
title: 'Prism by Shapeshift &#8211; first impressions'
date: 2017-08-18T08:17:27+00:00
author: Scott Shapiro
layout: post
guid: http://www.scottshapiro.com/?p=288
permalink: /prism-shapeshift-first-impressions/
dpsp_networks_shares:
  - 'a:2:{s:8:"facebook";i:20;s:9:"pinterest";i:1;}'
dpsp_networks_shares_total:
  - "21"
dpsp_networks_shares_last_updated:
  - "1553829604"
image: /newblog/wp-content/uploads/2017/08/Screen-Shot-2017-08-18-at-8.03.18-AM.png
categories:
  - Cryptocurrency
---
Ever since I heard of [Prism by Shapeshift](http://prism.exchange) I&#8217;ve been anxious to try it out! I&#8217;m a huge fan of financial derivatives and cryptocurrency. [Founder Erik Voorhees](http://twitter.com/ErikVoorhees) is a legendary cryptocurrency entrepreneur and is always ahead of the curve. His cryptocurrency exchange company Shapeshift recently acquired Keepkey, launched Prism, and he initiated a token sale for his newest venture [SALT lending](https://www.saltlending.com). So as soon as I received my Prism beta invite, I dove right in.

## Prism Asset Allocation

The value proposition of Prism is simple: simple cryptocurrency diversification. Prism lets you create a synthetic portfolio that&#8217;s backed by Ethereum without having to buy/sell each coin one at a time.

<img src="/wp-content/uploads/2017/08/Screen-Shot-2017-08-17-at-6.31.39-AM-1024x330.png" alt="" width="1024" height="330"  /> 

Prism offers couple dozen coins. All the majors (LTC, BTC, ETH) in addition to alts like Steem and&#8230; Potcoin?

Portfolio construction is easy. Just specify the total value of the portfolio and allocate percentages of that to different coins. Pre-set templates make this very easy. The whole experience reminded me a lot of Lending Club but without the asset details (e.g. interest rate, maturity).

An awesome feature would be some sort of details on the properties of each coin as you construct a portfolio. Some access to basic data that provides a bit of research to the user would be great. There&#8217;s no Morningstar rating (not that those are even useful for securities anymore), but maybe listing which exchanges trade a certain coin, how long it&#8217;s been around for, historical price movements. Simply pulling in data from coinmarketcap would go a long way.

## Prism Fees

Fees are high, at 2.5% + 0.05 ETH (edit: not 5%) for simply constructing a portfolio. In my case, that&#8217;s effectively $15 US for every $300 invested (as of August 16). Or 0.05 ETH for the 1 ETH I invested (edited for accuracy).

<img src="/newblog/wp-content/uploads/2017/08/Screen-Shot-2017-08-17-at-6.36.56-AM-1024x580.png" alt="" width="1024" height="580"  /> 

## Funding a Prism

I&#8217;m a [big fan of ENS (Ethereum Name Service)]({{ site.baseurl }}{% post_url 2017-07-08-ens-cyptocurrency-domain-name-scottshapiro-eth %}) Anything that skirts copying/pasting of public keys or photos of QR codes is a plus. Prism doesn&#8217;t yet integrate with ENS, so I had to lookup my public key and paste that. Like many services where you transfer coins as a first step, providing your “return address” is critical. Prism suggests using MEW but this would be easier with in-browser solutions like Metamask or in the future, Toshi. Or a direct integration from now sister company Keepkey.

## 10 minutes to fund

Prism gives you 10 minutes to initiate a transaction. It took me a few minutes to get my ETH transfer going. After a few failed attempts withdrawing from exchanges, I used MEW to fund. Prism quickly acknowledged that transfer and began its process of creating my Prism portfolio.

<img src="/wp-content/uploads/2017/08/Screen-Shot-2017-08-17-at-6.45.57-AM-1024x618.png" alt="" width="1024" height="618"  /> 

With the volatility in both the funding currency ETH and the dozens of currencies that one can construct a Prism portfolio wtih, it&#8217;s amazing that Prism is able to float that risk for 10 minutes. You never know what will happen with coin values even within a minute.

## Monitoring my prism

My prism is live on the ETH blockchain! For those who have access to Prism, [you can see the details here](https://prism.exchange/prism/0x8480A10a1dbFc6ab0A988D9513d596A21175A1CB). This does not appear to be visible to the public.

<img src="/wp-content/uploads/2017/08/Screen-Shot-2017-08-17-at-6.52.05-AM-1024x763.png" alt="" width="1024" height="763" /> 

I called my prism MoneroZ because it&#8217;s 50/50 Monero and Zcash. These aren&#8217;t supported by my hardware wallet and are more difficult than others to store and utilize, so I figured this is where Prism could offer me some value. BTC and LTC on the other hand are very simple to use.

I&#8217;m able to rebalance but not yet able to sell this Prism.

## Ideas for Prism&#8217;s roadmap

This is a very cool offering &#8211; using smart contracts on the ETH blockchain to manage synthetic portfolios. It&#8217;s hard enough to setup an account and trade on exchanges that for many people, Prism will be a good option for diversification. Prism removes a lot of complexity and enables access to a broad array of coins. There&#8217;s so much potential in this minimum viable product already, but below are some ideas of where it can go:

  * More **browser support** (e.g. Safari, Chrome) and ideally a native mobile app
  * Native integration with **Shapeshift** would be killer (the ability to not just exchange into another currency but to construct a portfolio from the Shapeshift UI). That said now that Keepkey is under the same roof, I should be able to do this from the Keepkey software too (which I hope expands beyond a Chrome app soon)
  * **Keepkey** could also be used for Prism login / authentication!
  * **ENS support** &#8211; copying/pasting Ethereum addresses or scanning QR codes is the worst. I want to use scottshapiro.eth whenever identifying my Ethereum public key.
  * Native integration with **3rd party exchanges** would be awesome for onboarding to Prism &#8211; if I have a portfolio in Poloniex that I want to turn into a Prism, imagine a one-click “prism-ize my portfolio” that liquidates my holdings for ETH, moves that ETH to a Prism and reconstructs whatever portfolio I had
  * **Public sharing** of a Prism would help stoke the ego of investors. Right now it&#8217;s all private and blocked behind a login. This is easy.
  * More detail on **portfolio construction** when building / rebalancing a prism &#8211; something like Vanguard provides when I&#8217;m allocating capital to different mutual funds
  * **Fees** are a bit high but hopefully that will come down soon (and are waived for the beta!). And also limits &#8211; right now the maximum size of a portfolio is 10 ETH but many investors will want orders of magnitude larger portfolios
  * Long term: more types of synthetic instruments. Prism today is effectively a swap, but you could imagine other exotic derivatives like interest rate / **proof of stake swaps** for coins like $NEO that generate GAS.
