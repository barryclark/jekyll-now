---
id: 380
title: 7 Baby Adventures in Cryptocurrency
date: 2018-02-09T15:23:47+00:00
author: Scott Shapiro
layout: post
guid: http://www.scottshapiro.com/?p=380
permalink: /cryptocurrency-lightning-network/
dpsp_networks_shares:
  - 'a:2:{s:8:"facebook";i:41;s:9:"pinterest";i:0;}'
dpsp_networks_shares_total:
  - "41"
dpsp_networks_shares_last_updated:
  - "1553829603"
categories:
  - Cryptocurrency
---
I&#8217;ve spent the last three weeks on parental leave. It&#8217;s been awesome getting to know [our daughter Ava](http://www.scottandsue.com/welcome-ava-julia/) better. But in between the hundreds of diaper changes, bottle feeds, and [5 S&#8217;s](https://www.happiestbaby.com/blogs/blog/the-5-s-s-for-soothing-babies), I managed to explore some cryptocurrency projects. Often early in the morning or late at night when mom and baby are sleeping.

Note that none of this is about price or trading, but rather application and utility of cryptocurrency. That&#8217;s so much more interesting than candlesticks and ICO&#8217;s. So let&#8217;s all focus more attention there!

_Below are seven of the adventures I undertook:_

### 1. Ava&#8217;s birth announcement on the blockchain

Beyond posting on Facebook and [Instagram](https://www.instagram.com/p/BeL0oVkHd5P), I wanted a way to memorialize Ava&#8217;s birth using cryptocurrency.

I tried Litecoin and Bitcoin, messing around with different fields. But it was too cumbersome to generate a transaction. So I turned to Ethereum. ETH was the easiest way to leave a message in a blockchain and have it be easily readable. Ava&#8217;s [birth announcement is forever embedded in Ethereum Block 4944064](https://etherscan.io/tx/0xe05c5e25b59aa5f4c818ab0f45af7fa27fc3e2fa2b7b0404f8a353f75401c13e).

<blockquote class="twitter-tweet" data-lang="en">
  <p lang="en" dir="ltr">
    Yesterday we welcomed our daughter to the world. We're ecstatic! Then today we recorded the announcement on the blockchain <a href="https://t.co/LNPp3MnAAq">https://t.co/LNPp3MnAAq</a>
  </p>

  <p>
    &mdash; Scott Shapiro (@scottshapiro) <a href="https://twitter.com/scottshapiro/status/954911654696828928?ref_src=twsrc%5Etfw">January 21, 2018</a>
  </p>
</blockquote>



Twenty days in, it&#8217;s been confirmed by over 100k nodes. I can&#8217;t wait for her to call me a dork for doing this!

[<img src="/wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-8.56.35-AM-1024x461.png" alt="" width="1024" height="461" class="alignnone size-large wp-image-381" srcset="/wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-8.56.35-AM-1024x461.png 1024w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-8.56.35-AM-300x135.png 300w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-8.56.35-AM-768x346.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://etherscan.io/tx/0xe05c5e25b59aa5f4c818ab0f45af7fa27fc3e2fa2b7b0404f8a353f75401c13e)

### 2. My name in litecoin and Bitcoin

The lack of readability in cryptocurrency addresses has annoyed me since day one. Cryptocurrency addresses are just a random string of letters and numbers. This is why I jumped on the [opportunity to own scottshapiro.eth](http://www.scottshapiro.com/ens-cyptocurrency-domain-name-scottshapiro-eth/).

For Bitcoin and Litecoin, an open source program called [Vanitygen](https://en.bitcoin.it/wiki/Vanitygen) lets you generate slightly more readable addresses. Like a personalized license plate, but without going to the DMV. The problem is that Vanitygen program uses a ton of computing power. It has to guess each time until it gets it right. Brute force. There are trillions of permutations. tried running it on my Raspberry Pi server at home, but it would have taken almost a week to generate the Bitcoin address I wanted. However, I was able to generate a Litecoin address easily (I love this coin for being so efficient) [LScottJCSQXkTJ4KRwZZkbC1HCSvN21e4H](https://ltc-bitcore3.trezor.io/address/LScottJCSQXkTJ4KRwZZkbC1HCSvN21e4H).

<blockquote class="twitter-tweet" data-lang="en">
  <p lang="en" dir="ltr">
    Compiled vanitygen on my Raspberry Pi to generate myself an LTC address: <a href="https://ltc-bitcore3.trezor.io/address/LScottJCSQXkTJ4KRwZZkbC1HCSvN21e4H">LScottJCSQXkTJ4KRwZZkbC1HCSvN21e4H</a>. It took ten minutes using 2 cores at 35,000 keys/second.
  </p>

  <p>
    &mdash; Scott Shapiro (@scottshapiro) <a href="https://twitter.com/scottshapiro/status/959564301676699650?ref_src=twsrc%5Etfw">February 2, 2018</a>
  </p>
</blockquote>



So I found a useful guide of how to run vanitygen on AWS. I rented 1000x more computing power than I had on my RPI, and after an hour and $1 I got the keys to the bitcoin address [1Scottu5rUaX8fsnBjXqJtC5pcmddHk7d](https://btc-bitcore3.trezor.io/address/1Scottu5rUaX8fsnBjXqJtC5pcmddHk7d).

Unfortunately I wasn&#8217;t able to generate Segwit addresses.

### 3. Running Cryptocurrency Nodes

I&#8217;ve been running an LTC node at pi.scottshapiro.com for several weeks (on and off). Lately it&#8217;s been off so that my Monero node can sync. I&#8217;m using the same Raspberry Pi with an USB SSD drive. But Monero syncing has taken forever, so I&#8217;ve shutdown the LTC note until that finishes. Only 25k blocks left. Stay tuned!

`2018-02-09 17:24:13.169 [P2P1]  INFO    global  src/cryptonote_protocol/cryptonote_protocol_handler.inl:1154    [51.175.180.162:18080 OUT]  Synced 1480879/1505955<br />
2018-02-09 17:24:19.161 [P2P0]  INFO    global  src/cryptonote_protocol/cryptonote_protocol_handler.inl:305     [2.138.234.154:49762 INC] Sync data returned a new top block candidate: 1480879 -> 1505957 [Your node is 25078 blocks (34 days) behind]`

### 4. Lightning!

I&#8217;ve also started running a Bitcoin node specifically for [Lightning Network](https://lightning.network). Lightning Network is the biggest development to cryptocurrency in 2018. Hands down. It enables off-chain transactions at very low costs while still maintaining a high level of security. Right now BTC on-chain transaction fees are back to being reasonable, but who knows when the network gets clogged an on-chain transactions become prohibitive. Lightning is still in the very early days but in just a month, almost 2,000 nodes are running on mainnet!

The Bitcoin blockchain is required to run a lightning node. But it&#8217;s almost 200GB and would take 6+ weeks to sync on a Raspberry Pi. Not wanting to invest in a beefy server at home, I turned to AWS again, running [a t2.medium instance](https://aws.amazon.com/ec2/instance-types/). Now that the blockchain is sync&#8217;d (took a day or so), I can downgrade it to a t2.micro instance. The extra 3GB of ram in the medium made a huge difference in syncing!

I found [a couple very](https://medium.com/@dougvk/run-your-own-mainnet-lightning-node-2d2eab628a8b) [recent tutorials](https://medium.com/tokensoft/tokensoft-lightning-node-how-to-connect-for-free-62b9aaec18b8) and setup TokenSoft&#8217;s Lightning Node. It&#8217;s awesome.

Connect with me as a peer on Lightning mainnet (no need to waste time on testnet, though be careful as you may lose funds)! `0206c7b60457550f512d80ecdd9fb6eb798ce7e91bf6ec08ad9c53d72e94ef620d@54.183.119.192:9735`

<img src="/wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-8.22.09-AM-1024x149.png" alt="" width="1024" height="149" class="alignnone size-large wp-image-385" srcset="/wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-8.22.09-AM-1024x149.png 1024w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-8.22.09-AM-300x44.png 300w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-8.22.09-AM-768x111.png 768w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-8.22.09-AM.png 1186w" sizes="(max-width: 1024px) 100vw, 1024px" /> 

### 5. Cryptocurrency Identity: Keybase and Blockstack

I&#8217;m fascinated with identity and have spent a lot of my career focused on this (see readable names above!). Keybase and Blockstack are two startups building decentralized identity platforms, and I went through the motions with each. Connect with me on Keybase: <https://keybase.io/scottshapiro> and Blockstack: <https://explorer.blockstack.org/name/scottshapiro.id>.

<img src="/wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-9.32.21-AM-1024x598.png" alt="" width="1024" height="598" class="alignnone size-large wp-image-388" srcset="/wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-9.32.21-AM-1024x598.png 1024w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-9.32.21-AM-300x175.png 300w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-9.32.21-AM-768x448.png 768w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-9.32.21-AM.png 1144w" sizes="(max-width: 1024px) 100vw, 1024px" /> 

### 6. Mining Cryptocurrency in the cloud

While using AWS and learning about Spot pricing of remnant sever inventory at deeply discounted prices, [I came across a guide](https://medium.com/@james.s.wiggins/get-rich-quick-by-mining-ether-with-aws-spot-c7b7a3bdc149) on how to use EC2 spot to mine Etherum. [I joined Nanopool](https://eth.nanopool.org/account/0xd6a22dc6bf1f8a200e1788d298b1e33a358ba9e7). Even though I&#8217;ll likely spend way more on AWS than I&#8217;ll earn in ETH, it&#8217;s fun just to see how cloud-based cryptocurrency works. So far I&#8217;ve mined $6.83 worth of ETH!

[<img src="/wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-9.28.45-AM-1024x462.png" alt="" width="1024" height="462" class="alignnone size-large wp-image-387" srcset="/wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-9.28.45-AM-1024x462.png 1024w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-9.28.45-AM-300x135.png 300w, /wp-content/uploads/2018/02/Screen-Shot-2018-02-09-at-9.28.45-AM-768x347.png 768w" sizes="(max-width: 1024px) 100vw, 1024px" />](https://eth.nanopool.org/account/0xd6a22dc6bf1f8a200e1788d298b1e33a358ba9e7)

### 7. Cryptocurrency housekeeping

While I haven&#8217;t been focused on trading cryptocurrency or ICO&#8217;s, I have been doing a lot of housekeeping. I setup a Lisk nano wallet, found an old Decred wallet. I redeemed a [Prism I had setup on Shapeshift](http://www.scottshapiro.com/prism-shapeshift-first-impressions/). I moved coins off of Exchanges to hardware wallets. If you&#8217;re not in the habit of doing this, see the latest about [Binance being down for over a day](https://cointelegraph.com/news/binance-exchange-halts-trading-withdrawals-over-server-issue-assures-no-hack).

_I&#8217;m heading back to work shortly, but still have some time before then to wrap up some of these projects. I want to spend on Lightning Network, for example. Shoot a me a note if there&#8217;s anything else I should look into as well!_
