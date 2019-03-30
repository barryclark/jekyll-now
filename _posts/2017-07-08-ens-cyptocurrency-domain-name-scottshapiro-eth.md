---
id: 255
title: 'My cyptocurrency domain name: scottshapiro.eth'
date: 2017-07-08T15:41:11+00:00
author: Scott Shapiro
excerpt: "I recently acquired scottshapiro.eth as my cryptocurrency domain name. Here's how I used Ethereum Name Service (ENS) to buy and set it up."
layout: post
guid: http://www.scottshapiro.com/?p=255
permalink: /ens-cyptocurrency-domain-name-scottshapiro-eth/
dpsp_networks_shares:
  - 'a:2:{s:9:"pinterest";i:0;s:8:"facebook";i:1183;}'
dpsp_networks_shares_total:
  - "1183"
dpsp_networks_shares_last_updated:
  - "1553829604"
image: /newblog/wp-content/uploads/2017/07/Screen-Shot-2017-07-08-at-3.22.56-PM-1.png
categories:
  - Cryptocurrency
  - Ethereum
---
_I&#8217;m always on the hunt for interesting applications of cryptocurrency. Ones that actually solve everyday problems. Even better if they solve a problem I&#8217;m experiencing. When I heard of [Ethereum Name Service](http://registrar.ens.domains/), I immediately jumped on it._

## What is Ethereum Name Service?

ENS ([Ethereum](https://www.investinblockchain.com/what-is-ethereum/) Name Service) makes ethereum addreses readable and writable. Just like how DNS (Domain Name Service) makes website addresses easy to read and write. Instead of a garbled 40 character hexadecimal string like [0xd6a22dc6bf1f8a200e1788d298b1e33a358ba9e7](https://etherscan.io/address/0xd6a22dc6bf1f8a200e1788d298b1e33a358ba9e7), with ENS I can represent my Ethereum address as [scottshapiro.eth](https://etherscan.io/enslookup?q=scottshapiro.eth). Want to send me a few ether? This makes it much easier.

## I bought my Ethereum Name for $3.00

I purchased scottshapiro.eth for 0.01 Ether (about $3 in June 2017) from [registrar.ens.domains](https://registrar.ens.domains/). I first had to setup a web browser that supported Ethereum Smart Contracts. I used the plain old [Google Chrome browser with the Metamask extension](https://metamask.io/). Once that was setup, I created a wallet in Metamask and transferred some Ether.

### Bidding

To place a bid for a domain on ENS, I had to initiate a smart contract. Metamask makes this easy. In the background, my browser called the function `startAuctionsAndBid().` This does what it sounds like: it places an opening bit and starts the auction, which lasts for a few days. It&#8217;s not just one computer that receives this requests, but the whole Ethereum network. In fact, you can see that the code for ENS is public  
[  
](https://github.com/ethereum/ens/blob/5035ed93028ade4183df24c3b28a0b58e9f759b1/contracts/HashRegistrarSimplified.sol#L360) [<img src="/wp-content/uploads/2017/07/Screen-Shot-2017-07-08-at-3.37.16-PM.png" class="alignnone size-full wp-image-263" height="132" alt="" width="768"  />](https://github.com/ethereum/ens/blob/5035ed93028ade4183df24c3b28a0b58e9f759b1/contracts/HashRegistrarSimplified.sol#L360)

So all I had to do was enter a price and click “submit bid” in my web browser. Then Metamask popped up and asked me to confirm this. Instead of going to paypal or entering my credit card number, my built-in Ethereum wallet would send payment for my bid. I clicked “accept” and within seconds, the Ethereum Network received and started confirming my bid. As of today, [this has been independently confirmed by 63,814 independent computers in the network](https://etherscan.io/tx/0x03c22347dc72836cfd412ce6e921c516e0e23fc41bf907b655cbecca0fda5c19)!

<img src="/wp-content/uploads/2017/07/Screen-Shot-2017-07-08-at-3.22.26-PM-1024x372.png" class="alignnone size-large wp-image-258" width="1024" height="372" /> 

I ended up winning the auction, uncontested. There are a number of Scott Shapiros out there who have expressed interest in [scottshapiro.com](http://scottshapiro.com/) but scottshapiro.eth is a little more obscure.

### Finalizing the ENS auction

Now I had to reveal my bid, finalize the auction, and then actually do something with the domain name that I won. Each of these steps required me to send a 0 Ether transaction on the network that contained only metadata. Instead of just going to “my acccount” and editing your profile like you&#8217;d do on a typical website, every change you make with a decentralized app on Ethereum requires you to send a transaction. This gets expensive as it can cost a dollar or five each time, depending on how busy the network is and how complicated your transaction is.

### Configuring scottshapiro.eth

I followed [a tutorial on reddit that was simple to setup](https://www.reddit.com/r/ethereum/comments/6clvs6/a_quick_guide_on_getting_an_ens_name_and_setting/). While I could deploy my own resolver to tell the Ethereum Network what scottshapiro.eth should point to, I chose to use the [ENS Public Resolver](https://etherscan.io/address/0x1da022710df5002339274aadee8d58218e9d6ab5) by telling ENS to `[setResolver()](https://etherscan.io/tx/0xe3f39b7ab969f54c30f2505026fe04434f742e232e5a43289b98b0cf8f647388)`. Now the whole network knows that when someone wants to know where scottshapiro.eth should point it, it asks the public resolver. I can always change that to another resolver in the future if I want.

Next I had to tell the Public Resolver where I wanted scottshapiro.eth to point to. I chose the same wallet I setup with Metamask that I used to bid on scottshapiro.eth in the first place. Kinda meta. This time I loaded up my wallet in [MyEtherWallet](http://myetherwallet.com/) because I had to use the `[setAddr()](https://etherscan.io/tx/0x9f181183c929de88b63e23a8ab5e03d34f6d58fd1629e2b867ea0aecc7f60234)`function that the Public Resolver offered.

I then [sent the author of the tutorial a small donation](https://etherchain.org/tx/0x817016be23054ed5d8e9ba70ab92519e351210cd6f98edf1d4384bfb21928ef5), and encoded a message in hexadecimal.

<img src="/wp-content/uploads/2017/07/Screen-Shot-2017-07-08-at-3.29.27-PM-1024x88.png" class="alignnone wp-image-259 size-large" width="1024" height="88" alt=""  /> 

## ENS is clunky but provides a view into the future

  * ENS is not too different from buying a domain name in the 90&#8217;s. Expensive, lots of steps, unclear if you&#8217;re doing it right. Twenty years later, it&#8217;s a piece of cake to buy a domain name. No doubt ENS will follow the same evolution.
  * Ethereum smart contracts are expensive to operate. I spent more on the process than I did on the domain name! Each of the six steps in the process cost between tens of cents and several dollars (placing the bid, revealing the bid, finalizing the auction, claiming the domain, setting the resolver, setting the address).
  * Geth, MyEtherWallet, Metamask, Mist are all great tools that enable smart contracts in the command-line or browser, but these are way too complicated for the average individual. Products like Toshi from Coinbase will make smart contracts much more accessible.
  * There&#8217;s no easy way to get notified if someone outbids you. I suppose you could write an app that checks an auction every minute and emails you, but otherwise you just have to go back to the ENS website and manually check.
  * There&#8217;s also a prototype to get [ENS and DNS to work together](https://github.com/ethereum/ens/blob/master/docs/dns.rst), so that you can point a .eth domain to a website. I&#8217;ll try that when it&#8217;s more mature.
