---
layout: post
title: "An intro to payments: Value, liabilities and networks - Part 2"
excerpt_separator: <!--more-->
tags: [payments, networks, banking, cryptocurrencies]
---

## Going international 

![On the rails](../images/payments/jk-gJhev0YgUcE-unsplash.jpg)
> Photo by JK on Unsplash

 In the [previous installment][1] of this series, I talked about the history behind payment systems and described how 
 domestic payments work.  

 In this post I will cover 
 * cross-border "traditional" payments
 * pull payments (a.k.a. direct debit)
 * and discuss some of their pros and cons 
    
<!--more-->

Take a look around you.  
Try to count how many items **only** originate from your country alone. Chances are you have not managed to count many.
 
With international trade so prevalent, money crossing borders is crucial to keep our world connected
But how does water turn into oil? <sup>[1](#footnote_1)</sup>

### International payments - Nostro/vostro

The oldest form of cross-border payment mechanism is via [correspondent banking][3] (a.k.a. [nostro/vostro][4] accounts).

![International payment - Nostro_vostro](../images/payments/international-payment-nv.png)

In this model (line 4) PurpleBank (on the right) has a correspondency relationship with RedBank (on the left). 
What this means is that RedBank holds a bank account under its name in PurpleBank.

When PurpleBank customer D wants to send money to RedBank customer E, what she does is deposit the equivalent amount to 
RedBank's own account inside PurpleBank. This deposit has a reference that the amount is intended for E.

RedBank sees the amount deposit confirmed (possibly intraday, since it is all part of PurpleBank's systems) and credits 
the account of E with the equivalent amount on the other side. The deposit in E's account comes from RedBank's "own" money.

Notice that in the above scenario, there was no cross-border transfer of value or even a single payment message. <sup>[2](#footnote_2)</sup>  
The remote account (owned by RedBank, held in PurpleBank) is part of RedBank's assets, even though it is in a far away 
place. <sup>[3](#footnote_3)</sup>

This setup is the money equivalent of a teleportation gate. It is the legal agreements, the way [balance sheets work][8] 
and ledgers on both sides of the correspondency which make this possible.   

Correspondency banking used to be the **only** way cross-border payments happened back in the day, but now it almost 
obscure and little known. So much so that it was used as a window for [insiders to bypass][6] the [2015 Greek capital controls][6]
with almost noone realising (all credits go to the [original source][5]).

There are 2 issues with using nostro/vostro accounts at a large scale.  
* They were much easier to setup and implement as a bilateral agreement when world currencies were on [fixed exchange rates][9]. 
In the modern world, currencies fluctuate momentarily which makes it harder to track the value of transactions. 
* There is always [counter-party risk][10] from the side of the nostro holder (in the above example RedBank). <sup>[4](#footnote_4)</sup>  
This was demonstrated in a great way in 1974 with the [Herstatt Bank][11] bankruptcy.

### International payments - FX markets & Central clearing

Addressing the above 2 aspects we have  
* Fluctuating currencies
currencies traded in pairs 
spot price determined in [FX markets][13]
since these are primarily bilateral [OTC][14] trades 
international money movements between 2 banks 
involve the purchase of the equivalent amount of foreign currency from an FX market broker  

* Risk 
as with all other financial transactions 
using a [clearing house][15] as a guarantor 
reduces counter-party risk

Putting this back in our diagram we have line 4.

![International payment - Facilitator](../images/payments/international-payment-cb.png)

The fundamental difference between line 3 (nostro/vostro) and 4 (central clearing and facilitation) is not so much that 
it has some 3rd party facilitating the international movement of funds. 
It is **when** the payment will be considered [settled][16] as opposed to netted off or held as a liability from the other bank
(which is the case with nostro/vostro).

Let's take an extreme example of efficiency, EU's [TARGET2][17] settlement system.  
In TARGET2 all transactions are cross-border but they have the benefit of a single currency. This makes the underlying 
operating principles roughly similar with national payment systems [described in part 1][1]. In TARGET2 it is [ECB][18] 
which holds the virtual central pool of money and EU central banks play the role of the guarantor for commercial banks. 
The core aim is to replenish the outstanding balances by [the end of the day][19] and keep the system whole. However, the 
flows being international means they are usually [unbalanced][21]. <sup>[5](#footnote_5)</sup>   
This results in the receiving country's central bank lending the sending country's from the excess of the money it has 
just received. This permanent state of [cross-border imbalance][40], fuelled by trade, is the subject of much discussion.    
  
The general case of cross-currency payments does not have the slick operation of TARGET2.  
The mechanisms employed are more complex as there are 3 hurdles to overcome.

**Currency conversions**  
As discussed previously, large global [market makers][22] buy big sums of foreign currency and then re-sell that "down 
the food chain" to brokers and smaller banks for a fee. So, in the process of any cross-border payment there will be a 
transaction to convert currency by using the "FX markets". 

**Counter-party risk**  
Since there is no "Planet Earth Central Bank" to guarantee all global transactions, international value transfers are 
facilitated and guaranteed by a [number][23] of regional and [international][24] settlement systems and clearing houses.  
These settle transactions between central banks, companies and everything in between.    

**Routing**  
The global financial system is a mesh (and a mess) of interconnected nostro/vostro accounts between the thousands of 
banks in the world. For a payment to find its way from point A to point B (say, from Mexico to Vietnam), it needs to 
"navigate" 3, 4 or more of these correspondent banking "hops".  
For this reason the [SWIFT][25] network has been setup to [facilitate][26] the actual payment routing.  
At its core, SWIFT is very similar to the internet [IP routing][27] infrastructure:  
* the [BIC][28] and [IBAN][29] are the [IP address][30], 
* the banks are the routers, and
* the SWIFT [messages][31] are the IP packets.

However, unlike in IP where routers just forward packets, in SWIFT 
* intermediary banks also "forward" the payment amount to the next bank in the chain, and
* liberally take a [cut from the cake][32] for this.

### A brief pause

![Pause for breath](../images/payments/wade-austin-ellis-sf0qE4XehbI-unsplash.jpg)
> Photo by Wade Austin Ellis on Unsplash

It is worth pausing for a minute and discussing these options. 

Nostro/vostro is the simplest form of cross-border financial plumbing 
but it is also the single "lego block" used to build the complex infrastructure called SWIFT
and its younger EU cousin [SEPA][33]

Desite the apparent elegance of international payments, there are a number of issues affecting them 
to varying degrees

### Reliability 

The farther away in "financial proximity" the more unreliable the payment execution is
Timings vary wildly
https://fexco.com/fexco/news/how-long-international-bank-transfers-take/

This is down to 2 reasons

****
payments are primarily "push"
the payer sends money to the payee
the payer's responsibility to give the receiver account "coordinates" (i.e. bank account number) correctly

banks around the world treat international payments differently 
due to [KYC][25], [AML][26] and systems' design 
requiring different levels of detail (e.g. account owner name, address, etc) 

the more data points required as input the higher the possibility for mistakes in account numbers 
surprisingly large number of manual processing and corrections

This affects SWIFT musch more than SEPA, due to the latter 
taking advantage of enforced common standards in the European zone

**System processing**  
[credit and debit messages][23] between banks are almost instant
even [around the world][24]  
but processing them is slow 
settlements are at end of day
the more hops further away the slower the settlements
delays due to timezones and business day cut-off times

### Trust 


Surprisingly 
Target2 not trusted
https://www.telegraph.co.uk/business/2019/06/04/german-bundesbank-comes-clean-euro-default-risks-italys-parallel/
https://www.handelsblatt.com/today/finance/target2-when-is-a-trillion-euro-not-a-trillion-euro/23582376.html?ticket=ST-567213-S69wymscfit5pWXBKtad-ap4

### Geopolitics

The world is turning multi-polar.  
Whether it is [China-US-EU][34] or some [other][35] [combination][36] is of little importance. 

What is important to note is the disproportionate dominance of a single country and its currency (US dollar) in the 
global financial system.  
Just a cursory glance at the actual [topology][37] of the [SWIFT network][38] is enough to prove that it is global in name only. 
95% of the network coverage goes through US financial institutions. 
This makes it laughably easy for the US to [weaponize][39] its currency and for the world to comply. 

This is a strategic threat which cannot be overstated.

## Pull payments

![Pull it out](../images/payments/gray-industrial-machine-during-golden-hour-162568.jpg)
> Photo by Pixabay on Pexels

### Direct Debit
 
### Cards 

![Card payments](../images/payments/payments-card.png)

Special case is mobile payment processors
like GooglePay and ApplePay




## Payment rails 

### OpenBanking

TBTF


### Paypal

### M-Pesa

![Mobile payments](../images/payments/payments-mobilemoney.png)


### Remittance services

![Remittance payments](../images/payments/payments-remittance.png)

https://en.wikipedia.org/wiki/Hawala

## ...and the future

### Digital IOUs

![IOU payments](../images/payments/payments-iou.png)

### Libra

![Libra payments](../images/payments/payments-libra.png)

### Government cryptocurrencies

![Government crypto payments](../images/payments/payments-gov-crypto.png)

### Proof-of-work money 

![Crypto payments](../images/payments/payments-crypto.png)



## Footnotes

1. <a name="footnote_1></a>To use an analogy from [part 1][1].
2. <a name="footnote_2"></a>In the olden days, banks would send a telegraphic message and later Telex.  
In the modern day, for all that we know, RedBank may be employing a person to just press [Ctr+F5][7] 
all day, to see new credits in their nostro account. 
3. <a name="footnote_3"></a>Which means that by giving money to account E, RedBank did not just "magic" some money up.  
It just counter-balanced its newly acquired asset (money in its PurpleBank account), with a liability (giving money to E). 
So, all is zero in the end. 
4. <a name="footnote_4"></a>If PurpleBank proves to be dodgy and its deposits evaporate, then RedBank's asset (their 
account in PurpleBank) is worth nil and has to be written off.  
5. <a name="footnote_5"></a>For example, the Spanish buying more German cars than the Germans [jamon iberico][20]. 



  [1]: https://sgerogia.github.io/Payments-Intro-Part1/
  [2]: https://sgerogia.github.io/Payments-Intro-Part1#mental_model
  [3]: https://www.investopedia.com/terms/c/correspondent-bank.asp
  [4]: https://en.wikipedia.org/wiki/Nostro_and_vostro_accounts
  [5]: https://www.techiechan.com/?p=2529
  [6]: ../images/Greel_Bank_Decision.pdf
  [7]: https://www.wikihow.com/Force-Refresh-in-Your-Internet-Browser
  [8]: https://www.guru99.com/assets-and-liabilities.html
  [9]: https://en.wikipedia.org/wiki/Gold_standard
  [10]: https://www.investopedia.com/terms/c/counterpartyrisk.asp
  [11]: https://en.wikipedia.org/wiki/Herstatt_Bank
  [12]: https://en.wikipedia.org/wiki/Capital_controls_in_Greece
  [13]: https://en.wikipedia.org/wiki/Foreign_exchange_market
  [14]: https://en.wikipedia.org/wiki/Over-the-counter_(finance)
  [15]: https://en.wikipedia.org/wiki/Clearing_house_(finance)
  [16]: https://en.wikipedia.org/wiki/Settlement_(finance)
  [17]: https://en.wikipedia.org/wiki/TARGET2
  [18]: https://en.wikipedia.org/wiki/European_Central_Bank
  [19]: https://www.youtube.com/watch?v=fstoINqXJK8
  [20]: https://en.wikipedia.org/wiki/Jam%C3%B3n_ib%C3%A9rico
  [21]: https://www.fxstreet.com/analysis/fuse-is-lit-target2-imbalances-hit-crisis-levels-an-email-exchange-with-the-ecb-over-target2-201702270841
  [22]: https://www.investopedia.com/terms/m/marketmaker.asp
  [23]: https://www.corporatetobank.com/resources/payment-clearing-and-settlement-systems/
  [24]: https://www.bis.org/banking/finserv.htm?m=4%7C20
  [25]: https://en.wikipedia.org/wiki/Society_for_Worldwide_Interbank_Financial_Telecommunication
  [26]: https://transferwise.com/gb/blog/everything-you-need-to-know-about-swift-network
  [27]: https://en.wikipedia.org/wiki/IP_routing
  [28]: https://www.swift.com/standards/data-standards/bic
  [29]: https://www.swift.com/standards/data-standards/iban
  [30]: https://en.wikipedia.org/wiki/IP_address
  [31]: https://en.wikipedia.org/wiki/SWIFT_message_types
  [32]: https://blog.revolut.com/swift-sepa-how-international-money-transfers-actually-work/
  [33]: https://en.wikipedia.org/wiki/Single_Euro_Payments_Area
  [34]: https://tribune.com.pk/story/1945783/6-emerging-tripolar-world-china-america-europe/
  [35]: https://carnegieendowment.org/2011/02/09/tri-polar-world-india-china-and-united-states-in-21st-century-event-3153
  [36]: https://www.asiatimes.com/2019/02/opinion/tripolar-world-china-ascendant/
  [37]: https://en.wikipedia.org/wiki/Network_topology
  [38]: https://www.swiftinstitute.org/wp-content/uploads/2014/09/SWIFT-Institute-Working-Paper-No.-2012-006-Network-Analysis-of-Global-Payment-Flows_v5-FINAL.pdf
  [39]: https://www.ft.com/content/8f16f8aa-e104-11e8-8e70-5e22a430c1ad
  [40]: https://www.ecb.europa.eu/pub/pdf/scpwps/ecb.wp2076.en.pdf