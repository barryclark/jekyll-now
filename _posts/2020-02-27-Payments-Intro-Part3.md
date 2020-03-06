---
layout: post
title: "An intro to payments: Value, liabilities and networks - Part 3"
excerpt_separator: <!--more-->
tags: [payments, networks, payment rails, cryptocurrencies, bitcoin, libra, remittances]
---

## On the rails 

![On the rails](../images/payments/christian-holzinger-ellaVGqPgww-unsplash.jpg)
> Photo by Christian Holzinger on Unsplash

*In the previous 2 instalments ([1][1], [2][2]) of this series, I talked about the history behind payment systems and 
described how domestic and international payments work.*  

*In this post I will cover* 
 * *modern payment "rails"*
 * *blockchain-based systems, and* 
 * *close the "trilogy" with some parting thoughts.* 
    
<!--more-->

### Mobile money  

Mobile money (or [M-Pesa][3] as is widely known from its initial Kenyan incarnation) is the answer to the question  
> How do you provide digital financial services to third world populations, where the only technological device 
> available is an [indestructible brick phone][5]?

It seems that the populations had already found the answer themselves: [swapping of airtime][4].  
M-Pesa was just the glossy version of an existing unofficial practice.

![Mobile payments](../images/payments/payments-mobilemoney.png)

Let's see how it works in principle.

1. The Sender wants to top up her mobile money account balance.  
She sends the equivalent amount to the Telco's bank account (V).
2. The Telco is notified that a new deposit was made and increases her balance.
3. The Sender can now make a payment using M-Pesa's mechanisms (e.g. an [STK][8] application with secure SMS) to the 
Receiver. 
4. The transaction is recorded on the Telco's ledger and the account balances are adjusted.

The Receiver can use the balance for a mobile payment in the ecosystem or convert the amount into "real world" 
money and paid to her account (lines 5, 6).  

From its inception, M-Pesa was meant to be an [on-ramp][7] / [off-ramp][6] system, parallel to the "real" 
financial world. In practice, even to this day, the off-ramping (5, 6) is rarely, if ever, exercised. This is a 
combination of the plain lack of bank accounts and the [exorbitant withdrawal costs][9], up to 20%.  
This last statement reveals a gross simplification of the above diagram: the vast majority of on- / off-ramping 
does not happen through bank accounts. It takes place through a vast network of [street agents][10], who convert 
cash into mobile money, taking a commission.  
Street agents are the equivalent of a bank's brick-and-mortar network. The extremely low [capex][11] 
to setup an agency, gave telcos an advantage of quick scale. 

Since everything happens within one IT system (the telco's servers), transfer and settlement is instant. This is 
combined with the mobile phone's PIN, providing a rudimentary layer of security.    
This level of convenience and the lack of a viable alternative, led to African telcos becoming the de-facto 
financial infrastructure is some countries. <sup>[1](#footnote_1)</sup> This ubiquity makes the off-ramp 
almost unnecessary. It took years for the West to achieve a [similar level][13] of customer convenience.    

Despite their importance and the huge commissions made, telcos were very lightly regulated in most countries until 
recently. Concepts like [segregation of funds][14] are only now [being addressed][15], with telcos held to the same 
standard as banks are. 

#### E-money

Based on e-mail
trusted third party 

to facilitate e-commerce 
careful UX and web integration in the early internet days  

WeChat and Alipay are similar 
size
Banking services, lending
China is command-and-control capitalism (link) 
these financial services are deeply integrated with the state apparatus

### OpenBanking



Originates from PSD2 directive

walled garden of banks and data

TBTF

disintermediate banks 
and commoditize them 

UK ingeniously front-runned the roll-out of PSD2 in Europe

billion $$ gamble which paid off
https://www.finextra.com/newsarticle/35199/uk-fintech-scene-sees-record-investment-in-2019
https://www.consultancy.uk/news/22152/uk-fintech-investment-doubles-to-2-billion



### Remittance services

We saw in part 2 how complex (and more often than not complicated) international payments are 

What if there was a magic way of sending value cross-border without anything actually crossing borders?
Sounds weird?
This is where remittance services come in

![Remittance payments](../images/payments/payments-remittance.png)

The magic happening behind the scenes is netting off of flows
https://www.kantox.com/en/glossary/payment-netting-2/

In practice this works like this 
Sender having an account in RedBank in the Eurozone wants to send money to the Receiver 
having an account in PinkBank in the UK
1. Sender logs in to Remittance Service (RS) and enters her desired trade. Say, convert €100 to GBP and send to the 
Receiver's GBP account
RS gets the current spot price (link?) and provides the details of its Euro bank account (R1)
The transaction for now is still pending in RS's ledger
Sender has an alloted amount of time to send the funds, or the transaction is voided
2. The Sender makes the transfer (1)
This is usually a local transfer using the mechanisms described in part 1 (link?) 
3. RS gets a notification that the amount has been deposited in its R1 account
The transaction is marked as "funded" 
4. RS then instructs its GBP account (R2) to pay out the GBP equivalent, at the rate that the Sender agreed.
5. Again using a local payment mechanism (e.g. Faster Payments in the UK), Receiver gets the money
The transaction is then marked as completed in RS's ledger and the books are balanced
 
Let's pause here and unwrap the phrase "the books are balanced" 
In step 2 RS's account R1 received €100, so RS's assets increased by €100
By sending out the equivalent amount in GBP in step 5
overall RS no longer owns the €100
By nominally "securing" the FX rate at the moment of transfer, the books are balanced

This setup greatly accelerates cross-border transactions 
as there is no need for SWIFT messages or nostro/vostro movements
only requirement is that R2 has the required cash buffer to service the payouts  

The importance of the FX rate comes into play when we have the reverse flow 
Let's say that Receiver wants to return the received amount
The steps are followed in the reverse order and the balances in the 2 accounts (R1, R2) change accordingly

This is the power of netting off flows
RS takes a fee out of each transaction as an FX merchant would, 
but actually moves a fraction of the transacted amounts 
This fraction is dependent on the https://en.wikipedia.org/wiki/Balance_of_payments between the 2 currencies
If the flows between Euro and GBP are balanced over time, then the balances of R1 and R2 will find an equilibrium  
If we imagine that there is an imbalance of 5% more payments Euro-to-GBP than GBP-to-Euro, then R1 will be needing a 
periodic 5% topup 
Depending on the size of the short-fall this can be covered in any number of ways
* a periodic international payment from R2 to R1 to re-balance the books (line 5)
the FX fees paid by RS will be for a fraction of the fees it has collected for the total flows
* interest accrued on R1, or
* local borrowing (if the cost of capital is really-really cheap)
In short, the more balanced a currency pair, the more profitable for the RS

Some currency pairs are more imbalanced than others 
This is especially the case in the remittances market 
where emigrants send money back home (e.g. from USD to Mexican Pesos) 
This is one of the reasons why, past a certain size, all remittance providers try to expand into the 
business payments market to balance their flows
e.g. countries with high emigration are net importers, i.e. a lot of money leaving the country as business payments  

The myriad of Hawala agents of old would be proud 
https://en.wikipedia.org/wiki/Hawala

## ...and the future

### Digital IOUs

Will consider Ripple 
Although stellar is practically the same thing
https://www.fxempire.com/education/article/ripple-vs-stellar-will-there-be-only-one-winner-521999

![IOU payments](../images/payments/payments-iou.png)



Entry point is an issuing gateway
https://xrpl.org/become-an-xrp-ledger-gateway.html

Trust lines are issued IOUs 
https://xrpl.org/issued-currencies-overview.html

XRP is a bridge currency


Deflationary
https://xrpl.org/reserves.html
https://xrpl.org/transaction-cost.html

Lumens are inflationary

### Libra

Only mentioning it here as a contrast
without going into its technical details

Libra is an asset-backed digital currency

![Libra payments](../images/payments/payments-libra.png)

Let's quickly examine how Libra works (making a lot of simplifications for brevity, where Facebook is the Libra foundation yada yada)
A Sender wants to send an amount of €100 to the Receiver via Libra 
both of them have the Calibra wallet installed

1. Sender needs to fund her wallet with the Libra equivalent of €100
For this reason she sends €100 to Facebook's bank account (over-simplifying, payment would be facilitated via card, 
OpenBanking or some other mobile-friendly way)
2. Facebook is notified of the amount 
and **creates** the equivalent amount in Libra
and funds Sender's wallet 
This is what asset-backed means: tokens are created on the fly, as and when the backing bank account (or asset store) receives
an asset
3. Sender can then use the Calibra wallet to issue a blockchain payment
Blockchain nodes are the trusted ones of the Libra members
4. ...and a few seconds later the Receiver sees her Libra balance increasing 

If the above looks very familiar, it's because, well... it is!

At its core Libra is **not** a currency 
it digital IOU, a token
steps 1 and 2 are the on-ramp (link) to the platform
what is missing on the other side is the off-ramp, where Libra would be converted to GBP

But this is intentionally missing 
because it was marketed from the start as a global currency, bank the unbanked and all that nice stuff

I honestly do not know the future 
but I strongly believe that at some point Libra is going to become a case study for Silicon Valley's
endemic delusion of grandeur and detachment from reality

Why not baptize it as a remittance service, a digital IOU, helping African 
micro-businesses to trade internationally,... something fairly conspicuous, woke-ish and under the radar.
Facebook already had the network effect and partnerships in place to make it a silent success and de facto global 
payments network overnight

But it had to be a revolutionary global currency!
Taking away the only thing that makes a government a government
Revolutions don't start with press statements

### Proof-of-work money 

![Crypto payments](../images/payments/payments-crypto.png)

### Government cryptocurrencies

![Government crypto payments](../images/payments/payments-gov-crypto.png)

MMT
Helicopter money
demonetization
direct control of velocity of money

panopticon control 

sanctions
direct taxation

role of banks?
multi-sig wallet providers?
pointless to maintain channels

event equivalent to asteroid strike
before and after

## Stay tuned... 

![Stay tuned](../images/payments/flat-screen-television-1201996.jpg)
> Photo by JESHOOTS.com from Pexels

In the next and final installment, we will go over  
* some modern "payment rails" developed in the last decade, 
* the emerging role of crypto-currencies into the "payments mix", and
* wrap up with some parting thoughts.

## Footnotes

1. <a name="footnote_1"></a>E.g. [half of Kenya's GDP][12] is processed through mobile payments.


  [1]: https://sgerogia.github.io/Payments-Intro-Part1/
  [2]: https://sgerogia.github.io/Payments-Intro-Part2/
  [3]: https://en.wikipedia.org/wiki/M-Pesa
  [4]: https://citeseerx.ist.psu.edu/viewdoc/download;jsessionid=F00099E30481904D5EB009DB1E9349AB?doi=10.1.1.501.7811&rep=rep1&type=pdf
  [5]: https://www.techtimes.com/articles/197815/20170219/a-look-back-before-the-comeback-why-many-loved-the-nokia-3310.htm
  [6]: https://www.dictionary.com/browse/off-ramp
  [7]: https://www.dictionary.com/browse/on-ramp
  [8]: https://en.wikipedia.org/wiki/SIM_Application_Toolkit
  [9]: https://www.mtn.co.ug/insight/mobile-money-tariffs/
  [10]: https://en.wikipedia.org/wiki/Mobile_payment#/media/File:Mobile_money_outlet.jpg
  [11]: https://www.investopedia.com/terms/c/capitalexpenditure.asp
  [12]: https://www.paymentscardsandmobile.com/mobile-money-transactions-half-of-kenyas-gdp/
  [13]: https://www.theguardian.com/money/2016/sep/10/contactless-cards-wave-pay-oyster-london-use
  [14]: https://www.handbook.fca.org.uk/handbook/CASS/7/13.html
  [15]: https://drive.google.com/open?id=1fp3MZ5GL1OQm55aapuEsK73jCzvBRnl9