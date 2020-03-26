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

*In this post I will*  
 * *cover modern payment "rails",*
 * *blockchain-based systems, and* 
 * *close the "trilogy" with some parting thoughts on the future and how the unfolding [Covid-19][78] pandemic will 
 accelerate the evolution of the payment systems.* 
    
<!--more-->

### E-money

#### M-Pesa  

Mobile money (or [M-Pesa][3] as is widely known from its initial Kenyan incarnation) is the answer to the question  
> How do you provide digital financial services to third world populations, where the only technological device 
> available is an [indestructible brick phone][5]?

It seems that the populations had already found the answer themselves: [swapping of airtime][4].  
M-Pesa is just the glossy version of an existing unofficial practice.

![Mobile payments](../images/payments/payments-mobilemoney.png)

Let's see how it works in principle.

1. The Sender wants to top up her mobile money account balance.  
She sends the equivalent amount to the Telco's bank account (V).
2. The Telco is notified that a new deposit was made and increases the Sender's mobile money balance.
3. The Sender can now make a payment using M-Pesa's mechanisms to the Receiver (e.g. using an [STK][8] application with 
secure SMS). 
4. The transaction is recorded on the Telco's ledger and the account balances between Sender and Receiver are adjusted.

The Receiver can use the balance for a mobile payment in the ecosystem or convert the amount into "real world" 
money, which is then paid to her account (lines 5, 6).  

From its inception, M-Pesa was meant to be an [on-ramp][7] / [off-ramp][6] system, parallel to the "real" 
financial world. In practice, even to this day, the off-ramping (5, 6) is rarely, if ever, exercised. This is a 
combination of the plain lack of bank accounts in developing markets and the [exorbitant withdrawal costs][9], up to 20%.  
This last statement reveals a gross simplification of the above diagram: the vast majority of on- / off-ramping 
does not happen through bank accounts. It takes place through a vast network of [street agents][10], who convert 
cash into mobile money, taking a commission.  
Street agents are the equivalent of a bank's brick-and-mortar network. The extremely low [capex][11] 
to setup an agency gave telcos an advantage of quick scale. 

Since everything happens within one IT system (the telco's servers), transfer and settlement is instant. This is 
combined with the mobile phone's PIN, providing a rudimentary layer of security.    
This level of convenience and the lack of a viable alternative, led to African telcos becoming the de-facto 
financial infrastructure is some countries. <sup>[1](#footnote_1)</sup> This ubiquity makes the off-ramp 
almost unnecessary. It took years for the West to achieve a [similar level][13] of customer convenience.    

Despite their importance and the huge commissions made, telcos were very lightly regulated in most countries until 
recently. Concepts like [segregation of funds][14] are only now [being addressed][15], with telcos held to the same 
standard as banks have been. 

#### Super apps

[Super apps][17] is a relatively recent term, describing mobile apps developed in East and South East Asia. They are 
worth mentioning here, due to their rapid growth.

Not originally conceived as payment rails, they have moved into payments and financial services in recent years. They then
quickly grew to rival banks in terms of transaction volume. Some examples are [WeChat][20] and [Alipay][21] <sup>[2](#footnote_2)</sup> 
in China, [PayTM][23] in India and [GoJek][22] in Singapore/Indonesia.

The underlying mechanics of this payment rail are pretty much identical to those of M-Pesa.  
App users can fund their account with a variety of means: from a normal debit/credit card to the [ojek][25] driver [becoming
an agent on wheels][24]. The payment system is a general ledger running inside the company's domain, tracking transfers 
of value between users.  
The demographic and economic tailwinds of the region have enabled them to grow into massive user bases and are now 
rapidly expanding into all kinds of financial services, beyond payments (lending, credit scores,...).  
Especially in the case of China (a prime example of [command economy][26]), WeChat and Alipay have become deeply integrated
with the [state apparatus][27], offering unique insights for the [social credit score][28] system.
 
M-Pesa was created because of the lack of a viable alternative for payments in its home countries and keeps on growing 
on the back of that. Super apps started with a killer core feature <sup>[3](#footnote_3)</sup> and are now growing on 
the back of innovation and the irresistible power of the [network effect][18]. 

#### Paypal

The wave of internet e-money providers like [Paypal][79] started in the early '00s
to facilitate online commerce 
with proper UX and web integration in the early internet days  
These providers grew along with the growth of the internet 
millions of users and merchants have accounts creating an established user base 
 
At its core Paypal is also an on-ramp/off-ramp system
since all transactions between Paytpal holders take place within the company's ledger 
settlement and payout is instant

This was a great value proposition in the early days as 
the US retail banking system is [notoriously inefficient][83] 
and online card fraud was rampant    

Paypal provided a trusted third party 
with an internet-friendly e-mail based identity  

However as the undelrying "plumbing" improves 
the value proposition in terms of payments processing is reduced 
Paypal ends up being another middleman

### OpenBanking

[OpenBanking][65] is a broad term which refers to   
> The use of open APIs that enable third-party developers to build applications and services around the financial 
> institution.

It took its name from the UK regulator's initiative. UK decided in 2016 to [front-run][66] the upcoming pan-European 
[PSD2 directive][67], which was coming into full effect in September 2019. The name OpenBanking has now become almost 
global and describes open financial APIs, offered by banks.  
> In this section I will be using the terms OpenBanking and PSD2 interchangeably.

At its core OpenBanking enables bank customers to perform all their banking tasks through a third party's application.     
Though it provides access to data as well as payment, I will be focusing on payments in this section. 

Let's see how it works.  

![OpenBanking payments](../images/payments/payments-ob.png)

1. A Customer registers with the application of a [PSP][68].  
Practically any app could be a PSP; from a mobile-only personal finance assistance (e.g. [Plum][69]) to a payments 
processing platform (e.g. [Adyen][70]).
2. The Customer wants to initiate a payment from her account (C) in PinkBank to another account (A), using the PSP.  
The PSP's app calls PinkBank's standardized [OpenBanking APIs][71]. 
3. Following the standardized OpenBanking [customer consent flow][72], the Customer agrees that the PSP initiates the 
payment (to the given Receiver account and for the given amount) on her (the Customer's) behalf. The consent is stored 
in PinkBank's systems.
4. The PSP then instructs PinkBank to initiate the payment.  
Depending on the payment's type (domestic, international,...) one of the exiasting, underlying payment schemes is used.   

From the above it becomes clear that OpenBanking is not a new "payment rail" as such.  
Rather it is a technological layer on top of the existing banking infrastructure, opening access to a number of new 
companies (the PSPs). This aims to disintermediate the customer from the bank (by introducing additional "smart apps"). 
This will eventually lead to the [commoditization][73] of the banking institutions.

### Remittance services

We saw in [part 2][2] how complex (and more often than not complicated) international payments are.

What if there was a magic way of sending value cross-border without anything actually crossing borders?  
Sounds weird? This is where remittance services come in.  
A practical example will help understand their modus operandi. 

![Remittance payments](../images/payments/payments-remittance.png)

The Sender having an account in RedBank in the Eurozone, wants to send money to the Receiver. The Receiver has an 
account in PinkBank in the UK.

1. Sender logs in to Remittance Service (RS) and enters her desired trade.  
Say, send £100 to the Receiver's GBP account. RS gets the current [spot price][84] and provides the 
details of its Euro bank account (R1). The transaction for now is still pending in RS's ledger. Let's say that the spot 
price means that Sender will "pay" €110. 
Sender has an alloted amount of time to send the funds, or the transaction is voided.
2. The Sender makes the transfer (1).  
This is usually a local transfer using the mechanisms described in [part 1][1]. 
3. RS gets a notification that the amount has been deposited in its R1 account.  
The transaction is marked as "funded".
4. RS then instructs its GBP account (R2) to pay out the £100.  
5. Again using a local payment mechanism (e.g. Faster Payments in the UK), Receiver gets the money.  
The transaction is then marked as completed in RS's ledger and the books are balanced.
 
Let's pause here and unwrap the phrase "the books are balanced".  
In step 2, RS's account R1 received €110, so RS's assets increased by €110. By sending out the equivalent amount in GBP 
in step 5 (i.e. £100), RS no longer owns the €110. Or better own the *value represented by €110*.  By nominally "securing" 
the FX rate at the moment of transfer (€110 for £100)  
* R1 is up by €110, 
* R2 is down by £100, and
* the books are balanced.

This is called [netting off][85] of flows.  
This setup greatly accelerates cross-border transactions, as there is no need for expensive SWIFT messages or slow 
nostro/vostro movements. The only requirement is that account R2 has the required cash buffer to service the payouts in
that currency.   

The importance of the FX rate comes into play when we have the reverse flow.   
Let's say that 5 days later Receiver realizes this was a mistake and she wants to return the received £100. 
The steps are followed in the reverse order. Meanwhile, Brexit has happened and GBP has lost its value relative to the 
Euro. So now when RS gets the new spot price £100 now buys €100.  
At the end of the second payment  
* R2 is up by £100, 
* R1 is down by €100, and
* the books are again balanced.

RS's books are balanced, even though it was left with €10 in the end in its R1 account!  
This is the power of netting off flows.  
RS takes a fee out of each transaction as an FX merchant would, but actually moves a fraction of the transacted amounts. 
The fraction actual;ly moved as a "real" cross-border payment is dependent on the [balance of payments][86] between the 
2 currencies. If the flows between Euro and GBP are balanced over time, then the balances of R1 and R2 will find an 
equilibrium. If we imagine that there is an imbalance of 5% more payments Euro-to-GBP than GBP-to-Euro, then R1 will be 
needing a periodic 5% topup.
 
Depending on the size of the short-fall this can be covered in any number of ways.  
* A periodic international payment from R2 to R1 to re-balance the books (line 5).  
The FX fees paid by RS will be for a fraction of the fees it has collected for the total flows.
* Interest accrued on R1, or
* Local borrowing (if the [cost of debt][87] in that market is really-really cheap).

In short, the more balanced a currency pair, the more profitable for the RS.

Some currency pairs are more imbalanced than others.  
This is especially the case in the personal remittances market, where emigrants send money back home (e.g. from USD to 
Mexican Pesos). This is one of the reasons why, past a certain size, all remittance providers try to expand into the 
business payments market to balance their flows.  
Business and trade are in general more balanced. For example, countries with high emigration are usually net importers. 
So the money entering the country as remittances, leave it soon after to buy cars and electronics.   

This elaborate setup is nothing more than the digitization of the ancient [Hawala networks][88].  

## ...and the future

### Digital IOUs

The world of [cross-border payments][2] is so complex and inefficient that it should be expected to have a blockchain-based 
solution: digital IOUs.  
> In this section I will only discuss [Ripple][89]. The alternative [Stellar][90] network has [very little differences][91].  
> Its main difference to Ripple is that it tries to avoid the centralisation of funds by a [distribution schedule][43]. 

The public Ripple network has all the components to be an all-in-one drop-in blockchain replacement for  
* global nostro-vostro accounts, 
* FX markets, and  
* the [SWIFT network][35] built on top of them.
By extension, a private Ripple network (i.e. a network deployed from source code) is effectively a Hawala network 
out of the box.

The fundamental concept underlying Ripple is that of liability and debt, a.k.a. an [IOU][29].  
We mentioned in [part 1][1] that paper money came from [Kinghts Templar and merchant promissory notes][30], all of which 
were forms of debt. Since mutual debt "cancels out" <sup>[4](#footnote_4)</sup> everyone could be (and are indeed) 
performing financial transactions, simply by owing each other value, without money actually changing hands.  
This is what is actually happening in the real world. The modern day equivalent of the medieval Italian traders' networks 
are cross-border nostro-vostro accounts. 
 
There are 2 missing ingredients in the equation:  
* **What type of debt do you trust?**  
Like in the real world, in Ripple you can have many different types of issued ["paper"][92] (called Ripple [currencies][31]). 
This is debt denominated in those currencies. However, a Ripple currency can represent anything of value, not just USD 
and GBP. As a participant, you can choose which "currencies" to trust.
* **Whose debt do you trust?**   
As in real life, you do not trust everyone's promises. Which network participants do you think issue "paper" which they 
will make whole? Ripple solves this by introducing the concept of [trust lines][32] between [accounts][33].

Let's see how it works in a practical example.  
Sender wants to makes a cross-currency payment to Receiver.

![IOU payments](../images/payments/payments-iou.png)

1. The Sender has a Ripple account, which needs to be funded.  
To do so, the Sender uses a [gateway][34] she trusts to convert her Euro fiat into "Ripple EUR" IOUs. She does so by 
funding the gateway's collateral bank account (G1). 
2. The gateway sees the deposit in the bank account, creates the equivalent amount of "Ripple EUR" IOUs and funds the 
Sender's account. The Sender has a trust line with the gateway, i.e. she trusts the issued IOUs.
3. The Sender makes a payment to the Receiver.  
The Sender and the Receiver do *not* need to be directly connected by a trust line. Instead, the Ripple network finds a 
[path of trust lines][39] connecting the two. This is the same way that SWIFT finds a path of nostro-vostro accounts to 
facilitate international payments.  
The transaction is then propagated through <sup>[5](#footnote_5)</sup> the connected 
accounts until it reaches the Recipient. In Ripple-speak the transaction "[ripples][36]" through the network of accounts,
with all balance adjustments recorded in Ripple's [distributed ledger][38].  
When the transaction is a cross-currency one, Ripple provides a singular [decentralized exchange][37] where interested 
parties can transparently submit bids/asks on currency pairs. Ripple/XRP (i.e. the crypto-currency) exists as an 
intermediate "reserve currency", to facilitate exchanges between "exotic" pairs. <sup>[6](#footnote_6)</sup>  
In our example, the payment has resulted into a conversion from "Ripple EUR" to "Ripple GBP". 
4. Once the Receiver has received the payment of "Ripple GBP", she can choose to take this to the issuing gateway 
<sup>[7](#footnote_7)</sup> and convert it to "real" GBP. Once the right-hand gateway receives the "Ripple GBP", it 
"burns" it and takes it out of circulation <sup>[8](#footnote_8)</sup>. 
5. The money is then transferred out of the gateway's collateral account (G2) to the Recipient. 

From this example, it is clear that Ripple is an on-ramp / off-ramp system.  
It solves many problems of the international payment networks [we have discussed][2] quite elegantly through the use of 
the blockchain. 
 
In addition to some questions on its [consensus algorithm][41] resilience, there a few more issues with the public 
Ripple network's design, both inherent and acquired.

**Monetary imbalance**  
At the core, is the "monetary imbalance" in the public network's design.   
Gateway IOUs are the equivalent of [stablecoins][40] (see next section), their value pegged to real-world currencies. 
They are created/burnt on an one-in-one-out basis. XRP itself however is arbitrarily priced in the open market and not 
pegged to (or backed by) anything. Quite probably the designers aimed for the central "reserve currency" of the network 
to reach an equilibrium with the global money markets' demand. It would then draw its value solely by the utility of 
the network itself.  
However, this "backed by trust" label alone would not be very reassuring in an black swan / unwinding scenario (like the 
[one we are currently in][78]).

**Centralization of funds**  
The XRP crypto-currency is highly centralised, with over 50% of tokens in circulation [controlled by a single entity][93]. 
This level of control along with criticism on [lack of auditing transparency][94], gives cause for concern.

**Centralization of control**  
Ripple network's nodes are a closed set. Ripple Labs has a say on which entities can join the network as gateways and
may have [undue control over the entire network][95]. This is an intentional decision and part of Ripple's strategy to 
partner with existing financial institutions. This level of control however is anathema to the rest of the crypto community.  

Based on the above one might think that these projects offer little value.  
However this could not be further from the truth. Though the economics and [incentives][44] of their public networks may 
be open for debate, both technologies allow financial organisations with a cross-border foot-print to effectively create 
a robust payments network in a single sweep.  

### Stablecoins

Stablecoins are an interesting class of crypto-currencies, designed to maintain a stable value parity with another asset 
(e.g. one-to-one with a real-world currency, like the US dollar). 

This is achieved in one of two ways.

* **Backed by real-world asset** (e.g. [USDT][96], [USDC][97],...)  
These are issued by an entity functioning in a way similar to the on-ramp gateways of Ripple. It receives currency in 
its bank accounts by users and issues the equivalent amounts of digital currency units. As with any IOU, their price 
has no reason to fluctuate, as long as the market believes that all digital coins have a [real-world equivalent][98].  

* **Backed by digital collateral** (e.g. [DAI][99],...)  
These stablecoins are minted when users deposit other crypto assets (e.g. Bitcoin, Ethereum,...) to a [smart contract][54]. 
Since the digital collateral has itself a fluctuating price, this class of stablecoins achieves a virtual peg by an 
elegant [set of market incentives][100].   

At their core, stablecoins are on-ramp/off-ramp systems.  
Their main use case so far has been to facilitate electronic crypto-asset trading, offering a stable digital unit of 
account in a super-volatile asset class.  
This stability combined with the benefits of the blockchain gives them a great potential to become a global medium of 
exchange. This has not gone [unnoticed][101]. 

### Libra

[Libra][102] is, according to its website   
> A simple global currency and financial infrastructure that empowers billions of people. 

In practice, it combines some of the concepts mentioned in the previous sections to offer a blockchain-based payment network.

![Libra payments](../images/payments/payments-libra.png)

Let's quickly examine how Libra works as a payment mechanism, making some simplifications for brevity. I will also not
touch upon its smart contract functionality, as it is out of scope.  
A Sender wants to send an amount of €100 to the Receiver. Both of them have [Calibra][103] or another compatible wallet 
installed. 

1. Sender needs to fund her wallet with the Libra equivalent of €100.  
For this reason she sends €100 to Libra gateway's bank account (F) <sup>[9](#footnote_9)</sup> 
2. The Libra gateway is notified of the amount and creates the equivalent amount in Libra. It then funds the Sender's 
wallet.  
3. Sender can then use the Calibra wallet to issue a blockchain payment.  
The payment is sent to the network, the blockchain nodes of which are run by the [partners][104]. 
4. ...and a few seconds later the Receiver sees her Libra balance increasing.

If the above looks very familiar, it's because it is!  
At its core Libra is not a currency. It is a fusion between an IOU and an asset-based stablecoin. The novelty here is 
that it is backed by a basket of currencies, reducing [currency risk][105].  
Steps 1 and 2 are the on-ramp to the platform. What is missing on the other side of this diagram is the off-ramp, where 
Libra would be converted to GBP. 

The on-/off-ramp is described in the [reserve policy][106] as "a network of authorized resellers".  
We have seen previously in monopolistic digital currencies, like M-Pesa, how there are off-ramp penalties to discourage asset
flight. The project's vision has been that of a global currency, bank the unbanked etc. Facebook's user base guarantees 
that the currency will have the required network effect from day 1. Users would not feel the need of the off-ramp. Perhaps 
an "exit tax" might be another nudge to stay. 

The technical merits of the system have been eclipsed by the aggressive marketing blitz and the [subsequent][107] [regulatory][108] 
backlash. A global stable currency, takes away the [only thing][45] that makes a government, well... a government. At a 
time of geopolitical tensions, even before the Covid-19 [black swan][109].  
Why not baptize it as a remittance service, a digital IOU,... something fairly conspicuous, [woke-ish][110] and under 
the radar? Facebook already had the partnerships in place to make it a de facto global payments network overnight. 

I honestly do not know the future, but I think Libra ticks many boxes to become a case study for Silicon Valley's 
detachment from the "real world" and how it works.

### Government cryptocurrencies

The last few years have seen an increasing interest in the replacement of fiat currencies with central-bank issued
crypto-currencies. 

![Government crypto payments](../images/payments/payments-gov-crypto.png)

The underlying payment mechanism in such a case would be extremely simple.    
* The Sender has a crypto-wallet on her device, possibly provided/facilitated by a bank.  
She issues a payment to the network of trusted nodes. This network will almost certainly be non-public with the compute 
capacity owned entirely by the central bank or with the national retail banks all offering [hash power][111].
* The payment will probably be attached to a block in a way similar to how existing blockchains operate and confirmed 
by the network. 
* At this point the Receiver's wallet has received the amount.   
The transaction has been immutably recorded in the network's distributed ledger.  

One might wonder "payments are pretty much electronic now, why bother with the crypto stuff"? The answer is definitely 
[above my paygrade][46] but I will offer my limited understanding. 

Transactions are increasingly electronic, but [not 100%][112].  
There are also stores of value outside of the "system", with cash and precious metals/stones being the prime examples. 
It is not by co-incidence that  
* [capital controls][113] immediately restrict access to cash, and 
* all countries impose limits on the amount of valuables one may export. <sup>[10](#footnote_10)</sup>

India's [2016 demonetisation][47] was a huge social experiment, observed with very keen interest from central bankers
around the world.

In an insitutionalized crypto-currency environment [fiscal policy][114] becomes almost trivial. Taxes are [not new 
in human history][115] and states have an ever-growing appetite for revenue. <sup>[11](#footnote_11)</sup>
Having all transactions visible in real-time and recorded immutably forever has a very-very particular allure. <sup>[12](#footnote_12)</sup>  
  
In the same vein, the elimination of cash and intermediaries (a.k.a. banks) opens up endless creative possibilities in 
the area of monetary policy.  
Why fight with ever-lower interest rates and bother with QE and trickle-down economics, when you have seen it cannot 
create real inflation? <sup>[13](#footnote_13)</sup> Why not send an [airdrop][116] (a.k.a. [helicopter money][117]) 
straight into people's crypto-addresses?  
Why not make it more interesting and force [velocity of money][118] by making them auto-burn every few days? <sup>[14](#footnote_14)</sup>
Why worry about the debt crisis when you can have centrally controlled and auto-adjusted debt margins and [jubilees][48]? 

It is common knowledge that the current system is well overdue for a reset due to excessive [monetization][119]. In less 
than 12 years it has gone from a [banking crisis][120] to an unfolding [debt crisis][121]. 
The current [Covid-19 pandemic][78] is merely the needle to pop the balloon. 

The government and central banks' answer to the previous crisis was more control.  
[MMT approaches][122] have well entered the [Overton window][50] of economical orthodoxy and will be deployed in the 
next few years. The current virulent outbreak and consequent recession / depression will only hasten their arrival.  
Government crypto-currencies are the perfect tool to deploy such policies.

### Proof-of-work money 

The last payment mechanism in the series is also the simplest one: [proof-of-work][123] (PoW) money.  

![Crypto payments](../images/payments/payments-crypto.png)

The Sender signs a payment with her private key and sends it off to the public network.  
The [miners][125] reach a [consensus][124] on the validity of the transaction and it is immutably recorded on the shared 
ledger. Value has been transferred to the Receiver.

There are on- and off-ramps in the form of [exchanges][126], but these are purely utility mechanisms.  
They facilitate onboarding from the existing fiat world, but are not critical the same way an on-ramp gateway is. Unlike 
Libra/stablecoins/etc, PoW money is not created at the gateway. It exists in and of itself, created as reward for 
[capital and operational expenditure][127] to mine it. This value is "locked" inside the system, behind the ["hashing wall"][128]. 

The best approximation is that of physical precious metals mining.  
All the gold that was easy to mine has been found and [exists above ground][131]. It now becomes [increasingly expensive][129] 
to dig out more. Unless a gold meteorite [lands on Earth][130], that spent capital remains "locked" inside each ounce, 
making it irreplaceable and valuable.

From that aspect, the major PoW cryptocurrencies are the best digital equivalent of money, as I described it in [part 1][1].  
Their increasing hashrate and fixed supply / scarcity make them true assets, without an underlying claim or trusted 
third party.  

They are the purest digital equivalent of in-person transactions, but on a global scale.

## Some racing thoughts 

![Run, Forrest! Run!](../images/payments/san-fermin-pamplona-navarra-LJrszMj1RJc-unsplash.jpg)
> Photo by San Fermin Pamplona - Navarra on Unsplash

In these 3 articles ([part 1][1], [[part 2][2]) we saw how the transfer of value has evolved over millenia.   
From a simple hand-in-hand transaction in the olden days, to national payment networks, mobile money, complex global 
banking systems and "value routes".

As we were going through these systems, you may have noticed a couple of common patterns emerging.

**Trust**  
The existing payment systems' fundamental shortcoming is that of trust.  
In the digital payment space, trust can only be effectively established on a bilateral basis. This is how 
nostro/vostro accounts came about. If that is not enough, then a "neutral", trusted third party is needed for additional 
guarantees and oversight. This trusted third party is usually [de jure][51], enshrined in law or international agreements.   
However, this is not very different from person-to-person transactions. A problem of the small scale has been replicated
on a larger one. 

**Layering**   
The second pattern is that of additional layers. Newer networks and payment rails are layered on top of existing 
constructs.    
Debit/credit cards cannot operate without an underlying bank account and payment network. SWIFT cross-border payments 
cannot operate without the underlying complex web of nostro-vostro accounts.  
The old systems' inefficiencies are merely papered over with a layer of technology and cash buffers as collateral. These 
facilities are provided by yet another third party, which becomes trusted. This third party is [de facto][52], imposed 
by market forces.

These issues have been addressed both at once with the introduction of blockchain.  
Blockchain is effectively an automated, [distributed trust machine][53], allowing multiple unrelated parties to transact.
This is self-evident in the simplicity of PoW payments, compared to the layers and layers of complexity of the current 
systems.
Every possible monetary policy has been modelled and exists now in the crypto-currency space: from fixed supply, to 
fixed inflation, to deflation to asset-backed and everything in between. This [Cambrian explosion][55] is a stark 
contrast to the current fiat monetary system's [stagnation][56] in the face of uncertainty.  

Until recently, in my eyes, a "regime change" in the global payments and monetary system was very likely. This would 
probably involve replacing fiat with a crypto-based system (almost certainly government controlled, almost unlikely 
decentralized).   
The current Covid-19 outbreak, along with  
* the massive [stimulus packages][74], 
* proposed [helicopter money][77] arrangements which have started, and 
* the upcoming [debt][75] and [retirement][76] crises 

are making this inevitable. 

The only remaining question in my head then is *what would be the role of today's banks and payment processors in this 
new landscape?*  
Would they continue being the pillars of the system, being used to distribute the newly minted cash? Or would they shrink 
beyond recognition? Even without the current debt crisis <sup>[15](#footnote_15)</sup> the current trend was for banking 
to be "democratized".  
Banking services have been dispersing across the economy with [100s of companies][132] becoming banks in all but name. 

In a fully crypto world, what would even be the role of banks?  
Would they be only providing KYC and simply be custodians of wallet holder personal information?  
Could they become one of the [m-of-n custodians][57] in a [multisig][58] government crypto-currency wallet?   
Would they be the trusted [node operators][59] and [notaries][60] in a Corda-like network?  
Would they only offer [custodian services][61], essentially only hold some private keys in their vaults?   
How can they justify their importance as lenders when current [DeFi][82] systems are operating through great volatility 
and with a tiny fraction of operating costs?

Same questions and more apply to payment processors.  

Whatever the end state of the world 
seems almost certain that the current [shrinking trajectory][81] of retail banks will only accelerate 
to a tiny fraction of their current size and importance 
In a fully crypto world maintaining alternative channels <sup>[16](#footnote_16)</sup> and being [systemically important][62] 
is beyond pointless 

The upcoming evolution of the global payment systems 
will probably be an [extinction event][63] for the majority of the current financial system
What will remain after, will be [hardly reminiscent][64] of what was there before


## Footnotes

1. <a name="footnote_1"></a>E.g. [half of Kenya's GDP][12] is processed through mobile payments.
2. <a name="footnote_2"></a>AliPay is the payment rail originating from the B2B platform [Alibaba][19]. It is a bit of a 
stretch, but I am including it here nevertheless.
3. <a name="footnote_3"></a>E.g. chatting in WeChat, ride hailing in GoJek. A.k.a. as the [thin end of the wedge][16] strategy.
4. <a name="footnote_4"></a>If I owe you 10 and you owe me 10, we owe each other nothing.
5. <a name="footnote_5"></a>Sender says to Joe "Pass £10 on to Recipient and I owe you". Joe says to Jane "Here is the £10
that I owed you, pass it on, please". Jane says to Jack "Here are £10 for Recipient, add it to my debt". Jack finally
says to Recipient "Here is £10 from Sender, you now owe me". This is better visualized and explained [here][36].
6. <a name="footnote_6"></a>This is the same role that the US dollar plays in the real-world FX markets and cross-border 
payments.
7. <a name="footnote_7"></a>Just as "Ripple EUR" was issued by the left-hand gateway, "Ripple GBP" has been issued by another 
gateway. This is what is converted in the Ripple exchange: one type of IOU for another. It is not "magic'ed up". 
8. <a name="footnote_8"></a>Same way you rip a debt certificate once the debt has been paid off.
9. <a name="footnote_9"></a>Here I am over-simplifying in multiple ways. Yes, Libra is a foundation, not controlled by 
Facebook. Also in real-life the payment would be facilitated via card, OpenBanking or some other mobile-friendly way. 
And according to the stated [reserve policy][106], purchase of Libra would be via a network of resellers.
10. <a name="footnote_10"></a>Yes, illegal activity is also a concern, but it is the central bank's balance sheet that 
counts. Imagine the Argentinas and Greeces of the world if their citizens could take their assets' worth into gold to a 
more stable place.  
11. <a name="footnote_11"></a>Say your unit of labour gives you £10. You are taxed at source with £3. Then you buy a 
T-shirt and pay VAT. Then you put the remainder towards a house and pay stamp duty, etc. Even though you worked once, 
your work's result (i.e. your salary) will be taxed multiple times, every time that a fraction of it changes hands.
12. <a name="footnote_12"></a>Why wait for the end of the quarter or the fiscal year to see if tax reduction has boosted 
business when you can see it the next minute?  
Why reduce taxes for all businesses when you can see that the economic slow-down is from a few crypto-addresses in the 
Barcelona area? Just reduce taxes for them.  
Not to mention the amount of information revealed by such a [panopticon][49] payments network.
13. <a name="footnote_13"></a>The only inflation QE and negative yields have caused are in asset prices. In simple words:
you have not had a noticeable pay rise in forever, TVs and blenders are becoming better and cheaper and, yet, houses, 
gold coins and Netflix shares become ridiculously unaffordable.
14. <a name="footnote_14"></a>I.e. use it or lose it. It may sound impossible to create in the current regime, but in 
the world of [smart contracts][54] it is almost trivial to implement.
15. <a name="footnote_15"></a>Or maybe because of it. 
16. <a name="footnote_16"></a>Branches, ATMs, mobile banking, telephony, cheque processing,...
17. <a name="footnote_17"></a>


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
  [16]: https://www.businessinsider.com/the-thin-edge-of-the-wedge-strategy-2011-1?r=US&IR=T
  [17]: https://www.ft.com/content/0788d906-1a7b-11ea-97df-cc63de1d73f4
  [18]: https://en.wikipedia.org/wiki/Network_effect
  [19]: https://www.alibaba.com/
  [20]: https://www.wechat.com/en
  [21]: https://global.alipay.com/index.htm
  [22]: https://www.gojek.com/
  [23]: https://paytm.com/
  [24]: https://customers.twilio.com/1601/go-jek/
  [25]: https://en.wiktionary.org/wiki/ojek
  [26]: https://www.thestar.com.my/business/business-news/2017/09/23/chinas-command-economy
  [27]: https://www.bbc.co.uk/news/blogs-china-blog-48552907
  [28]: https://en.wikipedia.org/wiki/Social_Credit_System
  [29]: https://en.wikipedia.org/wiki/IOU
  [30]: https://goldsilver.com/blog/the-people-who-invented-banking-the-knights-templar/
  [31]: https://xrpl.org/issued-currencies-overview.html
  [32]: https://xrpl.org/trust-lines-and-issuing.html
  [33]: https://xrpl.org/accounts.html
  [34]: https://xrpl.org/become-an-xrp-ledger-gateway.html
  [35]: https://en.wikipedia.org/wiki/Society_for_Worldwide_Interbank_Financial_Telecommunication
  [36]: https://xrpl.org/rippling.html
  [37]: https://xrpl.org/decentralized-exchange.html
  [38]: https://xrpl.org/consensus.html
  [39]: https://xrpl.org/paths.html
  [40]: https://en.wikipedia.org/wiki/Stablecoin
  [41]: https://blockgeeks.com/guides/ripple-vs-stellar-ultimate-comparison-guide/#2_Ripple_vs_Stellar_Consensus_Algorithm
  [42]: https://www.stellar.org/developers/guides/get-started/index.html
  [43]: https://www.stellar.org/foundation/mandate#ecosystem-support
  [44]: https://en.wikipedia.org/wiki/Incentive
  [45]: http://libertytree.ca/quotes/Mayer.Amschel.Rothschild.Quote.8BED
  [46]: https://www.urbandictionary.com/define.php?term=Above%20my%20Paygrade
  [47]: https://en.wikipedia.org/wiki/2016_Indian_banknote_demonetisation
  [48]: https://en.wikipedia.org/wiki/Seisachtheia
  [49]: https://en.wikipedia.org/wiki/Panopticon
  [50]: https://en.wikipedia.org/wiki/Overton_window
  [51]: https://en.wikipedia.org/wiki/De_jure
  [52]: https://en.wikipedia.org/wiki/De_facto
  [53]: https://www.economist.com/leaders/2015/10/31/the-trust-machine
  [54]: https://en.wikipedia.org/wiki/Smart_contract
  [55]: https://en.wikipedia.org/wiki/Cambrian_explosion
  [56]: https://www.cnbc.com/2019/06/28/central-banks-have-run-out-of-ammunition-says-oecd-angel-gurria.html
  [57]: https://trybe.one/crypto-idea-collective-custody-platform/
  [58]: https://en.bitcoin.it/wiki/Multisignature
  [59]: https://docs.corda.net/key-concepts-node.html
  [60]: https://docs.corda.net/key-concepts-notaries.html
  [61]: https://en.wikipedia.org/wiki/Custodian_bank
  [62]: https://en.wikipedia.org/wiki/Systemically_important_financial_institution
  [63]: https://en.wikipedia.org/wiki/Cretaceous%E2%80%93Paleogene_extinction_event
  [64]: https://www.nhm.ac.uk/discover/why-are-birds-the-only-surviving-dinosaurs.html
  [65]: https://en.wikipedia.org/wiki/Open_banking
  [66]: https://www.openbanking.org.uk/wp-content/uploads/OB_MediaPDF_FINAL.pdf
  [67]: https://en.wikipedia.org/wiki/Payment_Services_Directive#Revised_Directive_on_Payment_Services_(PSD2)
  [68]: https://en.wikipedia.org/wiki/Payment_service_provider
  [69]: https://withplum.com/
  [70]: https://www.adyen.com/
  [71]: https://openbanking.atlassian.net/wiki/spaces/DZ/pages/23922689/ARCHIVE+-+Specifications
  [72]: https://www.openbanking.org.uk/wp-content/uploads/Customer-Experience-Guidelines-V1-1.pdf
  [73]: https://www.investopedia.com/terms/c/commoditize.asp
  [74]: https://www.theguardian.com/uk-news/2020/mar/20/government-pay-wages-jobs-coronavirus-rishi-sunak
  [75]: https://www.theguardian.com/business/2020/jan/08/world-bank-global-debt-crisis-borrowing-build-up
  [76]: https://www.forbes.com/sites/greatspeculations/2019/03/20/the-retirement-crisis-is-much-worse-than-you-think/#5dc61f223949
  [77]: https://fortune.com/2020/03/25/coronavirus-stimulus-bill-how-will-us-pay-trillion-dollar-coin/
  [78]: https://en.wikipedia.org/wiki/Coronavirus_disease_2019
  [79]: https://en.wikipedia.org/wiki/PayPal#Early_history
  [80]: https://www.economist.com/business/2020/03/19/how-visa-became-the-top-dog-in-global-finance
  [81]: https://www.pwc.com/gx/en/banking-capital-markets/events/assets/pwc-that-shrinking-feeling.pdf
  [82]: https://blog.coinbase.com/a-beginners-guide-to-decentralized-finance-defi-574c68ff43c4
  [83]: https://www.marketplace.org/2014/02/17/why-our-banking-system-so-far-behind/
  [84]: https://www.investopedia.com/terms/forex/f/forex-spot-rate.asp
  [85]: https://www.kantox.com/en/glossary/payment-netting-2/
  [86]: https://en.wikipedia.org/wiki/Balance_of_payments
  [87]: https://www.investopedia.com/terms/c/costofdebt.asp
  [88]: https://en.wikipedia.org/wiki/Hawala
  [89]: https://ripple.com/
  [90]: https://www.stellar.org/
  [91]: https://www.fxempire.com/education/article/ripple-vs-stellar-will-there-be-only-one-winner-521999
  [92]: https://www.investopedia.com/terms/n/note.asp
  [93]: https://hackernoon.com/a-brief-look-into-ripple-xrp-banks-pre-mines-and-lawsuits-qcn63au2
  [94]: https://www.forbes.com/sites/jasonbloomberg/2019/03/01/is-ripple-a-scam/#5dd363a179a4
  [95]: https://bitcoinist.com/not-decentralized-ripple-freezes-1m-user-funds/
  [96]: https://tether.to/
  [97]: https://www.coinbase.com/usdc
  [98]: https://ftalphaville.ft.com/2019/10/07/1570455386000/Tether-slammed-as--part-fraud--part-pump-and-dump--and-part-money-laundering--/
  [99]: https://makerdao.com/en/
  [100]: https://makerdao.com/en/whitepaper#abstract
  [101]: https://www.jpmorgan.com/global/news/digital-coin-payments
  [102]: https://libra.org/en-US/
  [103]: https://www.calibra.com/
  [104]: https://libra.org/en-US/partners/
  [105]: https://investinganswers.com/dictionary/c/currency-risk
  [106]: https://libra.org/en-US/about-currency-reserve/#the_reserve
  [107]: https://observer.com/2019/08/facebook-libra-cryptocurrency-regulator-backlash-europe/
  [108]: https://www.wsj.com/articles/facebook-wanted-to-create-a-new-currency-it-wasnt-ready-for-the-backlash-11571242795
  [109]: https://en.wikipedia.org/wiki/Black_swan_theory
  [110]: https://www.merriam-webster.com/dictionary/woke
  [111]: https://coinrivet.com/guides/what-is-cryptocurrency-mining/what-is-hash-rate/
  [112]: https://www.oecd.org/going-digital/unlocking-the-potential-of-e-commerce.pdf
  [113]: https://en.wikipedia.org/wiki/Capital_control
  [114]: https://en.wikipedia.org/wiki/Fiscal_policy
  [115]: https://en.wikipedia.org/wiki/Tax
  [116]: https://en.wikipedia.org/wiki/Airdrop_(cryptocurrency)
  [117]: https://en.wikipedia.org/wiki/Helicopter_money
  [118]: https://www.investopedia.com/terms/v/velocity.asp
  [119]: https://www.investopedia.com/terms/m/monetize.asp
  [120]: https://en.wikipedia.org/wiki/Financial_crisis_of_2007%E2%80%9308
  [121]: https://www.ft.com/content/27cf0690-5c9d-11ea-b0ab-339c2307bcd4
  [122]: https://en.wikipedia.org/wiki/Modern_Monetary_Theory
  [123]: https://cointelegraph.com/explained/proof-of-work-explained
  [124]: https://cryptoresearch.report/crypto-research/consensus-mechanisms/
  [125]: https://www.investopedia.com/tech/how-does-bitcoin-mining-work/
  [126]: https://www.investopedia.com/tech/190-cryptocurrency-exchanges-so-how-choose/
  [127]: https://www.buybitcoinworldwide.com/mining/#how-to-mine
  [128]: https://www.investopedia.com/terms/h/hash.asp
  [129]: https://marketrealist.com/2018/11/what-did-it-cost-gold-miners-to-dig-out-an-ounce-of-gold/
  [130]: https://en.wikipedia.org/wiki/The_Chase_of_the_Golden_Meteor
  [131]: https://www.gold.org/about-gold/gold-supply/gold-mining/how-much-gold
  [132]: https://www.pwc.com/gx/en/financial-services/assets/pdf/technology2020-and-beyond.pdf